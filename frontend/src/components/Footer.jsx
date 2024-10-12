const Footer = () => {
  return (
    <footer className="footer bg-slate-700 px-12 py-2 text-white">
      <div className="footer-content flex items-center justify-between">
        <p>&copy; 2024 E-Commerce Site. All rights reserved.</p>
        <ul className="footer-links">
          <li>
            <a href="/privacy-policy">Privacy Policy</a>
          </li>
          <li>
            <a href="/terms-of-service">Terms of Service</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
