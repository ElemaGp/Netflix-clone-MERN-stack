import { useContext, useEffect, useState } from "react";
import { createMovie, getMovies } from "../../context/movieContext/apiCalls";
import storage from "../../firebase";
import "./newList.css";
import {MovieContext} from "../../context/movieContext/MovieContext";
import { ListContext } from "../../context/listContext/ListContext";


export default function NewList() {
  const [list, setList] = useState(null);
  

  const {dispatch} = useContext(ListContext);
  const {movies, dispatch: dispatchMovie} = useContext(MovieContext);

  useEffect(()=>{
    getMovies(dispatchMovie)
  },[dispatchMovie]);

  const handleChange = (e) => {
    const value = e.target.value;
    setList({...list, [e.target.name]: value});
  };

  
  const handleSelect = (e)=>{
    let value = Array.from(e.target.selectedOptions, (option)=>option.value);  //this basically means that the code should craete an array from the selected options, and then pick the value of each option. In the code below, i already set "value=movie._id", so it'll pick the id of each selected movie and put the ids in the array.
    setList({...list, [e.target.name]: value});
  };

  console.log(list);

  //sending the list's link uploaded in firebase to mongodb
  const handleSubmit = (e)=> {
    e.preventDefault();
    
  }


  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" placeholder="John Wick" name="title" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" placeholder="description" name="genre" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Type</label>
          <select name="type" onChange={handleChange}>
            <option>Select Type</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Content</label>
          <select multiple name="content" onChange={handleSelect}>
            {movies.map(movie=>(
              <option key={movie._id} value={movie._id}>
                {movie.title}
                </option>
              ))}
            </select>
          </div>
            <button className="addProductButton" onClick={handleSubmit}>
              Create
            </button>
          </form>
        </div>
      );
    }

        

        
