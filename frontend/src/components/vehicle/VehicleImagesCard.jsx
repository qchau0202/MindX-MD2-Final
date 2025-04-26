// import React from "react";

// const VehicleImagesCard = ({ bannerImage, subImages }) => {
//   return (
//     <div>
//       <div className="rounded-lg bg-blue-600 p-4 md:p-6 text-white">
//         <h1 className="text-xl md:text-3xl font-bold mb-4 leading-tight">
//           Xe thể thao với thiết kế và khả năng tăng tốc tốt nhất
//         </h1>
//         <p className="text-sm md:text-lg mb-6">
//           An toàn và thoải mái khi lái một chiếc xe thể thao hiện đại và thanh
//           lịch
//         </p>
//         <img
//           src={bannerImage}
//           alt="Xe"
//           className="w-full h-48 md:h-64 object-cover rounded-lg mb-4"
//         />
//       </div>
//       <div className="grid grid-cols-3 gap-2 mt-4">
//         {subImages.map((img, index) => (
//           <img
//             key={index}
//             src={img}
//             alt={`Hình ${index + 1}`}
//             className="w-full h-16 md:h-24 object-cover rounded-lg border-2 border-blue-600"
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default VehicleImagesCard;

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
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <div className="flex gap-2 overflow-x-auto">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Vehicle ${index + 1}`}
            className="w-20 h-20 object-cover rounded-lg cursor-pointer"
            onClick={() => setMainImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default VehicleImages;