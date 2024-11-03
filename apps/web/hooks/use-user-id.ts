import { atom, useAtom } from "jotai";

// Initialize atom only if window is defined (i.e., in the browser)
const userIdAtom = atom(0);

export const useUserId = () => useAtom(userIdAtom);
