import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Badge
} from "reactstrap"
import _ from "lodash";
import moment from "moment";
import {
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
