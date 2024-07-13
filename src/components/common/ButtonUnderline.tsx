import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { COLORS } from "../../constants/COLORS";

interface IProps {
  text: string;
  onPress: () => void;
  loading?: boolean;
  loadingColor?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  lineStyle?: StyleProp<ViewStyle>;
}

const ButtonUnderline = ({
  text,
  onPress,
  loading,
  loadingColor = COLORS.BLACK,
  style,
  textStyle,
  lineStyle,
}: IProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, style]}>
        {loading ? (
          <ActivityIndicator size={"small"} color={loadingColor} />
        ) : (
          <Text style={[styles.text, textStyle]}>{text}</Text>
        )}
        {loading ? null : <View style={[styles.line, lineStyle]} />}
      </View>
    </TouchableOpacity>
  );
};

export default ButtonUnderline;

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  line: {
    height: 2,
    marginTop: 3,
    // marginHorizontal: 10,
    backgroundColor: COLORS.WHITE,
  },
});
