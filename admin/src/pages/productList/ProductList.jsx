import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import { useEffect } from "react";
import { deleteMovie, getMovies } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";

export default function ProductList() {
  const {movies, dispatch} = useContext(MovieContext);

  useEffect(()=>{
    getMovies(dispatch); //getMovies is the function of the "api calls" in "movieContext" that handles axios fetching of the movies.
  },[dispatch]);

  const handleDelete = (id) => {
    deleteMovie(id, dispatch);
  };



  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "movie",
      headerName: "Movie",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "year", width: 120 },
    { field: "limit", headerName: "limit", width: 120 },
    { field: "isSeries", headerName: "isSeries", width: 120 },
    
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {/*The "pathname" and "movie: params.row" below means that "movie" object can now be used in the location this link will lead to bsed on the app.js. This is possible because i'll use "useLocation" to grab this "movie" object in that location. And then i can use the "movie" object's properties eg. movie.title, movie.desc etc */}
            <Link to={{pathname: "/product/" + params.row._id, movie: params.row }}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={movies}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
