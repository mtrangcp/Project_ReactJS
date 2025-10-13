import "../css/GeneralStyle.css";
import "../css/BoardDetail.css";

import * as bootstrap from "bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { v4 as uuidv4 } from "uuid";

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
import arrowIcon from "../assets/icons/icon-arrow.png";
import moreIcon from "../assets/icons/icon-more.png";
import addCardIcon from "../assets/icons/add-card.png";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard, updateDashboard } from "../slices/dashboardSlice";
import type { AppDispath, RootState } from "../store/store";
import type { Board, List, Task } from "../utils/types";
import { useNavigate } from "react-router-dom";
import { showToastError, showToastSuccess } from "../utils/toast";
import { addList, deleteList, getList, updateList } from "../slices/listSlice";
import { addTask, deleteTask, getTask, updateTask } from "../slices/taskSlice";

export default function BoardDetail() {
  // control modal
  // handle add list
  const [showTitleAddList, setShowTitleAddList] = useState<boolean>(true);
  const [showAddList, setShowAddList] = useState<boolean>(false);
  const [valueInputAddList, setValueInputAddList] = useState<string>("");
  // edit title list
  const [editingListId, setEditingListId] = useState<string | null>(null);

  // handle card
  const [activeListAddCard, setActiveListAddCard] = useState<string | null>(
    null
  );
  const [newCardTitle, setNewCardTitle] = useState<string>("");

  // local
  const KEY_LOCAL = "tokenIdLogin";
  const CURR_BOARD = "currentBoard";
  const { dashboards } = useSelector((state: RootState) => state.boards);
  const { lists } = useSelector((state: RootState) => state.lists);
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const dispath = useDispatch<AppDispath>();
  const navigate = useNavigate();

  const [idBoardCurrent, setIdBoardCurrent] = useState(
    localStorage.getItem(CURR_BOARD)
  );
  const idUserLocal = localStorage.getItem(KEY_LOCAL);
  const listBoards = dashboards.filter((el) => el.user_id === idUserLocal);

  useEffect(() => {
    dispath(getDashboard());
    dispath(getList());
    dispath(getTask());
  }, [dispath]);

  const boardCurrent = dashboards.find(
    (el) => el.id === idBoardCurrent
  ) as Board;

  const listsOfBoardCurr = lists.filter(
    (el) => el.board_id === boardCurrent.id
  );

  const handleShowAddList = () => {
    setShowAddList(!showAddList);
    setShowTitleAddList(!showTitleAddList);
  };

  // add task
  const handleShowAddCard = (listId: string) => {
    if (activeListAddCard === listId) {
      setActiveListAddCard(null);
    } else {
      setActiveListAddCard(listId);
    }
    setNewCardTitle("");
  };

  const handleAddCard = async (listId: string) => {
    if (!newCardTitle.trim()) {
      showToastError("Tên card không được để trống");
      return;
    }

    const checkTitleCard = tasks.find(
      (el) => el.title.trim() === newCardTitle.trim()
    );
    if (checkTitleCard) {
      showToastError("Tên card không được trùng");
      return;
    }

    const newTask: Task = {
      id: uuidv4(),
      list_id: listId,
      title: newCardTitle.trim(),
      status: false,
      created_at: new Date().toISOString(),
      description: "",
      due_date: "",
    };

    try {
      await dispath(addTask(newTask)).unwrap();
      showToastSuccess("Thêm card thành công");
      dispath(getTask());
      setActiveListAddCard(null);
    } catch (error) {
      console.error(error);
      showToastError("Lỗi thêm card");
    }
  };

  const handleDeleteBoard = async () => {
    const updateBoard = { ...boardCurrent, is_closed: !boardCurrent.is_closed };

    try {
      await dispath(updateDashboard(updateBoard));
      const cancelBtn = document.getElementById("btnCloseBoard");
      cancelBtn?.click();

      navigate("/dashboard");
      localStorage.removeItem(CURR_BOARD);
    } catch (error) {
      console.error("Error: ", error);
      showToastError("Lỗi xóa board");
    }
  };

  // calendar
  const calendarRef = useRef(null);
  const [selectedInput, setSelectedInput] = useState<string | null>(null);

  const [isStartChecked, setIsStartChecked] = useState<boolean>(false);
  const [isDueChecked, setIsDueChecked] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCheckboxChange = (type: any) => {
    if (type === "start") {
      setIsStartChecked(!isStartChecked);
      setIsDueChecked(false);
      setSelectedInput(isStartChecked ? null : "#start-date");
    } else if (type === "due") {
      setIsDueChecked(!isDueChecked);
      setIsStartChecked(false);
      setSelectedInput(isDueChecked ? null : "#due-date");
    }
  };

  // khởi tạo Flatpickr
  const [startDate, setStartDate] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  useEffect(() => {
    if (calendarRef.current) {
      const fp = flatpickr(calendarRef.current, {
        inline: true,
        enableTime: true,
        dateFormat: "Z",
        onChange: function (_selectedDates, dateStr) {
          console.log("Date string from flatpickr:", dateStr);
          if (selectedInput) {
            const inputEl =
              document.querySelector<HTMLInputElement>(selectedInput);
            if (inputEl) {
              inputEl.value = dateStr;
            }

            if (selectedInput === "#start-date") {
              setStartDate(dateStr);
            } else if (selectedInput === "#due-date") {
              setDueDate(dateStr);
            }
          }
        },
      });

      return () => {
        fp.destroy();
      };
    }
  }, [selectedInput]);

  const saveDateValues = () => {
    const start = new Date(startDate);
    const due = new Date(dueDate);

    console.log(start);
    console.log(due);

    if (start < due) {
      showToastSuccess("Start date và Due date đúng");
    } else {
      showToastError("Start date phải nhỏ hơn Due date");
    }
  };
  const removeDateValues = () => {
    console.log("Remove clicked");
    document.getElementById("btnCloseModalEditTask")?.click();
  };

  // add list
  const handleAddAnotherList = async () => {
    if (!valueInputAddList) {
      showToastError("Tên list không được để trống");
      return;
    }

    const checkTitleList = lists.find(
      (el) => el.title.trim() === valueInputAddList.trim()
    );
    if (checkTitleList) {
      showToastError("Tên list không được trùng");
      return;
    }

    const dateNow = new Date().toISOString();
    const newList: List = {
      id: uuidv4(),
      board_id: idBoardCurrent!,
      title: valueInputAddList,
      created_at: dateNow,
    };

    try {
      await dispath(addList(newList)).unwrap();
      showToastSuccess("Thêm mới list thành công");
      setValueInputAddList("");
      dispath(getList());

      setShowTitleAddList(true);
      setShowAddList(false);
    } catch (error) {
      console.error("Error: ", error);
      showToastError("Lỗi thêm list");
    }
  };

  // update title list
  const [valueInputUpdateTitleList, setValueInputUpdateTitleList] =
    useState<string>("");
  const handleUpdateTitleList = async (listId: string) => {
    if (!valueInputUpdateTitleList) {
      showToastError("Tiêu đề danh sách không được trống");
      return;
    }

    try {
      const listToUpdate = lists.find((el) => el.id === listId);
      if (!listToUpdate) return;

      const updatedList = { ...listToUpdate, title: valueInputUpdateTitleList };
      await dispath(updateList(updatedList));
      dispath(getList());
      showToastSuccess("Cập nhật tiêu đề list thành công");
    } catch (error) {
      console.error(error);
      showToastError("Lỗi cập nhật tiêu đề list");
    }
  };

  // del list
  const [showCloseListModal, setShowCloseListModal] = useState(false);
  const [idListDel, setIdListDel] = useState<string>("");
  useEffect(() => {
    if (showCloseListModal) document.body.classList.add("modal-open");
    else document.body.classList.remove("modal-open");
  }, [showCloseListModal]);

  const handleDeleteList = async () => {
    if (!idListDel) return;

    try {
      const taskOfDeletedList: Task[] = tasks.filter(
        (el) => el.list_id === idListDel
      );
      if (taskOfDeletedList) {
        await Promise.all(
          taskOfDeletedList.map((el) => dispath(deleteTask(el.id)))
        );
      }

      await dispath(deleteList(idListDel));

      showToastSuccess("Xóa list thành công");
      dispath(getList());
    } catch (error) {
      console.error(error);
      showToastError("Lỗi xóa list");
    }
  };

  const [valueCkeditorData, setValueCkeditorData] = useState<string>("");
  const [idTaskCurrent, setIdTaskCurrent] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  useEffect(() => {
    setSelectedTask(tasks.find((el) => el.id === idTaskCurrent) || null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idTaskCurrent]);

  // change status task
  const handleClickCircleStatus = async (id: string) => {
    const selectedTask = tasks.find((el) => el.id === id);
    if (selectedTask) {
      const updatedTask: Task = {
        ...selectedTask,
        status: !selectedTask.status,
      };

      try {
        await dispath(updateTask(updatedTask));
        showToastSuccess("Thay đổi trạng thái thành công");

        dispath(getTask());
      } catch (error) {
        console.error(error);
        showToastError("Lỗi thay đổi trạng thái");
      }
    }
  };

  const handleClickCircleStatus2 = async (id: string) => {
    const chosedTask = tasks.find((el) => el.id === id);
    if (chosedTask) {
      const updatedTask: Task = {
        ...chosedTask,
        status: !chosedTask.status,
      };

      setSelectedTask(updatedTask);

      try {
        await dispath(updateTask(updatedTask));
        showToastSuccess("Thay đổi trạng thái thành công");

        dispath(getTask());
      } catch (error) {
        console.error(error);
        showToastError("Lỗi thay đổi trạng thái");
      }
    }
  };

  // edit task

  const handleUpdateTask = async () => {
    if (selectedTask) {
      if (!valueCkeditorData.trim()) {
        showToastError("Nội dung task không được để trống");
        return;
      }

      const updatedTask: Task = {
        ...selectedTask,
        description: valueCkeditorData,
        created_at: startDate,
        due_date: dueDate,
      };

      try {
        await dispath(updateTask(updatedTask));
        showToastSuccess("Chỉnh sửa task thành công");
        dispath(getTask());

        const cancelBtn = document.getElementById("btnCloseModalEditTask");
        cancelBtn?.click();
      } catch (error) {
        console.error(error);
        showToastError("Lỗi sửa task");
      }
    } else {
      showToastError("Không tìm thấy task được chọn");
    }
  };

  // delete task
  const handleDeleteTask = async () => {
    try {
      await dispath(deleteTask(selectedTask!.id));

      showToastSuccess("Xóa task thành công");
      dispath(getTask());

      const btnCloseModalDel = document.getElementById("btnCloseModalDelCard");
      btnCloseModalDel?.click();
      const cancelBtn = document.getElementById("btnCloseModalEditTask");
      cancelBtn?.click();
    } catch (error) {
      console.error(error);
      showToastError("Lỗi xóa task");
    }
  };

  // move task
  const [idListToMove, setIdListToMove] = useState<string>("");
  const handleMoveTask = async () => {
    if (!idListToMove) return;

    const updatedTask: Task = {
      ...selectedTask!,
      list_id: idListToMove,
    };
    try {
      await dispath(updateTask(updatedTask));
      showToastSuccess("Chuyển task thành công");
      dispath(getTask());

      const btnCloseMove = document.getElementById("btnCloseMove");
      btnCloseMove?.click();
    } catch (error) {
      console.error(error);
      showToastError("Lỗi xóa task");
    }
  };

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
              <a
                href=""
                className="item"
                onClick={() => navigate("/dashboard")}
              >
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
                {listBoards.map((board) => {
                  return (
                    <div
                      key={board.id}
                      className={`item ${
                        idBoardCurrent === board.id ? "clicked-item" : ""
                      }`}
                      onClick={() => {
                        localStorage.setItem(CURR_BOARD, board.id);
                        setIdBoardCurrent(board.id);
                      }}
                    >
                      <div
                        className="img"
                        style={
                          board.type === "color"
                            ? { background: board.backdrop }
                            : {
                                backgroundImage: `url(${board.backdrop})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }
                        }
                      ></div>
                      <span className="title-clamp">{board.title}</span>
                      {board.is_started ? (
                        <i className="fa-solid fa-star star-black"></i>
                      ) : (
                        <i className="fa-solid fa-star star-white"></i>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        <main className="main-detail">
          <div className="overlay-title">
            <div className="over-left">
              <span className="title" id="board-name">
                {boardCurrent.title}
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
            {listsOfBoardCurr.map((list) => {
              const isEditing = editingListId === list.id;
              return (
                <div className="item-toDo" key={list.id}>
                  <div className="heading">
                    {isEditing ? (
                      <input
                        type="text"
                        autoFocus
                        defaultValue={list.title}
                        onBlur={() => setEditingListId(null)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setEditingListId(null);
                            handleUpdateTitleList(list.id);
                          }
                        }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setValueInputUpdateTitleList(e.target.value)
                        }
                      />
                    ) : (
                      <span
                        onClick={() => setEditingListId(list.id)}
                        className="titleList"
                      >
                        {list.title}
                      </span>
                    )}
                    <div className="icon-util">
                      <img className="icon-arrow" src={arrowIcon} alt="arrow" />
                      <img className="icon-more" src={moreIcon} alt="more" />
                    </div>
                  </div>

                  <div className="list-item" id="list-item-task">
                    {tasks
                      .filter((task) => task.list_id === list.id)
                      .map((task: Task) => {
                        return (
                          <div key={task.id} className="one-item">
                            <i
                              className={`fa-solid fa-circle-check  ${
                                task.status ? "check-active" : ""
                              }`}
                              onClick={() => handleClickCircleStatus(task.id)}
                            ></i>
                            <span
                              data-bs-toggle="modal"
                              data-bs-target="#taskDetailModal"
                              onClick={() => {
                                setIdTaskCurrent(task.id);
                                setValueCkeditorData(task.description);
                              }}
                            >
                              {task.title}
                            </span>
                          </div>
                        );
                      })}
                  </div>

                  <div className="last-item">
                    {activeListAddCard !== list.id ? (
                      <div className="part-show">
                        <button
                          className="btnShowAddCard"
                          onClick={() => handleShowAddCard(list.id)}
                        >
                          <img src={btnAdd} alt="icon-add" />
                          <span>Add card</span>
                        </button>
                        <img
                          className="iconDelList"
                          src={addCardIcon}
                          alt="icon-add-card"
                          onClick={() => {
                            setIdListDel(list.id);
                            setShowCloseListModal(true);
                          }}
                        />
                      </div>
                    ) : (
                      <div className="addAnotherCard">
                        <textarea
                          placeholder="Add a card"
                          className="inputTitleCard"
                          value={newCardTitle}
                          onChange={(e) => setNewCardTitle(e.target.value)}
                        ></textarea>

                        <div className="confirm-add">
                          <button
                            className="btnAddCard"
                            onClick={() => handleAddCard(list.id)}
                          >
                            Add a card
                          </button>
                          <span
                            className="spanCloseCard"
                            onClick={() => setActiveListAddCard(null)}
                          >
                            ✖︎
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            <div className="item-toDo last-item-list">
              <div className="last-item">
                {showTitleAddList && (
                  <div className="part-show" id="btnShowAddList">
                    <button onClick={handleShowAddList}>
                      <img src={btnAdd} alt="icon-add" />
                      <span>Add another list</span>
                    </button>
                  </div>
                )}

                {showAddList && (
                  <div className="addAnotherList">
                    <input
                      autoFocus={true}
                      type="text"
                      placeholder="Add another list"
                      value={valueInputAddList}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setValueInputAddList(e.target.value);
                      }}
                    />
                    <div className="confirm-add">
                      <button id="btnAddList" onClick={handleAddAnotherList}>
                        Add another list
                      </button>
                      <span id="spanClose" onClick={handleShowAddList}>
                        ✖︎
                      </span>
                    </div>
                  </div>
                )}
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
                    <option defaultValue="">Select labels</option>
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
                  onClick={handleDeleteBoard}
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
      {showCloseListModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header popular">
                  <img src={comfirmCloseIcon} alt="icon-confirm" />
                  <p className="question">Are you sure?</p>
                  <p className="remind">You won't be able to revert this!</p>

                  <div className="d-flex justify-content-center list-btn">
                    <button
                      className="btn my-btn-create"
                      onClick={() => {
                        handleDeleteList();
                        setShowCloseListModal(false);
                      }}
                    >
                      Yes, delete it!
                    </button>
                    <button
                      className="btn my-btn-close"
                      onClick={() => setShowCloseListModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Modal Task Detail */}
      <div className="modal fade modal-lg" id="taskDetailModal" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header popular">
              <div className="header-modal">
                <div className="header-top">
                  <i
                    className={`fa-solid fa-circle-check  ${
                      selectedTask?.status ? "check-active" : ""
                    }`}
                    onClick={() => handleClickCircleStatus2(selectedTask!.id)}
                  />
                  <p>{selectedTask?.title}</p>
                </div>
                <div className="span-select">
                  <span>in list</span>
                  <div
                    className="select"
                    data-bs-toggle="modal"
                    data-bs-target="#moveDropdownModal"
                    // onclick="openMoveDropdownModal()"
                  >
                    {lists.find((el) => el.id === selectedTask?.list_id)?.title}
                  </div>
                </div>
              </div>

              <div className="content">
                <div className="main-detail-modal">
                  <div className="title">
                    <img src={describeIcon} alt="describe" />
                    <span>Description</span>
                  </div>

                  <div className="input-content">
                    <CKEditor
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-expect-error
                      editor={ClassicEditor}
                      data={valueCkeditorData}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onChange={(_event, editor: any) => {
                        const data = editor.getData();
                        setValueCkeditorData(data);
                      }}
                    />
                    <div className="btn-group">
                      <button onClick={handleUpdateTask}>Save</button>
                      <button
                        data-bs-dismiss="modal"
                        id="btnCloseModalEditTask"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>

                <div className="aside-modal">
                  {/* onclick="openEditLabelModal()" */}
                  <div
                    className="labels"
                    data-bs-toggle="modal"
                    data-bs-target="#editLabelModal"
                  >
                    <img src={labelsIcon} alt="labels" />
                    <span>Labels</span>
                  </div>

                  {/* onclick="openDateModal()" */}
                  <div
                    className="labels"
                    data-bs-toggle="modal"
                    data-bs-target="#dateModal"
                    onClick={() =>
                      document.getElementById("btnCloseModalEditTask")?.click()
                    }
                  >
                    <img src={dateIcon} alt="date" />
                    <span>Dates</span>
                  </div>

                  <div
                    className="labels"
                    id="confirm-delete"
                    data-bs-toggle="modal"
                    data-bs-target="#closeCardModal"
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
                id="btnCloseMove"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() =>
                  document.getElementById("btnCloseModalEditTask")?.click()
                }
              />
            </div>
            <div className="modal-body">
              <p>Select destination</p>
              <div className="boards">
                <h3>Board</h3>
                <input
                  type="text"
                  id="titleBoardOfTask"
                  disabled={true}
                  value={boardCurrent.title}
                />
              </div>
              <div className="list-po">
                <div className="list">
                  <h3>List</h3>
                  <select
                    id="listSelect"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setIdListToMove(e.target.value)
                    }
                  >
                    {listsOfBoardCurr.map((el) => {
                      return (
                        <option value={el.id} key={el.id}>
                          {el.title}
                        </option>
                      );
                    })}
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
                onClick={handleMoveTask}
                className="btn btn-primary me-auto"
              >
                Move
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal list labels dropdown */}
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
                onClick={() =>
                  document.getElementById("btnCloseModalEditTask")?.click()
                }
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
                  <div className="colorLabel color-green">done</div>
                  <img
                    src={penEdit}
                    alt="edit"
                    data-bs-toggle="modal"
                    data-bs-target="#editAndDelLabelModal"
                  />
                </div>

                <div className="itemLabel">
                  <input type="checkbox" />
                  <div className="colorLabel color-orange">urgent</div>
                  <img src={penEdit} alt="edit" />
                </div>

                <div className="itemLabel">
                  <input type="checkbox" />
                  <div className="colorLabel color-red">todo</div>
                  <img src={penEdit} alt="edit" />
                </div>

                <div className="itemLabel">
                  <input type="checkbox" />
                  <div className="colorLabel color-violet">in-progress</div>
                  <img src={penEdit} alt="edit" />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                id="openCreateLabelModal"
                data-bs-toggle="modal"
                data-bs-target="#labelModal"
              >
                Create a new label
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
                data-bs-toggle="modal"
                data-bs-target="#editLabelModal"
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
                data-bs-toggle="modal"
                data-bs-target="#editLabelModal"
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
                onClick={() => {
                  const modal1 = document.getElementById("taskDetailModal");
                  if (modal1) {
                    const modal = new bootstrap.Modal(modal1);
                    modal.show();
                  }
                }}
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            <div className="modal-body">
              <div ref={calendarRef}></div>

              <label style={{ marginTop: 25 }}>
                <input
                  type="checkbox"
                  checked={isStartChecked}
                  onChange={() => handleCheckboxChange("start")}
                />{" "}
                Start date
              </label>
              <input
                type="text"
                id="start-date"
                className="form-control"
                defaultValue={selectedTask?.created_at || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setStartDate(e.target.value)
                }
              />

              <label>
                <input
                  type="checkbox"
                  checked={isDueChecked}
                  onChange={() => handleCheckboxChange("due")}
                  defaultValue={""}
                />
                Due date
              </label>
              <input
                type="text"
                id="due-date"
                className="form-control"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDueDate(e.target.value)
                }
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={saveDateValues}
              >
                Save
              </button>
              <button
                className="btn btn-primary"
                onClick={removeDateValues}
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
                  onClick={handleDeleteTask}
                  type="button"
                  className="btn my-btn-create"
                >
                  Yes, delete it!
                </button>
                <button
                  id="btnCloseModalDelCard"
                  type="button"
                  className="btn my-btn-close"
                  data-bs-dismiss="modal"
                  onClick={() =>
                    document.getElementById("btnCloseModalEditTask")?.click()
                  }
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
