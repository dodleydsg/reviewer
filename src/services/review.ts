import { makeRequest } from "./makeRequest";

export function getReviews() {
  return makeRequest("/reviews");
}
export function addtReview() {
  return makeRequest("/reviews", { method: "post" });
}

export function deleteReview(id: string) {
  return makeRequest(`/reviews/${id}`, { method: "delete" });
}

export function getReview(id: string) {
  return makeRequest(`/reviews/${id}`, { method: "get" });
}

export function updateReview(id: string) {
  return makeRequest(`/reviews/${id}`, { method: "put" });
}
