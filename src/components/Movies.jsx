import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/Pagination";
import { paginate } from "./utils/paginate";
import ListGroup from "./common/ListGroup";
import MovieTable from "./MoviesTable";
import _ from 'lodash';


class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn:{path:'title', order:'asc' }
  };

  componentDidMount() {
    const genres = [{_id:'', name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
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
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  handleSort = path =>{
    const sortColumn = {...this.state.sortColumn};
    if(sortColumn.path === path)
    sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
    else{
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }
    this.setState({ sortColumn})
  }

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, selectedGenre, movies: allMovies } = this.state;
    if (count === 0)
      return (
        <p className="mb-5 ">
          {" "}
          <span className="shadow-lg p-3 mb-5 bg-white rounded">
            There are no movies
          </span>
        </p>
      );
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted =   _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return <div className="row">
        <div className="col-3" style={{ padding: "10px" }}>
          <ListGroup items={this.state.genres} selectedItem={this.state.selectedGenre} onItemSelect={this.handleGenreSelect} />
        </div>
        <div className="col">
          <p className="mb-5 ">
            <span className="shadow-lg p-3 bg-white rounded">
              Showing <span className="badge badge-info">{count}</span> movies in the database
            </span>
          </p>
          <MovieTable movies={movies} 
          onLike={this.handleLike} 
          onDelete={this.handleDelete} 
          onSort ={this.handleSort}/>
          <Pagination 
          itemsCount={filtered.length} 
          pageSize={pageSize} 
          currentPage={currentPage} 
          onPageChange={this.handlePageChange} />
        </div>
      </div>;
  }
}

export default Movies;
