import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

class Footer extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <footer className="page-footer font-small blue pt-4 text-white bg-dark">
          <div className="container-fluid text-center text-md-left">
            <div className="row">
              <hr className="clearfix w-100 d-md-none pb-3" />
              <div className="col-md-3 mb-md-0 mb-3">
                <button className="text-uppercase btn btn-md text-white">
                  About
                </button>
              </div>
              <div className="col-md-3 mb-md-0 mb-3">
                <button className="text-uppercase btn btn-md text-white">
                  Teams
                </button>
              </div>
              <div className="footer-copyright text-center py-3">
                © 2018 Copyright:
                <a href="https://wavestudy.tech/"> wavestudy.tech</a>
              </div>
            </div>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default Footer;
