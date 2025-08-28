/**
 * @file useDarkMode.js
 * @description This custom React hook provides functionality for managing and
 * toggling between light and dark modes. It persists the user's theme preference
 * in local storage and applies the theme to the document's root element.
 * @author Tyler Bravin
 * @date 2025-08-28
 */

// --- Imports ---
import { useState, useEffect } from 'react';

/**
 * A custom hook to handle the dark/light mode state for the application.
 * It reads from and writes to local storage to remember the user's preference.
 *
 * @returns {[string, Function]} An array containing the current theme string ('light' or 'dark')
 * and a function to toggle the theme.
 *
 * @example
 * const [theme, toggleTheme] = useDarkMode();
 */
export const useDarkMode = () => {
    // State to store the current theme. It initializes by checking local storage
    // first and defaults to 'dark' if no preference is found.
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    /**
     * Toggles the theme between 'light' and 'dark'.
     */
    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    // This effect runs whenever the `theme` state changes.
    useEffect(() => {
        // Persist the new theme preference to local storage.
        localStorage.setItem('theme', theme);
        // Update the `data-theme` attribute on the `<html>` element. This attribute
        // is used by the CSS to apply the correct styles.
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]); // The effect's dependency array. It will re-run when `theme` changes.

    // Return the current theme and the toggle function for easy use in components.
    return [theme, toggleTheme];
};