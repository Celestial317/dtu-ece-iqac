export interface Field {
  name: string;
  label: string;
  type: 'text' | 'number' | 'url' | 'date';
}

export const SHEET_CONFIGS: Record<string, Field[]> = {
  "Detail of Patents filed,publish": [
    { name: "name", label: "Faculty/Student Name", type: "text" },
    { name: "patentNo", label: "Patent Number", type: "text" },
    { name: "awardDate", label: "Date of Award", type: "date" },
    { name: "agency", label: "Patent Awarding Agency", type: "text" },
    { name: "link", label: "Document Link", type: "url" }
  ],
  "Basic Information": [
    { name: "year", label: "Year", type: "number" },
    { name: "prog", label: "Program Name", type: "text" },
    { name: "benefited", label: "Students Benefited", type: "number" }
  ],
  "Achievements of the department": [
    { name: "progName", label: "Programme Name", type: "text" },
    { name: "progCode", label: "Programme Code", type: "text" },
    { name: "hasFieldProject", label: "Field Project (Yes/No)", type: "text" },
    { name: "studentCount", label: "Students Undertaking", type: "number" },
    { name: "link", label: "Document Link", type: "url" }
  ],
  "Journal Publications": [
    { name: "title", label: "Paper Title", type: "text" },
    { name: "authors", label: "Authors", type: "text" },
    { name: "dept", label: "Department", type: "text" },
    { name: "journal", label: "Journal Name", type: "text" },
    { name: "year", label: "Year", type: "number" },
    { name: "issn", label: "ISSN", type: "text" },
    { name: "link", label: "Article Link", type: "url" }
  ],
  "Conference Publications": [
    { name: "title", label: "Paper Title", type: "text" },
    { name: "authors", label: "Authors", type: "text" },
    { name: "dept", label: "Department", type: "text" },
    { name: "conf", label: "Conference Name", type: "text" },
    { name: "year", label: "Year", type: "number" },
    { name: "issn", label: "ISSN", type: "text" },
    { name: "link", label: "DOI/Link", type: "url" }
  ],
  "Books and chapters": [
    { name: "teacher", label: "Teacher Name", type: "text" },
    { name: "bookTitle", label: "Book Title", type: "text" },
    { name: "chapterTitle", label: "Chapter Title", type: "text" },
    { name: "year", label: "Year", type: "number" },
    { name: "isbn", label: "ISBN Number", type: "text" },
    { name: "publisher", label: "Publisher", type: "text" },
    { name: "link", label: "Link/DOI", type: "url" }
  ],
  "Fin. support to attend Conf etc": [
    { name: "dates", label: "Dates (From-To)", type: "text" },
    { name: "title", label: "Conference/Body Title", type: "text" },
    { name: "teacher", label: "Teacher Name", type: "text" },
    { name: "amount", label: "Amount Provided", type: "number" },
    { name: "purpose", label: "Purpose", type: "text" }
  ],
  "Current stock of Desktop,HPC et": [
    { name: "lab", label: "Faculty/Lab Name", type: "text" },
    { name: "desktop", label: "No. of Desktops", type: "number" },
    { name: "server", label: "No. of Servers", type: "number" },
    { name: "workstation", label: "No. of Workstations", type: "number" },
    { name: "hpc", label: "No. of HPC", type: "number" },
    { name: "year", label: "Purchase Year", type: "number" }
  ],
  "Teachers using ICT": [
    { name: "teacher", label: "Teacher Name", type: "text" },
    { name: "ictTools", label: "ICT Tools Used", type: "text" },
    { name: "classrooms", label: "No. of ICT Classrooms", type: "text" },
    { name: "smartRooms", label: "No. of Smart Classrooms", type: "text" },
    { name: "eResources", label: "E-Resources Used", type: "text" }
  ],
  "Teachers attending PDP etc": [
    { name: "faculty", label: "Faculty Name", type: "text" },
    { name: "type", label: "Program Type", type: "text" },
    { name: "duration", label: "Duration (Days)", type: "number" },
    { name: "dates", label: "Start-End Dates", type: "text" },
    { name: "inst", label: "Organizing Institution", type: "text" }
  ],
  "Visit of faculty to other inst": [
    { name: "name", label: "Name", type: "text" },
    { name: "designation", label: "Designation/Org", type: "text" },
    { name: "topic", label: "Lecture Topic", type: "text" },
    { name: "date", label: "Date", type: "date" }
  ],
  "Professional Affiliations": [
    { name: "name", label: "Faculty Name", type: "text" },
    { name: "body", label: "Professional Body", type: "text" },
    { name: "type", label: "Membership Type", type: "text" },
    { name: "area", label: "Area of Support", type: "text" }
  ],
  "Prog. where syllabus revision": [
    { name: "prog", label: "Programme Name", type: "text" },
    { name: "course", label: "Course Name", type: "text" },
    { name: "code", label: "Course Code", type: "text" },
    { name: "year", label: "Revision Year", type: "number" }
  ],
  "Student centric methods": [
    { name: "course", label: "Course Name", type: "text" },
    { name: "code", label: "Course Code", type: "text" },
    { name: "prog", label: "Programme Name", type: "text" },
    { name: "level", label: "UG/PG", type: "text" },
    { name: "method", label: "Method Introduced", type: "text" }
  ],
  "academic and stress related iss": [
    { name: "mentor", label: "Mentor Name", type: "text" },
    { name: "students", label: "Details of Students", type: "text" },
    { name: "ratio", label: "Mentor/Mentee Ratio", type: "text" }
  ],
  "Awards, recognition, fellowship": [
    { name: "awardee", label: "Awardee Name", type: "text" },
    { name: "award", label: "Award Name", type: "text" },
    { name: "body", label: "Awarding Body", type: "text" },
    { name: "category", label: "Category", type: "text" },
    { name: "year", label: "Award Year", type: "number" }
  ],
  "Recognition by govt agency": [
    { name: "dept", label: "Department Name", type: "text" },
    { name: "scheme", label: "Scheme Name", type: "text" },
    { name: "agency", label: "Funding Agency", type: "text" },
    { name: "year", label: "Award Year", type: "number" },
    { name: "funds", label: "Funds Provided", type: "number" }
  ],
  "Grants for research projects": [
    { name: "pi", label: "PI/Co-PI Name", type: "text" },
    { name: "title", label: "Project Title", type: "text" },
    { name: "agency", label: "Funding Agency", type: "text" },
    { name: "duration", label: "Duration", type: "text" },
    { name: "year", label: "Award Year", type: "number" },
    { name: "amount", label: "Amount (INR)", type: "number" }
  ],
  "Revenue generated": [
    { name: "consultant", label: "Consultant Name", type: "text" },
    { name: "project", label: "Project Title", type: "text" },
    { name: "agency", label: "Sponsoring Agency", type: "text" },
    { name: "year", label: "Year", type: "number" },
    { name: "revenue", label: "Revenue (Lakhs)", type: "number" }
  ],
  "Collaborative activities": [
    { name: "type", label: "Activity Type", type: "text" },
    { name: "org", label: "Organization", type: "text" },
    { name: "year", label: "Year", type: "number" },
    { name: "nature", label: "Nature of Collab", type: "text" },
    { name: "participants", label: "No. of Participants", type: "number" }
  ],
  "Linkages with inst., industries": [
    { name: "year", label: "MoU Year", type: "number" },
    { name: "org", label: "Organization", type: "text" },
    { name: "duration", label: "Duration", type: "text" },
    { name: "purpose", label: "Purpose", type: "text" },
    { name: "activities", label: "Activities List", type: "text" }
  ],
  "E-content developed by teacher": [
    { name: "teacher", label: "Teacher Name", type: "text" },
    { name: "module", label: "Module Name", type: "text" },
    { name: "platform", label: "Platform", type: "text" },
    { name: "date", label: "Launch Date", type: "date" }
  ],
  "Capability development Schemes": [
    { name: "scheme", label: "Scheme Name", type: "text" },
    { name: "year", label: "Implementation Year", type: "number" },
    { name: "enrolled", label: "No. of Students", type: "number" },
    { name: "agency", label: "Agencies Involved", type: "text" }
  ],
  "Students-Comp Exam, Higher Edu.": [
    { name: "student", label: "Student Name", type: "text" },
    { name: "org", label: "Organization/University", type: "text" },
    { name: "program", label: "Program Enrolled", type: "text" }
  ],
  "Details of awards, medals etc": [
    { name: "year", label: "Award Year", type: "number" },
    { name: "award", label: "Award Name", type: "text" },
    { name: "level", label: "National/Intl", type: "text" },
    { name: "category", label: "Sports/Cultural", type: "text" },
    { name: "student", label: "Student Name", type: "text" }
  ],
  "Students provided fin. support": [
    { name: "date", label: "Date", type: "date" },
    { name: "student", label: "Student Name", type: "text" },
    { name: "pan", label: "PAN", type: "text" },
    { name: "event", label: "Event Name", type: "text" },
    { name: "inst", label: "Organizing Institution", type: "text" },
    { name: "amount", label: "Amount", type: "number" }
  ],
  "Programmes organized by Dept.": [
    { name: "year", label: "Year", type: "number" },
    { name: "titleTeaching", label: "Title (Teaching)", type: "text" },
    { name: "titleNonTeaching", label: "Title (Non-Teaching)", type: "text" },
    { name: "dates", label: "Dates", type: "text" },
    { name: "participants", label: "No. of Participants", type: "number" }
  ],
  "Staff Training": [
    { name: "official", label: "Official Name", type: "text" },
    { name: "programme", label: "Programme", type: "text" },
    { name: "dates", label: "Dates", type: "text" },
    { name: "inst", label: "Organizing Institution", type: "text" }
  ],
  "Functional MoUs with institutio": [
    { name: "year", label: "MoU Year", type: "number" },
    { name: "org", label: "Organization", type: "text" },
    { name: "duration", label: "Duration", type: "text" },
    { name: "purpose", label: "Purpose", type: "text" },
    { name: "activities", label: "Conduct Activities", type: "text" }
  ],
  "Extension & outreach activities": [
    { name: "person", label: "Resource Person", type: "text" },
    { name: "date", label: "Date", type: "date" },
    { name: "location", label: "Location", type: "text" },
    { name: "type", label: "Activity Type", type: "text" },
    { name: "participants", label: "No. of Participants", type: "number" }
  ],
  "Other Important information": [
    { name: "course", label: "Course Name", type: "text" },
    { name: "code", label: "Course Code", type: "text" },
    { name: "prog", label: "Programme Name", type: "text" },
    { name: "level", label: "UG/PG", type: "text" },
    { name: "activities", label: "Activities Description", type: "text" },
    { name: "year", label: "Intro Year", type: "number" }
  ],
  "Departmental Library Informatio": [
    { name: "title", label: "Book Title", type: "text" },
    { name: "authors", label: "Authors", type: "text" },
    { name: "pub", label: "Publisher", type: "text" },
    { name: "edition", label: "Edition", type: "text" },
    { name: "year", label: "Year", type: "number" }
  ],
  "PhD Defense Details": [
    { name: "student", label: "Student Name", type: "text" },
    { name: "roll", label: "Roll No.", type: "text" },
    { name: "thesis", label: "Thesis Title", type: "text" },
    { name: "supervisor", label: "Supervisor", type: "text" },
    { name: "coSupervisor", label: "Co-Supervisor", type: "text" },
    { name: "defenseDate", label: "Defense Date", type: "date" },
    { name: "resultDate", label: "Result Date", type: "date" }
  ]
};

export const ALL_SHEETS = Object.keys(SHEET_CONFIGS);