import { IoSearch } from "react-icons/io5";
import DetailModal from "./modals/DetailModal";
import Header from "./Header";
import ProductCard from "./ProductCard";
import { useEffect, useRef, useState } from "react";
import AddReviewModal from "./modals/AddReviewModal";
import { useAsyncFn } from "../hooks/useAsync";
import { getReviews } from "../services/review";

export type PageDetails = {
  currentPage: number;
  currentReview: string;
  detailModal: boolean;
  addReviewModal: boolean;
};

export type ReviewType = {
  title: string;
  score: number;
  description: string;
};
export default function Home() {
  const addReviewModalRef = useRef<HTMLDialogElement>(null);
  const detailModalRef = useRef<HTMLDialogElement>(null);
  const [pageDetails, setPageDetails] = useState<PageDetails>({
    currentPage: 1,
    currentReview: "",
    detailModal: false,
    addReviewModal: false,
  });

  useEffect(() => {
    if (pageDetails.detailModal) {
      detailModalRef.current?.showModal();
    }
  });

  const { loading, error, value: reviews } = useAsyncFn(getReviews);
  // Reads reviews from backand and populates reviews

  const openModal = (modalId: "AddReview" | "ProductDetail") => {
    switch (modalId) {
      case "AddReview":
        addReviewModalRef.current?.showModal();
        break;
      case "ProductDetail":
        detailModalRef.current?.showModal();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <DetailModal ref={detailModalRef} pageDetails={pageDetails} />
      <AddReviewModal ref={addReviewModalRef} />
      <div className="space-y-20">
        <Header openModal={openModal} />
        <div className="container mx-auto space-y-4 px-4">
          <h2 className="text-3xl font-bold">Featured Reviews</h2>
          <div className="grid md:grid-cols-7 grid-cols-1 gap-6">
            <div className="md:col-span-2 col-span-1">
              <h3 className="py-4 text-2xl">Sort by</h3>
              <div className="space-y-4">
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    id="search"
                    className="grow"
                    placeholder="Search"
                  />
                  <IoSearch />
                </label>

                <div className="form-control">
                  <label className="label cursor-pointer checked:bg-primary">
                    <span className="label-text">Latest</span>
                    <input
                      type="radio"
                      name="radio-10"
                      className="radio checked:bg-blue-500"
                      defaultChecked
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Top</span>
                    <input
                      type="radio"
                      name="radio-10"
                      className="radio checked:bg-blue-500"
                      defaultChecked
                    />
                  </label>
                </div>

                <button className="btn btn-accent btn-block">Apply</button>
              </div>
            </div>
            <div className="md:col-span-5 col-span-1 grid md:grid-cols-5 grid-cols-2 gap-2 grow-0">
              {/* Map reviews here to set  */}
              {/* {reviews.map((val, idx) => {
                return (
                  <ProductCard
                    pageDetails={pageDetails}
                    setPageDetails={setPageDetails}
                    product={{ rating: val.rating, title: val.title }}
                  />
                );
              })} */}
              <ProductCard
                pageDetails={pageDetails}
                setPageDetails={setPageDetails}
                product={{ rating: 2.5, title: "Sony" }}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="join ">
            <button className="join-item btn">1</button>
            {/* Using pageDetails.pageNumber you can set the active page accordingly */}
            <button className="join-item btn btn-active">2</button>
            <button className="join-item btn">3</button>
            <button className="join-item btn">4</button>
          </div>
        </div>
      </div>
    </>
  );
}
