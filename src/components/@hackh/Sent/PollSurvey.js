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

  getIcon = social => {
    switch (social) {
      case "telegram": return <img src="/telegram2.svg" width="40" alt="messenger" />;
      case "messenger": return <img src="/messenger.svg" width="40" alt="telegram" />
      default: return null;
    }
  }

  listPollResults = () => {
    const { statistics } = this.props;
    if (!_.isEmpty(statistics)) {
      if (_.get(statistics, "options", undefined)) {
        let arr = [];
        for(var opt of statistics.options) {
          for (var j=0; j < opt.voter_count; j++) {
            arr.push(<span className="mr-1">{opt.text}</span>)
          }
        }
        return arr;
      }
    } else {
      return <span>No poll found.</span>
    }
  }

    render(){
      const { statistics } = this.props;
      const date = _.get(statistics, 'date', '');
      const question = _.get(statistics, 'question', '');
      return(
        <Card>
          <CardHeader>
            {this.getIcon(statistics.provider)}
            <CardTitle>
              <FormattedMessage id="Poll/Survey" />
            </CardTitle>
            <span>{ date ? moment(date).format("HH:mm DD MMMM YYYY") : ""}</span>
          </CardHeader>
          <CardBody>
            <p>{question}</p>
            {this.listPollResults()}
          </CardBody>
        </Card>
        );
    }
};

export default PollSurvey;
