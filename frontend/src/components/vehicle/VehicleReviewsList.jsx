import React from "react";

const VehicleReviewsList = ({ vehicleId }) => {
  const mockReviews = [
    {
      id: 1,
      user: "John Doe",
      rating: 4,
      content: "Great car, very comfortable and fuel-efficient.",
      date: "2023-10-01",
    },
    {
      id: 2,
      user: "Jane Smith",
      rating: 5,
      content: "Amazing experience, highly recommend!",
      date: "2023-10-02",
    },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      {mockReviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        mockReviews.map((review) => (
          <div key={review.id} className="my-4 border-b border-b-gray-200 pb-4">
            <div className="flex justify-between">
              <span className="text-lg font-semibold">{review.user}</span>
              <span className="text-gray-500">{review.date}</span>
            </div>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < review.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.538 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.783.57-1.838-.197-1.538-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.575 9.397c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.97z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-500">{review.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default VehicleReviewsList;
