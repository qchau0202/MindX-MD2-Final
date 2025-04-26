import { Button } from "antd";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="p-6 bg-gray-100">
      {/* Advertising Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="relative rounded-xl shadow-lg">
          <img
            src="https://morent.ir/assets/herocard-1.png"
            alt="hero-card"
            className="w-full h-full object-cover rounded-xl"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-y-4 py-1 px-2 xl:px-4 xl:py-3 justify-center xl:gap-y-1 2xl:gap-y-4 md:gap-y-1 md:p-3">
            <h6 className="text-white xl:leading-relaxed text-xl xl:text-2xl whitespace-nowrap xl:whitespace-normal xl:w-[50%]">
              The Best Platform for Car Rental
            </h6>
            <p className="text-white xl:whitespace-normal xl:w-[50%] md:text-lg">
              Ease of doing a car rental safely and reliably. Of course at a low
              price.
            </p>
            <div>
              <Link to="/vehicles">
                <button className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-3 rounded-md text-sm border-none">
                  Rental Car
                </button>
              </Link>
            </div>
            <div className="flex justify-center">
              <img
                className="w-[50%]"
                src="https://morent.ir/assets/hero-car.png"
                alt="hero car"
              />
            </div>
          </div>
        </div>
        <div className="relative rounded-xl shadow-lg hidden md:block">
          <img
            src="https://morent.ir/assets/heorcard-2.png"
            alt="hero-card"
            className="w-full h-full object-cover rounded-xl"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-y-4 py-1 px-2 xl:px-4 xl:py-3 justify-center xl:gap-y-1 2xl:gap-y-4 md:gap-y-1 md:p-3">
            <h6 className="text-white xl:leading-relaxed text-xl xl:text-2xl whitespace-nowrap xl:whitespace-normal xl:w-[50%]">
              Easy way to rent a car at a low price
            </h6>
            <p className="text-white xl:whitespace-normal xl:w-[50%] md:text-lg">
              Providing cheap car rental services and safe and comfortable
              facilities.
            </p>
            <div>
              <Link to="/vehicles">
                <button className="bg-blue-300 hover:bg-blue-500 text-white px-4 py-3 rounded-md text-sm border-none">
                  Rental Car
                </button>
              </Link>
            </div>
            <div className="flex justify-center">
              <img
                className="w-[50%]"
                src="https://morent.ir/assets/hero-car2.png"
                alt="hero car rental"
              />
            </div>
          </div>
        </div>
      </div>
      {/* <SearchBar /> */} 
    </div>
  );
};

export default HeroSection;
