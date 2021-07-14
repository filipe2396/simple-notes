import { CloseOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, message, Modal } from "antd";
import axios from "axios";
import React, { FC } from "react";

interface Props {
  id: number;
  onSuccess: () => void;
}

const { confirm } = Modal;

const DeleteNoteButton: FC<Props> = ({ id, onSuccess }) => {
  const showConfirmation = () => {
    confirm({
      title: "Você tem certeza que deseja excluir essa nota?",
      icon: <ExclamationCircleOutlined />,
      okText: "Sim",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        return new Promise(async (resolve, reject) => {
          try {
            await axios.delete(`/api/v1/notes/${id}`);
            message.success("Nota excluída com sucesso.");
            onSuccess.call(null);
            resolve(true);
          } catch {
            message.error("Falha ao excluir nota.");
            reject();
          }
        });
      },
    });
  };

  return (
    <Button
      type="primary"
      shape="circle"
      icon={<CloseOutlined style={{ fontSize: 8 }} />}
      onClick={showConfirmation}
      style={{
        minWidth: 16,
        width: 16,
        height: 16,
        fontSize: 8,
        lineHeight: 1.2,
        position: "absolute",
        zIndex: 1,
        right: 2,
        top: -4,
      }}
      danger
    />
  );
};

export default DeleteNoteButton;
