import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next';
import Check2 from '../../../assets/Icon/Check2';

export const TermsAndConditions = () => {

    const [t, i18n] = useTranslation("global");
    const [termsConditions, settermsConditions] = useState(false);

    const {
        handleSubmit,
        watch,
        control,
        formState: { errors, isValid },
        setValue,
        getValues,
        clearErrors,
    } = useForm({
        // resolver: zodResolver(_schema),

        defaultValues: {
            terms: false,
        },
    });

    return (
        <div className="flex items-center gap-x-5 transition-transform duration-500 w-full h-[42px] mb-6">
            <div className="flex items-center relative cursor-pointer">
                <Controller
                    render={({ field: { onChange, value, name } }) => (
                        <div className="flex items-center relative cursor-pointer">
                            <input
                                type="checkbox"
                                onClick={() => settermsConditions(termsConditions ? false : true)}
                                name={name}
                                value={value}
                                checked={termsConditions}
                                className={`appearance-none w-[22px] h-[22px] rounded-[4px] relative bg-[--dark-gray] cursor-pointer z-20 ${getValues("terms") && "opacity-10"
                                    }`}
                                onChange={onChange}
                            />
                            {getValues("terms") && (
                                <div className="absolute w-full h-full flex justify-center items-center bg-[--dark-gray] rounded-[4px]">
                                    <Check2 className="text-[--yellow] w-[15px] h-[10px]" />
                                </div>
                            )}
                        </div>
                    )}
                    name="terms"
                    control={control}
                />
            </div>
            <p className="responsive-text text-[16px] font-normal leading-[20.8px] xl:text-[15px]">
                {t("Vank.Transaction.VankPay.Send.Resume.TermsAndConditions.textByClicking")}{" "}
                <span className=" font-bold">{t("Vank.Transaction.VankPay.Send.Resume.TermsAndConditions.TextContinue")}</span>,{" "}{t("Vank.Transaction.VankPay.Send.Resume.TermsAndConditions.TextIAgree")}{" "}
                <span className=" font-bold">{t("Vank.Transaction.VankPay.Send.Resume.TermsAndConditions.TextTerms")}</span>{" "} {t("Vank.Transaction.VankPay.Send.Resume.TermsAndConditions.And")}{" "}
                <span className="font-bold">{t("Vank.Transaction.VankPay.Send.Resume.TermsAndConditions.Conditions")}.</span>{" "}
            </p>
        </div>

    )
}
