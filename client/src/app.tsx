import { ConfigProvider } from "antd";
import "antd/dist/antd.min.css";
import locale from "antd/lib/locale/pt_BR";
import React, { FC } from "react";
import Home from "./pages/home";

const App: FC = () => {
  return (
    <ConfigProvider locale={locale}>
      <Home />
    </ConfigProvider>
  );
};

export default App;
