import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Link, Route, Switch, Redirect, withRouter} from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {
  AppSwitcher,
  Header,
  JwtDataShape,
  OAuthContextData,
  OAuthContextProvider,
  SystemNotification,
  UserContextProvider,
  verifyExistingLogin,
  handleUnauthorized,
} from "@guardian/pluto-headers";
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
  const token = window.localStorage.getItem("pluto:access-token");
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
      userProfile: undefined,
    };

    this.handleUnauthorizedFailed = this.handleUnauthorizedFailed.bind(this);
    this.onLoginValid = this.onLoginValid.bind(this);
    this.oAuthConfigLoaded = this.oAuthConfigLoaded.bind(this);

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

  haveToken() {
    return window.localStorage.getItem("pluto:access-token");
  }

  oAuthConfigLoaded(oAuthConfig) {
    //If we already have a user token at mount, verify it and update our internal state.
    //If we do not, ignore for the time being; it will be set dynamically when the login occurs.
    console.log("Loaded oAuthConfig: ", oAuthConfig);
    if (this.haveToken()) {
      verifyExistingLogin(oAuthConfig)
        .then((profile) => this.setState({ userProfile: profile }))
        .catch((err) => {
          console.error("Could not verify existing user profile: ", err);
        });
    }
  }

  render(){
    if (!this.state.loading && !this.state.isLoggedIn) {
      console.log("Not logged in, redirecting to route");
      return <NotLoggedIn tokenExpired={this.state.tokenExpired} timeOut={5} />;
    }

    return (
      <OAuthContextProvider onLoaded={this.oAuthConfigLoaded}>
        <UserContextProvider
          value={{
            profile: this.state.userProfile,
            updateProfile: (newValue) =>
              this.setState({ userProfile: newValue }),
          }}
        >
          <ThemeProvider theme={theme}>
            <Header></Header>
            <AppSwitcher onLoginValid={this.onLoginValid}></AppSwitcher>
            <div class="main_job_div">
                <Switch>
                    <Route path="/job/:id" component={()=><JobPage vidispine_host={VS_HOST} />}/>
                    <Route path="/" component={()=><VidispineJobTool vidispine_host={VS_HOST} />}/>
                </Switch>
            </div>
          </ThemeProvider>
        </UserContextProvider>
      </OAuthContextProvider>
    );
  }
}

const AppWithRouter = withRouter(App);

if (window.localStorage["pluto:access-token"] != undefined) {
  render(<BrowserRouter basename={DEPLOYMENT_PATH}><AppWithRouter/></BrowserRouter>, document.getElementById("app"));
} else {
  render(<BrowserRouter forceRefresh={true}><Redirect to='/' /></BrowserRouter>, document.getElementById("app"));
}
