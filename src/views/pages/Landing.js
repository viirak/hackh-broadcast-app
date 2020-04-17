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
                  <div style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', paddingTop: '2rem' }}>
                    <h2>ចូលរួមឥលូវនេះ - Subscribe</h2>
                    <br />
                    <br />
                    <p>ចូលរួមខាងក្រោមដើម្បីទទួលដំនឺងជាផ្លូវការពីប្រព័ន្ធផ្តល់ពត័មានទាក់ទងនឹងការវិវត្តន៍នៃវីរុស​ Covid-19 នៅក្នុងប្រទេសកម្ពុជា</p>
                    <p>Subscribe to the official news broadcasting system about the Covid-19 virus in Cambodia</p>
                    <br />
                    <br />
                    <Row>
                      <Col>
                        <a href="https://t.me/hackh_broadcast" target="blank">
                          <img src={iconTelegram} alt="loginImg" />
                          <p>Telegram</p>
                        </a>
                      </Col>
                      <Col>
                        <a href="https://m.me/113306183658091" target="blank">
                          <img style={{paddingTop: '5px'}} src={iconMessenger} alt="loginImg" />
                          <p style={{paddingTop: '5px'}}>Messenger</p>
                        </a>
                      </Col>
                    </Row>
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
