import React from "react"
import {
  ListGroup,
  ListGroupItem,
  Badge
} from "reactstrap"
import moment from "moment";
import { FormattedMessage } from "react-intl";

class ListGroupCustom extends React.Component {
  state = {
    activeTab: "1",
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
      <div className="p-1 h-100">
        <h5 className="text-black">
          <FormattedMessage id="Poll/Survey" />
        </h5>
        <strong>{message.question}</strong>
      </div>
      );
    } else {
      return (
        <div className="p-1 h-100">
          <h5 className="text-black">
          <FormattedMessage id="Simple Text" />
          </h5>
          <span className="h-50">
            {this.trimString(message.message, 100) || ""}
          </span> 
        </div>
      );
    }
  }
  render() {
    const { messages } = this.props;
    const list = messages.map( (msg, i) => 
    <ListGroupItem key={i} onPointerOver={() => this.props.loadStatistics(messages[i])}>
      <div className="d-flex flex-row">
        <div className="d-flex flex-column flex-grow justify-content-around align-items-center">
          <div>
            {this.getIcon(msg.provider)}
          </div>
          <small>{moment(msg.date).format("DD MMM")}</small>
          <small>{moment(msg.date).format("HH:mm")}</small>
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
