import React, { useState } from "react"
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Input
} from "reactstrap"
import axios from "axios"
import * as Icon from "react-feather"
import { history } from "../../../history"
import { logout, updateUser } from '../../../redux/actions/auth/customAuth';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from "react-intl"
import LanguageDropdown from './language';


const UserDropdown = props => {
  const dispatch = useDispatch();
  const { auth: { user: { claims: { name = '' } } } } = useSelector(store => store);
  const [newName, setNewName] = useState(name);

  return (
    <DropdownMenu right>
      <DropdownItem header style={{ paddingLeft: 0 }}><FormattedMessage id="Update Name" /></DropdownItem>
      <Input
        type="text"
        value={newName}
        onChange={e => setNewName(e.target.value)}
        onBlur={() => newName.length && dispatch(updateUser({ displayName: newName }))}
      />

      <DropdownItem divider/>

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

  componentDidMount() {
    axios.get("/api/main-search/data").then(({ data }) => {
      this.setState({ suggestions: data.searchResult })
    })
  }

  handleNavbarSearch = () => {
    this.setState({
      navbarSearch: !this.state.navbarSearch
    })
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
