import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { withGlobalValue } from "../Context";
import ClickOutside from "./ClickOutside";
import Select from "react-select";
import "react-select/dist/react-select.css";
import moment from "moment";
import "moment/locale/ko";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Popover, PopoverBody } from "reactstrap";

const DivContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const DivHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-left: 20px;
  margin-right: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: ${props => props.theme};
  color: white;
`;

const DivHeaderInputperson = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-width: 150px;
  background-color: ${props =>
    props.filtered.length > 0 ? props.theme.LIGHT : props.theme.DARK};
`;

const DivHeaderAccount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-width: 80px;
  background-color: ${props =>
    props.filtered.length > 0 ? props.theme.LIGHT : props.theme.DARK};
`;

const DivHeaderLiner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 120px;
  min-width: 120px;
  background-color: ${props =>
    props.filtered.length > 0 ? props.theme.LIGHT : props.theme.DARK};
`;

const DivHeaderPol = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-width: 120px;
  background-color: ${props =>
    props.filtered.length > 0 ? props.theme.LIGHT : props.theme.DARK};
`;

const DivHeaderPod = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-width: 120px;
  background-color: ${props =>
    props.filtered.length > 0 ? props.theme.LIGHT : props.theme.DARK};
`;

const DivHeaderBS = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 200px;
  min-width: 200px;

  // HEADER 높이 설정
  height: 70px;

  border-left: 1px solid #eee;
  background-color: ${props => props.theme};
`;

const DivHeaderBSTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  border-bottom: 1px solid #eee;
  background-color: ${props => props.theme};
`;

const DivHeaderBSType = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  background-color: ${props => props.theme};
`;

const DivHeaderBSType20 = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme};
`;

const DivHeaderBSType40 = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme};
`;

const DivHeaderBSType4H = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme};
`;

const DivHeaderLF = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 70px;
  min-width: 70px;
  border-left: 1px solid #eee;
  background-color: ${props => props.theme};
`;

const DivHeaderDF = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 70px;
  min-width: 70px;
  background-color: ${props => props.theme};
`;

const DivHeaderED = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 70px;
  min-width: 70px;
  background-color: ${props => props.theme};
`;

const DivHeaderOD = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 70px;
  min-width: 70px;
  background-color: ${props => props.theme};
`;

const DivHeaderRMK = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 40px;
  min-width: 40px;
  background-color: ${props => props.theme};
`;

const DivHeaderButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 40px;
  min-width: 40px;
  background-color: ${props => props.theme};
`;

const DivDropdown = styled.div`
  position: fixed;
  top: ${props => props.top + props.height - 90 + "px"};
  left: ${props => props.left + props.width / 2 - 85 + "px"};
  width: 170px;
  border-radius: 5px;
`;

const DivEDOD = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

class CustomInputDatePickerSF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHeaderPopoverOpen: false
    };
    this._togglePopover = this._togglePopover.bind(this);
  }
  componentDidMount() {
    this._togglePopover();
  }
  render() {
    return (
      <DivEDOD>
        <button
          id="headersf"
          className="btn btn-primary btn-sm"
          onClick={this.props.onClick}
          style={{ backgroundColor: "#053F5C", borderColor: "#053F5C" }}
          tabIndex="-1"
        >
          {this.props.value}
        </button>
        유효일
        <Popover
          placement="top"
          isOpen={this.state.isHeaderPopoverOpen}
          target="headersf"
          toggle={this._togglePopover}
        >
          <PopoverBody>검색</PopoverBody>
        </Popover>
      </DivEDOD>
    );
  }
  _togglePopover = () => {
    this.setState({
      isHeaderPopoverOpen: !this.state.isHeaderPopoverOpen
    });
  };
}

class CustomInputDatePickerST extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHeaderPopoverOpen: false
    };
    this._togglePopover = this._togglePopover.bind(this);
  }
  componentDidMount() {
    this._togglePopover();
  }
  render() {
    return (
      <DivEDOD>
        <button
          id="headerst"
          className="btn btn-primary btn-sm"
          onClick={this.props.onClick}
          style={{ backgroundColor: "#053F5C", borderColor: "#053F5C" }}
          tabIndex="-1"
        >
          {this.props.value}
        </button>
        견적일
        <Popover
          placement="top"
          isOpen={this.state.isHeaderPopoverOpen}
          target="headerst"
          toggle={this._togglePopover}
        >
          <PopoverBody>검색</PopoverBody>
        </Popover>
      </DivEDOD>
    );
  }
  _togglePopover = () => {
    this.setState({
      isHeaderPopoverOpen: !this.state.isHeaderPopoverOpen
    });
  };
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInputpersonDropdown: false,
      isAccountDropdown: false,
      isLinerDropdown: false,
      isPolDropdown: false,
      isPodDropdown: false,
      isSFDropdown: false,
      isSTDropdown: false,
      isHeaderPopoverOpen: false,
      menuTop: "",
      menuLeft: "",
      menuHeight: "",
      menuWidth: "",
      foundIp: "",
      foundAc: "",
      foundLn: "",
      foundPl: "",
      foundPd: "",
      selectedIp: "",
      selectedAc: "",
      selectedLn: "",
      selectedPl: "",
      selectedPd: "",
      initialSF: moment()
        .subtract(1, "months")
        .startOf("month"),
      initialST: moment()
        .add(1, "months")
        .endOf("month")
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevState.selectedIp !== this.state.selectedIp ||
      prevState.selectedAc !== this.state.selectedAc ||
      prevState.selectedLn !== this.state.selectedLn ||
      prevState.selectedPl !== this.state.selectedPl ||
      prevState.selectedPd !== this.state.selectedPd ||
      prevState.initialSF !== this.state.initialSF ||
      prevState.initialST !== this.state.initialST
    ) {
      this._setQueryParams();
    }
  }
  componentDidMount() {
    this._getHeaderData("inputperson");
    this._getHeaderData("account");
    this._getHeaderData("liner");
    this._getHeaderData("pol");
    this._getHeaderData("pod");
    this._togglePopover();
  }
  render() {
    const { theme } = this.props.globalState;
    const {
      isInputpersonDropdown,
      isAccountDropdown,
      isLinerDropdown,
      isPolDropdown,
      isPodDropdown,
      menuTop,
      menuLeft,
      menuHeight,
      menuWidth,
      foundIp,
      foundAc,
      foundLn,
      foundPl,
      foundPd,
      selectedIp,
      selectedAc,
      selectedLn,
      selectedPl,
      selectedPd,
      initialSF,
      initialST
    } = this.state;
    return (
      <DivContainer>
        <DivHeader theme={theme.DARK}>
          <DivHeaderInputperson theme={theme} filtered={selectedIp}>
            <span
              id="headerip"
              onClick={event =>
                this._toggleDropdown(event, "isInputpersonDropdown")
              }
              style={{ cursor: "pointer" }}
            >
              {selectedIp.length > 0 ? (
                <i class="fas fa-filter" style={{ color: "white" }}>
                  {" 입력자"}
                </i>
              ) : (
                "입력자"
              )}
            </span>
            <Popover
              placement="top"
              isOpen={this.state.isHeaderPopoverOpen}
              target="headerip"
              toggle={this._togglePopover}
            >
              <PopoverBody>검색</PopoverBody>
            </Popover>
          </DivHeaderInputperson>
          <DivHeaderAccount theme={theme} filtered={selectedAc}>
            <span
              onClick={event =>
                this._toggleDropdown(event, "isAccountDropdown")
              }
              id="headerac"
              style={{ cursor: "pointer" }}
            >
              {selectedAc.length > 0 ? (
                <i class="fas fa-filter" style={{ color: "white" }}>
                  {" 화주"}
                </i>
              ) : (
                "화주"
              )}
            </span>
            <Popover
              placement="top"
              isOpen={this.state.isHeaderPopoverOpen}
              target="headerac"
              toggle={this._togglePopover}
            >
              <PopoverBody>검색</PopoverBody>
            </Popover>
          </DivHeaderAccount>
          <DivHeaderLiner theme={theme} filtered={selectedLn}>
            <span
              id="headerln"
              onClick={event => this._toggleDropdown(event, "isLinerDropdown")}
              style={{ cursor: "pointer" }}
            >
              {selectedLn.length > 0 ? (
                <i class="fas fa-filter" style={{ color: "white" }}>
                  {" 선사"}
                </i>
              ) : (
                "선사"
              )}
            </span>
            <Popover
              placement="top"
              isOpen={this.state.isHeaderPopoverOpen}
              target="headerln"
              toggle={this._togglePopover}
            >
              <PopoverBody>검색</PopoverBody>
            </Popover>
          </DivHeaderLiner>
          <DivHeaderPol theme={theme} filtered={selectedPl}>
            <span
              id="headerpl"
              onClick={event => this._toggleDropdown(event, "isPolDropdown")}
              style={{ cursor: "pointer" }}
            >
              {selectedPl.length > 0 ? (
                <i class="fas fa-filter" style={{ color: "white" }}>
                  {" POL"}
                </i>
              ) : (
                "POL"
              )}
            </span>
            <Popover
              placement="top"
              isOpen={this.state.isHeaderPopoverOpen}
              target="headerpl"
              toggle={this._togglePopover}
            >
              <PopoverBody>검색</PopoverBody>
            </Popover>
          </DivHeaderPol>
          <DivHeaderPod theme={theme} filtered={selectedPd}>
            <span
              id="headerpd"
              onClick={event => this._toggleDropdown(event, "isPodDropdown")}
              style={{ cursor: "pointer" }}
            >
              {selectedPd.length > 0 ? (
                <i class="fas fa-filter" style={{ color: "white" }}>
                  {" POD"}
                </i>
              ) : (
                "POD"
              )}
            </span>
            <Popover
              placement="top"
              isOpen={this.state.isHeaderPopoverOpen}
              target="headerpd"
              toggle={this._togglePopover}
            >
              <PopoverBody>검색</PopoverBody>
            </Popover>
          </DivHeaderPod>
          <DivHeaderBS>
            <DivHeaderBSTitle theme={theme.DARK}>BUY</DivHeaderBSTitle>
            <DivHeaderBSType>
              <DivHeaderBSType20 theme={theme.DARK}>20'</DivHeaderBSType20>
              <DivHeaderBSType40 theme={theme.DARK}>40'</DivHeaderBSType40>
              <DivHeaderBSType4H theme={theme.DARK}>40'HC</DivHeaderBSType4H>
            </DivHeaderBSType>
          </DivHeaderBS>
          <DivHeaderBS>
            <DivHeaderBSTitle theme={theme.DARK}>SELL</DivHeaderBSTitle>
            <DivHeaderBSType>
              <DivHeaderBSType20 theme={theme.DARK}>20'</DivHeaderBSType20>
              <DivHeaderBSType40 theme={theme.DARK}>40'</DivHeaderBSType40>
              <DivHeaderBSType4H theme={theme.DARK}>40'HC</DivHeaderBSType4H>
            </DivHeaderBSType>
          </DivHeaderBS>
          <DivHeaderLF theme={theme.DARK}>L.F/T</DivHeaderLF>
          <DivHeaderDF theme={theme.DARK}>D.F/T</DivHeaderDF>
          <DivHeaderOD theme={theme.DARK}>
            <DatePicker
              customInput={<CustomInputDatePickerST />}
              selected={initialSF}
              onChange={value => this._handleChange(value, "initialSF")}
              locale="ko"
              dateFormat="MM-DD"
              popperModifiers={{
                offset: {
                  enabled: true,
                  offset: "-150px, 0px"
                },
                preventOverflow: {
                  enabled: true,
                  escapeWithReference: false,
                  boundariesElement: "viewport"
                }
              }}
            />
          </DivHeaderOD>
          <DivHeaderED theme={theme.DARK}>
            <DatePicker
              customInput={<CustomInputDatePickerSF />}
              selected={initialST}
              onChange={value => this._handleChange(value, "initialST")}
              locale="ko"
              dateFormat="MM-DD"
              popperModifiers={{
                offset: {
                  enabled: true,
                  offset: "-150px, 0px"
                },
                preventOverflow: {
                  enabled: true,
                  escapeWithReference: false,
                  boundariesElement: "viewport"
                }
              }}
            />
          </DivHeaderED>
          <DivHeaderRMK theme={theme.DARK}>비고</DivHeaderRMK>
          <DivHeaderButtons theme={theme.DARK}>
            <i className="fas fa-plus" style={{ color: "white" }} />
          </DivHeaderButtons>
        </DivHeader>
        {isInputpersonDropdown ? (
          <ClickOutside
            customFunc={this._hideDropdown}
            targetComp={"isInputpersonDropdown"}
          >
            <DivDropdown
              top={menuTop}
              left={menuLeft}
              height={menuHeight}
              width={menuWidth}
            >
              <Select
                name="headerInputperson"
                value={selectedIp}
                onChange={data => this._handleChange(data, "selectedIp")}
                multi={true}
                autoFocus={true}
                openOnFocus={true}
                options={foundIp}
                placeholder="입력자"
              />
            </DivDropdown>
          </ClickOutside>
        ) : null}
        {isAccountDropdown ? (
          <ClickOutside
            customFunc={this._hideDropdown}
            targetComp={"isAccountDropdown"}
          >
            <DivDropdown
              top={menuTop}
              left={menuLeft}
              height={menuHeight}
              width={menuWidth}
            >
              <Select
                name="headerAccount"
                value={selectedAc}
                onChange={data => this._handleChange(data, "selectedAc")}
                multi={true}
                autoFocus={true}
                openOnFocus={true}
                options={foundAc}
                placeholder="화주"
              />
            </DivDropdown>
          </ClickOutside>
        ) : null}
        {isLinerDropdown ? (
          <ClickOutside
            customFunc={this._hideDropdown}
            targetComp={"isLinerDropdown"}
          >
            <DivDropdown
              top={menuTop}
              left={menuLeft}
              height={menuHeight}
              width={menuWidth}
            >
              <Select
                name="headerLiner"
                value={selectedLn}
                onChange={data => this._handleChange(data, "selectedLn")}
                multi={true}
                autoFocus={true}
                openOnFocus={true}
                options={foundLn}
                placeholder="선사"
              />
            </DivDropdown>
          </ClickOutside>
        ) : null}
        {isPolDropdown ? (
          <ClickOutside
            customFunc={this._hideDropdown}
            targetComp={"isPolDropdown"}
          >
            <DivDropdown
              top={menuTop}
              left={menuLeft}
              height={menuHeight}
              width={menuWidth}
            >
              <Select
                name="headerPol"
                value={selectedPl}
                onChange={data => this._handleChange(data, "selectedPl")}
                multi={true}
                autoFocus={true}
                openOnFocus={true}
                options={foundPl}
                placeholder="POL"
              />
            </DivDropdown>
          </ClickOutside>
        ) : null}
        {isPodDropdown ? (
          <ClickOutside
            customFunc={this._hideDropdown}
            targetComp={"isPodDropdown"}
          >
            <DivDropdown
              top={menuTop}
              left={menuLeft}
              height={menuHeight}
              width={menuWidth}
            >
              <Select
                name="headerPod"
                value={selectedPd}
                onChange={data => this._handleChange(data, "selectedPd")}
                multi={true}
                autoFocus={true}
                openOnFocus={true}
                options={foundPd}
                placeholder="POD"
              />
            </DivDropdown>
          </ClickOutside>
        ) : null}
      </DivContainer>
    );
  }
  _togglePopover = () => {
    this.setState({
      isHeaderPopoverOpen: !this.state.isHeaderPopoverOpen
    });
  };
  _handleChange = (data, target) => {
    this.setState({
      [target]: data
    });
  };
  _setQueryParams = () => {
    const { _setGlobalValue } = this.props.globalState;
    const {
      selectedIp,
      selectedAc,
      selectedLn,
      selectedPl,
      selectedPd,
      initialSF,
      initialST
    } = this.state;

    let ips = [],
      acs = [],
      lns = [],
      pls = [],
      pds = [];
    let totalParams = {};
    if (selectedIp.length > 0) {
      selectedIp.map(item => ips.push(item.value));
      totalParams.inputperson = ips;
    }
    if (selectedAc.length > 0) {
      selectedAc.map(item => acs.push(item.value));
      totalParams.account = acs;
    }
    if (selectedLn.length > 0) {
      selectedLn.map(item => lns.push(item.value));
      totalParams.liner = lns;
    }
    if (selectedPl.length > 0) {
      selectedPl.map(item => pls.push(item.value));
      totalParams.pol = pls;
    }
    if (selectedPd.length > 0) {
      selectedPd.map(item => pds.push(item.value));
      totalParams.pod = pds;
    }
    totalParams.search_from = initialSF.format("YYYY-MM-DD");
    totalParams.search_to = initialST.format("YYYY-MM-DD");
    let queryParams = Object.keys(totalParams)
      .map(k => {
        if (Array.isArray(totalParams[k])) {
          return (
            `${encodeURIComponent(k)}=` +
            totalParams[k].map(val => `${encodeURIComponent(val)}`).join("|")
          );
        }

        return `${encodeURIComponent(k)}=${encodeURIComponent(totalParams[k])}`;
      })
      .join("&");
    _setGlobalValue({ queryParams: queryParams });
  };
  _handleChange = (data, target) => {
    this.setState({
      [target]: data
    });
  };
  _getHeaderData = async handler => {
    const { API_URL } = this.props.globalState;
    await fetch(API_URL + "/ratesheader/?handler=" + handler, {
      credentials: "include"
    })
      .then(response => response.json())
      .then(response => {
        switch (handler) {
          case "inputperson":
            this.setState({
              foundIp: response
            });
            break;
          case "account":
            this.setState({
              foundAc: response
            });
            break;
          case "liner":
            this.setState({
              foundLn: response
            });
            break;
          case "pol":
            this.setState({
              foundPl: response
            });
            break;
          case "pod":
            this.setState({
              foundPd: response
            });
            break;
          default:
            break;
        }
      })
      .catch(error => console.log(error));
  };
  _toggleDropdown = (event, data) => {
    let el = ReactDOM.findDOMNode(event.target).getBoundingClientRect();
    this.setState(prevState => {
      let newState = {
        [data]: !prevState[data],
        menuTop: el.top,
        menuLeft: el.left,
        menuHeight: el.height,
        menuWidth: el.width
      };
      return { ...newState };
    });
  };
  _hideDropdown = data => {
    this.setState(prevState => {
      let newState = {
        ...prevState,
        [data]: false
      };
      return { ...newState };
    });
  };
}

export default withGlobalValue(Header);
