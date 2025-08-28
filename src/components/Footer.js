/**
 * @file Footer.js
 * @description This file contains the Footer component, which renders the closing
 * section of the website. It includes social media links (for mobile view)
 * and a design credit.
 * @author Tyler Bravin
 * @date 2025-08-28
 */

// --- Imports ---
import React from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'; // Feather Icons for social media
import './Footer.css'; // Component-specific styles

/**
 * The Footer component is a simple presentational component that displays
 * social links and a credit line at the bottom of the page.
 *
 * @returns {JSX.Element} The rendered footer element.
 */
const Footer = () => {
    return (
        <footer className="footer">
            {/*
             * This div contains social media links. Per the CSS, it is typically
             * hidden on desktop views and only displayed on smaller screens.
             */}
            <div className="footer-socials">
                {/*
                 * External link to GitHub.
                 * `target="_blank"` opens the link in a new tab.
                 * `rel="noopener noreferrer"` is a security best practice for external links.
                 */}
                <a href="https://github.com/tyler-bravin" target="_blank" rel="noopener noreferrer">
                    <FiGithub />
                </a>
                <a href="https://www.linkedin.com/in/tyler-bravin-2780ab201/" target="_blank" rel="noopener noreferrer">
                    <FiLinkedin />
                </a>
                {/* A "mailto" link to open the user's default email client. */}
                <a href="mailto:tylerbravin02@gmail.com">
                    <FiMail />
                </a>
            </div>

            {/* The credit line for the website's design and development. */}
            <p>Designed & Built by Tyler Bravin</p>
        </footer>
    );
};

// Exports the Footer component for use in the main application layout.
export default Footer;