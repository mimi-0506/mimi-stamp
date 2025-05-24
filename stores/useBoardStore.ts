import { StampBoardStateType } from "@/types/zustand";
import { create } from "zustand";

export const useBoardStore = create<StampBoardStateType>((set, get) => ({
  nowBoard: "",
  boards: {},

  setNowBoard: (boardId: string) =>
    set((state) => ({
      ...state,
      nowBoard: boardId,
    })),

  addBoard: (boardId: string, stampCount: number) =>
    set((state) => {
      if (state.boards[boardId]) return state;

      return {
        ...state,
        boards: {
          ...state.boards,
          [boardId]: Array(stampCount).fill(false),
        },
      };
    }),

  deleteBoard: (boardId: string) =>
    set((state) => {
      if (!state.boards[boardId]) return state;

      const { [boardId]: _, ...remainingBoards } = state.boards;

      return {
        ...state,
        boards: remainingBoards,
      };
    }),

  toggleStamp: (boardId: string, index: number, value?: boolean) =>
    set((state) => {
      if (!state.boards[boardId]) return state;

      if (index < 0 || index >= state.boards[boardId].length) return state;

      const newBoardStamps = [...state.boards[boardId]];
      newBoardStamps[index] =
        value !== undefined ? value : !newBoardStamps[index];

      return {
        ...state,
        boards: {
          ...state.boards,
          [boardId]: newBoardStamps,
        },
      };
    }),

  isExistBoardName: (boardId: string) => {
    return Boolean(get().boards[boardId]);
  },
}));
