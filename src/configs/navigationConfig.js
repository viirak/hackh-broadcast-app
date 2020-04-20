import React from "react"
import * as Icon from "react-feather"
import Telegram from '../assets/icons/Telegram'
import Messenger from '../assets/icons/Messenger'
import SMS from '../assets/icons/SMS'
import { FormattedMessage } from "react-intl"

const navigationConfig = [
  {
    id: "dashboard",
    title: <FormattedMessage id="Dashboard" />,
    type: "item",
    icon: <Icon.Home size={20} />,
    permissions: ["superadmin", "admin", "viewer"],
    navLink: "/",
    disabled: true
  },
  {
    type: "groupHeader",
    groupTitle: <FormattedMessage id="Messages" />
  },
  {
    id: "sent",
    title: <FormattedMessage id="Sent" />,
    type: "item",
    icon: <Icon.Send size={20} />,
    permissions: ["superadmin", "admin", "viewer"],
    navLink: "/messages/sent"
  },
  {
    id: "draft",
    title: <FormattedMessage id="Draft" />,
    type: "item",
    icon: <Icon.Edit3 size={20} />,
    permissions: ["superadmin", "admin", "editor"],
    navLink: "/messages/draft",
    disabled: true
  },
  {
    type: "groupHeader",
    groupTitle: <FormattedMessage id="social-media" />
  },
  {
    id: "telegram",
    title: <FormattedMessage id="Telegram" />,
    type: "collapse",
    icon: <Telegram size={20} />,
    permissions: ["superadmin", "admin", "editor"],
    children: [
      {
        id: "telegram-text",
        title: <FormattedMessage id="Simple Text" />,
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["superadmin", "admin", "editor"],
        navLink: "/messages/telegram/text"
      },
      {
        id: "telegram-poll-survey",
        title: <FormattedMessage id="Poll/Survey" />,
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["superadmin", "admin", "editor"],
        navLink: "/messages/telegram/poll-survey"
      }
    ]
  },
  {
    id: "messenger",
    title: <FormattedMessage id="Messenger" />,
    type: "collapse",
    icon: <Messenger size={20} />,
    permissions: ["superadmin", "admin", "editor"],
    children: [
      {
        id: "messenger-text",
        title: <FormattedMessage id="Simple Text" />,
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["superadmin", "admin", "editor"],
        navLink: "/messages/messenger/text"
      },
      {
        id: "messenger-poll-survey",
        title: <FormattedMessage id="Poll/Survey" />,
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["superadmin", "admin", "editor"],
        navLink: "/messages/messenger/poll-survey"
      }
    ]
  },
  {
    type: "groupHeader",
    groupTitle: <FormattedMessage id="traditional-media" />
  },
  {
    id: "sms",
    title: "SMS",
    type: "collapse",
    icon: <SMS size={20} />,
    permissions: ["superadmin", "admin", "editor"],
    disabled: true,
    children: [
      {
        id: "sms-text",
        title: <FormattedMessage id="Simple Text" />,
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["superadmin", "admin", "editor"],
        navLink: "/messages/sms/text"
      },
      {
        id: "sms-poll-survey",
        title: <FormattedMessage id="Poll/Survey" />,
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["superadmin", "admin", "editor"],
        navLink: "/messages/sms/poll-survey"
      }
    ]
  },

]

export default navigationConfig
