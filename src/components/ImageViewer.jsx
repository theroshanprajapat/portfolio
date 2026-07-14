import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const ZOOM_STEP = 0.5;
const DOUBLE_TAP_SCALE = 2.5;

const SWIPE_THRESHOLD = 50;
const SWIPE_MAX_VERTICAL = 90;
const SWIPE_MAX_DURATION = 600;
const TAP_MOVE_THRESHOLD = 10;

export default function ImageViewer({
  images = [],
  index = 0,
  isOpen = false,
  onClose,
  onNavigate,
}) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);

  const stageRef = useRef(null);
  const panStart = useRef({ x: 0, y: 0, posX: 0, posY: 0 });
  const pointers = useRef(new Map());
  const pinchState = useRef({
    startDistance: 0,
    startScale: 1,
    lastMidX: 0,
    lastMidY: 0,
  });
  const swipeState = useRef({
    startX: 0,
    startY: 0,
    startTime: 0,
    active: false,
  });
  const interaction = useRef({ moved: false });

  const hasMultiple = images.length > 1;
  const currentSrc = images[index];

  const clampScale = useCallback(
    (value) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, value)),
    [],
  );

  const clampPosition = useCallback(
    (pos) => {
      const el = stageRef.current;
      if (!el || scale <= 1) return { x: 0, y: 0 };
      const maxX = ((scale - 1) * el.clientWidth) / 2;
      const maxY = ((scale - 1) * el.clientHeight) / 2;
      return {
        x: Math.min(maxX, Math.max(-maxX, pos.x)),
        y: Math.min(maxY, Math.max(-maxY, pos.y)),
      };
    },
    [scale],
  );

  const resetZoom = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const zoomBy = useCallback(
    (delta) => {
      setScale((prev) => {
        const next = clampScale(prev + delta);
        if (next === 1) setPosition({ x: 0, y: 0 });
        return next;
      });
    },
    [clampScale],
  );

  const goTo = useCallback(
    (direction) => {
      resetZoom();
      onNavigate?.(direction);
    },
    [resetZoom, onNavigate],
  );

  useEffect(() => {
    if (!isOpen) return undefined;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (event) => {
      switch (event.key) {
        case "Escape":
          onClose?.();
          break;
        case "ArrowRight":
          if (hasMultiple) goTo("next");
          break;
        case "ArrowLeft":
          if (hasMultiple) goTo("prev");
          break;
        case "+":
        case "=":
          zoomBy(ZOOM_STEP);
          break;
        case "-":
        case "_":
          zoomBy(-ZOOM_STEP);
          break;
        case "0":
          resetZoom();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, hasMultiple, onClose, goTo, onNavigate, zoomBy, resetZoom]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    const handleWheel = (event) => {
      if (!isOpen) return;
      event.preventDefault();
      zoomBy(event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP);
    };
    stage.addEventListener("wheel", handleWheel, { passive: false });
    return () => stage.removeEventListener("wheel", handleWheel);
  }, [isOpen, zoomBy]);

  const toggleZoom = useCallback(() => {
    if (scale > 1) {
      resetZoom();
    } else {
      setScale(DOUBLE_TAP_SCALE);
    }
  }, [scale, resetZoom]);

  const getDistance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const getMidpoint = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

  const handlePointerDown = (event) => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.setPointerCapture?.(event.pointerId);
    pointers.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });

    if (pointers.current.size === 1) {
      swipeState.current = {
        startX: event.clientX,
        startY: event.clientY,
        startTime: Date.now(),
        active: true,
      };
      interaction.current.moved = false;
      if (scale > 1) {
        setIsPanning(true);
        panStart.current = {
          x: event.clientX,
          y: event.clientY,
          posX: position.x,
          posY: position.y,
        };
      }
    } else if (pointers.current.size === 2) {
      swipeState.current.active = false;
      setIsPanning(false);
      const [p1, p2] = [...pointers.current.values()];
      const mid = getMidpoint(p1, p2);
      pinchState.current = {
        startDistance: getDistance(p1, p2),
        startScale: scale,
        lastMidX: mid.x,
        lastMidY: mid.y,
      };
    }
  };

  const handlePointerMove = (event) => {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });

    if (pointers.current.size >= 2) {
      const points = [...pointers.current.values()];
      const [p1, p2] = points;
      const distance = getDistance(p1, p2);
      const { startDistance, startScale } = pinchState.current;
      if (startDistance > 0) {
        const nextScale = clampScale((startScale * distance) / startDistance);
        setScale(nextScale);
        const mid = getMidpoint(p1, p2);
        const deltaX = mid.x - pinchState.current.lastMidX;
        const deltaY = mid.y - pinchState.current.lastMidY;
        pinchState.current.lastMidX = mid.x;
        pinchState.current.lastMidY = mid.y;
        if (nextScale > 1) {
          setPosition((prev) => {
            const el = stageRef.current;
            if (!el) return prev;
            const maxX = ((nextScale - 1) * el.clientWidth) / 2;
            const maxY = ((nextScale - 1) * el.clientHeight) / 2;
            return {
              x: Math.min(maxX, Math.max(-maxX, prev.x + deltaX)),
              y: Math.min(maxY, Math.max(-maxY, prev.y + deltaY)),
            };
          });
        }
      }
      interaction.current.moved = true;
      return;
    }

    if (pointers.current.size === 1 && isPanning) {
      const deltaX = event.clientX - panStart.current.x;
      const deltaY = event.clientY - panStart.current.y;
      if (
        Math.abs(deltaX) > TAP_MOVE_THRESHOLD ||
        Math.abs(deltaY) > TAP_MOVE_THRESHOLD
      ) {
        interaction.current.moved = true;
      }
      setPosition(
        clampPosition({
          x: panStart.current.posX + deltaX,
          y: panStart.current.posY + deltaY,
        }),
      );
    }
  };

  const endPointer = (event) => {
    const stage = stageRef.current;
    if (stage?.hasPointerCapture?.(event.pointerId)) {
      stage.releasePointerCapture(event.pointerId);
    }
    pointers.current.delete(event.pointerId);

    if (pointers.current.size < 2) {
      pinchState.current.startDistance = 0;
    }

    if (pointers.current.size === 1) {
      const [remaining] = [...pointers.current.values()];
      if (scale > 1) {
        panStart.current = {
          x: remaining.x,
          y: remaining.y,
          posX: position.x,
          posY: position.y,
        };
        setIsPanning(true);
      }
      return;
    }

    if (pointers.current.size === 0) {
      if (
        scale <= 1 &&
        swipeState.current.active &&
        !interaction.current.moved
      ) {
        const deltaX = event.clientX - swipeState.current.startX;
        const deltaY = event.clientY - swipeState.current.startY;
        const duration = Date.now() - swipeState.current.startTime;
        if (
          hasMultiple &&
          Math.abs(deltaX) > SWIPE_THRESHOLD &&
          Math.abs(deltaX) > Math.abs(deltaY) &&
          Math.abs(deltaY) < SWIPE_MAX_VERTICAL &&
          duration < SWIPE_MAX_DURATION
        ) {
          goTo(deltaX < 0 ? "next" : "prev");
        }
      }
      setIsPanning(false);
      swipeState.current.active = false;
      interaction.current.moved = false;
    }
  };

  const handleStageClick = (event) => {
    if (interaction.current.moved) {
      interaction.current.moved = false;
      return;
    }
    if (event.target.closest(".iv-slide.is-active")) {
      toggleZoom();
    }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && currentSrc && (
        <motion.div
          className="image-viewer-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Project image viewer"
        >
          <button
            type="button"
            className="iv-close"
            onClick={onClose}
            aria-label="Close viewer"
          >
            <X size={22} />
          </button>

          {hasMultiple && (
            <button
              type="button"
              className="iv-nav iv-nav-left"
              onClick={(event) => {
                event.stopPropagation();
                goTo("prev");
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {hasMultiple && (
            <button
              type="button"
              className="iv-nav iv-nav-right"
              onClick={(event) => {
                event.stopPropagation();
                goTo("next");
              }}
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          )}

          <div
            className="iv-stage"
            ref={stageRef}
            onClick={handleStageClick}
            onDoubleClick={toggleZoom}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endPointer}
            onPointerCancel={endPointer}
          >
            <div
              className="iv-slider-track"
              style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
              {images.map((src, i) => (
                <div
                  className={`iv-slide ${i === index ? "is-active" : ""}`}
                  key={src + i}
                  aria-hidden={i !== index}
                >
                  <img
                    src={src}
                    alt={`Project image ${i + 1} of ${images.length}`}
                    className="iv-slide-img"
                    draggable={false}
                    style={
                      i === index
                        ? {
                            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                            cursor:
                              scale > 1
                                ? isPanning
                                  ? "grabbing"
                                  : "grab"
                                : "zoom-in",
                          }
                        : undefined
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {hasMultiple && (
            <div
              className="iv-counter"
              onClick={(event) => event.stopPropagation()}
            >
              {index + 1} <span>/ {images.length}</span>
            </div>
          )}

          <div
            className="iv-toolbar"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="iv-tool-btn"
              onClick={() => zoomBy(-ZOOM_STEP)}
              disabled={scale <= MIN_SCALE}
              aria-label="Zoom out"
            >
              <ZoomOut size={18} />
            </button>
            <span className="iv-zoom-level">{Math.round(scale * 100)}%</span>
            <button
              type="button"
              className="iv-tool-btn"
              onClick={() => zoomBy(ZOOM_STEP)}
              disabled={scale >= MAX_SCALE}
              aria-label="Zoom in"
            >
              <ZoomIn size={18} />
            </button>
            <button
              type="button"
              className="iv-tool-btn"
              onClick={resetZoom}
              aria-label="Reset zoom"
            >
              <RotateCcw size={18} />
            </button>
          </div>

          {hasMultiple && (
            <div
              className="iv-thumbs"
              onClick={(event) => event.stopPropagation()}
            >
              {images.map((src, i) => (
                <button
                  type="button"
                  key={src + i}
                  className={`iv-thumb ${i === index ? "active" : ""}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to image ${i + 1}`}
                  aria-current={i === index}
                >
                  <img src={src} alt="" loading="lazy" draggable={false} />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
