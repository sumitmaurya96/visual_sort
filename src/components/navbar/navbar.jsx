import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", isOpen: false };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    //alert("The value is: " + this.input.value);
    event.preventDefault();
  }

  toggleDropdown = () => {
    let isOpen = this.state.isOpen;
    if (isOpen) isOpen = false;
    else isOpen = true;
    this.setState({ isOpen });
  };

  render() {
    const dropdownMenu = `dropdown-menu${this.state.isOpen ? "show" : ""}`;
    return (
      <React.Fragment>
        <nav
          className="navbar navbar-expand-lg navbar-light bg-warning"
          style={{
            width: "100%",
            position: "absolute"
          }}
        >
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <button className="btn btn-sm btn-danger m-2">
                  Home <span className="sr-only">(current)</span>
                </button>
              </li>
              <li className="nav-item dropdown">
                <button
                  onClick={this.toggleDropdown}
                  className="btn btn-danger m-2 ml-3 btn-sm dropdown-toggle"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Sort Algorithms
                </button>
                <div
                  className={dropdownMenu}
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <button
                    className="dropdown-item"
                    onClick={() => this.props.OnClick("Bubble")}
                  >
                    Bubble Sort
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => this.props.OnClick("Selection")}
                  >
                    Selection Sort
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => this.props.OnClick("Insertion")}
                  >
                    Insertion Sort
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => this.props.OnClick("Quick")}
                  >
                    Quick Sort
                  </button>
                </div>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <div>
                  <div className="form-item">
                    Input Numbers:
                    <textarea
                      ref={input => {
                        this.props.setInput(input);
                      }}
                      className="form-control"
                      id="Input"
                      type="text"
                      rows="2"
                      cols="40"
                      placeholder="25 or less Space seperated numbers"
                    ></textarea>
                  </div>
                  <button
                    onClick={() => {
                      this.props.OnClick("Submit");
                    }}
                    className="btn btn-sm btn-dark m-2"
                  >
                    Input
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default Navbar;
