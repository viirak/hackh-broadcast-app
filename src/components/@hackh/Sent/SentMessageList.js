import React from "react"
import {
  ListGroup,
  ListGroupItem,
  Badge
} from "reactstrap"
import _ from "lodash";
import moment from "moment";
import { FormattedMessage } from "react-intl";

class ListGroupCustom extends React.Component {
  state = {
    selectedCheck: 0
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
      case "telegram": return <img src="/telegram2.svg" width="40" alt="messenger" />;
      case "messenger": return <img src="/messenger.svg" width="40" alt="telegram" />
      default: return null;
    }
  }

  getContent = message => {
    if (message.method === "sendPoll") {
      return (
      <div className="p-1 h-100 w-100">
        <div className="w-100 d-flex flex-row justify-content-between">
            <h5 className="text-black">
            <FormattedMessage id="Poll/Survey" />
            </h5>
            <span>{moment(message.date).format("DD MMM HH:mm")}</span>
        </div>
        <strong>{message.question}</strong>
      </div>
      );
    } else {
      return (
        <div className="p-1 h-100 w-100">
          <div className="w-100 d-flex flex-row justify-content-between">
            <h5 className="text-black">
            <FormattedMessage id="Simple Text" />
            </h5>
            <span>{moment(message.date).format("DD MMM HH:mm")}</span>
          </div>
          <span className="h-50">
            {this.trimString(message.message, 100) || ""}
          </span> 
        </div>
      );
    }
  }

  onSelectChecklist = (item, key) => {
    this.setState({ selectedCheck: key })
    if (_.get(item, "type", "") === "poll"){
      this.props.loadStatistics(item);
    } else {
      this.props.getMessageInfo(item);
    }
  }

  render() {
    const { messages } = this.props;
    const list = messages.map( (msg, i) => 
    <ListGroupItem 
      key={i} 
      onClick={(e) => this.onSelectChecklist(msg, i)}
    >
      <div className="d-flex flex-row">
        <div className="d-flex flex-column flex-grow justify-content-around align-items-center">
          <div>
            {this.getIcon(msg.provider)}
          </div>
          {/* <small>{moment(msg.date).format("DD MMM")}</small>
          <small>{moment(msg.date).format("HH:mm")}</small> */}
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
