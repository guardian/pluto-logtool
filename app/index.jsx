import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Link, Route, Switch, Redirect, withRouter} from 'react-router-dom';
import VidispineJobTool from './VidispineJobTool.jsx';
import JobPage from './JobPage.jsx';
import "./dark.css"

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username: 'admin',
      password: 'admin'
    };
  }

  render(){
          return <div>
              <Switch>
                  <Route path="/job/:id" component={()=><JobPage vidispine_host={VS_HOST} username={this.state.username ?? "admin"} password={this.state.password ?? "admin"} />}/>
                  <Route path="/" component={()=><VidispineJobTool vidispine_host={VS_HOST} username={this.state.username ?? "admin"} password={this.state.password ?? "admin"} />}/>
              </Switch>
          </div>
      }
}

const AppWithRouter = withRouter(App);
render(<BrowserRouter basename={DEPLOYMENT_PATH}><AppWithRouter/></BrowserRouter>, document.getElementById("app"));
