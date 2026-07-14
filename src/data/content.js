export const personalInfo = {
  name: "Roshan Prajapat",
  title: "Full Stack Engineer",
  subtitle: "B.Tech, Electrical Engineering - IIT (ISM) Dhanbad",
  bio: "Full-stack engineer focused on building reliable, scalable web applications with clean interfaces and maintainable systems. Experienced across the MERN stack, with a strong foundation in data structures, algorithms, and product-minded engineering.",
  email: "theroshanprajapat@gmail.com",
  phone: "+91-7340478202",
  linkedin: "https://www.linkedin.com/in/theroshanprajapat/",
  leetcode: "https://www.leetcode.com/u/theroshanprajapat/",
};

export const experience = [
  {
    id: 1,
    company: "Fynd (Shopsense Retail Technologies Pvt. Ltd.)",
    roles: [
      {
        title: "Software Development Engineer - 1",
        businessUnit: "Catalog.cloud",
        period: "Oct 2021 - Sep 2023",
        duration: "2 yrs",
        location: "Mumbai",
        techStack: [
          "Full-stack Development",
          "ReactJs",
          "Node.js",
          "REST APIs",
        ],
        desc: [
          {
            header: "Core Development on Fynd PIM (formerly Catalog Cloud)",
            bullets: [
              "Spearheaded the frontend architecture and feature development using ReactJS, building scalable UI solutions for massive product catalog management.",
              "Demonstrated full-stack adaptability by seamlessly taking ownership of backend engineering tasks using Node.js during resource constraints, ensuring zero blockers in the project delivery pipeline.",
            ],
          },
        ],
      },
      {
        title: "Junior Engineer",
        businessUnit: "Fynd Platform",
        period: "Jul 2021 - Oct 2021",
        duration: "3 mos",
        location: "Mumbai",
        techStack: [
          "Front-end Development",
          "VueJS",
          "JavaScript",
          "Node.js",
          "REST APIs",
        ],
        desc: [
          {
            header: "E-Commerce Extensions & Integrations",
            bullets: [
              "Engineered and maintained robust VueJS frontend interfaces for major integrations, including the Nykaa and Nykaa Fashion extensions, streamlining multi-channel product workflows.",
              "Developed and optimized the Search & Recommendations extension, enhancing product discovery and driving better user engagement for storefronts.",
            ],
          },
          {
            header: "System Stability & Performance Optimization",
            bullets: [
              "Initiated tenure by aggressively debugging and resolving critical frontend issues, significantly improving overall application stability and user experience within the first quarter.",
              "Collaborated across teams to understand complex data flows, consistently optimizing both client-side interfaces and Node.js server-side components.",
            ],
          },
        ],
      },
      {
        title: "Software Engineering Intern",
        period: "Apr 2021 - Jun 2021",
        duration: "3 mos",
        location: "Mumbai",
        techStack: [
          "Full-stack Development",
          "VueJS",
          "JavaScript",
          "Node.js",
          "Express.js",
          "MongoDB",
          "REST APIs",
        ],
        desc: [],
      },
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "Samvad",
    description:
      "Architected a highly secure, zero-knowledge End-to-End Encrypted (E2EE) real-time communication platform utilizing React.js and Node.js. Engineered seamless Peer-to-Peer (P2P) video and audio calling capabilities via WebRTC, alongside a low-latency WebSocket signaling server using Socket.io. Implemented advanced privacy protocols, including AES-GCM cryptography via the Web Crypto API, local key management using IndexedDB, and custom auto-deleting features for ephemeral messages and media. Designed highly secure, in-browser custom renderers for media, ensuring files remain encrypted on third-party cloud storage (Cloudinary) and are only decrypted locally on the client.",
    techStack: [
      "React.js",
      "Vite",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.io",
      "WebRTC",
      "Web Crypto API",
      "IndexedDB",
      "Cloudinary",
    ],
    images: [
      "https://res.cloudinary.com/dul2oek47/image/upload/v1784028040/Screenshot_2026-07-14_124134_jpejlb.png",
      "https://res.cloudinary.com/dul2oek47/image/upload/v1784028041/Screenshot_2026-07-14_123134_afnuoe.png",
      "https://res.cloudinary.com/dul2oek47/image/upload/v1784028039/Screenshot_2026-07-14_164433_pwh4dr.png",
      "https://res.cloudinary.com/dul2oek47/image/upload/v1784028038/Screenshot_2026-07-14_164456_av0tgr.png",
      "https://res.cloudinary.com/dul2oek47/image/upload/v1784028038/Screenshot_2026-07-14_124305_gvf6cd.png",
      "https://res.cloudinary.com/dul2oek47/image/upload/v1784028038/Screenshot_2026-07-14_124325_reqsf5.png",
      "https://res.cloudinary.com/dul2oek47/image/upload/v1784028037/Screenshot_2026-07-14_124403_nkfy8b.png",
    ],
    link: "https://samvad-app.vercel.app/",
    github: "https://github.com/theroshanprajapat/samvad-frontend",
  },
  {
    id: 2,
    title: "PillowDrop",
    description:
      "Engineered a robust full-stack application using Node.js, Express.js, and MongoDB with dynamic EJS templating. Designed scalable RESTful APIs featuring secure, session-based authentication and robust middleware for data validation and route authorization. Enhanced user experience by integrating Mapbox for interactive geocoding and Cloudinary for seamless cloud image management.",
    techStack: [
      "Bootstrap",
      "EJS",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "RESTful APIs",
      "Mapbox",
      "Cloudinary",
      "Passport.js",
    ],
    images: [
      "https://res.cloudinary.com/dul2oek47/image/upload/v1782389209/Screenshot_2026-06-25_173119_zht2qo.png",
      "https://res.cloudinary.com/dul2oek47/image/upload/v1782389236/Screenshot_2026-06-25_173049_obbyhg.png",
    ],
    link: "https://pillow-drop.onrender.com/listings",
    github: "https://github.com/theroshanprajapat/pillow-drop",
  },
];

export const skills = {
  frontend: [
    "HTML",
    "CSS",
    "JavaScript",
    "Bootstrap",
    "ReactJS",
    "Material UI",
    "Tailwind CSS",
  ],
  backend: ["Node.js", "Express.js"],
  databases: ["MySQL", "MongoDB", "Firebase"],
  cloud: ["AWS EC2", "Amazon S3", "Vercel", "Render"],
  programming: ["Java", "OOPs", "JavaScript", "C++"],
  tools: ["Git", "GitHub", "Hoppscotch", "Postman"],
};

export const achievements = [
  {
    id: 1,
    title: "5 Star Coder",
    organization: "LeetCode",
    description:
      "Earned a 5-star coding rating through consistent problem solving and strong algorithmic practice.",
    icon: "Star",
  },
  {
    id: 2,
    title: "JEE Advanced Rank",
    organization: "IIT Admissions",
    description:
      "Secured All India Rank 2096 in JEE Advanced under the OBC-NCL category, leading to admission at IIT (ISM) Dhanbad.",
    icon: "Trophy",
  },
  {
    id: 3,
    title: "Ninja Wave Event",
    organization: "Coding Competition",
    description:
      "Ranked 13th in the Ninja Wave coding event, reflecting strong competitive programming performance.",
    icon: "Award",
  },
];

export const volunteering = [
  {
    id: 1,
    title: "Career Advisor",
    organization: "Fast Forward India (FFI)",
    period: "Nov 2018 - Mar 2020",
    description:
      "Mentored students on career planning and skill development as part of an IIT (ISM) Dhanbad initiative focused on rural education.",
    icon: "Users",
  },
  {
    id: 2,
    title: "Volunteer and Management Team Member",
    organization: "Kartavya NGO",
    period: "Nov 2017 - Mar 2021",
    description:
      "Coordinated classroom activities and learning support for children from underserved communities.",
    icon: "Heart",
  },
  {
    id: 3,
    title: "Organizer",
    organization: "Vibhav 2019",
    period: "Mar 2019",
    description:
      "Organized the annual technical festival for the Electrical Engineering department at IIT (ISM) Dhanbad.",
    icon: "Code2",
  },
  {
    id: 4,
    title: "Coordinator",
    organization: "PRAKASH - Annual Day of Kartavya",
    period: "Mar 2020",
    description:
      "Coordinated Kartavya IIT ISM Dhanbad's annual day event, supporting smooth execution and participant engagement.",
    icon: "Calendar",
  },
];

export const education = [
  {
    id: 1,
    institution: "Indian Institute of Technology (ISM), Dhanbad",
    degree: "B.Tech in Electrical Engineering",
    period: "2017 - 2021",
    grade: "7.5 CGPA",
    location: "Dhanbad",
  },
  {
    id: 2,
    institution: "Krishna Vidya Mandir",
    degree: "Class XII - Senior Secondary",
    period: "2016 - 2017",
    grade: "85.00%",
    location: "Sikar",
  },
  {
    id: 3,
    institution: "Bajrang Senior Secondary School",
    degree: "Class X - Secondary Education",
    period: "2014 - 2015",
    grade: "88.87%",
    location: "Alwar",
  },
];
