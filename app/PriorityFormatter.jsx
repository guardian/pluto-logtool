import React from 'react';
import PropTypes from 'prop-types';

class PriorityFormatter extends React.Component {

  static propTypes = {
    priority: PropTypes.string.isRequired
  };

  /**
   * nicely formats the priority string from VS by uppercasing the first character and lowercasing the rest of it
   * @param priority the upper case priority string
   * @returns {*} nicely formatted priority string
   */
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
