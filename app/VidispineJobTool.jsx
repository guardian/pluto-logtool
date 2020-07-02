import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select'
import JobInfoBox from './JobInfoBox.jsx';

class VidispineJobTool extends Component {

  static propTypes = {
      vidispine_host: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
    };

constructor(props){
  super(props);
  this.state = {
    vidispineData: {
      hits: 0,
      job: []
    },
    pageNumber: 1,
    pageSize: 16,
    selectedOption: null,
    selectedOptionType: null,
  };
  this.handleSubmit = this.handleSubmit.bind(this);
}

  setStatePromise(newState) {
    return new Promise((resolve,reject)=>this.setState(newState, ()=>resolve()));
  }

  async getJobData(endpoint) {
    const headers = new Headers();
    const encodedString = new Buffer(this.props.username + ":" + this.props.password).toString('base64');
    const url = this.props.vidispine_host + "/API/" + endpoint;
    await this.setStatePromise({loading: true});
    const result = await fetch(url, {headers: {Accept: "application/json", Authorization: "Basic " + encodedString}});

    switch(result.status) {
    case 200:
      const returnedData = await result.json();
      return this.setStatePromise({loading: false, vidispineData: returnedData});
    default:
      const errorContent = await result.text();
      return this.setStatePromise({loading: false, lastError: errorContent});
    }
  }

  componentDidMount() {
    this.getJobData('job?metadata=true&step=true&number=16&first=1&sort=jobId%20desc');
  }

  pageHigher = () => {
    const totalNumberOfPages = this.totalPages();

    if (this.state.pageNumber < totalNumberOfPages) {
      this.setState({
        pageNumber: this.state.pageNumber + 1
      },() => {
        var placeToLoad = 1;
        if (this.state.pageNumber > 1) {
          placeToLoad = this.state.pageNumber * this.state.pageSize - this.state.pageSize + 1;
        }
        var selectedData = 'all';
        if (this.state.selectedOption != null) {
          selectedData = this.state.selectedOption.reduce((result, item) => {
            return `${result}${item.value},`
          }, "")
        }
        var selectedDataType = 'all';
        if (this.state.selectedOptionType != null) {
          selectedDataType = this.state.selectedOptionType.reduce((result, item) => {
            return `${result}${item.value},`
          }, "")
        }
        this.getJobData('job?metadata=true&step=true&number=' + this.state.pageSize + '&first=' + placeToLoad + '&sort=jobId%20desc&state=' + selectedData + '&type=' + selectedDataType);
      });
    }
  }

  pageLower = () => {
    if (this.state.pageNumber > 1) {
      this.setState({
        pageNumber: this.state.pageNumber - 1
      },() => {
        var placeToLoadTwo = 1;
        if (this.state.pageNumber > 1) {
          placeToLoadTwo = this.state.pageNumber * this.state.pageSize - this.state.pageSize + 1;
        }
        var selectedData = 'all';
        if (this.state.selectedOption != null) {
          selectedData = this.state.selectedOption.reduce((result, item) => {
            return `${result}${item.value},`
          }, "")
        }
        var selectedDataType = 'all';
        if (this.state.selectedOptionType != null) {
          selectedDataType = this.state.selectedOptionType.reduce((result, item) => {
            return `${result}${item.value},`
          }, "")
        }
        this.getJobData('job?metadata=true&step=true&number=' + this.state.pageSize + '&first=' + placeToLoadTwo + '&sort=jobId%20desc&state=' + selectedData + '&type=' + selectedDataType);
      });
    }
  }

  pageSize16 = () => {
    this.setState({
      pageSize: 16
    },() => {
      var placeToLoad16 = 1;
      if (this.state.pageNumber > 1) {
        placeToLoad16 = (this.state.pageNumber * this.state.pageSize) - this.state.pageSize + 1;
      }
      var selectedData = 'all';
      if (this.state.selectedOption != null) {
        selectedData = this.state.selectedOption.reduce((result, item) => {
          return `${result}${item.value},`
        }, "")
      }
      var selectedDataType = 'all';
      if (this.state.selectedOptionType != null) {
        selectedDataType = this.state.selectedOptionType.reduce((result, item) => {
          return `${result}${item.value},`
        }, "")
      }
      this.getJobData('job?metadata=true&step=true&number=16&first=' + placeToLoad16 + '&sort=jobId%20desc&state=' + selectedData + '&type=' + selectedDataType);
    });
  }

  pageSize32 = () => {
    const totalPages32 = Math.ceil(this.state.vidispineData.hits / 32);
    var pageNumberToSet32 = this.state.pageNumber;

    if (this.state.pageNumber > totalPages32) {
      pageNumberToSet32= totalPages32;
    }

    this.setState({
      pageSize: 32,
      pageNumber: pageNumberToSet32
    },() => {
      var placeToLoad32 = 1;
      if (this.state.pageNumber > 1) {
        placeToLoad32 = (this.state.pageNumber * this.state.pageSize) - this.state.pageSize + 1;
      }
      var selectedData = 'all';
      if (this.state.selectedOption != null) {
        selectedData = this.state.selectedOption.reduce((result, item) => {
          return `${result}${item.value},`
        }, "")
      }
      var selectedDataType = 'all';
      if (this.state.selectedOptionType != null) {
        selectedDataType = this.state.selectedOptionType.reduce((result, item) => {
          return `${result}${item.value},`
        }, "")
      }
      this.getJobData('job?metadata=true&step=true&number=32&first=' + placeToLoad32 + '&sort=jobId%20desc&state=' + selectedData + '&type=' + selectedDataType);
    });
  }

  pageSize64 = () => {
    const totalPages64 = Math.ceil(this.state.vidispineData.hits / 64);
    var pageNumberToSet64 = this.state.pageNumber;

    if (this.state.pageNumber > totalPages64) {
      pageNumberToSet64 = totalPages64;
    }

    this.setState({
      pageSize: 64,
      pageNumber: pageNumberToSet64
    },() => {
      var placeToLoad64 = 1;
      if (this.state.pageNumber > 1) {
        placeToLoad64 = (this.state.pageNumber * this.state.pageSize) - this.state.pageSize + 1;
      }
      var selectedData = 'all';
      if (this.state.selectedOption != null) {
        selectedData = this.state.selectedOption.reduce((result, item) => {
          return `${result}${item.value},`
        }, "")
      }
      var selectedDataType = 'all';
      if (this.state.selectedOptionType != null) {
        selectedDataType = this.state.selectedOptionType.reduce((result, item) => {
          return `${result}${item.value},`
        }, "")
      }
      this.getJobData('job?metadata=true&step=true&number=64&first=' + placeToLoad64 + '&sort=jobId%20desc&state=' + selectedData + '&type=' + selectedDataType);
    });
  }

  pageSize128 = () => {
    const totalPages128 = Math.ceil(this.state.vidispineData.hits / 128);
    var pageNumberToSet128 = this.state.pageNumber;

    if (this.state.pageNumber > totalPages128) {
      pageNumberToSet128 = totalPages128;
    }

    this.setState({
      pageSize: 128,
      pageNumber: pageNumberToSet128
    },() => {
      var placeToLoad128 = 1;
        if (this.state.pageNumber > 1) {
        placeToLoad128 = (this.state.pageNumber * this.state.pageSize) - this.state.pageSize + 1;
      }
      var selectedData = 'all';
      if (this.state.selectedOption != null) {
        selectedData = this.state.selectedOption.reduce((result, item) => {
          return `${result}${item.value},`
        }, "")
      }
      var selectedDataType = 'all';
      if (this.state.selectedOptionType != null) {
        selectedDataType = this.state.selectedOptionType.reduce((result, item) => {
          return `${result}${item.value},`
        }, "")
      }
      this.getJobData('job?metadata=true&step=true&number=128&first=' + placeToLoad128 + '&sort=jobId%20desc&state=' + selectedData + '&type=' + selectedDataType);
    });
  }

  placeToShow() {
    var placeToReturn = 1;
    if (this.state.pageNumber > 1) {
      placeToReturn = (this.state.pageNumber * this.state.pageSize) - this.state.pageSize + 1;
    }
    return placeToReturn;
  }

  placeToShowEnd() {
    var placeToReturnEnd = this.state.pageSize;
    if (this.state.pageNumber > 1) {
      placeToReturnEnd = (this.state.pageNumber * this.state.pageSize) + 1;
    }
    if (placeToReturnEnd > this.state.vidispineData.hits) {
      placeToReturnEnd = this.state.vidispineData.hits;
    }
    return placeToReturnEnd;
  }

  totalPages() {
    var totalToReturn = 1;
    totalToReturn = Math.ceil(this.state.vidispineData.hits / this.state.pageSize);
    return totalToReturn;
  }

  handleSubmit(event) {
    event.preventDefault();
    const totalNumberOfPagesSubmit = this.totalPages();
    const inputNumber = parseInt(this.element.value);
    var pageToGoTo = inputNumber;

    if (inputNumber > totalNumberOfPagesSubmit) {
      pageToGoTo = totalNumberOfPagesSubmit;
    }

    if (inputNumber > 0) {
      this.setState({
        pageNumber: pageToGoTo
      },() => {
        var placeToLoadSub = 1;
        if (this.state.pageNumber > 1) {
          placeToLoadSub = (this.state.pageNumber * this.state.pageSize) - this.state.pageSize + 1;
        }
        var selectedData = 'all';
        if (this.state.selectedOption != null) {
          selectedData = this.state.selectedOption.reduce((result, item) => {
            return `${result}${item.value},`
          }, "")
        }
        var selectedDataType = 'all';
        if (this.state.selectedOptionType != null) {
          selectedDataType = this.state.selectedOptionType.reduce((result, item) => {
            return `${result}${item.value},`
          }, "")
        }
        this.getJobData('job?metadata=true&step=true&number=' + this.state.pageSize + '&first=' + placeToLoadSub + '&sort=jobId%20desc&state=' + selectedData + '&type=' + selectedDataType);
        this.element.value = "";
      });
    }
  }

  handleChange = selectedOption => {
    this.setState(
      { selectedOption,
        pageNumber: 1
      },
      () => {
        var placeToLoadStatus = 1;
        if (this.state.pageNumber > 1) {
          placeToLoadStatus = (this.state.pageNumber * this.state.pageSize) - this.state.pageSize + 1;
        }
        var selectedData = 'all';
        if (this.state.selectedOption != null) {
          selectedData = this.state.selectedOption.reduce((result, item) => {
            return `${result}${item.value},`
          }, "")
        }
        var selectedDataType = 'all';
        if (this.state.selectedOptionType != null) {
          selectedDataType = this.state.selectedOptionType.reduce((result, item) => {
            return `${result}${item.value},`
          }, "")
        }
        this.getJobData('job?metadata=true&step=true&number=' + this.state.pageSize + '&first=' + placeToLoadStatus + '&sort=jobId%20desc&state=' + selectedData + '&type=' + selectedDataType);
      }
    );
  };

  handleChangeType = selectedOptionType => {
    this.setState(
      { selectedOptionType,
        pageNumber: 1
      },
      () => {
        var placeToLoadStatus = 1;
        if (this.state.pageNumber > 1) {
          placeToLoadStatus = (this.state.pageNumber * this.state.pageSize) - this.state.pageSize + 1;
        }
        var selectedData = 'all';
        if (this.state.selectedOption != null) {
          selectedData = this.state.selectedOption.reduce((result, item) => {
            return `${result}${item.value},`
          }, "")
        }
        var selectedDataType = 'all';
        if (this.state.selectedOptionType != null) {
          selectedDataType = this.state.selectedOptionType.reduce((result, item) => {
            return `${result}${item.value},`
          }, "")
        }
        this.getJobData('job?metadata=true&step=true&number=' + this.state.pageSize + '&first=' + placeToLoadStatus + '&sort=jobId%20desc&state=' + selectedData + '&type=' + selectedDataType);
      }
    );
  };

  render() {
    const statusOptions = [
      { value: 'ABORTED', label: 'Aborted', color: '#ffffff' },
      { value: 'ABORTED_PENDING', label: 'Aborted Pending', color: '#ffffff' },
      { value: 'FAILED_TOTAL', label: 'Failed', color: '#ffffff' },
      { value: 'FINISHED', label: 'Finished', color: '#ffffff' },
      { value: 'FINISHED_WARNING', label: 'Finished with Warning', color: '#ffffff' },
      { value: 'READY', label: 'Ready', color: '#ffffff' },
      { value: 'STARTED', label: 'Started', color: '#ffffff' },
      { value: 'VIDINET_JOB', label: 'Vidinet', color: '#ffffff' },
      { value: 'WAITING', label: 'Waiting', color: '#ffffff' },
    ];
    const typeOptions = [
      { value: 'ANALYZE', label: 'Analyze', color: '#ffffff' },
      { value: 'AUTO_IMPORT', label: 'Auto Import', color: '#ffffff' },
      { value: 'CONFORM', label: 'Conform', color: '#ffffff' },
      { value: 'COPY_FILE', label: 'Copy File', color: '#ffffff' },
      { value: 'DELETE_FILE', label: 'Delete File', color: '#ffffff' },
      { value: 'ESSENCE_VERSION', label: 'Essence Version', color: '#ffffff' },
      { value: 'EXPORT', label: 'Export', color: '#ffffff' },
      { value: 'IMPORT', label: 'Import', color: '#ffffff' },
      { value: 'LIST_ITEMS', label: 'List Items', color: '#ffffff' },
      { value: 'MOVE_FILE', label: 'Move File', color: '#ffffff' },
      { value: 'NONE', label: 'None', color: '#ffffff' },
      { value: 'PLACEHOLDER_IMPORT', label: 'Placeholder Import', color: '#ffffff' },
      { value: 'RAW_IMPORT', label: 'Raw Import', color: '#ffffff' },
      { value: 'RAW_TRANSCODE', label: 'Raw Transcode', color: '#ffffff' },
      { value: 'SHAPE_IMPORT', label: 'Shape Import', color: '#ffffff' },
      { value: 'SHAPE_UPDATE', label: 'Shape Update', color: '#ffffff' },
      { value: 'SIDECAR_IMPORT', label: 'Sidecar Import', color: '#ffffff' },
      { value: 'THUMBNAIL', label: 'Thumbnail', color: '#ffffff' },
      { value: 'TIMELINE', label: 'Timeline', color: '#ffffff' },
      { value: 'TRANSCODE', label: 'Transcode', color: '#ffffff' },
      { value: 'TRANSCODE_RANGE', label: 'Transcode Range', color: '#ffffff' },
    ];
    const statusStyles = {
      control: (provided, state) => ({
        ...provided,
        width: '200px',
        backgroundColor: 'black',
        fontSize: '13px',
        border: state.isFocused ? '2px solid white' : '2px solid white',
        boxShadow: state.isFocused ? 0 : 0,
        '&:hover': {
           border: state.isFocused ? '2px solid white' : '2px solid white'
        }
      }),
      menu: styles => ({ ...styles, backgroundColor: 'black', width: '200px', fontSize: '13px' }),
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
          ...styles,
          backgroundColor: isDisabled
            ? null
            : isSelected
            ? data.color
            : isFocused
            ? '#222222'
            : null,
          cursor: isDisabled ? 'not-allowed' : 'default',

          ':active': {
            ...styles[':active'],
            backgroundColor: '#222222',
          },
        };
      },
      multiValue: (styles, { data }) => {
        return {
          ...styles,
          backgroundColor: '#222222',
        };
      },
      multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: data.color,
      }),
      multiValueRemove: (styles, { data }) => ({
        ...styles,
        color: data.color,
        ':hover': {
          backgroundColor: '#333333',
          color: 'white',
        },
      }),
    };
    const { selectedOption } = this.state;
    const { selectedOptionType } = this.state;

    return (
      <div>
        <div class="grid">
        <div class="title_box">Vidispine Job Tool</div>
        <div class="controls_box">
          <div class="size_button_16" onClick={this.pageSize16}>
            16
          </div>
          <div class="size_button_32" onClick={this.pageSize32}>
            32
          </div>
          <div class="size_button_64" onClick={this.pageSize64}>
            64
          </div>
          <div class="size_button_128" onClick={this.pageSize128}>
            128
          </div>
          <div class="job_number">
            Showing {this.placeToShow()} to {this.placeToShowEnd()} of {this.state.vidispineData.hits} jobs
          </div>
          <div class="left_placeholder">
            &nbsp;
          </div>
          <div class="state_label">
            State:
          </div>
          <div class="state_input">
            <Select
              isMulti
              name="statusSelect"
              options={statusOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              styles={statusStyles}
              value={selectedOption}
              onChange={this.handleChange}
              isClearable={false}
              components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null, Placeholder:() => null }}
              />
          </div>
          <div class="type_label">
            Type:
          </div>
          <div class="type_input">
            <Select
              isMulti
              name="typeSelect"
              options={typeOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              styles={statusStyles}
              value={selectedOptionType}
              onChange={this.handleChangeType}
              isClearable={false}
              components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null, Placeholder:() => null }}
              maxMenuHeight={640}
              />
          </div>
          <div class="page_number">
            Page {this.state.pageNumber} of {this.totalPages()}
          </div>
          <div class="page_form">
            <form onSubmit={this.handleSubmit}>
              <input class="page_input" size="4" type="text" ref={el => this.element = el} />
              <input class="go_button" type="submit" value="Go" />
            </form>
          </div>
          <div class="last_page" onClick={this.pageLower}>
            <div class="arrow_left"></div>
          </div>
          <div class="next_page" onClick={this.pageHigher}>
            <div class="arrow_right"></div>
          </div>
        </div>
        <div class="headings_box">
          <div class="select_heading">
            &nbsp;
          </div>
          <div class="id_heading">
            Id.
          </div>
          <div class="filename_heading">
            Filename
          </div>
          <div class="type_heading">
            Type
          </div>
          <div class="status_heading">
            Status
          </div>
          <div class="progress_heading">
            Progress
          </div>
          <div class="user_heading">
            User
          </div>
          <div class="started_heading">
            Started
          </div>
          <div class="priority_heading">
            Priority
          </div>
        </div>
           {this.state.vidispineData.job && this.state.vidispineData.job.length > 0 ? (
             this.state.vidispineData.job.map(item =><JobInfoBox jobData={item} jobId={item.jobId}/>)
           ) : (
             <div class="no_jobs_found">No jobs found</div>
           )}
          </div>
      </div>
    )
  }
}

export default VidispineJobTool;
