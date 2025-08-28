/**
 * @file Loader.js
 * @description This file contains a simple loading component that displays a
 * placeholder logo while the rest of the application is loading.
 * @author Tyler Bravin
 * @date 2025-08-28
 */

// --- Imports ---
import React from 'react';
import './Loader.css'; // Stylesheet for the loader component

/**
 * The Loader component is a simple, presentational component that
 * displays a spinning or pulsing logo while the main content loads.
 *
 * @returns {JSX.Element} The rendered loading screen element.
 */
const Loader = () => {
    return (
        /*
         * The main container for the loader. It's styled to cover the entire
         * viewport and centrally align its contents.
         */
        <div className="loader-container">
            {/*
             * The placeholder logo. The "TB" initials are a stand-in for a
             * more complex logo, and the `logo-placeholder` class applies
             * the styling and animation.
             */}
            <div className="logo-placeholder">TB</div>
        </div>
    );
};

// Exports the Loader component for use in the main application.
export default Loader;