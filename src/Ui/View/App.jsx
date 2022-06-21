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
import CreateJob from "./Jobs/CreateJob/CreateJob";
import ManageJobRoute from "./Jobs/ManageJob/ManageJobRoute";
import Project from "./Project/Project";
import ManageProject from "./Settings/Profile/ManageProject/ManageProject";
import EditProject from "./Settings/Profile/ManageProject/EditProject/EditProject";
import ViewOffer from "./Jobs/ManageJob/ViewOffer/ViewOffer";
import JobProgress from "./Jobs/ManageJob/JobProgress/JobProgress";


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
            <Route path="/manage-profile/*" element={<Settings />} />
            <Route path="/manage-project" element={<ManageProject />} />
            <Route path="/edit-project/:id" element={<EditProject />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/settings/*" element={<Settings />} />
            <Route path="/project/:id" element={<Project />} />
            <Route path="/all-jobs" element={<Jobs />} />
            <Route path="/manage-job/*" element={<ManageJobRoute/>} />
            <Route path="/create-job" element={<CreateJob/>} />
            <Route path="/job/:id" element={<JobDetail/>} />
            <Route path="/job-progress/:id" element={<JobProgress/>} />
            <Route path="/offer/:jid" element={<ViewOffer/>} />
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
