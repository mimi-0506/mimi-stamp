import { MODAL_KEYS } from "@/constants/keys";
import useImageLoadTrack from "@/hooks/useImageLoadTrack";
import { useBoardStore } from "@/stores/useBoardStore";
import { useModalStore } from "@/stores/useModalStore";
import { Board } from "@/types/zustand";
import { selectImage } from "@/utils/imageUtils";
import { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import tw from "twrnc";
import Loading from "./Loading";
import Stamp from "./Stamp";

export default function BoardGrid({ board }: { board: Board }) {
  const { handleImageComplete, isAllLoaded } = useImageLoadTrack(
    board.stampCount
  );
  const deleteBoard = useBoardStore((state) => state.deleteBoard);
  const openModal = useModalStore((state) => state.openModal);
  const boards = useBoardStore((state) => state.boards);
  const setNowBoard = useBoardStore((state) => state.setNowBoard);
  const modifyBoard = useBoardStore((state) => state.modifyBoard);

  const [localStamps, setLocalStamps] = useState(board.stamps);
  const [isLoading, setIsLoading] = useState(true);

  const [nowStampSize, setNowStampSize] = useState(
    board.stampSize ? true : false
  );
  const [nowNumberView, setNowNumberView] = useState(board.numberView);
  const [nowBG, setNowBG] = useState(board.background);

  // 페이지 떠날 때 전역 상태 갱신
  useEffect(() => {
    return () => {
      modifyBoard(board.title, {
        background: nowBG,
        stamps: localStamps,
        stampSize: nowStampSize,
        numberView: nowNumberView,
      });
    };
  }, []);

  useEffect(() => {
    if (isAllLoaded) setIsLoading(false);
  }, [isAllLoaded]);

  // 스탬프 토글 핸들러 (로컬 상태만 갱신)
  const handleToggle = useCallback(
    (index: number) => {
      setLocalStamps((prev) => {
        const newStamps = [...prev];
        newStamps[index] = !newStamps[index];
        return newStamps;
      });
    },
    [setLocalStamps]
  );

  const onDeleteBoard = () => {
    if (Object.keys(boards).length === 1)
      openModal(MODAL_KEYS.STAMPSTART_MODAL);
    else setNowBoard(Object.keys(boards)[1]);

    deleteBoard(board.title);
  };

  const onChangeStampSize = () => {
    setNowStampSize((x) => !x);
  };

  const onChangeNumberView = () => {
    setNowNumberView((x) => !x);
  };

  const onChangeBackground = () => {
    selectImage(setNowBG);
  };

  return (
    <>
      {isLoading && <Loading />}
      <View style={tw`mt-5 bg-transparent flex-col items-center justfiy-start`}>
        <View style={tw`w-full flex-row justify-between items-center mb-2`}>
          <View style={tw`w-50 flex-row justify-between`}>
            <Pressable onPress={onChangeStampSize}>
              <Text>{nowStampSize ? "작게" : "크게"}</Text>
            </Pressable>

            <Pressable onPress={onChangeNumberView}>
              <Text>숫자표시</Text>
            </Pressable>

            <Pressable onPress={onChangeBackground}>
              <Text>배경 바꾸기</Text>
            </Pressable>
          </View>
          <Pressable onPress={onDeleteBoard}>
            <Text>삭제</Text>
          </Pressable>
        </View>

        <View style={tw`w-full flex items-center justify-center`}>
          <ScrollView
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start",
            }}
          >
            {localStamps.map((item, index) => (
              <Stamp
                key={index}
                filled={item}
                fillBG={board.fillBG}
                emptyBG={board.emptyBG}
                onPress={() => handleToggle(index)}
                handleImageComplete={handleImageComplete}
                size={nowStampSize}
                numberView={nowNumberView}
                index={index + 1}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
}
