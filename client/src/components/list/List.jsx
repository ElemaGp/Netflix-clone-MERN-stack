import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@material-ui/icons"
import { useRef, useState } from "react"
import ListItem from "../listitem/ListItem"
import "./list.scss"

export default function List({list}) {
  const [isMoved, setIsMoved] = useState(false); //the left arrow only appears if the right arrow is clicked. This is used to set that.
  const [slideNumber, setSlideNumber] = useState(0); //this is used to set it so that the slider doeant keep sliding once at the edge. 

  
  const listRef = useRef(); // for referencing the "container" div i used for setting slider  
  const handleClick = (direction) =>{
    setIsMoved(true)
    let distance = listRef.current.getBoundingClientRect().x - 50; //this calculates the total distance as the slider slides. "-50" substracts the margin left i set from the left edge of the browser page. 
    if(direction === "left" && slideNumber > 0){
      setSlideNumber(slideNumber - 1);
        listRef.current.style.transform = `translateX(${230 + distance}px)`; //"230" is each tab's width. "distance" is what i set above to represent the distance the slider has slid at every point.
    }
    if(direction === "right" && slideNumber < 5){
      setSlideNumber(slideNumber + 1);
        listRef.current.style.transform = `translateX(${-230 + distance}px)`; //"230" is each tab's width. "distance" is what i set above to represent the distance the slider has slid at every point.
    }
    
  }
  return (
    <div className="list">
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        <ArrowBackIosOutlined className="sliderArrow left" onClick={()=>handleClick("left")} style={{display: !isMoved && "none"}}/> 
        <div className="container" ref={listRef}>
          {list.content.map((item, i) => (
            <ListItem index={i} item={item}/>
          ))}
          
        </div>
        <ArrowForwardIosOutlined className="sliderArrow right" onClick={()=>handleClick("right")}/>
      </div>
    </div>
  )
}
