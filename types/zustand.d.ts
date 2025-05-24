interface ModalVisibility {
  modals: {
    [key in ModalKey]: boolean;
  };
}

interface ModalActions {
  openModal: (key: ModalKey) => void;
  closeModal: (key: ModalKey) => void;
}

export interface StampBoardStateType {
  nowBoard: string;
  boards: Record<string, boolean[]>;
  setNowBoard: (boardId: string) => void;
  addBoard: (boardId: string, stampCount: number) => void;
  deleteBoard: (boardId: string) => void;
  toggleStamp: (boardId: string, index: number, value?: boolean) => void;
  isExistBoardName: (boardId: string) => boolean;
}

export type ModalStoreType = ModalVisibility & ModalActions;
export type ModalKeyType = (typeof MODAL_KEYS)[keyof typeof MODAL_KEYS];
