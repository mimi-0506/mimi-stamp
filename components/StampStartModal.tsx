import { BOARD_KEYS, MODAL_KEYS } from "@/constants/keys";
import { useBoardStore } from "@/stores/useBoardStore";
import { useModalStore } from "@/stores/useModalStore";
import Slider from "@react-native-community/slider";
import { throttle } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Keyboard,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import tw from "twrnc";

import CustomImagePicker from "./CustomImagePicker";
import DefaultColorPicker from "./DefaultColorPicker";
import Selector from "./Selector";

export default function StampStartModal() {
  const visible = useModalStore((state) => state.modals.stampStartModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const isExistBoardName = useBoardStore((state) => state.isExistBoardName);
  const addBoard = useBoardStore((state) => state.addBoard);

  const [title, setTitle] = useState("");
  const [value, setValue] = useState(BOARD_KEYS.DEFAULT);
  const [count, setCount] = useState(7);

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
      if (!isExistBoardName(value) && value.length > 0) {
        // Validation logic (empty here)
      }
    }, 500)
  ).current;

  useEffect(() => {
    throttledValidateTitle(title);
  }, [title]);

  const onSubmit = () => {
    addBoard({
      title: title,
      stampCount: count,
      stamps: Array(count).fill(false),
      type: value,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      fillBG: "black",
      emptyBG: "white",
    });

    closeModal(MODAL_KEYS.STAMPSTART_MODAL);
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={() => closeModal(MODAL_KEYS.STAMPSTART_MODAL)}
    >
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        accessible={false}
      >
        <Animated.View
          style={[
            {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            },
            {
              backgroundColor: bgOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: ["transparent", "rgba(0, 0, 0, 0.5)"],
              }),
            },
          ]}
        >
          <View style={tw`bg-white p-6 rounded-2xl w-3/4 shadow-lg`}>
            <Text style={tw`text-lg font-bold mb-4 text-center`}>
              도장판 시작하기
            </Text>

            <View style={tw`mb-4`}>
              <Text style={tw`mb-1`}>제목</Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                style={tw`border border-gray-300 rounded px-2 py-1`}
              />
            </View>

            <View style={tw`mb-4`}>
              <Text style={tw`mb-1`}>도장판 타입</Text>
              <Selector value={value} setValue={setValue} />
            </View>

            {value === BOARD_KEYS.CUSTOM && <CustomImagePicker />}
            {value === BOARD_KEYS.DEFAULT && <DefaultColorPicker />}

            <View style={tw`mb-4`}>
              <Text style={tw`mb-1`}>도장 개수: {count}개</Text>
              <View style={tw`flex-row items-center space-x-2`}>
                <Pressable onPress={() => setCount(Math.max(7, count - 1))}>
                  <Text style={tw`text-xl px-2`}>−</Text>
                </Pressable>
                <Slider
                  style={{ flex: 1, height: 40 }}
                  minimumValue={7}
                  maximumValue={365}
                  step={1}
                  value={count}
                  onValueChange={setCount}
                  minimumTrackTintColor="#000000"
                  maximumTrackTintColor="#dddddd"
                />
                <Pressable onPress={() => setCount(Math.min(365, count + 1))}>
                  <Text style={tw`text-xl px-2`}>＋</Text>
                </Pressable>
              </View>
            </View>

            <Pressable
              onPress={onSubmit}
              style={tw`bg-blue-500 px-4 py-2 rounded`}
            >
              <Text style={tw`text-white text-center`}>도장판 시작</Text>
            </Pressable>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
