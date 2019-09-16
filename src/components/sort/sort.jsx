import React, { Component } from "react";
import Strip from "./strip";

class Sort extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "white", height: "500px" }}>
        <div
          style={{
            display: "flex",
            backgroundColor: "white",
            alignItems: "flex-end",
            margin: "0px auto",
            width: `${this.props.state.arr.length * 3}%`
          }}
        >
          {this.props.state.arr.map((stripLength, index) => {
            let height =
              (stripLength * 300) / Math.max.apply(null, this.props.state.arr);
            let width =
              this.props.state.arr.length <= 5
                ? 200
                : 1000 / this.props.state.arr.length;

            let color = "#4B65BA";
            if (index === this.props.state.index) color = "orange";

            return (
              <Strip
                value={stripLength}
                style={{
                  height: height,
                  width: width,
                  backgroundColor: color
                }}
                key={index}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Sort;
