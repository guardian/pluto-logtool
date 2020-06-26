import React, {Component} from 'react';
import JobInfoBox from './JobInfoBox.jsx';

class VidispineJobTool extends Component {

constructor(props){
  super(props);
  this.state = {
    vidispineData: {
      hits: 0,
      job: []
    },
    pageNumber: 1
  };
}

  setStatePromise(newState) {
    return new Promise((resolve,reject)=>this.setState(newState, ()=>resolve()));
  }

  async getJobData(endpoint) {
    const username = 'admin';
    const password = 'admin';
    const headers = new Headers();
    const encodedString = new Buffer(username + ":" + password).toString('base64');
    const url = "http://localhost:8080" + "/API/" + endpoint;
    await this.setStatePromise({loading: true});
    const result = await fetch(url, {headers: {Accept: "application/json", Authorization: "Basic " + encodedString}});

    switch(result.status) {
    case 200:
      const returnedData = await result.json();
      return this.setStatePromise({loading: false, vidispineData: returnedData});
    default:
      const errorContent = await result.text();
      return this.setStatePromise({loading: false, lastError: errorContent});
    }
  }

  componentDidMount() {
    this.getJobData('job?metadata=true&step=true&number=16&first=1&sort=jobId%20desc');
  }

  pageHigher = () => {
    console.log(this.state.pageNumber)
    this.setState({ pageNumber: this.state.pageNumber + 1 });
    var pageToLoad = 1;
    if (this.state.pageNumber > 0) {
      pageToLoad = this.state.pageNumber * 16 + 1;
    }
    this.getJobData('job?metadata=true&step=true&number=16&first=' + pageToLoad + '&sort=jobId%20desc');
  }

  pageLower = () => {
    console.log(this.state.pageNumber)
    this.setState({ pageNumber: this.state.pageNumber - 1 });
    var pageToLoadTwo = 1;
    if (this.state.pageNumber > 0) {
      pageToLoadTwo = this.state.pageNumber * 16 - 31;
    }
    this.getJobData('job?metadata=true&step=true&number=16&first=' + pageToLoadTwo + '&sort=jobId%20desc');
  }

  render() {
    return (
      <div>
        <div class="grid">
        <div class="title_box">Vidispine Job Tool</div>
        <div class="controls_box">
          <div class="job_number">
            {this.state.vidispineData.hits} jobs
          </div>
          <div class="page_number">
            Page {this.state.pageNumber}
          </div>
          <div class="last_page" onClick={this.pageLower}>
            <div class="arrow_left"></div>
          </div>
          <div class="next_page" onClick={this.pageHigher}>
            <div class="arrow_right"></div>
          </div>
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
             this.state.vidispineData.job.map(item =><JobInfoBox jobData={item} jobId={item.jobId}/>)
           }
          </div>
      </div>
    )
  }
}

export default VidispineJobTool;
