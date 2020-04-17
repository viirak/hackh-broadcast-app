import React from "react"
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from "reactstrap"
import classnames from "classnames"
import SentMessageList from "./SentMessageList";
import { FormattedMessage } from "react-intl";


let socialMediaOptions = [
  <FormattedMessage id="All" />,
  <FormattedMessage id="Telegram" />,
  <FormattedMessage id="Messenger" />,
  <FormattedMessage id="SMS" />,
  <FormattedMessage id="Text" />,
  <FormattedMessage id="Poll" />,
  <FormattedMessage id="Survey" />
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
    if (this.state.active !== tab) {
      this.setState({ active: tab })
    }
  }
  render() {
    return (
        <>
            <TabContent activeTab={this.state.activeTab} style={{maxHeight: "700px", overflow: "scroll"}}>
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
                <TabContent className="py-50" activeTab={this.state.active} data-spy="scroll">
                  <TabPane tabId="0">
                    <SentMessageList messages={this.props.messages} />
                  </TabPane>
                </TabContent>
              </TabPane>
            </TabContent>
        </>
    )
  }
}
export default TabsBasic
