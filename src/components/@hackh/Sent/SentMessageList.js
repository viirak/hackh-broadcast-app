import React from "react"
import {
  ListGroup,
  ListGroupItem,
} from "reactstrap"
import moment from "moment";
import { Send  } from "react-feather"

class ListGroupCustom extends React.Component {
  state = {
    activeTab: "1",
  }

  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab })
    }
  }

  render() {
    const { messages } = this.props;
    const list = messages.map( msg => 
    <ListGroupItem>
      <div className="d-flex flex-row justify-content-start">
        <div className="d-flex flex-column p-1 justify-content-around align-items-center">
          <Send size={32} />
          <small>{moment(msg.date).format("DD-MM-YY")}</small>
        </div>
        <div className="p-1 h-100">
        <h5 className="text-black">
          Telegram
        </h5>
        <p className="h-50 overflow-hidden">
          {msg.message || ""}
        </p> 
        </div>
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
