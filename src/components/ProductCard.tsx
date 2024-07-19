import Image1 from "../assets/images/image1.jpg";
import Rating from "../components/Rating";
import type { PageDetails } from "./Home";

type ProductProps = {
  title?: string;
  rating: number;
  price?: number;
  image?: string;
};

export default function ProductCard({
  product,
  pageDetails,
  setPageDetails,
}: // setPageDetails,
{
  product: ProductProps;
  setPageDetails: React.Dispatch<React.SetStateAction<PageDetails>>;
  pageDetails: PageDetails;
}) {
  return (
    <div
      onClick={() =>
        setPageDetails({
          ...pageDetails,
          addReviewModal: false,
          detailModal: true,
          currentReview: "1",
        })
      }
      //current product refers to the product that currently displayed over the modal
      className="h-min cursor-pointer hover:scale-95 transition-all duration-200"
    >
      <img src={Image1} className=" rounded-sm object-cover w-full" />

      <div className="flex flex-col items-center space-y-2">
        <p className="font-uppercase text-sm font-medium">{product.title}</p>
        <Rating score={product.rating} />
      </div>
    </div>
  );
}
