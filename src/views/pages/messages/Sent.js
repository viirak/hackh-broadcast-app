import React from "react";
import { connect } from 'react-redux';
import {Row, Col, Input, FormGroup, Spinner, Card, CardBody, CardTitle} from "reactstrap";
import {Search} from "react-feather";
import PollSurvey from "../../../components/@hackh/Sent/PollSurvey";
import PollResultChart from "../../ui-elements/cards/analytics/PollResult"
import TabsBasic from "../../../components/@hackh/Sent/TabBasic";
import { loadMessages, loadStatistics } from "../../../redux/actions/sent/index";
import _ from "lodash";

let colors = [
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

class SentMessages extends React.Component{
  componentDidMount() {
    this.props.loadMessages();
  }

  getPercentage = (percent, total) => {
    return ((percent/total)*100).toFixed(2)
  }

  loadPollChart = () => {
    const { statistics } = this.props;
    if (!_.isEmpty(statistics)) {
      var pollResults = [];
      var total = 0;
      if (_.get(statistics, "options", undefined)) {
        statistics.options.forEach(count => total +=count.voter_count );
        for(var opt in statistics.options) {
          pollResults.push({
            text:  statistics.options[opt].text,
            percentage: this.getPercentage(statistics.options[opt].voter_count, total),
            color: opt <= colors.length ? colors[opt] : "#fff"
           });
        }
        return pollResults;
      }
    }
    return []
  }

  searchMessage = (event) => {
    console.log(event.target.value);  
  }
  render(){
    return <>
    <Row>
      <Col md="7" sm="15">
        <Card>
          <CardBody>
            <div className="sent-searchbar mt-1">
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
            </div>
            { this.props.sentMessages.length > 0 ? 
            <TabsBasic 
              messages={this.props.sentMessages || []} 
              telegram={this.props.telegram || []}
              messenger={this.props.messenger || []}
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
      <Col md="5" sm="9">
        <PollSurvey statistics={this.props.statistics} /> 
        <div className="justify-content-end">
        <PollResultChart
          statistics={this.props.statistics}
          colors={[]}
          pollResults={this.loadPollChart()}
            />
        </div>
      </Col>
    </Row>
  </>
  }
}

const mapStateToProps = state => {
  const { sentMessages, telegram, messenger, statistics } = state.sent;
  return {
    sentMessages,
    telegram,
    messenger,
    statistics
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadMessages: () => dispatch(loadMessages()),
  loadStatistics: (id) => dispatch(loadStatistics(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SentMessages);
