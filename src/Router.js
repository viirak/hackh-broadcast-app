import React, { Suspense, lazy } from "react"
import { Router, Switch, Route } from "react-router-dom"
import { history } from "./history"
import { connect } from "react-redux"
import Spinner from "./components/@vuexy/spinner/Loading-spinner"
import { ContextLayout } from "./utility/context/Layout"

// Route-based code splitting
const Home = lazy(() =>
  import("./views/pages/Home")
)

const SentMessages = lazy(() =>
  import("./views/pages/messages/Sent")
)

const DraftMessages = lazy(() =>
  import("./views/pages/messages/Draft")
)

const TelegramSimpleText = lazy(() =>
  import("./views/pages/messages/telegram/SimpleText")
)

const TelegramPollSurvey = lazy(() =>
  import("./views/pages/messages/telegram/PollSurvey")
)

const MessengerSimpleText = lazy(() =>
  import("./views/pages/messages/messenger/SimpleText")
)

const MessengerPollSurvey = lazy(() =>
  import("./views/pages/messages/messenger/PollSurvey")
)

const SMSSimpleText = lazy(() =>
  import("./views/pages/messages/SMS/SimpleText")
)

const SMSPollSurvey = lazy(() =>
  import("./views/pages/messages/SMS/PollSurvey")
)

const login = lazy(() =>
  import("./views/pages/authentication/login/Login")
)

// Set Layout and Component Using App Route
const RouteConfig = ({
  component: Component,
  fullLayout,
  permission,
  user,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      return (
        <ContextLayout.Consumer>
          {context => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === "horizontal"
                ? context.horizontalLayout
                : context.VerticalLayout
              return (
                <LayoutTag {...props} permission={props.user}>
                  <Suspense fallback={<Spinner />}>
                    <Component {...props} />
                  </Suspense>
                </LayoutTag>
              )
          }}
        </ContextLayout.Consumer>
      )
    }}
  />
)
const mapStateToProps = state => {
  return {
    user: state.auth.login.userRole
  }
}

const AppRoute = connect(mapStateToProps)(RouteConfig)

class AppRouter extends React.Component {
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          <AppRoute
            exact
            path="/"
            component={Home}
          />
          <AppRoute
            exact
            path="/messages/sent"
            component={SentMessages}
          />
          <AppRoute
            exact
            path="/messages/draft"
            component={DraftMessages}
          />
          <AppRoute
            exact
            path="/messages/telegram/text"
            component={TelegramSimpleText}
          />
          <AppRoute
            exact
            path="/messages/telegram/poll-survey"
            component={TelegramPollSurvey}
          />
          <AppRoute
            exact
            path="/messages/messenger/text"
            component={MessengerSimpleText}
          />
          <AppRoute
            exact
            path="/messages/messenger/poll-survey"
            component={MessengerPollSurvey}
          />
          <AppRoute
            exact
            path="/messages/sms/text"
            component={SMSSimpleText}
          />
          <AppRoute
            exact
            path="/messages/sms/poll-survey"
            component={SMSPollSurvey}
          />
          <AppRoute
            path="/pages/login"
            component={login}
            fullLayout
          />
        </Switch>
      </Router>
    )
  }
}

export default AppRouter
