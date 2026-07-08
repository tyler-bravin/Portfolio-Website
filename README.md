# Personal Portfolio Website

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://github.com/tyler-bravin/Portfolio-Website/blob/master/LICENSE)

A personal portfolio website built with **React.js**, designed around an "engineering workstation" aesthetic — graphite surfaces, an amber terminal accent, and a monospace-led type system. It features a fastfetch-style system readout, a dark/light theme toggle, and dynamically fetches project data directly from the GitHub API.

<br>

<img src="./assets/Website.png" alt="A screenshot of the portfolio website with a dark theme">

---

### ✨ Key Features
* **Dynamic Theme Switching**: Easily toggle between a dark and light theme, with your preference saved in local storage.
* **System Readout Hero**: A fastfetch-style terminal panel summarising who I am — a nod to my daily-driver Linux setup.
* **Interactive Terminal**: The readout prompt actually works — try `help`, `cd projects`, or `sudo` and see what happens.
* **Featured Case Study**: A hand-written deep dive into Study Hub (built under the ForthByte org), covering the real-time architecture.
* **Scrollspy Navigation**: The header highlights whichever section is currently on screen.
* **API Integration**: Fetches recent projects directly from the GitHub API, displaying key information like descriptions, technologies, and stats.
* **Responsive Design**: The layout adapts seamlessly to a range of devices, from desktops to mobile phones.
* **Smooth Animations**: Utilises **Framer Motion** for subtle, professional animations and transitions on page load and scroll.
* **Smooth Scrolling Navigation**: Navigate between sections of the site with a smooth, animated scroll.

---

### 💻 Technologies Used
* **Frontend**: React.js, HTML5, CSS3, JavaScript
* **Build Tooling**: Vite
* **Styling & Theming**: CSS Custom Properties (Variables), Responsive CSS
* **Animation**: `framer-motion`
* **Icons**: `react-icons`
* **API Integration**: GitHub REST API
* **Other Libraries**: `react-responsive-carousel` for image slideshows

---

### 🛠️ Installation & Setup

Follow these steps to get a local copy of the project up and running.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/tyler-bravin/Portfolio-Website.git
    cd Portfolio-Website
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    This project requires a GitHub Personal Access Token to fetch repository data.

    * Create a file named `.env` in the root of your project.
    * Add your GitHub token to the file in the following format:
        ```env
        VITE_GITHUB_TOKEN=your_personal_access_token_here
        ```
    > **Note:** Make sure your token has at least the `public_repo` scope to access repository data. For security, never share this file or commit it to your repository. You can follow [GitHub's official guide to create a Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic).

4.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will now be running on `http://localhost:3000`.

5.  **Build for production:**
    ```bash
    npm run build
    ```
    The optimised output is written to `dist/`, and `npm run preview` serves it locally.

### 📜 License
This project is licensed under the MIT License. See the `LICENSE` file for details.
