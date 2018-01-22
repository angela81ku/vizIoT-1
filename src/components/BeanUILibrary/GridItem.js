import React from 'react'

class GridItem extends React.Component {

  GridItem (props) {
    this.props = props
  }

  render () {
    const {size, style, space} = this.props
    let classNames = Object.entries(size).reduce((result, ting) => {
      return result += `col-${ting[0]}-${ting[1]} `
    }, '')
    classNames += space
    console.log(classNames)

    return (
      <div className={classNames}
           style={style}>
        {this.props.children}
      </div>
    )
  }
}

export default GridItem