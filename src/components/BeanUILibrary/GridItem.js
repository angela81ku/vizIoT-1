import React from 'react'

class GridItem extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {size, style, space} = this.props
    let classNames = Object.entries(size).reduce((result, ting) => {
      result += `col-${ting[0]}-${ting[1]} `
      return result
    }, '')

    classNames += space || ''
    // console.log(classNames)

    return (
      <div className={classNames}
           style={style}>
        {this.props.children}
      </div>
    )
  }
}

export default GridItem