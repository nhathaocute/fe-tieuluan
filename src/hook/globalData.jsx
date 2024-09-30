import { createContext, useContext, useState } from "react";

const GlobalDataContext = createContext();

export const GlobalData = ({ children }) => {
  const [title, setTitle] = useState();
  return (
    <GlobalDataContext.Provider value={{ title, setTitle }}>
      {children}
    </GlobalDataContext.Provider>
  );
};

export const useGlobalDataContext = () => {
  const context = useContext(GlobalDataContext);
  if (!context) {
    throw new Error("useGlobalDataContext khong dung voi GlobalData");
  }
  return context;
};
