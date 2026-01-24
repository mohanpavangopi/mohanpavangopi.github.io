// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu if open
      navMenu.classList.remove("active");
    }
  });
});

// Navbar scroll effect
const navbar = document.getElementById("navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // Add shadow when scrolled
  if (currentScroll > 0) {
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.5)";
  } else {
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.3)";
  }

  lastScroll = currentScroll;
});

// Mobile menu toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  // Animate hamburger icon
  hamburger.classList.toggle("active");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.classList.remove("active");
  }
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all animated elements
document
  .querySelectorAll(
    ".skill-category, .project-card, .timeline-item, .cert-item",
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// Contact form handling
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Create mailto link
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  );
  const mailtoLink = `mailto:22bq1a4718@vvit.net?subject=${subject}&body=${body}`;

  // Open email client
  window.location.href = mailtoLink;

  // Show success message
  showNotification(
    "Message prepared! Your email client should open shortly.",
    "success",
  );

  // Reset form
  contactForm.reset();
});

// Notification system
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Style the notification
  Object.assign(notification.style, {
    position: "fixed",
    top: "100px",
    right: "20px",
    padding: "1rem 2rem",
    borderRadius: "10px",
    background: type === "success" ? "#10b981" : "#6366f1",
    color: "white",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
    zIndex: "9999",
    animation: "slideInRight 0.5s ease",
    fontWeight: "500",
  });

  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.5s ease";
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}

// Add animation keyframes for notifications
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: #6366f1 !important;
        position: relative;
    }
    
    .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
    }
`;
document.head.appendChild(style);

// Typing effect for hero title
const heroTitle = document.querySelector(".hero-title");
const titleText = heroTitle.innerHTML;
heroTitle.innerHTML = "";

let charIndex = 0;
function typeText() {
  if (charIndex < titleText.length) {
    heroTitle.innerHTML += titleText.charAt(charIndex);
    charIndex++;
    setTimeout(typeText, 50);
  }
}

// Start typing effect when page loads
window.addEventListener("load", () => {
  setTimeout(typeText, 500);
});

// Particle effect on mouse move (optional enhancement)
document.addEventListener("mousemove", (e) => {
  if (Math.random() > 0.98) {
    createParticle(e.clientX, e.clientY);
  }
});

function createParticle(x, y) {
  const particle = document.createElement("div");
  particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${x}px;
        top: ${y}px;
        animation: particleFade 1s ease-out forwards;
    `;

  document.body.appendChild(particle);

  setTimeout(() => particle.remove(), 1000);
}

// Add particle animation
const particleStyle = document.createElement("style");
particleStyle.textContent = `
    @keyframes particleFade {
        to {
            opacity: 0;
            transform: translateY(-50px) scale(0);
        }
    }
`;
document.head.appendChild(particleStyle);

// Skills counter animation
function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.textContent = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Add cursor trail effect
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

if (window.innerWidth > 768) {
  // Create cursor trail circles
  for (let i = 0; i < 20; i++) {
    const circle = document.createElement("div");
    circle.className = "circle";
    circle.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: rgba(99, 102, 241, 0.3);
            pointer-events: none;
            z-index: 9998;
            transition: all 0.3s ease;
        `;
    document.body.appendChild(circle);
  }

  const allCircles = document.querySelectorAll(".circle");

  allCircles.forEach((circle, index) => {
    circle.x = 0;
    circle.y = 0;
  });

  window.addEventListener("mousemove", (e) => {
    coords.x = e.clientX;
    coords.y = e.clientY;
  });

  function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    allCircles.forEach((circle, index) => {
      circle.style.left = x - 5 + "px";
      circle.style.top = y - 5 + "px";
      circle.style.transform = `scale(${(allCircles.length - index) / allCircles.length})`;

      circle.x = x;
      circle.y = y;

      const nextCircle = allCircles[index + 1] || allCircles[0];
      x += (nextCircle.x - x) * 0.3;
      y += (nextCircle.y - y) * 0.3;
    });

    requestAnimationFrame(animateCircles);
  }

  animateCircles();
}

// Console message for developers
console.log(
  "%cðŸ‘‹ Hello, Developer!",
  "font-size: 20px; color: #6366f1; font-weight: bold;",
);
console.log(
  "%cInterested in the code? Check out my GitHub!",
  "font-size: 14px; color: #8b5cf6;",
);
console.log(
  "%chttps://github.com/mohanpavangopi",
  "font-size: 12px; color: #cbd5e1;",
);

