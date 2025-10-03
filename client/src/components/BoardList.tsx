import editBoard from "../assets/icons/edit-board.png";

interface BoardListProps {
  boards?: string[];
}

export default function BoardList({ boards }: BoardListProps) {
  return (
    <div className="listBoards" id="listBoard">
      {boards &&
        boards.map((board, index) => (
          <div key={index} className="item-boards">
            <p>{board}</p>
            <div className="edit-board">
              <img src={editBoard} alt="edit" />
              <span>Edit this board</span>
            </div>
            <i className="fa-solid fa-star"></i>
          </div>
        ))}
    </div>
  );
}
