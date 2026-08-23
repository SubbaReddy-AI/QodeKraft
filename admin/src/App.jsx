import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Services from "./pages/Services";
import Courses from "./pages/Courses";
import Mentors from "./pages/Mentors";
import Internships from "./pages/Internships";
import InternshipApplications from "./pages/InternshipApplications";
import Projects from "./pages/Projects";
import Jobs from "./pages/Jobs";
import JobApplications from "./pages/JobApplications";
import Contacts from "./pages/Contacts";
import Newsletter from "./pages/Newsletter";
import Testimonials from "./pages/Testimonials";
import News from "./pages/News";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/services" element={<Services />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/internships" element={<Internships />} />
          <Route
            path="/internship-applications"
            element={<InternshipApplications />}
          />
          <Route path="/projects" element={<Projects />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route
            path="/job-applications"
            element={<JobApplications />}
          />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route
            path="/testimonials"
            element={<Testimonials />}
          />
          <Route path="/news" element={<News />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}