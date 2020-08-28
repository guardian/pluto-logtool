import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Link, Route, Switch, Redirect, withRouter} from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Header, AppSwitcher, handleUnauthorized } from "pluto-headers";
import VidispineJobTool from './VidispineJobTool.jsx';
import JobPage from './JobPage.jsx';
import NotLoggedIn from "./NotLoggedIn.jsx";
import "./dark.css"


const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "sans-serif",
      '"Helvetica Neue"',
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),
    fontWeight: 400,
  },
});

//This is set in the html template file and gives us the value of deployment-root from the server config
axios.defaults.baseURL = DEPLOYMENT_PATH;
axios.interceptors.request.use(function (config) {
  const token = window.sessionStorage.getItem("pluto:access-token");
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      isLoggedIn: false,
      tokenExpired: false,
      plutoConfig: {},
    };

    this.handleUnauthorizedFailed = this.handleUnauthorizedFailed.bind(this);
    this.onLoginValid = this.onLoginValid.bind(this);

    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        handleUnauthorized(
          this.state.plutoConfig,
          error,
          this.handleUnauthorizedFailed
        );

        return Promise.reject(error);
      }
    );
  }

  handleUnauthorizedFailed() {
    this.setState({
      isLoggedIn: false,
      tokenExpired: true,
    });
  }

  async onLoginValid(valid, loginData) {
    // Fetch the oauth config
    try {
      const response = await fetch("/meta/oauth/config.json");
      if (response.status === 200) {
        const data = await response.json();
        this.setState({ plutoConfig: data });
      }
    } catch (error) {
      console.error(error);
    }

    this.setState(
      {
        isLoggedIn: valid,
      },
      () => {
        this.setState({ loading: false });
      }
    );
  }


  render(){
    if (!this.state.loading && !this.state.isLoggedIn) {
      console.log("Not logged in, redirecting to route");
      return <NotLoggedIn tokenExpired={this.state.tokenExpired} timeOut={5} />;
    }

    return (
      <ThemeProvider theme={theme}>
        <>
          <Header></Header>
          <AppSwitcher onLoginValid={this.onLoginValid}></AppSwitcher>
        </>
        <div class="main_job_div">
            <Switch>
                <Route path="/job/:id" component={()=><JobPage vidispine_host={VS_HOST} />}/>
                <Route path="/" component={()=><VidispineJobTool vidispine_host={VS_HOST} />}/>
            </Switch>
        </div>
      </ThemeProvider>
    );
  }
}

const AppWithRouter = withRouter(App);

if (window.sessionStorage["pluto:access-token"] != undefined) {
  render(<BrowserRouter basename={DEPLOYMENT_PATH}><AppWithRouter/></BrowserRouter>, document.getElementById("app"));
} else {
  render(<BrowserRouter forceRefresh={true}><Redirect to='/' /></BrowserRouter>, document.getElementById("app"));
}
