import React from "react"
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from "reactstrap"
import { connect } from 'react-redux';
import classnames from "classnames"
import SentMessageList from "./SentMessageList";
import { FormattedMessage } from "react-intl";
import {
  loadAllMessages,
  loadMessengerMessages,
  loadTextMessages,
  loadPollMessages,
  loadTelegramMessages,
  getMessageInfo,
  setSelectedMessage
} from "../../../redux/actions/sent/index";


let socialMediaOptions = [
  <FormattedMessage id="All" />,
  <FormattedMessage id="Telegram" />,
  <FormattedMessage id="Messenger" />,
  <FormattedMessage id="SMS" />,
  <FormattedMessage id="Text" />,
  <FormattedMessage id="Poll/Survey" />,
  <FormattedMessage id="Questionnaire" />
];

class TabsBasic extends React.Component {
  state = {
    activeTab: "0",
    active: "0"
  }

  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab })
    }
  }

  toggle = tab => {
    const {
      loadAllMessages,
      loadMessengerMessages,
      loadPollMessages,
      loadTextMessages,
      loadTelegramMessages
    } = this.props;

    if (this.state.active !== tab) {
      this.setState({ active: tab })
    }
    switch(tab) {
      case '0': loadAllMessages(); break;
      case '1': loadTelegramMessages(); break;
      case '2': loadMessengerMessages(); break;
      case '4': loadTextMessages(); break;
      case '5': loadPollMessages(); break;
      default: break;
    }
  }
  render() {
    return (
        <>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="0">
                <Nav tabs>
                  {socialMediaOptions.map( (social, i) =>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.active === `${i}`
                        })}
                        onClick={() => {
                          this.toggle(`${i}`)
                        }}
                      >
                        {social}
                      </NavLink>
                    </NavItem>
                    )}
                </Nav>
                <TabContent className="py-50 tab-content-wrapper" activeTab={this.state.active} data-spy="scroll">
                  <TabPane tabId="0">
                    <SentMessageList
                      messages={this.props.sentMessages}
                      setSelectedMessage={this.props.setSelectedMessage}
                      // loadStatistics={this.props.loadStatistics}
                      // getMessageInfo={this.props.getMessageInfo}
                    />
                  </TabPane>
                  <TabPane tabId="1">
                    <SentMessageList
                      messages={this.props.telegram}
                      setSelectedMessage={this.props.setSelectedMessage}
                      // loadStatistics={this.props.loadStatistics}
                      // getMessageInfo={this.props.getMessageInfo}
                    />
                  </TabPane>
                  <TabPane tabId="2">
                    <SentMessageList
                     messages={this.props.messenger}
                     setSelectedMessage={this.props.setSelectedMessage}
                    //  loadStatistics={this.props.loadStatistics}
                    //  getMessageInfo={this.props.getMessageInfo}
                    />
                  </TabPane>
                  <TabPane tabId="4">
                    <SentMessageList
                     messages={this.props.textMessages}
                     setSelectedMessage={this.props.setSelectedMessage}
                    //  loadStatistics={this.props.loadStatistics}
                    //  getMessageInfo={this.props.getMessageInfo}
                    />
                  </TabPane>
                  <TabPane tabId="5">
                    <SentMessageList
                     messages={this.props.pollMessages}
                     setSelectedMessage={this.props.setSelectedMessage}
                    //  loadStatistics={this.props.loadStatistics}
                    //  getMessageInfo={this.props.getMessageInfo}
                    />
                  </TabPane>
                </TabContent>
              </TabPane>
            </TabContent>
        </>
    )
  }
}


const mapStateToProps = state => {
  const {
    sentMessages,
    telegram,
    messenger,
    textMessages,
    pollMessages,
    statistics
  } = state.sent;
  return {
    sentMessages,
    telegram,
    messenger,
    textMessages,
    pollMessages,
    statistics
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadAllMessages: () => dispatch(loadAllMessages()),
  loadTelegramMessages: () => dispatch(loadTelegramMessages()),
  loadMessengerMessages: () => dispatch(loadMessengerMessages()),
  loadTextMessages: () => dispatch(loadTextMessages()),
  loadPollMessages: () => dispatch(loadPollMessages()),
  getMessageInfo: (message) => dispatch(getMessageInfo(message)),
  setSelectedMessage: (message) => dispatch(setSelectedMessage(message))
});
export default connect(mapStateToProps, mapDispatchToProps)(TabsBasic);
