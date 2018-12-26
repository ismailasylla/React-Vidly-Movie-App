import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/Like";
import Pagination from "./common/Pagination";
import { paginate } from "./utils/paginate";
import ListGroup from "./common/ListGroup";

class Movies extends Component {
  state = {
    movies: [],
    genres:[],
    currentPage: 1,
    pageSize: 4
  };

  componentDidMount(){
    this.setState({movies: getMovies(), genres: getGenres()})
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({selectedGenre: genre});
  }

  render() {
    const { length: count } = this.state.movies;
    const { 
       pageSize,
       currentPage,
       selectedGenre,
       movies: allMovies } = this.state;
    if (count === 0)
      return (
        <p className="mb-5 ">
          {" "}
          <span className="shadow-lg p-3 mb-5 bg-white rounded">
            There are no movies
          </span>
        </p>
      );
    const filtered = selectedGenre ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies; 
    const movies = paginate(filtered, currentPage, pageSize);
    return (
      <div className="row">
        <div className="col-3" style={{padding:'10px'}}>
          <ListGroup 
          items={this.state.genres}
          selectedItem={this.state.selectedGenre}
          onItemSelect= {this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p className="mb-5 ">
            <span className="shadow-lg p-3 bg-white rounded">
              Showing <span className="badge badge-info">{count}</span> movies
              in the database
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
              {movies.map(movie => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handleLike(movie)}
                    />
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
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
