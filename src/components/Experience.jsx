/**
 * @file Experience.js
 * @description Tabbed work history, content synced with my current CV —
 * including the freelance Minecraft plugin work where it all started.
 * @author Tyler Bravin
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Experience.css';

const jobs = [
    {
        company: 'Keep Scotland Beautiful',
        title: 'Software Engineering Placement',
        date: 'Jul 2025 — Aug 2025',
        description: [
            'Built a cross-platform mobile app using React Native / Expo, from initial framework through to feature-complete build.',
            'Implemented Google Firebase authentication and resolved a complex CameraView recording issue through targeted debugging.',
            'Optimised the build pipeline, cutting build time from ~2 minutes to 30 seconds — a 75% improvement.',
            'Maintained strict brand guidelines across all UI components, fonts, and iconography.',
        ],
    },
    {
        company: 'Cineworld',
        title: 'Team Member (part-time)',
        date: 'Feb 2022 — Present',
        description: [
            'Coordinate front-of-house operations across high-traffic periods, maintaining service quality under pressure.',
            'Collaborate with the team to plan and deliver new film showings, balancing logistics and customer experience.',
            'Uphold food safety and hygiene standards consistently across all concessions responsibilities.',
        ],
    },
    {
        company: 'JD Sports',
        title: 'Sales Assistant (part-time)',
        date: 'Oct 2019 — Feb 2022',
        description: [
            'Delivered tailored product recommendations and resolved customer enquiries to maintain high satisfaction levels.',
            'Coordinated stock management, deliveries, and merchandise displays with the team during peak retail periods.',
            'Built strong product knowledge and fostered positive customer relationships through attentive, personalised service.',
        ],
    },
    {
        company: 'Forth Valley College',
        title: 'IT / Student Records Internship',
        date: 'Jun 2019 — Jul 2019',
        description: [
            'Led Windows 10 deployment across the Learning Resource Centre, managing system upgrades end-to-end.',
            'Independently produced technical training documentation adopted across the department.',
            'Delivered an end-of-internship presentation on project outcomes to key stakeholders.',
        ],
    },
    {
        company: 'Freelance (Minecraft)',
        title: 'Freelance Java Plugin Developer',
        date: '2015 — 2019',
        description: [
            'Worked as a paid freelance developer across multiple Minecraft server teams, delivering custom Java plugins using the Spigot API.',
            'Co-developed a KitPvP combat plugin with another developer, collaborating on architecture, feature design, and integration testing.',
            'Developed a full economy system, staff tooling, and a core server plugin covering ranks and permissions — comparable in scope to EssentialsX.',
            'Held ongoing Developer roles on several servers, delivering updates against live player-facing requirements.',
        ],
    },
];

const Experience = () => {
    const [activeJobIndex, setActiveJobIndex] = useState(0);
    const activeJob = jobs[activeJobIndex];

    return (
        <motion.section
            className="experience"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <span className="section-eyebrow">{'// experience'}</span>
            <h2 className="section-title">Where I've worked</h2>

            <div className="experience-content">
                <div className="job-list" role="tablist" aria-label="Employers">
                    {jobs.map((job, index) => (
                        <button
                            key={job.company}
                            role="tab"
                            aria-selected={index === activeJobIndex}
                            className={`job-button ${index === activeJobIndex ? 'active' : ''}`}
                            onClick={() => setActiveJobIndex(index)}
                        >
                            {job.company}
                        </button>
                    ))}
                </div>

                <div className="job-details" role="tabpanel">
                    <h3>
                        {activeJob.title}
                        <span className="company"> @ {activeJob.company}</span>
                    </h3>
                    <p className="date">{activeJob.date}</p>
                    <ul>
                        {activeJob.description.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.section>
    );
};

export default Experience;
