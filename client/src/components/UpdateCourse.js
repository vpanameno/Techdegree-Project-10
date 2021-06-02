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
    course: {}
  };

  async componentDidMount() {
    await this.getCourse(this.state.id).catch(err => {
      console.log(err);
    });
    console.log(this.state.user);
  }

  getCourse = async function(id) {
    console.log(this.state.id);
    await Axios.get(`http://localhost:5000/api/courses/${id}`)
      .then(response => {
        this.setState({
          course: response.data,
          owner: response.data.owner,
          title: response.data.title,
          description: response.data.description,
          estimatedTime: response.data.estimatedTime,
          materialsNeeded: response.data.materialsNeeded
        });
      })
      .catch(err => {
        console.error(err);
        this.props.history.push("/notfound");
      });
  };
  //Below I will render the form and required fields from the getCourse state to fill in the blanks
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
        <h2>Update Course</h2>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Update Course"
          elements={() => (
            <React.Fragment>
              <div className="main--flex">
                <div>
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
                </div>
                <div>
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
                </div>
              </div>
            </React.Fragment>
          )}
        />
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
  //Below you will use submit to call the updateCourse function passed through context and and cslledwith the provided crentials
  submit = () => {
    const { context } = this.props;
    const { authenticatedUser } = context;
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      id
    } = this.state;
    const userId = authenticatedUser.userId;
    // Create course
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    };
    context.data
      .updateCourse(
        id,
        course,
        authenticatedUser.emailAddress,
        authenticatedUser.password
      )
      .then(errors => {
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
