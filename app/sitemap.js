export default function sitemap() {
  const baseUrl = "https://www.eduden.io";

  //  Static pages
  const staticPages = [
    "",
    "/about",
    "/courses",
    "/whats-new",
    "faculty-member",
    "/verify",
    "/contact",
  ];

  //  Dynamically generate 51 course URLs
  const courseUrls = Array.from({ length: 51 }, (_, index) => ({
    url: `${baseUrl}/courses/${index + 1}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  //  Faculty member URLs
  const facultyMembers = [
    "fardeen-ahmed",
    "nazmul-islam",
    "yathish",
    "khokon-halder",
    "partho-halder",
    "md-shakil",
    "ayoushi-gupta",
    "joy-sutradhor",
  ];

  const facultyUrls = facultyMembers.map((slug) => ({
    url: `${baseUrl}/faculty-member/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.64,
  }));

  console.log(`✅ Generated ${courseUrls.length} course URLs`);
  console.log(`✅ Generated ${facultyUrls.length} faculty URLs`);

  // 🏠 Combine all
  const allUrls = [
    ...staticPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "daily" : "weekly",
      priority: path === "" ? 1.0 : 0.8,
    })),
    ...courseUrls,
    ...facultyUrls,
  ];

  console.log(`✅ Total URLs in sitemap: ${allUrls.length}`);
  return allUrls;
}
