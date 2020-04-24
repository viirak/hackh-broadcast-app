import React from "react"
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap"
import * as Icon from "react-feather"
import { history } from "../../../history"
import { logout } from '../../../redux/actions/auth/customAuth';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from "react-intl"
import LanguageDropdown from './language';


const UserDropdown = props => {
  const dispatch = useDispatch();

  return (
    <DropdownMenu right>
      <DropdownItem
        tag="a"
        href="#"
        onClick={() => dispatch(logout()).then(() => history.push('/pages/login'))}
      >
        <Icon.Power size={14} className="mr-50" />
        <span className="align-middle"><FormattedMessage id="Log Out" /></span>
      </DropdownItem>
    </DropdownMenu>
  )
}

class NavbarUser extends React.PureComponent {
  state = {
    navbarSearch: false,
    langDropdown: false,
    suggestions: []
  }

  render() {
    return (
      <ul className="nav navbar-nav navbar-nav-user float-right">
        <LanguageDropdown />
        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
          <DropdownToggle tag="a" className="nav-link dropdown-user-link">
            <div className="user-nav d-sm-flex d-none">
              <span className="text-bold-600">
                {this.props.userName}
              </span>
              <span className="user-status">{ this.props.userRole }</span>
            </div>
            <span data-tour="user">
              <img
                src={this.props.userImg}
                className="round"
                height="40"
                width="40"
                alt="avatar"
              />
            </span>
          </DropdownToggle>
          <UserDropdown {...this.props} />
        </UncontrolledDropdown>
      </ul>
    )
  }
}
export default NavbarUser
