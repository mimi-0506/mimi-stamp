import BoardGrid from "@/components/BoardGrid";
import SideNavigation from "@/components/SideNavigation";
import TitleNavigation from "@/components/TitleNavigation";
import { MODAL_KEYS } from "@/constants/keys";
import { useBoardStore } from "@/stores/useBoardStore";
import { useModalStore } from "@/stores/useModalStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { Dimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS, useSharedValue, withTiming } from "react-native-reanimated";
import tw from "twrnc";

export default function Index() {
  const openModal = useModalStore((state) => state.openModal);
  const boards = useBoardStore((state) => state.boards);
  const setBoards = useBoardStore((state) => state.setBoards);
  const nowBoard = useBoardStore((state) => state.nowBoard);
  const resetBoards = useBoardStore((state) => state.resetBoards);

  useEffect(() => {
    console.log(boards);
  }, [boards]);

  useEffect(() => {
    const loadBoards = async () => {
      try {
        const storedBoards = await AsyncStorage.getItem("mimistamp_boards");
        if (storedBoards) {
          const parsedBoards = JSON.parse(storedBoards);
          setBoards(parsedBoards);

          if (Object.keys(parsedBoards).length === 0)
            openModal(MODAL_KEYS.STAMPSTART_MODAL);
        }
      } catch (e) {
        console.error("Failed to load boards:", e);
      }
    };

    loadBoards();
  }, []);

  useEffect(() => {
    const storageSave = async () => {
      try {
        await AsyncStorage.setItem("mimistamp_boards", JSON.stringify(boards));
      } catch (e) {
        console.error("Failed to save boards:", e);
      }
    };

    storageSave();
  }, [boards]);

  //리팩토링때 훅으로 분리

  const { width } = Dimensions.get("window");
  const SIDEBAR_WIDTH = width * 0.3;

  const isOpen = useSharedValue(false);
  const translateX = useSharedValue(SIDEBAR_WIDTH);

  const openMenu = () => {
    translateX.value = withTiming(0, { duration: 250 });
    isOpen.value = true;
  };

  const closeMenu = () => {
    translateX.value = withTiming(SIDEBAR_WIDTH, { duration: 200 });
    isOpen.value = false;
  };

  const panGesture = Gesture.Pan().onUpdate((e) => {
    if (!isOpen.value && e.translationX < 0) runOnJS(openMenu)();
    else if (isOpen.value && e.translationX > 0) runOnJS(closeMenu)();
  });

  return (
    <GestureDetector gesture={panGesture}>
      <View style={tw`flex-col items-center justify-center bg-white p-4`}>
        <SideNavigation
          openMenu={openMenu}
          closeMenu={closeMenu}
          translateX={translateX}
        />
        <TitleNavigation />
        {nowBoard && boards[nowBoard] && <BoardGrid board={boards[nowBoard]} />}
      </View>
    </GestureDetector>
  );
}
