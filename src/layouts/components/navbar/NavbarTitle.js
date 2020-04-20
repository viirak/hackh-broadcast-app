import React from "react"
import { FormattedMessage } from "react-intl"

const pathTitle = {
  "/": <FormattedMessage id="Dashboard" />,
  "/messages/sent": <FormattedMessage id="Sent" />,
  "/messages/draft": <FormattedMessage id="Draft" />,
  "/messages/telegram/text": <FormattedMessage id="Telegram Text" />,
  "/messages/telegram/poll-survey": <FormattedMessage id="Telegram Poll" />,
  "/messages/messenger/text": <FormattedMessage id="Messenger Text" />,
  "/messages/messenger/poll-survey": <FormattedMessage id="Messenger Poll" />,
  "/messages/sms/text": <FormattedMessage id="SMS Text" />
}

class NavbarTitle extends React.PureComponent {
  render() {
    return (
      <h1 className="text-white brand-text mb-0">{ pathTitle[this.props.path] }</h1>
    )
  }
}

export default NavbarTitle
