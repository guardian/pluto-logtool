import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Link, Route, Switch, Redirect, withRouter} from 'react-router-dom';
import VidispineJobTool from './VidispineJobTool.jsx';

class App extends React.Component {

  render(){
          return <div>
              <Switch>
                  <Route path="/" component={VidispineJobTool}/>
              </Switch>
          </div>
      }
}

const AppWithRouter = withRouter(App);
render(<BrowserRouter root="/"><AppWithRouter/></BrowserRouter>, document.getElementById("app"));
