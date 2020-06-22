import React from 'react';
import PropTypes from 'prop-types';

class StatusFormatter extends React.Component {

  static propTypes = {
    status: PropTypes.string.isRequired
  };

  returnStatus(status) {
    if (status == 'FAILED_TOTAL') {
      return "Failed";
    }
    if (status == 'READY') {
      return "Ready";
    }
    if (status == 'STARTED') {
      return "Started";
    }
    if (status == 'VIDINET_JOB') {
      return "Vidinet";
    }
    if (status == 'FINISHED') {
      return "Finished";
    }
    if (status == 'FINISHED_WARNING') {
      return "Finished with Warning";
    }
    if (status == 'WAITING') {
      return "Waiting";
    }
    if (status == 'ABORTED_PENDING') {
      return "Aborted Pending";
    }
    if (status == 'ABORTED') {
      return "Aborted";
    }
    return status;
  }

render() {
  return <div>{this.returnStatus(this.props.status)}
  </div>
  }
}

export default StatusFormatter;
