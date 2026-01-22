"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Building2, MapPin, Briefcase, Filter } from "lucide-react";

// Job listings data structure
const jobListings = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    company: "TechInnovate Solutions",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$140,000 - $180,000",
    experience: "5+ years",
    description: "We're looking for a senior full-stack developer to lead our platform development team. You'll work with modern technologies including React, Node.js, and cloud infrastructure.",
    requirements: ["React/Next.js", "Node.js", "TypeScript", "AWS/Azure", "MongoDB/PostgreSQL"],
    postedDate: "2024-01-15",
    remote: true,
    logo: "/company-logos/techinnovate.png"
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "CreativeMind Studios",
    location: "Remote",
    type: "Contract",
    salary: "$90,000 - $120,000",
    experience: "3+ years",
    description: "Join our design team to create beautiful, intuitive user interfaces for enterprise applications. Strong portfolio required.",
    requirements: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping", "Design Systems"],
    postedDate: "2024-01-14",
    remote: true,
    logo: "/company-logos/creativemind.png"
  },
  {
    id: 3,
    title: "DevOps Engineer",
    company: "CloudScale Inc",
    location: "New York, NY",
    type: "Full-time",
    salary: "$130,000 - $160,000",
    experience: "4+ years",
    description: "Manage and scale our cloud infrastructure across multiple platforms. Implement CI/CD pipelines and ensure system reliability.",
    requirements: ["Docker/Kubernetes", "AWS/GCP", "Terraform", "Linux", "Python/Bash"],
    postedDate: "2024-01-13",
    remote: false,
    logo: "/company-logos/cloudscale.png"
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "DataInsight Analytics",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    experience: "3+ years",
    description: "Work with large datasets to derive insights and build predictive models. Collaborate with product and engineering teams.",
    requirements: ["Python/R", "Machine Learning", "SQL", "Statistics", "TensorFlow/PyTorch"],
    postedDate: "2024-01-12",
    remote: true,
    logo: "/company-logos/datainsight.png"
  },
  {
    id: 5,
    title: "Frontend Developer",
    company: "WebFlow Technologies",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110,000 - $140,000",
    experience: "2+ years",
    description: "Build responsive, accessible web applications using modern frontend technologies. Focus on performance and user experience.",
    requirements: ["React", "TypeScript", "CSS/SCSS", "Next.js", "Testing"],
    postedDate: "2024-01-11",
    remote: true,
    logo: "/company-logos/webflow.png"
  },
  {
    id: 6,
    title: "Backend Engineer",
    company: "ServerStack Solutions",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$125,000 - $155,000",
    experience: "4+ years",
    description: "Design and implement scalable backend systems and APIs. Work with microservices architecture and cloud platforms.",
    requirements: ["Java/Spring", "Python/Django", "REST APIs", "Microservices", "Database Design"],
    postedDate: "2024-01-10",
    remote: false,
    logo: "/company-logos/serverstack.png"
  },
  {
    id: 7,
    title: "Product Manager",
    company: "ProductVision Corp",
    location: "Remote",
    type: "Full-time",
    salary: "$135,000 - $170,000",
    experience: "5+ years",
    description: "Lead product strategy and roadmap. Work with cross-functional teams to deliver customer-focused solutions.",
    requirements: ["Product Strategy", "Agile/Scrum", "Market Research", "Data Analysis", "Stakeholder Management"],
    postedDate: "2024-01-09",
    remote: true,
    logo: "/company-logos/productvision.png"
  },
  {
    id: 8,
    title: "QA Automation Engineer",
    company: "QualityFirst Testing",
    location: "Chicago, IL",
    type: "Contract",
    salary: "$95,000 - $115,000",
    experience: "3+ years",
    description: "Develop and maintain automated test frameworks. Ensure product quality across web and mobile platforms.",
    requirements: ["Selenium/Cypress", "Java/Python", "Test Automation", "CI/CD", "API Testing"],
    postedDate: "2024-01-08",
    remote: true,
    logo: "/company-logos/qualityfirst.png"
  },
];

export default function PlacementCmp() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedExperience, setSelectedExperience] = useState("All");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Filter jobs based on search criteria
  const filteredJobs = useMemo(() => {
    return jobListings.filter(job => {
      const matchesSearch = searchQuery === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = selectedType === "All" || job.type === selectedType;
      const matchesRemote = !remoteOnly || job.remote;

      // Experience level matching logic
      let matchesExperience = true;
      if (selectedExperience !== "All") {
        const expYears = parseInt(job.experience);
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

      return matchesSearch && matchesType && matchesRemote && matchesExperience;
    });
  }, [searchQuery, selectedType, selectedExperience, remoteOnly]);

  // Select first job by default
  useEffect(() => {
    if (filteredJobs.length > 0 && !selectedJob) {
      setSelectedJob(filteredJobs[0]);
    }
  }, [filteredJobs, selectedJob]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12 md:py-16 lg:py-20">
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
                  className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-2">
              <select
                className="px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base flex-1 min-w-[140px]"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
              </select>

              <select
                className="px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 text-black focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base flex-1 min-w-[140px]"
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
                  ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              onClick={() => setRemoteOnly(!remoteOnly)}
            >
              <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
              Remote Only
            </button>
            <span className="text-xs sm:text-sm text-gray-500">
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
                      ? "border-yellow-500 bg-yellow-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-base sm:text-lg truncate">
                            {job.title}
                          </h3>
                          <p className="text-gray-700 font-medium text-sm sm:text-base truncate">{job.company}</p>
                        </div>
                        <span className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium self-start ${job.type === "Full-time"
                            ? "bg-green-100 text-green-800"
                            : "bg-purple-100 text-purple-800"
                          }`}>
                          {job.type}
                        </span>
                      </div>

                      <div className="mt-3 sm:mt-4 flex flex-wrap gap-2 sm:gap-3">
                        <span className="flex items-center gap-1 text-gray-600 text-xs sm:text-sm">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                          <span className="truncate">{job.location}</span>
                        </span>
                        <span className="flex items-center gap-1 text-gray-600 text-xs sm:text-sm">
                          <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                          {job.experience}
                        </span>
                        {job.remote && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                            Remote
                          </span>
                        )}
                      </div>

                      <div className="mt-2 sm:mt-3">
                        <p className="text-gray-600 line-clamp-2 text-sm sm:text-base">
                          {job.description}
                        </p>
                      </div>

                      <div className="mt-3 sm:mt-4">
                        <p className="text-sm font-medium text-gray-900">
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
                  <div className="text-gray-400 mb-3 sm:mb-4">
                    <Search className="h-8 w-8 sm:h-12 sm:w-12 mx-auto" />
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2">
                    No jobs found
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Try adjusting your search filters or browse all positions
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Job Details */}
          <div className="lg:w-3/5">
            {selectedJob ? (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col h-full">
                {/* Header with yellow gradient */}
                <div className="bg-gradient-to-r from-[#fab80A] via-[#fcc405] to-[#fecf01] p-4 sm:p-6 md:p-8 text-gray-900">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 truncate">{selectedJob.title}</h2>
                      <p className="text-lg sm:text-xl font-medium truncate">{selectedJob.company}</p>
                    </div>
                    <button className="bg-white text-gray-900 hover:bg-gray-100 px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold transition-colors border border-gray-300 shadow-sm text-sm sm:text-base w-full sm:w-auto">
                      Apply Now
                    </button>
                  </div>
                </div>

                {/* Job Details - Scrollable content */}
                <div className="p-4 sm:p-6 md:p-8 flex-1 overflow-y-auto">
                  {/* Quick Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Location</p>
                      <p className="font-medium flex flex-wrap items-center gap-1 sm:gap-2 text-black text-sm sm:text-base">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                        {selectedJob.location}
                        {selectedJob.remote && (
                          <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">
                            Remote Available
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Salary Range</p>
                      <p className="font-medium text-black text-sm sm:text-base">{selectedJob.salary}</p>
                    </div>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Experience Required</p>
                      <p className="font-medium text-black text-sm sm:text-base">{selectedJob.experience}</p>
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Job Description</h3>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        {selectedJob.description}
                      </p>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Requirements</h3>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {selectedJob.requirements.map((req, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 sm:px-4 sm:py-2 bg-yellow-100 text-yellow-800 rounded-full font-medium text-xs sm:text-sm"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Job Details */}
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-base sm:text-lg">Job Type</h4>
                      <p className="text-gray-700 text-sm sm:text-base">{selectedJob.type}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-base sm:text-lg">Posted Date</h4>
                      <p className="text-gray-700 text-sm sm:text-base">
                        {new Date(selectedJob.postedDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
                    <button className="w-full bg-gradient-to-r from-[#fab80A] via-[#fcc405] to-[#fecf01] hover:from-[#f8b009] hover:via-[#fbc205] hover:to-[#fdce01] text-gray-900 font-semibold py-3 sm:py-4 px-6 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg border border-yellow-300 text-sm sm:text-base">
                      Apply for This Position
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8 md:p-12 text-center h-full flex flex-col justify-center">
                <div className="text-gray-400 mb-4 sm:mb-6">
                  <Briefcase className="h-12 w-12 sm:h-16 sm:w-16 mx-auto" />
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2 sm:mb-3">
                  Select a job to view details
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
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