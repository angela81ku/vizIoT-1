import React from 'react'

class CardWrapper extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {noShadow, noBorder, noPadding, children} = this.props

    const classNames = ['cardWrapper']
    if (noShadow) {
      classNames.push('noShadow')
    }
    if (noBorder) {
      classNames.push('noBorder')
    }
    if (noPadding) {
      classNames.push('noPadding')
    }

    return (
      <div className={classNames.join(' ')}>
        {children}
      </div>
    )
  }
}

export default CardWrapper