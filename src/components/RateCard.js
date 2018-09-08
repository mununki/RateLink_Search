import React, { Component, Fragment } from "react";
import { withGlobalValue } from "../Context";
import styled from "styled-components";
import Modal from "react-responsive-modal";
import ClickOutside from "./ClickOutside";
import RateAddCard from "./RateAddCard";
import { Popover, PopoverBody } from "reactstrap";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import moment from "moment";

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
  ${props =>
    props.isSwipe
      ? "position:absolute;left:-175px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);z-index:5;"
      : null};
  background-color: white;
  border-bottom: 1px solid #eee;
`;

const DivBehind = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
`;

const DivBehindInside = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
`;

const DivBehindButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 45px;
  min-width: 45px;
  height: 50px;
  cursor: pointer;
`;

const DivHeaderInputperson = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-width: 150px;
  background-color: white;
`;

const DivHeaderAccount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-width: 80px;
  background-color: white;
`;

const DivHeaderLiner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 120px;
  min-width: 120px;
  background-color: white;
`;

const DivHeaderPol = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-width: 120px;
  background-color: white;
`;

const DivHeaderPod = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-width: 120px;
  background-color: white;
`;

const DivHeaderBS = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 200px;
  min-width: 200px;

  // HEADER 높이 설정
  height: 50px;

  border-left: 1px solid #eee;
  background-color: white;
`;

const DivHeaderBSType = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  background-color: white;
`;

const DivHeaderBSType20 = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const DivHeaderBSType40 = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const DivHeaderBSType4H = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const DivHeaderLF = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 70px;
  min-width: 70px;
  border-left: 1px solid #eee;
  background-color: white;
`;

const DivHeaderDF = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 70px;
  min-width: 70px;
  background-color: white;
`;

const DivHeaderED = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 70px;
  min-width: 70px;
  background-color: white;
`;

const DivHeaderOD = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 70px;
  min-width: 70px;
  background-color: white;
`;

const DivHeaderRMK = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 40px;
  min-width: 40px;
  background-color: white;
`;

const DivHeaderButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 40px;
  min-width: 40px;
  cursor: pointer;
  background-color: white;
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

const DivNewData = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 5px;
  height: 100%;
  background-color: #e74c3c;
`;

class RateCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSwipe: false,
      isModify: false,
      modalOpen: false,
      isitDuplicate: false,
      isitDelete: false,
      isPopoverOpen: false
    };
    this._togglePopover = this._togglePopover.bind(this);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isParentAdd !== this.props.isParentAdd) {
      if (this.props.isParentAdd === true) {
        this.setState({
          isModify: false
        });
      }
    }
    if (prevProps.isCancelModify !== this.props.isCancelModify) {
      if (this.state.isModify === true) {
        this.setState({
          isModify: false
        });
      }
    }
    if (prevProps.turnOffModal !== this.props.turnOffModal) {
      this.setState({
        modalOpen: false,
        isitDelete: false,
        isitDuplicate: false
      });
    }
  }
  render() {
    const { USER_PROFILE_NAME } = this.props.globalState;
    const { rates, _deleteRate, _setParentState } = this.props;
    const { isSwipe, isModify } = this.state;
    if (isModify) {
      return (
        <RateAddCard
          _controlInput={this.props._controlInput}
          _inputRate={this.props._inputRate}
          _setParentState={this.props._setParentState}
          _setParentStateWithArgs={this.props._setParentStateWithArgs}
          selectedLiner={this.props.selectedLiner}
          _handleChange={this.props._handleChange}
          newRate={this.props.newRate}
          _setModify={this._setModify}
          isModify={isModify}
          rates={rates}
          turnOffModal={this.props.turnOffModal}
        />
      );
    } else {
      return (
        <DivContainer>
          <DivHeader isSwipe={isSwipe}>
            {moment(rates.recordedDate).format("YYYY-MM-DD") ===
            moment().format("YYYY-MM-DD") ? (
              <DivNewData />
            ) : null}
            <DivHeaderInputperson>
              {rates.inputperson.profile.profile_name}
            </DivHeaderInputperson>
            <DivHeaderAccount>{rates.account}</DivHeaderAccount>
            <DivHeaderLiner>
              <img
                src={
                  "/static/countrycity/liners_image/" +
                  `${rates.liner}` +
                  ".png"
                }
                width="70px"
                alt={rates.liner}
              />
            </DivHeaderLiner>
            <DivHeaderPol>{rates.pol}</DivHeaderPol>
            <DivHeaderPod>{rates.pod}</DivHeaderPod>
            <DivHeaderBS>
              <DivHeaderBSType>
                <DivHeaderBSType20>
                  {rates.buying20
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </DivHeaderBSType20>
                <DivHeaderBSType40>
                  {rates.buying40
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </DivHeaderBSType40>
                <DivHeaderBSType4H>
                  {rates.buying4H
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </DivHeaderBSType4H>
              </DivHeaderBSType>
            </DivHeaderBS>
            <DivHeaderBS>
              <DivHeaderBSType>
                <DivHeaderBSType20>
                  {rates.selling20
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </DivHeaderBSType20>
                <DivHeaderBSType40>
                  {rates.selling40
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </DivHeaderBSType40>
                <DivHeaderBSType4H>
                  {rates.selling4H
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </DivHeaderBSType4H>
              </DivHeaderBSType>
            </DivHeaderBS>
            <DivHeaderLF>{rates.loadingFT}</DivHeaderLF>
            <DivHeaderDF>{rates.dischargingFT}</DivHeaderDF>
            <DivHeaderOD>{rates.offeredDate.slice(5)}</DivHeaderOD>
            <DivHeaderED>{rates.effectiveDate.slice(5)}</DivHeaderED>
            <DivHeaderRMK>
              {rates.remark ? (
                <Fragment>
                  <i
                    id={`popover${rates.id}`}
                    onClick={this._togglePopover}
                    className="fas fa-comment"
                    style={{
                      color: "#fdc02f",
                      fontSize: 20,
                      cursor: "pointer"
                    }}
                  />
                  <Popover
                    placement="bottom"
                    isOpen={this.state.isPopoverOpen}
                    target={`popover${rates.id}`}
                    toggle={this._togglePopover}
                  >
                    <PopoverBody>{rates.remark}</PopoverBody>
                  </Popover>
                </Fragment>
              ) : null}
            </DivHeaderRMK>
            {isSwipe ? (
              <DivHeaderButtons
                onClick={() => this.setState({ isSwipe: !this.state.isSwipe })}
              >
                <i className="fas fa-minus" style={{ color: "#c0392b" }} />
              </DivHeaderButtons>
            ) : (
              <DivHeaderButtons
                onClick={() => {
                  if (
                    USER_PROFILE_NAME === rates.inputperson.profile.profile_name
                  ) {
                    this.setState({ isSwipe: !this.state.isSwipe });
                  } else {
                    this._createNotification(
                      "warning",
                      "입력자만 수정이 가능합니다."
                    );
                  }
                }}
              >
                <i className="fas fa-plus" style={{ color: "#c0392b" }} />
              </DivHeaderButtons>
            )}
          </DivHeader>
          {isSwipe ? (
            <DivBehind>
              <ClickOutside customFunc={this._hideSwipe}>
                <DivBehindInside>
                  <DivBehindButtons
                    onClick={() => this._onOpenModal("duplicate")}
                    style={{ backgroundColor: "#1abc9c", color: "white" }}
                  >
                    복제
                  </DivBehindButtons>
                  <DivBehindButtons
                    onClick={() => {
                      this.setState({
                        isModify: true,
                        isSwipe: false
                      });
                      _setParentState({ isAdd: false, isChildModify: true });
                    }}
                    style={{ backgroundColor: "#3498db", color: "white" }}
                  >
                    수정
                  </DivBehindButtons>
                  <DivBehindButtons
                    onClick={() => this._onOpenModal("delete")}
                    style={{ backgroundColor: "#e74c3c", color: "white" }}
                  >
                    삭제
                  </DivBehindButtons>
                </DivBehindInside>
              </ClickOutside>
            </DivBehind>
          ) : null}
          <Modal open={this.state.modalOpen} onClose={this._onCloseModal}>
            {this.state.isitDuplicate ? (
              <DivModalContainer>
                운임을 복제하시겠습니까?
                <DivModalButtons>
                  <DivModalCancelButton onClick={() => this._onCloseModal()}>
                    취소
                  </DivModalCancelButton>
                  <DivModalConfirmButton
                    onClick={() => this._duplicateRate()}
                    style={{ backgroundColor: "#1abc9c" }}
                  >
                    복제
                  </DivModalConfirmButton>
                </DivModalButtons>
              </DivModalContainer>
            ) : null}
            {this.state.isitDelete ? (
              <DivModalContainer>
                운임을 삭제하시겠습니까?
                <DivModalButtons>
                  <DivModalCancelButton onClick={() => this._onCloseModal()}>
                    취소
                  </DivModalCancelButton>
                  <DivModalConfirmButton
                    onClick={() => _deleteRate(rates.id)}
                    style={{ backgroundColor: "#e74c3c" }}
                  >
                    삭제
                  </DivModalConfirmButton>
                </DivModalButtons>
              </DivModalContainer>
            ) : null}
          </Modal>
        </DivContainer>
      );
    }
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
        NotificationManager.error("msg", "확인", 5000, () => {
          alert("callback");
        });
        break;
      default:
        break;
    }
  };
  _togglePopover = () => {
    this.setState({
      isPopoverOpen: !this.state.isPopoverOpen
    });
  };
  _duplicateRate = () => {
    const { rates, _inputRate } = this.props;
    let prevRate = {
      inputperson: 2,
      account: rates.account,
      liner: rates.liner,
      pol: rates.pol,
      pod: rates.pod,
      buying20: rates.buying20,
      buying40: rates.buying40,
      buying4H: rates.buying4H,
      selling20: rates.selling20,
      selling40: rates.selling40,
      selling4H: rates.selling4H,
      loadingFT: rates.loadingFT,
      dischargingFT: rates.dischargingFT,
      effectiveDate: rates.effectiveDate,
      offeredDate: rates.offeredDate,
      remark: rates.remark
    };
    _inputRate("duplicate", 0, prevRate);
  };
  _onOpenModal = handler => {
    switch (handler) {
      case "duplicate":
        this.setState({ modalOpen: true, isitDuplicate: true });
        break;
      case "delete":
        this.setState({ modalOpen: true, isitDelete: true });
        break;
      default:
        break;
    }
  };
  _onCloseModal = () => {
    this.setState({
      modalOpen: false,
      isitDelete: false,
      isitDuplicate: false
    });
  };
  _setModify = newState => {
    this.setState(newState);
  };
  _hideSwipe = () => {
    this.setState({
      isSwipe: false
    });
  };
  _hideModify = () => {
    this.setState({
      istemp: false
    });
    console.log("111");
  };
}

export default withGlobalValue(RateCard);
