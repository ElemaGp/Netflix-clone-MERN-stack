import { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { createMovie, getMovies } from "../../context/movieContext/apiCalls";
import storage from "../../firebase";
import "./newList.css";
import {MovieContext} from "../../context/movieContext/MovieContext";
import { ListContext } from "../../context/listContext/ListContext";
import { createList } from "../../context/listContext/apiCalls";


export default function NewList() {
  const [list, setList] = useState(null);
  const history = useHistory();
  

  const {dispatch} = useContext(ListContext);
  const {movies, dispatch: dispatchMovie} = useContext(MovieContext);  //since i already have a "dispatch" named in the ListContecext above, i called the dispatch for the MovieContext here "dispatchMovie".

  useEffect(()=>{
    getMovies(dispatchMovie)
  },[dispatchMovie]);

  const handleChange = (e) => {
    const value = e.target.value;
    setList({...list, [e.target.name]: value}); //"...list" means that as you type and fill the form on the list, it updates the list object (the previous things you typed plus the new stuff you're typing as you fill the form).
  };

  
  const handleSelect = (e)=>{
    let value = Array.from(e.target.selectedOptions, (option)=>option.value);  //this basically means that the code should craete an array from the selected options, and then pick the value of each option. In the code below, i already set "value=movie._id", so it'll pick the id of each selected movie and put the ids in the array.
    setList({...list, [e.target.name]: value});
  };

  

  //sending the list's link uploaded in firebase to mongodb
  const handleSubmit = (e)=> {
    e.preventDefault();
    createList(list, dispatch);
    history.push("/lists");
  };


  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New List</h1>
      <form className="addProductForm">
        <div className="formLeft">
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" placeholder="Title for the list" name="title" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" placeholder="eg. comedy, action etc" name="genre" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Type</label>
          <select name="type" onChange={handleChange}>
            <option>Select Type</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
          </select>
        </div>
        </div>
        <div className="formRight">
        <div className="addProductItem">
          <label>Content</label>
          <select multiple name="content" onChange={handleSelect} style={{height: "280px"}}>
            {movies.map(movie=>(
              <option key={movie._id} value={movie._id}>
                {movie.title}
                </option>
              ))}
            </select>
          </div>
        </div>
            <button className="addProductButton" onClick={handleSubmit}>
              Create
            </button>
          </form>
        </div>
      );
    }
        
        


        

        

