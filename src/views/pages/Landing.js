import React from 'react';
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
import { Mail, Lock, Check, Facebook, Twitter, GitHub, Phone } from "react-feather"

// import loginImg from "../../assets/img/pages/login.png"
import loginImgLeft from "../../assets/img/pages/loginLeft.png"
import loginImgRight from "../../assets/img/pages/loginRight.png"
import iconTelegram from "../../assets/img/icons/Telegram.png"
import iconMessenger from "../../assets/img/icons/messenger.png"
import "../../assets/scss/pages/authentication.scss"

export default props => {
  return <>
    <Row className="m-0 justify-content-center">
      <Col
        sm="10"
        className="d-flex justify-content-center"
      >
        <Card className="bg-authentication login-card mb-0 w-100">
          <div style={{ backgroundColor: '#436688' }}>
            <Row className="m-0">
            <Col md="3" className="d-lg-block d-none text-center align-self-center px-1 py-5">
              <img src={loginImgLeft} alt="loginImg" />
            </Col>
            <Col md="6" sm="12" className="px-0 py-0 text-center">
              <Card className="h-100 rounded-0">
                <CardBody className="h-100">
                  <div style={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', paddingTop: '2rem' }}>
                    <h3>ចូលរួមឥលូវនេះ - Subscribe</h3>
                    <br />
                    <p>ចូលរួមទទួលដំនឺងជាផ្លូវការពីប្រព័ន្ធផ្តល់ពត័មានទាក់ទងនឹងវីរុស​ Covid-19 នៅក្នុងប្រទេសកម្ពុជា</p>
                    <p>Subscribe to official news broadcasting system about the Covid-19 virus in Cambodia</p>
                    <br />
                    <br />
                    <div className="d-flex justify-content-between px-4">
                      <div className="align-self-center">
                        <a href="https://t.me/hackh_broadcast" target="blank">
                          <img src={iconTelegram} alt="loginImg" />
                          <p>Telegram</p>
                        </a>
                      </div>
                      <div className="align-self-center">
                        <a href="https://m.me/113306183658091" target="blank">
                          <img src={iconMessenger} alt="loginImg" />
                          <p>Messenger</p>
                        </a>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md="3" className="d-lg-block d-none text-center align-self-center px-2 py-5">
              <img src={loginImgRight} alt="loginImg" />
            </Col>
          </Row>
          </div>
        </Card>
      </Col>
    </Row>
  </>
}
