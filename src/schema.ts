export interface Field {
  name: string;
  label: string;
  type: 'text' | 'number' | 'url' | 'date';
  autoGenerate?: boolean;
}

export const SHEET_CONFIGS: Record<string, Field[]> = {
  "Achievements of the department": [
  { name: "progName", label: "Name of the Programme", type: "text" },
  { name: "progCode", label: "Programme Code", type: "text" },
  { name: "hasComponent", label: "Component of Field project / research project / internship (Yes/No)", type: "text" },
  { name: "componentName", label: "If yes, Name of the component", type: "text" },
  { name: "courseCode", label: "Course code of the component", type: "text" },
  { name: "studentCount", label: "Number of students undertaking", type: "number" },
  { name: "link", label: "Link to the relevant document", type: "url" }
],
"Detail of Patents filed, publish": [
  { name: "name", label: "Name of the Faculty/student author of the patent", type: "text" },
  { name: "patentNo", label: "Patent Number", type: "text" },
  { name: "awardDate", label: "Date of Award", type: "date" },
  { name: "agency", label: "Patent Awarding Agency", type: "text" },
  { name: "link", label: "Link of Document", type: "url" }
],
  "Journal Publications": [
  { name: "title", label: "Title of paper", type: "text" },
  { name: "authors", label: "Name of the author/s", type: "text" },
  { name: "dept", label: "Department of the teacher", type: "text" },
  { name: "journal", label: "Name of journal", type: "text" },
  { name: "year", label: "Year of publication", type: "number" },
  { name: "issn", label: "ISSN number", type: "text" },
  { name: "journalLink", label: "Link to website of the Journal", type: "url" },
  { name: "articleLink", label: "Link to article/paper/abstract of the article", type: "url" },
  { name: "ugcStatus", label: "Is it listed in UGC Care list", type: "text" }
],
  "Conference Publications": [
  { name: "srNo", label: "S. No.", type: "text", autoGenerate: true },
  { name: "title", label: "Title of paper", type: "text" },
  { name: "authors", label: "Name of the Author/s", type: "text" },
  { name: "dept", label: "Department of teacher", type: "text" },
  { name: "confName", label: "Name of Conference", type: "text" },
  { name: "year", label: "Year of publication", type: "number" },
  { name: "issn", label: "ISSN Number", type: "text" },
  { name: "link", label: "Link to article/paper/abstract/DOI", type: "url" }
],
  "Books and chapters": [
  { name: "srNo", label: "S. No.", type: "text", autoGenerate: true },
  { name: "teacherName", label: "Name of the teacher", type: "text" },
  { name: "bookTitle", label: "Title of the book published", type: "text" },
  { name: "chapterTitle", label: "Title of the chapters published", type: "text" },
  { name: "year", label: "Year of publication", type: "number" },
  { name: "isbn", label: "ISBN number", type: "text" },
  { name: "affiliationMatch", label: "Affiliating Institution was same at time of publication (Yes/No)", type: "text" },
  { name: "publisher", label: "Name of the publisher", type: "text" },
  { name: "linkDoi", label: "Link/DOI", type: "url" }
],
  "Fin. support to attend Conf etc": [
    { name: "dates", label: "Dates (from-to) (DD-MM-YYYY)", type: "text" },
    { name: "bodyTitle", label: "Title of the conference/ workshops/ name of the professional body", type: "text" },
    { name: "teacherName", label: "Name of the teacher", type: "text" },
    { name: "amount", label: "Amount provided by the University", type: "number" },
    { name: "purpose", label: "Purpose (Membership fee/travel/Registration fee)", type: "text" }
  ],

  "Current stock of Desktop, HPC etc": [
    { name: "srNo", label: "S. No.", type: "text", autoGenerate: true },
    { name: "labName", label: "Name of Faculty/Lab", type: "text" },
    { name: "desktops", label: "No. of Desktop", type: "number" },
    { name: "servers", label: "No. of Server", type: "number" },
    { name: "workstations", label: "No. of Workstation", type: "number" },
    { name: "hpc", label: "No. of HPC", type: "number" },
    { name: "purchaseYear", label: "Year of Purchase", type: "number" },
    { name: "remark", label: "Remark", type: "text" }
  ],

  "Teachers using ICT": [
    { name: "srNo", label: "S. No.", type: "text", autoGenerate: true },
    { name: "teacherName", label: "Name of teachers using ICT (LMS, e-Resources)", type: "text" },
    { name: "ictTools", label: "ICT tools and resources used", type: "text" },
    { name: "ictClassrooms", label: "Number of ICT enabled classrooms", type: "text" },
    { name: "smartClassrooms", label: "Number of smart classrooms with class room number", type: "text" },
    { name: "techniques", label: "E-resources and techniques", type: "text" },
    { name: "docLink", label: "Relevant documents/ link", type: "url" }
  ],
  "Teachers attending PDP etc": [
    { name: "facultyName", label: "Name of the Faculty", type: "text" },
    { name: "programType", label: "Type of Program (FDP, Orientation, Refresher, etc.)", type: "text" },
    { name: "duration", label: "Duration (in No. of days)", type: "number" },
    { name: "dates", label: "Start Date and End Date", type: "text" },
    { name: "organizer", label: "Name of the Organising Institution", type: "text" },
    { name: "proofLink", label: "Attach Proof (Document Link) - Combine all Proofs in One PDF and Name the file as: FDP_Month_Department", type: "url" }
  ],

  "Visit of faculty to other inst": [
    { name: "srNo", label: "S. No.", type: "text", autoGenerate: true },
    { name: "name", label: "Name", type: "text" },
    { name: "designationOrg", label: "Designation & Organization", type: "text" },
    { name: "topic", label: "Topic", type: "text" },
    { name: "date", label: "Date", type: "date" },
    { name: "proofLink", label: "Attach Proof (Document Link) - Combine all Proofs in One PDF and Name the file as: FDP_Month_Department", type: "url" }
  ],

  "Professional Affiliations": [
    { name: "srNo", label: "S. No.", type: "text", autoGenerate: true },
    { name: "facultyName", label: "Name of Faculty", type: "text" },
    { name: "bodyName", label: "Name of Professional Body", type: "text" },
    { name: "membershipType", label: "Type of Membership", type: "text" },
    { name: "supportArea", label: "Area of support", type: "text" }
  ],

  "Prog. where syllabus revision": [
    { name: "progName", label: "Name of the programme", type: "text" },
    { name: "courseName", label: "Name of the Course", type: "text" },
    { name: "courseCode", label: "Course Code", type: "text" },
    { name: "introYear", label: "Year of introduction", type: "number" },
    { name: "docLink", label: "Link to the relevant document", type: "url" }
  ],
  "Student centric methods": [
    { name: "srNo", label: "S. No.", type: "text", autoGenerate: true },
    { name: "courseName", label: "Course Name", type: "text" },
    { name: "courseCode", label: "Course Code", type: "text" },
    { name: "progName", label: "Name of the Programme", type: "text" },
    { name: "level", label: "UG/ PG", type: "text" },
    { name: "methodDetails", label: "Details of method introduced", type: "text" },
    { name: "docLink", label: "Relevant document/ link", type: "url" }
  ],

  "academic and stress related issues": [
    { name: "srNo", label: "S. No.", type: "text", autoGenerate: true },
    { name: "mentorName", label: "Name of Mentor", type: "text" },
    { name: "studentDetails", label: "Details of students", type: "text" },
    { name: "ratio", label: "Mentor/ mentee ratio", type: "text" },
    { name: "docLink", label: "Relevant documents/ link", type: "url" }
  ],

  "Awards, recognition, fellowship": [
    { name: "awardeeName", label: "Name of the awardee", type: "text" },
    { name: "awardName", label: "Name of the award", type: "text" },
    { name: "awardingBody", label: "Name of the awarding body", type: "text" },
    { name: "category", label: "Category of award (innovation/tech transfer etc)", type: "text" },
    { name: "year", label: "Year of award", type: "number" },
    { name: "proofLink", label: "Attach Proofs (Link) - Combine all Proofs in One PDF and Name the file as: FDP_Month_Department", type: "url" }
  ],

  "Recognition by govt agency": [
    { name: "srNo", label: "S. No.", type: "text", autoGenerate: true },
    { name: "deptName", label: "Name of the Department", type: "text" },
    { name: "schemeName", label: "Name of the Scheme", type: "text" },
    { name: "fundingAgency", label: "Name of the funding agency", type: "text" },
    { name: "awardYear", label: "Year of Award", type: "number" },
    { name: "funds", label: "Funds provided", type: "number" },
    { name: "duration", label: "Duration of award", type: "text" },
    { name: "docLink", label: "Relevant Documents / Link", type: "url" }
  ],
  "Grants for research projects": [
    { name: "srNo", label: "S. No.", type: "text", autoGenerate: true },
    { name: "piName", label: "Name of PI/ Co-PI/ Chair Holder", type: "text" },
    { name: "projectTitle", label: "Title of project/ endowment/ Chair", type: "text" },
    { name: "fundingAgency", label: "Name of the funding agency", type: "text" },
    { name: "duration", label: "Duration", type: "text" },
    { name: "awardYear", label: "Year of award or sanction", type: "number" },
    { name: "amountInr", label: "Amount in INR", type: "number" },
    { name: "proofLink", label: "Attach Proofs (Link) - Combine all Proofs in One PDF and Name the file as: FDP_Month_Department", type: "url" }
  ],

  "Revenue generated (Consultancy)": [
    { name: "consultantName", label: "Name of the consultant", type: "text" },
    { name: "projectName", label: "Name of consultancy project", type: "text" },
    { name: "totalGrant", label: "Total Grant (Rs.)", type: "number" },
    { name: "sponsoringAgency", label: "Agency with contact details", type: "text" },
    { name: "grantYear", label: "Year of grant", type: "number" },
    { name: "revenue", label: "Revenue generated (INR in Lakhs)", type: "number" },
    { name: "docLink", label: "Relevant Documents / Link", type: "url" }
  ],

  "Revenue generated (Corporate Training)": [
    { name: "teacherNames", label: "Names of the teacher-consultants", type: "text" },
    { name: "trainingTitle", label: "Title of corporate training programme", type: "text" },
    { name: "seekingAgency", label: "Agency seeking training with contact details", type: "text" },
    { name: "year", label: "Year", type: "number" },
    { name: "revenue", label: "Revenue generated (INR in Lakhs)", type: "number" },
    { name: "traineeCount", label: "Number of trainees", type: "number" }
  ],

  "Revenue generated (Collaborations)": [
    { name: "srNo", label: "S. No.", type: "text", autoGenerate: true },
    { name: "activityTitle", label: "Title of the collaborative activity", type: "text" },
    { name: "agencyName", label: "Collaborating agency with contact details", type: "text" },
    { name: "participantName", label: "Name of the participant", type: "text" },
    { name: "financialSource", label: "Source of financial support", type: "text" },
    { name: "collabYear", label: "Year of collaboration", type: "number" },
    { name: "duration", label: "Duration", type: "text" },
    { name: "activityNature", label: "Nature of the activity", type: "text" },
    { name: "docLink", label: "Relevant Documents / Link", type: "url" }
  ],
  "Collaborative activities": [
    { name: "srNo", label: "S. No.", type: "text", autoGenerate: true },
    { name: "activityType", label: "Type of Activity (Research, Faculty/Student Exchange)", type: "text" },
    { name: "organization", label: "Name of Institution/Organization", type: "text" },
    { name: "year", label: "Year", type: "number" },
    { name: "nature", label: "Nature of Collaboration (Project, MoU, etc.)", type: "text" },
    { name: "participants", label: "Number of Participants (Faculty/Students)", type: "text" },
    { name: "duration", label: "Duration of Activity", type: "text" },
    { name: "funding", label: "Funding Details", type: "text" },
    { name: "docLink", label: "Relevant Documents / Link", type: "url" }
  ],

  "Linkages with inst., industries": [
    { name: "mouYear", label: "Year of signing MoU", type: "number" },
    { name: "organization", label: "Name of the organization", type: "text" },
    { name: "duration", label: "Duration", type: "text" },
    { name: "purpose", label: "Purpose of MOU/Collaboration", type: "text" },
    { name: "activities", label: "Actual activities under MOU", type: "text" },
    { name: "activityDate", label: "Date of the activity conducted", type: "text" },
    { name: "proofLink", label: "Attach Proofs (Link) - Combine all Proofs in One PDF and Name the file as: FDP_Month_Department", type: "url" }
  ],

  "E-content developed by teacher": [
    { name: "srNo", label: "S. No.", type: "text", autoGenerate: true },
    { name: "teacherName", label: "Name of the teacher", type: "text" },
    { name: "moduleName", label: "Name of the module", type: "text" },
    { name: "platform", label: "Platform (e.g., SWAYAM, NPTEL)", type: "text" },
    { name: "launchDate", label: "Date of launching e-content", type: "text" },
    { name: "docLink", label: "Link of the relevant document", type: "url" }
  ],

  "Capability development Schemes": [
    { name: "srNo", label: "S. No.", type: "text", autoGenerate: true },
    { name: "schemeName", label: "Name of the capability enhancement scheme", type: "text" },
    { name: "year", label: "Year of implementation", type: "number" },
    { name: "enrolledCount", label: "Number of students enrolled", type: "number" },
    { name: "agencies", label: "Agencies involved with contact details", type: "text" },
    { name: "proofLink", label: "Attach Proofs (Link) - Combine all Proofs in One PDF and Name the file as: FDP_Month_Department", type: "url" }
  ],
  "Students-Comp Exam, Higher Edu. (Progressed)": [
    { name: "srNo", label: "S. No.", type: "text", autoGenerate: true },
    { name: "studentName", label: "Name of the outgoing student", type: "text" },
    { name: "organization", label: "Organization joined for Higher Education", type: "text" },
    { name: "programDetails", label: "Details of the program enrolled", type: "text" },
    { name: "proofLink", label: "Attach Proofs (Link) - Combine all Proofs in One PDF and Name the file as: FDP_Month_Department", type: "url" }
  ],

  "Students-Comp Exam, Higher Edu. (Qualified)": [
    { name: "studentName", label: "Name of the qualifying student", type: "text" },
    { name: "year", label: "Year of Qualifying", type: "number" },
    { name: "examLevel", label: "Level of Exam (State/National/Intl)", type: "text" },
    { name: "examName", label: "Name of competitive examination", type: "text" },
    { name: "docLink", label: "Links to relevant document", type: "url" }
  ],

  "Details of awards, medals etc": [
    { name: "srNo", label: "S. No.", type: "text", autoGenerate: true },
    { name: "year", label: "Year", type: "number" },
    { name: "awardName", label: "Name of the award/ medal", type: "text" },
    { name: "level", label: "National/ International", type: "text" },
    { name: "category", label: "Sports/ Cultural", type: "text" },
    { name: "idNumber", label: "AADHAR / Student ID number", type: "text" },
    { name: "studentName", label: "Name of the student", type: "text" },
    { name: "docLink", label: "Relevant document (Link)", type: "url" }
  ],

  "Students provided fin. support": [
    { name: "srNo", label: "S. No.", type: "text", autoGenerate: true },
    { name: "entryDate", label: "Date", type: "date" },
    { name: "studentName", label: "Name of Student", type: "text" },
    { name: "pan", label: "PAN", type: "text" },
    { name: "eventName", label: "Conference/Workshop/Lecture Attended", type: "text" },
    { name: "organizingInst", label: "Organizing Institution", type: "text" },
    { name: "supportAmount", label: "Amount of support", type: "number" },
    { name: "supportDate", label: "Date of Support", type: "date" }
  ],
  "Programmes organized by Dept.": [
    { name: "srNo", label: "S. No.", type: "text", autoGenerate: true },
    { name: "year", label: "Year", type: "number" },
    { name: "teachingTitle", label: "Title of professional development (Teaching)", type: "text" },
    { name: "adminTitle", label: "Title of administrative training", type: "text" },
    { name: "dates", label: "Dates (from-to)", type: "text" },
    { name: "participantCount", label: "No. of participants", type: "number" },
    { name: "organizer", label: "Organizing Faculty/Staff and Department", type: "text" },
    { name: "sponsor", label: "Sponsoring agency", type: "text" }
  ],

  "Staff Training": [
    { name: "srNo", label: "S. No.", type: "text", autoGenerate: true },
    { name: "officialName", label: "Name of Official", type: "text" },
    { name: "programme", label: "Programme", type: "text" },
    { name: "dates", label: "Dates", type: "text" },
    { name: "institution", label: "Organizing institution", type: "text" },
    { name: "proofLink", label: "Attach Proofs (Link) - Combine all Proofs in One PDF and Name the file as: FDP_Month_Department", type: "url" }
  ],

  "Functional MoUs with institution": [
    { name: "signingYear", label: "Year of signing MoU", type: "number" },
    { name: "organization", label: "Name of the organization with whom MOU/Collaboration", type: "text" },
    { name: "duration", label: "Duration", type: "text" },
    { name: "purpose", label: "Purpose of MOU/Collaboration", type: "text" },
    { name: "activities", label: "Actual activities under each MOU (year-wise)", type: "text" },
    { name: "activityDate", label: "Date of the activity conducted", type: "text" },
    { name: "proofLink", label: "Attach Relevant (Link) - Combine all Proofs in One PDF and Name the file as: FDP_Month_Department", type: "url" }
  ],

  "Extension & outreach activities": [
    { name: "srNo", label: "S. No.", type: "text", autoGenerate: true },
    { name: "resourcePerson", label: "Resource person", type: "text" },
    { name: "date", label: "Date", type: "date" },
    { name: "location", label: "Location", type: "text" },
    { name: "activityType", label: "Type of activity", type: "text" },
    { name: "participantCount", label: "No. of Participants", type: "number" },
    { name: "geoTagLink", label: "Report with Geo-Tag Photograph (Link)", type: "url" }
  ],
  "Other Important Info (Employability/Skill)": [
    { name: "srNo", label: "S. No.", type: "text", autoGenerate: true },
    { name: "courseName", label: "Name of the Course", type: "text" },
    { name: "courseCode", label: "Course Code", type: "text" },
    { name: "progName", label: "Name of the Programme", type: "text" },
    { name: "level", label: "UG/ PG", type: "text" },
    { name: "activities", label: "Activities (Employability/Entrepreneurship/Skill)", type: "text" },
    { name: "introYear", label: "Year of introduction", type: "number" }
  ],

  "Other Important Info (New Courses)": [
    { name: "srNo", label: "S. No.", type: "text", autoGenerate: true },
    { name: "courseName", label: "Name of the new course introduced", type: "text" },
    { name: "progName", label: "Program name", type: "text" },
    { name: "progCode", label: "Program code", type: "text" },
    { name: "courseCode", label: "Course code", type: "text" },
    { name: "introYear", label: "Year of introduction", type: "number" },
    { name: "docLink", label: "Link of the relevant document", type: "url" }
  ],

  "Departmental Library Information": [
    { name: "srNo", label: "S. No.", type: "text", autoGenerate: true },
    { name: "bookTitle", label: "Title of The Book", type: "text" },
    { name: "authors", label: "Authors of Book", type: "text" },
    { name: "publisher", label: "Publisher", type: "text" },
    { name: "edition", label: "Edition", type: "text" },
    { name: "pubYear", label: "Year of Publication", type: "number" }
  ],

  "PhD Defense Details": [
    { name: "srNo", label: "S. No.", type: "text", autoGenerate: true },
    { name: "studentName", label: "Name of Student", type: "text" },
    { name: "rollNo", label: "Enrollment Number/ Roll No.", type: "text" },
    { name: "thesisTitle", label: "Thesis Title", type: "text" },
    { name: "supervisor", label: "Supervisor", type: "text" },
    { name: "coSupervisor", label: "Co-Supervisor", type: "text" },
    { name: "defenseDate", label: "Date of Defense", type: "date" },
    { name: "resultDate", label: "Date of Result Notification", type: "date" }
  ],

  "Student Submission Logs": [
    { name: "srNo", label: "Sr. No.", type: "text", autoGenerate: true },
    { name: "timestamp", label: "Submission Date & Time", type: "text", autoGenerate: true },
    { name: "studentName", label: "Student Name", type: "text", autoGenerate: true },
    { name: "rollNumber", label: "Roll Number", type: "text", autoGenerate: true },
    { name: "phoneNumber", label: "Phone Number", type: "text", autoGenerate: true },
    { name: "sheetName", label: "Sheet Submitted To", type: "text", autoGenerate: true },
    { name: "recordsAdded", label: "Records Added", type: "number", autoGenerate: true }
  ]
};

// Map UI/config keys to exact Google Sheet tab names.
// This avoids accidental creation of new tabs when labels differ by case or punctuation.
export const GOOGLE_SHEET_NAME_MAP: Record<string, string> = {
  "Achievements of the department": "Achievements of the department",
  "Detail of Patents filed, publish": "Detail of Patents filed, publish",
  "Journal Publications": "Journal Publications",
  "Conference Publications": "Conference Publications",
  "Books and chapters": "Books and chapters",
  "Fin. support to attend Conf etc": "Fin. support to attend Conf etc",
  "Current stock of Desktop, HPC etc": "Current stock of Desktop, HPC etc",
  "Teachers using ICT": "Teachers using ICT",
  "Teachers attending PDP etc": "Teachers attending PDP etc",
  "Visit of faculty to other inst": "Visit of faculty to other inst",
  "Professional Affiliations": "Professional Affiliations",
  "Prog. where syllabus revision": "Prog. where syllabus revision",
  "Student centric methods": "Student centric methods",
  "academic and stress related issues": "academic and stress related issues",
  "Awards, recognition, fellowship": "Awards, recognition, fellowship",
  "Recognition by govt agency": "Recognition by govt agency",
  "Grants for research projects": "Grants for research projects",
  "Revenue generated (Consultancy)": "Revenue generated (Consultancy)",
  "Revenue generated (Corporate Training)": "Revenue generated (Corporate Training)",
  "Revenue generated (Collaborations)": "Revenue generated (Collaborations)",
  "Collaborative activities": "Collaborative activities",
  "Linkages with inst., industries": "Linkages with inst., industries",
  "E-content developed by teacher": "E-content developed by teacher",
  "Capability development Schemes": "Capability development Schemes",
  "Students-Comp Exam, Higher Edu. (Progressed)": "Students-Comp Exam, Higher Edu. (Progressed)",
  "Students-Comp Exam, Higher Edu. (Qualified)": "Students-Comp Exam, Higher Edu. (Qualified)",
  "Details of awards, medals etc": "Details of awards, medals etc",
  "Students provided fin. support": "Students provided fin. support",
  "Programmes organized by Dept.": "Programmes organized by Dept.",
  "Staff Training": "Staff Training",
  "Functional MoUs with institution": "Functional MoUs with institution",
  "Extension & outreach activities": "Extension & outreach activities",
  "Other Important Info (Employability/Skill)": "Other Important Info (Employability/Skill)",
  "Other Important Info (New Courses)": "Other Important Info (New Courses)",
  "Departmental Library Information": "Departmental Library Information",
  "PhD Defense Details": "PhD Defense Details",
  "Student Submission Logs": "logs"
};

// Role-based sheet access control
export const STUDENT_SHEETS = [
  "Detail of Patents filed, publish",
  "Students-Comp Exam, Higher Edu. (Progressed)",
  "Students-Comp Exam, Higher Edu. (Qualified)",
  "Details of awards, medals etc",
  "Students provided fin. support",
  "PhD Defense Details"
];

export const FACULTY_SHEETS = Object.keys(SHEET_CONFIGS).filter(sheet => sheet !== "Student Submission Logs");

export const ALL_SHEETS = Object.keys(SHEET_CONFIGS).filter(sheet => sheet !== "Student Submission Logs");