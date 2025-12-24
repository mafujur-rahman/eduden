export default function ThanksPage({ params }) {
  const { slug } = params;

  return (
    <div className=" flex items-center justify-center bg-black px-4 py-16 sm:px-6">
      <div className="w-full max-w-lg bg-[#111] p-8 sm:p-10 rounded-2xl border border-white/10 shadow-xl text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          🎉 Thank You!
        </h1>

        <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
          Your submission for the course{" "}
          <span className="font-semibold text-[#FFD300] break-words">
            {slug}
          </span>{" "}
          has been received successfully.
        </p>

        <p className="mt-3 text-gray-400 text-sm sm:text-base">
          Our team will contact you soon with the next steps.
        </p>

        <a
          href={`/course/${slug}`}
          className="inline-block mt-8 px-6 sm:px-8 py-3 rounded-full font-semibold text-black bg-[#FFD300] hover:bg-[#e6be00] transition text-sm sm:text-base"
        >
          Back to Course
        </a>
      </div>
    </div>
  );
}
