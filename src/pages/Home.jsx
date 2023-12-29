import Footer from "../components/Footer";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, EffectCreative } from "swiper/modules";
import useLoadPublicData from "../Hooks/useLoadPublicData";
import { useEffect } from "react";

const Home = () => {
  const { data: players, refetch } = useLoadPublicData("/players");
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5000);

    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <div className="bg-gray-800">
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://i.postimg.cc/rwFpzBC1/sports-Banner.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-20"></div>
        <div className="hero-content text-center text-neutral-content">
          {/* <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div> */}
        </div>
      </div>
      <Swiper
        spaceBetween={30}
        // slidesPerView={5}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        grabCursor={true}
        effect={'creative'}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        modules={[Autoplay, EffectCreative]}
      >
        {players?.map((player) => (
          <SwiperSlide key={player?._id}>
            <div className="card shadow-xl bg-green-700 rounded-none text-white text-center">
              <div className="card-body">
                <h2 className="text-5xl">{player?.name}</h2>
                <p className="text-xl">Country : {player?.country}</p>
                <p className="text-xl">Score : {player?.score}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Footer></Footer>
    </div>
  );
};

export default Home;
