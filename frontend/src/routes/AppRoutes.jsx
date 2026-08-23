import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import About from "../pages/About";

import Services from "../pages/services/Services";
import ServiceDetails from "../pages/services/ServiceDetails";

import Academy from "../pages/academy/Academy";
import Courses from "../pages/academy/Courses";
import CourseDetails from "../pages/academy/CourseDetails";
import RegisterCourse from "../pages/academy/RegisterCourse";

import Internships from "../pages/internships/Internships";
import InternshipDetails from "../pages/internships/InternshipDetails";
import ApplyInternship from "../pages/internships/ApplyInternship";

import Projects from "../pages/projects/Projects";
import ProjectDetails from "../pages/projects/ProjectDetails";
import CaseStudies from "../pages/projects/CaseStudies";

import Careers from "../pages/careers/Careers";
import JobDetails from "../pages/careers/JobDetails";
import ApplyJob from "../pages/careers/ApplyJob";

import CertificateVerification from "../pages/academy/CertificateVerification";

import Contact from "../pages/Contact";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsConditions from "../pages/TermsConditions";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/services" element={<Services />} />
        <Route
          path="/services/:slug"
          element={<ServiceDetails />}
        />

        <Route path="/academy" element={<Academy />} />
        <Route path="/academy/courses" element={<Courses />} />
        <Route path="/register-course" element={<RegisterCourse />} />
        <Route
          path="/academy/courses/:slug"
          element={<CourseDetails />}
        />

        <Route
          path="/internships"
          element={<Internships />}
        />
        <Route
          path="/internships/:slug"
          element={<InternshipDetails />}
        />
        <Route
          path="/internships/:slug/apply"
          element={<ApplyInternship />}
        />

        <Route path="/projects" element={<Projects />} />
        <Route
          path="/projects/:slug"
          element={<ProjectDetails />}
        />
        <Route
          path="/projects/case-studies"
          element={<CaseStudies />}
        />

        <Route path="/careers" element={<Careers />} />
        <Route
          path="/careers/:slug"
          element={<JobDetails />}
        />
        <Route
          path="/careers/:slug/apply"
          element={<ApplyJob />}

        />
        <Route
          path="/verify-certificate"
          element={
            <CertificateVerification />
          }
        />

        <Route path="/contact" element={<Contact />} />

        <Route
          path="/privacy-policy"
          element={<PrivacyPolicy />}
        />

        <Route
          path="/terms-conditions"
          element={<TermsConditions />}
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}