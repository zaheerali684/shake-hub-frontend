/* eslint-disable no-unused-vars */
"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function LandingPage() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const backgrounds = ["#795548", "#E91E63", "#FFB300", "#F3E5AB", "#FFC107"];
  const descriptions = [
    "Rich and creamy chocolate flavor with a smooth texture.",
    "Fresh strawberry blended into a sweet, refreshing shake.",
    "Tropical mango shake with a vibrant fruity taste.",
    "Classic vanilla shake with smooth and milky flavor.",
    "Healthy banana shake, energy-packed and deliciously smooth.",
  ];

  const shakes = [
    { name: "Chocolate Shake", image: "/images/chocolate.png" },
    { name: "Strawberry Shake", image: "/images/strawberry.png" },
    { name: "Mango Shake", image: "/images/mango.png" },
    { name: "vanilla Shake", image: "/images/vanilla.png" },
    { name: "Banana Shake", image: "/images/banana.png" },
  ];

  const paginate = useCallback(
    (newDirection) => {
      setDirection(newDirection);
      setIndex((prev) => (prev + newDirection + shakes.length) % shakes.length);
    },
    [shakes.length]
  );

  return (
    <div className="flex flex-col min-h-screen text-white overflow-hidden">
      <div
        className="flex flex-col items-center justify-center flex-1 w-full px-4 transition-all duration-500 relative"
        style={{ backgroundColor: backgrounds[index] }}
      >
        {/* Mobile Arrows */}
        <div className="flex md:hidden w-full justify-between absolute top-1/2 transform -translate-y-1/2 px-4 z-30">
          <button
            onClick={() => paginate(-1)}
            className="bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => paginate(1)}
            className="bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Desktop Arrows */}
        <button
          onClick={() => paginate(-1)}
          className="hidden md:flex absolute left-4 lg:left-10 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full z-30 transition"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Shake Display */}
        <div className="relative w-full max-w-[900px] h-[400px] sm:h-[500px] md:h-[620px] flex items-center justify-center overflow-hidden mt-8 md:mt-0">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index}
              className="absolute w-full h-full flex flex-col items-center justify-center"
              initial={{
                x: direction > 0 ? 100 : -100,
                opacity: 0,
                rotateY: direction > 0 ? -15 : 15,
              }}
              animate={{
                x: 0,
                opacity: 1,
                rotateY: 0,
                transition: { duration: 0.45, ease: "easeOut" },
              }}
              exit={{
                x: direction > 0 ? -100 : 100,
                opacity: 0,
                rotateY: direction > 0 ? 10 : -10,
                transition: { duration: 0.35, ease: "easeInOut" },
              }}
            >
              {/* Background Text - Fixed for Mobile */}
              <h1 className="absolute text-[28px] sm:text-[45px] md:text-[70px] lg:text-[100px] font-extrabold text-black/15 uppercase tracking-widest select-none z-10 text-center leading-tight sm:leading-snug px-2">
                {shakes[index].name}
              </h1>

              {/* Shake Image */}
              <motion.img
                src={shakes[index].image}
                alt={shakes[index].name}
                className="relative z-20 w-[85%] sm:w-[75%] md:w-[65%] lg:w-[55%] object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)] cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic='none'
                onDragEnd={(e, { offset }) => {
                  if (offset.x < -70) paginate(1);
                  else if (offset.x > 70) paginate(-1);
                }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: [1, 1.05, 1], opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                whileTap={{ scale: 0.97 }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop Right Arrow */}
        <button
          onClick={() => paginate(1)}
          className="hidden md:flex absolute right-4 lg:right-10 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full z-30 transition"
        >
          <ChevronRight size={28} />
        </button>

        {/* Description */}
        <p className="mt-6 md:mt-8 max-w-2xl text-center text-white font-medium text-base sm:text-lg md:text-xl leading-relaxed px-4">
          {descriptions[index]}
        </p>

        {/* Navigation Dots */}
        <div className="flex gap-3 mt-6 md:mt-8 mb-8 md:mb-12">
          {shakes.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                i === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}