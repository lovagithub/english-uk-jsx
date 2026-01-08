import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-links">
        <button onClick={() => navigate("/")}>Hem</button>
        <button onClick={() => navigate("/contact")}>Kontakt</button>
      </div>

        © 2026 English Tutor • Learn English with AI
      
    </footer>
  );
};

export default Footer;
