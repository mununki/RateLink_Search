import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import moment from "moment";
import { withGlobalValue } from "../Context";
import ClickOutside from "./ClickOutside";
import DatePicker from "react-datepicker";
import Modal from "react-responsive-modal";
import Select, { Async } from "react-select";
import "react-select/dist/react-select.css";
import "moment/locale/ko";
import "react-datepicker/dist/react-datepicker.css";
import { NotificationManager } from "react-notifications";

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
`;

const DivHeaderInputperson = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-width: 150px;
`;

const DivHeaderAccount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-width: 80px;
`;

const DivHeaderLiner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 120px;
  min-width: 120px;
`;

const DivHeaderPol = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-width: 120px;
`;

const DivHeaderPod = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-width: 120px;
`;

const DivHeaderBS = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 200px;
  min-width: 200px;
  border-left: 1px solid #eee;
`;

const DivHeaderBSType = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;

const DivHeaderBSType20 = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DivHeaderBSType40 = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #eee;
`;

const DivHeaderBSType4H = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #eee;
`;

const DivHeaderLF = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 70px;
  min-width: 70px;
  border-left: 1px solid #eee;
`;

const DivHeaderDF = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 70px;
  min-width: 70px;
`;

const DivHeaderED = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 70px;
  min-width: 70px;
`;

const DivHeaderOD = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 70px;
  min-width: 70px;
`;

const DivHeaderRMK = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 40px;
  min-width: 40px;
`;

const DivHeaderButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 40px;
  min-width: 40px;
  cursor: pointer;
  background-color: #3498db;
  &:hover {
    background-color: #2980b9;
  }
`;

const DivDropdown = styled.div`
  position: fixed;
  top: ${props => props.top + props.height + "px"};
  left: ${props => props.left + props.width / 2 - 85 + "px"};
  width: 170px;
  border-radius: 5px;
`;

const DivModalContainer = styled.div`
  display: flex;
  width: 400px;
  height: 100px;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-around;
`;

const DivModalButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const DivModalConfirmButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 35px;
  color: white;
  background-color: #6dbad8;
  border-radius: 5px;
  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  cursor: pointer;
`;

const DivModalCancelButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 35px;
  background-color: #ccc;
  border-radius: 5px;
  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  cursor: pointer;
`;

class CustomInputDatePicker extends React.Component {
  render() {
    return (
      <div className="btn primary btn-sm" onClick={this.props.onClick}>
        {this.props.value}
      </div>
    );
  }
}

class RateAddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      isitInput: false,
      isitModify: false,
      isRmkTextarea: false,
      menuTop: "",
      menuLeft: "",
      menuHeight: "",
      menuWidth: "",
      foundLn: [],
      selectedLn: [],
      selectedPl: [],
      selectedPd: [],
      selectedLnModify: {},
      selectedPlModify: {},
      selectedPdModify: {},
      initialed: moment().endOf("month"),
      initialod: moment()
    };
    this._toggleDropdown = this._toggleDropdown.bind(this);
    this._hideDropdown = this._hideDropdown.bind(this);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { isModify } = this.props;
    if (
      prevState.initialed !== this.state.initialed ||
      prevState.initialod !== this.state.initialod
    ) {
      this._setDate();
    }
    if (
      prevState.selectedLn !== this.state.selectedLn ||
      prevState.selectedPl !== this.state.selectedPl ||
      prevState.selectedPd !== this.state.selectedPd ||
      prevState.selectedLnModify !== this.state.selectedLnModify ||
      prevState.selectedPlModify !== this.state.selectedPlModify ||
      prevState.selectedPdModify !== this.state.selectedPdModify
    ) {
      if (isModify) {
        this.props._setParentStateWithArgs(
          this.state.selectedLnModify,
          this.state.selectedPlModify,
          this.state.selectedPdModify
        );
      } else {
        this.props._setParentStateWithArgs(
          this.state.selectedLn,
          this.state.selectedPl,
          this.state.selectedPd
        );
      }
    }
    if (prevProps.turnOffModal !== this.props.turnOffModal) {
      this._onCloseAction();
    }
  }
  componentDidMount() {
    const { isModify, rates, _setParentState } = this.props;
    if (isModify) {
      this.setState({
        initialed: moment(rates.effectiveDate),
        initialod: moment(rates.offeredDate)
      });
      let prevRate = {
        ac: rates.account,
        ln: [rates.liner],
        pl: [rates.pol],
        pd: [rates.pod],
        br20: rates.buying20,
        br40: rates.buying40,
        br4H: rates.buying4H,
        sr20: rates.selling20,
        sr40: rates.selling40,
        sr4H: rates.selling4H,
        lft: rates.loadingFT,
        dft: rates.dischargingFT,
        ed: moment(rates.effectiveDate),
        od: moment(rates.offeredDate),
        rmk: rates.remark
      };
      _setParentState({ newRate: prevRate });
      this.setState({
        selectedLnModify: { value: rates.liner, label: rates.liner },
        selectedPlModify: { value: rates.pol, label: rates.pol },
        selectedPdModify: { value: rates.pod, label: rates.pod }
      });
      this._getLiner();
    } else {
      this._setDate();
      this._getLiner();
    }
  }
  render() {
    const { USER_PROFILE_NAME } = this.props.globalState;
    const { _controlInput, _inputRate, newRate, isModify, rates } = this.props;
    const {
      isRmkTextarea,
      menuTop,
      menuLeft,
      menuHeight,
      menuWidth,
      foundLn,
      selectedLn,
      selectedPl,
      selectedPd,
      selectedLnModify,
      selectedPlModify,
      selectedPdModify
    } = this.state;
    return (
      <DivContainer>
        <DivHeader>
          <DivHeaderInputperson>{USER_PROFILE_NAME}</DivHeaderInputperson>
          <DivHeaderAccount>
            <input
              className="form-control"
              name="ac"
              value={newRate.ac}
              onChange={_controlInput}
              style={{ marginTop: "10px", marginBottom: "10px" }}
              tabIndex="1"
            />
          </DivHeaderAccount>
          <DivHeaderLiner>
            {isModify ? (
              <Select
                name="LinerAdd"
                value={selectedLnModify}
                onChange={data => this._handleChange(data, "selectedLnModify")}
                openOnFocus={true}
                options={foundLn}
                placeholder="선사"
                clearable={false}
                tabSelectsValue={false}
                style={{ width: "120px" }}
                tabIndex="2"
              />
            ) : (
              <Select
                name="LinerAdd"
                value={selectedLn}
                onChange={data => this._handleChange(data, "selectedLn")}
                multi={true}
                openOnFocus={true}
                options={foundLn}
                placeholder="선사"
                clearable={false}
                tabSelectsValue={false}
                style={{ width: "120px" }}
                tabIndex="2"
              />
            )}
          </DivHeaderLiner>
          <DivHeaderPol>
            {isModify ? (
              <Async
                name="PolAdd"
                loadOptions={this._getOptions}
                value={selectedPlModify}
                onChange={data => this._handleChange(data, "selectedPlModify")}
                openOnFocus={true}
                placeholder="POL"
                clearable={false}
                tabSelectsValue={false}
                style={{ flex: "1", minWidth: "120px" }}
                tabIndex="3"
              />
            ) : (
              <Async
                name="PolAdd"
                loadOptions={this._getOptions}
                value={selectedPl}
                onChange={data => this._handleChange(data, "selectedPl")}
                multi={true}
                openOnFocus={true}
                placeholder="POL"
                clearable={false}
                tabSelectsValue={false}
                style={{ flex: "1", minWidth: "120px" }}
                tabIndex="3"
              />
            )}
          </DivHeaderPol>
          <DivHeaderPod>
            {isModify ? (
              <Async
                name="PodAdd"
                loadOptions={this._getOptions}
                value={selectedPdModify}
                onChange={data => this._handleChange(data, "selectedPdModify")}
                openOnFocus={true}
                placeholder="POD"
                clearable={false}
                tabSelectsValue={false}
                style={{ flex: "1", minWidth: "120px" }}
                tabIndex="4"
              />
            ) : (
              <Async
                name="PodAdd"
                loadOptions={this._getOptions}
                value={selectedPd}
                onChange={data => this._handleChange(data, "selectedPd")}
                multi={true}
                openOnFocus={true}
                placeholder="POD"
                clearable={false}
                tabSelectsValue={false}
                style={{ flex: "1", minWidth: "120px" }}
                tabIndex="4"
              />
            )}
          </DivHeaderPod>
          <DivHeaderBS>
            <DivHeaderBSType>
              <DivHeaderBSType20>
                <input
                  type="number"
                  className="form-control"
                  name="br20"
                  value={newRate.br20}
                  onChange={_controlInput}
                  tabIndex="5"
                />
              </DivHeaderBSType20>
              <DivHeaderBSType40>
                <input
                  type="number"
                  className="form-control"
                  name="br40"
                  value={newRate.br40}
                  onChange={_controlInput}
                  tabIndex="6"
                />
              </DivHeaderBSType40>
              <DivHeaderBSType4H>
                <input
                  type="number"
                  className="form-control"
                  name="br4H"
                  value={newRate.br4H}
                  onChange={_controlInput}
                  tabIndex="7"
                />
              </DivHeaderBSType4H>
            </DivHeaderBSType>
          </DivHeaderBS>
          <DivHeaderBS>
            <DivHeaderBSType>
              <DivHeaderBSType20>
                <input
                  type="number"
                  className="form-control"
                  name="sr20"
                  value={newRate.sr20}
                  onChange={_controlInput}
                  tabIndex="8"
                />
              </DivHeaderBSType20>
              <DivHeaderBSType40>
                <input
                  type="number"
                  className="form-control"
                  name="sr40"
                  value={newRate.sr40}
                  onChange={_controlInput}
                  tabIndex="9"
                />
              </DivHeaderBSType40>
              <DivHeaderBSType4H>
                <input
                  type="number"
                  className="form-control"
                  name="sr4H"
                  value={newRate.sr4H}
                  onChange={_controlInput}
                  tabIndex="10"
                />
              </DivHeaderBSType4H>
            </DivHeaderBSType>
          </DivHeaderBS>
          <DivHeaderLF>
            <input
              type="number"
              className="form-control"
              name="lft"
              value={newRate.lft}
              onChange={_controlInput}
              tabIndex="11"
            />
          </DivHeaderLF>
          <DivHeaderDF>
            <input
              type="number"
              className="form-control"
              name="dft"
              value={newRate.dft}
              onChange={_controlInput}
              tabIndex="12"
            />
          </DivHeaderDF>
          <DivHeaderOD>
            <DatePicker
              customInput={<CustomInputDatePicker />}
              selected={this.state.initialod}
              onChange={value => this._handleChange(value, "initialod")}
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
              tabIndex={13}
            />
          </DivHeaderOD>
          <DivHeaderED>
            <DatePicker
              customInput={<CustomInputDatePicker />}
              selected={this.state.initialed}
              onChange={value => this._handleChange(value, "initialed")}
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
              tabIndex={14}
            />
          </DivHeaderED>
          <DivHeaderRMK
            onClick={event => this._toggleDropdown(event, "isRmkTextarea")}
          >
            {newRate.rmk ? (
              <i
                className="fas fa-comment"
                style={{
                  color: "#fdc02f",
                  fontSize: 20,
                  cursor: "pointer"
                }}
                tabIndex="15"
              />
            ) : (
              <i
                className="fas fa-comment"
                style={{
                  color: "#999",
                  fontSize: 20,
                  cursor: "pointer"
                }}
                tabIndex="15"
              />
            )}
          </DivHeaderRMK>
          {isModify ? (
            <DivHeaderButtons
              onClick={() => {
                this._checkBlank("modify");
              }}
              tabIndex="16"
            >
              수정
            </DivHeaderButtons>
          ) : (
            <DivHeaderButtons
              onClick={() => this._checkBlank("input")}
              tabIndex="16"
            >
              입력
            </DivHeaderButtons>
          )}
        </DivHeader>
        {isRmkTextarea ? (
          <ClickOutside
            customFunc={this._hideDropdown}
            targetComp={"isRmkTextarea"}
          >
            <DivDropdown
              top={menuTop}
              left={menuLeft - 40}
              height={menuHeight}
              width={menuWidth}
            >
              <textarea
                className="form-control"
                name="rmk"
                value={newRate.rmk}
                onChange={_controlInput}
              />
            </DivDropdown>
          </ClickOutside>
        ) : null}
        <Modal open={this.state.modalOpen} onClose={this._onCloseModal}>
          {this.state.isitInput ? (
            <DivModalContainer>
              운임을 입력하시겠습니까?
              <DivModalButtons>
                <DivModalCancelButton onClick={() => this._onCloseModal()}>
                  취소
                </DivModalCancelButton>
                <DivModalConfirmButton onClick={() => _inputRate("input")}>
                  입력
                </DivModalConfirmButton>
              </DivModalButtons>
            </DivModalContainer>
          ) : null}
          {this.state.isitModify ? (
            <DivModalContainer>
              운임을 수정하시겠습니까?
              <DivModalButtons>
                <DivModalCancelButton onClick={() => this._onCloseModal()}>
                  취소
                </DivModalCancelButton>
                <DivModalConfirmButton
                  onClick={() => _inputRate("modify", rates.id)}
                >
                  수정
                </DivModalConfirmButton>
              </DivModalButtons>
            </DivModalContainer>
          ) : null}
        </Modal>
      </DivContainer>
    );
  }
  _createNotification = (type, msg) => {
    switch (type) {
      case "info":
        NotificationManager.info(msg);
        break;
      case "success":
        NotificationManager.success(msg);
        break;
      case "warning":
        NotificationManager.warning(msg);
        break;
      case "error":
        NotificationManager.error(msg);
        break;
      default:
        break;
    }
  };
  _checkBlank = handler => {
    const { newRate } = this.props;
    if (
      newRate.ac === "" ||
      newRate.ln.length < 0 ||
      newRate.pl.length < 0 ||
      newRate.pd.length < 0
    ) {
      this._createNotification("error", "필수 정보가 입력되지 않았습니다.");
    } else {
      this._onOpenModal(handler);
    }
  };
  _getOptions = input => {
    const { API_URL } = this.props.globalState;
    return fetch(
      API_URL + "/ratesheader/?handler=locationinput&searchkw=" + input,
      {
        credentials: "include"
      }
    )
      .then(response => {
        return response.json();
      })
      .then(json => {
        return { options: json };
      });
  };
  _onOpenModal = handler => {
    switch (handler) {
      case "input":
        this.setState({ modalOpen: true, isitInput: true });
        break;
      case "modify":
        this.setState({ modalOpen: true, isitModify: true });
        break;
      default:
        break;
    }
  };
  _onCloseModal = () => {
    this.setState({
      modalOpen: false
    });
  };
  _onCloseAction = () => {
    const { isModify, _setModify } = this.props;
    this.setState({ modalOpen: false, isitInput: false, isitModify: false });
    if (isModify) {
      _setModify({ isModify: false, isSwipe: false });
    }
  };
  _handleChange = (data, target) => {
    this.setState({
      [target]: data
    });
  };
  _setDate = () => {
    const { newRate, _setParentState } = this.props;
    let newState = {
      ...newRate,
      ed: this.state.initialed.format("YYYY-MM-DD"),
      od: this.state.initialod.format("YYYY-MM-DD")
    };
    _setParentState({ newRate: newState });
  };
  _setSelected = (data, target) => {
    const { _setParentState, newRate, isModify } = this.props;
    if (isModify) {
      let newnewRate = {
        ...newRate,
        [target]: [data]
      };
      _setParentState({ newRate: newnewRate });
    } else {
      let index = newRate[target].findIndex(item => {
        return item === data;
      });
      let prevNewRate = newRate[target];
      let newData;
      if (index > -1) {
        prevNewRate.splice(index, 1);
        newData = {
          ...newRate,
          [target]: [...prevNewRate]
        };
      } else {
        newData = {
          ...newRate,
          [target]: [data, ...newRate[target]]
        };
      }
      _setParentState({ newRate: newData });
    }
  };
  _getLiner = async () => {
    const { API_URL } = this.props.globalState;
    await fetch(API_URL + "/ratesheader/?handler=linerinput", {
      credentials: "include"
    })
      .then(response => response.json())
      .then(response =>
        this.setState({
          foundLn: response
        })
      )
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

export default withGlobalValue(RateAddCard);
