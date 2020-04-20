import React, { Suspense, lazy, useEffect, useState } from "react"
import { Router, Switch, Route } from "react-router-dom"
import { history } from "./history"
import { useDispatch, useSelector } from "react-redux"
import Spinner from "./components/@vuexy/spinner/Fallback-spinner"
import { ContextLayout } from "./utility/context/Layout"
import Cookie from 'js-cookie';
import { login as loginUser } from './redux/actions/auth/customAuth';
import { injectIntl } from 'react-intl'

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

const landing = lazy(() =>
  import("./views/pages/Landing")
)

// Set Layout and Component Using App Route
const AppRoute = ({
  component: Component,
  fullLayout,
  permission,
  ...rest
}) => {
  const user = useSelector(store => store.auth.login.userRole);
  const WithIntl = injectIntl(Component);
  return (
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
                  <LayoutTag {...props} permission={user}>
                    <Suspense fallback={<Spinner />}>
                      <WithIntl {...props} />
                    </Suspense>
                  </LayoutTag>
                )
            }}
          </ContextLayout.Consumer>
        )
      }}
    />
  )
}

export default props => {
  const { user } = useSelector(store => store.auth);
  const [logging, setLogging] = useState(true);
  const dispatch = useDispatch();
  const { pathname = '/' } = window && window.location || {};

  useEffect(() => {
    async function start() {
      const loginToken = Cookie.get('loginToken');
      if(loginToken && pathname !== '/subscribe')
        return dispatch(loginUser(loginToken))
          .then(() => setLogging(false))
          .catch(err => {
            console.log(err);
            setLogging(false);
          })
      setLogging(false);
    }
    start();
  }, []);

  if(logging) return <Spinner />
  if(!user) history.push(pathname === '/subscribe' && pathname || '/pages/login');
  pathname === '/' && history.push('/messages/telegram/text');

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
        <AppRoute
          path="/subscribe"
          component={landing}
          fullLayout
        />
      </Switch>
    </Router>
  )
}
