import { BOARD_KEYS } from "@/constants/keys";
import { Dispatch, SetStateAction, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

export default function Selector({
  value,
  setValue,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(
    Object.values(BOARD_KEYS).map((v) => ({ label: v, value: v }))
  );

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      containerStyle={{ width: 200 }}
    />
  );
}
