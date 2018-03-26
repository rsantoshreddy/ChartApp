import React from "react";
import ReactDOM from "react-dom";
import d3 from "d3";
import Axis from "../atoms/Axis";
import ToolTip from "../atoms/ToolTip";
import Dots from "../atoms/Dots";

const LineChart = React.createClass({
  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    chartId: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      width: 600,
      height: 300,
      chartId: "v1_chart"
    };
  },
  getInitialState: function() {
    return {
      tooltip: { display: false, data: { key: "", value: "" } },
      width: this.props.width
    };
  },
  render: function() {
    const { data } = this.props;

    const margin = { top: 5, right: 50, bottom: 20, left: 50 },
      w = this.state.width - (margin.left + margin.right),
      h = this.props.height - (margin.top + margin.bottom);

    const parseDate = d3.time.format("%m-%d-%Y").parse;

    data.forEach(function(d) {
      d.date = parseDate(d.day);
    });

    const x = d3.time
      .scale()
      .domain(
        d3.extent(data, function(d) {
          return d.date;
        })
      )
      .rangeRound([0, w]);

    const y = d3.scale
      .linear()
      .domain([
        0,
        d3.max(data, function(d) {
          return d.count + 100;
        })
      ])
      .range([h, 0]);

    const yAxis = d3.svg
      .axis()
      .scale(y)
      .orient("left")
      .ticks(5);

    const xAxis = d3.svg
      .axis()
      .scale(x)
      .orient("bottom")
      .tickValues(
        data
          .map(function(d, i) {
            if (i > 0) return d.date;
          })
          .splice(1)
      )
      .ticks(4);

    const line = d3.svg
      .line()
      .x(function(d) {
        return x(d.date);
      })
      .y(function(d) {
        return y(d.count);
      })
      .interpolate("cardinal");

    const transform = "translate(" + margin.left + "," + margin.top + ")";

    return (
      <div>
        <svg
          id={this.props.chartId}
          width={this.state.width}
          height={this.props.height}
        >
          <g transform={transform}>
            <Axis h={h} axis={yAxis} axisType="y" />
            <Axis h={h} axis={xAxis} axisType="x" />
            <path
              className="line shadow"
              d={line(data)}
              strokeLinecap="round"
            />
            <Dots
              data={data}
              x={x}
              y={y}
              showToolTip={this.showToolTip}
              hideToolTip={this.hideToolTip}
            />
            <ToolTip tooltip={this.state.tooltip} />
          </g>
        </svg>
      </div>
    );
  },
  showToolTip: function(e) {
    e.target.setAttribute("fill", "#FFFFFF");

    this.setState({
      tooltip: {
        display: true,
        data: {
          key: e.target.getAttribute("data-key"),
          value: e.target.getAttribute("data-value")
        },
        pos: {
          x: e.target.getAttribute("cx"),
          y: e.target.getAttribute("cy")
        }
      }
    });
  },
  hideToolTip: function(e) {
    e.target.setAttribute("fill", "#7dc7f4");
    this.setState({
      tooltip: { display: false, data: { key: "", value: "" } }
    });
  }
});

export default LineChart;
