import "../css/Dashboard.css";
import "../css/GeneralStyle.css";

import trelloLogoFull from "../assets/images/trello-logo-full.png";
import boardsIcon from "../assets/icons/boards.png";
import starredBoardsIcon from "../assets/icons/starredBoards.png";
import closedBoardsIcon from "../assets/icons/closedBoards.png";
import settingIcon from "../assets/icons/setting.png";
import signOutIcon from "../assets/icons/signOut.png";
import boardsBlackIcon from "../assets/icons/boards-black.png";
import starredBoardsBlackIcon from "../assets/icons/starredBoards-black.png";
import closedBoardsBlackIcon from "../assets/icons/closedBoards-black.png";
import calenderIcon from "../assets/icons/calender.png";
import btnSelectIcon from "../assets/icons/btn-select.png";
import toggleSearchIcon from "../assets/icons/toggle-search.png";
import toggleNavigationIcon from "../assets/icons/toggle-navigation.png";
import editBoard from "../assets/icons/edit-board.png";

import { imageBackgrounds, colorBackgrounds } from "../utils/backgrounds";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Modal } from "bootstrap";
import type { AppDispath, RootState } from "../store/store";
import {
  addDashboard,
  getDashboard,
  updateDashboard,
} from "../slices/dashboardSlice";
import { showToastError, showToastSuccess } from "../utils/toast";
import type { Board } from "../utils/types";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [currentBoard, setCurrentBoard] = useState<string>("");
  const KEY_LOCAL = "tokenIdLogin";
  const CURR_BOARD = "currentBoard";
  const { dashboards } = useSelector((state: RootState) => state.boards);
  const dispath = useDispatch<AppDispath>();
  const navigate = useNavigate();

  let idUserLocal = localStorage.getItem(KEY_LOCAL);
  const [inputTitleAdd, setInputTitleAdd] = useState<string>("");
  const [selectedBg, setSelectedBg] = useState<string>("");
  const [selectedType, setSelectedType] = useState<"image" | "color" | "">("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [boardEditing, setBoardEditing] = useState<any>(null);
  const [inputTitleEdit, setInputTitleEdit] = useState<string>("");
  const [selectedBgEdit, setSelectedBgEdit] = useState<string>("");
  const [selectedTypeEdit, setSelectedTypeEdit] = useState<
    "image" | "color" | ""
  >("");

  const [activeSection, setActiveSection] = useState<
    "boards" | "starred" | "closed"
  >("boards");

  useEffect(() => {
    dispath(getDashboard());
  }, [dispath]);

  const listBoards = dashboards.filter(
    (el) => el.user_id === idUserLocal && !el.is_closed
  );
  const listStarredBoards = dashboards.filter(
    (el) => el.user_id === idUserLocal && el.is_started
  );
  const listClosedBoards = dashboards.filter(
    (el) => el.user_id === idUserLocal && el.is_closed
  );

  const handleSelectBackground = (value: string, type: "image" | "color") => {
    setSelectedBg(value);
    setSelectedType(type);
  };

  const handleClickAdd = async () => {
    if (!inputTitleAdd) {
      showToastError("Title không được phép trống");
      return;
    }

    const listB: Board[] = [...listBoards, ...listClosedBoards];
    const checkDup = listB.find((el) => el.title === inputTitleAdd);

    if (checkDup) {
      showToastError("Title không được phép trùng");
      return;
    }

    let bg: string = selectedBg;
    let type = selectedType;

    if (!type) {
      bg = imageBackgrounds[0];
      type = "image";
    }

    const dateNow = new Date().toISOString();
    const newBoard = {
      id: uuidv4(),
      user_id: idUserLocal || "",
      title: inputTitleAdd,
      description: "",
      backdrop: bg,
      type: type,
      is_started: false,
      is_closed: false,
      created_at: dateNow,
    };

    try {
      await dispath(addDashboard(newBoard)).unwrap();
      showToastSuccess("Thêm mới board thành công");
      setInputTitleAdd("");
      setSelectedBg("");
      setSelectedType("");
      dispath(getDashboard());

      const modalElement = document.getElementById("createModalBoard");
      if (modalElement) {
        const modalInstance =
          Modal.getInstance(modalElement) || new Modal(modalElement);

        modalInstance.hide();

        modalElement.addEventListener(
          "hidden.bs.modal",
          () => {
            Modal.getInstance(modalElement)?.dispose();
            document.body.classList.remove("modal-open");

            const backdrop = document.querySelector(".modal-backdrop");
            if (backdrop) backdrop.remove();
          },
          { once: true }
        );
      }
    } catch (error) {
      console.error("Error: ", error);
      showToastError("Lỗi thêm board");
    }
  };

  const handleOpenEditModal = (board: Board) => {
    setBoardEditing(board);
    setInputTitleEdit(board.title);
    setSelectedBgEdit(board.backdrop);
    setSelectedTypeEdit(board.type as "image" | "color" | "");

    const modalElement = document.getElementById("scrollModalEdit");
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  };

  const handleClickUpdate = async () => {
    if (!inputTitleEdit) {
      showToastError("Title không được phép trống");
      return;
    }

    if (!boardEditing) return;

    const updatedBoard = {
      ...boardEditing,
      title: inputTitleEdit,
      backdrop: selectedBgEdit,
      type: selectedTypeEdit,
    };

    try {
      await dispath(updateDashboard(updatedBoard)).unwrap();
      showToastSuccess("Cập nhật board thành công");
      dispath(getDashboard());

      const modalElement = document.getElementById("scrollModalEdit");
      if (modalElement) {
        const modal = Modal.getInstance(modalElement);
        modal?.hide();
      }
      document.body.classList.remove("modal-open");
      document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
    } catch (error) {
      console.error("Error: ", error);
      showToastError("Lỗi cập nhật board");
    }
  };

  const handleClickBoardToBoarddetail = (id: string) => {
    setCurrentBoard(id);
    console.log("curr board: ", currentBoard);

    localStorage.setItem(CURR_BOARD, id);
    navigate("/dashboardDetail");
  };

  const handleClickedStar = async (idBoard: string) => {
    const listB: Board[] = [...listBoards, ...listClosedBoards];
    const seledtedBoard = listB.find((el) => el.id === idBoard);

    if (seledtedBoard) {
      const updateBoard = {
        ...seledtedBoard,
        is_started: !seledtedBoard.is_started,
      };

      try {
        await dispath(updateDashboard(updateBoard));
        showToastSuccess("Thay đổi trạng thái thành công");

        dispath(getDashboard());
      } catch (error) {
        console.error("Error: ", error);
        showToastError("Lỗi đánh dấu sao");
      }
    }
  };

  const handleLogout = () => {
    idUserLocal = "";
    localStorage.removeItem(KEY_LOCAL);
    navigate("/login");
  };

  return (
    <>
      <header className="header">
        <div className="div-logo">
          <img src={trelloLogoFull} alt="img full logo" />
        </div>

        <div className="search-navigation">
          <img className="search" src={toggleSearchIcon} alt="img search " />
          <img
            className="navigation"
            src={toggleNavigationIcon}
            alt="img navigation "
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          />
        </div>
      </header>

      <div className="my-container">
        <aside className="aside">
          <p>YOUR WORKSPACES</p>

          <div className="workspaces">
            <div className="boards">
              <a
                href="#"
                className={`item ${
                  activeSection === "boards" ? "clicked-item" : ""
                }`}
                onClick={() => setActiveSection("boards")}
              >
                <img src={boardsIcon} alt="img boards" />
                <span>Boards</span>
              </a>

              <a
                href="#"
                className={`item ${
                  activeSection === "starred" ? "clicked-item" : ""
                }`}
                onClick={() => setActiveSection("starred")}
              >
                <img src={starredBoardsIcon} alt="img starredBoards" />
                <span>Starred Boards</span>
              </a>

              <a
                href="#"
                className={`item ${
                  activeSection === "closed" ? "clicked-item" : ""
                }`}
                onClick={() => setActiveSection("closed")}
              >
                <img src={closedBoardsIcon} alt="img closedBoards" />
                <span>Closed Boards</span>
              </a>
            </div>

            <div className="line"></div>

            <div className="boards">
              <a href="" className="item">
                <img src={settingIcon} alt="img setting" />
                <span>Settings</span>
              </a>

              <a href="" className="item" onClick={handleLogout}>
                <img src={signOutIcon} alt="img signOut" />
                <span>Sign out</span>
              </a>
            </div>
          </div>
        </aside>

        <main className="main">
          {activeSection === "boards" && (
            <>
              <div className="yourWorkspaces">
                <div className="workspaces-left">
                  <img src={boardsBlackIcon} alt="img Workspaces" />
                  <span> Your Workspaces</span>
                </div>

                <div className="workspaces-right">
                  <div className="btn-gr">
                    <button className="btn-share">Share</button>
                    <button className="btn-export">Export</button>
                  </div>

                  <div className="select-time">
                    <img src={calenderIcon} alt="img calender" />
                    <span>This week</span>
                    <img
                      className="btn-select"
                      src={btnSelectIcon}
                      alt="img select"
                    />
                  </div>
                </div>
              </div>

              <div className="listBoards bg-img" id="listBoard">
                {listBoards.map((el) => {
                  return (
                    <div
                      key={el.id}
                      className="item-boards"
                      style={
                        el.type === "color"
                          ? { background: el.backdrop }
                          : {
                              backgroundImage: `url(${
                                el.backdrop || imageBackgrounds[0]
                              })`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }
                      }
                    >
                      <p onClick={() => handleClickBoardToBoarddetail(el.id)}>
                        {el.title}
                      </p>

                      <div
                        className="edit-board"
                        onClick={() => handleOpenEditModal(el)}
                      >
                        <img src={editBoard} alt="img edit" />
                        <span>Edit this board</span>
                      </div>

                      <i
                        className={`fa-solid fa-star ${
                          el.is_started ? "isStarred" : ""
                        }`}
                        onClick={() => handleClickedStar(el.id)}
                      ></i>
                    </div>
                  );
                })}

                <div
                  className="item-default"
                  onClick={() => {
                    const modalElement =
                      document.getElementById("createModalBoard");
                    if (modalElement) {
                      const modal = new Modal(modalElement);
                      modal.show();
                    }
                  }}
                >
                  <p>Create new board</p>
                </div>
              </div>

              <div className="yourWorkspaces" id="starred-title">
                <div className="workspaces-left">
                  <img src={starredBoardsBlackIcon} alt="img Workspaces" />
                  <span> Starred Boards</span>
                </div>
              </div>

              <div className="listBoards" id="starredBoard">
                {listStarredBoards.map((el) => (
                  <div
                    key={el.id}
                    className="item-boards"
                    style={
                      el.type === "color"
                        ? { background: el.backdrop }
                        : { backgroundImage: `url(${el.backdrop})` }
                    }
                  >
                    <p onClick={() => handleClickBoardToBoarddetail(el.id)}>
                      {el.title}
                    </p>
                    <div
                      className="edit-board"
                      onClick={() => handleOpenEditModal(el)}
                    >
                      <img src={editBoard} alt="img edit" />
                      <span>Edit this board</span>
                    </div>
                    <i
                      className={`fa-solid fa-star ${
                        el.is_started ? "isStarred" : ""
                      }`}
                    ></i>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeSection === "starred" && (
            <>
              <div className="yourWorkspaces" id="starred-title">
                <div className="workspaces-left">
                  <img src={starredBoardsBlackIcon} alt="img Workspaces" />
                  <span> Starred Boards</span>
                </div>
              </div>

              <div className="listBoards" id="starredBoard">
                {listStarredBoards.map((el) => (
                  <div
                    key={el.id}
                    className="item-boards"
                    style={
                      el.type === "color"
                        ? { background: el.backdrop }
                        : { backgroundImage: `url(${el.backdrop})` }
                    }
                  >
                    <p onClick={() => handleClickBoardToBoarddetail(el.id)}>
                      {el.title}
                    </p>
                    <div
                      className="edit-board"
                      onClick={() => handleOpenEditModal(el)}
                    >
                      <img src={editBoard} alt="img edit" />
                      <span>Edit this board</span>
                    </div>
                    <i
                      className={`fa-solid fa-star ${
                        el.is_started ? "isStarred" : ""
                      }`}
                    ></i>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Closed Boards */}
          {activeSection === "closed" && (
            <>
              <div className="yourWorkspaces" id="closed-title">
                <div className="workspaces-left">
                  <img src={closedBoardsBlackIcon} alt="img Workspaces" />
                  <span> Closed Boards</span>
                </div>
              </div>

              <div className="listBoards" id="closedBoard">
                {listClosedBoards.map((el) => (
                  <div
                    key={el.id}
                    className="item-boards"
                    style={
                      el.type === "color"
                        ? { background: el.backdrop }
                        : { backgroundImage: `url(${el.backdrop})` }
                    }
                    onClick={() => handleClickBoardToBoarddetail(el.id)}
                  >
                    <p onClick={() => handleClickBoardToBoarddetail(el.id)}>
                      {el.title}
                    </p>
                    <div
                      className="edit-board"
                      onClick={() => handleOpenEditModal(el)}
                    >
                      <img src={editBoard} alt="img edit" />
                      <span>Edit this board</span>
                    </div>
                    <i
                      className={`fa-solid fa-star ${
                        el.is_started ? "isStarred" : ""
                      }`}
                    ></i>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>

      {/* offcanvas */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-body d-flex justify-content-start">
          <img className="logo-full" src={trelloLogoFull} alt="img full logo" />

          <p>YOUR WORKSPACES</p>

          <div className="workspaces workspaces-off">
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

            <div className="line"></div>

            <div className="boards">
              <a href="#" className="item">
                <img src={settingIcon} alt="img setting" />
                <span>Settings</span>
              </a>

              <a href="#" className="item">
                <img src={signOutIcon} alt="img signOut" />
                <span>Sign out</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Create new board */}
      <div className="modal fade" id="createModalBoard" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Create board</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>
            <div className="modal-body">
              <div className="modal-background">
                <p>Background</p>
                <div className="list-background" id="list-bg-create">
                  {imageBackgrounds.map((img, index) => (
                    <div
                      key={index}
                      className="item-bg bg-item item-bg-update"
                      onClick={() => handleSelectBackground(img, "image")}
                    >
                      <img
                        className="img-bg"
                        src={img}
                        alt={`bg-${index + 1}`}
                      />
                      <i
                        className={`fa-solid fa-circle-check img-tick ${
                          selectedBg === img ? "check-active" : ""
                        }`}
                      ></i>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-background">
                <p>Color</p>
                <div className="list-background" id="list-color-create">
                  {colorBackgrounds.map((color, index) => (
                    <div
                      key={index}
                      className="item-color bg-item item-color-update"
                      style={{ background: color }}
                      onClick={() => handleSelectBackground(color, "color")}
                    >
                      <i
                        className={`fa-solid fa-circle-check img-tick ${
                          selectedBg === color ? "check-active" : ""
                        }`}
                      ></i>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-title">
                <p>
                  Board title <span>*</span>
                </p>
                <div className="title">
                  <input
                    id="boardTitle"
                    type="text"
                    placeholder="E.g. Shopping list for birthday..."
                    value={inputTitleAdd}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setInputTitleAdd(e.target.value)
                    }
                  />
                  <p>👋 Please provide a valid board title.</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn my-btn-close"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                id="btnCreateBoard"
                className="btn my-btn-create"
                onClick={handleClickAdd}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Update board */}
      <div className="modal fade" id="scrollModalEdit" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Update board</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>

            <div className="modal-body">
              <div className="modal-background">
                <p>Background</p>
                <div className="list-background" id="list-bg-up">
                  {imageBackgrounds.map((img, index) => (
                    <div
                      key={index}
                      className="item-bg bg-item item-bg-update"
                      onClick={() => {
                        setSelectedBgEdit(img);
                        setSelectedTypeEdit("image");
                      }}
                    >
                      <img className="img-bg" src={img} alt={`img-${index}`} />
                      <i
                        className={`fa-solid fa-circle-check img-tick ${
                          selectedBgEdit === img ? "check-active" : ""
                        }`}
                      ></i>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-background">
                <p>Color</p>
                <div className="list-background" id="list-color-up">
                  {colorBackgrounds.map((color, index) => (
                    <div
                      key={index}
                      className="item-color bg-item item-color-update"
                      style={{ background: color }}
                      onClick={() => {
                        setSelectedBgEdit(color);
                        setSelectedTypeEdit("color");
                      }}
                    >
                      <i
                        className={`fa-solid fa-circle-check img-tick ${
                          selectedBgEdit === color ? "check-active" : ""
                        }`}
                      ></i>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-title">
                <p>
                  Board title <span>*</span>
                </p>
                <div className="title">
                  <input
                    id="boardTitleUpdate"
                    type="text"
                    placeholder="Board 01..."
                    value={inputTitleEdit}
                    onChange={(e) => setInputTitleEdit(e.target.value)}
                  />
                  <p>👋 Please provide a valid board title.</p>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn my-btn-close"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                id="btnUpdateBoard"
                className="btn my-btn-create"
                onClick={handleClickUpdate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
