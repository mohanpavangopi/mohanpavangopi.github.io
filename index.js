const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));

// Portfolio data
const portfolioData = {
    name: "Chennamsetty Mohan Pavan Gopi",
    title: "Cyber Security Analyst",
    email: "contact@mohanpavangopi.me",
    phone: "+91-XXXXXXXXXX",
    location: "India",
    about: "Passionate Cyber Security Analyst with expertise in threat analysis, vulnerability assessment, and security monitoring. Dedicated to protecting digital assets and ensuring robust security frameworks.",
    skills: [
        "Network Security",
        "Penetration Testing",
        "Vulnerability Assessment",
        "Incident Response",
        "Risk Management",
        "Security Auditing",
        "Malware Analysis",
        "SIEM Tools"
    ],
    experience: [
        {
            title: "Cyber Security Analyst",
            company: "Security Corp",
            duration: "2022 - Present",
            description: "Monitoring security incidents, conducting vulnerability assessments, and implementing security protocols."
        },
        {
            title: "Junior Security Analyst",
            company: "Tech Solutions",
            duration: "2021 - 2022",
            description: "Assisted in security monitoring and incident response activities."
        }
    ],
    projects: [
        {
            name: "Network Security Monitoring System",
            description: "Developed a comprehensive monitoring system for network security threats.",
            tech: ["Python", "Splunk", "Linux"]
        },
        {
            name: "Vulnerability Scanner",
            description: "Created an automated vulnerability scanning tool for web applications.",
            tech: ["Python", "Nmap", "OWASP"]
        }
    ]
};

// Route for homepage
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${portfolioData.name} - Portfolio</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
            header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-align: center; padding: 60px 0; }
            .profile-img { width: 150px; height: 150px; border-radius: 50%; margin: 20px auto; background: #fff; display: flex; align-items: center; justify-content: center; font-size: 48px; }
            h1 { font-size: 2.5em; margin: 20px 0 10px; }
            .subtitle { font-size: 1.2em; opacity: 0.9; }
            .section { margin: 60px 0; }
            .section h2 { font-size: 2em; margin-bottom: 30px; color: #667eea; border-bottom: 3px solid #667eea; padding-bottom: 10px; }
            .about p { font-size: 1.1em; line-height: 1.8; margin-bottom: 20px; }
            .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }
            .skill-item { background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center; border-left: 4px solid #667eea; }
            .experience-item, .project-item { background: #f8f9fa; padding: 25px; margin-bottom: 20px; border-radius: 8px; border-left: 4px solid #764ba2; }
            .experience-item h3, .project-item h3 { color: #764ba2; margin-bottom: 10px; }
            .duration { color: #666; font-style: italic; margin-bottom: 10px; }
            .tech-stack { margin-top: 10px; }
            .tech-tag { display: inline-block; background: #667eea; color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.9em; margin: 2px; }
            .contact { background: #667eea; color: white; padding: 40px 0; text-align: center; }
            .contact-info { display: flex; justify-content: center; gap: 30px; margin-top: 20px; flex-wrap: wrap; }
            .contact-item { display: flex; align-items: center; gap: 10px; }
            footer { background: #333; color: white; text-align: center; padding: 20px 0; }
            @media (max-width: 768px) { .contact-info { flex-direction: column; gap: 15px; } }
        </style>
    </head>
    <body>
        <header>
            <div class="container">
                <div class="profile-img">👨‍💻</div>
                <h1>${portfolioData.name}</h1>
                <p class="subtitle">${portfolioData.title}</p>
            </div>
        </header>

        <div class="container">
            <section class="section about">
                <h2>About Me</h2>
                <p>${portfolioData.about}</p>
            </section>

            <section class="section">
                <h2>Skills</h2>
                <div class="skills-grid">
                    ${portfolioData.skills.map(skill => `<div class="skill-item">${skill}</div>`).join('')}
                </div>
            </section>

            <section class="section">
                <h2>Experience</h2>
                ${portfolioData.experience.map(exp => `
                    <div class="experience-item">
                        <h3>${exp.title}</h3>
                        <div class="duration">${exp.company} | ${exp.duration}</div>
                        <p>${exp.description}</p>
                    </div>
                `).join('')}
            </section>

            <section class="section">
                <h2>Projects</h2>
                ${portfolioData.projects.map(project => `
                    <div class="project-item">
                        <h3>${project.name}</h3>
                        <p>${project.description}</p>
                        <div class="tech-stack">
                            ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                `).join('')}
            </section>
        </div>

        <section class="contact">
            <div class="container">
                <h2>Get In Touch</h2>
                <div class="contact-info">
                    <div class="contact-item">
                        <span>📧</span>
                        <span>${portfolioData.email}</span>
                    </div>
                    <div class="contact-item">
                        <span>📱</span>
                        <span>${portfolioData.phone}</span>
                    </div>
                    <div class="contact-item">
                        <span>📍</span>
                        <span>${portfolioData.location}</span>
                    </div>
                </div>
            </div>
        </section>

        <footer>
            <div class="container">
                <p>&copy; 2024 ${portfolioData.name}. All rights reserved.</p>
            </div>
        </footer>
    </body>
    </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Portfolio server running on http://localhost:${PORT}`);
});