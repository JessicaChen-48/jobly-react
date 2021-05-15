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
  const [companyName, setCompanyName] = useState("")

  useEffect(() => {
    async function getCompany() {
      const companyRes = await JoblyAPI.getCompany(handle);
      setCompanyJobs(companyRes.jobs);
      setCompanyName(companyRes.name)
    }
    getCompany();
  }, []);

  if (!companyJobs.length) return <div>Loading....</div>;

  return (
    <div>
      <h1 className="company-card-name">{companyName}</h1>
      {token && (
        <div className="all-jobs">
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
