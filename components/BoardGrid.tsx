import { Board } from "@/types/zustand";
import React from "react";
import { useWindowDimensions, View } from "react-native";

export default function BoardGrid({ board }: { board: Board }) {
  const { width } = useWindowDimensions();

  // 최적의 열 개수 계산 (최소 7개 ~ 최대 365개)
  const numColumns = Math.floor(Math.sqrt(board.stampCount));
  const size = Math.floor((width - 40) / numColumns) - 4; // 20px 여백 양옆, 4px 간격

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 4,
        marginTop: 20,
      }}
    >
      {board.stamps.map((filled, index) => (
        <View
          key={index}
          style={{
            width: size,
            height: size,
            backgroundColor: filled ? "black" : "white",
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 4,
          }}
        />
      ))}
    </View>
  );
}
