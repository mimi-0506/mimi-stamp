import { useBoardStore } from "@/stores/useBoardStore";
import { FlatList, Pressable, Text, View } from "react-native";
import tw from "twrnc";

export default function TitleNavigation() {
  const boards = useBoardStore((state) => state.boards);
  const setNowBoard = useBoardStore((state) => state.setNowBoard);
  const nowBoard = useBoardStore((state) => state.nowBoard);

  const titles = Object.keys(boards);

  return (
    <View style={tw`w-full bg-white h-12 mt-5`}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`w-full flex-row `}
        data={titles}
        keyExtractor={(item) => item}
        renderItem={({ item: title }) => (
          <Pressable
            style={tw`w-30 flex justify-center align-center ${
              nowBoard === title ? "bg-gray-100" : "bg-gray-200"
            } rounded-t-xl border border-gray-300 border-b-0`}
            onPress={() => {
              setNowBoard(title);
            }}
          >
            <Text
              style={tw`w-full text-center text-gray-800 font-bold text-lg`}
            >
              {title}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}
