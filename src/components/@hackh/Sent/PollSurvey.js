import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap"
import { Send  } from "react-feather"
import moment from "moment";
import Chart from "react-apexcharts"
import {
  Monitor,
  ArrowUp,
  Smartphone,
  Tablet,
  ArrowDown,
  ChevronDown
} from "react-feather"

class PollSurvey extends React.Component {
    render(){
        return(
        <Card>
          <CardHeader>
            <Send size={32}/>
            <CardTitle>Poll/Survey</CardTitle>
            <span>{moment().format("hh:mm DD MMMM YYYY")}</span>
          </CardHeader>
          <CardBody>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis mollis quam. Proin ut condimentum dolor. Proin ornare euismod leo, quis consequat est vulputate sit amet. Quisque sollicitudin libero in dolor aliquet convallis. Curabitur lorem nulla, tincidunt vel ultrices ut, commodo sed libero. Vestibulum volutpat, massa sed vulputate cursus, quam magna tempor nunc, mattis rhoncus diam mi non erat. Aliquam posuere tempor dolor. Mauris vitae elit sed tortor gravida ullamcorper. Donec ultricies dui vel ligula viverra pulvinar. Ut lacinia malesuada ante non aliquam.</p>
          </CardBody>
        </Card>
        );
    }
};

export default PollSurvey;