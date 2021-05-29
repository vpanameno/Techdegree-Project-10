import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
// import NotFound from "./components/NotFound";
import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
// import UserSignOut from "./components/UserSignOut";
// import Authenticated from "./components/Authenticated";
//
import withContext from "./Context";
// import PrivateRoute from "./PrivateRoute";
const UserSignUpWithContext = withContext(UserSignUp); //this connects the user sign up component to context -> usersignup is now a consuming component that's subscribed to all context changes
const UserSignInWithContext = withContext(UserSignIn);
// const HeaderWithContext = withContext(Header);
const CreateCourseWithContext = withContext(CreateCourse);
// const AuthWithContext = withContext(Authenticated);
// const UserSignOutWithContext = withContext(UserSignOut);

export default () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route exact path="/courses" component={Courses} />
        <Route
          exact
          path="/courses/create"
          component={CreateCourseWithContext}
        />
        <Route exact path="/courses/:id" component={CourseDetail} />
        <Route exact path="/courses/:id/update" component={UpdateCourse} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
      </Switch>
    </div>
  </Router>
);
