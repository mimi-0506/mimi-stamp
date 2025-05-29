import * as ImagePicker from "expo-image-picker";
import { Dispatch, SetStateAction } from "react";

export const selectImage = async (setBG: Dispatch<SetStateAction<string>>) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) console.log(result.assets[0].uri);

  if (result.assets && result.assets.length > 0) {
    const selectedImage = result.assets[0].uri;
    setBG(selectedImage);
  }
};
