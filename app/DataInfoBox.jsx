import React from 'react';
import PropTypes from 'prop-types';

class DataInfoBox extends React.Component {

  static propTypes = {
    dataData: PropTypes.object.isRequired,
  };

render() {
  return <div class="data_box">
    <div class="data_key">
      {this.props.dataData.key}
    </div>
    <div class="data_value">
      {this.props.dataData.value}
    </div>
  </div>
  }
}

export default DataInfoBox;
