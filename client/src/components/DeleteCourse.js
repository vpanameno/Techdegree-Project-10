import React, { Component } from "react";
import Form from "./Form";
import ReactMarkdown from "react-markdown";
const Axios = require("axios");

export default class DeleteCourse extends Component {
  state = {
    owner: {},
    errors: [],
    user: this.props.context.authenticatedUser || null,
    id: this.props.match.params.id,
    course: {}
  };

  async componentDidMount() {
    await this.getCourse(this.state.id).catch(err => {
      console.log(err);
    });
  }
  //Fetching the course that is part of the parameters in the UL for update course
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
        }).catch(err => {
          console.error(err);
          this.props.history.push("/notfound");
        });
      }
    );
  };
  //I will render the course details on the page
  render() {
    const { course, owner, errors } = this.state;
    return (
      <div className="wrap">
        <h3>Delete Course: {course.title}?</h3>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Delete Course"
          elements={() => (
            <div className="main--flex">
              <React.Fragment>
                <div>
                  <h3 className="course--detail--title">Course</h3>
                  <h4 className="course--name">{course.title}</h4>
                  <p>{`By ${owner.firstName} ${owner.lastName}`}</p>
                  <ReactMarkdown>{course.description}</ReactMarkdown>
                </div>
              </React.Fragment>
              <React.Fragment>
                <div>
                  <h3 className="course--detail--title">Estimated Time</h3>
                  <p>{course.estimatedTime}</p>

                  <h3 className="course--detail--title">Materials Needed</h3>
                  <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                </div>
              </React.Fragment>
            </div>
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
      id,
      userId
    };
    context.data
      .deleteCourse(
        id,
        course,
        authenticatedUser.emailAddress,
        authenticatedUser.password
      )
      .then(errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          console.log("course deleted");
          this.props.history.push("/");
        }
      });
  };

  cancel = () => {
    const { id } = this.state;
    this.props.history.push(`/courses/${id}`);
  };
}
