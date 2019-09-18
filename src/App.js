import React, { Component } from "react";
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
      ref: this,
      isInputValid: false,
      isInput: false,
      isSorting: false,
      breakSort: false
    };
    this.backupArray = [...arr];
  }

  validateInputOnChange = input => {
    //Set Input in this.input
    this.input = input;

    //validation on any change in inputboxs Also set isInput for count of input
    const algorithms = new Algorithm();
    const arr = algorithms.validateInput(this.input.value);
    if (arr === false) {
      this.setState({ isInputValid: false, isInput: true });
    } else {
      if (arr.length > 25)
        this.setState({ isInputValid: false, isInput: true });
      else {
        this.arr = arr;
        this.setState({ arr, isInputValid: true, isInput: true });
        this.backupArray = [...arr];
      }
    }
  };

  handleNavbarClick = name => {
    let arr = [...this.state.arr];
    const algorithm = new Algorithm();
    if (name === "Bubble") {
      algorithm.bubbleSort(arr, this);
    } else if (name === "Insertion") {
      algorithm.insertionSort(arr, this);
    } else if (name === "Selection") {
      algorithm.selectionSort(arr, this);
    } else if (name === "Quick") {
      algorithm.quickSort(arr, this);
    } else if (name === "Merge") {
      algorithm.mergeSort(arr, this);
    } else if (name === "Submit") {
      let arr = [...this.backupArray];
      this.setState({ arr });
    } else if (name === "Random") {
      let arr = [];
      for (let i = 0; i < 25; i++) arr[i] = Math.floor(Math.random() * 100 + 1);
      this.setState({ arr });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Navbar
          state={this.state}
          OnClick={this.handleNavbarClick}
          setInput={input => {
            this.validateInputOnChange(input);
          }}
        />
        <div
          style={{ width: "100%", height: "100px" }}
          className="bg-white"
        ></div>
        <Sort state={this.state} />
        <div
          style={{ width: "100%", height: "100px" }}
          className="bg-white"
        ></div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
