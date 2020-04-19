import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import {Row, Col, Input, Button, Card, CardBody} from "reactstrap";
import PhoneSimulator from '../../../../components/@hackh/PhoneSimulator/phoneSimulator';
import "../../../../assets/scss/pages/message.scss";
import { sendMessage } from '../../../../redux/actions/social';
import { Confirm, Info } from '../../../../components/@hackh/popup';
import { FormattedMessage } from "react-intl";


export default props => {
  const [content, setContent] = useState('');
  const [sending, setSending] = useState(false);
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch();

  const confirmSend = () => {
    setSending(true);
    dispatch(sendMessage(content, 'messenger')).then(
      res => {
        console.log(res);
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
    { error && <Info error={true} action={() => setError(null)} body={props.intl.formatMessage({ id: 'send-fail' })} /> }
    { info && <Info action={() => setInfo(null)} body={props.intl.formatMessage({ id: 'send-success' })} /> }
    <Row>
      <Col md="6" sm="12">
        <Card>
          <CardBody>
            <div className="message-section">
              <h2 className="message-title"><FormattedMessage id="Message" /></h2>
              <div className="input-control">
                <Input
                  type="textarea"
                  name="content"
                  id="content"
                  rows="10"
                  value={content}
                  onChange={e => content.length < 4096 && setContent(e.target.value)}
                  placeholder={props.intl.formatMessage({ id: 'message-placeholder' })}
                />
                <small
                  className={`input-char-count ${
                    content.length > 3900 ? "bg-danger" : ""
                  }`}
                >
                  {`${content.length}/4096`}
                </small>
              </div>
            </div>
            <div className="message-section message-actions d-flex justify-content-end">
              <Button
                color="primary"
                outline
                onClick={() => setContent('')}
                disabled={!content.length}
              ><FormattedMessage id="Clear" /></Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button.Ripple
                disabled={sending || !content.length}
                color="primary"
                onClick={() => setShowConfirm(true)}
              ><FormattedMessage id="Send" /></Button.Ripple>
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col md="6" sm="12">
        <PhoneSimulator
          className="flex-grow p-4"
          type={'messenger'}
          messages={content}
        />
      </Col>
    </Row>
  </>
}
