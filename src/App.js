import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import Home from "./view/candidate/Home";
import CompanyList from "./view/candidate/CompanyList";
import Company from "./view/candidate/Company";
import JobList from "./view/candidate/JobList";
import Job from "./view/candidate/Job";
import EmployerLayout from "./view/employer/layouts/Layout";
import EmployerLogin from "./view/employer/auth/Login";
import CandidateList from "./view/employer/candidates/CandidateList";
import JobManagement from "./view/employer/jobs/JobManagement";
import CandidateLayout from "./view/candidate/management/layouts/CandidateLayout";
import AppliedJobs from "./view/candidate/management/AppliedJobs";
import SavedJobs from "./view/candidate/management/SavedJobs";
import Signup from "./view/candidate/auth/Signup";
import Layout from "./view/candidate/layouts/Layout";
import Profile from "./view/candidate/management/profile";
import Resume from "./view/candidate/management/resumes";
import Template from "./view/candidate/management/resumes/templates";
import NewLayout from "./view/NewLayout";

export const AppContext = createContext();

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <AppContext.Provider value={{ currentPage, setCurrentPage }}>
      <ToastContainer autoClose={500} position="bottom-right" />
      <BrowserRouter>
        <Routes>
          {/* Route cho NewLayout ở trang gốc */}
          <Route path="/" element={<NewLayout />} />

          {/* Candidate Layout */}
          <Route
            path="candidate/*"
            element={
              <CandidateLayout>
                <Routes>
                  <Route path="applied-jobs" element={<AppliedJobs />} />
                  <Route path="saved-jobs" element={<SavedJobs />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="resumes" element={<Resume />} />
                  <Route path="resumes/create" element={<Template />} />
                  <Route path="resumes/:id" element={<Template />} />
                </Routes>
              </CandidateLayout>
            }
          />

          {/* Employer Layout */}
          <Route
            path="employer/*"
            element={
              <EmployerLayout>
                <Routes>
                  <Route path="candidates" element={<CandidateList />} />
                  <Route path="jobs" element={<JobManagement />} />
                </Routes>
              </EmployerLayout>
            }
          />
          <Route path="employer/login" element={<EmployerLogin />} />
          {/* Các route khác bên trong Layout */}
          <Route
            path="*"
            element={
              <Layout>
                <Routes>
                  <Route path="home" element={<Home />} />
                  <Route path="sign-up" element={<Signup />} />
                  <Route path="companies" element={<CompanyList />} />
                  <Route path="companies/:id" element={<Company />} />
                  <Route path="jobs" element={<JobList />} />
                  <Route path="jobs/:id" element={<Job />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
