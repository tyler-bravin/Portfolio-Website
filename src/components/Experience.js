/**
 * @file Experience.js
 * @description This file contains the Experience component, which renders a tabbed
 * interface displaying professional work history.
 * @author Tyler Bravin
 * @date 2025-08-28
 */

// --- Imports ---
import React, { useState } from 'react'; // `useState` for managing the active tab
import { motion } from 'framer-motion'; // For animations
import './Experience.css'; // Component-specific styles

// --- Data ---
/**
 * An array of objects containing the work experience data.
 * This centralized data structure makes the component clean and easy to update.
 * Each object represents a job and contains details like company, title, date,
 * and a list of responsibilities.
 */
const jobs = [
    {
        company: "Keep Scotland Beautiful",
        title: "Software Engineer Placement",
        date: "Jul 2025 - Aug 2025",
        description: [
            "Established GitHub repository for project collaboration.",
            "Downloaded essential software including WebStorm, Android Studio, and Expo Orbit for Android emulation.",
            "Developed initial app framework, incorporating multiple pages aligned with design specifications.",
            "Refined app design by integrating necessary fonts and icons.",
            "Implemented login functionality using Google Firebase",
            "Resolved camera recording error by adjusting CameraView properties.",
            "Optimised code efficiency, reducing build time from approximately 2 minutes to 30 seconds.",
            "Ensured compliance with KSB branding in styling and content.",

        ],
    },
    {
        company: "Cineworld",
        title: "Team Member",
        date: "Feb 2022 - Present",
        description: [
           "Streamlined cinema operations through precise ticket verification and seating coordination.",
            "Implemented food safety protocols to uphold hygiene standards.",
            "Organised new film showings collaboratively to maximise customer satisfaction.",
            "Coordinated concessions and maintained inventory records for efficient operations.",
            "Resolved guest concerns to deliver exceptional service standards.",
            "Delivered excellent customer service, reinforcing business reputation.",
            "Demonstrated adherence to proper food handling and safety standards.",
        ],
    },
    {
        company: "JD Sports",
        title: "Sales Assistant",
        date: "Oct 2019 - Feb 2022",
        description: [
            "Delivered exceptional customer service by providing tailored product recommendations and resolving inquiries promptly to ensure high satisfaction levels.",
            "Took in store delivery's and put the received stock away.",
            "Learned how to work efficiently as a team.",
            "Fostered positive customer relationships through attentive service, product knowledge, and personalised shopping assistance to enhance customer satisfaction.",

        ],
    },
    {
        company: "Forth Valley College",
        title: "IT Department Intern",
        date: "Jun 2019 - Jul 2019",
        description: [
            "Developed comprehensive training documentation to enhance self-guided learning and user accessibility.",
            "Led Windows 10 deployment across Learning Resource Centre, overseeing system upgrades for operational continuity.",
            "Delivered end-of-internship presentation highlighting project outcomes and technical achievements to key stakeholders.",
        ],
    },
];


/**
 * The Experience component displays a list of jobs in a tabbed view.
 * It manages which job's details are shown using local component state.
 *
 * @returns {JSX.Element} The rendered Experience section.
 */
const Experience = () => {
    // State to keep track of the currently active/selected job tab.
    // It stores the index of the job in the `jobs` array. Defaults to the first job (index 0).
    const [activeJobIndex, setActiveJobIndex] = useState(0);

    return (
        // Main section container with Framer Motion animation for a smooth fade-in effect.
        <motion.section
            className="experience"
            id="experience"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <h2 className="section-title">Where I’ve Worked</h2>
            <div className="experience-content">
                {/* Left column: The list of clickable job tabs. */}
                <div className="job-list">
                    {/* Iterate over the `jobs` array to create a button for each company. */}
                    {jobs.map((job, index) => (
                        <button
                            key={index}
                            // Dynamically apply the 'active' class if the button's index
                            // matches the activeJobIndex in the state.
                            className={`job-button ${index === activeJobIndex ? 'active' : ''}`}
                            // When a button is clicked, update the state to this button's index.
                            onClick={() => setActiveJobIndex(index)}
                        >
                            {job.company}
                        </button>
                    ))}
                </div>

                {/* Right column: The details of the currently selected job. */}
                <div className="job-details">
                    {/* The content here is dynamically rendered based on the `activeJobIndex`. */}
                    <h3>
                        {jobs[activeJobIndex].title}{' '}
                        <span className="company">@ {jobs[activeJobIndex].company}</span>
                    </h3>
                    <p className="date">{jobs[activeJobIndex].date}</p>
                    <ul>
                        {/* Map over the description array of the active job to list responsibilities. */}
                        {jobs[activeJobIndex].description.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.section>
    );
};

// Export the component for use in other parts of the application.
export default Experience;