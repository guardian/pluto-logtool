import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Link, Route, Switch, Redirect, withRouter} from 'react-router-dom';
import VidispineJobTool from './VidispineJobTool.jsx';
import JobPage from './JobPage.jsx';
import "./dark.css"

class App extends React.Component {

  render(){

    return <div>
        <Switch>
            <Route path="/job/:id" component={()=><JobPage vidispine_host={VS_HOST} />}/>
            <Route path="/" component={()=><VidispineJobTool vidispine_host={VS_HOST} />}/>
        </Switch>
    </div>
  }
}

const AppWithRouter = withRouter(App);

if (window.sessionStorage["pluto:access-token"] != undefined) {
  render(<BrowserRouter basename={DEPLOYMENT_PATH}><AppWithRouter/></BrowserRouter>, document.getElementById("app"));
} else {
  render(<BrowserRouter forceRefresh={true}><Redirect to='/' /></BrowserRouter>, document.getElementById("app"));
}
