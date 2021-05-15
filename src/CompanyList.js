import JoblyApi from "./JoblyAPI";
import React, { useContext, useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import SearchBar from "./SearchBar";
import UserContext from "./userContext";
import Loader from "./Loader";
import "./Company.css"

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { token } = useContext(UserContext);

  useEffect(() => {
    async function getCompanyList() {
      const companyList = await JoblyApi.getAllCompanies();
      setCompanies(companyList);
    }
    getCompanyList();
  }, []);

  function addSearchTerm(term) {
    setSearchTerm(term);
  }

  useEffect(() => {
    async function getCompanyList() {
      const companyList = await JoblyApi.getAllCompanies(searchTerm);
      setCompanies(companyList);
    }
    if (searchTerm) getCompanyList();
  }, [searchTerm]);

  if (!companies.length) return <div><Loader/></div>;
  return (
    <div>
      <div className="m-3">
        <h1>Companies</h1>
        <SearchBar addSearchTerm={addSearchTerm} />
        <div className="all-companies">
        {companies.map((company) => (
          <div className="col-sm-8 mt-3" key={company.handle}>
            <CompanyCard company={company} />
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default CompanyList;
