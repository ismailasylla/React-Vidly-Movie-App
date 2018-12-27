import React, { Component}from "react";
import Like from "./common/Like";
import TableHeader from './common/TableHeader'


class MoviesTable extends Component {
  columns = [
    {path:'title', label:'Title'},
    {path:'genre.name', label:'Genre'},
    {path:'numberInStock', label:'Stock'},
    {path:'daylyRentalRate', label:'Rate'},
    {key:'like'},
    {key:'delete'},
  ] 
  
  render() { 
    const { movies, onDelete, onLike,onSort, sortColumn} = this.props;

    return <div>
        <table className="table">
        <TableHeader columns={this.columns} sortColumn={sortColumn} onSort={onSort}/>
          <tbody>
            {movies.map(movie => <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like liked={movie.liked} onClick={() => onLike(movie)} />
                </td>
                <td>
                  <button onClick={() => onDelete(movie)} className="btn btn-danger btn-sm ">
                    Delete
                  </button>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>;
  }
}
 



export default MoviesTable;
