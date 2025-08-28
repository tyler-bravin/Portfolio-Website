/**
 * @file Contact.js
 * @description This file contains the Contact component, which renders the "Get In Touch"
 * section of the portfolio. It serves as a call to action for visitors.
 * @author Tyler Bravin
 * @date 2025-08-28
 */

// --- Imports ---
import React from 'react';
import { motion } from 'framer-motion'; // Used for scroll-triggered animations
import './Contact.css'; // Imports the styles specific to this component

/**
 * The Contact component displays a final call to action, encouraging users
 * to get in touch via email. It uses Framer Motion for a simple fade-in effect.
 *
 * @returns {JSX.Element} The rendered Contact section.
 */
const Contact = () => {
    return (
        // The main section container, animated with Framer Motion.
        // `initial`: The starting state of the animation (fully transparent).
        // `whileInView`: The target state when the component scrolls into view (fully opaque).
        // `viewport`: Ensures the animation only runs once.
        // `transition`: Sets the animation duration and a slight delay.
        <motion.section
            className="contact"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
        >
            <h2 className="contact-title">What's Next?</h2>
            <h3>Get In Touch</h3>
            <p>
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out!
            </p>
            {/*
             * This anchor tag is a "mailto" link that opens the user's default email client.
             * It's styled as a button for a clear call to action.
             */}
            <a href="mailto:tylerbravin02@gmail.com" className="contact-button">
                Say Hello
            </a>
        </motion.section>
    );
};

// Exports the Contact component for use in other parts of the application.
export default Contact;