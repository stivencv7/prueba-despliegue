import { RouterProvider } from "react-router-dom";
import { Context } from "@redtea/react-inversify";
import router from "./Router";

function App({ container }) {
  return (
    <Context.Provider value={container}>
      <RouterProvider router={router} />
    </Context.Provider>
  );
}

export default App;
