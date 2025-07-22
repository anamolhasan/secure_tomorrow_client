import { Link } from 'react-router';
import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10 px-5 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & Tagline */}
        <div>
          <Link to="/" className="text-2xl font-bold text-white">
            SecureTomorrow<span className="text-blue-500">+</span>
          </Link>
          <p className="mt-3 text-sm">
            Empowering you to plan your future with trusted life insurance solutions.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-blue-400"><FaFacebook size={20} /></a>
            <a href="#" className="hover:text-blue-400"><FaTwitter size={20} /></a>
            <a href="#" className="hover:text-blue-400"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-blue-400"><FaLinkedin size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/all-policy" className="hover:text-blue-400">Policies</Link></li>
            <li><Link to="/blog" className="hover:text-blue-400">Blog</Link></li>
            <li><Link to="/agents" className="hover:text-blue-400">Agents</Link></li>
            <li><Link to="/quote" className="hover:text-blue-400">Get a Quote</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/faq" className="hover:text-blue-400">FAQs</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400">Contact Us</Link></li>
            <li><Link to="/claim" className="hover:text-blue-400">File a Claim</Link></li>
            <li><Link to="/terms" className="hover:text-blue-400">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
          <p className="text-sm mb-2">Get latest updates & offers</p>
          <form>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-2 rounded mb-3 text-gray-900"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm">
        © {new Date().getFullYear()} SecureTomorrow+. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
