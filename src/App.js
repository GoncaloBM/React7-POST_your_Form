import React, { Component } from "react";
import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      poster: "",
      comment: ""
    };

    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submitForm(e) {
    e.preventDefault();

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    };

    const url = "https://post-a-form.herokuapp.com/api/movies/";

    fetch(url, config)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          alert(`Added the movie ${this.state.title} to your collection`);
        }
      })
      .catch(e => {
        console.error(e);
        alert("Error during movie addition");
      });
  }

  render() {
    return (
      <div className="filmForm">
        <h1>Film Form</h1>
        <form onSubmit={this.submitForm}>
          <fieldset>
            <legend>Information</legend>
            <div className="form-data">
              <label htmlFor="filmName">Movie Title</label>
              <input
                type="text"
                id="title"
                name="title"
                onChange={this.onChange}
                value={this.state.title}
              />
            </div>

            <div className="form-data">
              <label htmlFor="filmUrl">Film Poster</label>
              <input
                type="text"
                id="poster"
                name="poster"
                value={this.state.poster}
                onChange={this.onChange}
              />
            </div>

            <div className="form-data">
              <label htmlFor="filmComment">Comment</label>
              <textarea
                type="text"
                id="comment"
                name="comment"
                value={this.state.comment}
                onChange={this.onChange}
              />
            </div>

            <div className="form-data">
              <input type="submit" value="Send" />
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default App;
