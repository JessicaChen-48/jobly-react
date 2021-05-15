import { useContext, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import JoblyAPI from "./JoblyAPI";
import JobCard from "./JobCard";
import UserContext from "./userContext";
import "./Company.css"

function CompanyDetail() {
  const { token } = useContext(UserContext);
  const { handle } = useParams();
  const [companyJobs, setCompanyJobs] = useState([]);

  useEffect(() => {
    async function getCompany() {
      const companyRes = await JoblyAPI.getCompany(handle);
      setCompanyJobs(companyRes.jobs);
    }
    getCompany();
  }, []);

  if (!companyJobs.length) return <div>Loading....</div>;

  return (
    <div className="company-all-jobs-container">
      {token && (
        <div className="company-all-jobs">
          {companyJobs.map((job) => (
            <JobCard job={job} key={job.id} />
          ))}
        </div>
      )}
      {!token && <Redirect to="/login" />}
    </div>
  );
}

export default CompanyDetail;
