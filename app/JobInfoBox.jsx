import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Link, Route, Switch, Redirect, withRouter} from 'react-router-dom';
import StatusFormatter from './StatusFormatter.jsx';
import TypeFormatter from './TypeFormatter.jsx';
import PriorityFormatter from './PriorityFormatter.jsx';
import moment from 'moment';

class JobInfoBox extends React.Component {

  static propTypes = {
    jobData: PropTypes.object.isRequired,
    jobId: PropTypes.string.isRequired
  };

  returnStatusForCSS(status) {
    if (status == 'FAILED_TOTAL') {
      return "job_box_failed";
    }
    if (status == 'FINISHED') {
      return "job_box_finished";
    }
    return "job_box_normal";
  }

  getValue(data,findthis) {
    var returnNow = 0;
    for (let [key, value] of Object.entries(data)) {
      //console.log(`Part 1`);
      //console.log(`${key}: ${value}`);
      //for (let [key2, value2] of Object.entries(key)) {
        //console.log(`Part 2`);
        //console.log(`${key2}: ${value2}`);
      //}
      for (let [key3, value3] of Object.entries(value)) {
        //console.log(`Part 3`);
        //console.log(`${key3}: ${value3}`);
        if (returnNow == 1) {
          return value3;
        }
        if (findthis == value3) {
          //console.log(`Found`);
          returnNow = 1;
        }
      }
    }
    return 'Unknown';
  }

render() {
  const stepNumber = this.props.jobData.hasOwnProperty("currentStep") ? this.props.jobData.currentStep.number : 0;
  const fileName = this.getValue(this.props.jobData.data, "originalFilename");
  return <Link to={"/job/" + this.props.jobData.jobId} class={this.returnStatusForCSS(this.props.jobData.status)} id={this.props.jobId}>
    <div class="select_data">
      &nbsp;
    </div>
    <div class="id_data">
      {this.props.jobData.jobId}
    </div>
    <div class="filename_data">
      {fileName}
    </div>
    <div class="type_data">
      {<TypeFormatter type={this.props.jobData.type}/>}
    </div>
    <div class="status_data">
      {<StatusFormatter status={this.props.jobData.status}/>}
    </div>
    <div class="progress_data">
      {stepNumber}/{this.props.jobData.totalSteps}
    </div>
    <div class="user_data">
      {this.props.jobData.user}
    </div>
    <div class="started_data">
      {moment(this.props.jobData.started).format("D/M/YYYY H:mm")}
    </div>
    <div class="priority_data">
      {<PriorityFormatter priority={this.props.jobData.priority}/>}
    </div>
  </Link>
  }
}

export default JobInfoBox;