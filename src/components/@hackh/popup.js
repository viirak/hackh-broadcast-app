import React from "react"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap"
import { FormattedMessage } from 'react-intl'


export const Info = ({ action, error = false, body }) => {
  return <Modal
      isOpen={true}
      toggle={action}
      className="modal-dialog-centered modal-sm"
    >
      <ModalHeader toggle={action} className={!error ? 'bg-primary' : 'bg-danger'}>
        <FormattedMessage id={error ? 'Error' : 'Info'} />
      </ModalHeader>
      <ModalBody>
        {body.data && body.data.message || body.message || body}
      </ModalBody>
      <ModalFooter>
        <Button color={error ? 'danger' : 'primary'} onClick={action}>
          <FormattedMessage id={'Close'} />
        </Button>{" "}
      </ModalFooter>
    </Modal>
}

export const Confirm = ({ onConfirm, onCancel }) => {
  return <Modal
      isOpen={true}
      className="modal-dialog-centered modal-md"
    >
      <ModalHeader className={'bg-primary'}>
        <FormattedMessage id={'Confirmation'} />
      </ModalHeader>
      <ModalBody>
        <FormattedMessage id={'confirmation-body'} />
      </ModalBody>
      <ModalFooter>
        <Button color={'primary'} outline onClick={onCancel}>
          <FormattedMessage id={'Cancel'} />
        </Button>{" "}
        <Button color={'primary'} onClick={onConfirm}>
          <FormattedMessage id={'Send'} />
        </Button>
      </ModalFooter>
    </Modal>
}
