/**
 * @file Sidebars.js
 * @description This file contains the Sidebars component, which renders a pair
 * of fixed sidebars on the left and right sides of the viewport. The left
 * sidebar contains social media icons, while the right one features a vertical
 * email link. Both are animated with Framer Motion.
 * @author Tyler Bravin
 * @date 2025-08-28
 */

// --- Imports ---
import React from 'react';
import { motion } from 'framer-motion'; // For smooth animations
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'; // Feather icons for social links
import './Sidebars.css'; // Stylesheet for the sidebars

/**
 * The Sidebars component is a presentational component that displays
 * fixed, animated sidebars with social and contact links.
 *
 * @returns {JSX.Element} The rendered sidebar elements.
 */
const Sidebars = () => {
    return (
        <>
            {/*
             * The left sidebar, containing social media links.
             * `motion.div` is used to create a fade-in and slide-in animation.
             */}
            <motion.div
                className="sidebar left"
                initial={{ opacity: 0, x: -50 }} // Starts transparent and off-screen to the left
                animate={{ opacity: 1, x: 0 }} // Animates to full opacity and its final position
                transition={{ duration: 0.5, delay: 1.5 }} // Sets the animation duration and a delay
            >
                {/* External link to GitHub. `rel` is a security best practice. */}
                <a href="https://github.com/tyler-bravin" target="_blank" rel="noopener noreferrer"><FiGithub /></a>
                {/* External link to LinkedIn. */}
                <a href="https://www.linkedin.com/in/tyler-bravin-2780ab201/" target="_blank" rel="noopener noreferrer"><FiLinkedin /></a>
                {/* `mailto` link to open the default email client. */}
                <a href="mailto:tylerbravin02@gmail.com"><FiMail /></a>
                {/* A decorative vertical line, styled via CSS. */}
                <div className="line"></div>
            </motion.div>

            {/*
             * The right sidebar, containing the email link.
             * It has a similar animation, sliding in from the right.
             */}
            <motion.div
                className="sidebar right"
                initial={{ opacity: 0, x: 50 }} // Starts transparent and off-screen to the right
                animate={{ opacity: 1, x: 0 }} // Animates to its final position
                transition={{ duration: 0.5, delay: 1.5 }}
            >
                {/* The `mailto` link with vertical text styling. */}
                <a href="mailto:tylerbravin02@gmail.com" className="email-link">tylerbravin02@gmail.com</a>
                {/* A decorative vertical line. */}
                <div className="line"></div>
            </motion.div>
        </>
    );
};

// Exports the component for use in the main application layout.
export default Sidebars;