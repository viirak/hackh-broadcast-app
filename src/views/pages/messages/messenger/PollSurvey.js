import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import {Row, Col, Button, Card, CardBody} from "reactstrap";
import PhoneSimulator from '../../../../components/@hackh/PhoneSimulator/phoneSimulator';
import Dropzone from '../../../../components/@vuexy/dropzone';
import { sendMessage } from '../../../../redux/actions/social'
import { Confirm, Info } from '../../../../components/@hackh/popup';
import "../../../../assets/scss/pages/message.scss";
import LimitTextInput from './../../../components/@hackh/limitTextInput';
import { FormattedMessage } from "react-intl"

export default props => {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState([]);
  const [image, setImage] = useState();
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch();

  const isOptsValid = options.filter(item => item).length >= 2;

  const confirmSend = () => {
    setSending(true);
    const body = {
      method: 'sendPoll',
      question: title,
      options,
      image
    };

    dispatch(sendMessage(body, 'messenger')).then(
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

  const handleSetOptions = (text, num) => {
    let newOpts = Object.assign([], options);
    newOpts[num] = text;
    setOptions(newOpts);
  }

  const clear = () => {
    setTitle('');
    setOptions([]);
    setImage();
  }

  return <>
    { showConfirm && <Confirm onConfirm={confirmSend} onCancel={cancelSend} /> }
    { error && <Info error={true} action={() => setError(null)} body={props.intl.formatMessage({ id: 'send-fail' })} /> }
    { info && <Info action={() => setInfo(null)} body={props.intl.formatMessage({ id: 'send-success' })} /> }
    <Row>
      <Col md="6" sm="12">
        <Card>
          <CardBody>
            <div className="message-section">
              <h2 className="message-title"><FormattedMessage id="Question" /></h2>
              <div className="input-control">
              <LimitTextInput
                type="textarea"
                name="title"
                rows="5"
                value={title}
                limit={255}
                action={setTitle}
                placeholder={props.intl.formatMessage({ id: 'question-title' })} />
              </div>
            </div>

            <div className="message-section">
              <h2 className="message-section-title"><FormattedMessage id="Image" /></h2>
              <Dropzone getImage={file => setImage(file)} image={image} />
            </div>

            <div className="message-section section-options">
              <h2 className="message-section-title"><FormattedMessage id="Options" /></h2>
              <Button className="option-action-add" color="link" size="md" onClick={() => options.length < 10 && setOptions(options.concat(''))}>
                <FormattedMessage id="add" /> ({options.length}/10)
              </Button>
              <div className="message-options">
                {
                  options.map((text = '', index) => {
                    return <div className="option">
                        <span className="option-no">#{index + 1}</span>
                        <div className="option-input input-control">
                          <LimitTextInput value={text} action={val => handleSetOptions(val, index)} />
                        </div>
                      </div>
                  })
                }
              </div>
            </div>
            <div className="message-section message-actions has-border-top d-flex justify-content-end">
              <Button
                color="primary"
                outline
                onClick={clear}
                disabled={!title.length && !isOptsValid && !image}
              ><FormattedMessage id="Clear" /></Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button.Ripple
                disabled={sending || !title.length || !isOptsValid}
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
          messages={title}
          options={options}
          image={image}
        />
      </Col>
    </Row>
  </>
}
