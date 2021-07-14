import { Form, Input, message, Modal } from "antd";
import axios from "axios";
import React, { FC, useState } from "react";
import { Note } from "../interfaces/note";

interface Props {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

const { TextArea } = Input;

const NoteFormModal: FC<Props> = ({ visible, onCancel, onSuccess }) => {
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();

  const onSubmit = async () => {
    setSubmitting(true);

    try {
      const values = await form.validateFields();

      try {
        await axios.post<Note>("/api/v1/notes", values);
        message.success("Nota criada com sucesso.");
        onSuccess.call(null);
      } catch {
        message.error("Ocorreu um erro na sua solicitação. Tente novamente.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Criar nota"
      confirmLoading={submitting}
      okText="Criar nota"
      cancelText="Cancelar"
      onOk={onSubmit}
      onCancel={onCancel}
      afterClose={() => form.resetFields()}
      centered
    >
      <Form form={form} layout="vertical">
        <Form.Item name="title" label="Título" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Descrição"
          rules={[{ required: true }]}
        >
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NoteFormModal;
