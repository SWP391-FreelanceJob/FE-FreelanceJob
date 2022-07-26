import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFirestore } from "@firebase/firestore";
import { FirestoreProvider, StorageProvider, useFirebaseApp } from "reactfire";

import {
  get401,
  get403,
  get404,
  get500,
  getTodos,
} from "@/Api/Service/TodoService";

import "./App.css";

import { notyf } from "@/App/Utils/NotyfSetting";
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
import ManageOfferRoute from "./ManageOffer/ManageOfferRoute";
import { getStorage } from "firebase/storage";
import RecruiterProfile from "./Profile/RecruiterProfile";
import MqttConnector from "@/App/Utils/Mqtt/Mqtt";
import Forbidden from "./Forbidden";
import NotFound from "./NotFound";
import TopupGuide from "@/Ui/View/Guideline/TopupGuide/TopupGuide";
import BidGuide from "@/Ui/View/Guideline/FLGuide/BidGuide";
import ContactGuide from "@/Ui/View/Guideline/RCGuide/ContactGuide";
import SelectFCGuide from "@/Ui/View/Guideline/RCGuide/SelectFCGuide";
import PostGuide from "@/Ui/View/Guideline/RCGuide/PostGuide";

function App() {
  const fireStoreInstance = getFirestore(useFirebaseApp());
  const firebaseStorage = getStorage(useFirebaseApp());

  // mqttClient.on("message", (topic, msg) => {
  //   const noti = msg.toString()
  //   console.log(noti);
  //   // notyf.success(noti);
  // });

  // mqttClient.onMessageArrived = onMessageArrived;

  // function onMessageArrived(message) {
  //   notyf.success(message.payloadString);
  // }

  useEffect(() => {}, []);

  return (
    <FirestoreProvider sdk={fireStoreInstance}>
      <StorageProvider sdk={firebaseStorage}>
        <MqttConnector>
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
                {/* <Route path="/manage-profile/*" element={<Settings />} /> */}
                <Route
                  path="/manage-project"
                  element={
                    <RequireAuth
                      children={<ManageProject />}
                      requiredRoles={["freelancer"]}
                    />
                  }
                />
                <Route
                  path="/edit-project/:id"
                  element={
                    <RequireAuth
                      children={<EditProject />}
                      requiredRoles={["freelancer"]}
                    />
                  }
                />
                <Route
                  path="/recruiter-profile/:id"
                  element={<RecruiterProfile />}
                />
                <Route
                  path="/profile/:id"
                  element={
                    <RequireAuth
                      children={<Profile />}
                      requiredRoles={["freelancer", "recruiter"]}
                    />
                  }
                />
                <Route
                  path="/setting/*"
                  element={
                    <RequireAuth
                      children={<Settings />}
                      requiredRoles={["freelancer", "recruiter"]}
                    />
                  }
                />
                <Route path="/project/:id" element={<Project />} />
                <Route path="/all-jobs" element={<Jobs />} />
                <Route
                  path="/manage-offer/*"
                  element={
                    <RequireAuth
                      children={<ManageOfferRoute />}
                      requiredRoles={["freelancer"]}
                    />
                  }
                />
                <Route
                  path="/manage-job/*"
                  element={
                    <RequireAuth
                      children={<ManageJobRoute />}
                      requiredRoles={["recruiter"]}
                    />
                  }
                />
                <Route
                  path="/create-job"
                  element={
                    <RequireAuth
                      children={<CreateJob />}
                      requiredRoles={["recruiter"]}
                    />
                  }
                />
                <Route
                  path="/edit-job"
                  element={
                    <RequireAuth
                      children={<CreateJob />}
                      requiredRoles={["recruiter"]}
                    />
                  }
                />
                <Route path="/job/:id" element={<JobDetail />} />
                <Route
                  path="/job-progress/:id"
                  element={
                    <RequireAuth
                      children={<JobProgress />}
                      requiredRoles={["freelancer", "recruiter"]}
                    />
                  }
                />
                <Route
                  path="/offer/:jid"
                  element={
                    <RequireAuth
                      children={<ViewOffer />}
                      requiredRoles={["recruiter"]}
                    />
                  }
                />
                <Route path="/all-freelancers" element={<Freelancers />} />
                <Route path="/topup-guide" element={<TopupGuide />} />
                <Route path="/bid-guide" element={<BidGuide />} />
                <Route path="/contact-guide" element={<ContactGuide />} />
                <Route path="/selectfc-guide" element={<SelectFCGuide />} />
                <Route path="/post-guide" element={<PostGuide />} />
              </Route>
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/forbidden" element={<Forbidden />} />
            </Routes>
          </ScrollToTop>
        </MqttConnector>
      </StorageProvider>
    </FirestoreProvider>
  );
}

export default App;
