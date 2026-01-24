"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Building2, MapPin, Briefcase, Filter } from "lucide-react";

export default function PlacementCmp() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedExperience, setSelectedExperience] = useState("All");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch jobs from API
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('authToken');

      if (!token) {
        console.error("No authentication token found");
        setLoading(false);
        return;
      }

      // Build query parameters
      const params = new URLSearchParams();
      if (selectedType !== "All") params.append("job_type", selectedType);
      if (remoteOnly) params.append("remote_available", "yes");
      if (searchQuery) params.append("search", searchQuery);

      const url = `https://lmsapi.eduden.io/api/placements/${params.toString() ? `?${params.toString()}` : ''}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.data) {
        const transformedJobs = data.data.map(job => ({
          id: job.id,
          title: job.title,
          company: job.company_name,
          location: job.location,
          type: job.job_type,
          salary: job.salary,
          experience: job.experience,
          description: job.description,
          requirements: job.requirements ? job.requirements.split("\r\n").filter(r => r.trim()) : [],
          postedDate: job.posted_date,
          remote: job.remote_available === "Yes",
          deadline: job.deadline,
          sourceUrl: job.source_url
        }));

        setJobs(transformedJobs);
        if (transformedJobs.length > 0 && !selectedJob) {
          setSelectedJob(transformedJobs[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter jobs based on search criteria 
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = searchQuery === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = selectedType === "All" || job.type === selectedType;
      const matchesRemote = !remoteOnly || job.remote;

      // Experience level matching logic
      let matchesExperience = true;
      if (selectedExperience !== "All") {
        // Extract years from experience string (e.g., "3+ years" -> 3)
        const expMatch = job.experience.match(/(\d+)\+/);
        if (expMatch) {
          const expYears = parseInt(expMatch[1]);
          switch (selectedExperience) {
            case "Entry":
              matchesExperience = expYears <= 2;
              break;
            case "Mid":
              matchesExperience = expYears >= 2 && expYears <= 4;
              break;
            case "Senior":
              matchesExperience = expYears >= 5;
              break;
            default:
              matchesExperience = true;
          }
        }
      }

      return matchesSearch && matchesType && matchesRemote && matchesExperience;
    });
  }, [jobs, searchQuery, selectedType, selectedExperience, remoteOnly]);

  // Handle apply button click
  const handleApply = () => {
    if (selectedJob?.sourceUrl) {
      window.open(selectedJob.sourceUrl, '_blank');
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.reload();
  };

  // Refresh jobs
  const refreshJobs = () => {
    setLoading(true);
    fetchJobs();
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-black py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 mx-auto max-w-[1920px]">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ffd300] mx-auto"></div>
              <p className="mt-4 text-white">Loading job opportunities...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 mx-auto max-w-[1920px]">

        {/* Search and Filter Bar */}
        <div className="mb-6 sm:mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                <input
                  type="text"
                  placeholder="Search jobs by title, company, or keyword..."
                  className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border text-white border-[#ffd300] bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd300] focus:border-transparent text-sm sm:text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && refreshJobs()}
                />
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-2">
              <select
                className="px-3 sm:px-4 py-2.5 sm:py-3 border border-[#ffd300] bg-black text-white rounded-lg focus:ring-2 focus:ring-[#ffd300] focus:border-transparent text-sm sm:text-base flex-1 min-w-[140px]"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
              </select>

              <select
                className="px-3 sm:px-4 py-2.5 sm:py-3 border border-[#ffd300] bg-black text-white rounded-lg focus:ring-2 focus:ring-[#ffd300] focus:border-transparent text-sm sm:text-base flex-1 min-w-[140px]"
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
              >
                <option value="All">All Experience</option>
                <option value="Entry">Entry Level</option>
                <option value="Mid">Mid Level</option>
                <option value="Senior">Senior Level</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              className={`px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 text-sm sm:text-base ${remoteOnly
                ? "bg-[#ffd300] text-black border border-[#ffd300]"
                : "bg-black text-white border border-[#ffd300] hover:opacity-90"
                }`}
              onClick={() => setRemoteOnly(!remoteOnly)}
            >
              <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
              Remote Only
            </button>
            <span className="text-xs sm:text-sm text-gray-400">
              {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
          {/* Job List */}
          <div className="lg:w-2/5">
            <div className="space-y-3 sm:space-y-4 max-h-[600px] sm:max-h-[700px] md:max-h-[800px] overflow-y-auto pr-1 sm:pr-2">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className={`p-4 sm:p-5 md:p-6 rounded-xl border cursor-pointer transition-all duration-200 hover:shadow-lg ${selectedJob?.id === job.id
                    ? "border-[#ffd300] bg-black shadow-md"
                    : "border-[#ffd300] bg-black hover:opacity-90"
                    }`}
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 border border-[#ffd300] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-[#ffd300]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white text-base sm:text-lg truncate">
                            {job.title}
                          </h3>
                          <p className="text-[#ffd300] font-medium text-sm sm:text-base truncate">{job.company}</p>
                        </div>
                        <span className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium self-start border border-[#ffd300] ${job.type === "Full-time"
                          ? "text-green-400"
                          : "text-purple-400"
                          }`}>
                          {job.type}
                        </span>
                      </div>

                      <div className="mt-3 sm:mt-4 flex flex-wrap gap-2 sm:gap-3">
                        <span className="flex items-center gap-1 text-gray-400 text-xs sm:text-sm">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                          <span className="truncate">{job.location}</span>
                        </span>
                        <span className="flex items-center gap-1 text-gray-400 text-xs sm:text-sm">
                          <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                          {job.experience}
                        </span>
                        {job.remote && (
                          <span className="px-2 py-1 border border-[#ffd300] text-[#ffd300] text-xs font-medium rounded-full">
                            Remote
                          </span>
                        )}
                      </div>

                      <div className="mt-2 sm:mt-3">
                        <p className="text-gray-400 line-clamp-2 text-sm sm:text-base">
                          {job.description}
                        </p>
                      </div>

                      <div className="mt-3 sm:mt-4">
                        <p className="text-sm font-medium text-[#ffd300]">
                          {job.salary}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Posted {new Date(job.postedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredJobs.length === 0 && (
                <div className="text-center py-8 sm:py-12">
                  <div className="text-[#ffd300] mb-3 sm:mb-4">
                    <Search className="h-8 w-8 sm:h-12 sm:w-12 mx-auto" />
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-white mb-1 sm:mb-2">
                    No jobs found
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base">
                    Try adjusting your search filters or browse all positions
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Job Details */}
          <div className="lg:w-3/5">
            {selectedJob ? (
              <div className="bg-black rounded-2xl border border-[#ffd300] overflow-hidden flex flex-col h-full">
                {/* Header with gradient */}
                <div className="bg-gradient-to-r from-[#fab80A] via-[#fcc405] to-[#fecf01] p-4 sm:p-6 md:p-8 text-gray-900">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 truncate">{selectedJob.title}</h2>
                      <p className="text-lg sm:text-xl font-medium truncate">{selectedJob.company}</p>
                    </div>
                    <button
                      onClick={handleApply}
                      className="bg-black text-[#ffd300] hover:opacity-90 px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold transition-colors border border-[#ffd300] shadow-sm text-sm sm:text-base w-full sm:w-auto"
                      disabled={!selectedJob.sourceUrl}
                    >
                      {selectedJob.sourceUrl ? "Apply Now" : "Apply Details"}
                    </button>
                  </div>
                </div>

                {/* Job Details - Scrollable content */}
                <div className="p-4 sm:p-6 md:p-8 flex-1 overflow-y-auto">
                  {/* Quick Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="border border-[#ffd300] p-3 sm:p-4 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-400 mb-1">Location</p>
                      <p className="font-medium flex flex-wrap items-center gap-1 sm:gap-2 text-white text-sm sm:text-base">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                        {selectedJob.location}
                        {selectedJob.remote && (
                          <span className="border border-[#ffd300] text-[#ffd300] text-xs px-2 py-1 rounded-full">
                            Remote Available
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="border border-[#ffd300] p-3 sm:p-4 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-400 mb-1">Salary Range</p>
                      <p className="font-medium text-white text-sm sm:text-base">{selectedJob.salary}</p>
                    </div>
                    <div className="border border-[#ffd300] p-3 sm:p-4 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-400 mb-1">Experience Required</p>
                      <p className="font-medium text-white text-sm sm:text-base">{selectedJob.experience}</p>
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-xl font-semibold text-[#ffd300] mb-3 sm:mb-4">Job Description</h3>
                    <div className="prose max-w-none">
                      <p className="text-gray-300 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                        {selectedJob.description}
                      </p>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-xl font-semibold text-[#ffd300] mb-3 sm:mb-4">Requirements</h3>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {selectedJob.requirements.map((req, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 sm:px-4 sm:py-2 border border-[#ffd300] text-[#ffd300] rounded-full font-medium text-xs sm:text-sm"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Job Details */}
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h4 className="font-semibold text-[#ffd300] mb-1 sm:mb-2 text-base sm:text-lg">Job Type</h4>
                      <p className="text-gray-300 text-sm sm:text-base">{selectedJob.type}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#ffd300] mb-1 sm:mb-2 text-base sm:text-lg">Posted Date</h4>
                      <p className="text-gray-300 text-sm sm:text-base">
                        {new Date(selectedJob.postedDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    {selectedJob.deadline && (
                      <div>
                        <h4 className="font-semibold text-[#ffd300] mb-1 sm:mb-2 text-base sm:text-lg">Application Deadline</h4>
                        <p className="text-gray-300 text-sm sm:text-base">
                          {new Date(selectedJob.deadline).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#ffd300]">
                    <button
                      onClick={handleApply}
                      className="w-full bg-gradient-to-r from-[#fab80A] via-[#fcc405] to-[#fecf01] hover:opacity-90 text-black font-semibold py-3 sm:py-4 px-6 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg border border-[#ffd300] text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!selectedJob.sourceUrl}
                    >
                      {selectedJob.sourceUrl ? "Apply for This Position" : "Application Details"}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-black rounded-2xl border border-[#ffd300] p-6 sm:p-8 md:p-12 text-center h-full flex flex-col justify-center">
                <div className="text-[#ffd300] mb-4 sm:mb-6">
                  <Briefcase className="h-12 w-12 sm:h-16 sm:w-16 mx-auto" />
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-white mb-2 sm:mb-3">
                  Select a job to view details
                </h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  Click on any job listing from the left panel to see detailed information,
                  requirements, and application instructions.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}