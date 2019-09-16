import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Sort from "./components/sort/sort";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import Algorithm from "./components/algorithms";

class App extends Component {
  constructor(props) {
    super(props);
    let arr = [10, 50, 3, 1, 90];
    for (let i = 0; i < 25; i++) arr[i] = Math.floor(Math.random() * 100 + 1);
    this.state = {
      arr: [...arr],
      index: 0,
      ref: this
    };
  }

  submitInput = () => {
    const algorithms = new Algorithm();
    const arr = algorithms.validateArray(this.input.value);
    if (arr === false) alert("Please Enter Valid Input ");
    else {
      if (arr.length > 25) alert("Number Of elements must be 25 or less");
      else this.setState({ arr });
    }
  };

  handleNavbarClick = name => {
    let arr = [...this.state.arr];
    const algorithm = new Algorithm();
    if (name === "Bubble") algorithm.bubbleSort(arr, this);
    else if (name === "Insertion") algorithm.insertionSort(arr, this);
    else if (name === "Selection") algorithm.selectionSort(arr, this);
    else if (name === "Quick") algorithm.quickSort(arr, this);
    else if (name === "Merge") algorithm.mergeSort(arr, this);
    else if (name === "Submit") this.submitInput();
  };

  render() {
    return (
      <React.Fragment>
        <Navbar
          OnClick={this.handleNavbarClick}
          setInput={input => {
            this.input = input;
          }}
        />
        <div
          style={{ width: "100%", height: "195px" }}
          className="bg-white"
        ></div>
        <Sort state={this.state} />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
