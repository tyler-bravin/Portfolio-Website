/**
 * @file FeaturedProject.jsx
 * @description Hand-written case study for Study Hub. It lives under the
 * ForthByte organisation on GitHub, so the automatic user-repo fetch never
 * picks it up — and it deserves more than an auto-generated card anyway.
 * @author Tyler Bravin
 */

import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiUsers } from 'react-icons/fi';
import './FeaturedProject.css';

const STACK = ['React 19', 'FastAPI', 'PostgreSQL', 'Redis', 'WebSockets', 'JWT'];

// Architecture decisions worth talking about in an interview.
const SYSTEM_NOTES = [
    {
        key: 'realtime',
        note: 'Discord-style group chat over WebSockets, with connection instances held outside React state to survive re-renders.',
    },
    {
        key: 'presence',
        note: 'Online status via Redis TTL heartbeats — clients ping, keys expire, no stale "online" ghosts.',
    },
    {
        key: 'auth',
        note: 'JWT access/refresh flow that queues 401\'d requests during token refresh and replays them once, instead of failing or double-refreshing.',
    },
    {
        key: 'social',
        note: 'Friend requests, direct messages, and per-group roles with admin and owner controls.',
    },
];

const FeaturedProject = () => {
    return (
        <motion.div
            className="featured"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <div className="featured-main">
                <div className="featured-label-row">
                    <p className="featured-label">{'// featured build'}</p>
                    <span className="featured-status">
                        <span className="featured-status-dot" aria-hidden="true" />
                        in active development
                    </span>
                </div>
                <h3 className="featured-title">Study Hub</h3>
                <p className="featured-tagline">
                    A real-time collaborative study platform — think shared
                    study spaces with live group chat, DMs, and exam countdowns.
                </p>
                <p className="featured-body">
                    Built in a two-person team under{' '}
                    <a href="https://github.com/ForthByte" target="_blank" rel="noopener noreferrer">
                        ForthByte
                    </a>
                    . Much of my work has centred on the frontend — the auth
                    flow, real-time chat and DMs, the friends system, and exam
                    countdowns — though in practice we both work across the
                    stack. Collaborating on a shared codebase meant agreeing
                    API contracts, reviewing each other's changes, and
                    integrating over a common FastAPI backend.
                </p>
                <ul className="featured-stack" aria-label="Tech stack">
                    {STACK.map((t) => (
                        <li key={t}>{t}</li>
                    ))}
                </ul>
                <div className="featured-links">
                    <a
                        href="https://github.com/ForthByte/studyhub"
                        className="button button-ghost"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FiGithub /> View on GitHub
                    </a>
                    <span className="featured-team">
                        <FiUsers /> two-person team
                    </span>
                </div>
            </div>

            <div className="featured-notes" aria-label="Architecture notes">
                <div className="featured-notes-titlebar">system notes</div>
                <dl>
                    {SYSTEM_NOTES.map(({ key, note }) => (
                        <div className="featured-note-row" key={key}>
                            <dt>{key}</dt>
                            <dd>{note}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </motion.div>
    );
};

export default FeaturedProject;
