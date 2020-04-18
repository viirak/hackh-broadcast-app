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
import Chart from "react-apexcharts"
import _ from "lodash";
import {
  Monitor,
  ArrowUp,
  Smartphone,
  Tablet,
  ArrowDown,
  ChevronDown,
  Circle
} from "react-feather"
import { FormattedMessage } from "react-intl";

class PollResultChart extends React.Component {
  renderChart = () => {
    return this.props.pollResults.map( poll => (
        <div className="chart-info d-flex justify-content-between mb-1 mt-2">
          <div className="series-info d-flex align-items-center">
            <Circle color={poll.color} size={32} />
            <span className="text-bold-600 mx-50">{poll.text}</span>
            <span className="align-middle">{poll.percentage}%</span>
          </div>
        </div>
      ));
  }
  render() {
    const data = {
      options: {
        chart: {
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: { show: false },
        comparedResult: [2, -3, 8],
        labels: this.props.pollResults.map(poll => poll.text),
        stroke: { width: 0 },
        colors: this.props.pollResults.map(poll => poll.color),
      },
      series: this.props.pollResults.map( poll => Number(poll.percentage))
    }
    return (
      <Card>
        <CardHeader>
          <CardTitle><FormattedMessage id="Poll Result" /></CardTitle>
        </CardHeader>
        <CardBody className="pt-0">
          <Chart
              options={data.options}
              series={data.series}
              type="donut"
              height={290}
            />
          {this.renderChart()}
        </CardBody>
      </Card>
    )
  }
}
export default PollResultChart;

