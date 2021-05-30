import React, { Component } from "react";
import Form from "./Form";

export default class CreateCourse extends Component {
  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    errors: [],
    user: this.props.context.authenticatedUser || null
  };

  render() {
    const {
      title,
      description,
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
                <label htmlFor="title">Course Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  onChange={this.change}
                  value={title}
                />

                <label htmlFor="description">Course Description</label>
                <textarea
                  id="description"
                  name="description"
                  type="text"
                  onChange={this.change}
                  value={description}
                />
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input
                  id="estimatedTime"
                  name="estimatedTime"
                  type="text"
                  onChange={this.change}
                  value={estimatedTime}
                />

                <label htmlFor="materialsNeeded">Materials Needed</label>
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
      title,
      description,
      estimatedTime,
      materialsNeeded,
      user
    } = this.state;
    const userId = user.id;

    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    };
    context.data.createCourse(course).then(errors => {
      if (errors.length) {
        this.setState({ errors });
      } else {
        console.log("course created");
        this.props.history.push("/");
      }
    });
  };

  cancel = () => {
    this.props.history.push("/");
  };
}
