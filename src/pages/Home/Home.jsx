import LatestBooks from "../../components/Home/LatestBooks";
import Slider from "../../components/Shared/Slider/Slider";
const Home = () => {
  const heroSlides = [
    {
      bg: "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600",
      title: "Discover Your Next Favorite Book",
      subtitle:
        "Curated picks, fast delivery, and exclusive deals for readers.",
      cta: { href: "/books", label: "Explore Collections" },
    },
    {
      bg: "bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600",
      title: "Fresh Reads, Delivered Quickly",
      subtitle: "From bestsellers to hidden gems—add to wishlist instantly.",
      cta: { href: "/dashboard/my-wishlist", label: "View Wishlist" },
    },
    {
      bg: "bg-gradient-to-r from-amber-600 via-orange-600 to-red-600",
      title: "Support Local Sellers",
      subtitle: "Great books from trusted sellers in your community.",
      cta: { href: "/dashboard/seller/add-book", label: "Sell a Book" },
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <Slider slides={heroSlides} interval={5000} />
      </div>
      <LatestBooks />
      {/* More components */}
      {/* Coverage Section: Animated Map */}
      <div className="mt-16">
        <CoverageMap />
      </div>
      {/* Why Choose BookCourier Section */}
      <div className="mt-16">
        <WhyChooseBookCourier />
      </div>
      {/* Extra Section 1 */}
      <div className="mt-16">
        <ExtraSectionOne />
      </div>
      {/* Extra Section 2 */}
      <div className="mt-16">
        <ExtraSectionTwo />
      </div>
    </div>
  );
};
import CoverageMap from "../../components/Home/CoverageMap";
import WhyChooseBookCourier from "../../components/Home/WhyChooseBookCourier";
import ExtraSectionOne from "../../components/Home/ExtraSectionOne";
import ExtraSectionTwo from "../../components/Home/ExtraSectionTwo";

export default Home;
