import React, { useState, useEffect } from "react";
import {BreadcrumbItem, Breadcrumb} from "reactstrap";
import { Link } from "react-router-dom";
import Breadcrumbs from '../../../components/@vuexy/breadCrumbs/BreadCrumb';


export default props => {
  return <>
    <Breadcrumbs
      breadCrumbParent="Telegram"
      breadCrumbActive="Poll / Survey"
    />
    <div>Poll</div>
  </>
}
