import React, { Component } from "react";
import Form from "./Form";

export default class CreateCourse extends Component {
  state = {
    courseTitle: "",
    courseDescription: "",
    estimatedTime: "",
    materialsNeeded: "",
    errors: [],
    user: this.props.context.authenticateUser
  };

  componentDidMount() {
    console.log(this.state.user);
  }

  render() {
    const {
      courseTitle,
      courseDescription,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state;

    return (
      <div className="wrap">
        <h2>Create Course</h2>
        <div className="main--flex">
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
            elements={() => (
              <React.Fragment>
                <label for="courseTitle">Course Title</label>
                <input
                  id="courseTitle"
                  name="courseTitle"
                  type="text"
                  onChange={this.change}
                  value={courseTitle}
                />

                <label for="courseDescription">Course Description</label>
                <textarea
                  id="courseDescription"
                  name="courseDescription"
                  type="text"
                  onChange={this.change}
                  value={courseDescription}
                />
                <label for="estimatedTime">Estimated Time</label>
                <input
                  id="estimatedTime"
                  name="estimatedTime"
                  type="text"
                  onChange={this.change}
                  value={estimatedTime}
                />

                <label for="materialsNeeded">Materials Needed</label>
                <textarea
                  id="materialsNeeded"
                  name="materialsNeeded"
                  type="text"
                  onChange={this.change}
                  value={materialsNeeded}
                />
              </React.Fragment>
            )}
          />
          <button
            className="button button-secondary"
            onClick="event.preventDefault(); location.href='index.html';"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  change = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  };

  submit = () => {
    const { context } = this.props;
    const {
      courseTitle,
      courseDescription,
      estimatedTime,
      materialsNeeded
    } = this.state;

    // Create user
    const course = {
      courseTitle,
      courseDescription,
      estimatedTime,
      materialsNeeded
    };

    context.data.createCourse(course).then(errors => {
      if (errors.length) {
        this.setState({ errors });
      } else {
        console.log("course created");
        this.props.history.push("/");
      }
    });

    // cancel = () => {
    //   this.props.history.push("/");
    // };
  };
}
