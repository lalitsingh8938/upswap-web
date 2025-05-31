import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-10 px-4 md:px-20 border-t">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <div className="text-3xl font-bold text-orange-500 flex items-center gap-1">
            <div className="flex items-center ml-10">
              <img
                src="/upswap.png" // Assuming this path is correct
                alt="UpSwap Feature"
                className="w-32 h-auto rounded-md cursor-pointer" // Added h-auto for aspect ratio, cursor-pointer for clickability
                // onClick={() => navigate("/")} // Assuming clicking logo goes to home
              />
            </div>
          </div>
          <p className="mt-4 text-sm">
            An app in which there are two types of user, one is user and second
            is vendor.
          </p>
          <div className="flex gap-9 mt-4 text-gray-500 cursor-pointer">
            <FaFacebookF className="text-2xl text-blue-500 hover:text-blue-600" />
            <FaInstagram className="text-2xl text-pink-500 hover:text-pink-600" />
            <FaTwitter className="text-2xl text-blue-500 hover:text-blue-400" />
            <FaYoutube className="text-2xl text-red-500 hover:text-red-600" />
          </div>
        </div>

        {/* Product */}
        <div className="">
          <h4 className="font-semibold mb-2 ">Product</h4>
          <ul className="space-y-1 text-sm ">
            <li>Pricing</li>
            <li>Features</li>
            <li>Case Studies</li>
            <li>Reviews</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold mb-2">Company</h4>
          <ul className="space-y-1 text-sm">
            <li>About Us</li>
            <li>Careers</li>
            <li>Contact Us</li>
            <li>Blog</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-semibold mb-2">Support</h4>
          <ul className="space-y-1 text-sm">
            <li>Help Center</li>
            <li>Report a bug</li>
            <li>Chat Support</li>
          </ul>

          {/* Newsletter */}
          <div className="mt-4">
            <p className="font-semibold text-sm mb-2">
              Subscribe to our Newsletter
            </p>
            <div className="flex">
              <input
                type="text"
                placeholder="Email"
                className="p-2 border border-gray-300 rounded-l-md w-full text-sm focus:outline-none"
              />
              <button className="bg-orange-500 text-white px-4 rounded-r-md text-sm hover:bg-orange-600">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
