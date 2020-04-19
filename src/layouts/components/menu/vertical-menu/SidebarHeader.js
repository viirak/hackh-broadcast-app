import React, { Component } from "react"
import { NavLink } from "react-router-dom"
import classnames from "classnames"
class SidebarHeader extends Component {
  render() {
    let {
      menuShadow
    } = this.props
    return (
      <div className="navbar-header">
        <ul className="nav navbar-nav flex-row">
          <li className="nav-item mr-auto">
            <NavLink to="/" className="navbar-brand">
              <div className="brand-logo" />
              <h2 className="brand-text mb-0">Covid-19 <span className="sub">Broadcasting</span></h2>
            </NavLink>
          </li>
        </ul>
        <div
          className={classnames("shadow-bottom", {
            "d-none": menuShadow === false
          })}
        />
      </div>
    )
  }
}

export default SidebarHeader
