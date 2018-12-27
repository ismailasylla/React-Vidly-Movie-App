import React from "react";
import Like from "./common/Like";

const MovieTable = props => {
    const {movies, onDelete, onLike, onSort} = props;

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th onClick={()=> onSort('title')}>Title</th>
            <th onClick={()=> onSort('genre.name')}>Genre</th>
            <th onClick={()=> onSort('numberInStock')}>Stock</th>
            <th onClick={()=> onSort('daylyRentalRate')}>Rate</th>
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
                  onClick={() => onLike(movie)}
                />
              </td>
              <td>
                <button
                  onClick={() => onDelete(movie)}
                  className="btn btn-danger btn-sm "
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieTable;
