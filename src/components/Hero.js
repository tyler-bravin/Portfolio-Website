/**
 * @file Hero.js
 * @description This file contains the Hero component, which is the main landing
 * section of the website. It features a personal introduction, a brief
 * description, and a call-to-action button, all with smooth animations.
 * @author Tyler Bravin
 * @date 2025-08-28
 */

// --- Imports ---
import React from 'react';
import { motion } from 'framer-motion'; // For animation effects
import { FiMapPin } from 'react-icons/fi'; // Feather Icons for the location pin
import './Hero.css'; // Stylesheet for the hero component

/**
 * The Hero component is the first section a user sees. It uses Framer Motion
 * to animate each text element and the button, creating a dynamic visual effect
 * on page load.
 *
 * @returns {JSX.Element} The rendered hero section.
 */
const Hero = () => {
    return (
        /*
         * `motion.section` wraps the entire component to apply a fade-in animation
         * to the whole section at once.
         */
        <motion.section
            className="hero"
            initial={{ opacity: 0 }} // Starts completely transparent
            animate={{ opacity: 1 }} // Fades in to full opacity
            transition={{ duration: 1 }} // The animation duration
        >
            {/* Introductory line with a delayed animation. */}
            <motion.p initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                Hi, my name is
            </motion.p>
            {/* Main heading with a progressive animation delay. */}
            <motion.h1 initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
                Tyler Bravin.
            </motion.h1>
            {/* Secondary heading with its own progressive delay. */}
            <motion.h2 initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
                I build software and secure systems.
            </motion.h2>
            {/* Descriptive paragraph with a longer delay for a staggered effect. */}
            <motion.p className="hero-description" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.8 }}>
                I am a motivated Software Engineering student in my <span className="highlight">final year</span> at the University of Stirling, with expertise in Java, React, Python, and SQL.
                I have demonstrated success in <span className="highlight">mobile application development</span> and <span className="highlight">efficiency optimisation</span>.
                <br />
                I am actively seeking a graduate role to apply my technical knowledge and contribute to impactful projects.
            </motion.p>
            {/* The location element with a final progressive animation. */}
            <motion.div
                className="hero-location"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
            >
                <FiMapPin />
                <span>Falkirk, United Kingdom</span>
            </motion.div>

            {/* The call-to-action button, which slides up from the bottom. */}
            <motion.div
                className="hero-buttons"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
            >
                {/* `download` attribute ensures the browser prompts the user to save the file. */}
                <a href="/downloads/Tyler-Bravin-CV.pdf" className="button" download>
                    Download CV
                </a>
            </motion.div>
        </motion.section>
    );
};

// Exports the Hero component to be used in the main App component.
export default Hero;