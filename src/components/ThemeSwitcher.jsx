/**
 * @file ThemeSwitcher.js
 * @description This file contains the ThemeSwitcher component, a button that allows
 * users to toggle the website's color scheme between light and dark modes. The
 * icon displayed changes dynamically based on the current theme.
 * @author Tyler Bravin
 * @date 2025-08-28
 */

// --- Imports ---
import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi'; // Feather icons for sun and moon
import './ThemeSwitcher.css'; // Stylesheet for the theme switcher button

/**
 * The ThemeSwitcher component is a simple button that toggles the application's theme.
 * It uses conditional rendering to show a moon icon for the light theme and a
 * sun icon for the dark theme.
 *
 * @param {object} props The component's props.
 * @param {string} props.theme The current theme ('light' or 'dark').
 * @param {Function} props.toggleTheme A function to be called when the button is clicked.
 * @returns {JSX.Element} The rendered theme switcher button.
 */
const ThemeSwitcher = ({ theme, toggleTheme }) => {
    return (
        /*
         * The button element with a class for styling and an `onClick` handler
         * that triggers the theme change.
         */
        <button className="theme-switcher" onClick={toggleTheme}>
            {/*
             * Conditional rendering: if the theme is 'light', display the moon icon;
             * otherwise, display the sun icon.
             */}
            {theme === 'light' ? <FiMoon /> : <FiSun />}
        </button>
    );
};

// Exports the component for use in other parts of the application.
export default ThemeSwitcher;