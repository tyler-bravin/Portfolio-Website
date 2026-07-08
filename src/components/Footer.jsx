/**
 * @file Footer.js
 * @description Site footer: socials and a mono credit line.
 * @author Tyler Bravin
 */

import React from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-socials">
                <a href="https://github.com/tyler-bravin" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <FiGithub />
                </a>
                <a href="https://www.linkedin.com/in/tyler-bravin-2780ab201/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <FiLinkedin />
                </a>
                <a href="mailto:tylerbravin02@gmail.com" aria-label="Email">
                    <FiMail />
                </a>
            </div>
            <p className="footer-credit">
                designed &amp; built by <span>Tyler Bravin</span> — react, css, no template
            </p>
        </footer>
    );
};

export default Footer;
