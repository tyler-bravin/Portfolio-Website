/**
 * @file Hero.js
 * @description Landing section. Left: display headline and intro, updated for
 * graduate status. Right: the site's signature element — a fastfetch-style
 * system readout of who I am, rendered like a terminal info panel.
 * @author Tyler Bravin
 */

import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiGithub } from 'react-icons/fi';
import TerminalPrompt from './TerminalPrompt';
import './Hero.css';

// Key–value pairs for the system readout panel.
const READOUT = [
    { key: 'host', value: 'Tyler Bravin' },
    { key: 'role', value: 'graduate software engineer' },
    { key: 'degree', value: 'BSc (Hons) SE + Cyber Security — 2:1' },
    { key: 'uni', value: 'University of Stirling' },
    { key: 'stack', value: 'React · TypeScript · Java · Python' },
    { key: 'os', value: 'Arch Linux, btw' },
    { key: 'now', value: 'building Study Hub — real-time study platform' },
];

// Shared animation helper for staggered entrances.
const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: 'easeOut' },
});

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-inner">
                {/* --- Left column: headline --- */}
                <div className="hero-copy">
                    <motion.p className="hero-eyebrow" {...fadeUp(0.05)}>
                        {'// falkirk, scotland'}
                    </motion.p>
                    <motion.h1 {...fadeUp(0.15)}>
                        Tyler Bravin
                    </motion.h1>
                    <motion.h2 {...fadeUp(0.25)}>
                        Full-stack engineer.<br />
                        <span className="hero-h2-accent">Freshly compiled.</span>
                    </motion.h2>
                    <motion.p className="hero-description" {...fadeUp(0.35)}>
                        Software Engineering with Cyber Security graduate from the
                        University of Stirling. I build web and mobile apps end to
                        end — most recently a cross-platform mobile app on
                        placement with Keep Scotland Beautiful, and Study Hub, a
                        real-time collaborative study platform in React and
                        FastAPI. Looking for a graduate software engineering role.
                    </motion.p>
                    <motion.div className="hero-buttons" {...fadeUp(0.45)}>
                        <a href="/downloads/Tyler-Bravin-CV.pdf" className="button button-solid" download>
                            <FiDownload /> Download CV
                        </a>
                        <a href="https://github.com/tyler-bravin" className="button button-ghost" target="_blank" rel="noopener noreferrer">
                            <FiGithub /> GitHub
                        </a>
                    </motion.div>
                </div>

                {/* --- Right column: system readout (signature element) --- */}
                <motion.div
                    className="readout"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
                    aria-label="Profile summary, styled as a terminal system readout"
                >
                    <div className="readout-titlebar">
                        <span className="readout-dot" />
                        <span className="readout-dot" />
                        <span className="readout-dot" />
                        <span className="readout-cmd">tyler@bravin:~$ fastfetch</span>
                    </div>
                    <dl className="readout-body">
                        {READOUT.map(({ key, value }) => (
                            <div className="readout-row" key={key}>
                                <dt>{key}</dt>
                                <dd>{value}</dd>
                            </div>
                        ))}
                        <div className="readout-row">
                            <dt>status</dt>
                            <dd>
                                <span className="status-dot" aria-hidden="true" />
                                open to graduate roles
                            </dd>
                        </div>
                    </dl>
                    <TerminalPrompt />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
