import {
  View,
  StyleSheet,
  TextInput,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { COLORS } from "../../constants/COLORS";

interface Props {
  text1?: string;
  onChangeText1?: (v: string) => void;
  text2?: string;
  onChangeText2?: (v: string) => void;
  input1Style?: StyleProp<TextStyle>;
  input2Style?: StyleProp<TextStyle>;
  disabled1?: boolean;
  disabled2?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const InputSecondary = ({
  text1,
  onChangeText1,
  text2,
  onChangeText2,
  input1Style,
  input2Style,
  disabled1,
  disabled2,
  containerStyle,
}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        value={text1}
        placeholder={"—"}
        editable={!disabled1}
        selectTextOnFocus={!disabled1}
        onChangeText={onChangeText1}
        style={[styles.input, input1Style]}
        placeholderTextColor={COLORS.GREY10}
      />
      <View style={styles.line} />
      <TextInput
        value={text2}
        placeholder={"—"}
        editable={!disabled2}
        selectTextOnFocus={!disabled2}
        onChangeText={onChangeText2}
        style={[styles.input, input2Style]}
        placeholderTextColor={COLORS.GREY10}
      />
    </View>
  );
};

export default InputSecondary;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: COLORS.GREY2,
  },
  line: {
    height: 2,
    width: 40,
    marginVertical: 8,
    backgroundColor: COLORS.GREY10,
  },
  input: {
    fontSize: 13,
    maxWidth: 40,
    lineHeight: 16,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
});
