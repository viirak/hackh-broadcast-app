import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {Row, Col, Input, Label, Button, Modal,
ModalHeader,
ModalBody,
ModalFooter, Card, CardBody} from "reactstrap";
import Breadcrumbs from '../../../../components/@vuexy/breadCrumbs/BreadCrumb';
import { Link } from "react-router-dom";
import PhoneSimulator from '../../../../components/@hackh/PhoneSimulator/phoneSimulator';

import { sendMessage } from '../../../../redux/actions/telegram';


export default props => {
  const [content, setContent] = useState('');
  const [sending, setSending] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch();

  const confirmSend = () => {
    setSending(true);
    dispatch(sendMessage(content)).then(
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

  return <>
    { showConfirm && <Confirm /> }
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
