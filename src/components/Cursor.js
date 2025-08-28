/**
 * @file Cursor.js
 * @description This file contains the Cursor component, which creates a custom
 * mouse cursor that follows the user's pointer and animates on hover over
 * interactive elements.
 * @author Tyler Bravin
 * @date 2025-08-28
 */

// --- Imports ---
import React, { useState, useEffect } from 'react';
import './Cursor.css'; // Imports the styles for the custom cursor

/**
 * The Cursor component renders a div that tracks the mouse's position.
 * It uses React hooks to manage its state (position and hover status)
 * and to set up and clean up global event listeners.
 *
 * @returns {JSX.Element} The rendered custom cursor element.
 */
const Cursor = () => {
    // State to store the mouse's X and Y coordinates.
    const [position, setPosition] = useState({ x: 0, y: 0 });
    // State to track whether the cursor is hovering over an interactive element.
    const [isHovering, setIsHovering] = useState(false);

    // useEffect hook to handle side effects, such as adding event listeners.
    // The empty dependency array [] ensures this effect runs only once when
    // the component mounts.
    useEffect(() => {
        /**
         * Updates the position state with the cursor's current clientX and clientY coordinates.
         * @param {MouseEvent} e - The mouse event object.
         */
        const updateMousePosition = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        // Add a global event listener to track mouse movement across the window.
        window.addEventListener('mousemove', updateMousePosition);

        // Select all interactive elements that should trigger the hover effect.
        const interactiveElements = document.querySelectorAll('a, button, .project-card');

        // Attach event listeners to each interactive element.
        interactiveElements.forEach((el) => {
            // Set hovering state to true on mouse enter.
            el.addEventListener('mouseenter', () => setIsHovering(true));
            // Set hovering state to false on mouse leave.
            el.addEventListener('mouseleave', () => setIsHovering(false));
        });

        // Cleanup function: This is crucial for preventing memory leaks.
        // It runs when the component unmounts, removing the global event listener.
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            // Note: Listeners on 'interactiveElements' are not removed here because
            // they are tied to the DOM elements' lifecycle. If those elements are
            // removed, the listeners are garbage-collected. For a more robust
            // implementation, a cleanup for these listeners could also be added.
        };
    }, []); // Empty dependency array means this effect runs only once.

    return (
        // The cursor element itself.
        // The className is dynamically set to include 'hovering' when isHovering is true.
        // The inline style updates the top and left properties to move the div
        // with the mouse pointer.
        <div
            className={`cursor ${isHovering ? 'hovering' : ''}`}
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
        />
    );
};

// Exports the Cursor component for use in the main application layout.
export default Cursor;