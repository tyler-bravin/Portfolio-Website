/**
 * @file ParticleBackground.js
 * @description This file creates a dynamic, animated particle background
 * for the website using the `particles.js` library. It handles loading the
 * library, updating particle count based on screen size, and changing particle
 * colors to match the current theme.
 * @author Tyler Bravin
 * @date 2025-08-28
 */

// --- Imports ---
import React, { useState, useEffect, useRef } from 'react';

/**
 * The ParticleBackground component renders a canvas with animated particles.
 * It dynamically loads the particles.js library and reconfigures itself
 * based on the current theme and window size.
 *
 * @param {object} props The component's props.
 * @param {string} props.theme The current theme ('light' or 'dark').
 * @returns {JSX.Element} The rendered particle background element.
 */
const ParticleBackground = ({ theme }) => {
    // A ref to hold a reference to the DOM element where particles will be rendered.
    const particlesRef = useRef(null);
    // A ref to store the script element to prevent it from being loaded multiple times.
    const scriptRef = useRef(null);
    // A unique ID for the particle canvas element, to prevent conflicts.
    const particleId = useRef(`particles-${Math.random().toString(36).substring(2, 9)}`);

    // State to hold the number of particles, based on window width.
    const [particleCount, setParticleCount] = useState(window.innerWidth < 768 ? 40 : 100);

    // Effect to update particle count whenever the window is resized.
    useEffect(() => {
        const handleResize = () => {
            setParticleCount(window.innerWidth < 768 ? 40 : 100);
        };

        window.addEventListener('resize', handleResize);
        // Cleanup function to remove the event listener when the component unmounts.
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Effect to initialize or re-initialize particles based on theme or count changes.
    useEffect(() => {
        // Defines particle and line colors based on the current theme prop.
        const particleColor = theme === 'light' ? '#352f44' : '#ccd6f6';
        const lineColor = theme === 'light' ? '#5c5470' : '#8892b0';

        // Function to initialize particles using the particles.js library.
        const initializeParticles = () => {
            // Checks if the library is loaded and if the container element exists.
            if (window.particlesJS && particlesRef.current) {
                window.particlesJS(particleId.current, {
                    particles: {
                        number: {
                            value: particleCount,
                            density: { enable: true, value_area: 800 }
                        },
                        color: { value: particleColor },
                        shape: { type: 'circle' },
                        opacity: { value: 0.4, random: true },
                        size: { value: 2, random: true },
                        line_linked: {
                            enable: true,
                            distance: 150,
                            color: lineColor,
                            opacity: 0.1,
                            width: 1
                        },
                        move: {
                            enable: true,
                            speed: 1,
                            direction: 'none',
                            random: true,
                            straight: false,
                            out_mode: 'out',
                        }
                    },
                    interactivity: {
                        detect_on: 'window',
                        events: { onhover: { enable: true, mode: 'repulse' }, resize: true },
                        modes: { repulse: { distance: 100, duration: 0.4 } }
                    },
                    retina_detect: true
                });
            }
        };

        // If particles.js is already loaded, initialize particles immediately.
        if (window.particlesJS) {
            initializeParticles();
        } else if (!scriptRef.current) {
            // If not, dynamically create and append the script tag to the head.
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js';
            // Initializes particles once the script has finished loading.
            script.onload = initializeParticles;
            document.head.appendChild(script);
            scriptRef.current = script;
        }
    }, [theme, particleCount]); // The effect re-runs when these dependencies change.

    return (
        /*
         * A fixed div that serves as the container for the particles.js canvas.
         * `zIndex: -1` places it behind all other content on the page.
         */
        <div
            id={particleId.current}
            ref={particlesRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1
            }}
        />
    );
};

// Exports the component for use in the main application layout.
export default ParticleBackground;