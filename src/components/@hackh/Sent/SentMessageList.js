import React from "react"
import {
  ListGroup,
  ListGroupItem,
} from "reactstrap"
import moment from "moment";
import Telegram from '../../../assets/icons/Telegram';
import Messenger from '../../../assets/icons/Messenger';
import { FormattedMessage } from "react-intl";

class ListGroupCustom extends React.Component {
  state = {
    selectedCheck: -1
  }

  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab })
    }
  }
  trimString = function (string, length) {
    return string.length > length ?
           string.substring(0, length) + '...' :
           string;
  };

  getIcon = social => {
    switch (social) {
      // case "telegram": return <img src="/telegram2.svg" width="40" alt="messenger" />;
      case "telegram": return <Telegram size={24} />;
      case "messenger": return <Messenger size={24} />;
      // case "messenger": return <img src="/messenger.svg" width="40" alt="telegram" />;
      default: return null;
    }
  }

  getContent = message => {
    if (message.method === "sendPoll") {
      return (
      <div className="h-100 w-100 column-message">
        <div className="w-100 d-flex flex-row justify-content-between message-header">
            <span className="provider">
              <FormattedMessage id="Poll/Survey" />
            </span>
            <span className="dt">{moment(message.date).format("DD MMM HH:mm")}</span>
        </div>
        <div className="h-50 message summary">
          {message.question}
        </div>
      </div>
      );
    } else {
      return (
        <div className="h-100 w-100 column-message">
          <div className="w-100 d-flex flex-row justify-content-between message-header">
            <span className="privider">
              <FormattedMessage id="Simple Text" />
            </span>
            <span className="dt">{moment(message.date).format("DD MMM HH:mm")}</span>
          </div>
          <div className="h-50 message summary">
            {this.trimString(message.message, 100) || ""}
          </div>
        </div>
      );
    }
  }

  onSelectChecklist = (item, key) => {
    this.setState({ selectedCheck: key });
    this.props.setSelectedMessage(item);
    // this.props.getMessageInfo(item);
    // if (_.get(item, "type", "") === "poll"){
    //   this.props.loadStatistics(item);
    // }
    // else {
    //   this.props.getMessageInfo(item);
    // }
  }

  render() {
    const { messages } = this.props;
    const list = messages.map( (msg, i) =>
    <ListGroupItem
      key={i}
      onClick={() => this.onSelectChecklist(msg, i)}
      className={this.state.selectedCheck === i ? 'active' : ''}
    >
      <div className="d-flex flex-row item-message">
        <div className="d-flex flex-column flex-grow justify-content-around align-items-center column-icon">
          {this.getIcon(msg.provider)}
        </div>
        {this.getContent(msg)}
      </div>
    </ListGroupItem>
    )
    return (
      <React.Fragment>
        <ListGroup>
          {list}
        </ListGroup>
      </React.Fragment>
    )
  }
}
export default ListGroupCustom
