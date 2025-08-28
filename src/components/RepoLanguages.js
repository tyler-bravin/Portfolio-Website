/**
 * @file RepoLanguages.js
 * @description This file contains the RepoLanguages component, which fetches the
 * programming languages used in a GitHub repository and displays the top
 * three languages as a list of tags.
 * @author Tyler Bravin
 * @date 2025-08-28
 */

// --- Imports ---
import React, { useState, useEffect } from 'react';

/**
 * The RepoLanguages component fetches the languages for a given repository URL
 * and renders them as an unordered list of tags.
 *
 * @param {object} props The component's props.
 * @param {string} props.languagesUrl The GitHub API URL to fetch the languages for a repository.
 * @returns {JSX.Element | null} The rendered list of language tags or null if no languages are found.
 */
const RepoLanguages = ({ languagesUrl }) => {
    // State to store the list of languages.
    const [languages, setLanguages] = useState([]);

    // Effect to fetch languages when the `languagesUrl` prop changes.
    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                // Fetch the languages data from the provided GitHub API URL.
                const response = await fetch(languagesUrl, {
                    headers: {
                        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
                    },
                });
                const data = await response.json();
                // Get the keys (language names) from the data object and take the top 3.
                const topLanguages = Object.keys(data).slice(0, 3);
                setLanguages(topLanguages);
            } catch (error) {
                console.error("Error fetching languages:", error);
            }
        };

        fetchLanguages();
    }, [languagesUrl]); // The effect re-runs whenever the `languagesUrl` changes.

    // If there are no languages to display, return null to render nothing.
    if (languages.length === 0) {
        return null;
    }

    return (
        /*
         * Renders the languages as a list of tags.
         * The `map` function iterates over the `languages` array to create a
         * list item for each language.
         */
        <ul className="project-tags">
            {languages.map((lang) => (
                <li key={lang}>{lang}</li>
            ))}
        </ul>
    );
};

// Exports the component for use in other parts of the application.
export default RepoLanguages;