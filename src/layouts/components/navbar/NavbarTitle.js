import React from "react"

const pathTitle = {
  "/": "Home",
  "/messages/sent": "Sent",
  "/messages/draft": "Draft",
  "/messages/telegram/text": "Telegram Text",
  "/messages/telegram/poll-survey": "Telegram Poll",
  "/messages/messenger/text": "Messenger Text",
  "/messages/messenger/poll-survey": "Messenger Poll",
  "/messages/sms/text": "SMS Text"
}

class NavbarTitle extends React.PureComponent {
  render() {
    return (
      <h1 className="text-white brand-text mb-0">{ pathTitle[this.props.path] }</h1>
    )
  }
}

export default NavbarTitle
