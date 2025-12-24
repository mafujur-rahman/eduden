const courseOptions = [
  {
    title: "Ethical Hacking for Beginners – 45 Days Hands-On Course",
    slug: "ethical-hacking-beginners",
  },
  {
    title: "Generative AI & Prompt Engineering – 45 Days Hands-On Course",
    slug: "generative-ai",
  },
  {
    title: "AI & Machine Learning with Python – 90 Days Job-Ready Career Track",
    slug: "ai-ml-python",
  },
  {
    title:
      "Data Science & Analytics with Python + Power BI – 60 Days Career Track",
    slug: "data-science-analytics",
  },
  {
    title: "Python Programming – Gateway to AI & Machine Learning",
    slug: "python-programming",
  },
  {
    title: "Blockchain Essentials – Learn & Build Decentralized Systems",
    slug: "blockchain-essentials",
  },
  {
    title: "IoT Foundations – 30 Days Hands-On Learning Program",
    slug: "iot-foundations",
  },
  {
    title: "Big Data Engineering – Hadoop, Spark, Kafka Career Track",
    slug: "big-data-engineering",
  },
  {
    title: "Cloud Computing with AWS – Fundamentals (30 Days Hands-On)",
    slug: "cloud-aws",
  },
  {
    title: "Linux Essentials – RHCE-Based Fundamentals",
    slug: "linux-essentials",
  },
  {
    title: "DevOps for Beginners – Foundation Track",
    slug: "devops-beginners",
  },
  {
    title: "Flutter App Development – 60 Days Hands-On Training",
    slug: "flutter-development",
  },
  {
    title: "Networking Zero – Foundation Course (Based on CCNA Syllabus)",
    slug: "networking-zero",
  },
  {
    title: "Graphic Designing and Visual Communication",
    slug: "graphic-design-visual-communication",
  },
  {
    title: "Advanced Digital Marketing 6 Months Hands-On Training",
    slug: "advanced-digital-marketing",
  },
  {
    title: "UI/UX Design – Industry-Ready Hands-On Course",
    slug: "ui-ux-design",
  },
  {
    title: "Shell Scripting – 30 Days Hands-On Training",
    slug: "shell-scripting",
  },
  {
    title: "Python for Offensive PenTest – 45 Days Hands-On Training",
    slug: "python-pentest",
  },
  {
    title: "Web Development Basics – 45 Days Hands-On Course",
    slug: "web-development",
  },
  {
    title: "WordPress Mastery: Build, Design & Sell",
    slug: "wordpress-mastery",
  },
  {
    title: "JavaScript, React & Next.js Mastery – 90 Days Hands-On Training",
    slug: "react-nextjs",
  },
  {
    title: "Backend Development with Django – 60 Days Hands-On Training",
    slug: "backend-django",
  },
  {
    title: "Backend Development with Node.js – 60 Days Hands-On Training",
    slug: "backend-nodejs",
  },
  {
    title:
      "Database Mastery: SQL + NoSQL (MongoDB & MariaDB) – 45 Days Hands-On Training",
    slug: "database-mastery",
  },
  {
    title: "Cybersecurity Advanced – Red Team/Blue Team Career Track",
    slug: "cybersecurity-advanced",
  },
  {
    title: "Digital Forensics – 90 Days Hands-On Training",
    slug: "digital-forensics",
  },
  {
    title: "Start Bug Bounty Hunting – 50 Days Hands-On Training",
    slug: "bug-bounty",
  },
  {
    title: "Network Penetration Testing – 45 Days Hands-On Course",
    slug: "network-pentest",
  },
  { title: "SOC Analyst – 60 Days Hands-On Training", slug: "soc-analyst" },
  {
    title: "Cloud Security – 60 Days Hands-On Training",
    slug: "cloud-security",
  },
  {
    title:
      "Android Application Penetration Testing – Basics (30 Days Hands-On Course)",
    slug: "android-pentest-basics",
  },
  {
    title:
      "Android Application Penetration Testing – Advanced (45 Days Hands-On Course)",
    slug: "android-pentest-advanced",
  },
  {
    title:
      "Mobile App Development with React Native – 60 Days Hands-On Training",
    slug: "react-native",
  },
  {
    title: "iOS App Development with Swift – 60 Days Hands-On Training",
    slug: "ios-development",
  },
  {
    title:
      "Full Stack Mobile App Development – Flutter + Django (90 Days Hands-On)",
    slug: "fullstack-mobile",
  },
  { title: "SEO Mastery – 30 Days Hands-On Training", slug: "seo-mastery" },
  {
    title: "Advanced Digital Marketing + SEO – 90 Days Hands-On Training",
    slug: "digital-marketing-seo",
  },
  {
    title: "Networking Advanced – Routing Mastery (CCNP + CCIE Syllabus Based)",
    slug: "networking-routing",
  },
  {
    title: "Networking Advanced – Switching Mastery (CCNP/CCIE Based)",
    slug: "networking-switching",
  },
  {
    title: "Cloud Computing Architect with AWS – 90 Days Career Track",
    slug: "cloud-architect-aws",
  },
  {
    title: "Cloud Computing with Azure – 45 Days Fundamentals + Projects",
    slug: "cloud-azure",
  },
  {
    title: "CloudOps Pro – DevOps + Cloud Engineering Training (AWS + Azure)",
    slug: "cloudops-pro",
  },
  {
    title: "DevOps Mastery – 90 Days Advanced Career Track",
    slug: "devops-mastery",
  },
  {
    title: "Linux Pro – Advanced Server Admin & Automation (RHCE Focused)",
    slug: "linux-pro",
  },
  {
    title: "Diploma in Full Stack Programming – 9 Months Career Track",
    slug: "fullstack-diploma",
  },
  {
    title: "MERN Stack Developer – 6 Months Hands-On Training",
    slug: "mern-stack",
  },
  {
    title: "Web3 & dApp Development – Full Stack Blockchain in 60 Days",
    slug: "web3-dapp",
  },
  {
    title: "AI-Powered Digital Marketing – Hands-On in 60 Days",
    slug: "ai-digital-marketing",
  },
  {
    title:
      "Deep Learning & Neural Networks with TensorFlow & Keras – 60 Days Hands-On Training",
    slug: "deep-learning",
  },
  {
    title:
      "Applied AI in Healthcare, Finance & Marketing – 45 Days Industry-Focused Course",
    slug: "applied-ai",
  },
  {
    title:
      "Natural Language Processing (NLP) & LLMs with Hugging Face – 60 Days Hands-On Course",
    slug: "nlp-llms",
  },
];


// 1. https://c-eduden-next.vercel.app/course/graphic-design-visual-communication
// 2. https://c-eduden-next.vercel.app/course/advanced-digital-marketing
// 3. https://c-eduden-next.vercel.app/course/networking-zero
// 4. https://c-eduden-next.vercel.app/course/ai-machine-learning-with-python
// 5. https://c-eduden-next.vercel.app/course/ethical-hacking-beginners
// 6. https://c-eduden-next.vercel.app/course/generative-ai
// 7. https://c-eduden-next.vercel.app/course/data-science-analytics
// 8. https://c-eduden-next.vercel.app/course/python-programming
// 9. https://c-eduden-next.vercel.app/course/blockchain-essentials
// 10. https://c-eduden-next.vercel.app/course/iot-foundations
// 11. https://c-eduden-next.vercel.app/course/big-data-engineering
// 12. https://c-eduden-next.vercel.app/course/cloud-aws
// 13. https://c-eduden-next.vercel.app/course/linux-essentials
// 14. https://c-eduden-next.vercel.app/course/devops-beginners
// 15. https://c-eduden-next.vercel.app/course/flutter-development
// 16. https://c-eduden-next.vercel.app/course/ui-ux-design
// 17. https://c-eduden-next.vercel.app/course/shell-scripting
// 18. https://c-eduden-next.vercel.app/course/python-pentest
// 19. https://c-eduden-next.vercel.app/course/web-development
// 20. https://c-eduden-next.vercel.app/course/wordpress-mastery
// 21. https://c-eduden-next.vercel.app/course/react-nextjs
// 22. https://c-eduden-next.vercel.app/course/backend-django
// 23. https://c-eduden-next.vercel.app/course/backend-nodejs
// 24. https://c-eduden-next.vercel.app/course/database-mastery
// 25. https://c-eduden-next.vercel.app/course/cybersecurity-advanced
// 26. https://c-eduden-next.vercel.app/course/digital-forensics
// 27. https://c-eduden-next.vercel.app/course/bug-bounty
// 28. https://c-eduden-next.vercel.app/course/network-pentest
// 29. https://c-eduden-next.vercel.app/course/soc-analyst
// 30. https://c-eduden-next.vercel.app/course/cloud-security
// 31. https://c-eduden-next.vercel.app/course/android-pentest-basics
// 32. https://c-eduden-next.vercel.app/course/android-pentest-advanced
// 33. https://c-eduden-next.vercel.app/course/react-native
// 34. https://c-eduden-next.vercel.app/course/ios-development
// 35. https://c-eduden-next.vercel.app/course/fullstack-mobile
// 36. https://c-eduden-next.vercel.app/course/seo-mastery
// 37. https://c-eduden-next.vercel.app/course/digital-marketing-seo
// 38. https://c-eduden-next.vercel.app/course/networking-routing
// 39. https://c-eduden-next.vercel.app/course/networking-switching
// 40. https://c-eduden-next.vercel.app/course/cloud-architect-aws
// 41. https://c-eduden-next.vercel.app/course/cloud-azure
// 42. https://c-eduden-next.vercel.app/course/cloudops-pro
// 43. https://c-eduden-next.vercel.app/course/devops-mastery
// 44. https://c-eduden-next.vercel.app/course/linux-pro
// 45. https://c-eduden-next.vercel.app/course/fullstack-diploma
// 46. https://c-eduden-next.vercel.app/course/mern-stack
// 47. https://c-eduden-next.vercel.app/course/web3-dapp
// 48. https://c-eduden-next.vercel.app/course/ai-digital-marketing
// 49. https://c-eduden-next.vercel.app/course/deep-learning
// 50. https://c-eduden-next.vercel.app/course/applied-ai
// 51. https://c-eduden-next.vercel.app/course/nlp-llms



// 1. https://www.eduden.io/course/graphic-design-visual-communication
// 2. https://www.eduden.io/course/advanced-digital-marketing
// 3. https://www.eduden.io/course/networking-zero
// 4. https://www.eduden.io/course/ai-machine-learning-with-python
// 5. https://www.eduden.io/course/ethical-hacking-beginners
// 6. https://www.eduden.io/course/generative-ai
// 7. https://www.eduden.io/course/data-science-analytics
// 8. https://www.eduden.io/course/python-programming
// 9. https://www.eduden.io/course/blockchain-essentials
// 10. https://www.eduden.io/course/iot-foundations
// 11. https://www.eduden.io/course/big-data-engineering
// 12. https://www.eduden.io/course/cloud-aws
// 13. https://www.eduden.io/course/linux-essentials
// 14. https://www.eduden.io/course/devops-beginners
// 15. https://www.eduden.io/course/flutter-development
// 16. https://www.eduden.io/course/ui-ux-design
// 17. https://www.eduden.io/course/shell-scripting
// 18. https://www.eduden.io/course/python-pentest
// 19. https://www.eduden.io/course/web-development
// 20. https://www.eduden.io/course/wordpress-mastery
// 21. https://www.eduden.io/course/react-nextjs
// 22. https://www.eduden.io/course/backend-django
// 23. https://www.eduden.io/course/backend-nodejs
// 24. https://www.eduden.io/course/database-mastery
// 25. https://www.eduden.io/course/cybersecurity-advanced
// 26. https://www.eduden.io/course/digital-forensics
// 27. https://www.eduden.io/course/bug-bounty
// 28. https://www.eduden.io/course/network-pentest
// 29. https://www.eduden.io/course/soc-analyst
// 30. https://www.eduden.io/course/cloud-security
// 31. https://www.eduden.io/course/android-pentest-basics
// 32. https://www.eduden.io/course/android-pentest-advanced
// 33. https://www.eduden.io/course/react-native
// 34. https://www.eduden.io/course/ios-development
// 35. https://www.eduden.io/course/fullstack-mobile
// 36. https://www.eduden.io/course/seo-mastery
// 37. https://www.eduden.io/course/digital-marketing-seo
// 38. https://www.eduden.io/course/networking-routing
// 39. https://www.eduden.io/course/networking-switching
// 40. https://www.eduden.io/course/cloud-architect-aws
// 41. https://www.eduden.io/course/cloud-azure
// 42. https://www.eduden.io/course/cloudops-pro
// 43. https://www.eduden.io/course/devops-mastery
// 44. https://www.eduden.io/course/linux-pro
// 45. https://www.eduden.io/course/fullstack-diploma
// 46. https://www.eduden.io/course/mern-stack
// 47. https://www.eduden.io/course/web3-dapp
// 48. https://www.eduden.io/course/ai-digital-marketing
// 49. https://www.eduden.io/course/deep-learning
// 50. https://www.eduden.io/course/applied-ai
// 51. https://www.eduden.io/course/nlp-llms
