import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody
} from "reactstrap"
import Chart from "react-apexcharts"
import _ from "lodash";
import {
  Circle
} from "react-feather"
import { FormattedMessage } from "react-intl";

class PollResultChart extends React.Component {
  renderChart = () => {
    return this.props.pollResults.map( poll => (
      <li className="option-list-item">
        <span className="icon" style={{ background:poll.color }}></span>
        <span className="text">{poll.text}</span>
        <span className="number">{poll.percentage}%</span>
      </li>
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
          <ul className="chart-option-list">
          {this.renderChart()}
          </ul>
        </CardBody>
      </Card>
    )
  }
}
export default PollResultChart;
