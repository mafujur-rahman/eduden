import CourseInstruction from '@/components/contactPage/CourseInstruction'
import Technology from '@/components/homepage/Technology'
import CommonHero from '@/components/utilities/CommonHero'
import React from 'react'

export const metadata = {
  title: "eduden | about us ",
  description:
    "Join Eduden – Kolkata’s most trusted online course platform offering professional, academic, and skill-based training. Explore expert-led courses to boost your career and achieve your learning goals.",
};

function About () {
  return (
    <section>
      <CommonHero
        text='A Large Range Of Course '
        colorText='Learning Paths Home'
        src='https://ik.imagekit.io/0lnr4mwox/eduden-lattest/hero/Hero%20Banner/About-Us-Edn.webp?updatedAt=1745491221147'
      />
      <div className='edn__lr__space edn__space__top'>
        <CourseInstruction />
      </div>
      <Technology />
    </section>
  )
}

export default About
