import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles.css";
import { Layout } from "./Layout";
import { Home } from "./pages/Home";
import { ClockPage } from "./pages/Clock";
import { QrPage } from "./pages/Qr";
import { MarkdownPage } from "./pages/Markdown";
import { ColorPage } from "./pages/Color";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="clock" element={<ClockPage />} />
          <Route path="qr" element={<QrPage />} />
          <Route path="markdown" element={<MarkdownPage />} />
          <Route path="color" element={<ColorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
