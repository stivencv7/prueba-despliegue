import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Root } from "./apps/Root/Root";

const router = createBrowserRouter([
  {
    path: "Auth",
    children: [
      {
        path: "",
        Component: lazy(() => import("./apps/Auth/Auth")),
      },
      {
        path: "SingUp/Otp/:modo",
        Component: lazy(() => import("./apps/Auth/SingUp/Opt/Opt")),
      },
      {
        path: "SingIn/Otp",
        Component: lazy(() => import("./apps/Auth/SingIn/Otp/Otp")),
      },
      {
        path: "MultiStepFormPerson",
        Component: lazy(
          () =>
            import("@/apps/Auth/SingUp/MultiStepFormPerson/MultiStepFormPerson")
        ),
      },
      {
        path: "MultiStepFormCompany",
        Component: lazy(
          () =>
            import(
              "@/apps/Auth/SingUp/MultiStepFormCompany/MultiStepFormCompany"
            )
        ),
      },
      {
        path: "ForgotPassword",
        Component: lazy(
          () => import("./apps/Auth/ForgotPassword/ForgotPassword")
        ),
      },
      {
        path: "forgot-password-code",
        Component: lazy(
          () =>
            import(
              "./apps/Auth/ForgotPassword/PassResetVerifier/PassResetVerifier"
            )
        ),
      },
      {
        path: "forgot-password-reset",
        Component: lazy(
          () => import("./apps/Auth/ForgotPassword/NewPassword/NewPassword")
        ),
      },
    ],
  },
  {
    element: <Root />,
    children: [
      {
        path: "/",
        Component: lazy(() => import("./apps/Vank/Page/Home/Home")),
      },
      {
        path: "/transactions",
        Component: lazy(
          () => import("./apps/Vank/Page/Transactions/Transactions")
        ),
      },
    ],
  },
  {
    path: "*",
    Component: lazy(() => import("./apps/Shared/NotFound/NotFound")),
  },
]);

export default router;
