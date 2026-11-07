import type { Content } from "./types";

/**
 * SINGLE SOURCE OF TRUTH for the portfolio.
 *
 * Add a project  -> push an object to `projects`.
 * Add a job/edu  -> push an object to `timeline`.
 * Everything else (hero, 3D cards, grid, SEO) regenerates automatically.
 */
export const content: Content = {
  profile: {
    name: "Atchi Vamsi Krishna Reddy",
    role: "Frontend Engineer",
    tagline:
      "I build fast, resilient interfaces for complex logistics platforms, turning dense, data-heavy workflows into UI people actually enjoy using.",
    location: "Visakhapatnam, India",
    email: "vamc.5143@gmail.com",
    phone: "+91 99510 04199",
    yearsExperience: 4,
    resume: "/Atchi-Vamsi-Krishna-Reddy-Resume.pdf",
  },

  socials: [
    {
      label: "GitHub",
      href: "https://github.com/vamsy-Reddy",
      handle: "@vamsy-Reddy",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/vamsi-krishna-reddy-431449228/",
      handle: "in/vamsi-krishna-reddy",
    },
    {
      label: "Email",
      href: "mailto:vamc.5143@gmail.com",
      handle: "vamc.5143@gmail.com",
    },
  ],

  skills: [
    {
      label: "Frontend",
      items: [
        "React.js",
        "JavaScript (ES6+)",
        "TypeScript",
        "HTML5",
        "CSS3",
        "Responsive Design",
      ],
    },
    {
      label: "State Management",
      items: ["Redux Toolkit", "Context API"],
    },
    {
      label: "Styling / UI",
      items: [
        "Tailwind CSS",
        "Material UI",
        "Ant Design",
        "CSS Modules",
        "Sass",
        "Pixel-perfect UI",
      ],
    },
    {
      label: "Testing",
      items: ["Playwright", "React Testing Library", "Jest"],
    },
    {
      label: "Performance",
      items: ["Code Splitting", "Lazy Loading", "Bundle Optimization"],
    },
    {
      label: "DevOps / Tools",
      items: ["Git", "GitHub", "Docker", "Docker Compose", "Vite", "Agile"],
    },
    {
      label: "Also exploring",
      items: [
        "Next.js (SSR/SSG)",
        "Three.js",
        "React Three Fiber",
        "WebGL / GLSL",
        "Framer Motion",
        "GraphQL",
        "SEO",
        "Node.js / Express",
      ],
    },
  ],

  timeline: [
    {
      date: "2025 to Present",
      title: "Software Engineer 3",
      org: "Imaginnovate",
      kind: "work",
      summary:
        "Own reusable UI systems and performance for high-traffic logistics platforms.",
      highlights: [
        "Built a modular, reusable component architecture that lifted team development velocity.",
        "Cut initial load time via code-splitting, lazy loading, and bundle optimization.",
        "Automated UI testing with Playwright and raised code quality through reviews.",
      ],
    },
    {
      date: "2023 to 2025",
      title: "Software Engineer 1",
      org: "Imaginnovate",
      kind: "work",
      summary:
        "Shipped responsive, component-based React apps against live REST APIs.",
      highlights: [
        "Integrated multiple REST APIs and handled JSON data for dynamic, real-time UI.",
        "Improved UI/UX performance and user engagement across core screens.",
        "Partnered with backend teams for seamless, reliable integration.",
      ],
    },
    {
      date: "2022",
      title: "ReactJS Trainee",
      org: "Imaginnovate",
      kind: "work",
      summary:
        "Leveled up on modern React, getting comfortable with hooks, props, and real frontend workflows.",
      highlights: [
        "Built dynamic React apps and interactive UI components.",
        "Got hands-on with Git, VS Code, and browser dev tools.",
      ],
    },
    {
      date: "2022",
      title: "Frontend Intern",
      org: "Imaginnovate",
      kind: "work",
      summary:
        "Joined as an intern and strengthened HTML, CSS, and JavaScript fundamentals on real pages, the start of the path to a permanent engineering role.",
    },
    {
      date: "Dec 2021",
      title: "M.Tech, Industrial Engineering",
      org: "Andhra University",
      kind: "edu",
      summary:
        "Systems thinking, optimization, and process design, the analytical backbone I bring to UI performance work.",
    },
    {
      date: "2021",
      title: "The Pivot: From Machines To Interfaces",
      kind: "milestone",
      summary:
        "Taught myself frontend engineering and reframed a mechanical engineering mindset (constraints, trade-offs, iteration) around the browser. Shipping software was the goal, and I committed to it fully.",
    },
    {
      date: "Nov 2018",
      title: "B.Tech, Mechanical Engineering",
      org: "Raghu Engineering College",
      kind: "edu",
      summary:
        "Where the engineering discipline started: model the system, respect the constraints, measure before you optimize.",
    },
  ],

  projects: [
    {
      slug: "fleetenable",
      title: "FleetEnable",
      tagline: "Frontend for a high-traffic drayage & freight platform.",
      role: "Intern to Software Engineer 3",
      period: "2022 to Present",
      featured: true,
      problem:
        "Logistics operators needed real-time visibility into dense drayage and freight workflows, screens packed with live shipment data that still had to stay fast, legible, and usable under load.",
      approach:
        "Built scalable, reusable React components and integrated multiple REST APIs with dynamic JSON handling for real-time shipment and workflow visibility, then optimized complex data-driven screens for both performance and usability.",
      impact:
        "A reliable, responsive platform across desktop and tablet, hardened with Playwright and React Testing Library automation and consistent cross-browser behavior.",
      tech: ["React", "JavaScript", "REST APIs", "Playwright", "RTL"],
      accent: "#6ee7ff",
    },
    {
      slug: "health-goal-microservice",
      title: "Health Goal Microservice",
      tagline: "A MACH-compliant, headless CRUD service end to end.",
      role: "Full-stack (solo)",
      problem:
        "I wanted to understand modern MACH architecture firsthand, not from a diagram but by building a cloud-native, headless service and the decoupled frontend that consumes it.",
      approach:
        "Designed and implemented a MACH-compliant health-goal microservice with Node.js, Express, and MongoDB exposing full CRUD REST APIs. Built a decoupled React (Vite) frontend following headless principles, containerized the backend with Docker and Docker Compose, and added Joi validation with structured error handling.",
      impact:
        "Comprehensive Jest and Supertest coverage across every CRUD scenario, running in isolated, reproducible environments, a complete and deployable reference for headless architecture.",
      tech: [
        "Node.js",
        "Express",
        "MongoDB",
        "React",
        "Vite",
        "Docker",
        "Jest",
        "Supertest",
      ],
      accent: "#a78bfa",
    },
    {
      slug: "donor-management",
      title: "Donor Management System",
      tagline: "A maintainable donor UI built from scratch.",
      role: "Frontend",
      problem:
        "A donor-facing tool needed an intuitive interface with smooth data flow, and a structure the team could keep extending.",
      approach:
        "Built the responsive UI from the ground up with a modular component structure, keeping data flow predictable and the codebase easy to maintain.",
      impact:
        "An intuitive UX on a clean, modular foundation ready for future features.",
      tech: ["React", "Redux", "Vite"],
      accent: "#34d399",
    },
    {
      slug: "blended-sense",
      title: "Blended Sense",
      tagline: "Landing page + secure authentication flows.",
      role: "Frontend",
      problem:
        "The product needed a polished responsive landing experience and trustworthy login flows.",
      approach:
        "Developed the responsive landing page and implemented OAuth-based login authentication, with attention to frontend security practices.",
      impact: "A smoother first-touch experience with safer authentication.",
      tech: ["React", "Redux", "Vite", "OAuth"],
      accent: "#f472b6",
    },
  ],

  learning: [
    {
      title: "I Started As A Mechanical Engineer",
      body: "Two engineering degrees taught me to model a system before touching it: define the constraints, find the trade-offs, measure before optimizing. When I moved to the browser, those instincts didn't change, only the material did.",
    },
    {
      title: "I Learn By Shipping, Then Measuring",
      body: "The fastest way I internalize something is to build the real thing and watch the numbers. Optimizing initial load time with code-splitting and lazy loading wasn't a tutorial for me, it was profiling a live logistics app and chasing the bottleneck until it moved.",
    },
    {
      title: "Tests Are How I Learn A Codebase",
      body: "Writing Playwright and RTL tests forces me to understand exactly how a feature is meant to behave. Testing isn't an afterthought I bolt on, it's how I build the confidence to change code I didn't write.",
    },
    {
      title: "I Go To The Architecture To Understand It",
      body: "I don't take patterns on faith. To actually learn MACH and headless architecture I built a containerized microservice and a decoupled frontend end to end, so the concepts became something I'd debugged, not just read about.",
    },
  ],

  education: [
    {
      degree: "M.Tech, Industrial Engineering",
      org: "Andhra University, Visakhapatnam",
      date: "Dec 2021",
    },
    {
      degree: "B.Tech, Mechanical Engineering",
      org: "Raghu Engineering College, Visakhapatnam",
      date: "Nov 2018",
    },
  ],
};

export default content;
