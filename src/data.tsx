// src/data.ts

export const SHEET_NAMES = [
  "Basic Information", "Achievements of the department", "Detail of Patents filed,publish",
  "Journal Publications", "Conference Publications", "Books and chapters",
  "Fin. support to attend Conf etc", "Current stock of Desktop,HPC et",
  "Teachers using ICT", "Teachers attending PDP etc", "Visit of faculty to other inst",
  "Professional Affiliations", "Prog. where syllabus revision", "Student centric methods",
  "academic and stress related iss", "Awards, recognition, fellowship",
  "Recognition by govt agency", "Grants for research projects", "Revenue generated",
  "Collaborative activities", "Linkages with inst., industries", "E-content developed by teacher",
  "Capability development Schemes", "Students-Comp Exam, Higher Edu.",
  "Details of awards, medals etc", "Students provided fin. support",
  "Programmes organized by Dept.", "Staff Training", "Functional MoUs with institutio",
  "Extension & outreach activities", "Other Important information",
  "Departmental Library Informatio", "PhD Defense Details"
];

// Define the fields for each sheet
export const SHEET_SCHEMAS: Record<string, { name: string, label: string, type: string }[]> = {
  "Journal Publications": [
    { name: "title", label: "Title of paper", type: "text" },
    { name: "authors", label: "Name of the author/s", type: "text" },
    { name: "department", label: "Department of the teacher", type: "text" },
    { name: "journal", label: "Name of journal", type: "text" },
    { name: "year", label: "Year of publication", type: "number" },
    { name: "issn", label: "ISSN number", type: "text" },
    { name: "link", label: "Link to article/paper", type: "url" },
  ],
  "Conference Publications": [
    { name: "title", label: "Title of paper", type: "text" },
    { name: "authors", label: "Name of the Author/s", type: "text" },
    { name: "department", label: "Department of teacher", type: "text" },
    { name: "conference", label: "Name of Conference", type: "text" },
    { name: "year", label: "Year of publication", type: "number" },
  ],
  "Departmental Library Informatio": [
    { name: "title", label: "Title of The Book", type: "text" },
    { name: "authors", label: "Authors of Book", type: "text" },
    { name: "publisher", label: "Publisher", type: "text" },
    { name: "edition", label: "Edition", type: "text" },
    { name: "year", label: "Year of Publication", type: "number" },
  ]
  // Add remaining schemas here based on your CSV column headers
};