import { useState } from "react"
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// interface RentalImage {
//   src:string;
// }

const Image = ({images,overview}:{images:any,overview:boolean}) => {
  const [index, setIndex] = useState(-1)

  if (images) {
    return (
      <>
        <img className={`object-cover w-full h-full min-h-[50vh] ${overview && "rounded-t-xl"}`} src={images[0] && images[0].src ? images[0].src : "images/img_placeholder.png"} 
          onClick={() =>{overview ? null : setIndex(0)}}
        />
        
        <Lightbox
          slides={images}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          // enable optional lightbox plugins
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        />
      </>
    )
  }
}

export default Image