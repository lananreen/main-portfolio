import "./Footer.css";

export default function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="footer__contents" data-reveal="zoom">
        <div className="footer__contact" aria-labelledby="footer-heading">
          <div className="footer__card">
            <h2 id="footer-heading">Let's work together</h2>
            <p>Have a project, a role, or just want to chat? My inbox is open.</p>
          </div>
          <button type="button" className="footer__email">
            lananreen@gmail.com
          </button>
        </div>
        <p className="footer__credit">
          This portfolio is made by me using React and deployed with Vercel. The
          design assets include Lenis and React Bits.
        </p>
      </div>
    </footer>
  );
}
