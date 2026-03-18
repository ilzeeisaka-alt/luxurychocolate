import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface LightboxProps {
  images: string[];
  index: number | null;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
  title?: string;
  description?: string;
}

const Lightbox = ({ images, index, onClose, onChangeIndex, title, description }: LightboxProps) => {
  if (index === null) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
          aria-label="Close"
        >
          <X size={32} />
        </button>

        <button
          className="absolute left-4 text-white/70 hover:text-white text-4xl font-light transition-colors z-10 select-none"
          onClick={(e) => {
            e.stopPropagation();
            onChangeIndex((index - 1 + images.length) % images.length);
          }}
          aria-label="Previous"
        >
          ‹
        </button>

        <motion.img
          key={index}
          src={images[index]}
          alt={title || ""}
          className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        />

        <button
          className="absolute right-16 text-white/70 hover:text-white text-4xl font-light transition-colors z-10 select-none"
          onClick={(e) => {
            e.stopPropagation();
            onChangeIndex((index + 1) % images.length);
          }}
          aria-label="Next"
        >
          ›
        </button>

        {(title || description) && (
          <div className="absolute bottom-6 text-center text-white">
            {title && <p className="text-lg font-semibold">{title}</p>}
            {description && <p className="text-sm text-white/60 mt-1">{description}</p>}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;
