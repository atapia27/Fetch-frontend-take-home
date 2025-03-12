import { useState, useEffect } from "react";
import { fetchMatch } from "@/utils/api"; // Function to call /dogs/match
import DogCard from "@/components/DogCard";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import Dog from "@/utils/types";
interface MatchModalProps {
  onClose: () => void;
}

export default function MatchModal({ onClose }: MatchModalProps) {
  const [match, setMatch] = useState<Dog | null>(null);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const getMatch = async () => {
      try {
        const matchedDog = await fetchMatch();

        if (matchedDog) {
          setMatch(matchedDog);
          setShowConfetti(true); // Only trigger confetti if a valid match is found
          setTimeout(() => setShowConfetti(false), 10000); // Stop confetti after 10s
        }
      } catch (error) {
        console.error("Failed to fetch match:", error);
      }
      setLoading(false);
    };

    getMatch();

    // Auto-close modal after 10 seconds with fade-out effect
    const closeTimer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(onClose, 500); // Give time for fade-out animation
    }, 10000);

    return () => clearTimeout(closeTimer);
  }, [onClose]);

  const handleClose = () => {
    setIsFadingOut(true);
    setTimeout(onClose, 500); // Delay close to allow animation
  };

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          initial={{ backdropFilter: "blur(0px)", opacity: 0 }}
          animate={{ backdropFilter: "blur(10px)", opacity: 1 }}
          exit={{ backdropFilter: "blur(0px)", opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {showConfetti && <Confetti />}

          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
          >
            <h2 className="mb-4 text-center text-xl font-semibold">
              Your Perfect Match! 🐶
            </h2>

            {loading ? (
              <p className="text-center text-gray-500">Finding your match...</p>
            ) : match ? (
              <DogCard dog={match} />
            ) : (
              <p className="text-center text-gray-500">
                No match found. Try adding more favorites!
              </p>
            )}

            <button
              onClick={handleClose}
              className="mt-4 w-full cursor-pointer rounded-lg bg-red-500 py-2 font-bold text-white shadow-md hover:bg-red-600"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
