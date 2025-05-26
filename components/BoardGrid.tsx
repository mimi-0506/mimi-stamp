import useImageLoadTrack from "@/hooks/useImageLoadTrack";
import { Board } from "@/types/zustand";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import tw from "twrnc";
import Loading from "./Loading";
import Stamp from "./Stamp";

export default function BoardGrid({ board }: { board: Board }) {
  const { handleImageComplete, isAllLoaded } = useImageLoadTrack(
    board.stampCount
  );
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

  return (
    <>
      {isLoading && <Loading />}
      <View style={tw`mt-5`}>
        <Text style={tw`w-full text-center text-lg font-bold mb-2`}>
          {board.title}
        </Text>

        <FlatList
          data={localStamps}
          numColumns={board.stampCount}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Stamp
              filled={item}
              fillBG={board.fillBG}
              emptyBG={board.emptyBG}
              onPress={() => handleToggle(index)}
              handleImageComplete={handleImageComplete}
            />
          )}
          scrollEnabled={false} // 스크롤 불필요하면 끄기
          removeClippedSubviews={true} // 성능 향상
          initialNumToRender={20}
          maxToRenderPerBatch={20}
          windowSize={21}
        />
      </View>
    </>
  );
}
