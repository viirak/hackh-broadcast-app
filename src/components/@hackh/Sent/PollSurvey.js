import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap"
import _ from "lodash";
import { Send, Circle } from "react-feather"
import moment from "moment";
import Chart from "react-apexcharts"
import {
  Monitor,
  ArrowUp,
  Smartphone,
  Tablet,
  ArrowDown,
  ChevronDown
} from "react-feather"
import { FormattedMessage } from "react-intl";

class PollSurvey extends React.Component {

  listPollResults = () => {
    const { statistics } = this.props;
    if (!_.isEmpty(statistics)) {
      if (_.get(statistics, "options", undefined)) {
        let arr = [];
        for(var opt of statistics.options) {
          for (var j=0; j < opt.voter_count; j++) {
            arr.push(<Badge color="primary" className="mr-1">{opt.text}</Badge>)
          }
        }
        return arr;
      }
    } else {
      return <span>No poll found.</span>
    }
  }
  
    render(){
        return(
        <Card>
          <CardHeader>
            <CardTitle><FormattedMessage id="Poll/Survey" /></CardTitle>
            <span>{moment().format("hh:mm DD MMMM YYYY")}</span>
          </CardHeader>
          <CardBody>
            {this.listPollResults()}
          </CardBody>
        </Card>
        );
    }
};

export default PollSurvey;
