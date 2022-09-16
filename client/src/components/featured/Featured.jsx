import { InfoOutlined, PlayArrow } from '@material-ui/icons'
import React from 'react'
import "./featured.scss"
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

export default function Featured({type}) {          {/*passing "type" as a prop from Home component. If "type" is true, we'll see the series or movies when we click on it. */}
  const [content, setContent] = useState({});

  useEffect(()=>{
    const getRandomContent = async ()=>{
      try{
        const res = await axios.get(`/movies/random?type=${type}`, {
          headers:{
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMWQxN2I5ZjZiZTdjMzFjOGM4Mzg0MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2MzA0MTQzNCwiZXhwIjoxNjYzNDczNDM0fQ.K8dd2k7gynuyToLZvKMpZqD_u-Oo3aIQcMr_DoxpEoY"
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
                <span>{type === "movies" ? "Movies" : "Series"}</span>       {/*If "type" is equal to movies, then the span shoows "Movies", else it shows series */}
                <select name="genre" id="genre">
                    <option>Genre</option>
                    <option value="adventure">Adventure</option>
                    <option value="comedy">Comedy</option>
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
        <img src={content.imgSm} alt="" />
        <span className="desc">
            {content.desc}
        </span>
        <div className="buttons">
            <button className="play">
                <PlayArrow />
                <span>Play</span>
            </button>
            <button className="more">
                <InfoOutlined />
                <span>Info</span>
            </button>
        </div>
      </div>
    </div>
  )
}
