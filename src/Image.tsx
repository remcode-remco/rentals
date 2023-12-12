interface RentalImage {
  original:string;
}

const Image = ({image}:{image:RentalImage}) => (
  <img src={image.original} />
)

export default Image