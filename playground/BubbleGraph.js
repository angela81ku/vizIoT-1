var svg = d3.select('svg'),
  width = +svg.attr('width'),
  height = +svg.attr('height');

var format = d3.format(',d');

var color = d3.scaleOrdinal(d3.schemeCategory20c);

var pack = d3
  .pack()
  .size([width, height])
  .padding(1.5);

var data = [
  { id: "main.test.apple", value: 1 },
  { id: "main.test.boy", value: 4 },
  { id: "main.cat", value: 3 },
  { id: "main.dog", value: 1 },
  { id: "main.elephant", value: 1 },
  { id: "main.fish", value: 1 },
  { id: "main.girl", value: 20 },
  { id: "main.hello", value: 1 },
];

function circles(classes) {
  var root = d3
    .hierarchy({ children: classes })
    .sum(function (d) {
      return d.value;
    })
    .each(function (d) {
      if ((id = d.data.id)) {
        var id,
          i = id.lastIndexOf('.');
        d.id = id;
        d.package = id.slice(0, i);
        d.class = id.slice(i + 1);
      }
    });


  var node = svg
    .selectAll('.node')
    .data(pack(root).leaves())
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', function (d) {
      return 'translate(' + d.x + ',' + d.y + ')';
    });

  node
    .append('circle')
    .attr('id', function (d) {
      return d.id;
    })
    .attr('r', function (d) {
      return d.r;
    })
    .style('fill', function (d) {
      return color(d.package);
    });

  node
    .append('clipPath')
    .attr('id', function (d) {
      return 'clip-' + d.id;
    })
    .append('use')
    .attr('xlink:href', function (d) {
      return '#' + d.id;
    });

  node
    .append('text')
    .attr('clip-path', function (d) {
      return 'url(#clip-' + d.id + ')';
    })
    .selectAll('tspan')
    .data(function (d) {
      return d.class;
    })
    .enter()
    .append('tspan')
    .attr('x', 0)
    .attr('y', function (d, i, nodes) {
      return 13 + (i - nodes.length / 2 - 0.5) * 10;
    })
    .text(function (d) {
      return d;
    });

  node.append('title').text(function (d) {
    return d.id + '\n' + format(d.value);
  });
}

circles(data);



// d3.csv(
//   'flare.csv',
//   function(d) {
//     d.value = +d.value;
//     if (d.value) return d;
//   },
//   function(error, classes) {
//     debugger
//
//   }
// );
