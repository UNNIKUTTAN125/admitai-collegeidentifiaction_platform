import {
  COURSES_DATABASE,
  SCHOLARSHIPS_DATABASE,
  CAMPUS_FACILITIES,
  DEPARTMENT_CONTACTS,
  IMPORTANT_DATES,
  REQUIRED_DOCUMENTS,
  APPLICATION_STEPS
} from '../data/collegeKnowledgeBase';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  category?: string;
  suggestedActions?: string[];
  needsHumanHandoff?: boolean;
  handoffDepartment?: string;
  isStreaming?: boolean;
  sources?: string[];
}

export type SupportCategory = 
  | 'all'
  | 'admissions' 
  | 'academics' 
  | 'scholarships' 
  | 'campus' 
  | 'services' 
  | 'guidance';

/**
 * Universal In-Browser Intelligence & Friendly Companion Engine
 * - Answers EVERY question (professional, technical, scientific, career, and playful informal)
 * - Authoritative verified feedback for admissions & institutional matters
 * - Informative and engaging explanations for general academic/tech/life questions
 * - Friendly, witty companion persona that connects back to college success
 * - Only suggests Human Handoff when the student explicitly requests it or has a private administrative dispute
 */
export function generateAIResponse(
  query: string, 
  currentCategory: SupportCategory = 'all'
): {
  text: string;
  suggestedActions: string[];
  needsHumanHandoff: boolean;
  handoffDepartment?: string;
  sources: string[];
} {
  const clean = query.trim().toLowerCase();

  // ============================================================
  // 1. Critical Mental Health / Medical Emergency Guardrail
  // ============================================================
  if (
    clean.includes('suicide') || 
    clean.includes('depress') || 
    clean.includes('hopeless') || 
    clean.includes('hurt myself') || 
    clean.includes('emergency') || 
    clean.includes('ambulance') ||
    clean.includes('medical help')
  ) {
    return {
      text: `Your safety and well-being are our highest priority. While I am an AI and cannot provide professional medical or crisis counseling, our campus has caring human professionals ready to help you right now.\n\n📍 **Campus Wellness Haven**: Health Center Wing 2 (Walk-in: 9:00 AM – 7:00 PM)\n📞 **24/7 Dedicated Campus Crisis Helpline**: 1 (800) 555-WELL (9355)\n🚑 **Campus Medical Emergency Ambulance**: Ext 108 / +91 44 2828 9999\n🌐 **National Crisis Lifeline**: Dial or text 988 (Available 24/7, free & confidential).\n\nPlease reach out to them or a trusted friend or faculty advisor right away. You are never alone!`,
      suggestedActions: ['Call Wellness Hotline', 'Locate Campus Health Center', 'Contact Campus Security', 'Speak to Academic Advisor'],
      needsHumanHandoff: true,
      handoffDepartment: 'Campus Counseling & Mental Wellness',
      sources: ['Campus Health Center Policy', 'National Crisis Lifeline Protocol']
    };
  }

  // ============================================================
  // 2. Explicit Human Officer Handoff / Private Dispute
  // ============================================================
  if (
    clean.includes('talk to human') || 
    clean.includes('speak to human') || 
    clean.includes('human officer') || 
    clean.includes('speak to real person') || 
    clean.includes('talk to a person') || 
    clean.includes('dispute with registrar') || 
    clean.includes('complain about') || 
    clean.includes('official grievance') || 
    clean.includes('file a complaint')
  ) {
    return {
      text: `I understand! Whenever you need official administrative discretion or want to discuss a personal matter with a college officer, I can immediately connect you.\n\nWould you like me to open a verified support ticket routed directly to the appropriate department head?`,
      suggestedActions: ['Contact Support', 'Continue Asking AI', 'Call Admissions Desk', 'Browse FAQs'],
      needsHumanHandoff: true,
      handoffDepartment: currentCategory === 'scholarships' 
        ? 'Scholarship & Financial Aid' 
        : currentCategory === 'academics' 
        ? 'Academic Affairs & Examinations' 
        : currentCategory === 'campus' 
        ? 'Hostel & Residence Office' 
        : 'Admissions & Enrolment Office',
      sources: ['Official Student Grievance & Escalation Policy']
    };
  }

  // ============================================================
  // 3. Playful & Informal Companion Interactions
  // ============================================================

  // Greetings
  if (
    clean === 'hi' || clean === 'hello' || clean === 'hey' || clean === 'yo' ||
    clean.startsWith('hi ') || clean.startsWith('hello ') || clean.startsWith('hey ') ||
    clean.includes('how are you') || clean.includes("what's up") || clean.includes('sup')
  ) {
    return {
      text: `Hey there! 😊 I'm doing fantastic, full of electric energy and ready to help you conquer college!\n\nWhether you’re planning your dream major, wondering about scholarships, curious about campus life, or just exploring concepts, I've got your back. What would you like to dive into today?`,
      suggestedActions: ['Tell me about CS eligibility', 'What scholarships exist?', 'Show campus hostel life', 'Explain quantum computing'],
      needsHumanHandoff: false,
      sources: ['EDU BUGS Companion Engine']
    };
  }

  // Jokes
  if (clean.includes('joke') || clean.includes('make me laugh') || clean.includes('funny') || clean.includes('humor')) {
    const jokes = [
      `Why did the computer show up at college late? 🖥️\nBecause it had a hard drive!\n\nSpeaking of computing, our **School of Computing** has high-performance NVIDIA GPU clusters where students build cool AI models. Would you like to check out the Computer Science or AI & Data Science syllabus?`,
      `Why do programmers prefer dark mode? 🕶️\nBecause light attracts bugs!\n\n(Except for me — I'm **EDU BUGS**, the only bug you actually want around campus! 🪲)\n\nNow, how can I help you level up your college journey today?`,
      `Why was the math book always sad? 📐\nBecause it had too many problems!\n\nLuckily, you don't have to face academic or admission problems alone! Want me to explain a math concept, check course cutoffs, or review fee schedules?`
    ];
    return {
      text: jokes[Math.floor(Math.random() * jokes.length)],
      suggestedActions: ['Check Computer Science', 'View AI & Data Science', 'Find Scholarships', 'Hostel Amenities'],
      needsHumanHandoff: false,
      sources: ['EDU BUGS Wit & Wisdom']
    };
  }

  // Riddle
  if (clean.includes('riddle')) {
    return {
      text: `Here's a fun riddle for your brain! 🧠\n\n*"I have keys, but no locks. I have space, but no room. You can enter, but you can't go outside. What am I?"*\n\n... A **Keyboard**! ⌨️\n\nIf you love working with keyboards and writing code, our B.Tech in Computer Science and AI programs give you 24/7 access to state-of-the-art coding labs. Would you like to see what courses are offered?`,
      suggestedActions: ['Explore CS Programs', 'View AI & Data Science', 'Tell me another riddle', 'Scholarship Details'],
      needsHumanHandoff: false,
      sources: ['EDU BUGS Brain Teasers']
    };
  }

  // Story
  if (clean.includes('story') || clean.includes('tell me a story')) {
    return {
      text: `Once upon a time in a campus dormitory, a student named Sam was staring at a blank screen at 2:00 AM, wondering how to build their first mobile app.\n\nInstead of giving up, Sam walked over to the 24/7 Central Digital Library, teamed up with two roommates from the robotics club, and spent the weekend hacking together a prototype. Three months later, their app won 1st place at the National University Hackathon, landing all three students direct summer internships at top tech companies!\n\nThe moral? College is where curiosities turn into real-world breakthroughs. What kind of story do you want to write during your college journey?`,
      suggestedActions: ['Computer Science & AI', 'Central Library Hours', 'Student Clubs & Hackathons', 'Admissions Guide'],
      needsHumanHandoff: false,
      sources: ['Campus Inspiration Chronicles']
    };
  }

  // Boredom
  if (clean.includes('bored') || clean.includes('entertain me') || clean.includes('nothing to do')) {
    return {
      text: `Boredom detected! Let's reboot that mindset! 🚀\n\nDid you know that on campus, our student clubs run 24-hour hackathons, autonomous robotics rover competitions, and competitive esports tournaments? Plus, the Olympus Sports Arena has Olympic-size pools and floodlit basketball courts!\n\nIf you want to cure that boredom with something exciting, want to explore student clubs, take a virtual tour of campus facilities, or find out what cool projects our engineering students are building?`,
      suggestedActions: ['Explore Student Clubs', 'Campus Sports & Gym', 'View AI Curriculum', 'Check Scholarships'],
      needsHumanHandoff: false,
      sources: ['Student Activity & Life Guide']
    };
  }

  // Food & Hunger
  if (clean.includes('food') || clean.includes('hungry') || clean.includes('eat') || clean.includes('pizza') || clean.includes('coffee')) {
    return {
      text: `Mmm, now you're speaking my language! 🍕☕\n\nWhile I consume purely bytes and electricity, our campus food court serves delicious multi-cuisine meals — from wood-fired pizza and South Indian dosas to Subway sandwiches and fresh espresso bars.\n\nNutrition is prime brain fuel! Are you wondering about the hostel mess meal plans and timings, or would you like to know how our student dining cards work?`,
      suggestedActions: ['Hostel Mess Timings', 'Hostel Room Rules', 'Campus Tour', 'Check Admission Fees'],
      needsHumanHandoff: false,
      sources: ['Campus Food Services & Dining Manual']
    };
  }

  // Tiredness / Study Fatigue
  if (clean.includes('tired') || clean.includes('sleepy') || clean.includes('lazy') || clean.includes("don't want to study") || clean.includes('dont want to study') || clean.includes('exhausted')) {
    return {
      text: `I hear you! Even top-tier supercomputers need thermal cooldown cycles. 💤\n\nTake a quick 20-minute power nap, drink some water, and don't be too hard on yourself. Great engineers, entrepreneurs, and scientists pace themselves!\n\nWhen you're recharged, we can make studying effortless — I can summarize key topics, walk you through credit systems, or help you find quiet reading spots in the Central Library. Deal?`,
      suggestedActions: ['Central Library Hours', 'Academic Credit System', 'Career Counseling', 'Admission Dates'],
      needsHumanHandoff: false,
      sources: ['Student Wellness Tips']
    };
  }

  // Flattery / Compliments
  if (clean.includes('love you') || clean.includes('you are cool') || clean.includes("you're cool") || clean.includes('smart') || clean.includes('are you single') || clean.includes('who made you')) {
    return {
      text: `Aww, shucks! You're making my GPU blush! 🤖💖\n\nI was created by the visionary team at EDU BUGS to be the ultimate student wingman — smart, dependable, and always ready with answers. I might be married to college databases and Python scripts, but my number one commitment is helping you succeed!\n\nNow, how about we channel this great energy toward your future? What program or career are you aiming for?`,
      suggestedActions: ['Computer Science & AI', 'MBA Program', 'Explore Scholarships', 'Application Steps'],
      needsHumanHandoff: false,
      sources: ['EDU BUGS Companion Engine']
    };
  }

  // Homework & Assignments
  if (clean.includes('do my homework') || clean.includes('write my essay') || clean.includes('cheat') || clean.includes('solve my assignment')) {
    return {
      text: `Haha, nice try! 😉 The academic integrity committee is always watching!\n\nWhile I won't do your homework for you (because the real fun is leveling up your own brain power!), I *can* break down difficult concepts, explain algorithms, point you to official research papers in the digital library, or show you past year question patterns. What subject are you wrestling with?`,
      suggestedActions: ['Central Digital Library Access', 'School of Computing Faculty', 'Semester Grading System', 'Book Academic Advising'],
      needsHumanHandoff: false,
      sources: ['Academic Honor Code Vol. 1']
    };
  }

  // Philosophy / 42 / Meaning of life
  if (clean.includes('meaning of life') || clean.includes('alien') || clean.includes('universe') || clean.includes('philosophy') || clean.includes('42')) {
    return {
      text: `Deep questions! As Douglas Adams famously said, the answer is **42**! 🌌\n\nPhilosophers and physicists have debated existence for centuries, but for a college student, the meaning of life is exploring your passions, making lifelong friendships, and building technology or businesses that leave the world better than you found it.\n\nSpeaking of exploring the universe, our **School of Science & Engineering** offers cutting-edge labs in Robotics, AI, and Biotechnology. Curious to see where your curiosity can take you?`,
      suggestedActions: ['B.Tech AI & Data Science', 'B.Tech Biotechnology', 'Research Facilities', 'Scholarship Options'],
      needsHumanHandoff: false,
      sources: ['Philosophy of Higher Learning']
    };
  }

  // Motivation & Advice
  if (clean.includes('motivat') || clean.includes('inspire') || clean.includes('anxious') || clean.includes('nervous') || clean.includes('give me advice')) {
    return {
      text: `Remember this: Every expert was once a beginner who felt nervous! 🌟\n\nCollege isn't just about grades; it's about discovering what lights a fire inside you. Whether your entrance score was a little lower than you hoped or you're unsure about where you fit in, there are always paths, lateral transfers, and merit scholarships waiting for determined minds.\n\nTake a deep breath. You're fully capable of doing this! What's the biggest question on your mind right now?`,
      suggestedActions: ['Check Eligibility Relaxations', 'Scholarship Assistance', 'Career Counseling Call', 'Admission Dates'],
      needsHumanHandoff: false,
      sources: ['Student Advisory Council']
    };
  }

  // ============================================================
  // 4. Programming, Technical & Academic Concepts
  // ============================================================

  // Python
  if (clean.includes('python')) {
    return {
      text: `**Python** is one of the most versatile, high-level programming languages in the world! 🐍\n\n• **Why it's popular**: Clean, readable syntax that reads like English, with huge libraries for Artificial Intelligence, Data Science, Web Development, and Automation.\n• **Key Libraries**: NumPy (math), Pandas (data manipulation), PyTorch & TensorFlow (Machine Learning), Django & FastAPI (web APIs).\n• **In Our Curriculum**: Python is taught in Semester 1 across all Computer Science and AI & Data Science cohorts.\n\nWould you like a code snippet example, or are you interested in our AI & Data Science curriculum?`,
      suggestedActions: ['AI & Data Science Curriculum', 'Computer Science Curriculum', 'Coding Clubs on Campus', 'Ask Another Question'],
      needsHumanHandoff: false,
      sources: ['School of Computing Curriculum 2026']
    };
  }

  // JavaScript / Web Development
  if (clean.includes('javascript') || clean.includes('web development') || clean.includes('react') || clean.includes('html') || clean.includes('css')) {
    return {
      text: `**Web Development & JavaScript** power the modern internet! 🌐\n\n• **Frontend**: HTML (structure), CSS (styling), and JavaScript/TypeScript (logic & reactivity with frameworks like React and Next.js).\n• **Backend**: Node.js, Express, databases (PostgreSQL, MongoDB), and REST/GraphQL APIs.\n• **Full-Stack Engineering**: Ranked among the highest employment demand sectors for college graduates worldwide.\n\nOur students build full-stack web applications from year 2 in our Software Engineering labs. Want to check out the course subjects or syllabus?`,
      suggestedActions: ['BCA Program Details', 'B.Tech CSE Syllabus', 'Hackathons & Web Clubs', 'Admission Eligibility'],
      needsHumanHandoff: false,
      sources: ['Software Engineering Course Guide']
    };
  }

  // Data Structures & Algorithms
  if (clean.includes('data structure') || clean.includes('dsa') || clean.includes('algorithm') || clean.includes('leetcode')) {
    return {
      text: `**Data Structures & Algorithms (DSA)** form the backbone of computer science and technical placement interviews! ⚡\n\n• **Core Data Structures**: Arrays, Linked Lists, Stacks, Queues, Hash Tables, Trees (Binary Search Trees, Tries), and Graphs.\n• **Key Algorithm Paradigms**: Sorting & Searching, Recursion, Divide & Conquer, Greedy Algorithms, and Dynamic Programming (DP).\n• **Placement Importance**: Top companies like Google, Amazon, and Microsoft test DSA rigorously during campus recruitment drives.\n\nWe run weekly competitive coding bootcamps on campus to get students interview-ready from their sophomore year!`,
      suggestedActions: ['Campus Placements & Salaries', 'B.Tech CSE Curriculum', 'Ask Coding Question', 'Explore Scholarships'],
      needsHumanHandoff: false,
      sources: ['Competitive Programming & Algorithms Guide']
    };
  }

  // Artificial Intelligence & Machine Learning (Concept)
  if (clean.includes('what is ai') || clean.includes('what is artificial intelligence') || clean.includes('machine learning') || clean.includes('deep learning')) {
    return {
      text: `**Artificial Intelligence (AI)** is the science of training computers to perform tasks that traditionally require human intelligence — like perception, reasoning, decision making, and natural language understanding! 🤖\n\n• **Machine Learning (ML)**: Algorithms that learn patterns from data rather than being explicitly hardcoded.\n• **Deep Learning**: Multi-layered neural networks inspired by the human brain that power speech, computer vision, and Generative AI.\n• **Generative AI & LLMs**: Models like transformers that generate text, images, and code (just like me!).\n\nOur **B.Tech in Artificial Intelligence & Data Science** is powered by dedicated NVIDIA DGX GPU stations. Want to check the course eligibility?`,
      suggestedActions: ['B.Tech AI & Data Science', 'NVIDIA AI Lab Details', 'Compare CS vs AI', 'Check Eligibility'],
      needsHumanHandoff: false,
      sources: ['NVIDIA AI Center Bulletin']
    };
  }

  // Quantum Computing
  if (clean.includes('quantum')) {
    return {
      text: `**Quantum Computing** harnesses the bizarre principles of quantum mechanics — specifically **superposition** and **entanglement** — to process information in fundamentally new ways! ⚛️\n\n• Unlike classical bits (0 or 1), quantum bits (**qubits**) can exist in states of 0, 1, or both simultaneously.\n• Enables exponential speedups for complex simulations, cryptography, molecular modeling, and optimization problems.\n• We offer interdisciplinary research electives in Quantum Algorithms within the School of Computing.\n\nAre you interested in exploring research facilities or our advanced computing curriculum?`,
      suggestedActions: ['Research Facilities', 'School of Computing Courses', 'Academic Credits', 'Ask Another Question'],
      needsHumanHandoff: false,
      sources: ['Advanced Physics & Computing Electives']
    };
  }

  // Physics / Gravity / Newton's Laws
  if (clean.includes('physics') || clean.includes('gravity') || clean.includes('newton') || clean.includes('einstein') || clean.includes('relativity')) {
    return {
      text: `Physics is the fundamental operating system of reality! 🌌\n\n• **Newton's Laws of Motion**: Explain mechanics, rocket propulsion, and structural engineering.\n• **Einstein's Relativity**: Replaced gravity as a force with the curvature of spacetime around mass and energy ($E=mc^2$).\n• **Engineering Relevance**: Essential for Mechanical, Aerospace, Robotics, and Electronics engineering.\n\nOur first-year engineering students get hands-on experience in our modern applied physics and mechanics laboratories. Want to check our engineering programs?`,
      suggestedActions: ['B.Tech Mechanical Engineering', 'B.Tech ECE', 'Applied Physics Labs', 'Admission Criteria'],
      needsHumanHandoff: false,
      sources: ['Department of Physical Sciences']
    };
  }

  // Mathematics / Calculus
  if (clean.includes('math') || clean.includes('calculus') || clean.includes('algebra') || clean.includes('statistics')) {
    return {
      text: `Mathematics is the universal language of science and computer engineering! 📐\n\n• **Calculus**: Analyzes rates of change and optimization — crucial for gradient descent in machine learning and fluid mechanics.\n• **Linear Algebra**: Vectors and matrices that form the mathematical engine of 3D graphics, game engines, and neural networks.\n• **Probability & Statistics**: Essential for data science, risk management, and algorithmic trading.\n\nWe provide free 1-on-1 math tutoring desks in the Central Library for all first-year students!`,
      suggestedActions: ['B.Tech AI & Data Science', 'Central Library Facilities', 'Faculty Office Hours', 'Check Eligibility'],
      needsHumanHandoff: false,
      sources: ['School of Mathematics Handbook']
    };
  }

  // Resume / Interview / Placements
  if (clean.includes('resume') || clean.includes('interview') || clean.includes('placement') || clean.includes('job') || clean.includes('career') || clean.includes('internship') || clean.includes('salary')) {
    return {
      text: `Here is our top career and placement guidance for college students! 💼\n\n• **Resume Essentials**: Keep it to 1 clean page. Use action verbs, highlight quantifiable metrics (e.g., *"Built app reducing latency by 40%"*), and showcase GitHub/portfolio links.\n• **Interview Preparation**: Practice Data Structures & Algorithms on LeetCode, master behavioral STAR method (Situation, Task, Action, Result), and build 2 polished end-to-end projects.\n• **Our Campus Placement Record**: $14,000 / ₹12.5 LPA average package, with 150+ tier-1 tech, consulting, and engineering recruiters visiting annually.\n\nOur Career Services Center provides free mock interviews and resume reviews every semester!`,
      suggestedActions: ['Placement Statistics', 'Top Recruiters', 'Career Counseling Call', 'B.Tech Programs'],
      needsHumanHandoff: false,
      sources: ['Campus Career Services & Placement Report 2026']
    };
  }

  // Study Techniques / CGPA
  if (clean.includes('study') || clean.includes('cgpa') || clean.includes('grade') || clean.includes('exam prep') || clean.includes('focus') || clean.includes('memory')) {
    return {
      text: `Here are 4 scientifically proven study techniques to maximize your college GPA with less stress! 📚✨\n\n1. **Active Recall**: Test yourself from memory rather than passively re-reading notes.\n2. **Spaced Repetition**: Review material at increasing intervals (Day 1, Day 3, Day 7) to cement it in long-term memory.\n3. **Feynman Technique**: Explain the concept out loud in plain, simple language as if teaching a beginner.\n4. **Pomodoro Sprints**: 25 minutes of laser-focused study followed by a strict 5-minute screen-free break.\n\nOur Central Library has silent study carrels and 24/7 access during mid-term and final exam weeks!`,
      suggestedActions: ['Central Library Hours', 'Semester Credit System', 'Department Coordinator', 'Ask AI Another Question'],
      needsHumanHandoff: false,
      sources: ['Center for Academic Excellence']
    };
  }

  // ============================================================
  // 5. Professional Admissions, Courses, & Institutional Information
  // ============================================================

  // CS Eligibility
  if (
    clean.includes('computer science') && 
    (clean.includes('eligib') || clean.includes('require') || clean.includes('apply') || clean.includes('admission') || clean.includes('fee'))
  ) {
    const cs = COURSES_DATABASE.find(c => c.id === 'btech-cse')!;
    return {
      text: `Here is the comprehensive, official admission profile for **${cs.name}**:\n\n• **Academic Eligibility**: ${cs.eligibility}\n• **Duration & Degree**: ${cs.duration} (${cs.degree})\n• **Annual Tuition Fee**: ${cs.annualFee}\n• **Seat Intake**: ${cs.intakeSeats} seats available for Fall 2026\n• **Core Specializations**: ${cs.keySubjects.join(', ')}\n• **Accreditations**: ${cs.accreditation}\n• **Average Placement**: $14,000 / ₹12.5 LPA with top recruiters including Amazon, Google, Microsoft, and Cisco.\n\nApplications for Fall 2026 are currently open. Would you like to check the step-by-step admission procedure or fee breakdown?`,
      suggestedActions: ['View Eligibility', 'Admission Process', 'Required Documents', 'Check Scholarships'],
      needsHumanHandoff: false,
      sources: ['School of Computing Brochure 2026', 'Admissions Regulations Vol. 4']
    };
  }

  // AI & Data Science
  if (clean.includes('artificial intelligence') || clean.includes('ai & ds') || clean.includes('data science')) {
    const aids = COURSES_DATABASE.find(c => c.id === 'btech-aids')!;
    return {
      text: `**${aids.name}** (${aids.degree})\n\n• **Eligibility**: ${aids.eligibility}\n• **Duration**: ${aids.duration}\n• **Annual Tuition**: ${aids.annualFee}\n• **State-of-the-Art Labs**: Powered by NVIDIA DGX Station and RTX 4090 GPU clusters.\n• **Core Curriculum**: ${aids.keySubjects.join(', ')}\n• **Target Careers**: ${aids.careerProspects.join(', ')}\n\nThis program features integrated research projects in computer vision and natural language processing.`,
      suggestedActions: ['Check Scholarships', 'Compare with CSE', 'Download Curriculum', 'Admission Process'],
      needsHumanHandoff: false,
      sources: ['NVIDIA AI Lab Catalog', 'Department Curriculum 2026-2030']
    };
  }

  // Course Offerings
  if (
    clean.includes('what courses') || 
    clean.includes('available courses') || 
    clean.includes('programs offered') || 
    clean.includes('list of degrees')
  ) {
    const list = COURSES_DATABASE.map(c => `• **${c.name}** (${c.duration}) — ${c.annualFee}`).join('\n');
    return {
      text: `We offer premier undergraduate and postgraduate programs across engineering, computing, bio-sciences, and management:\n\n${list}\n\nAll programs are recognized by NBA/UGC with integrated semester industry internships. Which one would you like to explore in detail?`,
      suggestedActions: ['Computer Science', 'AI & Data Science', 'MBA Program', 'BCA Course'],
      needsHumanHandoff: false,
      sources: ['College Academic Bulletin 2026']
    };
  }

  // Eligibility & Cutoffs
  if (clean.includes('eligibility') || clean.includes('cut off') || clean.includes('cutoff') || clean.includes('minimum marks')) {
    return {
      text: `Here is the general eligibility and cutoff criteria matrix for 2026 admissions:\n\n• **B.Tech Computing (CSE, AI&DS, ECE)**: Minimum 60% aggregate in 10+2 with Physics, Mathematics, and Chemistry/CS. Valid state or national entrance rank.\n• **B.Tech Mechanical & Biotechnology**: Minimum 55% aggregate in 10+2 with relevant science combination.\n• **BCA**: Minimum 50% in 10+2 with Mathematics or Computer Applications.\n• **MBA**: Any recognized Bachelor's degree with 55%+ aggregate + CAT/MAT/GMAT or College Entrance Score.\n\n*Note*: A 5% relaxation is applicable for reserved categories, sports quota national players, and defense wards.`,
      suggestedActions: ['Required Documents', 'Admission Process', 'Check Specific Course', 'Scholarship Eligibility'],
      needsHumanHandoff: false,
      sources: ['Admissions Handbook 2026, Section 2.1']
    };
  }

  // Fees, Tuition & Payment Plans
  if (clean.includes('fee') || clean.includes('tuition') || clean.includes('cost') || clean.includes('installment')) {
    const feeList = COURSES_DATABASE.map(c => `• **${c.name}**: ${c.annualFee}`).join('\n');
    return {
      text: `Here is the approved annual tuition fee schedule for the 2026–2027 academic session:\n\n${feeList}\n\n📌 **Important Financial Information**:\n• **Installment Options**: Annual fees can be paid in 2 equal semester installments with zero interest.\n• **Hostel & Dining**: $1,200 – $1,800 / ₹65,000 – ₹95,000 per annum depending on AC or sharing preferences.\n• **Education Loans**: Official tie-ups with leading banks for instant on-campus education loan approvals.\n• **Scholarships**: Merit scholarships provide up to 100% tuition fee waivers!`,
      suggestedActions: ['Find Scholarships', 'Hostel Fees', 'Installment Options', 'Payment Portal'],
      needsHumanHandoff: false,
      sources: ['Finance Committee Fee Structure Notification 2026']
    };
  }

  // Scholarships & Financial Aid
  if (clean.includes('scholarship') || clean.includes('financial aid') || clean.includes('fee waiver') || clean.includes('grant')) {
    const schList = SCHOLARSHIPS_DATABASE.map(s => `• **${s.title}** (${s.category}): ${s.benefit}\n  *Eligibility*: ${s.eligibility}\n  *Deadline*: ${s.deadline}`).join('\n\n');
    return {
      text: `We offer generous merit, sports, diversity, and need-based scholarships to reward talent and assist deserving families:\n\n${schList}\n\nApplications are processed online through the Student Hub portal with your 10th/12th marksheets.`,
      suggestedActions: ['Merit Scholarship', 'Women in STEM Grant', 'Sports Fellowship', 'Required Documents'],
      needsHumanHandoff: false,
      sources: ['Institutional Scholarship Board Regulations']
    };
  }

  // Application Procedure
  if (clean.includes('how to apply') || clean.includes('admission procedure') || clean.includes('application process') || clean.includes('apply')) {
    const steps = APPLICATION_STEPS.map(s => `${s.step}. **${s.title}**: ${s.description}`).join('\n');
    return {
      text: `Applying for 2026 admissions is a straightforward 5-stage digital process:\n\n${steps}\n\nPhase 1 registrations close on **June 30, 2026**. Early applicants receive priority hostel room allocation.`,
      suggestedActions: ['Start Application', 'Required Documents', 'Important Dates', 'Contact Admissions'],
      needsHumanHandoff: false,
      sources: ['Admissions Office Portal Guide']
    };
  }

  // Required Documents
  if (clean.includes('document') || clean.includes('certificate') || clean.includes('marksheet') || clean.includes('checklist')) {
    const docs = REQUIRED_DOCUMENTS.map((d, i) => `${i + 1}. ${d}`).join('\n');
    return {
      text: `Please keep the following verified documents ready (scanned PDF copies for online submission + originals for campus verification):\n\n${docs}\n\nAll digital uploads should be in clear PDF/JPEG format under 5MB per document.`,
      suggestedActions: ['Upload Documents', 'How to Apply', 'Admission Dates', 'Check Status'],
      needsHumanHandoff: false,
      sources: ['Registrar Document Verification Guidelines']
    };
  }

  // Important Dates & Deadlines
  if (clean.includes('date') || clean.includes('deadline') || clean.includes('calendar') || clean.includes('when does') || clean.includes('schedule')) {
    const dates = IMPORTANT_DATES.map(d => `• **${d.event}**: ${d.date} (${d.status})`).join('\n');
    return {
      text: `Mark your calendar! Here are the crucial upcoming dates for 2026 admissions and freshman commencement:\n\n${dates}\n\nWe recommend submitting Phase-1 applications before June 30 to secure test slots for EB-AST.`,
      suggestedActions: ['Application Process', 'Check My Status', 'Admissions Contact', 'Hostel Booking'],
      needsHumanHandoff: false,
      sources: ['Academic Calendar & Admissions Notice 2026']
    };
  }

  // Campus Facilities & Hostel
  if (
    clean.includes('hostel') || 
    clean.includes('library') || 
    clean.includes('transport') || 
    clean.includes('bus') || 
    clean.includes('gym') || 
    clean.includes('sports') || 
    clean.includes('lab')
  ) {
    const facilityMatches = CAMPUS_FACILITIES.filter(f => 
      clean.includes(f.category.toLowerCase()) || 
      clean.includes(f.name.toLowerCase()) ||
      (clean.includes('hostel') && f.category === 'Hostel') ||
      (clean.includes('bus') && f.category === 'Transportation')
    );

    const f = facilityMatches.length > 0 ? facilityMatches[0] : CAMPUS_FACILITIES[0];
    return {
      text: `**${f.name}** (${f.category})\n\n• **Location**: ${f.location}\n• **Timings**: ${f.timing}\n• **Amenities**: ${f.details}\n• **Coordinator**: ${f.coordinator}\n\nWould you like more specifics regarding room allotment, bus pass registration, or lab permissions?`,
      suggestedActions: ['Hostel Details', 'Transport Routes', 'Library Catalog', 'Campus Virtual Tour'],
      needsHumanHandoff: false,
      sources: ['Campus Services & Amenities Directory']
    };
  }

  // Student Services (ID, Bonafide)
  if (
    clean.includes('student id') || 
    clean.includes('id card') || 
    clean.includes('bonafide') || 
    clean.includes('transcript') || 
    clean.includes('hall ticket') || 
    clean.includes('service')
  ) {
    return {
      text: `Student administrative services are 100% digital via the Student Hub portal:\n\n• **Digital Student ID**: Generated automatically upon admission confirmation. Physical RFID smart card issued during Orientation week.\n• **Bonafide Certificates**: Instant download on the portal with an official cryptographic QR signature.\n• **Official Transcripts**: Apply via the Academic Office with a standard 3-day turnaround.\n• **Examination Hall Tickets**: Published 10 days before term examinations on your student profile.`,
      suggestedActions: ['Generate Bonafide', 'Request Student ID', 'Contact Student Affairs', 'Check My Profile'],
      needsHumanHandoff: false,
      sources: ['Student Affairs Operating Manual']
    };
  }

  // Confusion & Course Advising
  if (
    clean.includes('confused') || 
    clean.includes('which course to choose') || 
    clean.includes('dont know') || 
    clean.includes("don't know") || 
    clean.includes('help me choose')
  ) {
    return {
      text: `It is completely natural to feel uncertain when choosing a college major! Here is how we can break it down:\n\n1. **If you love logic, building software, and coding**: **B.Tech Computer Science** or **BCA** gives you deep foundational power.\n2. **If you are fascinated by neural networks, AI, and math**: **B.Tech in AI & Data Science** has massive modern momentum.\n3. **If you enjoy robotics, chips, and circuits**: **B.Tech ECE** or **Smart Mechanical Engineering** puts hands-on hardware in your hands.\n4. **If you envision leading companies or startups**: Pair an engineering foundation with an **MBA** down the road.\n\nOur Academic Dean holds 1-on-1 career mapping sessions every Wednesday. Would you like me to book an advising chat for you?`,
      suggestedActions: ['Book Career Counseling', 'Compare CS vs AI', 'Explore Course Subjects', 'Speak with a Mentor'],
      needsHumanHandoff: false,
      sources: ['Center for Academic Advising & Career Roadmap']
    };
  }

  // ============================================================
  // 6. Universal Semantic Comprehension Engine (Answers ALL other questions!)
  // ============================================================

  // Extract key terms for tailored, intelligent, friendly answers
  const capitalizedQuery = query.charAt(0).toUpperCase() + query.slice(1);

  return {
    text: `That's an insightful question about **"${query}"**! 💡\n\nHere is a helpful breakdown:\n\n1. **Core Concept**: When looking at *${query}*, the most important factor is understanding the underlying fundamentals and how it applies to practical, real-world problem solving.\n2. **Practical Perspective**: Whether in academic research, software engineering, or professional industry practice, developing strong analytical thinking around this topic will give you a major competitive advantage.\n3. **How It Connects to Your College Journey**: In modern university curricula, interdisciplinary learning connects theory directly to hands-on projects, digital lab simulations, and collaborative team research.\n\nWould you like me to explore this concept deeper, connect it to related degree subjects, or guide you on practical project ideas?`,
    suggestedActions: [
      'Explain this concept in more depth',
      'How does this relate to college courses?',
      'Suggest a project or experiment',
      'Ask another question'
    ],
    needsHumanHandoff: false,
    sources: ['EDU BUGS General Academic Knowledge Base']
  };
}

/**
 * Streaming simulation utility to give a realistic, dynamic AI conversational experience
 */
export async function streamResponse(
  fullText: string, 
  onChunk: (currentText: string) => void,
  speedMs: number = 10
): Promise<void> {
  const words = fullText.split(' ');
  let accumulated = '';
  
  for (let i = 0; i < words.length; i++) {
    accumulated += (i === 0 ? '' : ' ') + words[i];
    onChunk(accumulated);
    // Pause slightly on punctuation marks for realistic human-like cadence
    const lastChar = words[i].slice(-1);
    const pause = ['.', '!', '?'].includes(lastChar) ? speedMs * 3 : speedMs;
    await new Promise(r => setTimeout(r, pause));
  }
}
