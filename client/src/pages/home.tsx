import { Button, Card, Col, Layout, PageHeader, Row, Typography } from "antd";
import axios from "axios";
import React, { FC, useEffect, useMemo, useState } from "react";
import DeleteNoteButton from "../components/delete-note-button";
import NoteFormModal from "../components/note-form-modal";
import { Note } from "../interfaces/note";

const { Content } = Layout;
const { Paragraph, Title } = Typography;

const Home: FC = () => {
  const [notes, setNotes] = useState<Note[]>();
  const [showFormModal, setShowFormModal] = useState(false);

  const fetchNotes = async () => {
    const { data } = await axios.get<Note[]>("/api/v1/notes");
    setNotes(data);
  };

  const renderNotes = useMemo(
    () =>
      notes?.map(({ id, title, description }) => (
        <Col key={id} xs={24} sm={12} md={8} lg={6} xxl={4}>
          <DeleteNoteButton id={id} onSuccess={fetchNotes} />

          <Card>
            <Title level={5} ellipsis={{ tooltip: title }}>
              {title}
            </Title>

            <Paragraph
              ellipsis={{
                rows: 1,
                expandable: true,
                symbol: "ver mais",
              }}
              style={{ margin: 0, whiteSpace: "initial" }}
            >
              {description}
            </Paragraph>
          </Card>
        </Col>
      )),
    [notes]
  );

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <PageHeader
        title="Suas notas"
        extra={[
          <Button key="1" type="primary" onClick={() => setShowFormModal(true)}>
            Criar nota
          </Button>,
        ]}
      />

      <Content style={{ padding: "0 24px 16px" }}>
        <Row gutter={[16, 16]}>{renderNotes}</Row>
      </Content>

      <NoteFormModal
        visible={showFormModal}
        onCancel={() => setShowFormModal(false)}
        onSuccess={() => {
          setShowFormModal(false);
          fetchNotes();
        }}
      />
    </>
  );
};

export default Home;
