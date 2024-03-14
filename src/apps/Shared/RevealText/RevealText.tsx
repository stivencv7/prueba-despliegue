import React, { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useAnimate,
  useIsPresent,
  useAnimation,
} from "framer-motion";

interface props {
  children: JSX.Element;
}

const RevealText = ({ children }: props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    mainControls.start("visible");
    slideControls.start("visible");
  }, [isInView]);

  return (
    <div className="relative overflow-hidden">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
      {/* <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: 0.5, ease: "easeIn" }}
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          background: "var(--yellow)",
          zIndex: 20,
        }}
      /> */}
    </div>
  );
};

export default RevealText;
