import React, { useState } from "react";

const VehicleImages = ({ images }) => {
  const [mainImage, setMainImage] = useState(
    images[0] || "https://via.placeholder.com/400x200"
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img
        src={mainImage}
        alt="Main vehicle"
        className="w-full object-cover rounded-xl border-2 border-gray-100 cursor-pointer my-2"
      />
      <div className="flex gap-2 overflow-x-auto">
        {images.map((image, index) => (
          <div className="flex flex-col justify-center w-60 h-42 rounded-xl border-2 border-gray-300 cursor-pointer hover:shadow-lg transition-shadow">
            <img
              key={index}
              src={image}
              alt={`Vehicle ${index + 1}`}
              className="object-cover rounded-lg cursor-pointer"
              onClick={() => setMainImage(image)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleImages;
