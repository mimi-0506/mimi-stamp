import { MODAL_KEYS } from "@/constants/keys";
import { useBoardStore } from "@/stores/useBoardStore";
import { useModalStore } from "@/stores/useModalStore";
import { Pressable, Text, View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import tw from "twrnc";

export default function SidebarNavigation({
  openMenu,
  closeMenu,
  translateX,
}: {
  openMenu: () => void;
  closeMenu: () => void;
  translateX: SharedValue<number>;
}) {
  const openModal = useModalStore((state) => state.openModal);
  const resetBoards = useBoardStore((state) => state.resetBoards);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const openNewBoardModal = () => {
    openModal(MODAL_KEYS.STAMPSTART_MODAL);
  };

  const resetAllBoards = () => {
    resetBoards();
  };

  return (
    <Animated.View
      style={[tw`absolute top-0 bottom-0 right-0 z-40`, animatedStyle]}
    >
      <View style={tw`absolute bottom-20 right-20`}>
        <Pressable
          onPress={openMenu}
          style={tw`w-30 h-10 bg-pink-500 rounded-md`}
        />
      </View>

      <View style={tw`flex-1 bg-black p-4`}>
        <Text style={tw`text-xl font-bold mb-4 text-white`}>1</Text>
        <Pressable onPress={closeMenu}>
          <Text style={tw`py-2 text-lg text-white`}>2</Text>
        </Pressable>
        <Pressable onPress={closeMenu}>
          <Text style={tw`py-2 text-lg text-white`}>3</Text>
        </Pressable>
        <Pressable onPress={closeMenu}>
          <Text style={tw`py-2 text-lg text-white`}>4</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}
