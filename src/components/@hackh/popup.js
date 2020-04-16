import React from "react"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap"

export const Info = ({ action, error = false, body }) => {
  return <Modal
      isOpen={true}
      toggle={action}
      className="modal-dialog-centered modal-sm"
    >
      <ModalHeader toggle={action} className={!error ? 'bg-primary' : 'bg-danger'}>
        {error ? 'Error' : 'Info'}
      </ModalHeader>
      <ModalBody>
      {body.data && body.data.message || body.message || body}
      </ModalBody>
      <ModalFooter>
        <Button color={error ? 'danger' : 'primary'} onClick={action}>
          Close
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
        Confirmation
      </ModalHeader>
      <ModalBody>
        Do you want to send this message?
      </ModalBody>
      <ModalFooter>
        <Button color={'primary'} outline onClick={onCancel}>
          Cancel
        </Button>{" "}
        <Button color={'primary'} onClick={onConfirm}>
          Send
        </Button>
      </ModalFooter>
    </Modal>
}
