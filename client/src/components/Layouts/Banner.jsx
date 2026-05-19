import img1 from "../../assets/images/default.avif";
import img2 from "../../assets/images/bn1.avif";
import img3 from "../../assets/images/bn2.avif";

const BannerImg = [
  { image: img1 },
  { image: img2 },
  { image: img3 },
];

const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {BannerImg.map((e, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl shadow-md"
          >
            <img
              src={e.image}
              alt="banner"
              className="w-full h-[240px] sm:h-[300px] lg:h-[360px] object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
