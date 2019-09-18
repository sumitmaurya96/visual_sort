import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { isAlgorithmOpen: false, isNavbarOpen: false };
  }

  getClassOfInputbox = () => {
    let classname = "form-control ";
    if (this.props.state.isInput) {
      if (this.props.state.isInputValid && this.props.state.arr.length > 0)
        classname += "is-valid";
      else classname += "is-invalid";
    }
    return classname;
  };

  toggleNavDropdown = () => {
    let isNavbarOpen = this.state.isNavbarOpen;
    if (isNavbarOpen) isNavbarOpen = false;
    else isNavbarOpen = true;
    this.setState({ isNavbarOpen });
  };

  toggleAlgoDropdown = () => {
    let isAlgorithmOpen = this.state.isAlgorithmOpen;
    if (isAlgorithmOpen) isAlgorithmOpen = false;
    else isAlgorithmOpen = true;
    this.setState({ isAlgorithmOpen });
  };

  render() {
    const classOfInputbox = this.getClassOfInputbox();
    const dropdownAlgorithmMenu = `dropdown-menu${
      this.state.isAlgorithmOpen ? "show" : ""
    }`;

    const dropdownNavbarMenu = `${
      this.state.isNavbarOpen
        ? "expand navbar-expand"
        : "collapse navbar-collapse"
    }`;

    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-warning">
          <div className="container-fluid" id="navfluid">
            <div className="navbar-header">
              <button
                onClick={this.toggleNavDropdown}
                type="button"
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            <div className={dropdownNavbarMenu} id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <button
                    className="btn btn-sm btn-danger m-2"
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    Home <span className="sr-only">(current)</span>
                  </button>
                </li>
                <li className="nav-item dropdown">
                  <button
                    onClick={this.toggleAlgoDropdown}
                    className="btn btn-danger m-2 ml-3 btn-sm dropdown-toggle"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Sort Algorithms
                  </button>
                  <div
                    className={dropdownAlgorithmMenu}
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
                  <div className="form-item">
                    <span className="badge badge-dark">
                      Input Numbers:{" "}
                      <span
                        className={`badge badge-${
                          this.props.state.isInput
                            ? `${
                                this.props.state.arr.length > 0
                                  ? "success"
                                  : "danger"
                              }`
                            : "danger"
                        }`}
                      >
                        {this.props.state.isInput
                          ? this.props.state.arr.length
                          : 0}
                      </span>
                    </span>
                    <textarea
                      ref={input => (this.input = input)}
                      onInput={() => {
                        this.props.setInput(this.input);
                      }}
                      className={classOfInputbox}
                      id="Input"
                      type="text"
                      rows="2"
                      cols="40"
                      placeholder="Example Input: 124 45 89 90"
                    />
                    <small className="form-text text-muted">
                      Your input must be 1-25 numbers long, contain space
                      seperated numbers only.
                    </small>
                    <button
                      className="btn btn-sm btn-dark m-4"
                      onClick={() => {
                        this.props.OnClick("Submit");
                      }}
                    >
                      Reset
                    </button>
                    <button
                      className="btn btn-sm btn-dark m-4"
                      onClick={() => {
                        this.props.OnClick("Random");
                      }}
                    >
                      Random
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default Navbar;
