import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
  });

  const updateUser = (data) => {
    setUserData((prevData) => ({ ...prevData, ...data }));
  };

  return (
    <UserContext.Provider value={{ userData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}
