//import React from 'react';
//import {render} from 'react-dom';
//import {BrowserRouter, Link, Route, Switch, Redirect, withRouter} from 'react-router-dom';
//import { library } from '@fortawesome/fontawesome-svg-core'
//import { faFolder, faFolderOpen, faTimes, faSearch, faCog, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
//import RootComponent from "./RootComponent.jsx";
//import NotFoundComponent from "./NotFoundComponent.jsx";
//import OAuthCallbackComponent from "./OAuthCallbackComponent.jsx";
//import LoginBanner from "./LoginBanner.jsx";

//library.add(faFolder, faFolderOpen, faTimes, faSearch, faCog, faUser, faSignOutAlt);


//render(
//  <h1>Vidispine Job Tool</h1>,
//  document.getElementById('app')
//);

import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App.jsx';
//import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
