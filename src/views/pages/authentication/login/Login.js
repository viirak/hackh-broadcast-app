import React from "react"
import {
  Button,
  Card,
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap"
import { POST } from 'fetchier'
import Cookie from 'js-cookie'
import { Mail, Lock, Check, Facebook, Twitter, GitHub, Phone } from "react-feather"
import { history } from "../../../../history"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import googleSvg from "../../../../assets/img/svg/google.svg"
import { connect } from 'react-redux';

import loginImg from "../../../../assets/img/pages/login.png"
import "../../../../assets/scss/pages/authentication.scss"

import { endpoints } from '../../../../redux/config';
import { Info } from '../../../../components/@hackh/popup';
import { login } from '../../../../redux/actions/auth/customAuth';

class Login extends React.Component {
  state = {
    phone: '',
    pin: '',
    otpSent: false,
    isLoading: false,
    success: null,
    info: null
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  handleRequestOtp = async () => {
    if(!this.state.phone) return console.log('no phone to send otp');
    this.setState({
      isLoading: true,
    });

    try {
      const url = endpoints.auth;
      const body = { phone: `+855${this.state.phone}` }

      const result = await POST({ url, body })

      this.setState({ info: result, isLoading: false, otpSent: true });
    } catch (err) {
      console.log(err)
      this.setState({ error: err, isLoading: false });
    }
  }

  handleLogin = async token => {
    this.setState({
      isLoading: true,
    });

    if(!this.state.pin) return console.log('no pin input');
    try {
      const url = endpoints.auth;
      const body = { phone: `+855${this.state.phone}`, code: this.state.pin }

      const result = await POST({ url, body })
      const { customToken = '' } = result.data || {};

      await this.props.login(customToken);

      this.setState({ isLoading: false });
      history.push('/');
    } catch (err) {
      console.log(err);
      this.setState({ error: err, isLoading: false });
    }
  }

  render() {
    const { error, info } = this.state;
    return <>
      { error && <Info error={true} action={() => this.setState({ error: null })} body={error} /> }
      { info && <Info action={() => this.setState({ info: null })} body={info} /> }
      <Row className="m-0 justify-content-center">
        <Col
          sm="8"
          xl="7"
          lg="10"
          md="8"
          className="d-flex justify-content-center"
        >
          <Card className="bg-authentication login-card rounded-0 mb-0 w-100">
            <Row className="m-0">
              <Col
                lg="6"
                className="d-lg-block d-none text-center align-self-center px-1 py-0"
              >
                <img src={loginImg} alt="loginImg" />
              </Col>
              <Col lg="6" md="12" className="p-0">
                <Card className="rounded-0 mb-0 px-2">
                      <CardBody>
                        <h4>Login</h4>
                        <p>Welcome back, Please input your phone number.</p>
                        <Form onSubmit={e => e.preventDefault()}>
                          { !this.state.otpSent &&
                            <FormGroup className="form-label-group position-relative has-icon-left">
                              <Input
                                type="number"
                                placeholder="phone number"
                                value={this.state.phone}
                                onChange={e => this.setState({ phone: e.target.value })}
                              />
                              <div className="form-control-position">
                                <Phone size={15} />
                              </div>
                            </FormGroup>
                          }
                          {
                            !!this.state.otpSent &&
                            <FormGroup className="form-label-group position-relative has-icon-left">
                              <Input
                                type="password"
                                placeholder="One time password"
                                value={this.state.pin}
                                onChange={e => this.setState({ pin: e.target.value })}
                              />
                              <div className="form-control-position">
                                <Lock size={15} />
                              </div>
                            </FormGroup>
                          }
                          <div className="d-flex justify-content-between">
                            {
                              !!this.state.otpSent &&
                                <Button
                                  size="sm"
                                  color="link"
                                  onClick={() => this.setState({ otpSent: false })}
                                >Send Code Again?</Button>
                            }
                            <Button.Ripple
                              disabled={this.state.isLoading}
                              color="primary"
                              onClick={() => this.state.otpSent ? this.handleLogin() : this.handleRequestOtp()}
                            >
                                {!this.state.otpSent ? 'Send OTP' : 'Login'}
                            </Button.Ripple>
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
