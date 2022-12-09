import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import minMax from "dayjs/plugin/minMax";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

dayjs.extend(duration);
dayjs.extend(minMax);

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
