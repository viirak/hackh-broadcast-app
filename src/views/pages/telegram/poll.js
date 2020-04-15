import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {Row, Col, Input, Label, Button, CustomInput, Modal,
ModalHeader,
ModalBody,
ModalFooter, Card, CardBody} from "reactstrap";
import Breadcrumbs from '../../../components/@vuexy/breadCrumbs/BreadCrumb';
import { Link } from "react-router-dom";
import PhoneSimulator from '../../../components/@hackh/PhoneSimulator/phoneSimulator';

import { sendMessage } from '../../../redux/actions/telegram'


export default props => {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState([]);
  const [sending, setSending] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch();

  const confirmSend = () => {
    setSending(true);
    const body = {
      method: 'sendPoll',
      question: title,
      options
    };

    dispatch(sendMessage(body)).then(
      res => {
        console.log(res)
        setSending(false);
      },
      err => {
        console.log(err);
        setSending(false);
      }
    );
    setShowConfirm(false);
  }
  const cancelSend = () => setShowConfirm(false);

  const Confirm = () => {
    return <Modal
        isOpen={true}
        className="modal-dialog-centered modal-md"
      >
        <ModalHeader className={'bg-primary'}>
          Confirmation
        </ModalHeader>
        <ModalBody>
        Do you want to send this message?
        </ModalBody>
        <ModalFooter>
          <Button color={'primary'} outline onClick={cancelSend}>
            Cancel
          </Button>{" "}
          <Button color={'primary'} onClick={confirmSend}>
            Send
          </Button>
        </ModalFooter>
      </Modal>
  }

  const handleSetOptions = (text, num) => {
    let newOpts = Object.assign([], options);
    newOpts[num] = text;
    setOptions(newOpts);
  }

  return <>
    { showConfirm && <Confirm /> }
    <Breadcrumbs
      breadCrumbParent="Telegram"
      breadCrumbActive="Poll / Survey"
    />
    <Row>
      <Col md="6" sm="12">
        <Card>
          <CardBody>
            <h2>Message Title</h2>
            <Input
              type="textarea"
              name="title"
              rows="2"
              value={title}
              onChange={e => title.length < 255 && setTitle(e.target.value)}
              placeholder="Message title here"
            />
            <small
              className={`counter-value float-right ${
                title.length > 200 ? "bg-danger" : ""
              }`}
            >
              {`${title.length}/255`}
            </small>

            <br /><br />

            {/* <Label>Image</Label>
            <CustomInput
              type="file"
              id="image"
              name="image"
              onChange={console.log}
            />

            <br /><br /> */}

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h2>Options</h2>
              <Button color="link" size="md" onClick={() => options.length < 10 && setOptions(options.concat(''))}> +Add({options.length}/10)</Button>
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
            onClick={() => (setTitle(''), setOptions([]))}
            disabled={!title.length && !options.length}
          >Clear</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button.Ripple
            disabled={sending || !title.length || !options.length}
            color="primary"
            onClick={() => setShowConfirm(true)}
          >Send</Button.Ripple>
        </div>
      </Col>
      <Col md="6" sm="12">
        {/* <PhoneSimulator
          className="flex-grow p-4"
          type={'telegram'}
          messages={title}
        /> */}
      </Col>
    </Row>
  </>
}
