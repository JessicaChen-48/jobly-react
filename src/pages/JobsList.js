import SearchBar from "../components/SearchBar";
import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "../JoblyAPI";
import JobCard from "../components/JobCard";
import Loader from "../Loader"
import UserContext from "../userContext";
import { Redirect } from "react-router";
import "./Company.css"

function JobsList() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { token, currentUser } = useContext(UserContext);

  useEffect(() => {
    async function getJobsList() {
      const jobList = await JoblyApi.getAllJobs();
      setJobs(jobList);
    }
    getJobsList();
  }, []);

  function addSearchTerm(term) {
    setSearchTerm(term);
  }

  useEffect(() => {
    async function getJobsList() {
      const jobList = await JoblyApi.getAllJobs(searchTerm);
      setJobs(jobList);
    }
    if (searchTerm) getJobsList();
  }, [searchTerm]);

  if (!jobs.length) return <div><Loader/></div>;

  return (
    <div>
    <div className="m-3">
      {token && (
        <div>
          <h1>Jobs</h1>
          <SearchBar addSearchTerm={addSearchTerm} />
          <div className="all-jobs">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
          </div>
        </div>
      )}
      {!token && <Redirect to="/login" />}
    </div>
    </div>
  );
}

export default JobsList;
