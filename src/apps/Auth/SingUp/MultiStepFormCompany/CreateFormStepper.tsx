import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Children } from "react";

const CreateFormStepper = ({
  children,
  className,
  step = 0,
}: {
  children?: any;
  className?: string;
  step?: number;
}) => {
  const [steps, setSteps] = useState(Children.toArray(children));
  const [currentStep, setCurrentStep] = useState<number>(step);

  useEffect(() => {
    setCurrentStep(step);
  }, [step]);

  return (
    <motion.div
      className={className}
      initial={{ x: "30%" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 40, duration: 0.5 }}
    >
      {steps && steps.length > 0 ? steps[currentStep] : steps[0]}
    </motion.div>
  );
};

export default CreateFormStepper;
