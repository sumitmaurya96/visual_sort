import React, { Component } from "react";
import Strip from "./strip";

class Sort extends Component {
  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            height: "325px",
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
            if (index === this.props.state.color.indexA) {
              color = "green";
            }
            if (index === this.props.state.color.indexB) {
              color = "green";
            } else if (
              this.props.state.color.indexRangeOfSorted.range > 0 &&
              index <= this.props.state.color.indexRangeOfSorted.to &&
              index >= this.props.state.color.indexRangeOfSorted.from
            ) {
              color = "red";
            }
            return (
              <Strip
                value={stripLength}
                style={{
                  height: height,
                  width: width,
                  backgroundColor: color
                }}
                key={index}
                noOfStrips={this.props.state.arr.length}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Sort;
