/**
 * @file Header.js
 * @description This file contains the Header component, which serves as the main
 * navigation bar for the website. It includes a logo, a desktop navigation menu,
 * a theme switcher, and a responsive mobile menu with a hamburger icon.
 * @author Tyler Bravin
 * @date 2025-08-28
 */

// --- Imports ---
import React, { useState } from 'react';
import { motion } from 'framer-motion'; // For smooth header animations
import { FiMenu, FiX } from 'react-icons/fi'; // Feather Icons for hamburger and close buttons
import ThemeSwitcher from './ThemeSwitcher'; // Component to handle light/dark mode
import './Header.css'; // Stylesheet for the header component

/**
 * The Header component provides the main navigation functionality and theme switching.
 * It uses `useState` to manage the mobile menu's open/close state.
 *
 * @param {object} props The component's props.
 * @param {string} props.theme The current theme ('light' or 'dark').
 * @param {Function} props.toggleTheme A function to switch the theme.
 * @returns {JSX.Element} The rendered header element.
 */
const Header = ({ theme, toggleTheme }) => {
    // State to track whether the mobile menu is open or closed.
    const [isOpen, setIsOpen] = useState(false);

    /**
     * Scrolls the window to a specific element on the page based on its ID.
     * This is used for navigating to different sections.
     * @param {string} id The ID of the element to scroll to.
     */
    const scrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        // Closes the mobile menu after a navigation link is clicked.
        setIsOpen(false);
    };

    return (
        /*
         * `motion.header` from Framer Motion is used to add a subtle animation
         * to the header when the page first loads.
         */
        <motion.header
            className="header"
            initial={{ y: -100 }} // Starts the header 100px above its final position
            animate={{ y: 0 }} // Animates the header to its final position
            transition={{ duration: 0.5 }} // The duration of the animation
        >
            {/* The website's logo, which also acts as a brand identifier. */}
            <div className="logo">TB</div>

            {/*
             * Desktop navigation menu, which is hidden on mobile screens
             * via a media query in the CSS.
             */}
            <div className="header-right-desktop">
                <nav>
                    <ul>
                        {/* * Navigation buttons that trigger smooth scrolling to
                         * their respective sections.
                         */}
                        <li><button onClick={() => scrollTo('about')}>About</button></li>
                        <li><button onClick={() => scrollTo('experience')}>Experience</button></li>
                        <li><button onClick={() => scrollTo('projects')}>Projects</button></li>
                        <li><button onClick={() => scrollTo('contact')}>Contact</button></li>
                    </ul>
                </nav>
                {/* The ThemeSwitcher component for toggling between themes. */}
                <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
            </div>

            {/*
             * The hamburger icon for the mobile menu. When clicked, it toggles
             * the `isOpen` state, which in turn toggles the icon and the menu's visibility.
             */}
            <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FiX /> : <FiMenu />}
            </div>

            {/*
             * The mobile menu container. The `open` class is conditionally
             * applied based on the `isOpen` state to slide the menu into view.
             */}
            <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
                <nav>
                    <ul>
                        {/*
                         * Navigation links for the mobile menu. These also
                         * trigger the `scrollTo` function.
                         */}
                        <li><button onClick={() => scrollTo('about')}>About</button></li>
                        <li><button onClick={() => scrollTo('experience')}>Experience</button></li>
                        <li><button onClick={() => scrollTo('projects')}>Projects</button></li>
                        <li><button onClick={() => scrollTo('contact')}>Contact</button></li>
                    </ul>
                </nav>
                {/* The theme switcher is also included in the mobile menu. */}
                <div className="mobile-theme-switcher">
                    <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
                </div>
            </div>
        </motion.header>
    );
};

// Exports the Header component for use in other parts of the application.
export default Header;