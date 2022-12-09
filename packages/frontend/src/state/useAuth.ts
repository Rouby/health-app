import { atom, useAtom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { useEffect } from "react";
import { trpc } from "../utils";

const sessionAuth = atomWithStorage<string | null>(
  "token",
  null,
  createJSONStorage(() => sessionStorage)
);
const persistentAuth = atomWithStorage<string | null>("token", null);

const auth = atom<
  Promise<string | null>,
  { token: string | null; persist: boolean }
>(
  async (get) => get(sessionAuth) ?? get(persistentAuth),
  (get, set, { token, persist }) => {
    if (persist) {
      set(persistentAuth, token);
      set(sessionAuth, null);
    } else {
      set(persistentAuth, null);
      set(sessionAuth, token);
    }
  }
);

export function useAuth() {
  return useAtom(auth);
}

export function useIsAuthenticated() {
  const [auth, setAuth] = useAuth();

  const { mutate } = trpc.auth.validate.useMutation({
    onError(error) {
      if (error?.data?.code === "UNAUTHORIZED") {
        setAuth({ token: null, persist: true });
      }
    },
  });

  useEffect(() => {
    if (auth) {
      mutate();
    }
  }, [auth]);

  return !!auth;
}
