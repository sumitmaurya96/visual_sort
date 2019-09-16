import React, { Component } from "react";

class Strip extends Component {
  render() {
    return (
      <div>
        <div
          style={{
            width: "30px",
            height: "20px",
            margin: "5px"
          }}
        >
          <p className="text-center text-dark" style={{ fontSize: "12px" }}>
            {this.props.value}
          </p>
        </div>
        <div
          style={{
            width: "30px",
            height: `${this.props.style.height}px`,
            backgroundColor: `${this.props.style.backgroundColor}`,
            margin: "5px"
          }}
        ></div>
      </div>
    );
  }
}

export default Strip;
