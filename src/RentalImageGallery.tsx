import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"

const RentalImageGallery = ({images}:{images:any}) => {

  function extractYouTubeVideoId(embedUrl) {
    // Match the video ID using a regular expression
    const match = embedUrl.match(/(?:embed\/|v=)([a-zA-Z0-9_-]{11})/);
  
    // Check if a match is found
    if (match && match.length > 1) {
      return match[1] // Return the captured video ID
    } else {
      return null; // Return null if no match is found
    }
  }
  
  const modifyPicturesArray = (images:any) => {
    return images.map((image:any) => {
      if (image.embedUrl && image.embedUrl.includes('youtube.com')) {
        return {
          embedUrl: image.embedUrl,
          original: 'https://img.youtube.com/vi/' + extractYouTubeVideoId(image.embedUrl) + '/0.jpg',
          thumbnail: 'https://img.youtube.com/vi/' + extractYouTubeVideoId(image.embedUrl) + '/0.jpg',
          renderItem: renderVideo.bind(this),
        }
      } else {
        return image
      }
    })
  }
  
  const renderVideo = (item) => {
    return (
      <div className="video-wrapper">
        <iframe
          width="100%"
          height="480px"
          src={item.embedUrl}
          allowFullScreen
          title="ex"
        />
      </div>
    )
  }


  const modifiedPicturesArray = modifyPicturesArray(images)
  
  return (
    <ImageGallery 
      items={modifiedPicturesArray} 
      showThumbnails={false}
      showPlayButton
    />
  )
}

export default RentalImageGallery


