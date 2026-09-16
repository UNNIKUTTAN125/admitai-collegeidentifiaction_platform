export interface CourseInfo {
  id: string;
  name: string;
  degree: string;
  department: string;
  duration: string;
  annualFee: string;
  eligibility: string;
  intakeSeats: number;
  keySubjects: string[];
  careerProspects: string[];
  accreditation: string;
}

export interface ScholarshipInfo {
  id: string;
  title: string;
  category: 'Merit' | 'Sports' | 'Need-Based' | 'Government' | 'Diversity';
  benefit: string;
  eligibility: string;
  deadline: string;
  requiredDocuments: string[];
  contactEmail: string;
}

export interface FacilityInfo {
  category: string;
  name: string;
  timing: string;
  location: string;
  details: string;
  coordinator: string;
}

export interface DepartmentContact {
  department: string;
  deanOrHOD: string;
  email: string;
  phone: string;
  officeLocation: string;
  officeHours: string;
}

export interface ImportantDate {
  event: string;
  date: string;
  status: 'Open' | 'Upcoming' | 'Closed';
  category: 'Admissions' | 'Academics' | 'Examinations' | 'Hostel';
}

export const COURSES_DATABASE: CourseInfo[] = [
  {
    id: 'btech-cse',
    name: 'B.Tech in Computer Science & Engineering',
    degree: 'Bachelor of Technology (B.Tech)',
    department: 'School of Computing & AI',
    duration: '4 Years (8 Semesters)',
    annualFee: '$4,500 / ₹1,85,000 per year',
    eligibility: 'Minimum 60% aggregate in 10+2 with Physics, Mathematics, and Chemistry/Computer Science. Valid rank in National/State Entrance Exam or College Aptitude Test.',
    intakeSeats: 240,
    keySubjects: ['Data Structures & Algorithms', 'Operating Systems', 'Cloud Computing', 'Full Stack Web Dev', 'Artificial Intelligence', 'Cybersecurity'],
    careerProspects: ['Software Engineer', 'Cloud Architect', 'Systems Analyst', 'Full-Stack Developer'],
    accreditation: 'ABET & NBA Tier-1 Accredited'
  },
  {
    id: 'btech-aids',
    name: 'B.Tech in Artificial Intelligence & Data Science',
    degree: 'Bachelor of Technology (B.Tech)',
    department: 'School of Computing & AI',
    duration: '4 Years (8 Semesters)',
    annualFee: '$4,800 / ₹1,95,000 per year',
    eligibility: 'Minimum 65% aggregate in 10+2 with Physics and Mathematics. Strong foundation in analytical mathematics recommended.',
    intakeSeats: 120,
    keySubjects: ['Machine Learning Systems', 'Deep Learning & Neural Networks', 'Big Data Engineering', 'NLP & Generative AI', 'Computer Vision', 'Probability & Statistics'],
    careerProspects: ['AI Research Engineer', 'Data Scientist', 'MLOps Specialist', 'Algorithm Engineer'],
    accreditation: 'NBA Accredited'
  },
  {
    id: 'btech-ece',
    name: 'B.Tech in Electronics & Communication Engineering',
    degree: 'Bachelor of Technology (B.Tech)',
    department: 'School of Electrical & Electronics',
    duration: '4 Years (8 Semesters)',
    annualFee: '$4,200 / ₹1,70,000 per year',
    eligibility: 'Minimum 60% aggregate in 10+2 with Physics, Chemistry, and Mathematics.',
    intakeSeats: 180,
    keySubjects: ['VLSI Design', 'Embedded Systems & IoT', 'Signals & Systems', 'Wireless Communications', 'Microcontrollers & Robotics'],
    careerProspects: ['Embedded Hardware Engineer', 'VLSI Design Engineer', 'Telecom Systems Specialist'],
    accreditation: 'NBA Tier-1 Accredited'
  },
  {
    id: 'btech-mech',
    name: 'B.Tech in Mechanical Engineering (Smart Manufacturing)',
    degree: 'Bachelor of Technology (B.Tech)',
    department: 'School of Mechanical & Aerospace',
    duration: '4 Years (8 Semesters)',
    annualFee: '$3,900 / ₹1,55,000 per year',
    eligibility: 'Minimum 55% in 10+2 with Physics, Chemistry, and Mathematics.',
    intakeSeats: 120,
    keySubjects: ['Robotics & Automation', 'Thermodynamics & Heat Transfer', 'CAD/CAM Solid Modeling', 'Electric Vehicles Dynamics', 'Mechatronics'],
    careerProspects: ['Automotive Engineer', 'Robotics Specialist', 'Aerospace Design Associate'],
    accreditation: 'NBA Accredited'
  },
  {
    id: 'btech-biotech',
    name: 'B.Tech in Biotechnology & Bioinformatics',
    degree: 'Bachelor of Technology (B.Tech)',
    department: 'School of Bio-Sciences & Technology',
    duration: '4 Years (8 Semesters)',
    annualFee: '$4,100 / ₹1,65,000 per year',
    eligibility: 'Minimum 55% in 10+2 with Physics, Chemistry, and Biology/Mathematics.',
    intakeSeats: 60,
    keySubjects: ['Genetic Engineering', 'Computational Genomics', 'Bioprocess Engineering', 'Immunotechnology', 'Pharmaceutical Analytics'],
    careerProspects: ['Bioinformatics Scientist', 'Biopharma R&D Specialist', 'Clinical Data Manager'],
    accreditation: 'NBA Accredited'
  },
  {
    id: 'mba',
    name: 'Master of Business Administration (MBA)',
    degree: 'Master of Business Administration (MBA)',
    department: 'School of Management & Business',
    duration: '2 Years (4 Semesters)',
    annualFee: '$5,500 / ₹2,40,000 per year',
    eligibility: 'Graduation in any discipline with minimum 55% aggregate + CAT/MAT/XAT/GMAT score above 65 percentile or College Entrance Test.',
    intakeSeats: 120,
    keySubjects: ['Financial Analytics', 'Strategic Marketing', 'Product Management', 'Organizational Leadership', 'Supply Chain Analytics'],
    careerProspects: ['Management Consultant', 'Product Manager', 'Investment Associate', 'Marketing Strategist'],
    accreditation: 'AACSB Member & NBA Accredited'
  },
  {
    id: 'bca',
    name: 'Bachelor of Computer Applications (BCA)',
    degree: 'Bachelor of Computer Applications (BCA)',
    department: 'School of Computing & AI',
    duration: '3 Years (6 Semesters)',
    annualFee: '$2,800 / ₹1,10,000 per year',
    eligibility: 'Minimum 50% in 10+2 with Mathematics/Computer Applications as one of the subjects.',
    intakeSeats: 120,
    keySubjects: ['Web Technologies', 'Java & Python Programming', 'Database Systems', 'Cloud Fundamentals', 'Mobile App Development'],
    careerProspects: ['Application Developer', 'Web Specialist', 'QA Engineer', 'Database Administrator'],
    accreditation: 'UGC Recognized'
  }
];

export const SCHOLARSHIPS_DATABASE: ScholarshipInfo[] = [
  {
    id: 'merit-excellence',
    title: 'Chancellor’s Merit Excellence Scholarship',
    category: 'Merit',
    benefit: 'Up to 100% Tuition Fee Waiver for top 5% rankers; 50% waiver for top 15% rankers.',
    eligibility: '95%+ marks in 10+2 Board exams or Top 5,000 Rank in National Entrance Exams.',
    deadline: 'July 15, 2026',
    requiredDocuments: ['10th & 12th Marksheets', 'Official Entrance Scorecard', 'Identity Proof', 'Passport Photograph'],
    contactEmail: 'scholarships@edubugs-campus.edu'
  },
  {
    id: 'stem-women',
    title: 'Women in STEM Leadership Grant',
    category: 'Diversity',
    benefit: '40% annual tuition fee scholarship + ₹25,000 laptop/research equipment grant.',
    eligibility: 'Female students enrolling in B.Tech Computer Science, AI, or Robotics with 75%+ in 10+2.',
    deadline: 'July 25, 2026',
    requiredDocuments: ['Academic Transcripts', 'Statement of Purpose (500 words)', 'Two Teacher Recommendations'],
    contactEmail: 'womeninstem@edubugs-campus.edu'
  },
  {
    id: 'sports-quota',
    title: 'National Sports Champion Fellowship',
    category: 'Sports',
    benefit: '75% to 100% Tuition Fee Waiver + Free on-campus hostel and sports nutrition stipend.',
    eligibility: 'State or National level representation in Athletics, Swimming, Basketball, Cricket, Badminton, or Chess.',
    deadline: 'July 20, 2026',
    requiredDocuments: ['Certified Sports Merit Certificates', 'Medical Fitness Certificate', 'Past 3 Years Competition Records'],
    contactEmail: 'sports@edubugs-campus.edu'
  },
  {
    id: 'financial-need',
    title: 'Vidya Jyothi Need-Based Assistance',
    category: 'Need-Based',
    benefit: '30% to 70% tuition subsidy + interest-free installment schedule assistance.',
    eligibility: 'Family annual income under ₹4,00,000 / $5,000 USD with consistent academic performance (60%+).',
    deadline: 'August 05, 2026',
    requiredDocuments: ['Revenue Authority Income Certificate', 'Salary Slips / ITR of Parents', 'Bank Statements (6 Months)'],
    contactEmail: 'financialaid@edubugs-campus.edu'
  }
];

export const CAMPUS_FACILITIES: FacilityInfo[] = [
  {
    category: 'Hostel',
    name: 'Nilgiri Boys & Himalaya Girls Hostels',
    timing: '24/7 Security; In-time: 9:30 PM (Weekdays) / 10:30 PM (Weekends)',
    location: 'North Campus Quadrangle',
    details: 'Furnished AC & Non-AC rooms (Double & Triple occupancy), high-speed 1Gbps WiFi, laundry service, study rooms, biometric check-in, 24/7 on-site medical dispensary and ambulance.',
    coordinator: 'Chief Warden: Dr. K. Ramanathan (Ext: 4402)'
  },
  {
    category: 'Library',
    name: 'Dr. APJ Abdul Kalam Central Digital Library',
    timing: '8:00 AM – 10:30 PM (Daily), 24/7 during Mid-term & Final Exam weeks',
    location: 'Central Academic Block - Level 1 to 4',
    details: 'Over 140,000 physical volumes, 3,500 print journals, subscription to IEEE Xplore, ScienceDirect, ACM Digital Library, SpringerLink, with 120 dedicated research workstations.',
    coordinator: 'Chief Librarian: Mrs. Anita Sharma (Ext: 4105)'
  },
  {
    category: 'Laboratories',
    name: 'NVIDIA AI & High Performance Computing Center',
    timing: '8:30 AM – 8:00 PM (Monday through Saturday)',
    location: 'Turing Technology Wing - Block C',
    details: 'Equipped with 48 GPU-accelerated workstations (RTX 4090s & DGX station), robotics test benches, IoT fabrication sensors, and 3D prototyping print lab.',
    coordinator: 'Lab Director: Prof. Sarah Mathew (Ext: 4210)'
  },
  {
    category: 'Transportation',
    name: 'Campus Express Fleet (16 Routes)',
    timing: 'Morning arrival at 8:15 AM; Evening departures at 4:45 PM & 6:30 PM',
    location: 'South Gate Transit Hub',
    details: 'GPS-tracked air-conditioned buses covering all major city metro stations, residential corridors, and suburbs. Real-time bus tracking available on Student Hub portal.',
    coordinator: 'Transport Officer: Mr. David Joseph (Ext: 4090)'
  },
  {
    category: 'Cafeteria & Dining',
    name: 'Food Court & Central Mess',
    timing: 'Breakfast: 7:15–9:00 AM | Lunch: 12:00–2:30 PM | Snacks: 4:30–6:00 PM | Dinner: 7:30–9:30 PM',
    location: 'Student Activity Center',
    details: 'Nutritious vegetarian and non-vegetarian food certified by FSSAI. Features multi-cuisine food stalls: Subway, Coffee Day, Fresh Juice counter, and Bakery.',
    coordinator: 'Mess Supervisor: Chef Rajesh Patel (Ext: 4501)'
  },
  {
    category: 'Sports & Wellness',
    name: 'Olympus Sports Complex & Gymnasium',
    timing: '6:00 AM – 9:00 AM & 4:30 PM – 9:30 PM',
    location: 'West Campus Sports Arena',
    details: 'Olympic-size 8-lane swimming pool, 4 synthetic badminton courts, 2 floodlit basketball courts, FIFA-certified artificial football turf, and modern cardio/weights gym.',
    coordinator: 'Sports Director: Coach Vikram Singh (Ext: 4700)'
  }
];

export const DEPARTMENT_CONTACTS: DepartmentContact[] = [
  {
    department: 'Admissions & Enrolment Office',
    deanOrHOD: 'Dr. Evelyn Vance (Director of Admissions)',
    email: 'admissions@edubugs-campus.edu',
    phone: '+1 (800) 555-3382 / +91 44 2828 9001',
    officeLocation: 'Admin Block, Ground Floor, Room G-04',
    officeHours: 'Mon - Fri: 9:00 AM - 5:00 PM | Sat: 9:00 AM - 1:00 PM'
  },
  {
    department: 'School of Computing & AI',
    deanOrHOD: 'Prof. Marcus Chen, Ph.D.',
    email: 'computing.dean@edubugs-campus.edu',
    phone: '+1 (800) 555-3383 (Ext. 4201)',
    officeLocation: 'Turing Block, 3rd Floor, Room 310',
    officeHours: 'Mon - Fri: 10:00 AM - 4:00 PM'
  },
  {
    department: 'Academic Affairs & Examinations',
    deanOrHOD: 'Dr. Radhika Sundaram (Controller of Examinations)',
    email: 'academics@edubugs-campus.edu',
    phone: '+1 (800) 555-3384 (Ext. 4110)',
    officeLocation: 'Main Academic Building, Room 204',
    officeHours: 'Mon - Fri: 9:30 AM - 4:30 PM'
  },
  {
    department: 'Student Affairs & Welfare',
    deanOrHOD: 'Prof. Anthony Wright (Dean of Student Welfare)',
    email: 'studentwelfare@edubugs-campus.edu',
    phone: '+1 (800) 555-3385 (Ext. 4050)',
    officeLocation: 'Student Activity Center, Room 102',
    officeHours: 'Mon - Sat: 9:00 AM - 6:00 PM'
  },
  {
    department: 'Hostel & Residence Office',
    deanOrHOD: 'Dr. K. Ramanathan (Chief Warden)',
    email: 'hosteldesk@edubugs-campus.edu',
    phone: '+1 (800) 555-3386 (Ext. 4400)',
    officeLocation: 'North Campus Residential Office',
    officeHours: 'Daily: 8:00 AM - 8:00 PM'
  },
  {
    department: 'Campus Counseling & Mental Wellness',
    deanOrHOD: 'Dr. Sarah Lin (Lead Clinical Counselor)',
    email: 'wellness@edubugs-campus.edu',
    phone: '+1 (800) 555-WELL (9355) / 24x7 Helpline: 988',
    officeLocation: 'Wellness Haven, Health Center Wing 2',
    officeHours: '24/7 Crisis Hotline; Walk-in: 9:00 AM - 7:00 PM'
  }
];

export const IMPORTANT_DATES: ImportantDate[] = [
  {
    event: 'Phase-1 Online Application Window Closes',
    date: 'June 30, 2026',
    status: 'Open',
    category: 'Admissions'
  },
  {
    event: 'EDU BUGS National Aptitude & Scholarship Test (EB-AST)',
    date: 'July 10, 2026',
    status: 'Upcoming',
    category: 'Admissions'
  },
  {
    event: 'Merit List Publication & Seat Allocation Round 1',
    date: 'July 18, 2026',
    status: 'Upcoming',
    category: 'Admissions'
  },
  {
    event: 'Hostel Room Selection & Roommate Matching',
    date: 'August 01, 2026',
    status: 'Upcoming',
    category: 'Hostel'
  },
  {
    event: 'Freshman Orientation & Campus Walkthrough',
    date: 'August 14, 2026',
    status: 'Upcoming',
    category: 'Academics'
  },
  {
    event: 'Commencement of Fall Semester 2026 Classes',
    date: 'August 18, 2026',
    status: 'Upcoming',
    category: 'Academics'
  }
];

export const REQUIRED_DOCUMENTS = [
  'Grade 10 & Grade 12 (or equivalent) Marksheets and Passing Certificates',
  'Transfer Certificate (TC) and Conduct/Character Certificate from last school/college',
  'Entrance Examination Rank Card / Scorecard (if applicable)',
  'Government-issued Photo ID (Passport, Aadhaar, Driver License, or National ID card)',
  'Recent Passport-sized Color Photographs (6 copies with white background)',
  'Category / Community Certificate (for SC / ST / OBC / EWS quotas if claiming reservations)',
  'Income Certificate issued by Revenue Authority (for Need-Based Scholarship applicants)',
  'Medical Fitness & Blood Group Certificate signed by a Registered Medical Practitioner'
];

export const APPLICATION_STEPS = [
  {
    step: 1,
    title: 'Register Online Account',
    description: 'Create your applicant profile on the portal with verified email & mobile number.'
  },
  {
    step: 2,
    title: 'Select Desired Program',
    description: 'Pick your preferred degree (e.g. B.Tech Computer Science, AI & DS) and review eligibility.'
  },
  {
    step: 3,
    title: 'Upload Official Documents',
    description: 'Submit digital scans of your 10th/12th marksheets, photo ID, and entrance rank cards.'
  },
  {
    step: 4,
    title: 'Pay Application Fee',
    description: 'Submit the $25 / ₹1,200 non-refundable application fee securely via Card/UPI/NetBanking.'
  },
  {
    step: 5,
    title: 'Track Admission Status',
    description: 'Check your real-time evaluation, merit rank, and seat allotment on the Student Hub.'
  }
];
