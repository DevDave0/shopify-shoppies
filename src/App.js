import './App.css';
import React from 'react';
const exampleKey = "http://www.omdbapi.com/?i=tt3896198&apikey=4ccaac08"
// const key = "http://www.omdbapi.com/?t=[]apikey=4ccaac08"
// api key is : 4ccaac08


class App extends React.Component {

  state = {
    results:[],
    nominations:[],
    title: '',
    year: '',

  }

  componentDidMount() {
    fetch(exampleKey)
    .then(resp => resp.json())
    .then(movie => {
      this.setState({
        title: movie.Title,
        year: movie.Year
      })
    })
  }

  render(){
    return (
      <div>
        <h1>Movie Title: {this.state.title}</h1>
        <h3>Year released: {this.state.year}</h3>
      </div>
    );
  }
}

export default App;
