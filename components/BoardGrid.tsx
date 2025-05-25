import { Board } from "@/types/zustand";
import { memo, useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import tw from "twrnc";

// 개별 스탬프 컴포넌트, React.memo로 불필요한 재렌더링 방지
const Stamp = memo(function Stamp({
  filled,
  fillBG,
  emptyBG,
  onPress,
}: {
  filled: boolean;
  fillBG: string;
  emptyBG: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={tw`m-0.5`}>
      <View
        style={[
          tw`border rounded w-10 h-10`,
          { backgroundColor: filled ? fillBG : emptyBG },
        ]}
      />
    </Pressable>
  );
});

export default function BoardGrid({ board }: { board: Board }) {
  const [localStamps, setLocalStamps] = useState(board.stamps);

  // 페이지 떠날 때 전역 상태 갱신
  useEffect(() => {
    return () => {
      // 페이지 언마운트 시 전역 상태 업데이트
    };
  }, []);

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

  const numColumns = Math.floor(Math.sqrt(board.stamps.length)) || 1;

  return (
    <View style={tw`mt-5`}>
      <Text style={tw`w-full text-center text-lg font-bold mb-2`}>
        {board.title}
      </Text>

      <FlatList
        data={localStamps}
        numColumns={numColumns}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Stamp
            filled={item}
            fillBG={board.fillBG}
            emptyBG={board.emptyBG}
            onPress={() => handleToggle(index)}
          />
        )}
        scrollEnabled={false} // 스크롤 불필요하면 끄기
        removeClippedSubviews={true} // 성능 향상
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        windowSize={21}
      />
    </View>
  );
}
