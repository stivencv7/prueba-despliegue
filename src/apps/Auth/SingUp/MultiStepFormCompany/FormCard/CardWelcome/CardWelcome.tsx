import { useEffect, useRef } from "react";
import { createUserInfoState } from "../../state";
import { useRecoilState } from "recoil";
import DocumentCompany from "@/assets/Icon/DocumentCompany";
import CustomButton from "@/apps/Shared/CustomButton/CustomButton";

const CardWelcome = ({ onActionTriggered }: { onActionTriggered?: any }) => {
  const [userPayload, setUserPayload] = useRecoilState(createUserInfoState);

  const button = useRef<any>(null);

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
          // setShowModal(true);
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
          // setIsLoading(true);

          setTimeout(() => {
            onSubmit();
            // setIsLoading(false);
            // setShowModal(true);
          }, 3000);
        }
      );
    }
  }, [button]);

  return (
    <div className="w-full h-full flex flex-col p-4 justify-center items-center rounded-[32px] relative z-40 bg-[--background-dark-blue] shadow-lg ">
      <div className="flex flex-col  justify-between items-center z-30">
        <h2 className="text-lg font-bold text-[--text-body] mb-2">
          Get your Company´s Document ready
        </h2>
        <p className="text-base font-normal text-[--text-body] mb-9 w-[300px] text-center">
          Make sure it´s your official document (NIF, RUT or TAX ID)
        </p>

        <CustomButton
          className="w-[250px] h-[40px] flex justify-center items-center gap-x-2  bg-[--yellow] disabled:bg-[--yellow-disabled] rounded-[60px] text-base font-bold leading-[20.8px] text-[#14181F]"
          onclick={onSubmit}
        >
          continue
        </CustomButton>
      </div>

      <DocumentCompany className="absolute w-[490px] h-[296px] opacity-[30%]" />
    </div>
  );
};

export default CardWelcome;
