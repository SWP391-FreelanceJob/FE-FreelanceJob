import { useState } from "react";
import "./MultipleSelect.css";

export default function MultipleSelect() {
  const [selectedSkills, setSelectedSkills] = useState(["HTML", "CSS", "SQL"]);
  const [isOptOpened, setIsOptOpened] = useState(false);

  const skills = [
    "HTML",
    "CSS",
    "SQL",
    "Python",
    "JavaScript",
    "C#",
    "C++",
    "C",
    "Ruby",
  ];

  /**
   *
   * @param {string} selectedSkill
   */
  const removeSelected = (selectedSkill) => {
    setSelectedSkills(selectedSkills.filter((el) => el !== selectedSkill));
  };

   /**
   *
   * @param {string} selectedSkill
   */
  const addSelected = (selectedSkill) => {
    if (!selectedSkills.includes(selectedSkill))
      setSelectedSkills((item) => [...item, selectedSkill]);
  };

  const showOptions = () => {
    setIsOptOpened(!isOptOpened);
  }

  return (
    <div className="flex flex-col items-center relative">
      <div onClick={showOptions} className="select select-bordered focus:outline-0 w-full items-center flex-wrap rounded-lg h-auto mb-2">
        <div className="flex flex-wrap">
          {selectedSkills.map((selected, idx) => (
            <div
              key={idx}
              className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-teal-700 bg-teal-100 border border-teal-300"
            >
              <div className="text-xs font-normal leading-none max-w-full flex-initial">
                {selected}
              </div>
              <div className="flex flex-auto flex-row-reverse">
                <div onClick={() => removeSelected(selected)}>
                  <i className="bi bi-x-circle feather feather-x cursor-pointer hover:text-teal-400 rounded-full w-4 h-4 ml-2"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={`${isOptOpened ? "":"hidden"} absolute shadow bg-white z-40 w-full left-0 top-full rounded max-h-60 overflow-y-auto`}>
        <div className="flex flex-col w-full">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100"
            >
              <div
                onClick={() => addSelected(skill)}
                className={`flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative ${
                  selectedSkills.includes(skill)
                    ? "border-teal-600"
                    : "hover:border-teal-100"
                }`}
              >
                <div className="w-full items-center flex">
                  <div className="mx-2 leading-6  ">{skill} </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
