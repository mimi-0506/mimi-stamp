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
  const [items, setItems] = useState([
    { label: "포도알", value: "포도알" },
    { label: "커스텀", value: "커스텀" },
  ]);

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
