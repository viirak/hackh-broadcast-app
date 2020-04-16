import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {Row, Col, Input, Label, Button, Card, CardBody} from "reactstrap";
import Breadcrumbs from '../../../../components/@vuexy/breadCrumbs/BreadCrumb';
import { Link } from "react-router-dom";
import PhoneSimulator from '../../../../components/@hackh/PhoneSimulator/phoneSimulator';

import { sendMessage } from '../../../../redux/actions/social';
import { Confirm, Info } from '../../../../components/@hackh/popup';


export default props => {
  const [content, setContent] = useState('');
  const [sending, setSending] = useState(false);
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch();

  const confirmSend = () => {
    setSending(true);
    dispatch(sendMessage(content)).then(
      res => {
        console.log(res)
        setInfo(res);
        setSending(false);
      },
      err => {
        console.log(err);
        setError(err);
        setSending(false);
      }
    );
    setShowConfirm(false);
  }
  const cancelSend = () => setShowConfirm(false);

  return <>
    { showConfirm && <Confirm onConfirm={confirmSend} onCancel={cancelSend} /> }
    { error && <Info error={true} action={() => setError(null)} body={'Failed to send the message'} /> }
    { info && <Info action={() => setInfo(null)} body={'Successfully sent the message'} /> }
    <Breadcrumbs
      breadCrumbParent="Telegram"
      breadCrumbActive="Simple Text"
    />
    <Row>
      <Col md="6" sm="12">
        <Card>
          <CardBody>
            <h2>Content</h2>
            <Input
              type="textarea"
              name="content"
              id="content"
              rows="10"
              value={content}
              onChange={e => content.length < 4096 && setContent(e.target.value)}
              placeholder="Input content here"
            />
            <small
              className={`counter-value float-right ${
                content.length > 3900 ? "bg-danger" : ""
              }`}
            >
              {`${content.length}/4096`}
            </small>
          </CardBody>
        </Card>
        <div className="d-flex justify-content-end">
          <Button
            color="primary"
            outline
            onClick={() => setContent('')}
            disabled={!content.length}
          >Clear</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button.Ripple
            disabled={sending || !content.length}
            color="primary"
            onClick={() => setShowConfirm(true)}
          >Send</Button.Ripple>
        </div>
      </Col>
      <Col md="6" sm="12">
        <PhoneSimulator
          className="flex-grow p-4"
          type={'telegram'}
          messages={content}
        />
      </Col>
    </Row>
  </>
}
