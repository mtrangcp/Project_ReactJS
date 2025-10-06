import "../css/Dashboard.css";
// import "toastify-js/src/toastify.min.css";

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

import bgBoard1 from "../assets/images/board-title1.jpg";
import bgBoard2 from "../assets/images/board-title2.jpg";
import bgBoard3 from "../assets/images/board-title3.jpg";
import bgBoard4 from "../assets/images/board-title4.jpg";

export default function Dashboard() {
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
              <a href="index.html" className="item">
                <img src={boardsIcon} alt="img boards" />
                <span>Boards</span>
              </a>

              <a href="#" className="item" id="renderStarredboard">
                <img src={starredBoardsIcon} alt="img starredBoards" />
                <span>Starred Boards</span>
              </a>

              <a href="#" className="item" id="renderClosedboard">
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

              <a href="#" className="item" onClick={() => alert("logout")}>
                <img src={signOutIcon} alt="img signOut" />
                <span>Sign out</span>
              </a>
            </div>
          </div>
        </aside>

        <main className="main">
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

          {/*  */}
          <div className="listBoards" id="listBoard">
            <div className="item-boards" style={{ backgroundColor: "red" }}>
              <p>Board Title 01</p>

              <div
                className="edit-board"
                data-bs-toggle="modal"
                data-bs-target="#scrollModalEdit"
              >
                <img src={editBoard} alt="img edit" />
                <span>Edit this board</span>
              </div>

              <i className="fa-solid fa-star"></i>
            </div>

            <div
              className="item-default"
              data-bs-toggle="modal"
              data-bs-target="#createModalBoard"
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

          <div className="listBoards" id="starredBoard"></div>

          <div className="yourWorkspaces" id="closed-title">
            <div className="workspaces-left">
              <img src={closedBoardsBlackIcon} alt="img Workspaces" />
              <span> Closed Boards</span>
            </div>
          </div>

          <div className="listBoards" id="closedBoard"></div>
        </main>
      </div>

      {/*  */}
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
                  {/* bg-img */}
                  <div className="item-bg bg-item item-bg-update">
                    <img className="img-bg" src={bgBoard1} alt="img1" />
                    <i className="fa-solid fa-circle-check img-tick"></i>
                  </div>

                  <div className="item-bg bg-item item-bg-update">
                    <img className="img-bg" src={bgBoard2} alt="img1" />
                    <i className="fa-solid fa-circle-check img-tick"></i>
                  </div>

                  <div className="item-bg bg-item item-bg-update">
                    <img className="img-bg" src={bgBoard3} alt="img1" />
                    <i className="fa-solid fa-circle-check img-tick"></i>
                  </div>

                  <div className="item-bg bg-item item-bg-update">
                    <img className="img-bg" src={bgBoard4} alt="img1" />
                    <i className="fa-solid fa-circle-check img-tick"></i>
                  </div>
                </div>
              </div>

              <div className="modal-background">
                <p>Color</p>
                <div className="list-background" id="list-color-create">
                  {/* bg-locor */}
                  <div
                    className="item-color bg-item item-color-update"
                    data-id="1" // Đổi 'data' thành 'data-id' hoặc 'data-tên-gì-đó' để tuân thủ quy tắc thuộc tính `data-*` trong React/JSX
                    style={{
                      background:
                        "linear-gradient(123deg, #ffb100 0%, #fa0c00 100%)",
                    }}
                  >
                    <i className="fa-solid fa-circle-check img-tick"></i>
                  </div>

                  {/* Màu 2: Xanh dương đến Tím */}
                  <div
                    className="item-color bg-item item-color-update"
                    data-id="2"
                    style={{
                      background:
                        "linear-gradient(123deg, #2609ff 0%, #d20cff 100%)",
                    }}
                  >
                    <i className="fa-solid fa-circle-check img-tick"></i>
                  </div>

                  {/* Màu 3: Xanh lá cây đến Xanh ngọc */}
                  <div
                    className="item-color bg-item item-color-update"
                    data-id="3"
                    style={{
                      background:
                        "linear-gradient(123deg, #00ff2f 0%, #00ffc8 100%)",
                    }}
                  >
                    <i className="fa-solid fa-circle-check img-tick"></i>
                  </div>

                  {/* Màu 4: Xanh ngọc đến Xanh dương */}
                  <div
                    className="item-color bg-item item-color-update"
                    data-id="4"
                    style={{
                      background:
                        "linear-gradient(123deg, #00ffe5 0%, #004bfa 100%)",
                    }}
                  >
                    <i className="fa-solid fa-circle-check img-tick"></i>
                  </div>

                  {/* Màu 5: Cam đến Vàng chanh */}
                  <div
                    className="item-color bg-item item-color-update"
                    data-id="5"
                    style={{
                      background:
                        "linear-gradient(123deg, #ffa200 0%, #edfa00 100%)",
                    }}
                  >
                    <i className="fa-solid fa-circle-check img-tick"></i>
                  </div>

                  {/* Màu 6: Hồng/Tím đến Đỏ */}
                  <div
                    className="item-color bg-item item-color-update"
                    data-id="6"
                    style={{
                      background:
                        "linear-gradient(123deg, #ff00ea 0%, #fa0c00 100%)",
                    }}
                  >
                    <i className="fa-solid fa-circle-check img-tick"></i>
                  </div>
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
                  {/* bg-img */}
                  <div className="item-bg bg-item item-bg-update">
                    <img className="img-bg" src={bgBoard1} alt="img1" />
                    <i className="fa-solid fa-circle-check img-tick"></i>
                  </div>

                  <div className="item-bg bg-item item-bg-update">
                    <img className="img-bg" src={bgBoard2} alt="img1" />
                    <i className="fa-solid fa-circle-check img-tick"></i>
                  </div>

                  <div className="item-bg bg-item item-bg-update">
                    <img className="img-bg" src={bgBoard3} alt="img1" />
                    <i className="fa-solid fa-circle-check img-tick"></i>
                  </div>

                  <div className="item-bg bg-item item-bg-update">
                    <img className="img-bg" src={bgBoard4} alt="img1" />
                    <i className="fa-solid fa-circle-check img-tick"></i>
                  </div>
                </div>
              </div>

              <div className="modal-background">
                <p>Color</p>
                <div className="list-background" id="list-color-up">
                  {/* bg-locor */}
                  <div
                    className="item-color bg-item item-color-update"
                    data-id="1" // Đổi 'data' thành 'data-id' hoặc 'data-tên-gì-đó' để tuân thủ quy tắc thuộc tính `data-*` trong React/JSX
                    style={{
                      background:
                        "linear-gradient(123deg, #ffb100 0%, #fa0c00 100%)",
                    }}
                  >
                    <i className="fa-solid fa-circle-check img-tick"></i>
                  </div>

                  {/* Màu 2: Xanh dương đến Tím */}
                  <div
                    className="item-color bg-item item-color-update"
                    data-id="2"
                    style={{
                      background:
                        "linear-gradient(123deg, #2609ff 0%, #d20cff 100%)",
                    }}
                  >
                    <i className="fa-solid fa-circle-check img-tick"></i>
                  </div>

                  {/* Màu 3: Xanh lá cây đến Xanh ngọc */}
                  <div
                    className="item-color bg-item item-color-update"
                    data-id="3"
                    style={{
                      background:
                        "linear-gradient(123deg, #00ff2f 0%, #00ffc8 100%)",
                    }}
                  >
                    <i className="fa-solid fa-circle-check img-tick"></i>
                  </div>

                  {/* Màu 4: Xanh ngọc đến Xanh dương */}
                  <div
                    className="item-color bg-item item-color-update"
                    data-id="4"
                    style={{
                      background:
                        "linear-gradient(123deg, #00ffe5 0%, #004bfa 100%)",
                    }}
                  >
                    <i className="fa-solid fa-circle-check img-tick"></i>
                  </div>

                  {/* Màu 5: Cam đến Vàng chanh */}
                  <div
                    className="item-color bg-item item-color-update"
                    data-id="5"
                    style={{
                      background:
                        "linear-gradient(123deg, #ffa200 0%, #edfa00 100%)",
                    }}
                  >
                    <i className="fa-solid fa-circle-check img-tick"></i>
                  </div>

                  {/* Màu 6: Hồng/Tím đến Đỏ */}
                  <div
                    className="item-color bg-item item-color-update"
                    data-id="6"
                    style={{
                      background:
                        "linear-gradient(123deg, #ff00ea 0%, #fa0c00 100%)",
                    }}
                  >
                    <i className="fa-solid fa-circle-check img-tick"></i>
                  </div>
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
