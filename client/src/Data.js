import config from "./config";

export default class Data {
  api(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(
        `${credentials.emailAddress}:${credentials.password}`
      );
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }
  //get User will be responsible for signing users in - it will search for their matching credentials in the database and grant them access.
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, "GET", null, true, {
      emailAddress,
      password
    });
    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }
  //createUser will be responsible for storing the credentials in the database too allow getUser to access them
  async createUser(user) {
    const response = await this.api("/users", "POST", user);
    if (response.status === 201) {
      console.log(response.status);
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
  //createCourse will be responsible for collecting credentials before processing the request to create a course. once it has been processed it will send the information of the request in the body
  async createCourse(course, emailAddress, password) {
    const response = await this.api("/courses", "POST", course, true, {
      emailAddress,
      password
    });
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
  //Update course will be responsible for also collecting credentials before allowing the user to update the course. This will send a PUT request to update the course.
  async updateCourse(courseId, course, emailAddress, password) {
    const response = await this.api(
      `/courses/${courseId}`,
      "PUT",
      course,
      true,
      {
        emailAddress,
        password
      }
    );
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
  //deleteCourse is responsible for fetching credentials, authenticating the user and deleting a course fetching a destroy request.
  async deleteCourse(courseId, course, emailAddress, password) {
    const response = await this.api(
      `/courses/${courseId}`,
      "DELETE",
      course,
      true,
      {
        emailAddress,
        password
      }
    );
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
}
