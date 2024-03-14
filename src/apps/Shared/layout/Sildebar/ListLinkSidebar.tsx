import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { IconHaus } from "../../../../assets/Icon/IconHaus";
import { IconMoneyDolar } from "../../../../assets/Icon/IconMoneyDolar";
import { IconUsers } from "../../../../assets/Icon/IconUsers";
import { IconShare } from "../../../../assets/Icon/IconShare";
import { Icon } from "../../../../assets/Icon/Icon";
import { IconLanguage } from "../../../../assets/Icon/IconLanguage";
import { IconLogout } from "../../../../assets/Icon/IconLogout";
import { IconMessageInfo } from "../../../../assets/Icon/IconMessageInfo";
import { useTranslation } from "react-i18next";

export const ListLinkSidebar = ({
  className,
  rounded,
  onMouseEnter,
  onMouseLeave,
 
}: {
  className?: any;
  rounded?: any;
  onMouseEnter?: any;
  onMouseLeave?: any;
  
}) => {
  const [t, i18n] = useTranslation("global");

  const listLinksHeader = [
    {
      id: "1",
      path: "",
      icon: <IconHaus className={' max-2xl:w-[18px] max-2xl:h-[16.66px]'}/>,
      text: t("Share.Sidebar.Home"),
      className: `${"text-[16px] max-2xl:text-[15px]"}`,
    },
    {
      id: "2",
      path: "transactions",
      icon: <IconMoneyDolar className={'max-2xl:w-[18px] max-2xl:h-[16.66px]'}/>,
      text: t("Share.Sidebar.Transaction"),
      className: `${"text-[16px] max-2xl:text-[15px]"}`,
    },
    {
      id: "3",
      path: "hola",
      icon: <IconUsers className={'max-2xl:w-[18px] max-2xl:h-[16.66px]'}/>,
      text: t("Share.Sidebar.Beneficiaries"),
      className: `${"text-[16px] max-2xl:text-[15px]"}`,
    },
    // {
    //   id: "4",
    //   path: "hola",
    //   icon: <IconShare />,
    //   text: "Share app",
    //   className: `${"text-[16px]"}`,
    // },
    // {
    //   id: "5",
    //   path: "hola",
    //   icon: <Icon />,
    //   text: t("Share.Sidebar.Accesibility"),
    //   className: `${"text-[16px]"}`,
    // },
  ];

  const listLinksFooter = [
    {
      id: 1,
      path: "",
      icon: <IconLanguage className={'max-2xl:w-[18px] max-2xl:h-[16.66px]'} />,
      className: "",
      text: t("Share.Sidebar.BtnLanguage"),
    },
    {
      id: 2,
      path: "",
      icon: <IconLogout className={'max-2xl:w-[18px] max-2xl:h-[16.66px]'} />,
      className: "",
      text: t("Share.Sidebar.BtnLogOut"),
    },
    {
      id: 3,
      path: "",
      icon: <IconMessageInfo className={'max-2xl:w-[18px] max-2xl:h-[16.66px]'}/>,
      className: `${"text-[12px]"}`,
      text: t("Share.Sidebar.Info"),
    },
  ];

  return (
    <Sidebar
      listLinksHeader={listLinksHeader}
      listLinksFooter={listLinksFooter}
      className={className}
      rounded={rounded}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};
