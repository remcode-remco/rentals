import "react-image-gallery/styles/css/image-gallery.css"
import ImageGallery from "react-image-gallery"

const ImageGalleryComponent = ({images}:{images?:any}) => {
  // ==================================
  // removed functions that added youtube videos as images to image gallery due to problems with image sizes messing up the UI
  // ==================================


  // function extractYouTubeVideoId(embedUrl: string) {
  //   const match = embedUrl.match(/(?:embed\/|v=)([a-zA-Z0-9_-]{11})/);
  
  //   if (match && match.length > 1) {
  //     return match[1]
  //   } else {
  //     return null
  //   }
  // }
  
  // const modifyPicturesArray = (images:any) => {
  //   return images.map((image:any) => {
  //     if (image.embedUrl && image.embedUrl.includes('youtube.com')) {
  //       return {
  //         embedUrl: image.embedUrl,
  //         original: 'https://img.youtube.com/vi/' + extractYouTubeVideoId(image.embedUrl) + '/0.jpg',
  //         thumbnail: 'https://img.youtube.com/vi/' + extractYouTubeVideoId(image.embedUrl) + '/0.jpg',
  //         renderItem: renderVideo.bind(this),
  //       }
  //     } else {
  //       return image
  //     }
  //   })
  // }
  
  // const renderVideo = (item: { embedUrl: string | undefined; }) => {
  //   return (
  //     <iframe className=" w-full h-full aspect-square"
  //       src={item.embedUrl}
  //       allowFullScreen
  //       title="ex"
  //     />
  //   )
  // }

  if (images) {
    // const modifiedPicturesArray = modifyPicturesArray(images)
    return (
        <ImageGallery 
          items={images} 
          // items={modifiedPicturesArray} 
          showThumbnails={false}
          showPlayButton
          additionalClass="object-cover h-full w-full"
          showFullscreenButton={window.innerWidth > 1024 ? true : false}
        />
    )
  }
}

export default ImageGalleryComponent


