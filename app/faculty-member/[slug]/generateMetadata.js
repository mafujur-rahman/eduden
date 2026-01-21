// app/faculty-member/[slug]/generateMetadata.js
import { faculty } from "../../../FakeDb/faculty";

export async function generateMetadata({ params }) {
  const { slug } = params;
  const person = faculty.find((p) => p.slug === slug);
  console.log("slug", params)

  if (!person) {
    return {
      title: "Profile Not Found | eduden",
      description: "The requested faculty profile could not be found.",
    };
  }

  return {
    title: `${person.name} - ${person.title} | eduden`,
    description: person.about || `Learn more about ${person.name}.`,
  };
}
