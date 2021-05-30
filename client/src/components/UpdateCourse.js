import React, { Component } from "react";
import Form from "./Form";
const Axios = require("axios");

export default class UpdateCourse extends Component {
  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    errors: [],
    user: this.props.context.authenticatedUser || null,
    id: this.props.match.params.id,
    course: {},
    owner: {}
  };

  async componentDidMount() {
    await this.getCourse(this.state.id).catch(err => {
      console.log(err);
    });
  }

  getCourse = async function(id) {
    console.log(this.state.id);
    await Axios.get(`http://localhost:5000/api/courses/${id}`).then(
      response => {
        this.setState({
          course: response.data,
          owner: response.data.owner,
          title: response.data.title,
          description: response.data.description,
          estimatedTime: response.data.estimatedTime,
          materialsNeeded: response.data.materialsNeeded
        });
        console.log(response.data);
      }
    );
  };

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
      course
    } = this.state;

    return (
      <div className="wrap">
        <h2>Update {course.title}</h2>
        <div className="main--flex">
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Update Course"
            elements={() => (
              <React.Fragment>
                <label for="title">Course Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  onChange={this.change}
                  defaultValue={title}
                />

                <label for="description">Course Description</label>
                <textarea
                  id="description"
                  name="description"
                  type="text"
                  onChange={this.change}
                  defaultValue={description}
                />
                <label for="estimatedTime">Estimated Time</label>
                <input
                  id="estimatedTime"
                  name="estimatedTime"
                  type="text"
                  onChange={this.change}
                  defaultValue={estimatedTime}
                />

                <label for="materialsNeeded">Materials Needed</label>
                <textarea
                  id="materialsNeeded"
                  name="materialsNeeded"
                  type="text"
                  onChange={this.change}
                  defaultValue={materialsNeeded}
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
      id,
      user
    } = this.state;
    const userId = user.id;
    // Create course
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      id,
      userId
    };
    context.data.updateCourse(id, course).then(errors => {
      if (errors.length) {
        this.setState({ errors });
      } else {
        console.log("course updated");
        this.props.history.push(`/courses/${id}`);
      }
    });
  };

  cancel = () => {
    this.props.history.push("/");
  };
}
