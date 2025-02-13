import Slider from "react-slick";
import banner1 from "../../assets/grocery-banner-2.jpeg";
import banner2 from "../../assets/grocery-banner.png";

import slider2 from "../../assets/slider-image-2.jpeg";
import slider3 from "../../assets/slider-image-3.jpeg";

export default function MainSlider() {
  return (
    <>
      <div className="grid-cols-12 grid mb-4">
        <div className="lg:col-span-8 col-span-12 mb-10 lg:mb-0">
          <Slider
            className="lg:w-full w-full md:w-8/12 md:mx-auto"
            dots={true}
            arrows={false}
          >
            <img
              className="h-[350px] lg:w-full w-full md:w-8/12 md:mx-auto object-cover object-center"
              src={slider2}
              alt=""
            />
            <img
              className="h-[350px] lg:w-full w-full md:w-8/12 md:mx-auto object-cover object-center"
              src={slider3}
              alt=""
            />
          </Slider>
        </div>
        <div className="lg:col-span-4 col-span-12">
          <img
            className="h-[175px] lg:w-full w-full md:w-8/12 md:mx-auto object-cover object-center"
            src={banner1}
            alt=""
          />
          <img
            className="h-[175px] lg:w-full w-full md:w-8/12 md:mx-auto object-cover object-center"
            src={banner2}
            alt=""
          />
        </div>
      </div>
    </>
  );
}
