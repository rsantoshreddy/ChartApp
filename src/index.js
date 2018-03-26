import React from "react";
import { render } from "react-dom";
import LineChart from "./components/line-chart/LineChart";

export default class Page extends React.Component {
  render() {
    let LineChartObj = {
      data: [
        { day: "02-11-2016", count: 180 },
        { day: "02-12-2016", count: 250 },
        { day: "02-13-2016", count: 150 },
        { day: "02-14-2016", count: 496 },
        { day: "02-15-2016", count: 140 },
        { day: "02-16-2016", count: 380 },
        { day: "02-17-2016", count: 100 },
        { day: "02-18-2016", count: 150 }
      ]
    };
    return (
      <div>
        <LineChart {...LineChartObj} />
      </div>
    );
  }
}

render(<Page />, document.getElementById("app"));
