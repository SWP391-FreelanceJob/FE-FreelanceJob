import "./Project.css";

const Project = () => {
  const listOfSkills = [
    "Java",
    "C# & .NET",
    "SQL",
    "Flutter",
    "iOS",
    "Android",
    "Python",
  ];

  return (
    <div className="flex">
      <div className="w-1/3 mr-3">
        <div className="card card-compact all-shadow px-8 py-5 mb-2 items-center">
          <div className="avatar justify-center mb-3">
            <div className="rounded-full">
              <img
                className="usr-avatar"
                src="https://i.pravatar.cc/1000"
                alt=""
              />
            </div>
          </div>
          <div className="font-semibold text-xl">Tên freelancer</div>
          <p className="my-2 text-slate-400">Short Description</p>
          <div className="flex gap-2 mb-2 flex-wrap ">
            <div className="badge badge-info badge-outline text-white">
              .NET
            </div>
            <div className="badge badge-info badge-outline text-white">SQL</div>
          </div>
          <div className="btn btn-sm btn-secondary mt-2 text-white">Xem hồ sơ</div>
        </div>
      </div>
      <div className="w-2/3 mx-3">
        <h1 className="mb-1 font-semibold text-2xl">Tên project</h1>
        <img
          className="w-full h-[70%]"
          src="https://picsum.photos/1200/1000"
          alt="project-img"
        />
        <p className="mt-1">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae
          distinctio nihil atque at tenetur illo aperiam, maxime repudiandae,
          laboriosam quos quia! Vero pariatur sint aut laudantium
          necessitatibus, ducimus explicabo repellat.
        </p>
      </div>
    </div>
  );
};

export default Project;
