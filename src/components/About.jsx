/**
 * @file About.js
 * @description "About" section: short background copy plus a skills grid
 * grouped the same way as my CV (frontend / backend / data & infra / systems).
 * @author Tyler Bravin
 */

import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

// Skill groups mirror the structure on my CV — the grouping is the information.
const SKILL_GROUPS = [
    { label: 'frontend', items: ['React 19', 'TypeScript', 'Vite', 'Tailwind', 'Expo'] },
    { label: 'backend', items: ['FastAPI', 'Spring Boot', 'Java', 'Python', 'Node.js'] },
    { label: 'data & infra', items: ['PostgreSQL', 'Redis', 'Docker', 'Railway', 'Git'] },
    { label: 'systems', items: ['Linux / Arch', 'REST APIs', 'JWT Auth', 'CI/CD'] },
];

const About = () => {
    return (
        <motion.section
            className="about"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <span className="section-eyebrow">{'// about'}</span>
            <h2 className="section-title">Background</h2>

            <div className="about-content">
                <div className="about-text">
                    <p>
                        I got into software the honest way: running Minecraft
                        servers as a teenager and getting paid to write custom
                        Java plugins for them. That turned into an HNC, then an
                        HND, then a BSc (Hons) in Software Engineering with
                        Cyber Security at the University of Stirling, where I
                        graduated with a 2:1. My dissertation used evolutionary
                        algorithms to optimise wind farm layouts.
                    </p>
                    <p>
                        These days I work across the full stack. My main project
                        is Study Hub — a collaborative study platform with
                        real-time group chat, direct messages, and presence,
                        built with React 19, FastAPI, PostgreSQL, and Redis. Off
                        the clock I'm a Linux tinkerer (Arch, Hyprland, the
                        works), a PC builder, and a competitive gamer.
                    </p>
                </div>

                <div className="about-skills">
                    {SKILL_GROUPS.map((group) => (
                        <div className="skill-group" key={group.label}>
                            <h3 className="skill-group-label">{group.label}</h3>
                            <ul>
                                {group.items.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default About;
