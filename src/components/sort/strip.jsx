import React, { Component } from "react";

class Strip extends Component {
  render() {
    return (
      <div
        style={{
          width: `${100 / this.props.noOfStrips}%`
        }}
      >
        <div
          style={{
            width: "80%",
            height: "20px",
            margin: "0px auto"
          }}
        >
          <p className="text-center text-dark" style={{ fontSize: "10px" }}>
            {this.props.value}
          </p>
        </div>
        <div
          style={{
            width: "80%",
            height: `${this.props.style.height}px`,
            backgroundColor: `${this.props.style.backgroundColor}`,
            margin: "0px auto"
          }}
        ></div>
      </div>
    );
  }
}

export default Strip;
