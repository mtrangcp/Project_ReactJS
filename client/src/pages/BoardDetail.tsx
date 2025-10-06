import "../css/BoardDetail.css";

import trelloLogoFull from "../assets/images/trello-logo-full.png";
import boardsIcon from "../assets/icons/boards.png";
import starredBoardsIcon from "../assets/icons/starredBoards.png";
import closedBoardsIcon from "../assets/icons/closedBoards.png";
import btnAdd from "../assets/icons/btn-add.png";
import overBoard from "../assets/icons/over-board.png";
import tableIcon from "../assets/icons/table.png";
import closeBoard from "../assets/icons/close-board.png";
import filterIcon from "../assets/icons/filters.png";
import filterDate from "../assets/icons/filter-date.png";
import overDueDate from "../assets/icons/over-dueDate.png";
import dueNextDay from "../assets/icons/due-nextDay.png";
import starredBoardsBlackIcon from "../assets/icons/starredBoards-black.png";
import noLabels from "../assets/icons/no-labels.png";
import comfirmCloseIcon from "../assets/icons/icon-confirm-close.png";
import describeIcon from "../assets/icons/describe.png";
import labelsIcon from "../assets/icons/icon-labels.png";
import dateIcon from "../assets/icons/icon-date.png";
import delTaskIcon from "../assets/icons/icon-del-task.png";
import btnBlack from "../assets/icons/btn-back.png";
import penEdit from "../assets/icons/pen-edit.png";

export default function BoardDetail() {
  return (
    <>
      <header className="header">
        <div
          className="div-logo"
          data-bs-toggle="modal"
          data-bs-target="#editLabelModal"
        >
          <img src={trelloLogoFull} alt="img full logo" />
        </div>
      </header>
      <div className="my-container">
        <aside className="aside">
          <p>YOUR WORKSPACES</p>
          <div className="workspaces">
            <div className="boards">
              <a href="#" className="item">
                <img src={boardsIcon} alt="img boards" />
                <span>Boards</span>
              </a>
              <a href="#" className="item">
                <img src={starredBoardsIcon} alt="img starredBoards" />
                <span>Starred Boards</span>
              </a>
              <a href="#" className="item">
                <img src={closedBoardsIcon} alt="img closedBoards" />
                <span>Closed Boards</span>
              </a>
            </div>
            <div className="line" />
            <div className="your-boards">
              <div className="title">
                <span>Your boards</span>
                <img src={btnAdd} alt="img-add" />
              </div>
              <div className="list-your-boards">
                {/* list board */}
                <div className="item">
                  <div className="img"></div>
                  <span className="title-clamp">abc abc</span>
                  {/* <i
                    className="fa-solid fa-star star-black"
                    // onclick="removeStar()"
                  ></i> */}
                  <i
                    className="fa-solid fa-star star-white"
                    // onclick="addStar()"
                  ></i>
                </div>
              </div>
              {/*  */}
            </div>
          </div>
        </aside>

        <main className="main">
          <div className="overlay-title">
            <div className="over-left">
              <span className="title" id="board-name">
                Tổ chức sự kiện Year-end party !
              </span>
              <img
                id="title-star"
                src={starredBoardsBlackIcon}
                alt="img star"
              />
              <div className="over-board">
                <img src={overBoard} alt="img board" />
                <span>Board</span>
              </div>
              <div className="change-table">
                <img id="icon-table" src={tableIcon} alt="img table" />
                <span>Table</span>
              </div>
              <div
                data-bs-toggle="modal"
                data-bs-target="#closeBoardModal"
                className="close-board"
              >
                <img id="icon-table" src={closeBoard} alt="img close" />
                <span>Close this board</span>
              </div>
            </div>
            <div
              data-bs-toggle="modal"
              data-bs-target="#filterModal"
              className="over-right"
            >
              <img src={filterIcon} alt="filters" />
              <span>Filters</span>
            </div>
          </div>
          <div className="toDo-list" id="toDo-lists">
            {/*  */}
            <div className="item-toDo last-item-list">
              <div className="last-item">
                <div className="part-show" id="btnShowAddList">
                  <button>
                    <img src={btnAdd} alt="icon-add" />
                    <span>Add another list</span>
                  </button>
                </div>
                <div className="addAnotherList">
                  <input
                    autoFocus={true}
                    type="text"
                    placeholder="Add another list"
                    id="inputAddList"
                  />
                  <div className="confirm-add">
                    <button id="btnAddList">Add another list</button>
                    <span id="spanClose">✖︎</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal Filter Dropdown */}
      <div className="modal fade" id="filterModal" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div
              className="modal-header d-flex align-items-center"
              style={{ borderBottom: "none" }}
            >
              <h1
                className="modal-title fs-5 text-center flex-grow-1"
                id="exampleModalLabel"
              >
                Filter
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="keyboard">
                <p className="title">Keyword</p>
                <input type="text" placeholder="Enter a keyword…" />
                <p className="p-normal">Search cards,</p>
              </div>
              <div className="keyboard">
                <p className="title">Card status</p>
                <div className="item-status">
                  <input
                    type="checkbox"
                    className="filter-checkbox status-complete"
                  />
                  <span>Marked as complete</span>
                </div>
                <div className="item-status">
                  <input
                    type="checkbox"
                    className="filter-checkbox status-pending"
                  />
                  <span>Not marked as complete</span>
                </div>
              </div>
              <div className="keyboard">
                <p className="title">Due date</p>
                <div className="item-status">
                  <input type="checkbox" className="filter-checkbox no-dates" />
                  <img src={filterDate} alt="filter date" />
                  <span>No dates</span>
                </div>
                <div className="item-status">
                  <input type="checkbox" className="filter-checkbox overdue" />
                  <img src={overDueDate} alt="over-dueDate" />
                  <span>Overdue</span>
                </div>
                <div className="item-status">
                  <input
                    type="checkbox"
                    className="filter-checkbox due-next-day"
                  />
                  <img src={dueNextDay} alt="due-nextDay" />
                  <span>Due in the next day</span>
                </div>
              </div>
              <div className="keyboard">
                <p className="title">Labels</p>
                <div className="item-status">
                  <input type="checkbox" />
                  <img src={noLabels} alt="filter date" />
                  <span>No labels</span>
                </div>
                <div className="item-status">
                  <input type="checkbox" />
                  <div
                    className="color-label"
                    style={{ backgroundColor: "#4bce97" }}
                  />
                </div>
                <div className="item-status">
                  <input type="checkbox" />
                  <div
                    className="color-label"
                    style={{ backgroundColor: "#f5cd47" }}
                  />
                </div>
                <div className="item-status">
                  <input type="checkbox" />
                  <div
                    className="color-label"
                    style={{ backgroundColor: "#fea362" }}
                  />
                </div>
                <div className="item-status">
                  <input type="checkbox" />
                  <select name="list-labels" id="list-labels">
                    <option value="" selected={false}>
                      Select labels
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Close board */}
      <div className="modal fade" id="closeBoardModal" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header popular">
              <img src={comfirmCloseIcon} alt="icon-confirm" />
              <p className="question">Are you sure?</p>
              <p className="remind">You won't be able to revert this!</p>
              <div className="d-flex justify-content-center list-btn">
                <button
                  id="btnConfirmDelete"
                  type="button"
                  className="btn my-btn-create"
                >
                  Yes, close it!
                </button>
                <button
                  id="btnCloseBoard"
                  type="button"
                  className="btn my-btn-close"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Close list */}
      <div className="modal fade" id="closeListModal" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header popular">
              <img src={comfirmCloseIcon} alt="icon-confirm" />
              <p className="question">Are you sure?</p>
              <p className="remind">You won't be able to revert this!</p>
              <div className="d-flex justify-content-center list-btn">
                <button
                  id="btnConfirmDelList"
                  type="button"
                  className="btn my-btn-create"
                >
                  Yes, delete it!
                </button>
                <button
                  type="button"
                  className="btn my-btn-close"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Task Detail */}
      <div className="modal fade modal-lg" id="taskDetailModal" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header popular">
              <div className="header-modal">
                <div className="header-top">
                  <i className="fa-solid fa-circle-check" id="iconStatus" />
                  <p id="taskDetailTitle">Kịch bản</p>
                </div>
                <div className="span-select">
                  <span>in list</span>
                  <div
                    className="select"
                    id="status-task"
                    // onclick="openMoveDropdownModal()"
                  >
                    In-progress
                  </div>
                </div>
              </div>
              <div className="content">
                <div className="main-modal">
                  <div className="title">
                    <img src={describeIcon} alt="describe" />
                    <span>Description</span>
                  </div>
                  <div className="input-content">
                    <textarea
                      id="editor"
                      style={{ height: 300 }}
                      defaultValue={""}
                    />
                    <div className="btn-group">
                      <button id="saveUpdateTask">Save</button>
                      <button data-bs-dismiss="modal">Cancel</button>
                    </div>
                  </div>
                </div>
                <div className="aside-modal">
                  {/* onclick="openEditLabelModal()" */}
                  <div className="labels">
                    <img src={labelsIcon} alt="labels" />
                    <span>Labels</span>
                  </div>

                  {/* onclick="openDateModal()" */}
                  <div className="labels">
                    <img src={dateIcon} alt="date" />
                    <span>Dates</span>
                  </div>
                  <div
                    className="labels"
                    id="confirm-delete"
                    style={{ backgroundColor: "#c9372c" }}
                  >
                    <img src={delTaskIcon} alt="date" />
                    <span style={{ color: "#ffffff" }}>Delete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal move func dropdown */}
      <div className="modal fade" id="moveDropdownModal" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 w-100 text-center"
                id="exampleModalLabel"
              >
                Move card
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <p>Select destination</p>
              <div className="boards">
                <h3>Board</h3>
                <input type="text" id="titleBoardOfTask" disabled={false} />
              </div>
              <div className="list-po">
                <div className="list">
                  <h3>List</h3>
                  <select id="listSelect">
                    <option value="In-progress">In-progress</option>
                  </select>
                </div>
                <div className="position">
                  <h3>Position</h3>
                  <select id="positionSelect">
                    <option value={1}>1</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                id="moveTaskBtn"
                className="btn btn-primary me-auto"
              >
                Move
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal add labels dropdown */}
      <div
        className="modal fade"
        id="labelModal"
        tabIndex={-1}
        aria-labelledby="labelModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content p-3">
            <div className="modal-header">
              <img
                src={btnBlack}
                alt="back-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
              <h5 className="modal-title" id="labelModalLabel">
                Create label
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="labelTitleInput"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Select a color</label>
                <div className="d-flex flex-wrap gap-2">
                  <span
                    className="color-option"
                    style={{ backgroundColor: "#baf3db" }}
                  />
                  <span
                    className="color-option"
                    style={{ backgroundColor: "#f8e6a0" }}
                  />
                  <span
                    className="color-option"
                    style={{ backgroundColor: "#fedec8" }}
                  />
                  <span
                    className="color-option"
                    style={{ backgroundColor: "#ffd5d2" }}
                  />
                  <span
                    className="color-option"
                    style={{ backgroundColor: "#dfd8fd" }}
                  />
                  <span
                    className="color-option"
                    style={{ backgroundColor: "#4bce97" }}
                  />
                  <span
                    className="color-option"
                    style={{ backgroundColor: "#f5cd47" }}
                  />
                  <span
                    className="color-option"
                    style={{ backgroundColor: "#fea362" }}
                  />
                  <span
                    className="color-option"
                    style={{ backgroundColor: "#f87168" }}
                  />
                  <span
                    className="color-option"
                    style={{ backgroundColor: "#9f8fef" }}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                id="createLabelBtn"
              >
                Create
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal edit list labels dropdown */}
      <div
        className="modal fade"
        id="editLabelModal"
        tabIndex={-1}
        aria-labelledby="labelModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content p-3">
            <div className="modal-header ">
              <h5
                className="modal-title w-100 text-center "
                id="labelModalLabel"
              >
                Label
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <p>Labels</p>
              <div className="listLabels">
                <div className="itemLabel">
                  <input type="checkbox" />
                  <div className="colorLabel">done</div>
                  <img src={penEdit} alt="edit" />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                id="openCreateLabelModal"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal edit and del labels dropdown */}
      <div
        className="modal fade"
        id="editAndDelLabelModal"
        tabIndex={-1}
        aria-labelledby="labelModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content p-3">
            <div className="modal-header">
              <img
                src={btnBlack}
                alt="back-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
              <h5 className="modal-title" id="labelModalLabel">
                Edit label
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="labelTitleInput"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Select a color</label>
                <div className="d-flex flex-wrap gap-2">
                  <span
                    className="color-option"
                    style={{ backgroundColor: "#baf3db" }}
                  />
                  <span
                    className="color-option"
                    style={{ backgroundColor: "#f8e6a0" }}
                  />
                  <span
                    className="color-option"
                    style={{ backgroundColor: "#fedec8" }}
                  />
                  <span
                    className="color-option"
                    style={{ backgroundColor: "#ffd5d2" }}
                  />
                  <span
                    className="color-option"
                    style={{ backgroundColor: "#dfd8fd" }}
                  />
                  <span
                    className="color-option"
                    style={{ backgroundColor: "#4bce97" }}
                  />
                  <span
                    className="color-option"
                    style={{ backgroundColor: "#f5cd47" }}
                  />
                  <span
                    className="color-option"
                    style={{ backgroundColor: "#fea362" }}
                  />
                  <span
                    className="color-option"
                    style={{ backgroundColor: "#f87168" }}
                  />
                  <span
                    className="color-option"
                    style={{ backgroundColor: "#9f8fef" }}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                id="saveEditLabelBtn"
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                id="delLabelBtn"
                data-bs-dismiss="modal"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal choose dates */}
      <div
        className="modal fade"
        id="dateModal"
        tabIndex={-1}
        aria-labelledby="labelModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content p-3">
            <div className="modal-header d-flex align-items-center">
              <h5
                className="modal-title text-center flex-grow-1"
                id="labelModalLabel"
              >
                Dates
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div id="calendar" />
              {/* Khu vực hiển thị lịch */}
              <label style={{ marginTop: 25 }}>
                <input type="checkbox" id="start-date-checkbox" /> Start date
              </label>
              <input type="text" id="start-date" className="form-control" />
              <label>
                <input type="checkbox" id="due-date-checkbox" /> Due date
              </label>
              <input type="text" id="due-date" className="form-control" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">
                Save
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Close card */}
      <div className="modal fade" id="closeCardModal" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header popular">
              <img src={comfirmCloseIcon} alt="icon-confirm" />
              <p className="question">Are you sure?</p>
              <p className="remind">You won't be able to revert this!</p>
              <div className="d-flex justify-content-center list-btn">
                <button
                  id="btnConfirmDelCard"
                  type="button"
                  className="btn my-btn-create"
                >
                  Yes, delete it!
                </button>
                <button
                  type="button"
                  className="btn my-btn-close"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
