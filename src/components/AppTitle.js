import React from 'react'
import Grid from './BeanUILibrary/Grid'
import moment from 'moment'

class AppTitle extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    currentMoment: moment()
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateTime = () => {
    this.setState(() => ({ currentMoment: moment() }))
  }
  componentDidMount() {
    this.interval = setInterval(this.updateTime, 1000)
  }

  render() {
    return (
      <header className="appTitle fade">
        <Grid>
          <div className="appTitle__leftPlaceholder">
          </div>
          <div className="appTitle__pageTitle">
            <div>
              <h3>
                <strong>NETWORK</strong>
              </h3>
            </div>
            <h3>
              OVERVIEW
            </h3>
          </div>
          <div className="appTitle__rightStuff">
            <div className="appTitle__logo">
              <i className="material-icons">visibility</i>
              <h1>VizIoT</h1>
            </div>

            <div className="appTitle__time m-top-1"><h4>{this.state.currentMoment.format('h:mm:ss a')}</h4></div>
          </div>
        </Grid>

      </header>
    )
  }
}

export default AppTitle