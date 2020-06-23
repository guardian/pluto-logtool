import React, {Component} from 'react';
import JobInfoBox from './JobInfoBox.jsx';

//let url = 'http://localhost:8080/API/job';

//headers.append('Authorization', 'Basic ' + encodedString);
//headers.append('Accept', 'application/json');


class VidispineJobTool extends Component {
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

  async getJobData(endpoint) {
    const username = 'admin';
    const password = 'admin';
    const headers = new Headers();
    const encodedString = new Buffer(username + ":" + password).toString('base64');
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
    this.getJobData('job?metadata=true&step=true&number=16&first=1&sort=jobId%20desc');
  }


  render() {
    return (
      <div>
        <div class="grid">
        <div class="title_box">Vidispine Job Tool</div>
        <div class="controls_box">
          {this.state.someData.hits} jobs
        </div>

        <div class="headings_box">
          <div class="select_heading">
            &nbsp;
          </div>
          <div class="id_heading">
            Id.
          </div>
          <div class="filename_heading">
            Filename
          </div>
          <div class="type_heading">
            Type
          </div>
          <div class="status_heading">
            Status
          </div>
          <div class="progress_heading">
            Progress (Steps)
          </div>
          <div class="user_heading">
            User
          </div>
          <div class="started_heading">
            Started
          </div>
          <div class="priority_heading">
            Priority
          </div>
        </div>
          {
            //this.state.someData.job.map((item,idx)=><li key={idx}>{item.jobId} {item.type} {item.status} {item.currentStep.number}/{item.totalSteps} steps {item.started}</li>)
           }
           {
             this.state.someData.job.map(item =><JobInfoBox jobData={item} jobId={item.jobId}/>)
           }
          </div>
      </div>
    )
  }
}

export default VidispineJobTool;
