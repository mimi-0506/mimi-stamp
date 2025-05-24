import { MODAL_KEYS } from "@/constants/modalkeys";
import { useBoardStore } from "@/stores/useBoardStore";
import { useModalStore } from "@/stores/useModalStore";
import { Picker } from "@react-native-picker/picker";
import { throttle } from "lodash";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

export default function StampStartModal() {
  const visible = useModalStore((state) => state.modals.stampStartModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const isExistBoardName = useBoardStore((state) => state.isExistBoardName);

  const [title, setTitle] = useState("");
  const [type, setType] = useState("포도알");
  const stampCountRef = useRef(7);

  const bgOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(bgOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      bgOpacity.setValue(0);
    }
  }, [visible]);

  const throttledValidateTitle = useRef(
    throttle((value) => {
      if (!isExistBoardName(value)) {
        useBoardStore.getState().addBoard(value, stampCountRef.current);
      }
    }, 500)
  ).current;

  useEffect(() => {
    throttledValidateTitle(title);
  }, [title]);

  const onSubmit = () => {
    closeModal(MODAL_KEYS.STAMPSTART_MODAL);
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={() => closeModal(MODAL_KEYS.STAMPSTART_MODAL)}
    >
      <Animated.View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: bgOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: ["transparent", "rgba(0, 0, 0, 0.5)"],
          }),
        }}
      >
        <View className="bg-white p-6 rounded-2xl w-3/4 shadow-lg">
          <Text className="text-lg font-bold mb-4 text-center">
            도장판 시작하기
          </Text>

          <View className="mb-4">
            <Text className="mb-1">제목</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              className="border border-gray-300 rounded px-2 py-1"
            />
          </View>

          <View className="mb-4">
            <Text className="mb-1">타입 선택</Text>

            <Picker
              selectedValue={type}
              onValueChange={(itemValue, itemIndex) => setType(itemValue)}
            >
              <Picker.Item label="포도알" value="포도알" />
              <Picker.Item label="커스텀" value="커스텀" />
            </Picker>
          </View>

          <View className="mb-4">
            <Text className="mb-1">도장 개수 (7~365)</Text>
            <TextInput
              keyboardType="numeric"
              className="border border-gray-300 rounded px-2 py-1"
            />
          </View>

          <Pressable
            onPress={onSubmit}
            className="bg-blue-500 px-4 py-2 rounded"
          >
            <Text className="text-white text-center">도장판 시작</Text>
          </Pressable>
        </View>
      </Animated.View>
    </Modal>
  );
}
