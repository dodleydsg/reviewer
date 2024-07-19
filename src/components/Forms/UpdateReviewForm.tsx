import { ReviewType } from "../Home";

export default function UpdateReviewForm({ data }: { data?: ReviewType }) {
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.target.v;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="grid grid-cols-7 gap-4">
        <label className="col-span-2 self-end" htmlFor="title">
          Product title
        </label>
        <input
          type="text"
          id="title"
          value={data?.title}
          placeholder="Product title"
          className="col-span-5 input input-bordered w-full "
        />
      </div>
      <div className="grid grid-cols-7 gap-4">
        <label className="col-span-2 self-end" htmlFor="score">
          Review score
        </label>
        <input
          type="number"
          max={5}
          min={0}
          value={data?.score}
          step={0.1}
          id="score"
          placeholder="Product score"
          className="input input-bordered col-span-5 invalid:outline-red-400 valid:outline-green-400"
        />
      </div>
      <div className="grid grid-cols-7 gap-4">
        <label className="col-span-2 self-end" htmlFor="description">
          Review text
        </label>
        <textarea
          rows={4}
          value={data?.description}
          id="description"
          className="textarea col-span-5  textarea-bordered"
          placeholder="Review description"
        ></textarea>
      </div>
      <button className="btn btn-block my-4 btn-secondary">Save Changes</button>
    </form>
  );
}
