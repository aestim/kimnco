import { Link, useParams } from "react-router-dom";

const COPY = {
  ko: {
    heading: "페이지를 찾을 수 없습니다",
    body: "주소가 잘못되었거나 삭제된 페이지입니다.",
    cta: "홈으로 돌아가기",
  },
  en: {
    heading: "Page not found",
    body: "The page you are looking for does not exist or has been moved.",
    cta: "Back to home",
  },
};

const NotFound = () => {
  const { lang } = useParams();
  const currentLang = COPY[lang] ? lang : "ko";
  const copy = COPY[currentLang];

  return (
    <section className="flex min-h-dvh flex-col items-center justify-center bg-midnight-950 px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-bronze-400">
        404
      </p>
      <h1 className="mt-4 font-zentry text-4xl font-bold text-white md:text-6xl">
        {copy.heading}
      </h1>
      <p className="mt-4 max-w-md text-base text-silver-400">{copy.body}</p>
      <Link
        to={`/${currentLang}`}
        className="mt-10 inline-flex items-center justify-center rounded-full bg-bronze-500 px-10 py-4 text-sm font-bold uppercase tracking-wider text-midnight-950 transition-colors hover:bg-bronze-400"
      >
        {copy.cta}
      </Link>
    </section>
  );
};

export default NotFound;
