import React from "react";
import { Navigate } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./components/layout/Default";

// Route Views
import UserProfileLite from "./views/UserProfileLite";
import AboutContact from "./views/AboutContact";
import AboutCrosscheck from "./views/AboutCrosscheck";
import TermsAndConditions from "./views/TermsAndConditions";
import PolicyPrivacy from "./views/PolicyPrivacy";

export default [
  {
    path: "/profile",
    exact: true,
    layout: DefaultLayout,
    element: UserProfileLite
  },
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    element: UserProfileLite
  },
  {
    path: "/logout",
    exact: true,
    layout: DefaultLayout,
    element: () => <Navigate to="/" />
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    element: UserProfileLite
  },
  {
    path: "/about/contact",
    layout: DefaultLayout,
    element: AboutContact
  },
  {
    path: "/about/crosscheck",
    layout: DefaultLayout,
    element: AboutCrosscheck
  },
  {
    path: "/terms",
    layout: DefaultLayout,
    element: TermsAndConditions
  },
  {
    path: "/policy",
    layout: DefaultLayout,
    element: PolicyPrivacy
  },
  //---------------------------------------------------
];
