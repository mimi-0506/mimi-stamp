import { MODAL_KEYS } from "@/constants/keys";
import useImageLoadTrack from "@/hooks/useImageLoadTrack";
import { useBoardStore } from "@/stores/useBoardStore";
import { useModalStore } from "@/stores/useModalStore";
import { Board } from "@/types/zustand";
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

  const [localStamps, setLocalStamps] = useState(board.stamps);
  const [isLoading, setIsLoading] = useState(true);

  // 페이지 떠날 때 전역 상태 갱신
  useEffect(() => {
    return () => {
      // 페이지 언마운트 시 전역 상태 업데이트
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

  return (
    <>
      {isLoading && <Loading />}
      <View style={tw`mt-5 bg-transparent flex-col items-center`}>
        <View style={tw`flex-row justify-between items-center mb-2`}>
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
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
}
