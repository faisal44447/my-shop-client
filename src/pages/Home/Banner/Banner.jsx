import ShopBanner from ' ../../../src/assets/Shop Banner.jpg'; 

const Banner = () => {
    return (
        <div className="w-full max-w-5xl mx-auto mt-5">
           <img className="w-full  object-cover rounded-2xl shadow-5xl" src={ShopBanner} alt="Shop Banner" />
        </div>
    );
};

export default Banner;