import React, { useEffect, useRef, useState } from "react";
import { Rocket } from "../../../../../../assets/Icon/Rocket";
import Document from "../../../../../../assets/Icon/Document";
import { createUserInfoState } from "../../state";
import { useRecoilState } from "recoil";

const FormCreateIdentity = ({
  onActionTriggered,
  setVerificatioId,
  setShowModal,
}: {
  onActionTriggered?: any;
  setVerificatioId: (value: string) => void;
  setShowModal: (value: boolean) => void;
}) => {
  const [userPayload, setUserPayload] = useRecoilState(createUserInfoState);

  const button = useRef(null);
  const [clientid] = useState("65c6644b27717e001de90cb1");
  const [isLoading, setIsLoading] = useState(false);
  const [flowid] = useState("65c6644b27717e001de90cb0");

  const onSubmit = () => {
    onActionTriggered("step", 1);
  };

  useEffect(() => {
    if (button.current) {
      // Este evento se dispara cuando Metamap ha cargado y está listo para su uso. El detalle (detail) proporcionado probablemente contenga información sobre el estado de carga de Metamap.
      button.current.addEventListener(
        "metamap:loaded",
        ({ detail }: { detail?: any }) =>
          console.log("[METAMAP] Loaded", detail)
      );
      //   Este evento se dispara cuando el usuario ha iniciado el proceso de verificación o interacción con Metamap.
      button.current.addEventListener(
        "metamap:userStartedSdk",
        ({ detail }: { detail?: any }) =>
          console.log("[METAMAP] User started verification", detail)
      );
      //   Este evento se dispara cuando el usuario ha completado exitosamente el proceso de verificación o interacción con Metamap.
      button.current.addEventListener(
        "metamap:userFinishedSdk",
        ({ detail }: { detail?: any }) => {
          console.log("[METAMAP] User finished verification", detail);
          onSubmit();
          // console.log(detail?.verificationId);
          // handleDataId(detail);
          setShowModal(true);
          // {
          //   identityId: '65d8acf5fcd618001d032957',
          //   verificationId: '65d8acf5fcd618001d032958'
          // }
          // identity
          // console.log("Hola");
        }
      );
      //   Este evento se dispara cuando el usuario sale del proceso de verificación o interacción con Metamap sin completarlo.
      button.current.addEventListener(
        "metamap:exitedSdk",
        ({ detail }: { detail?: any }) => {
          console.log("[METAMAP] User exited verification", detail);

          // primero simulamos una peticcion al backend
          // setUserPayload((currentPayload) => {
          //   const updatedBenefitPayload = {
          //     ...currentPayload,
          //     ...Default,
          //   };
          //   return updatedBenefitPayload;
          // });
          setIsLoading(true);

          setTimeout(() => {
            onSubmit();
            setIsLoading(false);
            setShowModal(true);
          }, 3000);
        }
      );
    }
  }, [button]);

  return (
    <div className="w-full h-[430px]  flex flex-col p-4 justify-center items-center rounded-[32px] relative z-40 bg-[--background-dark-blue] shadow-lg ">
      <div className="flex flex-col justify-between items-center z-30">
        <h2 className="text-lg font-bold text-[--text-body] mb-2">
          Get your Document ready
        </h2>
        <p className="text-base font-normal text-[--text-body] mb-9">
          Make sure it´s your official document
        </p>

        <metamap-button
          ref={button}
          clientid={clientid}
          flowid={flowid}
          color="#FAE100"
          textcolor="#14181F"
          icon={Rocket}
        ></metamap-button>

        <p className="text-base font-normal text-[--text-body] mt-4">
          Get Verified through your <span className="font-bold">browser</span>
        </p>
      </div>

      <Document className="absolute w-[442px] h-[332px] opacity-[90%]" />
      {isLoading && (
        <div className="py-3 absolute h-full w-full flex justify-center items-center shadow-sm z-50 bg-[--background-soft-blue]/70">
          <div className="flex flex-row gap-2">
            <div className="w-5 h-5 rounded-full bg-[--yellow] animate-bounce [animation-delay:.7s]"></div>
            <div className="w-5 h-5 rounded-full bg-[--yellow] animate-bounce [animation-delay:.3s]"></div>
            <div className="w-5 h-5 rounded-full bg-[--yellow] animate-bounce [animation-delay:.4s]"></div>
            <div className="w-5 h-5 rounded-full bg-[--yellow] animate-bounce [animation-delay:.7s]"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormCreateIdentity;
