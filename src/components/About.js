/**
 * @file About.js
 * @description This file contains the About component, which renders the "About Me"
 * section of the portfolio. It includes a personal summary and a list of technical skills.
 * @author Tyler Bravin
 * @date 2025-08-28
 */

// --- Imports ---
import React from 'react';
import { motion } from 'framer-motion'; // For animations
import './About.css'; // Component-specific styles

// Import icons from the 'react-icons' library for the skills list
import { FaJava } from 'react-icons/fa';
import {
    DiPython,
    DiReact,
    DiHtml5,
    DiCss3,
    DiJavascript1,
    DiGit
} from 'react-icons/di';
import { SiCplusplus } from 'react-icons/si';


/**
 * The About component displays a biographical text and a list of technical skills.
 * It uses Framer Motion for a fade-in-on-scroll animation effect.
 *
 * @returns {JSX.Element} The rendered About section.
 */
const About = () => {

    // An array of skill objects. Each object contains the skill name and its
    // corresponding icon component. This structure makes it easy to map over and render.
    const skills = [
        { name: 'Java', icon: <FaJava className="skill-icon java" /> },
        { name: 'Python', icon: <DiPython className="skill-icon python" /> },
        { name: 'React', icon: <DiReact className="skill-icon react" /> },
        { name: 'JavaScript', icon: <DiJavascript1 className="skill-icon javascript" /> },
        { name: 'HTML5', icon: <DiHtml5 className="skill-icon html5" /> },
        { name: 'CSS3', icon: <DiCss3 className="skill-icon css3" /> },
        { name: 'Git', icon: <DiGit className="skill-icon git" /> },
        { name: 'C++', icon: <SiCplusplus className="skill-icon cpp" /> },
    ];

    return (
        // The main section container, enhanced with Framer Motion for animations.
        // `initial`: The component's state before the animation starts (invisible and slightly offset down).
        // `whileInView`: The component's state when it enters the viewport (fully visible and at its original position).
        // `viewport`: Configures the trigger for the animation; `once: true` ensures it only animates once.
        // `transition`: Defines the animation properties, such as duration.
        <motion.section
            className="about"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <h2 className="section-title">A Little About Me</h2>

            {/* Grid container for the text and skills sections */}
            <div className="about-content">

                {/* Left column: Contains the descriptive paragraphs. */}
                <div className="about-text">
                    <p>
                        From a young age, I've been passionate about technology, starting with creating and managing Minecraft servers, which taught me the fundamentals of Java and server-side scripting. This early interest has grown into a focused pursuit of a degree in Software Engineering with Cyber Security.
                    </p>
                    <p>
                        I thrive on continuous learning and actively follow the latest advancements in software development and cybersecurity. I'm known for my innovative problem-solving, strong analytical skills, and effective collaboration in team environments. I'm eager to apply my skills to real-world challenges.
                    </p>
                </div>

                {/* Right column: Contains the list of skills. */}
                <div className="about-skills">
                    <ul>
                        {/*
                         * Iterates over the 'skills' array to dynamically generate a list item for each skill.
                         * The 'key' prop is essential for React's rendering performance and list management.
                         */}
                        {skills.map((skill, index) => (
                            <li key={index}>
                                {/* The skill's icon component is rendered here. */}
                                <span className="skill-icon">{skill.icon}</span>
                                {/* The skill's name is rendered here. */}
                                <span>{skill.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.section>
    );
};

// Export the About component to make it available for use in other parts of the application.
export default About;