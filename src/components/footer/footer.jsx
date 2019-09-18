import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <footer className="page-footer font-small blue pt-4 text-white bg-dark">
          <div className="container-fluid text-center text-md-left">
            <div className="footer-copyright text-center py-3">
              © 2018 Copyright:
              <a href="https://wavestudy.tech/"> wavestudy.tech</a>
            </div>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default Footer;
