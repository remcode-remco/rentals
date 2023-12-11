interface RentalImage {
  original:string;
}

const RentalImage = ({image}:{image:RentalImage}) => (
  <img src={image.original} />
)

export default RentalImage