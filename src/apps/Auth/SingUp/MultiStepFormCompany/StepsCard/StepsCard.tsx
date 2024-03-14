import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface StepsCardProps {
  circle?: any;
  currentStep?: any;
  setCurrentStep?: (value: number) => void;
  width?: any;
  setOpen?: (value: boolean) => void;
  onActionTriggered?: any;
}

const StepsCard = ({
  circle,
  currentStep,
  setCurrentStep,
  width,
  setOpen,
  onActionTriggered,
}: StepsCardProps) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (circle[currentStep]?.id - 1 === currentStep && !isOpen) {
      setIsOpen(true);
    }
  }, [currentStep]);

  const onNext = (current: number) => {
    // if (circle[currentStep]?.id - 1 === 2) {
    onActionTriggered("step", current);
    setIsOpen(!isOpen);
    return;
    // }
  };

  console.log(circle[currentStep]?.id);

  let length = circle[currentStep]?.id - 1;

  console.log(length);

  const menos = currentStep === 1 ? 10 : 20;

  const height = isOpen && width > 30 ? width - menos : width;

  return (
    <motion.div
      className="w-full lg:w-[40%] h-full flex flex-col justify-center items-center  rounded-[32px] p-4 shadow-lg sm:p-6 lg:p-8 bg-[--background-dark-blue]"
      initial={{ x: "30%" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 40, duration: 0.5 }}
    >
      <p className="text-left text-lg text-[--text-body] w-full mb-8">
        Vank´s account creation : <span className="font-bold">Individual</span>
      </p>
      <ul
        className={`flex flex-col h-full items-center  left-0 relative before:absolute before:bg-[--light-grey] before:left-[7%] 2xl:before:left-[6%] before:top-0 before:transform before:translate-x-[10%] before:rounded-[5px] before:h-full before:w-[3px] before:z-[1px] before:transition-all before:duration-300 before:ease-in after:absolute after:bg-[--background-dark-blue] ${
          length === 4
            ? "after:w-[7px] after:h-[30%] after:left-[6%] 2xl:after:left-[6%] after:bottom-0 transition-all duration-1000"
            : "after:w-[7px] after:h-[10%] after:left-[6%] 2xl:after:left-[6%] after:bottom-0 transition-all duration-1000"
        }`}
      >
        <div
          className="absolute left-[7%] 2xl:left-[6%] top-0 bg-[--yellow] transform translate-x-[10%] rounded-[5px] h-[50%] w-[4px] z-[1px] transition-all duration-300 ease-in"
          // style={{ height: width + "%" }}
          style={{
            height:
              length === 4
                ? height - 12 + "%"
                : length === 2
                ? height + 11 + "%"
                : height + "%",
          }}
        />
        {circle?.map((item: any, index: any) => (
          <li
            className={`flex flex-col justify-between w-full overflow-hidden  ${
              index === item - 1 ? "mb-0" : "gap-2 2xl:gap-3"
            }`}
            key={index}
          >
            {/* {index === circle.length - 1 ? 's' : 'e'} */}
            <div
              className="flex  items-center gap-4 cursor-pointer "
              onClick={() => onNext(item.id - 1)}
            >
              <div
                className={`bg-[--background-dark-blue] text-[--text-body] rounded-[50%] h-[50px] w-[50px] p-[11px] z-20 flex justify-center items-center border-[2px] ${
                  item.id - 1 <= currentStep
                    ? "border-[--yellow]"
                    : "border-[--light-grey]"
                } transition-all duration-200`}
              >
                {item?.icon}
              </div>
              <span className="text-[--text-body] cursor-pointer text-base font-bold">
                {item.label}
              </span>
            </div>
            <p
              className={`text-[--text-body] text-base font-normal ml-16  transition-all duration-500 ${
                item.id - 1 === currentStep ? "h-20 -mt-4" : " h-0"
              }`}
            >
              {item.description}{" "}
            </p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default StepsCard;
