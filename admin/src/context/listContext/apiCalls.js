import axios from "axios"
import { deleteListFailure, deleteListStart, deleteListSuccess, getListsFailure, getListsStart, getListsSuccess } from "./ListActions"

export const getLists = async (dispatch) => {
    dispatch(getListsStart());
  try{
  const res = await axios.get("/lists", { headers: {  
    token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken, 
}, 
});
  dispatch(getListsSuccess(res.data));
  }catch(err){
    dispatch(getListsFailure());
  }
};


/*
//create
export const createMovie = async (movie, dispatch) => {
  dispatch(createMovieStart());
  try{
  const res = await axios.post("/movies", movie, { headers: {  
    token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken, 
}, 
});
  dispatch(createMovieSuccess(res.data));
  }catch(err){
    dispatch(createMovieFailure());
  }
};

*/


//delete
export const deleteList = async (id, dispatch) => {
  dispatch(deleteListStart());
  try{
  await axios.delete("/lists/"+id, { headers: {  
    token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken, 
}, 
});
  dispatch(deleteListSuccess(id));
  }catch(err){
    dispatch(deleteListFailure());
  }
};

