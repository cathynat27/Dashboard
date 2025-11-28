import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ActivityGalleryModal = ({ activity, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  
  const galleryImages = activity.galleryImages || [activity.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl max-h-[85vh] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white border-b rounded-t-lg">
                <h2 className="text-xl font-bold truncate">{activity.title}</h2>
                <button
                  onClick={onClose}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors flex-shrink-0 ml-4"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Content - scrollable */}
              <div className="overflow-y-auto flex-1 p-4">
                {/* Main Image Viewer - Reduced height */}
                <div className="mb-4">
                  <div className="relative bg-gray-100 rounded-lg overflow-hidden h-[350px] md:h-[400px] flex items-center justify-center group">
                    <motion.img
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      src={galleryImages[currentImageIndex]}
                      alt={`${activity.title} - ${currentImageIndex + 1}`}
                      className="w-full h-full object-contain"
                    />

                    {/* Navigation Arrows */}
                    {galleryImages.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>

                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </>
                    )}

                    {/* Image Counter - More visible */}
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {currentImageIndex + 1} / {galleryImages.length}
                    </div>
                  </div>
                </div>

                {/* Thumbnail Grid - Directly below image */}
                {galleryImages.length > 1 && (
                  <div className="mb-6">
                    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                      {galleryImages.map((image, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`relative rounded-lg overflow-hidden h-16 md:h-20 border-2 transition-all ${
                            currentImageIndex === idx
                              ? "border-sky-500 shadow-lg ring-2 ring-sky-300"
                              : "border-gray-300 hover:border-sky-300"
                          }`}
                        >
                          <img
                            src={image}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {currentImageIndex === idx && (
                            <div className="absolute inset-0 bg-sky-500/20 flex items-center justify-center">
                              <svg
                                className="w-5 h-5 text-sky-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Info Section - Compact */}
                <div className="bg-gray-50 p-3 rounded-lg mb-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                    <div>
                      <p className="text-gray-600">Date</p>
                      <p className="text-gray-800 font-semibold">{activity.date}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total Images</p>
                      <p className="text-gray-800 font-semibold">
                        {galleryImages.length}
                      </p>
                    </div>
                    {activity.location && (
                      <div>
                        <p className="text-gray-600">Location</p>
                        <p className="text-gray-800 font-semibold">
                          {activity.location}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {activity.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ActivityGalleryModal;