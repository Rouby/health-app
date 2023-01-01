import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import minMax from "dayjs/plugin/minMax";
import relativeTime from "dayjs/plugin/relativeTime";
import weekday from "dayjs/plugin/weekday";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

dayjs.extend(duration);
dayjs.extend(minMax);
dayjs.extend(relativeTime);
dayjs.extend(weekday);

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
