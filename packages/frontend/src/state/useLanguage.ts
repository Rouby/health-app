import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const supportedLanguages = ["en", "de"];

const navigatorLanguage = import.meta.env.DEV
  ? "en" // always use default in dev mode
  : navigator.language.split("-")[0];
const language = atomWithStorage(
  "language",
  supportedLanguages.includes(navigatorLanguage) ? navigatorLanguage : "en"
);

export function useLanguage() {
  return useAtom(language);
}
