import React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.PureComponent {
  render() {
    // const { context } = this.props;
    // const authUser = context.authenticatedUser;
    return (
      <header>
        <div class="wrap header--flex">
          <h1 class="header--logo">
            <a href="/courses/">Courses</a>
          </h1>
          <nav>
            <ul class="header--signedout">
              <li>
                <a href="/signup">Sign Up</a>
              </li>
              <li>
                <a href="/signin">Sign In</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}
