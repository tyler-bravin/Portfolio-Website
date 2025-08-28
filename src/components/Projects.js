/**
 * @file Projects.js
 * @description This file contains the Projects component, which fetches the
 * user's recent, non-forked GitHub repositories and displays them as a
 * horizontally-scrolling grid of project cards. Each card includes project details
 * and a link to view a full README in a modal.
 * @author Tyler Bravin
 * @date 2025-08-28
 */

// --- Imports ---
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // For scroll-triggered animations
import { DiGitMerge } from 'react-icons/di'; // Icon for forks
import { AiFillStar } from 'react-icons/ai'; // Icon for stars
import RepoLanguages from './RepoLanguages'; // A component to show repo languages
import ProjectModal from './ProjectModal'; // The modal for detailed project views
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel styles
import { Carousel } from 'react-responsive-carousel'; // A library for image carousels
import './Projects.css'; // Component-specific styles

/**
 * The Projects component fetches a list of repositories from GitHub and
 * renders them as interactive cards. It also handles the logic for opening
 * a detailed project modal.
 *
 * @returns {JSX.Element} The rendered projects section.
 */
const Projects = () => {
    // State to store the fetched repositories.
    const [repos, setRepos] = useState([]);
    // State to track if the data is currently being loaded.
    const [loading, setLoading] = useState(true);
    // State to store the currently selected repository to display in the modal.
    const [selectedRepo, setSelectedRepo] = useState(null);
    // The GitHub username to fetch repositories for.
    const GITHUB_USERNAME = "tyler-bravin";

    // Effect to fetch repositories and associated images when the component mounts.
    useEffect(() => {
        const fetchReposAndImages = async () => {
            try {
                // Fetch the user's public repositories, sorted by most recently updated.
                const repoResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc`, {
                    headers: { Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}` },
                });
                let reposData = await repoResponse.json();
                // Filter out forked repositories and take the first 6.
                reposData = reposData.filter(repo => !repo.fork).slice(0, 6);

                // Use `Promise.all` to fetch READMEs and images for all repos in parallel.
                const reposWithImages = await Promise.all(
                    reposData.map(async (repo) => {
                        try {
                            // Fetch the README for each repository.
                            const readmeResponse = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/readme`, {
                                headers: {
                                    Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
                                    Accept: 'application/vnd.github.v3.html+json',
                                },
                            });
                            // If fetching the README fails, return an empty image array.
                            if (!readmeResponse.ok) return { ...repo, imageUrls: [] };
                            const readmeHtml = await readmeResponse.text();

                            // Create a temporary DOM element to parse the HTML and find image tags.
                            const tempDiv = document.createElement('div');
                            tempDiv.innerHTML = readmeHtml;
                            const images = tempDiv.querySelectorAll('img');

                            // Extract and correct image URLs from the README.
                            const urls = Array.from(images)
                                // Filter for images from a specific /assets folder
                                .filter(img => {
                                    const src = img.getAttribute('src');
                                    // Checks for '/assets/' in the image path to filter out badges
                                    return src && src.includes('/assets/');
                                })
                                // Map the remaining images to their corrected URLs
                                .map(img => {
                                    const src = img.getAttribute('src');
                                    // If it's a relative URL, construct the full raw path
                                    const defaultBranch = repo.default_branch || "main";
                                    return `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repo.name}/${defaultBranch}/${src.replace(/^\//, '')}`;
                                });

                            // Return the repository object with the new `imageUrls` array.
                            return { ...repo, imageUrls: urls };
                        } catch (error) {
                            return { ...repo, imageUrls: [] };
                        }
                    })
                );

                setRepos(reposWithImages);
            } catch (error) {
                console.error("Error fetching GitHub repos:", error);
            } finally {
                // Set loading to false once all data is fetched or an error occurs.
                setLoading(false);
            }
        };

        fetchReposAndImages();
    }, [GITHUB_USERNAME]); // The effect re-runs if the username changes.

    // Conditional rendering: show a loading message if data is still being fetched.
    if (loading) {
        return <div className="loader">Loading Projects...</div>;
    }

    return (
        <>
            <section className="projects" id="projects">
                <h2 className="section-title">My Recent Projects</h2>
                {/* The horizontally-scrolling grid container. */}
                <div className="projects-grid">
                    {/* Map through the fetched repositories to create a card for each. */}
                    {repos.map((repo, index) => (
                        <motion.div
                            key={repo.id}
                            className="project-card"
                            onClick={() => setSelectedRepo(repo)} // Set the repo for the modal on click.
                            // Framer Motion properties for a staggered animation on scroll.
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {/* Conditional rendering for the image section of the card. */}
                            {repo.imageUrls && repo.imageUrls.length > 0 ? (
                                // A carousel for projects with images.
                                <div onClick={(e) => e.stopPropagation()}>
                                    <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay>
                                        {repo.imageUrls.map((url, i) => (
                                            <div key={i}>
                                                <img src={url} alt={`${repo.name} preview ${i + 1}`} className="project-image" />
                                            </div>
                                        ))}
                                    </Carousel>
                                </div>
                            ) : (
                                // A placeholder div for projects without images.
                                <div className="project-image-placeholder">
                                    <span>{repo.name}</span>
                                </div>
                            )}

                            {/* The content area of the project card. */}
                            <div className="project-content">
                                <h3>{repo.name}</h3>
                                <p>{repo.description || "No description provided."}</p>
                                <RepoLanguages languagesUrl={repo.languages_url} />
                                {/* GitHub stats for stars and forks. */}
                                <div className="project-stats">
                                    <span className="stat-item"><AiFillStar /> {repo.stargazers_count}</span>
                                    <span className="stat-item"><DiGitMerge /> {repo.forks_count}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/*
             * Renders the ProjectModal. It's only visible when a `selectedRepo`
             * is set, and it closes when the `onClose` function is called.
             */}
            <ProjectModal repo={selectedRepo} onClose={() => setSelectedRepo(null)} />
        </>
    );
};

// Exports the component for use in the main application layout.
export default Projects;