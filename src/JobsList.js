import SearchBar from "./SearchBar";
import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "./JoblyAPI";
import JobCard from "./JobCard";
import Loader from "./Loader"
import UserContext from "./userContext";
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
    <div className="m-3 all-jobs">
      {token && (
        <div>
          <h1>Jobs</h1>
          <div className="all-jobs">
          <SearchBar addSearchTerm={addSearchTerm} />
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
          </div>
        </div>
      )}
      {!token && <Redirect to="/login" />}
    </div>
  );
}

export default JobsList;
