"use client";

import { ReactNode, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./store/store";

export default function ClientLayout({ children }: { children: ReactNode }) {
  
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then(() => console.log("SW registrado com sucesso!"))
        .catch((err) => console.error("Erro ao registrar SW:", err));
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Provider store={store}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <main>{children}</main>
      </Provider>
    </div>
  );
}
