import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFirestore } from "@firebase/firestore";
import { FirestoreProvider, useFirebaseApp } from "reactfire";

import {
  get401,
  get403,
  get404,
  get500,
  getTodos,
} from "@/Api/Service/TodoService";

import "./App.css";
import { notyf } from "@/App/Utils/NotyfSetting";
import { mqttClient } from "@/App/Utils/Mqtt";
import MasterPage from "../Components/MasterPage";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "@/App/Router/GuardRouter";
import LandingPage from "./LandingPage/LandingPage";
import Profile from "./Profile/Profile";
import Jobs from "./Jobs/Jobs";
import Freelancers from "./Freelancers/Freelancers";
import ScrollToTop from "../Components/ScrollToTop";
import JobDetail from "./Jobs/JobDetail/JobDetail";
import Settings from "./Settings/Settings";
import SignIn from "./Auth/SignIn/SignIn";
import SignUp from "./Auth/SignUp/SignUp";


function App() {
  const fireStoreInstance = getFirestore(useFirebaseApp())

  // mqttClient.on("message", (topic, msg) => {
  //   const noti = msg.toString()
  //   console.log(noti);
  //   // notyf.success(noti);
  // });

  mqttClient.onMessageArrived = onMessageArrived;

  function onMessageArrived(message) {
    notyf.success(message.payloadString);
  }

  useEffect(() => {}, []);

  return (
    <FirestoreProvider sdk={fireStoreInstance}>
      <ScrollToTop>
        <Routes>
          {/* <Route
          path="/"
          element={
            <RequireAuth children={<MasterPage />} requiredRoles={[""]} />
          }
        ></Route> */}
          <Route path="/" element={<MasterPage />}>
            <Route path="" element={<LandingPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings/*" element={<Settings />} />
            <Route path="/all-jobs" element={<Jobs />} />
            <Route path="/job/:id" element={<JobDetail/>} />
            <Route path="/all-freelancers" element={<Freelancers />} />
          </Route>
          <Route path="/sign-in" element={<SignIn/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          {/* <Route path="*" element={<NotFound/>}/> */}
        </Routes>
      </ScrollToTop>
    </FirestoreProvider>
  );
}

export default App;
