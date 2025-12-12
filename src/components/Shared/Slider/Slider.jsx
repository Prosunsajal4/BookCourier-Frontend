import { useEffect, useState } from "react";

const Slider = ({ slides = [], interval = 4000 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, interval);
    return () => clearInterval(id);
  }, [slides.length, interval]);

  if (!slides.length) return null;

  return (
    <div className="relative w-full h-[360px] md:h-[500px] overflow-hidden rounded-xl shadow-lg">
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {s.image ? (
            <img
              src={s.image}
              alt={s.title || `Slide ${i + 1}`}
              className="w-full h-[360px] md:h-[500px] object-cover"
            />
          ) : (
            <div
              className={`w-full h-[360px] md:h-[500px] ${
                s.bg ||
                "bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600"
              }`}
            />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/20 to-transparent" />
          {(s.title || s.subtitle) && (
            <div className="absolute left-6 right-6 bottom-8 md:left-12 md:right-12 md:bottom-12 text-white">
              {s.title && (
                <h2 className="text-2xl md:text-4xl font-bold drop-shadow">
                  {s.title}
                </h2>
              )}
              {s.subtitle && (
                <p className="mt-2 md:mt-3 text-sm md:text-base opacity-95">
                  {s.subtitle}
                </p>
              )}
              {s.cta && (
                <a
                  href={s.cta.href}
                  className="mt-4 inline-block btn btn-primary"
                >
                  {s.cta.label}
                </a>
              )}
            </div>
          )}
        </div>
      ))}

      {slides.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full ${
                i === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Slider;
