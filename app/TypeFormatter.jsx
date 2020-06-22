import React from 'react';
import PropTypes from 'prop-types';

class TypeFormatter extends React.Component {

  static propTypes = {
    type: PropTypes.string.isRequired
  };

  returnType(type) {
    if (type == 'RAW_IMPORT') {
      return "Raw Import";
    }
    if (type == 'NONE') {
      return "None";
    }
    if (type == 'IMPORT') {
      return "Import";
    }
    if (type == 'PLACEHOLDER_IMPORT') {
      return "Placeholder Import";
    }
    if (type == 'AUTO_IMPORT') {
      return "Auto Import";
    }
    if (type == 'SHAPE_IMPORT') {
      return "Shape Import";
    }
    if (type == 'SIDECAR_IMPORT') {
      return "Sidecar Import";
    }
    if (type == 'ESSENCE_VERSION') {
      return "Essence Version";
    }
    if (type == 'TRANSCODE') {
      return "Transcode";
    }
    if (type == 'TRANSCODE_RANGE') {
      return "Transcode Range";
    }
    if (type == 'CONFORM') {
      return "Conform";
    }
    if (type == 'TIMELINE') {
      return "Timeline";
    }
    if (type == 'THUMBNAIL') {
      return "Thumbnail";
    }
    if (type == 'ANALYZE') {
      return "Analyze";
    }
    if (type == 'SHAPE_UPDATE') {
      return "Shape Update";
    }
    if (type == 'RAW_TRANSCODE') {
      return "Raw Transcode";
    }
    if (type == 'EXPORT') {
      return "Export";
    }
    if (type == 'COPY_FILE') {
      return "Copy File";
    }
    if (type == 'MOVE_FILE') {
      return "Move File";
    }
    if (type == 'DELETE_FILE') {
      return "Delete File";
    }
    if (type == 'LIST_ITEMS') {
      return "List Items";
    }
    return type;
  }

render() {
  return <div>{this.returnType(this.props.type)}
  </div>
  }
}

export default TypeFormatter;
