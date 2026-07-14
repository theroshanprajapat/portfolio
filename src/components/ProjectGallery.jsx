import { useState, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import ImageViewer from "./ImageViewer";

export default function ProjectGallery({ images = [], title = "project" }) {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [viewerIndex, setViewerIndex] = useState(null);

  const isOpen = viewerIndex !== null;

  const updateScrollState = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  const scroll = (direction) => {
    const el = carouselRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const openViewer = (i) => setViewerIndex(i);
  const closeViewer = () => setViewerIndex(null);

  const handleNavigate = useCallback(
    (direction) => {
      setViewerIndex((prev) => {
        if (typeof direction === "number") return direction;
        const total = images.length;
        return (prev + (direction === "next" ? 1 : -1) + total) % total;
      });
    },
    [images.length],
  );

  return (
    <div className="project-carousel">
      <div
        className="project-carousel-track"
        ref={carouselRef}
        onScroll={updateScrollState}
      >
        {images.map((src, i) => (
          <button
            type="button"
            key={src + i}
            className="project-carousel-slide"
            onClick={() => openViewer(i)}
            aria-label={`Open image ${i + 1} of ${title} in viewer`}
          >
            <img src={src} alt={`${title} screenshot ${i + 1}`} draggable={false} />
            <span className="iv-expand-hint" aria-hidden="true">
              <Expand size={20} />
            </span>
          </button>
        ))}
      </div>

      {canScrollLeft && (
        <button
          type="button"
          className="carousel-btn carousel-btn-left"
          onClick={() => scroll("left")}
          aria-label="Scroll to previous images"
        >
          <ChevronLeft size={20} />
        </button>
      )}
      {canScrollRight && (
        <button
          type="button"
          className="carousel-btn carousel-btn-right"
          onClick={() => scroll("right")}
          aria-label="Scroll to next images"
        >
          <ChevronRight size={20} />
        </button>
      )}

      <ImageViewer
        images={images}
        index={viewerIndex ?? 0}
        isOpen={isOpen}
        onClose={closeViewer}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
