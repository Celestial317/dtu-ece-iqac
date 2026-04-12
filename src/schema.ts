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
    { name: "dept", label: "Name of Department", type: "text" },
    { name: "hod", label: "Name of HOD", type: "text" }
  ],
  "Achievements of the department": [
    { name: "desc", label: "Achievement Description", type: "text" }
  ],
  "Journal Publications": [
    { name: "title", label: "Paper Title", type: "text" },
    { name: "authors", label: "Authors", type: "text" },
    { name: "journal", label: "Journal Name", type: "text" }
  ],
  "PhD Defense Details": [
    { name: "student", label: "Student Name", type: "text" },
    { name: "thesis", label: "Thesis Title", type: "text" }
  ],
  // Placeholder keys for the sidebar to remain complete
  "Conference Publications": [], "Books and chapters": [], "Fin. support to attend Conf etc": [],
  "Current stock of Desktop,HPC et": [], "Teachers using ICT": [], "Teachers attending PDP etc": [],
  "Visit of faculty to other inst": [], "Professional Affiliations": [], "Prog. where syllabus revision": [],
  "Student centric methods": [], "academic and stress related iss": [], "Awards, recognition, fellowship": [],
  "Recognition by govt agency": [], "Grants for research projects": [], "Revenue generated": [],
  "Collaborative activities": [], "Linkages with inst., industries": [], "E-content developed by teacher": [],
  "Capability development Schemes": [], "Students-Comp Exam, Higher Edu.": [], "Details of awards, medals etc": [],
  "Students provided fin. support": [], "Programmes organized by Dept.": [], "Staff Training": [],
  "Functional MoUs with institutio": [], "Extension & outreach activities": [], "Other Important information": [],
  "Departmental Library Informatio": []
};

export const ALL_SHEETS = Object.keys(SHEET_CONFIGS);