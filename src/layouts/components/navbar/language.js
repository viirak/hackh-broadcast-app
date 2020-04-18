import React, { useState } from "react"
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap"
import ReactCountryFlag from "react-country-flag"
import { IntlContext } from "../../../utility/context/Internationalization"

export default props => {
  const [langDropdown, setLangDropdown] = useState(false)

  return (
    <IntlContext.Consumer>
      {context => {
        let langArr = {
          "en" : "English",
          "kh" : "Khmer"
        }
        return (
          <Dropdown
            tag="li"
            className="dropdown-language nav-item"
            isOpen={langDropdown}
            toggle={() => setLangDropdown(!langDropdown)}
            data-tour="language"
          >
            <DropdownToggle
              tag="a"
              className="nav-link"
            >
              <ReactCountryFlag
              className="country-flag"
                countryCode={
                  context.state.locale === "en"
                    ? "us"
                    : context.state.locale
                }
                svg
              />
              <span className="d-sm-inline-block d-none text-capitalize align-middle ml-50">
                {langArr[context.state.locale]}
              </span>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem
                tag="a"
                onClick={e => context.switchLanguage("en")}
              >
                <ReactCountryFlag className="country-flag" countryCode="us" svg />
                <span className="ml-1">English</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                onClick={e => context.switchLanguage("kh")}
              >
                <ReactCountryFlag className="country-flag" countryCode="kh" svg />
                <span className="ml-1">ភាសាខ្មែរ</span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )
      }}
    </IntlContext.Consumer>
  )
}
