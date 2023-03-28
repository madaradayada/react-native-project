import { Home } from "../../Screens/Home";
import { useRoute } from "../../router";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/authSelectors";
import React, { useEffect } from "react";
import { refreshUser } from "../../redux/auth/authOperations";

export const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const routing = useRoute();
  return (
    <NavigationContainer>{isLoggedIn ? <Home /> : routing}</NavigationContainer>
  );
};