import { motion } from "framer-motion";

const DashboardCards = ({ cards }) => {
  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-6
      "
    >
      {cards.map((card, index) => {
        const Icon = card.icon;

        const isRed = card.color === "#FF0000";

        return (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.35,
              delay: index * 0.05,
            }}
            whileHover={{
              y: -5,
              scale: 1.02,
            }}
            className="
              relative
              overflow-hidden
              rounded-[5px]
              bg-white
              p-6
              shadow-lg
              shadow-gray-300
            "
          >
            {/* Top Section */}

            <div className="flex items-start justify-between">
              <div>
                <p
                  className="
                    text-sm
                    font-semibold
                    text-black
                  "
                >
                  {card.title}
                </p>

                <h2
                  className="
                    mt-3
                    text-5xl
                    font-bold
                    text-black
                  "
                >
                  {card.value}
                </h2>
              </div>

              {/* Icon */}

              <div
                className={`
                  w-16
                  h-16
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  text-white
                  shadow-md
                  ${
                    isRed
                      ? "bg-red-600"
                      : "bg-black"
                  }
                `}
              >
                <Icon size={28} />
              </div>
            </div>

            {/* Bottom */}

            <div className="mt-8">
              <div className="flex justify-between mb-2">
                <span
                  className="
                    text-xs
                    font-medium
                    text-black
                  "
                >
                  Monthly Progress
                </span>

                <span
                  className={`
                    text-xs
                    font-bold
                    ${
                      isRed
                        ? "text-red-600"
                        : "text-black"
                    }
                  `}
                >
                  +{card.progress}%
                </span>
              </div>

              {/* Progress Bar */}

              <div
                className="
                  w-full
                  h-3
                  rounded-full
                  bg-gray-200
                  overflow-hidden
                "
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${card.progress}%`,}}
                  transition={{
                    duration: 0.8,
                  }}
                  className={`
                    h-full
                    rounded-full
                    ${
                      isRed
                        ? "bg-red-600"
                        : "bg-black"
                    }
                  `}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default DashboardCards;