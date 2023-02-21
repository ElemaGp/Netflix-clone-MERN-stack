import { useContext, useState } from "react";
import { createMovie } from "../../context/movieContext/apiCalls";
import storage from "../../firebase";
import "./newProduct.css";
import {MovieContext} from "../../context/movieContext/MovieContext";

/* If you really want to understand this code, follow it starting from the jsx */

export default function NewProduct() {
  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const {dispatch} = useContext(MovieContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({...movie, [e.target.name]: value});
  };

  //uploading to firebase
  const upload = (items) => {
    items.forEach(item=>{
      const fileName = new Date().getTime() + item.label + item.file.name; //using the "Date" makes it possible for you to upload files with the same name
      const uploadTask = storage.ref(`/items/${fileName}`).put(item.file); //"items" will be the name of the folder in firebase where the files will be stored.
      uploadTask.on("state_changed", snapshot=>{  //displaying upload progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is" + progress + "% done");
      },
      (err)=>{console.log(err)},()=>{    
        uploadTask.snapshot.ref.getDownloadURL().then(url=>{ //getting the link of the files you just uploaded to firebase 
          setMovie((prev) => {  //putting the links in "movie"
            return { ...prev, [item.label]: url };
          });
          setUploaded((prev)=>prev + 1); //we do this count here because i set it below that when it gets to 5, it means the 5 files have been uploaded to firebase. The button then changes to "create" so that the file links and other string data can be sent to mongodb.
        });
      }
      );
    });
  };
  
  //These are for the media files which will be uploaded to firebase. It's necessary to do this if you'll be uploading to firebase because the firebase code (which we took from the firebase documentation) needs it.
  const handleUpload = (e) =>{
    e.preventDefault();
    upload([
      {file: img, label: "img"},
      {file: imgTitle, label: "imgTitle"},
      {file: imgSm, label: "imgSm"},
      {file: trailer, label: "trailer"},
      {file: video, label: "video"},
    ]);
  };

  
  const handleSubmit = (e)=> {
    e.preventDefault();
    createMovie(movie, dispatch); //"createMovie" is the "apiCall" function for creating a new movie in mongodb.
  }


  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="img" name="img" onChange={(e) => setImg(e.target.files[0])} />  {/* the "[0]" is there because this will only contain one file*/}
        </div>
        <div className="addProductItem">
          <label>Title image</label>
          <input type="file" id="imgTitle" name="imgTitle" onChange={(e) => setImgTitle(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Thumbnail image</label>
          <input type="file" id="imgSm" name="imgSm" onChange={(e) => setImgSm(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" placeholder="John Wick" name="title" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" placeholder="description" name="desc" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input type="text" placeholder="Year" name="year" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" placeholder="Genre" name="genre" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input type="text" placeholder="Duration" name="duration" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>limit</label>
          <input type="text" placeholder="limit" name="limit" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Is Series?</label>
          <select name="isSeries" id="isSeries">
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input type="file" name="trailer" onChange={(e) => setTrailer(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input type="file" name="video" onChange={(e) => setVideo(e.target.files[0])}/>
        </div>{uploaded === 5 ? (

          <button className="addProductButton" onClick={handleSubmit}>Create</button>
          ) : (
          <button className="addProductButton" onClick={handleUpload}>Upload</button>
          )}
        </form>
      </div>
    );
  }
        
