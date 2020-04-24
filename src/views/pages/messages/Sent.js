import React from "react";
import { connect } from 'react-redux';
// import _ from "lodash";
import {Row, Col, Spinner, Card, CardBody} from "reactstrap";
import PollSurvey from "../../../components/@hackh/Sent/PollSurvey";
import PollResultChart from "../../ui-elements/cards/analytics/PollResult"
import TabsBasic from "../../../components/@hackh/Sent/TabBasic";
import { loadAllMessages, loadStatistics } from "../../../redux/actions/sent/index";
import "../../../assets/scss/pages/sent.scss";

class SentMessages extends React.Component{
  componentDidMount() {
    this.props.loadAllMessages();
  }

  getPercentage = (percent, total) => {
    return ((percent/total)*100).toFixed(2)
  }

  // loadPollChart = () => {
  //   const { statistics } = this.props;
  //   if (!_.isEmpty(statistics)) {
  //     var pollResults = [];
  //     var total = 0;
  //     if (_.get(statistics, "options", undefined)) {
  //       statistics.options.forEach(count => total +=count.voter_count );
  //       for(var opt in statistics.options) {
  //         pollResults.push({
  //           text:  statistics.options[opt].text,
  //           percentage: this.getPercentage(statistics.options[opt].voter_count, total),
  //           color: opt <= colors.length ? colors[opt] : "#fff"
  //          });
  //       }
  //       return pollResults;
  //     }
  //   }
  //   return []
  // }

  getPollResult = (statistics) => {
    const colors = [
      "#7367F0",
      "#28C76F",
      "#EA5455",
      "#FF9F43",
      "#9c8cfc",
      "#FFC085",
      "#f29292",
      "#b9c3cd",
      "#e7eef7"
    ];
    let pollResults = [];
    let total = 0;
    statistics.forEach(count => total +=count.voter_count );
    statistics.map((option, idx) => {
      pollResults.push({
        text: option.text,
        percentage: this.getPercentage(option.voter_count, total),
        color: idx <= colors.length ? colors[idx] : "#fff"
      });
    });
    return pollResults;
  }

  searchMessage = (event) => {
    console.log(event.target.value);
  }

  render () {
    const { selectedMessage } = this.props;
    return <>
    <Row>
      <Col md="7" sm="15">
        <Card>
          <CardBody>
            {/* <div className="sent-searchbar mt-1">
              <FormGroup className="position-relative">
                <div className="form-control-position">
                  <Search size={22} />
                </div>
                <Input
                  className="search-sent"
                  placeholder="Search Sent..."
                  onChange={this.searchMessage}
                />
              </FormGroup>
            </div> */}
            { this.props.sentMessages.length > 0 ?
            <TabsBasic
              loadStatistics={this.props.loadStatistics}
              style={{maxHeight: "inherit", overflow: "scroll"}}
            />
            :
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>}
          </CardBody>
        </Card>
      </Col>
      {selectedMessage &&
        <Col md="5" sm="9">
          <PollSurvey detail={this.props.selectedMessage} />
          {selectedMessage.statistics &&
            <div className="justify-content-end">
              <PollResultChart
                pollResults={this.getPollResult(selectedMessage.statistics)}
              />
            </div>
          }
        </Col>
      }
    </Row>
  </>
  }
}

const mapStateToProps = state => {
  const { sentMessages, telegram, messenger, statistics, messageInfo, selectedMessage } = state.sent;
  return {
    sentMessages,
    telegram,
    messenger,
    statistics,
    messageInfo,
    selectedMessage
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadAllMessages: () => dispatch(loadAllMessages()),
  loadStatistics: (id) => dispatch(loadStatistics(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SentMessages);
