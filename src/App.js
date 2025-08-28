/**
 * @file App.js
 * @description This is the main application component, serving as the root of
 * the React application. It manages global state such as loading and theme,
 * and orchestrates the layout by rendering the various components that make up
 * the portfolio website.
 * @author Tyler Bravin
 * @date 2025-08-28
 */

// --- Imports ---
import React, { useState, useEffect } from 'react';
import './App.css'; // Main application layout styles
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Cursor from './components/Cursor'; // Custom cursor component
import Sidebars from './components/Sidebars';
import Loader from './components/Loader';
import Experience from "./components/Experience";
import { useDarkMode } from './hooks/useDarkMode'; // Custom hook for theme management
import ParticleBackground from "./components/ParticleBackground";
import Footer from "./components/Footer";

/**
 * The main App component. It handles the initial loading state, theme management,
 * and the overall page structure.
 *
 * @returns {JSX.Element} The rendered application.
 */
function App() {
    // State to manage whether the initial loading screen is active.
    const [isLoading, setIsLoading] = useState(true);
    // Custom hook to manage the dark/light mode state and toggle function.
    const [theme, toggleTheme] = useDarkMode();

    // Effect to simulate a loading period.
    useEffect(() => {
        // Sets a timer to turn off the loading screen after 2 seconds.
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        // Cleanup function to clear the timer if the component unmounts early.
        return () => clearTimeout(timer);
    }, []);

    // Effect to dynamically change the favicon based on the current theme.
    useEffect(() => {
        const oldLink = document.getElementById('favicon');
        const newLink = document.createElement('link');
        newLink.id = 'favicon';
        newLink.rel = 'icon';
        newLink.href = theme === 'dark' ? '/favicon-dark.ico' : '/favicon-light.ico';

        // Remove the old favicon link if it exists.
        if (oldLink) {
            document.head.removeChild(oldLink);
        }

        // Add the new favicon link to the document's head.
        document.head.appendChild(newLink);
    }, [theme]); // The effect re-runs whenever the `theme` changes.

    // Conditional rendering: show the Loader component while `isLoading` is true.
    if (isLoading) {
        return <Loader />;
    }

    // Main application content, rendered after the loading screen.
    return (
        <>
            {/* These components are outside the main `App` div for proper z-indexing */}
            <ParticleBackground theme={theme} />
            <Cursor />
            <div className="App">
                <Header theme={theme} toggleTheme={toggleTheme} />
                {/* A spacer to prevent content from being hidden behind the fixed header. */}
                <div className="header-spacer" />
                <Sidebars />
                {/* The `main` tag contains the scrollable sections of the page. */}
                <main>
                    {/* Each section is wrapped in a div with an ID for navigation. */}
                    <div id="hero"><Hero /></div>
                    <div id="about"><About /></div>
                    <div id="projects"><Projects /></div>
                    <div id="experience"><Experience /></div>
                    <div id="contact"><Contact /></div>
                </main>
                <Footer />
            </div>
        </>
    );
}

// Exports the App component for rendering in `index.js`.
export default App;