const projectsData = [
    {
      title: "Predictive Analytics for finding One Piece",
      description: "An ML model analyzing satellite data to predict forest fires.",
      image: "https://assets-prd.ignimgs.com/2022/08/17/top25animecharacters-blogroll-1660777571580.jpg",
      tags: ["Python", "TensorFlow", "Google Earth Engine"],
      badge: {text: "FUTURE PROJECT", color: "blue"},
      learnMoreLink: "#"
    },
    {
      title: "AI Tutor for IITM BS Students",
      description: "A chatbot leveraging NLP to answer course queries.",
      image: "https://static1.dualshockersimages.com/wordpress/wp-content/uploads/2023/09/10-most-expensive-anime-series-ranked.jpg",
      tags: ["Python", "NLP", "Transformers"],
      badge: {text: "FUTURE PROJECT", color: "purple"},
      learnMoreLink: "#"
    }
  ];

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