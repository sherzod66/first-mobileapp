import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from "react-native";
import { COLORS } from "../../constants/COLORS";
import ButtonPrimary from "./ButtonPrimary";

interface IProps {
  text: string;
  loading?: boolean;
  onDecrement: () => void;
  onIncrement: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Controls = ({
  text,
  loading,
  onDecrement,
  onIncrement,
  style,
  textStyle,
}: IProps) => {
  return loading ? (
    <ActivityIndicator style={styles.loading} color={COLORS.WHITE} />
  ) : (
    <View style={[styles.container, style]}>
      <ButtonPrimary
        text="-"
        onPress={onDecrement}
        style={styles.btn}
        textStyle={[styles.btnText, textStyle]}
      />
      <Text style={styles.title}>{text}</Text>
      <ButtonPrimary
        text="+"
        onPress={onIncrement}
        style={styles.btn}
        textStyle={[styles.btnText, textStyle]}
      />
    </View>
  );
};

export default Controls;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.WHITE,
    marginHorizontal: 10,
  },
  btn: {
    width: 39,
    height: 39,
    padding: 0,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: COLORS.GREY13,
    backgroundColor: COLORS.BLACK,
  },
  btnText: {
    fontSize: 35,
    lineHeight: 36,
    fontWeight: "700",
    color: COLORS.GREY13,
    textAlign: "center",
    textAlignVertical: "center",
  },
  text: {
    color: COLORS.WHITE,
  },
  loading: {
    marginVertical: 20,
  },
});
