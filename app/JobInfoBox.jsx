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
    jobId: PropTypes.string.isRequired,
    mapPlace: PropTypes.string.isRequired
  };

  returnStatusForCSS(status) {
    // Accepts a status. If the status has a special CSS statement with a custom background colour, return the name of the correct CSS statement. If not return the name of the CSS statement for normal job boxes.
    if (status == 'FAILED_TOTAL') {
      return "job_box_failed";
    }
    if (status == 'FINISHED') {
      return "job_box_finished";
    }
    if (status == 'FINISHED_WARNING') {
      return "job_box_warning";
    }
    if (status == 'ABORTED') {
      return "job_box_aborted";
    }
    return "job_box_normal";
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

  displayProgressBar(current, total) {
    if (current < 1) {
      return (
        <div class="progress_bar" style={{width:'0%'}}></div>
      )
    }
    const percentNumber = 100 / total;
    var percentageDone = Math.round(percentNumber * current);
    if (percentageDone > 100) {
      percentageDone = 100;
    }
    return (
      <div class="progress_bar" style={{width:percentageDone+'%'}}></div>
    )
  }

  displayTime(input) {
    if (input == 'Unknown') {
      return input;
    } else {
      var d = Number(parseInt(input));
      var h = Math.floor(d / 3600);
      var m = Math.floor(d % 3600 / 60);
      var s = Math.floor(d % 3600 % 60);
      return h + ":" + ('0'  + m).slice(-2) + ":" +  ('0'  + s).slice(-2);
    }
  }

render() {
  const stepNumber = this.props.jobData.hasOwnProperty("currentStep") ? this.props.jobData.currentStep.number : 0;
  const fileName = this.getValue(this.props.jobData.data, "originalFilename");
  const timeLeft = this.getValue(this.props.jobData.data, "transcodeEstimatedTimeLeft");
  return <div class={this.returnStatusForCSS(this.props.jobData.status)}>
    <div class="select_data">
      <input type="checkbox" id={this.props.jobId} checked={this.props.value} onChange={this.props.onChangeValue} name={this.props.mapPlace} />
    </div>
    <Link to={"/job/" + this.props.jobData.jobId} class="job_page_link" id={this.props.jobId} target="_blank">
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
        <div class="progress_bar_background">
          {this.displayProgressBar(stepNumber, this.props.jobData.totalSteps)}
        </div>
      </div>
      <div class="user_data">
        {this.props.jobData.user}
      </div>
      <div class="started_data">
        {moment(this.props.jobData.started).format("D/M/YYYY H:mm")}
      </div>
      <div class="time_left_data">
        {this.displayTime(timeLeft)}
      </div>
      <div class="priority_data">
        {<PriorityFormatter priority={this.props.jobData.priority}/>}
      </div>
    </Link>
  </div>
  }
}

export default JobInfoBox;
