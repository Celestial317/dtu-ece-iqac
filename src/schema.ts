export const PERIOD_OPTIONS = [
  "Jan-Feb2026",
  "Mar-Apr2026",
  "May-Jun2026",
  "Jul-Aug2026",
  "Sep-Oct2026",
  "Nov-Dec2026"
] as const;
export type PeriodOption = (typeof PERIOD_OPTIONS)[number];

export interface Field {
  name: string;
  label: string;
  type: 'text' | 'number' | 'url' | 'date';
  autoGenerate?: boolean;
}

export const SHEET_CONFIGS: Record<string, Field[]> = {
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
  "Teachers using ICT": [
    { name: "srNo", label: "S. No.", type: "text", autoGenerate: true },
    { name: "teacherName", label: "Name of teachers using ICT (LMS, e-Resources)", type: "text" },
    { name: "ictTools", label: "ICT tools and resources used", type: "text" },
    { name: "ictClassrooms", label: "Number of ICT enabled classrooms", type: "text" },
    { name: "smartClassrooms", label: "Number of smart classrooms with class room number", type: "text" },
    { name: "techniques", label: "E-resources and techniques", type: "text" },
    { name: "docLink", label: "Relevant documents/ link", type: "url" }
  ],
  "Teachers attending PDP/FDP etc": [
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
  "12A Revenue generated (Consultancy)": [
    { name: "consultantName", label: "Name of the consultant", type: "text" },
    { name: "projectName", label: "Name of consultancy project", type: "text" },
    { name: "totalGrant", label: "Total Grant (Rs.)", type: "number" },
    { name: "sponsoringAgency", label: "Agency with contact details", type: "text" },
    { name: "grantYear", label: "Year of grant", type: "number" },
    { name: "revenue", label: "Revenue generated (INR in Lakhs)", type: "number" },
    { name: "docLink", label: "Relevant Documents / Link", type: "url" }
  ],
  "12B Revenue generated (Corporate Training)": [
    { name: "teacherNames", label: "Names of the teacher-consultants", type: "text" },
    { name: "trainingTitle", label: "Title of corporate training programme", type: "text" },
    { name: "seekingAgency", label: "Agency seeking training with contact details", type: "text" },
    { name: "year", label: "Year", type: "number" },
    { name: "revenue", label: "Revenue generated (INR in Lakhs)", type: "number" },
    { name: "traineeCount", label: "Number of trainees", type: "number" }
  ],
  "12C Revenue generated (Collaborations)": [
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
    { name: "activityType", label: "Type of Activity (Research/Faculty Exchange/Student Exchange etc.)", type: "text" },
    { name: "organization", label: "Name of Institution/Organization", type: "text" },
    { name: "year", label: "Year", type: "number" },
    { name: "nature", label: "Nature of Collaboration (Project, MoU, etc.)", type: "text" },
    { name: "participants", label: "Number of Participants (Faculty/Students)", type: "text" },
    { name: "duration", label: "Duration of Activity", type: "text" },
    { name: "funding", label: "Funding Details", type: "text" },
    { name: "docLink", label: "Relevant Documents / Link", type: "url" }
  ],
  "E-content developed by teacher": [
    { name: "srNo", label: "S. No.", type: "text", autoGenerate: true },
    { name: "teacherName", label: "Name of the teacher", type: "text" },
    { name: "moduleName", label: "Name of the module", type: "text" },
    { name: "platform", label: "Platform (e.g., SWAYAM, NPTEL)", type: "text" },
    { name: "launchDate", label: "Date of launching e-content", type: "text" },
    { name: "docLink", label: "Link of the relevant document", type: "url" }
  ],
  "5A Enrolment in Higher Education": [
    { name: "srNo", label: "S. No.", type: "text", autoGenerate: true },
    { name: "studentName", label: "Name of the outgoing student", type: "text" },
    { name: "organization", label: "Organization joined for Higher Education", type: "text" },
    { name: "programDetails", label: "Details of the program enrolled", type: "text" },
    { name: "proofLink", label: "Attach Proofs (Link) - Combine all Proofs in One PDF and Name the file as: FDP_Month_Department", type: "url" }
  ],
  "5B Details of National/Internation Level Exams": [
    { name: "studentName", label: "Name of the qualifying student", type: "text" },
    { name: "year", label: "Year of Qualifying", type: "number" },
    { name: "examLevel", label: "Level of Exam (State/National/Intl)", type: "text" },
    { name: "examName", label: "Name of competitive examination", type: "text" },
    { name: "docLink", label: "Links to relevant document", type: "url" }
  ],
  "5C Qualification in any Competitive Exam/Higher Studies": [
    { name: "srNo", label: "S. No.", type: "text", autoGenerate: true },
    { name: "examName", label: "Name of the Exam Qualified/Course", type: "text" },
    { name: "institute", label: "Institute of Admission", type: "text" },
    { name: "courseName", label: "Course Name", type: "text" },
    { name: "studentName", label: "Name of the Student", type: "text" },
    { name: "studentId", label: "Student ID Number", type: "text" },
    { name: "proofLink", label: "Attach Proofs (Link)", type: "url" }
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
  "Extension & outreach activities": [
    { name: "srNo", label: "S. No.", type: "text", autoGenerate: true },
    { name: "resourcePerson", label: "Resource person", type: "text" },
    { name: "date", label: "Date", type: "date" },
    { name: "location", label: "Location", type: "text" },
    { name: "activityType", label: "Type of activity", type: "text" },
    { name: "participantCount", label: "No. of Participants", type: "number" },
    { name: "geoTagLink", label: "Report with Geo-Tag Photograph (Link)", type: "url" }
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
  "Detail of Patents filed, publish": "Detail of Patents filed, publish",
  "Journal Publications": "Journal Publications",
  "Conference Publications": "Conference Publications",
  "Books and chapters": "Books and chapters",
  "Fin. support to attend Conf etc": "Fin. support to attend Conf etc",
  "Teachers using ICT": "Teachers using ICT",
  "Teachers attending PDP/FDP etc": "Teachers attending PDP/FDP etc",
  "Visit of faculty to other inst": "Visit of faculty to other inst",
  "Professional Affiliations": "Professional Affiliations",
  "Awards, recognition, fellowship": "Awards, recognition, fellowship",
  "Recognition by govt agency": "Recognition by govt agency",
  "Grants for research projects": "Grants for research projects",
  "12A Revenue generated (Consultancy)": "Revenue generated (Consultancy)",
  "12B Revenue generated (Corporate Training)": "Revenue generated (Corporate Training)",
  "12C Revenue generated (Collaborations)": "Revenue generated (Collaborations)",
  "Collaborative activities": "Collaborative activities",
  "E-content developed by teacher": "E-content developed by teacher",
  "Details of awards, medals etc": "Details of awards, medals etc",
  "Students provided fin. support": "Students provided fin. support",
  "Extension & outreach activities": "Extension & outreach activities",
  "5A Enrolment in Higher Education": "Enrolment in Higher Education",
  "5B Details of National/Internation Level Exams": "Details of National/Internation Level Exams",
  "5C Qualification in any Competitive Exam/Higher Studies": "Competitive Exam/Higher Studies",
  "Student Submission Logs": "logs"
};

const STUDENT_ONLY_SHEETS = [
  "Detail of Patents filed, publish",
  "Details of awards, medals etc",
  "Students provided fin. support",
  "5A Enrolment in Higher Education",
  "5B Details of National/Internation Level Exams",
  "5C Qualification in any Competitive Exam/Higher Studies",
];


// Role-based sheet access control
export const STUDENT_SHEETS = [
  "Extension & outreach activities",
  ...STUDENT_ONLY_SHEETS,
];

export const FACULTY_SHEETS = [
  "Detail of Patents filed, publish",
  "Journal Publications",
  "Conference Publications",
  "Books and chapters",
  "Fin. support to attend Conf etc",
  "Teachers using ICT",
  "Teachers attending PDP/FDP etc",
  "Visit of faculty to other inst",
  "Professional Affiliations",
  "Awards, recognition, fellowship",
  "Recognition by govt agency",
  "Grants for research projects",
  "12A Revenue generated (Consultancy)",
  "12B Revenue generated (Corporate Training)",
  "12C Revenue generated (Collaborations)",
  "Collaborative activities",
  "E-content developed by teacher",
  "Extension & outreach activities",
  "Departmental Library Information"
];

export const ALL_SHEETS = Object.keys(SHEET_CONFIGS).filter(
  (sheet) => sheet !== "Student Submission Logs"
);