const CustomPagination = ({ prevPage, nextPage, pageNo, totalPage }) => {
  return (
    <div className="btn-group justify-center">
      <button
        onClick={prevPage}
        className={`btn btn-secondary ${pageNo === 1 ? "btn-disabled" : ""}`}
      >
        «
      </button>
      <button className="btn btn-secondary cursor-default text-white">
        Trang {pageNo} trên {totalPage}
      </button>
      <button
        onClick={nextPage}
        className={`btn btn-secondary ${
          pageNo === totalPage ? "btn-disabled" : ""
        }`}
      >
        »
      </button>
    </div>
  );
};
export default CustomPagination;
