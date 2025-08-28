/**
 * @file ProjectModal.js
 * @description This file contains the ProjectModal component, which displays
 * detailed information about a GitHub repository. It fetches and renders
 * the repository's README file as an HTML document, correcting image paths
 * as needed. The modal is animated using Framer Motion.
 * @author Tyler Bravin
 * @date 2025-08-28
 */

// --- Imports ---
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // For modal animations
import { FiX, FiGithub } from 'react-icons/fi'; // Feather Icons for close and GitHub buttons
import './ProjectModal.css'; // Component-specific styles

/**
 * The ProjectModal component fetches and displays the README content from a
 * specified GitHub repository within a modal window.
 *
 * @param {object} props The component's props.
 * @param {object} props.repo The GitHub repository object to display.
 * @param {Function} props.onClose The function to call when the modal should close.
 * @returns {JSX.Element | null} The rendered modal or null if no repository is provided.
 */
const ProjectModal = ({ repo, onClose }) => {
    // State to store the fetched README content as HTML.
    const [readmeHtml, setReadmeHtml] = useState('');
    // State to track the loading status of the README file.
    const [loading, setLoading] = useState(true);

    // Effect to fetch the README file whenever the `repo` prop changes.
    useEffect(() => {
        if (!repo) return;

        const fetchReadme = async () => {
            try {
                setLoading(true);

                // Fetch the README from the GitHub API, requesting it in HTML format.
                const readmeResponse = await fetch(
                    `https://api.github.com/repos/${repo.owner.login}/${repo.name}/readme`,
                    {
                        headers: {
                            Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
                            Accept: 'application/vnd.github.v3.html+json',
                        },
                    }
                );

                let html = await readmeResponse.text();

                // Create a temporary element to parse the HTML and fix relative image paths.
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                const images = Array.from(tempDiv.querySelectorAll('img'));

                // Loop through all image elements to correct their `src` attributes.
                images.forEach((img) => {
                    const src = img.getAttribute('src');
                    // If the source is a relative path, construct the absolute raw URL.
                    if (!src.startsWith('http')) {
                        const defaultBranch = repo.default_branch || 'main';
                        const correctedSrc = `https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/${defaultBranch}/${src.replace(/^\.?\//, '')}`;
                        img.setAttribute('src', correctedSrc);
                    }
                });

                // Set the corrected HTML to the state.
                setReadmeHtml(tempDiv.innerHTML);
            } catch (err) {
                console.error(err);
                setReadmeHtml('<p>Could not load README for this project.</p>');
            } finally {
                // Set loading to false once the fetch is complete (or an error occurs).
                setLoading(false);
            }
        };

        fetchReadme();
    }, [repo]); // The effect re-runs when the `repo` object changes.

    // If no repository is provided, the component renders nothing.
    if (!repo) return null;

    return (
        /*
         * `AnimatePresence` is a Framer Motion component that enables exit animations
         * for children that are removed from the React tree.
         */
        <AnimatePresence>
            <motion.div
                className="modal-backdrop"
                onClick={onClose}
                initial={{ opacity: 0 }} // Starts transparent
                animate={{ opacity: 1 }} // Fades in
                exit={{ opacity: 0 }} // Fades out on close
            >
                <motion.div
                    className="modal-content"
                    onClick={(e) => e.stopPropagation()} // Prevents clicks inside the modal from closing it.
                    initial={{ y: '-100vh' }} // Starts off-screen above
                    animate={{ y: 0 }} // Slides in from the top
                    exit={{ y: '100vh' }} // Slides out to the bottom on close
                    transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                >
                    {/* The close button at the top-right of the modal. */}
                    <button className="close-button" onClick={onClose}>
                        <FiX />
                    </button>
                    {/* Project title and description, sourced from the `repo` prop. */}
                    <h2>{repo.name}</h2>
                    <p className="modal-description">{repo.description}</p>
                    {/* Link to the GitHub repository. */}
                    <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="github-link-button"
                    >
                        <FiGithub /> View on GitHub
                    </a>
                    <hr />
                    {/* Container for the README content. */}
                    <div className="readme-content">
                        {/* Conditional rendering: show loading message or the fetched content. */}
                        {loading ? (
                            <p>Loading README...</p>
                        ) : (
                            // `dangerouslySetInnerHTML` is used to render the raw HTML from the GitHub API.
                            <div dangerouslySetInnerHTML={{ __html: readmeHtml }} />
                        )}
                    </div>
                    {/* A footer for additional buttons. */}
                    <div className="modal-footer">
                        <button className="close-button-bottom" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

// Exports the component for use elsewhere.
export default ProjectModal;