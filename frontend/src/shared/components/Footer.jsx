import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer 
    className="bg-gray-900 text-white py-10  w-full  "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* Logo / Brand */}
          <div>
            <h2 className="text-2xl font-bold mb-4">YourBrand</h2>
            <p className="text-gray-400 text-sm">
              Quality products, excellent support, and fast delivery.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/shop" className="hover:text-white">Shop</a></li>
              <li><a href="/about" className="hover:text-white">About</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/faq" className="hover:text-white">FAQ</a></li>
              <li><a href="/returns" className="hover:text-white">Returns</a></li>
              <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 text-gray-400 text-xl">
              <a href="#"><FaFacebookF className="hover:text-white" /></a>
              <a href="#"><FaTwitter className="hover:text-white" /></a>
              <a href="#"><FaInstagram className="hover:text-white" /></a>
              <a href="#"><FaLinkedinIn className="hover:text-white" /></a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-10 text-center text-gray-500 text-sm border-t border-gray-700 pt-6">
          &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;