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
    <div className={className}>
      {steps && steps.length > 0 ? steps[currentStep] : steps[0]}
    </div>
  );
};

export default CreateFormStepper;
