// Banner.js
import './Banner.css'; // Import the CSS file for styling

const Banner = () => {
  return (
    <div className="banner shine-overlay ">
      <img src='https://shop.mtrfoods.com/cdn/shop/collections/Pickle.jpg' alt='' className="banner-image " />
      <div className="shine2"></div> {/* The shine effect */}
    </div>
  );
};

export default Banner;
