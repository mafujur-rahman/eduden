"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiBriefcase, BiCalendar, BiMapPin, BiPencil } from "react-icons/bi";
import { CiLock } from "react-icons/ci";
import { FaDollarSign } from "react-icons/fa";
import { LuBuilding2 } from "react-icons/lu";
import { BsTrash2 } from "react-icons/bs";
import TooltipBtn from "@/components/utilities/TooltipBtn";

const PlacementCmp = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [salaryFilter, setSalaryFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [dateSort, setDateSort] = useState(""); // "latest" or "oldest"

  const API_URL = "https://api.eduden.io/api/job-opening/";

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(API_URL);
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (err) {
        setError("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Apply filters
  useEffect(() => {
    let tempJobs = [...jobs];

    if (salaryFilter) {
      tempJobs = tempJobs.filter((job) => job.salary >= Number(salaryFilter));
    }

    if (jobTypeFilter) {
      tempJobs = tempJobs.filter(
        (job) => job.job_type.toLowerCase() === jobTypeFilter.toLowerCase()
      );
    }

    if (dateSort === "latest") {
      tempJobs.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
    } else if (dateSort === "oldest") {
      tempJobs.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    }

    setFilteredJobs(tempJobs);
  }, [salaryFilter, jobTypeFilter, dateSort, jobs]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p>{error}</p>;

  const onEdit = (job) => console.log("Edit", job);
  const onDelete = (job) => console.log("Delete", job);

  return (
    <div>
      <div className="edn__hero__container">
        <h2 className="edn__title text-black">Your Placement</h2>
      </div>

      <div className="edn__lr__space edn__space__top">
        <div>
          <TooltipBtn
            className="max-w-4xl"
            btnText="Job Search"
            title="Explore Jobs Effectively"
            para="Filter job listings by deadline, salary, and job type to find the most relevant opportunities.  
Click 'View Job' to see full details and apply directly.  
Stay updated with the latest openings to secure your ideal placement quickly!"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4  mt-6 mb-10 text-white">
          <input
            type="number"
            placeholder="Min Salary"
            className="p-2 rounded bg-[#222] text-white"
            value={salaryFilter}
            onChange={(e) => setSalaryFilter(e.target.value)}
          />

          <select
            className="p-2 rounded bg-[#222] text-white"
            value={jobTypeFilter}
            onChange={(e) => setJobTypeFilter(e.target.value)}
          >
            <option value="">All Job Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>

          <select
            className="p-2 rounded bg-[#222] text-white"
            value={dateSort}
            onChange={(e) => setDateSort(e.target.value)}
          >
            <option value="">Sort by Deadline</option>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {filteredJobs.length === 0 && (
            <p className="text-white">No jobs available</p>
          )}

          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-[#111] rounded-xl p-5 hover:shadow-lg  group border border-transparent hover:border-[#ffd300] transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1 text-white/80">
                  <h3 className="text-2xl lg:text-xl 2xl:text-2xl font-semibold mb-1 flex items-center gap-x-2">
                    <BiBriefcase className="w-5 h-5" /> {job.job_title}
                  </h3>
                  <p className="flex items-start gap-x-2 text-sm mb-1">
                    <LuBuilding2 className="w-4 h-4" /> At {job.company_name}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5 items-start text-sm text-white/60">
                <div>
                  <p className="flex items-start gap-2 mb-1">
                    <BiMapPin className="w-4 h-4" /> {job.address}
                  </p>
                  <p className="flex items-start gap-2">
                    <BiCalendar className="w-4 h-4" />{" "}
                    {new Date(job.deadline).toLocaleDateString()}
                  </p>
                </div>

                <div className="mt-2 sm:mt-0  flex justify-end">
                  <div>
                    <p className="flex items-start gap-x-2  mb-1">
                      <CiLock className="w-4 h-4" /> {job.job_type}
                    </p>
                    <p className="flex items-start gap-x-2 ">
                      <FaDollarSign className="w-4 h-4" /> {job.salary}
                    </p>
                  </div>
                </div>
              </div>

              <a
                href={job.job_link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-block text-white/55 group-hover:text-white text-sm font-semibold underline-offset-4 hover:underline"
              >
                View Job →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlacementCmp;
