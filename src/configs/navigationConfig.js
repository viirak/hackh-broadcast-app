import React from "react"
import * as Icon from "react-feather"
import Telegram from '../assets/icons/Telegram'
import Messenger from '../assets/icons/Messenger'
import SMS from '../assets/icons/SMS'
const navigationConfig = [
  {
    id: "dashboard",
    title: "Dashboard",
    type: "item",
    icon: <Icon.Home size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/"
  },
  {
    type: "groupHeader",
    groupTitle: "MESSAGES"
  },
  {
    id: "sent",
    title: "Sent",
    type: "item",
    icon: <Icon.Send size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/messages/sent"
  },
  {
    id: "draft",
    title: "Draft",
    type: "item",
    icon: <Icon.Edit3 size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/messages/draft"
  },
  {
    type: "groupHeader",
    groupTitle: "SOCIAL MEDIA"
  },
  {
    id: "telegram",
    title: "Telegram",
    type: "collapse",
    icon: <Telegram size={20} />,
    permissions: ["admin", "editor"],
    children: [
      {
        id: "telegram-text",
        title: "Simple Text",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/messages/telegram/text"
      },
      {
        id: "telegram-poll-survey",
        title: "Poll/Survey",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin"],
        navLink: "/messages/telegram/poll-survey"
      }
    ]
  },
  {
    id: "messenger",
    title: "Messenger",
    type: "collapse",
    icon: <Messenger size={20} />,
    permissions: ["admin", "editor"],
    children: [
      {
        id: "messenger-text",
        title: "Simple Text",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/messages/messenger/text"
      },
      {
        id: "messenger-poll-survey",
        title: "Poll/Survey",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin"],
        navLink: "/messages/messenger/poll-survey"
      }
    ]
  },
  {
    type: "groupHeader",
    groupTitle: "TRADITIONAL MEDIA"
  },
  {
    id: "sms",
    title: "SMS",
    type: "collapse",
    icon: <SMS size={20} />,
    permissions: ["admin", "editor"],
    children: [
      {
        id: "sms-text",
        title: "Simple Text",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/messages/sms/text"
      },
      {
        id: "sms-poll-survey",
        title: "Poll/Survey",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin"],
        navLink: "/messages/sms/poll-survey",
        disabled: true
      }
    ]
  },

]

export default navigationConfig
