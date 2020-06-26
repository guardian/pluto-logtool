import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  withRouter
} from "react-router-dom";
import moment from 'moment';
import StatusFormatter from './StatusFormatter.jsx';
import TypeFormatter from './TypeFormatter.jsx';
import PriorityFormatter from './PriorityFormatter.jsx';

class JobPage extends Component {

constructor(props){
super(props);
this.state = {
  vidispineData: {
    data: []
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
    const idToLoad = this.props.match.params.id;
    this.getJobData('job/' + idToLoad + '?metadata=true');
  }

  getValue(data,findthis) {
    var returnNow = 0;
    for (let [key, value] of Object.entries(data)) {
      for (let [key3, value3] of Object.entries(value)) {
        if (returnNow == 1) {
          return value3;
        }
        if (findthis == value3) {
          returnNow = 1;
        }
      }
    }
    return 'Unknown';
  }

  render() {
    const id = this.props.match.params.id;
    const fileName = this.getValue(this.state.vidispineData.data, "originalFilename");
    const stepNumber = this.state.vidispineData.hasOwnProperty("currentStep") ? this.state.vidispineData.currentStep.number : 0;
    const itemId = this.getValue(this.state.vidispineData.data, "itemId");
    const fullPath = this.getValue(this.state.vidispineData.data, "sourceUri");
    const tags = this.getValue(this.state.vidispineData.data, "tags");
    return (
      <div>
        <div class="job_page_grid">
          <div class="job_page_title_box">
            Job {id} for {fileName}
          </div>
          <div class="job_data_box">
            <div class="job_data_label">
              Progress:
            </div>
            <div class="job_data_value">
              {stepNumber}/{this.state.vidispineData.totalSteps}
            </div>
          </div>
          <div class="job_data_box">
            <div class="job_data_label">
              Id.:
            </div>
            <div class="job_data_value">
              {id}
            </div>
          </div>
          <div class="job_data_box">
            <div class="job_data_label">
              Started:
            </div>
            <div class="job_data_value">
              {moment(this.state.vidispineData.started).format("D/M/YYYY H:mm")}
            </div>
          </div>
          <div class="job_data_box">
            <div class="job_data_label">
              User:
            </div>
            <div class="job_data_value">
              {this.state.vidispineData.user}
            </div>
          </div>
          <div class="job_data_box">
            <div class="job_data_label">
              Type:
            </div>
            <div class="job_data_value">
              {<TypeFormatter type={this.state.vidispineData.type}/>}
            </div>
          </div>
          <div class="job_data_box">
            <div class="job_data_label">
              Status:
            </div>
            <div class="job_data_value">
              {<StatusFormatter status={this.state.vidispineData.status}/>}
            </div>
          </div>
          <div class="job_data_box">
            <div class="job_data_label">
              Target Object Id.:
            </div>
            <div class="job_data_value">
              {itemId}
            </div>
          </div>
          <div class="job_data_box">
            <div class="job_data_label">
              Original Filename:
            </div>
            <div class="job_data_value">
              {fileName}
            </div>
          </div>
          <div class="job_data_box">
            <div class="job_data_label">
              Source File:
            </div>
            <div class="job_data_value">
              {fullPath}
            </div>
          </div>
          <div class="job_data_box">
            <div class="job_data_label">
              Tags:
            </div>
            <div class="job_data_value">
              {tags}
            </div>
          </div>
          <div class="job_data_box">
            <div class="job_data_label">
              Job Steps:
            </div>
            <div class="job_data_value">
              {stepNumber} of {this.state.vidispineData.totalSteps}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(JobPage);
