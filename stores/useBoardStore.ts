import { Board, StampBoardStateType } from "@/types/zustand";
import { create } from "zustand";

export const useBoardStore = create<StampBoardStateType>((set, get) => ({
  nowBoard: "",
  boards: {},

  setNowBoard: (boardId: string) =>
    set((state) => ({
      ...state,
      nowBoard: boardId,
    })),

  addBoard: (board: Board) =>
    set((state) => {
      return {
        ...state,
        boards: {
          ...state.boards,
          [board.title]: board,
        },
      };
    }),

  deleteBoard: (boardTitle: string) =>
    set((state) => {
      if (!state.boards[boardTitle]) return state;

      const { [boardTitle]: _, ...remainingBoards } = state.boards;

      return {
        ...state,
        boards: remainingBoards,
      };
    }),

  toggleStamp: (boardTitle: string, index: number, value?: boolean) =>
    set((state) => {
      const board = state.boards[boardTitle];
      if (!board) return state;

      if (index < 0 || index >= board.stamps.length) return state;

      const newStamps = [...board.stamps];
      newStamps[index] = value !== undefined ? value : !newStamps[index];

      return {
        ...state,
        boards: {
          ...state.boards,
          [boardTitle]: {
            ...board,
            stamps: newStamps,
            updatedAt: Date.now(),
          },
        },
      };
    }),

  isExistBoardName: (boardTitle: string) => {
    return Boolean(get().boards[boardTitle]);
  },
}));
