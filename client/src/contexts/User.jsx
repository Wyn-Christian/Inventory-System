import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useNavPage } from "../contexts/NavPage";
import { usePorts } from "./Ports";

import axios from "axios";

// User Custom Hooks
export const useUserSource = () => {
  const ports = usePorts();
  const [user, setUser] = useState(undefined);
  const [inventories, setInventories] = useState([]);

  const navigate = useNavigate();
  const { setNavHide } = useNavPage();

  useEffect(() => {
    if (user) {
      axios
        .get(
          `http://localhost:${ports.SERVER_PORT}/catalog/inventories/${user.id}`
        )
        .then((result) => {
          setInventories(result.data.list_inventories);
        });
    }
  }, [user]);

  const loginUser = ({ username, password }) => {
    axios
      .post(`http://localhost:${ports.SERVER_PORT}/users/login`, {
        username,
        password,
      })
      .then((result) => {
        console.log(result.data);
        let userDB = result.data;
        if (userDB) {
          setUser(...userDB);
          navigate("/");
          setNavHide(false);
        }
        return result;
      });
  };

  const logoutUser = () => {
    setUser(undefined);
    navigate("/login");
    setNavHide(true);
  };

  return {
    user,
    setUser,
    loginUser,
    logoutUser,
    inventories,
    setInventories,
  };
};

export const UserContext = createContext({});
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  return (
    <UserContext.Provider value={useUserSource()}>
      {children}
    </UserContext.Provider>
  );
};
