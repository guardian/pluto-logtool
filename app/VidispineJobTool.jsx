import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select'
import JobInfoBox from './JobInfoBox.jsx';
import Popup from "reactjs-popup";

class VidispineJobTool extends Component {

  static propTypes = {
      vidispine_host: PropTypes.string.isRequired,
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
      button: 1,
      autoRefresh: true,
      selectAllSwitch: false,
      open: false,
      sortDirection: 'desc',
      sortBy: 'jobId',
      sixteenGrey: false,
      thirtyTwoGrey: true,
      sixtyFourGrey: true,
      oneHundredAndTwentyEightGrey: true,
      networkAccessError: false,
      error401: false,
      error500: false,
    };
    var loopPlace = 0;
    const loopSize = 127;
    while (loopPlace <= loopSize) {
      this.state[`value${loopPlace}`] = false;
      this.state[`id${loopPlace}`] = '';
      loopPlace++;
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitPriority = this.handleSubmitPriority.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleChangeValue = e => {
    this.setState({
      ['value'+e.target.name]: e.target.checked,
      ['id'+e.target.name]: e.target.id,
      autoRefresh: false
    });
  }

  setStatePromise(newState) {
    return new Promise((resolve,reject)=>this.setState(newState, ()=>resolve()));
  }

  async getJobData(endpoint) {
    try {
      const headers = new Headers();
      const url = this.props.vidispine_host + "/API/" + endpoint;

      await this.setStatePromise({loading: true});
      const result = await fetch(url, {headers: {Accept: "application/json", Authorization: "Bearer " + window.sessionStorage["pluto:access-token"]}});

      switch(result.status) {
      case 200:
        const returnedData = await result.json();
        return this.setStatePromise({loading: false, vidispineData: returnedData});
      case 401:
        return this.setStatePromise({loading: false, error401: true});
      case 500:
        return this.setStatePromise({loading: false, error500: true});
      default:
        const errorContent = await result.text();
        return this.setStatePromise({loading: false, lastError: errorContent});
      }
    } catch {
      this.setState({
        networkAccessError: true
      });
    }
  }

  getDataForRefresh = () => {
    if (this.state.autoRefresh) {
      this.getJobDataWrapper();
    }
  }

  getJobDataWrapper() {
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
    this.getJobData('job?metadata=true&user=false&step=true&number=' + this.state.pageSize + '&first=' + placeToLoad + '&sort=' + this.state.sortBy + '%20' + this.state.sortDirection + '&state=' + selectedData + '&type=' + selectedDataType);
  }

  componentDidMount() {
    this.getJobData('job?metadata=true&step=true&number=16&first=1&sort=jobId%20desc&user=false');
    setInterval(this.getDataForRefresh, 5000);
  }

  pageHigher = () => {
    const totalNumberOfPages = this.totalPages();

    if (this.state.pageNumber < totalNumberOfPages) {
      this.setState({
        pageNumber: this.state.pageNumber + 1,
        autoRefresh: true
      },() => {
        this.clearSelections();
        this.getJobDataWrapper();
      });
    }
  }

  pageLower = () => {
    if (this.state.pageNumber > 1) {
      this.setState({
        pageNumber: this.state.pageNumber - 1,
        autoRefresh: true
      },() => {
        this.clearSelections();
        this.getJobDataWrapper();
      });
    }
  }

  pageSize16 = () => {
    this.setState({
      pageSize: 16,
      autoRefresh: true,
      sixteenGrey: false,
      thirtyTwoGrey: true,
      sixtyFourGrey: true,
      oneHundredAndTwentyEightGrey: true
    },() => {
      this.clearSelections();
      this.getJobDataWrapper();
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
      pageNumber: pageNumberToSet32,
      autoRefresh: true,
      sixteenGrey: true,
      thirtyTwoGrey: false,
      sixtyFourGrey: true,
      oneHundredAndTwentyEightGrey: true
    },() => {
      this.clearSelections();
      this.getJobDataWrapper();
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
      pageNumber: pageNumberToSet64,
      autoRefresh: true,
      sixteenGrey: true,
      thirtyTwoGrey: true,
      sixtyFourGrey: false,
      oneHundredAndTwentyEightGrey: true
    },() => {
      this.clearSelections();
      this.getJobDataWrapper();
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
      pageNumber: pageNumberToSet128,
      autoRefresh: true,
      sixteenGrey: true,
      thirtyTwoGrey: true,
      sixtyFourGrey: true,
      oneHundredAndTwentyEightGrey: false
    },() => {
      this.clearSelections();
      this.getJobDataWrapper();
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
        pageNumber: pageToGoTo,
        autoRefresh: true
      },() => {
        this.clearSelections();
        this.getJobDataWrapper();
        this.element.value = "";
      });
    }
  }

  handleSubmitPriority(event) {
    event.preventDefault();
    this.closeModal();
    var loopPlacePriority = 0;
    const loopSizePriority = 127;
    const encodedStringPriority = new Buffer(this.props.username + ":" + this.props.password).toString('base64');
    while (loopPlacePriority <= loopSizePriority) {
      if (this.state[`value${loopPlacePriority}`] == true) {
        var urlPriority = this.props.vidispine_host + "/API/job/" + this.state[`id${loopPlacePriority}`] + "?priority=" + this.elementPriority.value;
        fetch(urlPriority, {headers: {Accept: "application/json", Authorization: "Basic " + encodedStringPriority}, method: 'PUT'});
      }
      loopPlacePriority++;
    }
  }

  abortSelected = () => {
    var loopPlaceSubmit = 0;
    const loopSizeSubmit = 127;
    const encodedStringAbort = new Buffer(this.props.username + ":" + this.props.password).toString('base64');
    while (loopPlaceSubmit <= loopSizeSubmit) {
      if (this.state[`value${loopPlaceSubmit}`] == true) {
        var urlAbort = this.props.vidispine_host + "/API/job/" + this.state[`id${loopPlaceSubmit}`];
        fetch(urlAbort, {headers: {Accept: "application/json", Authorization: "Basic " + encodedStringAbort}, method: 'DELETE'});
      }
      loopPlaceSubmit++;
    }
  }

  handleChange = selectedOption => {
    this.setState(
      { selectedOption,
        pageNumber: 1,
        autoRefresh: true
      },
      () => {
        this.clearSelections();
        this.getJobDataWrapper();
      }
    );
  };

  handleChangeType = selectedOptionType => {
    this.setState(
      { selectedOptionType,
        pageNumber: 1,
        autoRefresh: true
      },
      () => {
        this.clearSelections();
        this.getJobDataWrapper();
      }
    );
  };

  clearSelections(){
    var loopPlaceClear = 0;
    const loopSizeClear = 127;
    while (loopPlaceClear <= loopSizeClear) {
      this.state[`value${loopPlaceClear}`] = false;
      this.state[`id${loopPlaceClear}`] = '';
      loopPlaceClear++;
    }
  }

  selectAll = () => {
    if (this.state.selectAllSwitch == false) {
      var loopPlaceAll = 0;
      while (loopPlaceAll < this.state.pageSize) {
        this.state[`value${loopPlaceAll}`] = true;
        var jobIdAll = this.state.vidispineData.job.hasOwnProperty(`${loopPlaceAll}`) ? this.state.vidispineData.job[`${loopPlaceAll}`].jobId : '';
        this.state[`id${loopPlaceAll}`] = jobIdAll;
        loopPlaceAll++;
      }
      this.setState({
        selectAllSwitch: true,
        autoRefresh: false
      });
    } else {
      this.clearSelections();
      this.setState({
        selectAllSwitch: false,
        autoRefresh: true
      });
    }
  }

  openModal() {
    this.setState({ open: true });
  }

  closeModal() {
    this.setState({ open: false });
  }

  rerunSelected = () => {
    var loopPlaceRe = 0;
    const loopSizeRe = 127;
    const encodedStringRe = new Buffer(this.props.username + ":" + this.props.password).toString('base64');
    while (loopPlaceRe <= loopSizeRe) {
      if (this.state[`value${loopPlaceRe}`] == true) {
        var urlRe = this.props.vidispine_host + "/API/job/" + this.state[`id${loopPlaceRe}`] + "/re-run";
        fetch(urlRe, {headers: {Accept: "application/json", Authorization: "Basic " + encodedStringRe}, method: 'POST'});
      }
      loopPlaceRe++;
    }
  }

  changeSort(input) {
    if (this.state.sortDirection == 'desc') {
      this.state.sortDirection = 'asc';
    } else {
      this.state.sortDirection = 'desc';
    }
    this.state.sortBy = input;
    this.clearSelections();
    this.getJobDataWrapper();
  }

  returnCSSForPageSize(pageSizeInput) {
    if (pageSizeInput == 16) {
      if (this.state.sixteenGrey) {
        return "size_button_16_grey";
      }
    }
    if (pageSizeInput == 32) {
      if (this.state.thirtyTwoGrey) {
        return "size_button_32_grey";
      } else {
        return "size_button_32";
      }
    }
    if (pageSizeInput == 64) {
      if (this.state.sixtyFourGrey) {
        return "size_button_64_grey";
      } else {
        return "size_button_64";
      }
    }
    if (pageSizeInput == 128) {
      if (this.state.oneHundredAndTwentyEightGrey) {
        return "size_button_128_grey";
      } else {
        return "size_button_128";
      }
    }
    return "size_button_16";
  }

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
        width: '270px',
        backgroundColor: 'black',
        fontSize: '13px',
        border: state.isFocused ? '2px solid white' : '2px solid white',
        boxShadow: state.isFocused ? 0 : 0,
        '&:hover': {
           border: state.isFocused ? '2px solid white' : '2px solid white'
        }
      }),
      menu: styles => ({ ...styles, backgroundColor: 'black', width: '270px', fontSize: '13px' }),
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
        <div class="title_box">
          <div class="title">
            Vidispine Job Tool
          </div>
          {this.state.error401
            ? <div class="possible_error">Permission denied by server. Maybe your login has expired? Click <a href="../">here</a> to log in again.</div>
            : ( this.state.error500
              ? <div class="possible_error">Server is not responding correctly. Please inform <a href="mailto:multimediatech@theguardian.com">multimediatech@theguardian.com</a></div>
              : ( this.state.networkAccessError
                ? <div class="possible_error">Could not connect to the server. Maybe your login has expired? Click <a href="../">here</a> to log in again.</div>
                : ''
              )
            )
          }
        </div>
        <div class="controls_box">
          <div class={this.returnCSSForPageSize(16)} onClick={this.pageSize16}>
            16
          </div>
          <div class={this.returnCSSForPageSize(32)} onClick={this.pageSize32}>
            32
          </div>
          <div class={this.returnCSSForPageSize(64)} onClick={this.pageSize64}>
            64
          </div>
          <div class={this.returnCSSForPageSize(128)} onClick={this.pageSize128}>
            128
          </div>
          <div class="job_number">
            Showing {this.placeToShow()} to {this.placeToShowEnd()} of {this.state.vidispineData.hits} jobs
          </div>
          <div class="select_all" onClick={this.selectAll}>
              Select All
          </div>
          <div class="rerun_selected">
            <input class="rerun_selected_button" onClick={this.rerunSelected} type="submit" value="Rerun Selected" />
          </div>
          <div class="priority_selected">
            <button class="priority_button" onClick={this.openModal}>
              Set Priority of Selected
            </button>
            <Popup
              open={this.state.open}
              onClose={this.closeModal}
              contentStyle={{width: "280px", height: "90px", border: "0px", backgroundColor: "black", borderRadius: "10px"}}
            >
                <div className="modal">
                  <a className="close" onClick={this.closeModal}>
                    &times;
                  </a>
                  <div className="job_header"> Change Priority of Jobs </div>
                  <div className="content">
                    {" "}
                    <form onSubmit={this.handleSubmitPriority}>
                      <select ref={el => this.elementPriority = el}>
                        <option>IMMEDIATE</option>
                        <option>HIGHEST</option>
                        <option>HIGH</option>
                        <option>MEDIUM</option>
                        <option>LOW</option>
                        <option>LOWEST</option>
                      </select>
                      <input class="priority_submit_button" type="submit" value="Change" />
                      <button
                        class="priority_cancel_button"
                        onClick={this.closeModal}
                      >
                        Cancel
                      </button>
                    </form>
                  </div>
                </div>
            </Popup>
          </div>
          <div class="abort_selected">
            <input class="abort_selected_button" onClick={this.abortSelected} type="submit" value="Abort Selected" />
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
              <input onClick={() => (this.state.button = 2)} class="go_button" type="submit" value="Go" onclick="clicked='Go'"/>
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
          <div class="id_heading" onClick={() => this.changeSort('jobId')}>
            Id.
          </div>
          <div class="filename_heading">
            Filename
          </div>
          <div class="type_heading" onClick={() => this.changeSort('type')}>
            Type
          </div>
          <div class="status_heading" onClick={() => this.changeSort('state')}>
            Status
          </div>
          <div class="progress_heading">
            Progress
          </div>
          <div class="user_heading" onClick={() => this.changeSort('user')}>
            User
          </div>
          <div class="started_heading" onClick={() => this.changeSort('startTime')}>
            Started
          </div>
          <div class="time_left_heading">
            Time Left
          </div>
          <div class="priority_heading" onClick={() => this.changeSort('priority')}>
            Priority
          </div>
        </div>
           {this.state.vidispineData.job && this.state.vidispineData.job.length > 0 ? (
             this.state.vidispineData.job.map((item, i) =><JobInfoBox mapPlace={i} jobData={item} jobId={item.jobId} value={this.state[`value${i}`]} onChangeValue={this.handleChangeValue}/>)
           ) : (
             <div class="no_jobs_found">No jobs found</div>
           )}
          </div>
      </div>
    )
  }
}

export default VidispineJobTool;
