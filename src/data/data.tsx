// This file contains all project data for the InfinAI club

// Add this to your data.js file
export const categoriesData = [
  // {
  //   image: "/images/about-us-anime.jpg", // Consider using a Steins;Gate or Code Geass themed image
  //   title: "About Us",
  //   description: "Discover our story and mission to advance AI/ML research and education.",
  //   url: "/about",
  //   animeReference: "Inspired by the scientific curiosity from Steins;Gate",
  //   gradientFrom: "from-blue-900",
  //   gradientTo: "to-indigo-900",
  // },
  {
    image: "https://i0.wp.com/www.animefeminist.com/wp-content/uploads/2021/04/Higehiro-Episode-1-1a.jpg?quality=80&ssl=1&strip=info&w=800", //https://cdn.moviepilot.de/files/ad45d51c761eb576fe7617589ae61defa6b44713717c365603e73bfc8d22/fill/1200/576/Haikyuu%20-%20Titelbild.jpeg", // Tournament arc themed image from My Hero Academia
    title: "Events",
    description: "Join our tournaments, hackathons, and collaborative challenges.",
    url: "/events",
    animeReference: "Events as exciting as My Hero Academia tournaments",
    gradientFrom: "from-red-900",
    gradientTo: "to-orange-900",
  },
  {
    image: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/03/makise-kurisu-in-steins-gate-anime-1.jpg", // Mecha/tech themed from Ghost in the Shell
    title: "Projects & Research",
    description: "Explore cutting-edge AI/ML research and technical innovations.",
    url: "/projects", 
    animeReference: "Advanced tech inspired by Ghost in the Shell",
    gradientFrom: "from-purple-900",
    gradientTo: "to-pink-900",
  },
  {
    image: "https://static1.colliderimages.com/wordpress/wp-content/uploads/2022/11/blue-lock.jpg?q=50&fit=crop&w=1140&h=&dpr=1.5", // Blue Lock team-themed image
    title: "Our Team",
    description: "Meet the talented individuals working together to push AI boundaries.",
    url: "/team",
    animeReference: "Team synergy like Blue Lock",
    gradientFrom: "from-gray-800",
    gradientTo: "to-cyan-900",
  },
  {
    image: "https://cinema-safari.com/wp-content/uploads/2024/01/death-note.jpg", // Death Note themed for detailed writing
    title: "Blog",
    description: "Read our thoughts and insights on the latest in AI/ML research.",
    url: "/blog",
    animeReference: "Detailed analysis worthy of Death Note",
    gradientFrom: "from-gray-900",
    gradientTo: "to-gray-800",
  },
  // {
  //   image: "/images/tutorials-anime.jpg", // Naruto training arc themed
  //   title: "Tutorials",
  //   description: "Level up your skills with our step-by-step AI/ML training guides.",
  //   url: "/tutorials",
  //   animeReference: "Train like a Naruto character",
  //   gradientFrom: "from-orange-900",
  //   gradientTo: "to-yellow-900",
  // },
  {
    image: "https://occ-0-8407-92.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABZRdGNHzHpJ9H6nMgtTy5wXYohQuyAefWZQM-lYfIzK72xBEn1NVvx5y8SnnjzmTw-c_gxRJajluQXZnJ0KGlg5ybl1OeTI_6UXX.jpg?r=3cd", // Pokémon collection themed
    title: "Datasets",
    description: "Catch 'em all! Access our curated datasets for your projects.",
    url: "/datasets",
    animeReference: "Collect datasets like Pokémon",
    gradientFrom: "from-red-900",
    gradientTo: "to-yellow-900",
  },
  {
    image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/765984af-09fb-471b-9e1c-98276354cdb4/deh670i-eab065c1-33a6-4e9c-a94d-ee36e9bbaf87.jpg/v1/fill/w_1280,h_720,q_75,strp/demon_lord_rimuru_by_bdkpatahaty_deh670i-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvNzY1OTg0YWYtMDlmYi00NzFiLTllMWMtOTgyNzYzNTRjZGI0XC9kZWg2NzBpLWVhYjA2NWMxLTMzYTYtNGU5Yy1hOTRkLWVlMzZlOWJiYWY4Ny5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.de5kiFsZ46dKKyQYtZtAfZj0USciVSKuXe3jLxXudTM", // Doraemon gadget themed
    title: "AI Tools & Tutorials",
    description: "Discover magical tools and resources to enhance your AI development.",
    url: "/tools",
    animeReference: "Useful tools like Doraemon's gadgets",
    gradientFrom: "from-blue-900",
    gradientTo: "to-teal-900",
  },
];


const projectsData = [
  {
    id: "predictive-analytics",
    title: "Predictive Analytics for finding One Piece",
    description: "An advanced machine learning model that analyzes satellite imagery and environmental data to predict potential forest fire hotspots. This project combines computer vision with meteorological datasets to create an early warning system for environmental conservation efforts.",
    fullDescription: "This project leverages state-of-the-art machine learning techniques to analyze satellite imagery combined with historical meteorological data, creating a predictive model for forest fire risk assessment. The system processes multispectral satellite images using a custom CNN architecture, while incorporating weather data through a parallel LSTM network. The final model achieves 87% accuracy in identifying high-risk areas 3-5 days before traditional methods can detect similar patterns. Future work will focus on extending the prediction window and incorporating more granular climate variables.",
    image: "https://assets-prd.ignimgs.com/2022/08/17/top25animecharacters-blogroll-1660777571580.jpg",
    tags: ["Python", "TensorFlow", "Google Earth Engine", "Remote Sensing"],
    badge: {text: "FUTURE PROJECT", color: "blue"},
    team: ["Aditya Kumar", "Priya Singh", "Rohan Mehta"],
    github: "https://github.com/infinai/predictive-analytics",
    demoLink: null,
    completed: false,
    featuredOrder: 1
  },
  {
    id: "ai-tutor",
    title: "AI Tutor for IITM BS Students",
    description: "A sophisticated chatbot leveraging natural language processing to answer course-specific queries for IITM BS students. This virtual assistant helps students navigate complex course material through an intuitive conversational interface.",
    fullDescription: "The AI Tutor project addresses the need for 24/7 academic support for IITM BS students. Built using a fine-tuned LLM on course-specific materials, this virtual assistant can answer complex queries, explain difficult concepts, and direct students to appropriate resources. The system incorporates a RAG (Retrieval Augmented Generation) approach, pulling from a database of lecture notes, textbook excerpts, and previous exam questions. User feedback is incorporated through a reinforcement learning mechanism to continuously improve response quality. The current version supports five core courses, with plans to expand across the entire curriculum.",
    image: "https://static1.dualshockersimages.com/wordpress/wp-content/uploads/2023/09/10-most-expensive-anime-series-ranked.jpg",
    tags: ["Python", "NLP", "Transformers", "FastAPI"],
    badge: {text: "FUTURE PROJECT", color: "purple"},
    team: ["Vikram Sharma", "Ananya Patel", "Dhruv Kapoor"],
    github: "https://github.com/infinai/ai-tutor",
    demoLink: null,
    completed: false,
    featuredOrder: 2
  },
  {
    id: "computer-vision-lab",
    title: "Computer Vision Research Lab",
    description: "A collection of computer vision experiments and implementations focusing on object detection, semantic segmentation, and activity recognition tailored for education and research purposes.",
    fullDescription: "The Computer Vision Research Lab is a comprehensive repository of computer vision implementations, experiments, and educational materials developed by InfinAI members. The project includes implementations of popular algorithms like YOLO, Mask R-CNN, and ViT, adapted for specific use cases and optimized for educational understanding. Each implementation is accompanied by detailed documentation explaining the mathematical foundations and algorithmic approaches. The lab also includes several novel research contributions in the areas of efficient inference on edge devices and domain adaptation for limited training data scenarios. This project serves both as a learning platform for new members and as a foundation for further research initiatives.",
    image: "/images/computer-vision-lab.jpg",
    tags: ["PyTorch", "OpenCV", "TensorRT", "CUDA"],
    badge: {text: "FUTURE PROJECT", color: "green"},
    team: ["Karthik Reddy", "Nisha Verma", "Arjun Malhotra", "Zara Khan"],
    github: "https://github.com/infinai/cv-lab",
    demoLink: "https://cv-lab.infinai.org",
    completed: false,
    featuredOrder: 3
  },
  {
    id: "data-visualization-toolkit",
    title: "Data Visualization Toolkit for ML Research",
    description: "An interactive visualization toolkit designed specifically for machine learning researchers to better understand model behavior, training dynamics, and feature importance across various algorithms.",
    fullDescription: "The Data Visualization Toolkit addresses the growing complexity of interpreting machine learning models by providing a comprehensive suite of visualization tools. The toolkit includes interactive dashboards for tracking training metrics, feature importance analyzers, activation map visualizers for neural networks, and decision boundary plotters for classification models. Built with D3.js and React, the system allows researchers to gain deeper insights into model behavior through visual exploration. The toolkit has been adopted by multiple research groups within IITM and has contributed to improved model development cycles by quickly identifying performance bottlenecks and unexpected behaviors.",
    image: "/images/data-viz-toolkit.jpg",
    tags: ["JavaScript", "D3.js", "React", "Python"],
    badge: {text: "FUTURE PROJECT", color: "green"},
    team: ["Rahul Gupta", "Meera Krishnan", "Tanya Shah"],
    github: "https://github.com/infinai/ml-viz-toolkit",
    demoLink: "https://viz.infinai.org",
    completed: false,
    featuredOrder: 4
  },
  {
    id: "reinforcement-learning-platform",
    title: "Reinforcement Learning Platform",
    description: "A comprehensive platform for experimenting with reinforcement learning algorithms in simulated environments, supporting both classic algorithms and cutting-edge approaches.",
    fullDescription: "The Reinforcement Learning Platform is a versatile system designed to facilitate experimentation and research in reinforcement learning. The platform includes implementations of classic algorithms (Q-learning, SARSA, DQN) and modern approaches (PPO, SAC, DDPG), along with a variety of customizable environments spanning from classic control problems to more complex robotics simulations. The platform's modular architecture allows researchers to easily swap components, modify reward functions, and benchmark different approaches. Additionally, the system includes tools for hyperparameter optimization, policy visualization, and result analysis. This project has supported several undergraduate research initiatives and has been integrated into the curriculum of advanced AI courses.",
    image: "/images/rl-platform.jpg",
    tags: ["Python", "PyTorch", "OpenAI Gym", "MuJoCo"],
    badge: {text: "FUTURE PROJECT", color: "green"},
    team: ["Aryan Choudhary", "Neha Sharma", "Sam Patel"],
    github: "https://github.com/infinai/rl-platform",
    demoLink: "https://rl.infinai.org",
    completed: false,
    featuredOrder: 5
  },
  // {
  //   id: "quantum-ml-research",
  //   title: "Quantum Machine Learning Research",
  //   description: "Exploring the intersection of quantum computing and machine learning, focusing on quantum neural networks and variational quantum algorithms for optimization problems.",
  //   fullDescription: "The Quantum Machine Learning Research project investigates how quantum computing can enhance traditional machine learning approaches. Our work focuses on three main areas: developing variational quantum circuits for classification tasks, exploring quantum-inspired classical algorithms that mimic certain quantum advantages, and creating efficient quantum encodings for high-dimensional data. Using IBM's Qiskit and Google's Cirq frameworks, we've implemented several proof-of-concept models demonstrating potential quantum advantages on specific problem classes. While still largely theoretical, this cutting-edge research positions InfinAI at the forefront of an emerging field with significant future potential.",
  //   image: "/images/quantum-ml.jpg",
  //   tags: ["Qiskit", "Cirq", "Python", "Linear Algebra"],
  //   badge: {text: "RESEARCH", color: "yellow"},
  //   team: ["Sayan Das", "Shreya Mehta", "Vikrant Singh"],
  //   github: "https://github.com/infinai/quantum-ml",
  //   demoLink: null,
  //   completed: false,
  //   featuredOrder: 6
  // }
];

// Helper function to get featured projects (sorted by featuredOrder)
export const getFeaturedProjects = () => {
  return projectsData
    .filter(project => project.featuredOrder !== undefined)
    .sort((a, b) => a.featuredOrder - b.featuredOrder);
};

// Helper function to get active projects
export const getActiveProjects = () => {
  return projectsData.filter(project => project.badge?.text === "ACTIVE");
};

// Helper function to get future projects
export const getFutureProjects = () => {
  return projectsData.filter(project => project.badge?.text === "FUTURE PROJECT");
};

// Helper function to get research projects
export const getResearchProjects = () => {
  return projectsData.filter(project => project.badge?.text === "RESEARCH");
};

// Helper function to get a project by ID
export const getProjectById = (id:any) => {
  return projectsData.find(project => project.id === id);
};

  // Testimonial data
  const testimonialData = [
    {
      quote: "InfinAI helped me transition from theory to building real-world AI solutions!",
      name: "Riya",
      role: "BS Data Science '23",
      avatarColor: "blue"
    },
    {
      quote: "The collaborative environment pushed me to publish my first research paper.",
      name: "Arjun",
      role: "BS AI '24",
      avatarColor: "purple"
    }
  ];

  // Event data
  const featuredEventData = {
    title: "Guest Speaker: Amit Shah, CS Manager at IBM",
    description: "WatsonX Architect with 28 years of industry experience sharing valuable insights",
    badge: "UPCOMING EVENT",
    buttonText: "Register Now",
    buttonLink: "#"
  };

  // Offering cards data
  const offeringsData = [
    {
      title: "Events & Workshops",
      description: "Hands-on workshops, hackathons, and guest lectures by industry experts.",
      items: ["Intro to Deep Learning", "AI for Social Good Hackathon", "Kaggle Competition Prep Sessions"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: "blue"
    },
    {
      title: "Projects & Research",
      description: "Collaborate on cutting-edge AI projects and publish research.",
      items: ["AI-driven healthcare diagnostics", "NLP for regional languages", "Open-source ML tools"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      color: "purple"
    },
    {
      title: "Resources",
      description: "Curated learning paths, tutorials, and toolkits for AI/ML enthusiasts.",
      items: ["Comprehensive tutorials", "Dataset repositories", "IITM course integrations"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: "green"
    },
    {
      title: "Community",
      description: "Connect with 500+ peers, mentors, and alumni in our Discord/Slack.",
      items: ["Study groups", "Mentorship sessions", "Networking opportunities"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: "red"
    }
  ];


export { projectsData, testimonialData, featuredEventData, offeringsData };