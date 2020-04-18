import React from "react"
import { IntlProvider } from "react-intl"
import Cookie from 'js-cookie'

import messages_en from "../../assets/data/locales/en.json"
import messages_kh from "../../assets/data/locales/kh.json"

const menu_messages = {
  en: messages_en,
  kh: messages_kh,
}

const Context = React.createContext()

class IntlProviderWrapper extends React.Component {
  state = {
    locale: Cookie.get('locale') || "en",
    messages: menu_messages[Cookie.get('locale') || "en"]
  }

  render() {
    const { children } = this.props
    const { locale, messages } = this.state
    return (
      <Context.Provider
        value={{
          state: this.state,
          switchLanguage: language => {
            Cookie.set('locale', language)
            this.setState({
              locale: language,
              messages: menu_messages[language]
            })
          }
        }}
      >
        <IntlProvider
          key={locale}
          locale={locale}
          messages={messages}
          defaultLocale="en"
        >
          {children}
        </IntlProvider>
      </Context.Provider>
    )
  }
}

export { IntlProviderWrapper, Context as IntlContext }
