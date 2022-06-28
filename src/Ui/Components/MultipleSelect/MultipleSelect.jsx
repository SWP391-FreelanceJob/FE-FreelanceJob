import { useEffect, useRef, useState } from "react";
import "./MultipleSelect.css";
import { useGetSkillsQuery } from "@/App/Models/Skill/Skill";
import { useOnClickOutside } from "@/App/Hooks/useClickOutside";

export default function MultipleSelect({
  selectedSkills = [],
  setSelectedSkills,
  isError =false,
}) {
  const [isOptOpened, setIsOptOpened] = useState(false);

  const { data: skills, error, isSuccess } = useGetSkillsQuery();

  const selectRef = useRef();
  const optRef = useRef();
  useOnClickOutside(selectRef, () => setIsOptOpened(false), optRef);

  /**
   *
   * @param {string} selectedSkill
   */
  const removeSelected = (selectedSkill) => {
    setIsOptOpened(!isOptOpened);
    setSelectedSkills(selectedSkills.filter((el) => el !== selectedSkill));
  };

  /**
   *
   * @param {string} selectedSkill
   */
  const addSelected = (selectedSkill) => {
    if (!selectedSkills.includes(selectedSkill))
      setSelectedSkills([...selectedSkills, selectedSkill]);
    else {
      setSelectedSkills(selectedSkills.filter((el) => el !== selectedSkill));
    }
  };

  const showOptions = () => {
    setIsOptOpened(!isOptOpened);
  };

  return (
    <div className="flex flex-col items-center relative">
      <div
        ref={selectRef}
        onClick={showOptions}
        className={`${isError ? "border-red-500 ":""} select select-bordered focus:outline-0 w-full items-center flex-wrap rounded-lg h-auto mb-2`}
      >
        <div className="flex flex-wrap">
          {selectedSkills.map((selected, idx) => (
            <div
              key={idx}
              className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-full text-teal-700 bg-teal-100 border border-teal-300"
            >
              <div className="text-xs font-normal leading-none max-w-full flex-initial p-1">
                {selected.skillName}
              </div>
              <div className="flex flex-auto flex-row-reverse">
                {/* <div onClick={() => removeSelected(selected)}>
                  <i className="bi bi-x-circle feather feather-x cursor-pointer hover:text-teal-400 rounded-full w-4 h-4 ml-2"></i>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        ref={optRef}
        className={`${
          isOptOpened ? "" : "hidden"
        } absolute shadow bg-white z-40 w-full left-0 top-full rounded max-h-60 overflow-y-auto`}
      >
        <div className="flex flex-col w-full">
          {isSuccess &&
            skills.map((skill, idx) => (
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
                    <div className="mx-2 leading-6  ">{skill.skillName} </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
