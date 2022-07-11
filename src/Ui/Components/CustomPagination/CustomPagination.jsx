import "./CustomPagination.css";

const CustomPagination = ({ prevPage, nextPage, pageNo, totalPage, hasNextPage, hasPrevPage }) => {
  return (
    <div className="btn-group justify-center">
      <button
        onClick={prevPage}
        className={`btn btn-secondary ${!hasPrevPage ? "btn-disabled" : ""}`}
      >
        «
      </button>
      <button className="btn btn-secondary cursor-default text-white">
        Trang {pageNo} trên {totalPage}
      </button>
      <button
        onClick={nextPage}
        className={`btn btn-secondary ${
          !hasNextPage ? "btn-disabled" : ""
        }`}
      >
        »
      </button>
    </div>
  );
};
export default CustomPagination;
