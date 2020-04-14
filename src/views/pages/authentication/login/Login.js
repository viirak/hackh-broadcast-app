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
  Label
} from "reactstrap"
import { POST } from 'fetchier'
import { Mail, Lock, Check, Facebook, Twitter, GitHub, Phone } from "react-feather"
import { history } from "../../../../history"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import googleSvg from "../../../../assets/img/svg/google.svg"

import loginImg from "../../../../assets/img/pages/login.png"
import "../../../../assets/scss/pages/authentication.scss"


class Login extends React.Component {
  state = {
    phone: '',
    pin: '',
    otpSent: false,
    isLoading: false
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
    setTimeout(() => this.setState({ isLoading: false, otpSent: true }), 1000);
    // const url = 'https://zwrqt3cve3.execute-api.ap-southeast-1.amazonaws.com/dev/api/auth';
    // const body = { phone: `+855${this.state.phone}` }
    // console.log('result', url, body);
    // const result = await POST({ url, body })
    // console.log('result', result);
  }

  handleLogin = async () => {
    if(!this.state.pin) return console.log('no pin input');
    this.setState({
      isLoading: true,
    });
    setTimeout(() => {
      this.setState({ isLoading: false });
      history.push('/');
    }, 1500);
    // const url = 'https://zwrqt3cve3.execute-api.ap-southeast-1.amazonaws.com/dev/api/auth';
    // const body = { phone: `+855${this.state.phone}`, code: this.state.pin }
    // console.log('result', url, body);
    // const result = await POST({ url, body })
    // console.log('result', result);
  }

  render() {
    return (
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
    )
  }
}
export default Login
