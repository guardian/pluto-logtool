import React from 'react';
import PropTypes from 'prop-types';

class PriorityFormatter extends React.Component {

  static propTypes = {
    priority: PropTypes.string.isRequired
  };

  returnPriority(priority) {
    return priority.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
  }

render() {
  return <div>{this.returnPriority(this.props.priority)}
  </div>
  }
}

export default PriorityFormatter;
