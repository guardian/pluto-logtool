import React from 'react';
import PropTypes from 'prop-types';

class PriorityFormatter extends React.Component {

  static propTypes = {
    priority: PropTypes.string.isRequired
  };

  returnPriority(priority) {
    if (priority == 'MEDIUM') {
      return "Medium";
    }
    if (priority == 'LOWEST') {
      return "Lowest";
    }
    if (priority == 'LOW') {
      return "Low";
    }
    if (priority == 'HIGH') {
      return "High";
    }
    if (priority == 'HIGHEST') {
      return "Highest";
    }
    if (priority == 'IMMEDIATE') {
      return "Immediate";
    }
    return priority;
  }

render() {
  return <div>{this.returnPriority(this.props.priority)}
  </div>
  }
}

export default PriorityFormatter;
