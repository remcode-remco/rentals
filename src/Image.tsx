interface RentalImage {
  original:string;
}

const Image = ({image}:{image?:RentalImage}) => (
  <img className="rounded" src={image && image.original ? image.original : "images/img_placeholder.png"} />
)

export default Image