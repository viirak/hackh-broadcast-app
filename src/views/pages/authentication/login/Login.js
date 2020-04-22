import React from "react"
import {
  Button,
  Card,
  CardBody,
  Row,
  Label,
  Col,
  Form,
  FormGroup,
  Input,
} from "reactstrap"
import { POST } from 'fetchier'
import { history } from "../../../../history"
import { connect } from 'react-redux';
import loginImg from "../../../../assets/img/pages/auth-login.png"
import "../../../../assets/scss/pages/authentication.scss"
import { endpoints } from '../../../../redux/config';
import { login } from '../../../../redux/actions/auth/customAuth';
import PinInput from 'react-pin-input'
import { FormattedMessage } from "react-intl"
import LanguageDropdown from '../../../../layouts/components/navbar/language';

class Login extends React.Component {

  state = {
    error: null,
    phone: '',
    pin: '',
    otpSent: false,
    isLoading: false,
    success: null,
    info: null,
    attempts: 5
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  handleRequestOtp = async () => {
    this.setState({ isLoading: true, error: null });
    try {
      const url = endpoints.auth;
      const body = { phoneNumber: `+855${this.state.phone}` }
      const result = await POST({ url, body })
      this.setState({ info: result, isLoading: false, otpSent: true });
    } catch (err) {
      this.setState({ error: err, isLoading: false });
    }
  }

  handleInputFocus = () => {
    this.setState({ error: null })
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.handleRequestOtp()
    }
  }

  handlePinEntered = async (value, index) => {
    this.setState({ error: null, isLoading: true });
    try {
      const url = endpoints.auth;
      const body = { phoneNumber: `+855${this.state.phone}`, code: value }
      const result = await POST({ url, body })
      const { customToken = '' } = result.data || {};
      await this.props.login(customToken);
      this.setState({ isLoading: false });
      history.push('/messages/telegram/text');
    } catch (err) {
      let newState = { isLoading: false };
      if(this.state.attempts - 1 === 0) newState = { ...newState, attempts: 5, otpSent: false }
      else newState = { ...newState, error: err, attempts: this.state.attempts - 1 }
      this.setState(newState);
    }
  }

  render() {
    const { error, otpSent, isLoading } = this.state;
    const descSend = <FormattedMessage id="send-description" />;
    const descLogin = <FormattedMessage
      id="login-description"
      // values={{ 'phone-number': this.state.phone }}
    />;
    const desc = otpSent ? descLogin : descSend;
    const ctaText = otpSent ? <FormattedMessage id="Login" /> : <FormattedMessage id="Send" />;
    const ctaSpin = <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>;
    const ctaContent = isLoading ? ctaSpin : ctaText;
    let errorMsg = "";
    if ( error ) {
      console.log(error);
      if (error.statusCode === 400){
        errorMsg = <FormattedMessage id="number-not-found" />;
      } if (error.statusCode === 500){
        errorMsg = <FormattedMessage id="number-unverified" />;
      } else {
        errorMsg = error.message;
      }
    }
    return <>
      <Row className="m-0 justify-content-center">
        <Col
          sm="8"
          xl="7"
          lg="10"
          md="8"
          className="d-flex justify-content-center"
        >
          <Card className="bg-authentication rounded-3 login-card mb-0 w-100">
            <Row className="m-0">
              <Col
                lg="6"
                className="d-lg-block d-none text-center align-self-center px-1 py-0"
              >
                <img src={loginImg} alt="loginImg" />
              </Col>
              <Col lg="6" md="12" className="p-0">
                <Card className="rounded-0 mb-0 px-2">
                  <div style={{ position: 'absolute', top: '10px', right: '20px'}}>
                    <ul className="navbar-nav">
                      <LanguageDropdown />
                    </ul>
                  </div>
                  <CardBody>
                    <h1 className="title"><FormattedMessage id="login-page-title" /></h1>
                    <p className="desc">{ desc }</p>
                    {(error && <div className="alert alert-danger">{ errorMsg }</div> )}
                    <Form className="form" onSubmit={e => e.preventDefault()}>
                      { !this.state.otpSent
                        ? <FormGroup className="form-label-group position-relative has-icon-left">
                          <Input
                            className="inputNumber"
                            type="number"
                            placeholder={this.props.intl.formatMessage({ id: 'phone-input-placeholder' })}
                            value={this.state.phone}
                            onChange={e => this.setState({ phone: e.target.value })}
                            onFocus={ this.handleInputFocus }
                            onKeyDown= { this.handleKeyDown }
                          />
                        </FormGroup>
                        : <FormGroup className="form-label-group position-relative">
                            <PinInput
                              length={6}
                              initialValue=""
                              focus={true}
                              onChange={this.handleInputFocus}
                              type="numeric"
                              inputStyle={{
                                borderColor: 'red',
                                borderRadius: '12px',
                                width: '40',
                                marginRight: '5px',
                                fontSize: '20px'}}
                              inputFocusStyle={{borderColor: 'blue'}}
                              onComplete={this.handlePinEntered}
                            />
                          </FormGroup>
                      }

                      {this.state.otpSent &&
                        <div className="resend-text">
                          <Label className="text">
                            <span style={{ textDecoration: 'underline', fontSize: '110%', fontWeight: '600' }}>{this.state.attempts}</span>
                            &nbsp;<FormattedMessage id="attempts" />
                          </Label>
                          <br/><br/>
                          <span className="text"><FormattedMessage id="resend-pin-message" /></span>
                          <Button
                            size="sm"
                            color="link"
                            onClick={() => this.setState({ otpSent: false })}>Resend</Button>
                        </div>
                      }

                      <div className="actions">
                        {!this.state.otpSent &&
                          <Button.Ripple
                            disabled={this.state.isLoading}
                            color="primary"
                            onClick={() => this.handleRequestOtp()}>
                              { ctaContent }
                          </Button.Ripple>
                        }
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  login: token => dispatch(login(token))
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
