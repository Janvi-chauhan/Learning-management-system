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
              ease: "easeOut",
            }}
            whileHover={{
              y: -4,
              scale: 1.015,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="
              relative
              overflow-hidden

              rounded-[30px]

              border
              border-white/80

              bg-white/75
              backdrop-blur-2xl

              shadow-[0_10px_35px_rgba(15,23,42,0.05)]

              p-6

              transition-all
              duration-200

              group
            "
          >
            {/* Ambient Gradient Glow */}

            <div
              className={`
                absolute
                -top-10
                -right-10

                w-36
                h-36

                rounded-full
                blur-3xl
                opacity-20

                bg-gradient-to-br
                ${card.gradient}
              `}
            />

            {/* Top Section */}

            <div
              className="
                relative
                z-10
                flex
                items-start
                justify-between
              "
            >
              {/* LEFT CONTENT */}

              <div>
                {/* Label */}

                <p
                  className="
                    text-sm
                    font-medium
                    text-slate-500
                  "
                >
                  {card.title}
                </p>

                {/* VALUE */}

                <h2
                  className="
                    mt-3

                    text-4xl
                    font-bold
                    tracking-tight

                    text-slate-800
                  "
                >
                  {card.value}
                </h2>
              </div>

              {/* ICON */}

              <motion.div
                whileHover={{
                  rotate: 4,
                  scale: 1.04,
                }}
                transition={{
                  duration: 0.18,
                  ease: "easeOut",
                }}
                className={`
                  w-16
                  h-16

                  rounded-2xl

                  bg-gradient-to-br
                  ${card.gradient}

                  flex
                  items-center
                  justify-center

                  text-white

                  shadow-lg
                `}
              >
                <Icon size={28} />
              </motion.div>
            </div>

            {/* Bottom Section */}

            <div className="relative z-10 mt-8">
              {/* Stats Row */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-2
                "
              >
                <span
                  className="
                    text-xs
                    font-medium
                    text-slate-400
                  "
                >
                  Monthly Progress
                </span>

                <span
                  className="
                    text-xs
                    font-semibold
                    text-[#ff4a3d]
                  "
                >
                  +12%
                </span>
              </div>

              {/* Progress Bar */}

              <div
                className="
                  w-full
                  h-2.5

                  rounded-full
                  overflow-hidden

                  bg-slate-100
                "
              >
                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: "72%",
                  }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.05,
                  }}
                  className={`
                    h-full
                    rounded-full

                    bg-gradient-to-r
                    ${card.gradient}
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