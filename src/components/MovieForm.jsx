import React, { Component } from 'react';

class MovieForm extends Component {

  handleInputs = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.title]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault() 
    this.props.searchMovie(this.state)
  }

  render() {
    return (
      <div className="container">
        <form className="add-movie-form" onSubmit={(e) => this.handleSubmit(e)}>
          <h3>Search a movie!</h3>
          <input type="text" title="title" placeholder="Enter a movie title..." className="input-text" onChange={(e) => this.handleInputs(e)} />
        </form>
      </div>
    );
  }

}

export default MovieForm;