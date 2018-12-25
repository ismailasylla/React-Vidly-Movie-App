import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/Like";
import Pagination from './common/Pagination'

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize:4
  };

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) =>{
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = {...movies[index]};
    movies[index].liked = !movies[index].liked;
    this.setState({movies});

  };

  handlePageChange = page =>{
    console.log(page)
  }

  render() {
    const { length: count } = this.state.movies;
    if (count === 0)
      return (
        <p className="mb-5 ">
          {" "}
          <span className="shadow-lg p-3 mb-5 bg-white rounded">
            There are no movies
          </span>
        </p>
      );
    return (
      <React.Fragment>
        <p className="mb-5 ">
          <span className="shadow-lg p-3 bg-white rounded">
            Showing <span className="badge badge-info">{count}</span> movies in
            the database
          </span>
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th>Like</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like liked={movie.liked} onClick={()=>this.handleLike(movie)} />
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger btn-sm "
                  >
                    Delete
                  </button>
                </td>
              </tr>  
            ))}
          </tbody>
        </table>
        <Pagination itemsCount={count} pageSize={10} onPageChange={this.handlePageChange}/>
      </React.Fragment>
    );
  }
}

export default Movies;
