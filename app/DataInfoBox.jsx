import React from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import beautify from "xml-beautifier";
import JSONPretty from 'react-json-pretty';
var JSONPretty1337 = require('react-json-pretty/dist/1337');

class DataInfoBox extends React.Component {

  static propTypes = {
    dataData: PropTypes.object.isRequired,
  };

render() {
  return <div class="data_box">
    <div class="data_key">
      {this.props.dataData.key}
    </div>
    {(() => {
      if (this.props.dataData.value.substring(0,5) == "<?xml") {
        return (
          <div class="data_value">
            <SyntaxHighlighter language="xml" style={gradientDark} wrapLines="true" wrapLongLines="true">
              {beautify(this.props.dataData.value)}
            </SyntaxHighlighter>
          </div>
        )
      } else if ((this.props.dataData.key == "thumbnails") || (this.props.dataData.key == "storageMethodSelectionProgress")) {
        return (
          <div class="data_value">
            <JSONPretty id="json-pretty" data={this.props.dataData.value} theme={JSONPretty1337}></JSONPretty>
          </div>
        )
      } else {
        return (
          <div class="data_value">
            {this.props.dataData.value}
          </div>
        )
      }
    })()}
  </div>
  }
}

export default DataInfoBox;
