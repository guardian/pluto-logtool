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
    pageNumber: 1,
    pageSize: 16
  };
  this.handleSubmit = this.handleSubmit.bind(this);
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
    this.setState({
      pageNumber: this.state.pageNumber + 1
    },() => {
      var placeToLoad = 1;
      if (this.state.pageNumber > 1) {
        placeToLoad = this.state.pageNumber * this.state.pageSize - this.state.pageSize + 1;
      }
      this.getJobData('job?metadata=true&step=true&number=' + this.state.pageSize + '&first=' + placeToLoad + '&sort=jobId%20desc');
    });
  }

  pageLower = () => {
    this.setState({
      pageNumber: this.state.pageNumber - 1
    },() => {
      var placeToLoadTwo = 1;
      if (this.state.pageNumber > 1) {
        placeToLoadTwo = this.state.pageNumber * this.state.pageSize - this.state.pageSize + 1;
      }
      this.getJobData('job?metadata=true&step=true&number=' + this.state.pageSize + '&first=' + placeToLoadTwo + '&sort=jobId%20desc');
    });
  }

  pageSize16 = () => {
    this.setState({
      pageSize: 16
    },() => {
      var placeToLoad16 = 1;
      if (this.state.pageNumber > 1) {
        placeToLoad16 = (this.state.pageNumber * this.state.pageSize) - this.state.pageSize + 1;
      }
      this.getJobData('job?metadata=true&step=true&number=16&first=' + placeToLoad16 + '&sort=jobId%20desc');
    });
  }

  pageSize32 = () => {
    this.setState({
      pageSize: 32
    },() => {
      var placeToLoad32 = 1;
      if (this.state.pageNumber > 1) {
        placeToLoad32 = (this.state.pageNumber * this.state.pageSize) - this.state.pageSize + 1;
      }
      this.getJobData('job?metadata=true&step=true&number=32&first=' + placeToLoad32 + '&sort=jobId%20desc');
    });
  }

  pageSize64 = () => {
    this.setState({
      pageSize: 64
    },() => {
      var placeToLoad64 = 1;
      if (this.state.pageNumber > 1) {
        placeToLoad64 = (this.state.pageNumber * this.state.pageSize) - this.state.pageSize + 1;
      }
      this.getJobData('job?metadata=true&step=true&number=64&first=' + placeToLoad64 + '&sort=jobId%20desc');
    });
  }

  pageSize128 = () => {
    this.setState({
      pageSize: 128
    },() => {
      var placeToLoad128 = 1;
      if (this.state.pageNumber > 1) {
        placeToLoad128 = (this.state.pageNumber * this.state.pageSize) - this.state.pageSize + 1;
      }
      this.getJobData('job?metadata=true&step=true&number=128&first=' + placeToLoad128 + '&sort=jobId%20desc');
    });
  }

  placeToShow() {
    var placeToReturn = 1;
    if (this.state.pageNumber > 1) {
      placeToReturn = (this.state.pageNumber * this.state.pageSize) - this.state.pageSize + 1;
    }
    return placeToReturn;
  }

  placeToShowEnd() {
    var placeToReturnEnd = this.state.pageSize;
    if (this.state.pageNumber > 1) {
      placeToReturnEnd = (this.state.pageNumber * this.state.pageSize) + 1;
    }
    if (placeToReturnEnd > this.state.someData.hits) {
      placeToReturnEnd = this.state.someData.hits;
    }
    return placeToReturnEnd;
  }

  totalPages() {
    var totalToReturn = 1;
    totalToReturn = Math.ceil(this.state.someData.hits / this.state.pageSize);
    return totalToReturn;
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      pageNumber: parseInt(this.element.value)
    },() => {
      var placeToLoadSub = 1;
      if (this.state.pageNumber > 1) {
        placeToLoadSub = (this.state.pageNumber * this.state.pageSize) - this.state.pageSize + 1;
      }
      this.getJobData('job?metadata=true&step=true&number=' + this.state.pageSize + '&first=' + placeToLoadSub + '&sort=jobId%20desc');
    });
  }

  render() {
    return (
      <div>
        <div class="grid">
        <div class="title_box">Vidispine Job Tool</div>
        <div class="controls_box">
          <div class="size_button_16" onClick={this.pageSize16}>
            16
          </div>
          <div class="size_button_32" onClick={this.pageSize32}>
            32
          </div>
          <div class="size_button_64" onClick={this.pageSize64}>
            64
          </div>
          <div class="size_button_128" onClick={this.pageSize128}>
            128
          </div>
          <div class="job_number">
            Showing {this.placeToShow()} to {this.placeToShowEnd()} of {this.state.someData.hits} jobs
          </div>
          <div class="middle_placeholder">
            &nbsp;
          </div>
          <div class="page_number">
            Page {this.state.pageNumber} of {this.totalPages()}
          </div>
          <div class="page_form">
            <form onSubmit={this.handleSubmit}>
              <input class="page_input" size="4" type="text" ref={el => this.element = el} />
              <input class="go_button" type="submit" value="Go" />
            </form>
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
