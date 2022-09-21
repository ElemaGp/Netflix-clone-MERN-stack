import { InfoOutlined, PlayArrow } from '@material-ui/icons'
import React from 'react'
import "./featured.scss"
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Featured({type, setGenre}) {          {/*passing "type" and "setGenre" as a props from Home component. If "type" is true, we'll see the series or movies when we click on it. If "genre" is true, we'll see the genre */}
  const [content, setContent] = useState({});

  useEffect(()=>{
    const getRandomContent = async ()=>{
      try{
        const res = await axios.get(`/movies/random?type=${type}`, {
          headers:{
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMmFhZWM3ZjE2NWFhNWEwZmJjNWE4MyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NjM3NDc5ODEsImV4cCI6MTY2NDE3OTk4MX0.ryLl-Gn-Zqg4TsrNYVL25kX019KVXMokPHZr4Pl2PKA"
          },
        });
        setContent(res.data[0]);
      }catch(err){
        console.log(err)
      }
    };
    getRandomContent();
  },[type]);

  console.log(content);
  
  
return (
    <div className="featured">
        {type && (              //if type is true or has a value...
            <div className="category">      
                <span>{type === "movie" ? "Movies" : "Series"}</span>       {/*If "type" is equal to movie, then the span shoows "Movies", else it shows series */}
                <select name="genre" id="genre" onChange={e=>setGenre(e.target.value)}>
                    <option>Select Genre</option>
                    <option value="adventure">Adventure</option>
                    <option value="comedy">Comedy</option>
                    <option value="action">Action</option>
                    <option value="crime">Crime</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="historical">Historical</option>
                    <option value="horror">Horror</option>
                    <option value="romance">Romance</option>
                    <option value="sci-fi">Sci-fi</option>
                    <option value="thriller">Thriller</option>
                    <option value="western">Western</option>
                    <option value="animation">Animation</option>
                    <option value="drama">Drama</option>
                    <option value="documentary">Documentary</option>
                </select>
            </div>
        )}
      <img src={content.img} alt="" />
      <div className="info">
  {/*  <img src={content.imgTitle} alt="" />  */}
        <span className="desc">
            {content.desc}
        </span>
        <div className="buttons">
          <Link to = {{pathname: "/watch", movie: content }}>
            <button className="play">
                <PlayArrow />
                <span>Play</span>
            </button>
          </Link>
            <button className="more">
                <InfoOutlined />
                <span>Info</span>
            </button>
        </div>
      </div>
    </div>
  )
}
