import React from "react";
import ReactDOM from "react-dom";
import d3 from "d3";

class Axis extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate() {
    this.renderAxis();
  }

  componentDidMount() {
    this.renderAxis();
  }

  renderAxis() {
    const node = ReactDOM.findDOMNode(this);
    d3.select(node).call(this.props.axis);
  }

  render() {
    const translate = "translate(0," + this.props.h + ")";
    return (
      <g
        className="axis"
        transform={this.props.axisType == "x" ? translate : ""}
      />
    );
  }
}

Axis.propTypes = {
  h: React.PropTypes.number,
  axis: React.PropTypes.func,
  axisType: React.PropTypes.oneOf(["x", "y"])
};

export default Axis;
