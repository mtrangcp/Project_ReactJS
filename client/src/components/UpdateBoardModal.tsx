import { Modal, Input, Button } from "antd";
import { useState } from "react";

interface UpdateBoardModalProps {
  open: boolean;
  onClose: () => void;
}

export default function UpdateBoardModal({
  open,
  onClose,
}: UpdateBoardModalProps) {
  const [title, setTitle] = useState("");

  return (
    <Modal
      title="Update board"
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose} className="my-btn-close">
          Cancel
        </Button>,
        <Button key="save" type="primary" className="my-btn-create">
          Save
        </Button>,
      ]}
    >
      <div className="modal-title">
        <p>
          Board title <span>*</span>
        </p>
        <Input
          id="boardTitleUpdate"
          placeholder="Board 01..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
    </Modal>
  );
}
