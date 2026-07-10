/**
 * @file FeaturedProject.jsx
 * @description Hand-written case studies for flagship work that the automatic
 * GitHub fetch can't represent — Study Hub lives under the ForthByte org, and
 * the KSB app is a private repository in real-world use. Data-driven: add an
 * entry to FEATURED and it renders.
 * @author Tyler Bravin
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiUsers, FiLock, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './FeaturedProject.css';

const FEATURED = [
    {
        id: 'ksb',
        title: 'KSB Litter Detection',
        status: { text: 'shipped — rolling out to Scottish councils', kind: 'shipped' },
        tagline:
            'A React Native app for Keep Scotland Beautiful that records GPS-tagged video of litter — capture in the field, review, and submit for detection.',
        body: (
            <>
                Designed and built solo during my software engineering placement
                at{' '}
                <a href="https://www.keepscotlandbeautiful.org/" target="_blank" rel="noopener noreferrer">
                    Keep Scotland Beautiful
                </a>
                , from initial framework to feature-complete build. The repository
                is private, but the app is real — being rolled out for use by
                councils across Scotland.
            </>
        ),
        stack: ['React Native', 'Expo', 'Firebase', 'expo-camera', 'react-native-maps', 'AsyncStorage'],
        notes: [
            {
                key: 'capture',
                note: 'Video recording with continuous GPS tracking — start and end coordinates tagged per clip, using refs to avoid state race conditions mid-recording.',
            },
            {
                key: 'offline',
                note: 'Recordings, thumbnails, and metadata persist on-device via AsyncStorage and the file system, with a review-and-submit queue.',
            },
            {
                key: 'auth',
                note: 'Full Firebase authentication — registration, login, password reset — plus a permissions onboarding flow for camera and location.',
            },
            {
                key: 'delivery',
                note: 'Optimised the build pipeline from ~2 minutes to 30 seconds, and resolved a complex CameraView recording issue through targeted debugging.',
            },
        ],
        links: (
            <span className="featured-team">
                <FiLock /> private repository — code available to discuss in interviews
            </span>
        ),
    },
    {
        id: 'studyhub',
        title: 'Study Hub',
        status: { text: 'in active development', kind: 'dev' },
        tagline:
            'A real-time collaborative study platform — think shared study spaces with live group chat, DMs, and exam countdowns.',
        body: (
            <>
                Built in a two-person team under{' '}
                <a href="https://github.com/ForthByte" target="_blank" rel="noopener noreferrer">
                    ForthByte
                </a>
                . Much of my work has centred on the frontend — the auth flow,
                real-time chat and DMs, the friends system, and exam countdowns —
                though in practice we both work across the stack. Collaborating
                on a shared codebase meant agreeing API contracts, reviewing each
                other's changes, and integrating over a common FastAPI backend.
            </>
        ),
        stack: ['React 19', 'FastAPI', 'PostgreSQL', 'Redis', 'WebSockets', 'JWT'],
        notes: [
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
                note: "JWT access/refresh flow that queues 401'd requests during token refresh and replays them once, instead of failing or double-refreshing.",
            },
            {
                key: 'social',
                note: 'Friend requests, direct messages, and per-group roles with admin and owner controls.',
            },
        ],
        links: (
            <>
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
            </>
        ),
    },
];

const FeaturedProject = () => {
    const trackRef = useRef(null);
    const [index, setIndex] = useState(0);

    // Track which card is in view as the user swipes or clicks.
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        const onScroll = () => {
            // Stride = card width + gap, measured from the real layout.
            const stride = track.children[1]
                ? track.children[1].offsetLeft - track.children[0].offsetLeft
                : track.clientWidth;
            setIndex(Math.round(track.scrollLeft / stride));
        };
        track.addEventListener('scroll', onScroll, { passive: true });
        return () => track.removeEventListener('scroll', onScroll);
    }, []);

    const goTo = (i) => {
        const track = trackRef.current;
        if (!track) return;
        const clamped = Math.max(0, Math.min(FEATURED.length - 1, i));
        // offsetLeft is relative to the offsetParent (body here, since nothing
        // in the chain is positioned) — NOT the track. Using it directly made
        // goTo(0) scroll to ~220px and rely on snap to correct it, which
        // breaks at some viewport widths. The difference between two cards'
        // offsets cancels the origin, giving a true stride from position 0.
        const stride = track.children[1]
            ? track.children[1].offsetLeft - track.children[0].offsetLeft
            : track.clientWidth;
        track.scrollTo({ left: clamped * stride, behavior: 'smooth' });
    };

    return (
        <div className="featured-carousel">
            {FEATURED.length > 1 && (
                <div className="featured-toolbar">
                    <span className="featured-counter">
                        {String(index + 1).padStart(2, '0')} / {String(FEATURED.length).padStart(2, '0')}
                    </span>
                    <div className="scroller-controls">
                        <button
                            className="scroller-btn"
                            onClick={() => goTo(index - 1)}
                            disabled={index === 0}
                            aria-label="Previous featured project"
                        >
                            <FiChevronLeft />
                        </button>
                        <button
                            className="scroller-btn"
                            onClick={() => goTo(index + 1)}
                            disabled={index === FEATURED.length - 1}
                            aria-label="Next featured project"
                        >
                            <FiChevronRight />
                        </button>
                    </div>
                </div>
            )}
            <div className="featured-track" ref={trackRef}>
            {FEATURED.map((project) => (
                <motion.div
                    className="featured"
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <div className="featured-main">
                        <div className="featured-label-row">
                            <p className="featured-label">{'// featured build'}</p>
                            <span className={`featured-status featured-status-${project.status.kind}`}>
                                <span className="featured-status-dot" aria-hidden="true" />
                                {project.status.text}
                            </span>
                        </div>
                        <h3 className="featured-title">{project.title}</h3>
                        <p className="featured-tagline">{project.tagline}</p>
                        <p className="featured-body">{project.body}</p>
                        <ul className="featured-stack" aria-label="Tech stack">
                            {project.stack.map((t) => (
                                <li key={t}>{t}</li>
                            ))}
                        </ul>
                        <div className="featured-links">{project.links}</div>
                    </div>

                    <div className="featured-notes" aria-label="Architecture notes">
                        <div className="featured-notes-titlebar">system notes</div>
                        <dl>
                            {project.notes.map(({ key, note }) => (
                                <div className="featured-note-row" key={key}>
                                    <dt>{key}</dt>
                                    <dd>{note}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </motion.div>
            ))}
            </div>
        </div>
    );
};

export default FeaturedProject;
