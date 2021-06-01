import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import Axios from "axios";

export default class CourseDetail extends Component {
  state = {
    course: {},
    id: this.props.match.params.id,
    owner: {},
    user: this.props.context.authenticatedUser || null
  };

  componentDidMount() {
    this.getCourse();
  }

  async getCourse(id = this.props.match.params.id) {
    await Axios.get(`http://localhost:5000/api/courses/${id}`).then(
      response => {
        this.setState({
          course: response.data,
          owner: response.data.owner
        });
      }
    );
  }

  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const { course, id, owner } = this.state;
    return (
      <div>
        <div className="actions--bar">
          <div className="wrap">
            {authUser && authUser.userId === owner.id ? (
              <a className="button" href={`/courses/${id}/update`}>
                Update Course
              </a>
            ) : null}
            {authUser && authUser.userId === owner.id ? (
              <a className="button" href={`/courses/${id}/delete`}>
                Delete Course
              </a>
            ) : null}
            <a className="button button-secondary" href="/">
              Return to List
            </a>
          </div>
        </div>

        <div className="wrap">
          <h2>Course Detail</h2>
          <div>
            <form>
              <div className="main--flex">
                <div>
                  <h3 className="course--detail--title">Course</h3>
                  <h4 className="course--name">{course.title}</h4>
                  <p>{`By ${owner.firstName} ${owner.lastName}`}</p>
                  <ReactMarkdown>{course.description}</ReactMarkdown>
                </div>
                <div>
                  <h3 className="course--detail--title">Estimated Time</h3>
                  <p>{course.estimatedTime}</p>

                  <h3 className="course--detail--title">Materials Needed</h3>
                  <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
