import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {Row, Col, Input, Label, Button, CustomInput, Card, CardBody} from "reactstrap";
import Breadcrumbs from '../../../../components/@vuexy/breadCrumbs/BreadCrumb';
import Dropzone from '../../../../components/@vuexy/dropzone';

import PhoneSimulator from '../../../../components/@hackh/PhoneSimulator/phoneSimulator';

import { sendMessage } from '../../../../redux/actions/social'
import { Confirm, Info } from '../../../../components/@hackh/popup';
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

    dispatch(sendMessage(body)).then(
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
    { error && <Info error={true} action={() => setError(null)} body={'Failed to send the message'} /> }
    { info && <Info action={() => setInfo(null)} body={'Successfully sent the message'} /> }
    <Breadcrumbs
      breadCrumbParent="Telegram"
      breadCrumbActive="Poll / Survey"
    />
    <Row>
      <Col md="6" sm="12">
        <Card>
          <CardBody>
            <h2><FormattedMessage id="Message Question" /></h2>
            <Input
              type="textarea"
              name="title"
              rows="2"
              value={title}
              onChange={e => title.length < 255 && setTitle(e.target.value)}
              placeholder={props.intl.formatMessage({ id: 'question-title' })}
            />
            <small
              className={`counter-value float-right ${
                title.length > 200 ? "bg-danger" : ""
              }`}
            >
              {`${title.length}/255`}
            </small>

            <br /><br />

            <h2><FormattedMessage id="Image" /></h2>
            <Dropzone getImage={file => setImage(file)} image={image} />

            <br /><br />

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h2><FormattedMessage id="Options" /></h2>
              <Button color="link" size="md" onClick={() => options.length < 10 && setOptions(options.concat(''))}>
                 <FormattedMessage id="add" /> ({options.length}/10)
               </Button>
            </div>
            {
              options.map((text = '', index) => {
                return <Row className="mb-2">
                    <Col sm="2"><h1>#{index + 1}</h1></Col>
                    <Col sm="10">
                      <Input type="text" value={text} onChange={e => text.length < 100 && handleSetOptions(e.target.value, index)} />
                      <small
                        className={`counter-value float-right ${
                          text.length > 80 ? "bg-danger" : ""
                        }`}
                      >
                        {`${text.length}/100`}
                      </small>
                    </Col>
                  </Row>
              })
            }
          </CardBody>
        </Card>
        <div className="d-flex justify-content-end">
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
      </Col>
      <Col md="6" sm="12">
        <PhoneSimulator
          className="flex-grow p-4"
          type={'telegram'}
          messages={title}
          options={options}
          image={image}
        />
      </Col>
    </Row>
  </>
}
