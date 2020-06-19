import React from 'react';
import PropTypes from 'prop-types';
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
    return "job_box_normal";
  }

render() {
  const stepNumber = this.props.jobData.hasOwnProperty("currentStep") ? this.props.jobData.currentStep.number : 0;
  return <div class={this.returnStatusForCSS(this.props.jobData.status)} id={this.props.jobId}>
    <div class="select_data">
      &nbsp;
    </div>
    <div class="id_data">
      {this.props.jobData.jobId}
    </div>
    <div class="type_data">
      {this.props.jobData.type}
    </div>
    <div class="status_data">
      {this.props.jobData.status}
    </div>
    <div class="progress_data">
      {stepNumber}/{this.props.jobData.totalSteps}
    </div>
    <div class="user_data">
      {this.props.jobData.user}
    </div>
    <div class="started_data">
      {moment(this.props.jobData.started).format("HH:mm:ss ddd Do MMM YYYY")}
    </div>
    <div class="priority_data">
      {this.props.jobData.priority}
    </div>
  </div>
  }
}

export default JobInfoBox;
