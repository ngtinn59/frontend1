import clsx from "clsx";
import "./style.css"
import {
  FiChevronLeft,
  FiChevronsLeft,
  FiChevronRight,
  FiChevronsRight,
} from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";

export default function CPagination({
  className,
  totalPage,
  curPage,
  setCurPage,
  getList,
}) {
  const frameIndexNum = 5;
  const diffToMiddle = Math.floor(frameIndexNum / 2);

  const handleClickPage = (pageNum, offset) => {
    const current = pageNum + offset;
    if (current > 0 && current <= totalPage) {
      setCurPage(current);
      getList(current);
    }
  };

  const PageItem = ({ pageNum }) => (
    <div
      className={clsx(
        "page-item",
        pageNum === curPage && "active"
      )}
      onClick={() => handleClickPage(pageNum, 0)}
    >
      {pageNum}
    </div>
  );

  return (
    <div className={clsx("pagination-container", className)}>
      <div
        className={clsx("page-control", curPage === 1 && "disabled")}
        onClick={() => handleClickPage(1, 0)}
      >
        <FiChevronsLeft />
      </div>
      <div
        className={clsx("page-control", curPage === 1 && "disabled")}
        onClick={() => handleClickPage(curPage, -1)}
      >
        <FiChevronLeft />
      </div>

      {totalPage <= 9 ? (
        Array.from({ length: totalPage }, (_, index) => (
          <PageItem key={`page_${index + 1}`} pageNum={index + 1} />
        ))
      ) : (
        <>
          {Array.from({ length: 2 }, (_, index) => (
            <PageItem key={`page_${index + 1}`} pageNum={index + 1} />
          ))}

          {curPage - diffToMiddle > 3 && (
            <div className="page-dots">
              <BsThreeDots />
            </div>
          )}

          {Array.from({ length: frameIndexNum }, (_, index) => {
            let first = curPage - diffToMiddle <= 3 ? 3 : curPage - 2;
            if (curPage + diffToMiddle >= totalPage - 2)
              first = totalPage - diffToMiddle - 4;

            return (
              <PageItem key={`page_${first + index}`} pageNum={first + index} />
            );
          })}

          {curPage + diffToMiddle < totalPage - 2 && (
            <div className="page-dots">
              <BsThreeDots />
            </div>
          )}

          {Array.from({ length: 2 }, (_, index) => (
            <PageItem
              key={`page_${totalPage - 1 + index}`}
              pageNum={totalPage - 1 + index}
            />
          ))}
        </>
      )}

      <div
        className={clsx("page-control", curPage === totalPage && "disabled")}
        onClick={() => handleClickPage(curPage, 1)}
      >
        <FiChevronRight />
      </div>
      <div
        className={clsx("page-control", curPage === totalPage && "disabled")}
        onClick={() => handleClickPage(totalPage, 0)}
      >
        <FiChevronsRight />
      </div>
    </div>
  );
}
