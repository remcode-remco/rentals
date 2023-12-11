const Video = ({video}:{video:string}) => {
  
  return (
    <iframe 
      className="h-[30vh] w-full"
      id="targetFrame" 
      src={video}
      allow=""
      height="630px"
      allowFullScreen
      title="Embedded video"
    />
  )
}

export default Video