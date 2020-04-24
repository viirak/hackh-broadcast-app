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
import {} from "react-feather"
import Telegram from '../../../assets/icons/Telegram';
import Messenger from '../../../assets/icons/Messenger';
import { FormattedMessage } from "react-intl";

class PollSurvey extends React.Component {

  getIcon = social => {
    switch (social) {
      case "telegram": return <Telegram size={20} />;
      case "messenger": return <Messenger size={20} />;
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
    }
  }

  render(){
    const { detail } = this.props;
    const message = detail.message;
    const title = message.type === 'poll' ? 'Poll/Survey' : 'Simple Text';
    const messageCls = `message ${message.provider}`;
    return(
      <Card className="message-card">
        <CardHeader>
          <CardTitle>
            <span className="provider-icon">{ this.getIcon(message.provider) }</span>
            <span className="title">{ title }</span>
            <span className="dt">{moment(message.date).format("HH:mm DD MMMM YYYY")}</span>
          </CardTitle>
        </CardHeader>
        <CardBody>
          <div className={messageCls}>
            {message.type === 'poll' && message.imageUrl &&
              <div className="message-image">
                <img src={message.imageUrl} alt="" />
              </div>
            }
            <div className="message-text-group">
              <div className="message-text">
                {message.type === 'poll' ? message.question : message.message}
              </div>
              {message.options &&
                <div className="message-options">
                  <h4 className="option-title"><FormattedMessage id="Poll" /></h4>
                  <ul className="option-list">
                    {message.options.map((option, i) => {
                      return (<li>{option}</li>)
                    })}
                  </ul>
                </div>
              }
            </div>
          </div>
        </CardBody>

      </Card>
    )
  }
};

export default PollSurvey;
