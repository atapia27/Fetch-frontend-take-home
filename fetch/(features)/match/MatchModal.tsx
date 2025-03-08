import { useState, useEffect } from "react";
import { fetchMatch } from "@/utils/api"; // Function to call /dogs/match
import DogCard from "@/(features)/search/components/DogCard";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

interface MatchModalProps {
  onClose: () => void;
}

export default function MatchModal({ onClose }: MatchModalProps) {
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const getMatch = async () => {
      try {
        const matchedDog = await fetchMatch();
        setMatch(matchedDog);
        setShowConfetti(true); // Trigger confetti when match is found
        setTimeout(() => setShowConfetti(false), 4000); // Stop confetti after 4s
      } catch (error) {
        console.error("Failed to fetch match:", error);
      }
      setLoading(false);
    };

    getMatch();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {showConfetti && <Confetti />}

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
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
          onClick={onClose}
          className="mt-4 w-full rounded-lg bg-red-500 py-2 text-white shadow-md hover:bg-red-600"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}
