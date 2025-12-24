import ContactForm from "@/components/contactPage/ContactForm";
import ContactHero from "@/components/contactPage/ContactHero";
import Faq from "@/components/homepage/Faq";
import OfficeLocation from "@/components/homepage/OfficeLocation";

export const metadata = {
  title: "eduden | contact",
  description:
    "Get in touch with Eduden – Kolkata’s trusted online learning platform. Contact us for course inquiries, support, or any questions about our expert-led programs and certifications.",
};

function Contact() {
  return (
    <section>
      <div className="edn__hero__container">
        <h2 className="edn__title text-black">Contact Us</h2>
      </div>
      <div className="edn__space__top edn__lr__space">
        <ContactForm />
      </div>
      <OfficeLocation />
      <Faq />
    </section>
  );
}

export default Contact;
