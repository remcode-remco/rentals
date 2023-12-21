import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css"

const ImageGalleryComponent = ({images}:{images?:any}) => {
  function extractYouTubeVideoId(embedUrl: string) {
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
  
  const renderVideo = (item: { embedUrl: string | undefined; }) => {
    return (
      <div className="aspect-square">
        <iframe className="w-full h-full"
          src={item.embedUrl}
          allowFullScreen
          title="ex"
        />
      </div>
    )
  }

  if (images) {
    const modifiedPicturesArray = modifyPicturesArray(images)
    return (
      <ImageGallery 
        items={modifiedPicturesArray} 
        showThumbnails={false}
        showPlayButton
        additionalClass="w-full object-cover"
      />
    )
  }
}

export default ImageGalleryComponent


