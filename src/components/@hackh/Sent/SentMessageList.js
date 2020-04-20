import React from "react"
import {
  ListGroup,
  ListGroupItem,
  Badge
} from "reactstrap"
import moment from "moment";
import { Send, MessageCircle  } from "react-feather"
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

  getIcon = social => {
    switch (social) {
      case "telegram": return <Send size={32} />;
      case "messenger": return <MessageCircle size={32} />;
      default: return null;
    }
  }

  getContent = message => {
    if (message.method === "sendPoll") {
      return (
      <div className="p-1 h-100">
        <h5 className="text-black">
          <FormattedMessage id="Poll" />
        </h5>
        <strong>{message.question}</strong>
        <div>
          {message.options.map(msg => <Badge color="primary" className="mr-1">{msg}</Badge>)}
        </div>
      </div>
      );
    } else {
      return (
        <div className="p-1 h-100">
          <h5 className="text-black">
            <FormattedMessage id="Text" />
          </h5>
          <p className="h-50 overflow-hidden">
            {message.message || ""}
          </p> 
        </div>
      );
    }
  }
  render() {
    const { messages } = this.props;
    const list = messages.map( (msg, i) => 
    <ListGroupItem key={i} onPointerOver={() => this.props.loadStatistics(messages[i])}>
      <div className="d-flex flex-row justify-content-start">
        <div className="d-flex flex-column p-1 justify-content-around align-items-center">
          {this.getIcon(msg.type)}
          <small>{moment(msg.date).format("DD-MM-YY")}</small>
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
