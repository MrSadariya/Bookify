import React from 'react';
import './Footer.css'; // Optional: Add this if you want to style the footer

const Footer = () => {
  return (
    <footer style={{marginTop:"1rem"}} className="footer">
      <div className="footer-container">
        <p>&copy; 2024 Parth Sadariya. All rights reserved.</p>
        {/* <ul className="footer-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul> */}
      </div>
    </footer>
  );
};

export default Footer;
