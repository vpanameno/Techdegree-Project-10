import React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.PureComponent {
  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    return (
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo">
            <a href="/">Courses</a>
          </h1>
          <nav>
            <ul className="header--signedout">
              {authUser ? (
                <React.Fragment>
                  <span>Welcome, {authUser.firstName}!</span>
                  <br />
                  <Link to="/signout">Sign Out</Link>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Link className="signup" to="/signup">
                    Sign Up
                  </Link>
                  <br />
                  <Link className="signin" to="/signin">
                    Sign In
                  </Link>
                </React.Fragment>
              )}
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}
