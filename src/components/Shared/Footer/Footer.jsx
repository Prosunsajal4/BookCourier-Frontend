import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
// X (Twitter) logo SVG
const XIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.53 3H21.5L14.42 10.91L22.75 21H16.19L10.89 14.37L4.91 21H0.94L8.44 12.61L0.42 3H7.13L12 9.13L17.53 3ZM16.37 19.13H18.19L6.5 4.75H4.54L16.37 19.13Z"
      fill="currentColor"
    />
  </svg>
);

const Footer = () => {
  return (
    <footer className="px-4 py-8 bg-base-200 text-base-content border-t mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-6">
        {/* Quick Links */}
        <div>
          <h3 className="font-bold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/books" className="hover:underline">
                Books
              </a>
            </li>
            <li>
              <a href="/dashboard" className="hover:underline">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        {/* Contact Details */}
        <div>
          <h3 className="font-bold mb-2">Contact</h3>
          <ul className="space-y-1 text-sm">
            <li>
              Email:{" "}
              <a href="mailto:info@bookcourier.com" className="hover:underline">
                info@bookcourier.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a href="tel:+880123456789" className="hover:underline">
                +880 1234-56789
              </a>
            </li>
            <li>Address: Dhaka, Bangladesh</li>
          </ul>
        </div>
        {/* Social Icons */}
        <div>
          <h3 className="font-bold mb-2">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook className="text-2xl hover:text-blue-600" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className="text-2xl hover:text-pink-500" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-2xl hover:text-blue-700" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub className="text-2xl hover:text-gray-700" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="flex items-center"
            >
              <XIcon />
            </a>
          </div>
        </div>
        {/* Copyright */}
        <div className="flex items-end">
          <div className="text-sm text-base-content/60">
            © 2025-2026 BookCourier – Library-to-Home Delivery System. All
            rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
