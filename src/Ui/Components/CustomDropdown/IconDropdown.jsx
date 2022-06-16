import { useState, useRef } from "react";

import { useOnClickOutside } from "@/App/Hooks/useClickOutside";

const IconDropdown = ({ children, icon }) => {
  const [isOpenedModal, setisOpenedModal] = useState(false);

  const modalRef = useRef();
  useOnClickOutside(modalRef, () => setisOpenedModal(false));

  const openModal = () => {
    setisOpenedModal(!isOpenedModal);
  };

  return (
    <li className="flex">
      <div className="dropdown dropdown-end">
        <label
          ref={modalRef}
          tabIndex="0"
          className="cursor-pointer"
          onClick={openModal}
        >
          {icon}
        </label>
        <ul
          tabIndex="0"
          className={`${
            isOpenedModal ? "" : "hide-modal "
          }dropdown-content menu p-2 shadow bg-base-100 rounded-box w-80 gap-2`}
        >
          {children}
        </ul>
      </div>
    </li>
  );
};

export default IconDropdown;
