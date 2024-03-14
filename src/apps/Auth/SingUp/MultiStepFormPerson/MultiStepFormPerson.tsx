import { useEffect, useState } from "react";
import Header from "../../Header/Header";
import { useNavigate } from "react-router-dom";
import Identity from "../../../../assets/Icon/Identity";
import User from "../../../../assets/Icon/User";
import Residence from "../../../../assets/Icon/Residence";
import { useTranslation } from "react-i18next";
import { Action } from ".";
import StepsCard from "./StepsCard/StepsCard";
import CreateFormStepper from "./CreateFormStepper";
import FormCreateIdentity from "./FormCard/FormCreateIdentity/FormCreateIdentity";
import FormCreateInfo from "./FormCard/FormCreateInfo/FormCreateInfo";
import FormCreateInfoResidence from "./FormCard/FormCreateInfoResidence/FormCreateInfoResidence";
import FormCreatePassword from "./FormCard/FormCreatePassword/FormCreatePassword";
import { createUserInfoState } from "./state";
import { useRecoilState } from "recoil";
import Lock from "@/assets/Icon/Lock";
import Close from "@/assets/Icon/Close";
import { CountryRepository } from "@/Context/Country/domain/domain";
import { useService } from "@redtea/react-inversify";

const MultiStepFormPerson = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [verificatioId, setVerificatioId] = useState("");
  const [userPayload, setUserPayload] = useRecoilState(createUserInfoState);

  const country = useService<CountryRepository>("Country");

  const navigate = useNavigate();

  const [circle, setCircle] = useState([
    {
      id: 1,
      label: "Document Verification",
      description:
        "On this Step, you will have  to choose a verification method, you can scan a QR Code or click the verification Link. ",
      icon: <Identity color="#FFED00" />,
    },
    {
      id: 2,
      label: "Personal Information",
      description:
        "We would love to learn more about you, please provide us the following information.",
      icon: <User color="#FFED00" />,
    },
    {
      id: 3,
      label: "Address Information",
      description:
        "To improve our understanding of your location, please provide your current residential Address.",
      icon: <Residence color="#FFED00" />,
    },
    {
      id: 4,
      label: "Set Password",
      description:
        "When setting a new password, please ensure it meets the minimum criteria for security purposes. Thank you.",
      icon: <Lock color="#FFED00" />,
    },
  ]);

  const [currentStep, setCurrentStep] = useState(0);
  const [width, setWidth] = useState(0);

  const [t, i18n] = useTranslation("global");
  const [showModal, setShowModal] = useState(false);

  // steps
  useEffect(() => {
    setWidth((100 / (circle.length - 1)) * currentStep);
  }, [circle, currentStep]);

  const formatCountryForList = (items: any) => {
    if (!items && !items.length) {
      return [];
    }
    return items?.map((ite?: any) => ({
      name: ite?.country_name ?? "",
    }));
  };

  const getCountryToken = async () => {
    try {
      const remoteCountry = await country.findCountry();
      const format = formatCountryForList(remoteCountry);
      setUserPayload((currentPayload?: any) => {
        const updatedBenefitPayload = {
          ...currentPayload,
          dataCountry: format,
        };
        return updatedBenefitPayload;
      });
      return format;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCountryToken();
  }, []);

  useEffect(() => {
    let timer: any;
    if (showModal) {
      timer = setTimeout(() => {
        setShowModal(false);
      }, 3000); // Oculta la modal después de 3 segundos
    }

    return () => clearTimeout(timer); // Limpia el temporizador al desmontar el componente
  }, [showModal]);

  const navigateToStep = (stepNumber: number) => setCurrentStep(stepNumber);

  const completeBenefitCreation = async (data: any) => {
    console.log(data);
  };

  const handleModalStatus = (modal: any) => {
    navigate("/Auth");
    // const actions = {
    //   cancel: () => setIsCancelModalOpened(!isCancelModalOpened),
    //   complete: () => setIsCompletedModalOpened(!isCompleteModalOpened),
    // };
    // return actions[modal]();
  };

  const handleNext = () => {
    setCurrentStep((current) => current + 1);
  };

  const handleActionTriggered = (
    action: Action,
    stepNumber?: number,
    data?: any
  ) => {
    // Objeto 'actions' que mapea cada acción a una función correspondiente
    const actions: any = {
      next: () => handleNext(), // Si la acción es 'next', incrementa el paso actual
      previous: () =>
        setCurrentStep((current) => (current < 1 ? 0 : current - 1)), // Si la acción es 'previous', decrementa el paso actual si es mayor que 0
      cancel: () => handleModalStatus("cancel"), // Si la acción es 'cancel', llama a la función 'handleModalStatus' con 'cancel'
      complete: () => data && completeBenefitCreation(data), // Si la acción es 'complete' y se proporcionan datos, llama a la función 'completeBenefitCreation' con esos datos
      step: () => stepNumber && navigateToStep(stepNumber), // Si la acción es 'step' y se proporciona un número de paso, navega a ese paso
    };

    // Invoca la función correspondiente a la acción proporcionada y devuelve su resultado
    return actions[action]();
  };

  return (
    <div className="mx-auto w-full min-h-screen flex flex-col justify-center items-center  px-4  sm:px-6 lg:px-8 bg-[--background-dark-blue] overflow-hidden relative ">
      <Header />
      {/* <div className="h-[630px] w-full flex justify-center items-center mt-10 bg-red-600"> */}
      <div className="flex flex-col w-[90%] h-[510px] 2xl:h-[590px] 2xl:max-w-screen-xl justify-between rounded-[32px]  bg-[--background-soft-blue] items-center mt-14 scale-90">
        {/* <span
            role="progressbar"
            aria-labelledby="ProgressLabel"
            aria-valuenow="75"
            className="w-full block rounded-t-[32px] bg-[#3E4347]"
          >
            <span
              className="block h-1 rounded-full bg-[#FFED00] transition-all ease-in"
              style={{ width: Math.round(width) + "%" }}
            ></span>
          </span> */}
        <div className="lg:flex md:flex-grow gap-12 w-full h-full justify-center items-center p-2 scale-95">
          <StepsCard
            circle={circle}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            width={width}
            setOpen={setIsOpen}
            onActionTriggered={(
              action: Action,
              stepNumber?: number,
              data?: any
            ) => handleActionTriggered(action, stepNumber, data)}
          />
          <CreateFormStepper
            step={currentStep}
            className="lg:w-[60%] h-full flex justify-center items-center"
          >
            <FormCreateIdentity
              onActionTriggered={(
                action: Action,
                stepNumber?: number,
                data?: any
              ) => handleActionTriggered(action, stepNumber, data)}
              setShowModal={setShowModal}
              setVerificatioId={setVerificatioId}
            />
            <FormCreateInfo
              onActionTriggered={(
                action: Action,
                stepNumber?: number,
                data?: any
              ) => handleActionTriggered(action, stepNumber, data)}
            />

            <FormCreateInfoResidence
              onActionTriggered={(
                action: Action,
                stepNumber?: number,
                data?: any
              ) => handleActionTriggered(action, stepNumber, data)}
            />
            <FormCreatePassword
              onActionTriggered={(
                action: Action,
                stepNumber?: number,
                data?: any
              ) => handleActionTriggered(action, stepNumber, data)}
            />
          </CreateFormStepper>
        </div>
      </div>
      {/* </div> */}
      <div
        className={`absolute -right-3 top-[65px] transition-all duration-300 z-50 ${
          showModal ? "translate-x-0" : "translate-x-[200%]"
        } `}
      >
        <div className="relative w-[530px] px-3 pr-10 py-3 mx-auto dark:bg-[--background-dark-blue] bg-[--text-body] rounded-[16px] shadow-lg z-50 border-2 border-[--background-soft-blue]">
          <div className="flex justify-between items-center gap-4 text-center sm:ml-4 sm:text-left">
            <div className="">
              <h4 className="text-base font-bold text-[--text-body]">
                Document Verification Succesfull
              </h4>
              <p className="mt-1 text-sm text-[--text-body] max-w-[356px]">
                Good news! Your document has been successfully verified. Now,
                let's move on to complete your Sign Up process.
              </p>
            </div>
            <Close
              className="w-[14px] h-[14px] cursor-pointer"
              onClick={() => {
                setShowModal(false);
              }}
            />
          </div>
        </div>
      </div>
      {/* <div
        className={`absolute left-3 top-3 transition-all duration-300 z-50 ${
          !showModal ? "translate-y-0" : "-translate-y-[200%]"
        } `}
      >
        <div className="relative w-full max-w-lg p-4 mx-auto dark:bg-[#13171d] bg-white rounded-md shadow-lg z-50">
          <div className="mt-3 sm:flex">
            <div className="flex items-center justify-center flex-none w-12 h-12 p-3 mx-auto bg-[#191E25] rounded-full">
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g
                    fill="none"
                    stroke="#00993b"
                    stroke-linecap="round"
                    stroke-width="2"
                  >
                    {" "}
                    <path d="M8.5 14.5h7.657"></path>{" "}
                    <path d="M8.5 10.5h7.657"></path>{" "}
                    <path d="M8.5 6.5h7.657"></path>{" "}
                    <path d="M5.5 14.5h0"></path> <path d="M5.5 10.5h0"></path>{" "}
                    <path d="M5.5 6.5h0"></path>{" "}
                  </g>{" "}
                  <path
                    fill="none"
                    stroke="#00993b"
                    stroke-linecap="round"
                    stroke-width="2"
                    d="M9.128 20.197H3.444a2.22 2.22 0 01-2.229-2.153V3.152A2.153 2.153 0 013.367.997h15.48A2.153 2.153 0 0121 3.152v8.738"
                  ></path>{" "}
                  <path
                    fill="#00993b"
                    d="M16.5 23.499a1.464 1.464 0 01-1.094-.484l-2.963-2.969A1.479 1.479 0 0112 18.985a1.5 1.5 0 01.462-1.078 1.56 1.56 0 012.113.037l1.925 1.931 4.943-4.959a1.543 1.543 0 012.132.02 1.461 1.461 0 01.425 1.04 1.5 1.5 0 01-.45 1.068l-5.993 6.012a1.44 1.44 0 01-1.057.443z"
                  ></path>{" "}
                </g>
              </svg>
            </div>
            <div className="mt-3 text-center sm:ml-4 sm:text-left">
              <h4 className="text-xl font-bold text-white">
                ¡Documento verificado con éxito!
              </h4>
              <p className="mt-2 text-[17px] text-[#EFF0F1]">
                Esta validación nos permitió recopilar información adicional
                para agilizar los próximos pasos y brindar una mejor experiencia
                al usuario. ¡Gracias por tu colaboración!
              </p>
              <div className="items-center gap-2 mt-3 sm:flex justify-end">
                <button
                  className="min-w-32 p-2.5  text-white rounded-md outline-none border "
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MultiStepFormPerson;
