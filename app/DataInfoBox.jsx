import React from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import beautify from "xml-beautifier";

class DataInfoBox extends React.Component {

  static propTypes = {
    dataData: PropTypes.object.isRequired,
  };

render() {
  return <div class="data_box">
    <div class="data_key">
      {this.props.dataData.key}
    </div>
    {this.props.dataData.value.substring(0,5) == "<?xml" ? (
      <div class="data_value">
        <SyntaxHighlighter language="xml" style={gradientDark} wrapLines="true" wrapLongLines="true">
          {beautify(this.props.dataData.value)}
        </SyntaxHighlighter>
      </div>
    ) : (
      <div class="data_value">
        {this.props.dataData.value}
      </div>
    )}
  </div>
  }
}

export default DataInfoBox;
