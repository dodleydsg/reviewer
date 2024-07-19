import { PageDetails, ReviewType } from "../Home";
import Rating from "../Rating";
import React, { forwardRef } from "react";
import { useAsyncFn } from "../../hooks/useAsync";
import { getReview } from "../../services/review";
import { IoClose, IoTrash } from "react-icons/io5";
import UpdateReviewForm from "../Forms/UpdateReviewForm";
type DetailModalProps = {
  pageDetails: PageDetails;
};

const DetailModal = forwardRef(function DetailModal(
  { pageDetails }: DetailModalProps,
  ref: React.ForwardedRef<HTMLDialogElement>
) {
  type AsyncState = {
    loading: boolean;
    error?: string | null;
    value?: { review?: ReviewType };
  };
  const { loading, error, value }: AsyncState = useAsyncFn(
    getReview(pageDetails.currentReview)
  );

  if (loading) {
    return <h1>Loading review</h1>;
  }
  if (error) {
    return <h1>Error loading review</h1>;
  }

  return (
    <>
      <dialog ref={ref} className="modal">
        <div className="modal-box">
          <div className="flex justify-between">
            <h5 className="text-2xl font-medium">Product Details</h5>
            <div className="flex gap-4">
              <div className="tooltip" data-tip="Delete review">
                <button className="btn btn-error">
                  <IoTrash />
                </button>
              </div>
              <form method="dialog">
                <button className="btn btn-neutral">
                  <IoClose />
                </button>
              </form>
            </div>
          </div>
          <div className="">
            <div>{/* Image here */}</div>
            <div>
              <p>Title: {value?.review.title}</p>
              <div>
                Rating: <Rating score={value?.review?.score || 1.2} />{" "}
              </div>
              <div>Description: {value?.review?.description}</div>
            </div>
            <h6 className="font-bold">Update Review</h6>
            <UpdateReviewForm />
          </div>
        </div>
      </dialog>
    </>
  );
});

export default DetailModal;
