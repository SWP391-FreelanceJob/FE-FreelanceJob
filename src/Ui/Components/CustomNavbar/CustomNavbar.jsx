import { useEffect, useRef, useState } from "react";
// import { db } from "@/App/Firebase/firebaseconfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "@firebase/firestore";
import _ from "lodash";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { useFirestore, useFirestoreCollectionData } from "reactfire";

import logo from "@/App/Assets/svg/FreelanceVN.svg";
import fuLogo from "@/App/Assets/png/logofu.png";

import { useOnClickOutside } from "@/App/Hooks/useClickOutside";
import "./CustomNavbar.css";
import IconDropdown from "../CustomDropdown/IconDropdown";

const ChatIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill="currentColor"
      className="bi bi-chat-text"
      viewBox="0 0 16 16"
    >
      <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
      <path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8zm0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z" />
    </svg>
  );
};

const NotiIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill="currentColor"
      className="bi bi-bell"
      viewBox="0 0 16 16"
    >
      <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
    </svg>
  );
};

const CustomNavbar = () => {
  dayjs.extend(relativeTime);

  const [isLogged, setIsLogged] = useState(true);
  const [isOpenedModal, setIsOpenedModal] = useState(false);

  const [rooms, setRooms] = useState([]);

  const modalRef = useRef();
  useOnClickOutside(modalRef, () => setIsOpenedModal(false));

  const roomCollectionRef = collection(useFirestore(), "room");
  const { data: roomsData, status: roomsStatus } =
    useFirestoreCollectionData(roomCollectionRef);

  // const usfDocRef = doc(collection(db, "sender"), "usr1");

  const openModal = () => {
    setIsOpenedModal(!isOpenedModal);
  };

  const getRoomInfo = async () => {
    if (roomsStatus === "success") {
      const roomArr = await Promise.all(
        roomsData.map(async (docData) => {
          const lastMsg = await getDoc(docData.lastMsg);
          const lastMsgData = lastMsg.data().data;
          const isLastMsgSeen = lastMsg.data().seen;
          const isLastMsgDeleted = lastMsg.data().deleted;
          const members = docData.members;

          // Filter to get the one we msging to
          const receiver = _.find(members, (m) => m.id != "1");

          return {
            receiver,
            data: lastMsgData,
            seen: isLastMsgSeen,
            deleted: isLastMsgDeleted,
            timestamp: docData.lastMsgTimeStamp,
          };
        })
      );
      setRooms(roomArr);
    }
  };

  useEffect(() => {
    console.log(roomsData, roomsStatus);
    getRoomInfo();
  }, [roomsData, roomsStatus]);

  return (
    <>
      <header className="fvn-header">
        <div className="fvn-header-row h-[80px]">
          <div className="flex lg:mx-auto 2xl:px-0 px-8 items-center max-width-container h-full">
            <a className="fvn-logo-container self-auto" href="/">
              <img className="fu-logo w-20 mr-3" src={fuLogo} alt="logo" />
            </a>
            <a className="fvn-logo-container self-auto" href="/">
              <img className="fvn-logo" src={logo} alt="logo" />
            </a>
            <div className="form-control flex-grow">
              {/* <p className="font-sans font-bold">Xem việc làm</p> */}
            </div>
            <div className="flex ml-8 justify-end fvn-navbar-button">
              {isLogged ? (
                <ul>
                  <IconDropdown icon={<NotiIcon />}>A</IconDropdown>
                  <IconDropdown icon={<ChatIcon />}>
                    {rooms.length > 0 ? (
                      rooms.map((room, idx) => (
                        <li
                          key={idx}
                          className={`${
                            room.seen ? "" : "bg-slate-200"
                          } rounded-lg`}
                        >
                          <div className="flex gap-0">
                            <div className="w-1/4 flex-1">
                              <div className="flex avatar">
                                <div className="w-10 rounded-full mr-3">
                                  <img src={room.receiver?.avatarUrl} alt="" />
                                </div>
                              </div>
                            </div>
                            <div className="w-3/4 flex flex-col">
                              <div className="text-lg">
                                {room.receiver?.fullName ?? ""}
                              </div>
                              <div className="font-normal text-xs">
                                {room.data ?? ""}
                                <span className="mx-[3px]">•</span>{" "}
                                {room.timestamp
                                  ? dayjs().to(
                                      dayjs.unix(room.timestamp.seconds)
                                    )
                                  : ""}
                              </div>
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li>
                        <div className="flex animate-pulse flex-row items-center h-full justify-center px-0">
                          <div className="w-12 bg-gray-300 h-12 rounded-full "></div>
                          <div className="flex flex-col space-y-3">
                            <div className="w-36 bg-gray-300 h-6 rounded-md "></div>
                            <div className="w-24 bg-gray-300 h-6 rounded-md "></div>
                          </div>
                        </div>
                      </li>
                    )}
                  </IconDropdown>
                  <li className="flex">
                    <div className="dropdown dropdown-end">
                      <div
                        ref={modalRef}
                        tabIndex="0"
                        className="cursor-pointer"
                        onClick={openModal}
                      >
                        <div className="w-52 flex">
                          <div className="w-1/4 flex items-center justify-center  mr-2">
                            <div className="avatar">
                              <div className="w-12 rounded-full">
                                <img src="https://i.pravatar.cc/300" />
                              </div>
                            </div>
                          </div>
                          <div className="w-3/4 flex flex-col">
                            <div className="text-base">Amelia</div>
                            <div className="font-normal text-xs">
                              iD: 021301231
                            </div>
                          </div>
                          <div className="flex items-center">
                            {isOpenedModal ? (
                              <i className="bi bi-caret-up-fill" />
                            ) : (
                              <i className="bi bi-caret-down-fill" />
                            )}
                          </div>
                        </div>
                      </div>
                      <ul
                        tabIndex="0"
                        className={`${
                          isOpenedModal ? "" : "hide-modal "
                        }dropdown-content menu p-2 shadow bg-base-100 rounded-box w-80 gap-2`}
                      >
                        A
                      </ul>
                    </div>
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>
                    <label
                      htmlFor="sign-in-modal"
                      className="modal-button cursor-pointer"
                    >
                      Sign In
                    </label>
                  </li>
                  <li>
                    <label
                      htmlFor="sign-up-modal"
                      className="fvn-join-btn btn btn-outline btn-info modal-button"
                    >
                      Join
                    </label>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </header>
      {/* <div className="categories py-2">
        <div className="fvn-categories-nav">
          <ul className="fvn-categories">
            <li>
              <a href="">Quản lý công việc</a>
            </li>
            <li>
              <a href="">C# & .NET</a>
            </li>
          </ul>
        </div>
      </div> */}
    </>
  );
};

export default CustomNavbar;
