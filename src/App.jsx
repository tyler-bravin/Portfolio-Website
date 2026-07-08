/**
 * @file App.js
 * @description Root component. Manages theme state and page structure.
 * @author Tyler Bravin
 */

import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useDarkMode } from './hooks/useDarkMode';

function App() {
    const [theme, toggleTheme] = useDarkMode();

    // Swap favicon to match the active theme.
    useEffect(() => {
        const oldLink = document.getElementById('favicon');
        const newLink = document.createElement('link');
        newLink.id = 'favicon';
        newLink.rel = 'icon';
        // Note: the repo ships favicon.ico (dark) and favicon-light.ico.
        newLink.href = theme === 'dark' ? '/favicon.ico' : '/favicon-light.ico';
        if (oldLink) document.head.removeChild(oldLink);
        document.head.appendChild(newLink);
    }, [theme]);

    return (
        <div className="App">
            <Header theme={theme} toggleTheme={toggleTheme} />
            <main>
                <div id="hero"><Hero /></div>
                <div id="about"><About /></div>
                <div id="projects"><Projects /></div>
                <div id="experience"><Experience /></div>
                <div id="contact"><Contact /></div>
            </main>
            <Footer />
        </div>
    );
}

export default App;
