import React, {Component} from 'react';
import Contacts from './components/contacts';

//let base64 = require('base-64');
let url = 'http://localhost:8080/API/job';
let username = 'admin';
let password = 'admin';
let headers = new Headers();
const encodedString = new Buffer(username + ":" + password).toString('base64');
headers.append('Authorization', 'Basic ' + encodedString);
headers.append('Accept', 'application/json');


/*class App extends Component {
    render() {
        return (
            <Contacts contacts={this.state.contacts} />
        )
    }

    state = {
        contacts: []
    };

    componentDidMount() {
      fetch(url, {method:'GET',
      headers: headers,
      //credentials: 'user:passwd'
     })
            .then(res => res.json())
            .then((data) => {
                this.setState({ contacts: data })
            })
            .catch(console.log)
    }
}*/


class App extends Component {
  //static propTypes = {
  //  vidispineBaseUrl: PropTypes.string.isRequired
  //};

  //this.props.vidispineBaseUrl = 'http://localhost:8080';

/*all the usual stuff....*/

constructor(props){
super(props);
this.state = {
  someData: {
    hits: 0,
    job: []
  }
}
}

  setStatePromise(newState) {
    return new Promise((resolve,reject)=>this.setState(newState, ()=>resolve()));
  }

  async getSomeVidispineData(endpoint) {
    //const bearerToken = window.localStorage.getItem("bearer-token-key");  //see adfs-test-pureclient for more info on this
    const url = "http://localhost:8080" + "/API/" + endpoint;
    await this.setStatePromise({loading: true});
    const result = await fetch(url, {headers: {Accept: "application/json", Authorization: "Basic " + encodedString}});

    switch(result.status) {
    case 200:
      const returnedData = await result.json();
      return this.setStatePromise({loading: false, someData: returnedData});
    default:
      const errorContent = await result.text();
      return this.setStatePromise({loading: false, lastError: errorContent});
    }
  }

  componentDidMount() {
    this.getSomeVidispineData('job?metadata=true&step=true&number=16&first=1');
  }


  //const d

  //= getSomeVidispineData('job');

/*render method etc....*/

//<ul>
//{
  //this.state.someData.jobs.map((item,idx)=><li key={idx}>{item.jobId} {item.type} {item.status}</li>)
 //}
 //</ul>

  render() {
    return (
      <div>
        <h1>First test</h1>
        <span>Got a total of {this.state.someData.hits} items:</span>
        <ul>
          {
            this.state.someData.job.map((item,idx)=><li key={idx}>{item.jobId} {item.type} {item.status} {item.currentStep.number}/{item.totalSteps} steps {item.started}</li>)
           }
           </ul>
      </div>
    )
  }
}

export default App;
