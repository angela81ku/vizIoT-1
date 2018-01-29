import React from 'react'
import Grid from './BeanUILibrary/Grid'

const AppTitle = () => (
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
      <div className="appTitle__logo">
        <i className="material-icons">visibility</i>
         <h1>VizIoT</h1>
      </div>
    </Grid>

  </header>
)

export default AppTitle