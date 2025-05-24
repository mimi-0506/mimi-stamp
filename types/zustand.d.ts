interface ModalVisibility {
  modals: {
    [key in ModalKey]: boolean;
  };
}

interface ModalActions {
  openModal: (key: ModalKey) => void;
  closeModal: (key: ModalKey) => void;
}

type Board = {
  title: string;
  stampCount: number;
  stamps: boolean[];
  type: string; //나중에 constant하고 연결
  createdAt: number;
  updatedAt: number;
  fillBG: string;
  emptyBG: string;
};

export interface StampBoardStateType {
  nowBoard: string;
  boards: Record<string, Board>;

  setNowBoard: (boardTitle: string) => void;

  addBoard: (board: Board) => void;

  deleteBoard: (boardTitle: string) => void;

  toggleStamp: (boardTitle: string, index: number, value?: boolean) => void;

  isExistBoardName: (boardTitle: string) => boolean;
}

export type ModalStoreType = ModalVisibility & ModalActions;
export type ModalKeyType = (typeof MODAL_KEYS)[keyof typeof MODAL_KEYS];
