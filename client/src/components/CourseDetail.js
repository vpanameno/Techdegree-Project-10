import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

export default class CourseDetail extends Component {
  state = {
    courseInfo: {},
    id: this.props.match.params.id,
    owner: {}
  };

  componentDidMount() {
    this.course();
  }

  course = (id = this.props.match.params.id) => {
    console.log(this.props.match.params.id);
    Axios.get(`http://localhost:5000/api/courses/${id}`).then(response => {
      this.setState({
        courseInfo: response.data,
        owner: response.data.owner
      });
      console.log(response.data);
    });
  };

  render() {
    const { courseInfo, id, owner } = this.state;
    return (
      <div>
        <div className="actions--bar">
          <div className="wrap">
            <a className="button" href={`/courses/${id}/update`}>
              Update Course
            </a>

            <a className="button" href={`/courses/${id}/delete`}>
              Delete Course
            </a>

            <a className="button button-secondary" href="/courses/">
              Return to List
            </a>
          </div>
        </div>

        <div className="wrap">
          <h2>Course Detail</h2>
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{courseInfo.title}</h4>
                <p>{`By ${owner.firstName} ${owner.lastName}`}</p>
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{courseInfo.estimatedTime}</p>

                <h3 className="course--detail--title">Materials Needed</h3>
                <ul Name="course--detail--list">
                  <li>1/2 x 3/4 inch parting strip</li>
                  <li>1 x 2 common pine</li>
                  <li>1 x 4 common pine</li>
                  <li>1 x 10 common pine</li>
                  <li>1/4 inch thick lauan plywood</li>
                  <li>Finishing Nails</li>
                  <li>Sandpaper</li>
                  <li>Wood Glue</li>
                  <li>Wood Filler</li>
                  <li>Minwax Oil Based Polyurethane</li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
