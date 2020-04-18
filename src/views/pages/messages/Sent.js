import React from "react";
import { connect } from 'react-redux';
import {Row, Col, Input, FormGroup, Spinner, Card, CardBody, CardTitle} from "reactstrap";
import {Search} from "react-feather";
import PollSurvey from "../../../components/@hackh/Sent/PollSurvey";
import PollResultChart from "../../ui-elements/cards/analytics/PollResult"
import TabsBasic from "../../../components/@hackh/Sent/TabBasic";
import { loadMessages, loadStatistics } from "../../../redux/actions/sent/index";

let $primary = "#7367F0",
  $success = "#28C76F",
  $danger = "#EA5455",
  $warning = "#FF9F43",
  $primary_light = "#9c8cfc",
  $warning_light = "#FFC085",
  $danger_light = "#f29292",
  $stroke_color = "#b9c3cd",
  $label_color = "#e7eef7"
class SentMessages extends React.Component{
  componentDidMount() {
    this.props.loadMessages();
    this.props.loadStatistics();
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
                />
              </FormGroup>
            </div>
            { this.props.sentMessages.length > 0 ? 
            <TabsBasic messages={this.props.sentMessages} style={{maxHeight: "inherit", overflow: "scroll"}}/>
            : 
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>}
          </CardBody>
        </Card>
      </Col>
      <Col md="5" sm="9">
        <PollSurvey /> 
        <div className="justify-content-end">
        <PollResultChart
              primary={$primary}
              warning={$warning}
              danger={$danger}
              primaryLight={$primary_light}
              warningLight={$warning_light}
              dangerLight={$danger_light}
            />
        </div>
      </Col>
    </Row>
  </>
  }
}

const mapStateToProps = state => {
  const { sentMessages, statistics } = state.sent;
  return {
    sentMessages,
    statistics
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadMessages: () => dispatch(loadMessages()),
  loadStatistics: () => dispatch(loadStatistics())
});
export default connect(mapStateToProps, mapDispatchToProps)(SentMessages);
