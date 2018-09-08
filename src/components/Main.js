import React, { Component, Fragment } from "react";
import { withGlobalValue } from "../Context";
import styled from "styled-components";
import moment from "moment";
import RateCard from "./RateCard";
import RateAddCard from "./RateAddCard";
import Readmore from "./Readmore";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const RateAddButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 20;
  color: white;
  padding: 10px;
  background-color: ${props =>
    props.isAdd ? "rgba(231, 76, 60, 1.0)" : "rgba(52, 152, 219, 1)"};
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
  &:hover {
    background-color: ${props =>
      props.isAdd ? "rgba(192, 57, 43, 1.0)" : "rgba(41, 128, 185, 1)"};
  }
`;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isAdd: false,
      isChildModify: false,
      isParentAdd: false,
      isCancelModify: false,
      turnOffModal: false,
      next_page: "",
      rates: [],
      selectedLiner: "",
      newRate: {
        ac: "",
        ln: [],
        pl: [],
        pd: [],
        br20: "",
        br40: "",
        br4H: "",
        sr20: "",
        sr40: "",
        sr4H: "",
        lft: "",
        dft: "",
        ed: moment()
          .endOf("month")
          .format("YYYY-MM-DD"),
        od: moment().format("YYYY-MM-DD"),
        rmk: ""
      }
    };
    this._getRates = this._getRates.bind(this);
    this._getReadMore = this._getReadMore.bind(this);
    this._controlInput = this._controlInput.bind(this);
    this._inputRate = this._inputRate.bind(this);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.globalState.queryParams !== this.props.globalState.queryParams
    ) {
      this._getRates();
    }
  }
  componentDidMount() {
    this._getRates();
  }
  render() {
    const {
      next_page,
      rates,
      selectedLiner,
      newRate,
      isAdd,
      isChildModify,
      isParentAdd,
      isCancelModify,
      turnOffModal
    } = this.state;
    return (
      <Fragment>
        <NotificationContainer />
        {isAdd ? (
          <RateAddCard
            _controlInput={this._controlInput}
            _inputRate={this._inputRate}
            _setParentState={this._setParentState}
            _setParentStateWithArgs={this._setParentStateWithArgs}
            selectedLiner={selectedLiner}
            _handleChange={this._handleChange}
            newRate={newRate}
          />
        ) : null}
        {rates.map(item => (
          <RateCard
            key={item.id}
            rates={item}
            _controlInput={this._controlInput}
            _inputRate={this._inputRate}
            _setParentState={this._setParentState}
            _setParentStateWithArgs={this._setParentStateWithArgs}
            selectedLiner={selectedLiner}
            _handleChange={this._handleChange}
            newRate={newRate}
            _deleteRate={this._deleteRate}
            isParentAdd={isParentAdd}
            isCancelModify={isCancelModify}
            turnOffModal={turnOffModal}
          />
        ))}
        <Readmore next_page={next_page} funcReadmore={this._getReadMore} />
        {isAdd ? (
          <RateAddButton
            isAdd={isAdd}
            onClick={() => this.setState({ isAdd: false })}
          >
            입력취소
          </RateAddButton>
        ) : isChildModify ? (
          <RateAddButton
            isAdd={true}
            onClick={() => {
              this._clearNewRate();
              this.setState({
                isCancelModify: !this.state.isCancelModify,
                isChildModify: false
              });
            }}
          >
            수정취소
          </RateAddButton>
        ) : (
          <RateAddButton
            isAdd={isAdd}
            onClick={() => {
              this._clearNewRate();
              this.setState({ isAdd: true });
            }}
          >
            운임추가
          </RateAddButton>
        )}
      </Fragment>
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
        NotificationManager.warning(msg, "Close after 3000ms", 3000);
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
  _clearNewRate = () => {
    let blankRate = {
      ac: "",
      ln: [],
      pl: [],
      pd: [],
      br20: "",
      br40: "",
      br4H: "",
      sr20: "",
      sr40: "",
      sr4H: "",
      lft: "",
      dft: "",
      ed: moment()
        .endOf("month")
        .format("YYYY-MM-DD"),
      od: moment().format("YYYY-MM-DD"),
      rmk: ""
    };
    this.setState({
      newRate: blankRate
    });
  };
  _setParentState = newState => {
    this.setState(newState);
  };
  _setParentStateWithArgs = (ln, pl, pd) => {
    // ln = [{value:"...", name:"..."}, {...}, {...}]
    let newLn = [];
    if (Array.isArray(ln)) {
      ln.map(item => newLn.push(item.value));
    } else {
      newLn = [ln.value];
    }
    let newPl = [];
    if (Array.isArray(pl)) {
      pl.map(item => newPl.push(item.value));
    } else {
      newPl = [pl.value];
    }
    let newPd = [];
    if (Array.isArray(pd)) {
      pd.map(item => newPd.push(item.value));
    } else {
      newPd = [pd.value];
    }

    this.setState(prevState => {
      let newnewRate = {
        ...prevState.newRate,
        ln: newLn,
        pl: newPl,
        pd: newPd
      };
      let newState = {
        ...prevState,
        newRate: newnewRate
      };
      return { ...newState };
    });
  };
  _controlInput = event => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState(prevState => {
      let newData = {
        ...prevState.newRate,
        [name]: value
      };
      let newState = {
        ...prevState,
        newRate: newData
      };
      return { ...newState };
    });
  };
  _inputRate = async (handler, id, duplicateData) => {
    const { API_URL, CSRF_TOKEN } = this.props.globalState;
    const { newRate } = this.state;
    let { br20, br40, br4H, sr20, sr40, sr4H, lft, dft } = this.state.newRate;
    if (br20 === "") {
      br20 = "0";
    }
    if (br40 === "") {
      br40 = "0";
    }
    if (br4H === "") {
      br4H = "0";
    }
    if (sr20 === "") {
      sr20 = "0";
    }
    if (sr40 === "") {
      sr40 = "0";
    }
    if (sr4H === "") {
      sr4H = "0";
    }
    if (lft === "") {
      lft = "0";
    }
    if (dft === "") {
      dft = "0";
    }

    let postData = [];
    let ln, pl, pd;
    for (ln in newRate.ln) {
      for (pl in newRate.pl) {
        for (pd in newRate.pd) {
          const data = {
            inputperson: 2,
            account: newRate.ac,
            liner: newRate.ln[ln],
            pol: newRate.pl[pl],
            pod: newRate.pd[pd],
            buying20: br20,
            buying40: br40,
            buying4H: br4H,
            selling20: sr20,
            selling40: sr40,
            selling4H: sr4H,
            loadingFT: lft,
            dischargingFT: dft,
            effectiveDate: newRate.ed,
            offeredDate: newRate.od,
            remark: newRate.rmk
          };
          postData = [...postData, data];
        }
      }
    }
    if (handler === "input") {
      await fetch(API_URL + "/rates/", {
        method: "POST",
        credentials: "include",
        headers: {
          "X-CSRFToken": CSRF_TOKEN,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      })
        .then(response => response.json())
        .then(response => {
          this._clearNewRate();
          let prevRate = this.state.rates;
          this.setState({
            rates: [...response, ...prevRate],
            isAdd: false,
            turnOffModal: !this.state.turnOffModal
          });
          this._createNotification("success", "저장 완료");
        })
        .catch(error => {
          console.log(error);
        });
    } else if (handler === "modify") {
      postData = postData[0];
      await fetch(API_URL + "/rates/" + id + "/", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "X-CSRFToken": CSRF_TOKEN,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      })
        .then(response => response.json())
        .then(response => {
          let index = this.state.rates.findIndex(item => {
            return item.id === response.id;
          });
          let prevRates = this.state.rates;
          prevRates.splice(index, 1, response);
          this.setState({
            rates: prevRates,
            isChildModify: false,
            turnOffModal: !this.state.turnOffModal
          });
          this._createNotification("success", "수정 완료");
        })
        .catch(error => {
          console.log(error);
        });
    } else if (handler === "duplicate") {
      await fetch(API_URL + "/rates/", {
        method: "POST",
        credentials: "include",
        headers: {
          "X-CSRFToken": CSRF_TOKEN,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(duplicateData)
      })
        .then(response => response.json())
        .then(response => {
          this.setState({
            rates: [response, ...this.state.rates],
            turnOffModal: !this.state.turnOffModal
          });
          this._createNotification("success", "복제 완료");
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  _deleteRate = async id => {
    const { API_URL, CSRF_TOKEN } = this.props.globalState;
    let postData = {
      deleted: 1
    };
    await fetch(API_URL + "/rates/" + id + "/", {
      method: "PATCH",
      credentials: "include",
      headers: {
        "X-CSRFToken": CSRF_TOKEN,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    })
      .then(response => response.json())
      .then(response => {
        let index = this.state.rates.findIndex(item => {
          return item.id === id;
        });
        let prevRates = this.state.rates;
        prevRates.splice(index, 1);
        this.setState({
          rates: prevRates,
          turnOffModal: !this.state.turnOffModal
        });
        this._createNotification("success", "삭제 완료");
      })
      .catch(error => console.log(error));
  };
  _getRates = async () => {
    const { API_URL, queryParams } = this.props.globalState;
    this.setState({
      isLoading: true
    });
    await fetch(API_URL + "/rates/?" + queryParams, {
      credentials: "include"
    })
      .then(response => response.json())
      .then(response => {
        if (response.next !== null) {
          this.setState({
            next_page: response.next,
            rates: [...response.results],
            isLoading: false
          });
        } else {
          this.setState({
            next_page: "nomore",
            rates: [...response.results],
            isLoading: false
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  _getReadMore = async () => {
    const { next_page } = this.state;
    this.setState({
      isLoading: true
    });
    if (next_page === "nomore") {
      this._createNotification("info", "마지막 페이지 입니다.");
    } else {
      await fetch(next_page, {
        credentials: "include"
      })
        .then(response => response.json())
        .then(response => {
          if (response.next !== null) {
            this.setState(prevState => ({
              next_page: response.next,
              rates: [...prevState.rates, ...response.results],
              isLoading: false
            }));
          } else {
            this.setState(prevState => ({
              next_page: "nomore",
              rates: [...prevState.rates, ...response.results],
              isLoading: false
            }));
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
}

export default withGlobalValue(Main);
