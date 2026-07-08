/**
 * @file Header.js
 * @description Slim, fixed status-bar navigation. Mono shell-prompt logo on the
 * left, section nav + socials + theme toggle on the right. Collapses to a
 * full-width dropdown menu on mobile.
 * @author Tyler Bravin
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiGithub, FiLinkedin } from 'react-icons/fi';
import ThemeSwitcher from './ThemeSwitcher';
import './Header.css';

const NAV_ITEMS = [
    { id: 'about', label: 'about' },
    { id: 'projects', label: 'projects' },
    { id: 'experience', label: 'experience' },
    { id: 'contact', label: 'contact' },
];

const Header = ({ theme, toggleTheme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    // Scrollspy: highlight the nav item for whichever section is on screen.
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            // A narrow band around the middle of the viewport decides "active".
            { rootMargin: '-40% 0px -55% 0px' }
        );
        ['hero', ...NAV_ITEMS.map((i) => i.id)].forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
    };

    return (
        <motion.header
            className="header"
            initial={{ y: -70 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
        >
            <button
                className="logo"
                onClick={() => scrollTo('hero')}
                aria-label="Back to top"
            >
                <span className="logo-user">tyler</span>
                <span className="logo-at">@</span>
                <span className="logo-host">bravin</span>
                <span className="logo-path">:~$</span>
            </button>

            <div className="header-right-desktop">
                <nav aria-label="Primary">
                    <ul>
                        {NAV_ITEMS.map((item) => (
                            <li key={item.id}>
                                <button
                                    className={activeSection === item.id ? 'nav-active' : ''}
                                    onClick={() => scrollTo(item.id)}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="header-divider" aria-hidden="true" />
                <div className="header-socials">
                    <a href="https://github.com/tyler-bravin" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <FiGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/tyler-bravin-2780ab201/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <FiLinkedin />
                    </a>
                </div>
                <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
            </div>

            <button
                className="hamburger"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
            >
                {isOpen ? <FiX /> : <FiMenu />}
            </button>

            <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
                <nav aria-label="Mobile">
                    <ul>
                        {NAV_ITEMS.map((item) => (
                            <li key={item.id}>
                                <button onClick={() => scrollTo(item.id)}>
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="mobile-menu-footer">
                    <div className="header-socials">
                        <a href="https://github.com/tyler-bravin" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <FiGithub />
                        </a>
                        <a href="https://www.linkedin.com/in/tyler-bravin-2780ab201/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <FiLinkedin />
                        </a>
                    </div>
                    <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
