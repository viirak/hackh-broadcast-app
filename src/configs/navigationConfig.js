import React from "react"
import * as Icon from "react-feather"
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
    icon: <Icon.Mail size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/messages/:filter",
    filterBase: "/messages/sent"
  },
  {
    id: "draft",
    title: "Draft",
    type: "item",
    icon: <Icon.MessageSquare size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/messages/:filter",
    filterBase: "/messages/draft"
  },
  {
    type: "groupHeader",
    groupTitle: "SOCIAL MEDIA"
  },
  {
    id: "telegram",
    title: "Telegram",
    type: "collapse",
    icon: <Icon.MessageSquare size={20} />,
    permissions: ["admin", "editor"],
    children: [
      {
        id: "text",
        title: "Simple Text",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/telegram/text"
      },
      {
        id: "poll-survey",
        title: "Poll/Survey",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin"],
        navLink: "/telegram/poll-survey"
      }
    ]
  },
  {
    id: "messenger",
    title: "Messenger",
    type: "collapse",
    icon: <Icon.MessageSquare size={20} />,
    permissions: ["admin", "editor"],
    children: [
      {
        id: "text",
        title: "Simple Text",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/messenger/text"
      },
      {
        id: "poll-survey",
        title: "Poll/Survey",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin"],
        navLink: "/messenger/poll-survey"
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
    icon: <Icon.MessageSquare size={20} />,
    permissions: ["admin", "editor"],
    children: [
      {
        id: "text",
        title: "Simple Text",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/sms/text"
      },
      {
        id: "poll-survey",
        title: "Poll/Survey",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin"],
        navLink: "/sms/poll-survey"
      }
    ]
  },

]

export default navigationConfig
