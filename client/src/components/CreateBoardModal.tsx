import { Modal, Input, Button } from "antd";
import { useState } from "react";

interface CreateBoardModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateBoardModal({
  open,
  onClose,
}: CreateBoardModalProps) {
  const [title, setTitle] = useState("");

  return (
    <Modal
      title="Create board"
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose} className="my-btn-close">
          Close
        </Button>,
        <Button key="create" type="primary" className="my-btn-create">
          Create
        </Button>,
      ]}
    >
      <div className="modal-title">
        <p>
          Board title <span>*</span>
        </p>
        <Input
          id="boardTitle"
          placeholder="E.g. Shopping list for birthday..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
    </Modal>
  );
}
