import React from "react";
import axios from "axios";
import { endpoints } from '../../../../redux/config';
import "../../../../assets/scss/pages/setting-users.scss";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl"

class CreateEditModal extends React.Component{

  state = {
    newItem: null,
    phoneNumber: null,
    displayName: null,
    role: null,
    isSaving: false,
    isError: false,
    isDone: false,
    message: null,
    isPhoneNumberValid: false
  }

  componentDidMount () {
    const { isCreate, item } = this.props;
    const role = isCreate ? 'viewer' : item.role;
    const displayName = isCreate ? null : item.displayName;
    this.setState({ displayName, role });
  }

  handlePhoneNumber = (event) => {
    const value = event.target.value;
    const match = value.match(/^(\+[0-9]{1,3})(0?[0-9]{2})([0-9]{8})$/g);
    if (match){
      this.setState({
        phoneNumber: event.target.value,
        isPhoneNumberValid: true
      })
    } else {
      this.setState({
        isError: true,
        isPhoneNumberValid: false
      })
    }
  }

  handleDisplayName = (event) => {
    this.setState({ displayName: event.target.value})
  }

  handleInputFocus = () => {
    this.setState({ message: null, isError: false })
  }

  handleRole = (event) => {
    this.setState({ role: event.target.value, message: null})
  }

  handleSaveClick = async () => {
    const {
      phoneNumber,
      displayName,
      role,
      isPhoneNumberValid
    } = this.state;
    const { item, isCreate, user } = this.props;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': user.token
    }
    if ( isCreate ) {
      if (phoneNumber && displayName && role && isPhoneNumberValid) {
        this.setState({ isSaving: true });
        const data = {
          phoneNumber: phoneNumber,
          displayName: displayName,
          role: role
        }
        await axios.post(endpoints.users, data, {
          headers: headers
        }).then((response) => {
          const message = <FormattedMessage id='create-success' />;
          this.setState({
            isSaving: false,
            isDone: true,
            message: message,
            newItem: response.data.data
          });
        }).catch((error) => {
          console.log(error);
          const message = <FormattedMessage id='create-fail' />;
          this.setState({
            isSaving: false,
            isDone: true,
            message: message,
            isError: true
          });
        });

      } else {
        this.setState({ isError: true });
      }
    } else {
      if ((displayName !== null && displayName !== item.displayName) ||
        (role !== null && role !== item.role)) {
        this.setState({ isSaving: true });
        const data = {
          phone: item.phoneNumber,
          phoneNumber: item.phoneNumber,
          displayName: displayName,
          role: role ? role : item.role,
          uid: item.uid
        }
        await axios.post(endpoints.users, data, {
          headers: headers
        }).then((response) => {
          const message = <FormattedMessage id='edit-success' />;
          this.setState({
            isSaving: false,
            isDone: true,
            message: message,
            newItem: data
          });
        }).catch((error) => {
          const message = <FormattedMessage id='edit-fail' />;
          this.setState({
            isSaving: false,
            isDone: true,
            message: message,
            isError: true
          });
        });
      } else {
        const message = <FormattedMessage id='edit-nothing' />;
        this.setState({
          message: message,
          isError: true
        });
      }
    }
  }

  onClose = () => {
    const { newItem } = this.state;
    const { closeModal } = this.props;
    closeModal(newItem);
  }

  render() {
    const {
      isCreate,
      className,
      isOpen,
      item
    } = this.props;

    const {
      isPhoneNumberValid,
      displayName,
      message,
      isError,
      isDone
    } = this.state;
    const roles = {"admin": "Admin", "viewer": "Viewer"}
    const defaultName = isCreate ? null : item.displayName;
    const defaultRole = isCreate ? 'viewer' : item.role;
    const modalTitle = isCreate ? <FormattedMessage id='New User' /> : `Edit user: ${item.phoneNumber}`;
    const ctaLabel = isCreate ? <FormattedMessage id='Create' /> : <FormattedMessage id='Save' />;
    const messageType = isError ? 'alert-danger' : 'alert-success';
    const messageCls = `alert ${messageType}`;

    const phoneCls = isError && !isPhoneNumberValid ? 'is-invalid' : '';
    const nameCls = isError && !displayName ? 'is-invalid' : '';

    return (
      <div>
        <Modal isOpen={isOpen} className={className}>
          <ModalHeader>{modalTitle} </ModalHeader>
          <ModalBody>
            { message && <div
              className={messageCls}
              role="alert">
              { message }
            </div>}
            <Form>
              {isCreate &&
                <FormGroup>
                  <Label for="exampleEmail">
                    <FormattedMessage id='Phone Number' />
                  </Label>
                  <Input
                    name="phoneNumber"
                    placeholder="+85512345678"
                    onChange={this.handlePhoneNumber}
                    onFocus={this.handleInputFocus}
                    className={phoneCls} />
                </FormGroup>
              }
              <FormGroup>
                <Label for="exampleEmail">
                  <FormattedMessage id='Display Name' />
                </Label>
                <Input
                  name="displayName"
                  defaultValue={defaultName}
                  placeholder="Display name"
                  onFocus={this.handleInputFocus}
                  onChange={this.handleDisplayName}
                  className={nameCls} />
              </FormGroup>
              <FormGroup>
                <Label for="role"><FormattedMessage id='Role' /></Label>
                <Input
                  type="select"
                  name="role"
                  defaultValue={defaultRole}
                  onChange={this.handleRole}>
                  { Object.entries(roles).map(([key,value])=>{
                    return <option key={key} value={key}>{value}</option>
                  })}
                </Input>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="outline-info"
              onClick={this.onClose}>
              {isDone ? <FormattedMessage id="Close" /> : <FormattedMessage id="Cancel" /> }
            </Button>
            {!isDone &&
              <Button
                color="primary"
                disabled={this.state.isSaving}
                onClick={this.handleSaveClick}>
                {this.state.isSaving
                  ? <span
                      className="spinner-border spinner-border-sm"
                      role="status" aria-hidden="true">
                    </span>
                  : ctaLabel
                }
            </Button>}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

class ConfirmModal extends React.Component{

  state = { isDeleting: false, isError: false, message: null }

  handleDelete = async () => {
    const { item, user, onDeleteComplete } = this.props;
    this.setState({ isDeleting: true });
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': user.token
    }
    const data = { uid: item.uid }
    await axios.post(endpoints.deleteUser, data, {
      headers: headers
    }).then((response) => {
      onDeleteComplete(item);
    }).catch((error) => {
      console.log(error);
      const message = <FormattedMessage id="delete-fail" />;
      this.setState({
        isDeleting: false,
        message: message,
        isError: true
      });
    });
  }

  render() {
    const { isDeleting, message, isError } = this.state;
    const { isOpen, onCancel } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        className="confirm-modal">
        <ModalHeader>
          <FormattedMessage id="DELETE" />
        </ModalHeader>
        <ModalBody>
          { message &&
            <div className="alert alert-warning" role="alert">
              { message }
            </div>
          }
          <p>
            <FormattedMessage id="delete-confirm-message" />
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="outline-info"
            onClick={() => onCancel()}>
            {isError
              ? <FormattedMessage id="Close" />
              : <FormattedMessage id="Cancel" />
            }
          </Button>
          {!isError &&
            <Button
              color="danger"
              disabled={isDeleting}
              onClick={this.handleDelete}>
              {isDeleting
                ? <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true">
                  </span>
                : <FormattedMessage id="Delete" />
              }
          </Button>}
        </ModalFooter>
      </Modal>
    )
  }
}

const Item = (props) => {
  const { item, onEdit, onDelete } = props;
  return (
    <tr>
      <td>{ item.phoneNumber }</td>
      <td>{ item.displayName }</td>
      <td>{ item.role }</td>
      <td>
        <Button
          color="link"
          onClick={() => onEdit(item)}>
          Edit
        </Button>
        <Button
          color="link"
          onClick={() => onDelete(item)}>
          Delete
        </Button>
      </td>
    </tr>
  );
}

class SettingUsers extends React.Component{

  state = {
    users: [],
    isLoading: true,
    openModal: false,
    isCreate: false,
    selectedItem: null,
    isError: false,
    isConfirmDelete: false,
    message: null
  }

  async componentDidMount () {
    const { user } = this.props;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': user.token
    }
    await axios.get(endpoints.users, {
      headers: headers
    }).then((response) => {
      if (response.data.statusCode === 200) {
        this.setState({
          users: response.data.data,
          isLoading: false
        })
      }
    }).catch((error) => {
      const message = <FormattedMessage id="fetch-users-error" />;
      this.setState({
        message: message,
        isError: true,
        isLoading: false
      });
    });
  }

  handleItemEditClick = (item) => {
    this.setState({
      openModal: true,
      isCreate: false,
      selectedItem: item
    });
  }

  handleItemDelete = (item) => {
    this.setState({
      isConfirmDelete: true,
      selectedItem: item
    });
  }

  handleCreateUser = () => {
    this.setState({
      openModal: true,
      isCreate: true,
      selectedItem: null
    });
  }

  _getIndexByUID = (users, uid) => {
    let foundIndex = -1;
    for (var i = 0; i < users.length; i++) {
      if (users[i].uid === uid) {
        foundIndex = i;
        break;
      }
    }
    return foundIndex;
  }

  closeModal = (item=null) => {
    const { users } = this.state;
    let usersCopy = users;
    if (item) {
      const foundIndex = this._getIndexByUID(users, item.uid);
      if (foundIndex !== -1) {
        usersCopy[foundIndex] = item;
      } else {
        usersCopy.unshift(item)
      }
      this.setState({ users:usersCopy });
    }
    this.setState({
      openModal: false,
      isCreate: false,
      selectedItem: null
    });
  }

  handleConfirmCancel = () => {
    this.setState({
      isConfirmDelete: false,
      selectedItem: null
    });
  }

  handleDeleteComplete = (item) => {
    const { users } = this.state;
    const foundIndex = this._getIndexByUID(users, item.uid);
    let usersCopy = users;
    if (foundIndex !== -1) usersCopy.splice(foundIndex, 1);
    this.setState({
      isConfirmDelete: false,
      selectedItem: null,
      users: usersCopy
    });
  }

  render() {
    const {
      isLoading,
      users,
      openModal,
      selectedItem,
      isCreate,
      message,
      isError,
      isConfirmDelete
    } = this.state;
    const { user } = this.props;
    const renderLoading = () => {
      return (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only"><FormattedMessage id="Loading..." /></span>
          </div>
        </div>
      )
    };
    const renderData = () => {
      return (
        <div>
          { isError && message
            ? <div
                className="alert alert-warning"
                role="alert">{ message }</div>
            :<div>
            <div className="content-header">
              <Button
                color="primary"
                onClick={this.handleCreateUser}>
                <FormattedMessage id="new-user" />
              </Button>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">
                    <FormattedMessage id="Phone Number" />
                  </th>
                  <th scope="col">
                    <FormattedMessage id="Display Name" />
                  </th>
                  <th scope="col">
                    <FormattedMessage id="Role" />
                  </th>
                  <th scope="col">
                    <FormattedMessage id="Actions" />
                  </th>
                </tr>
              </thead>
              <tbody>
              { users.map( (user, idx) => {
                return(
                  <Item
                    key={idx}
                    item={user}
                    onEdit={this.handleItemEditClick}
                    onDelete={this.handleItemDelete} />
                )
              })}
              </tbody>
            </table>
          {openModal && <CreateEditModal
            isCreate={isCreate}
            user={user}
            isOpen={openModal}
            item={ selectedItem }
            closeModal={ this.closeModal }
            className="editModal" />}
          {isConfirmDelete && <ConfirmModal
            user={user}
            isOpen={isConfirmDelete}
            item={ selectedItem }
            onCancel={this.handleConfirmCancel}
            onDeleteComplete={this.handleDeleteComplete} /> }
        </div>}
      </div>
      )
    }
    return isLoading ? renderLoading() : renderData();
  }
}

const mapStateToProps = function(state) {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(SettingUsers);
