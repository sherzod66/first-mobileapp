import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants/COLORS";

const EmptyComponent = ({
  bgColor,
  textColor,
}: {
  bgColor?: string;
  textColor?: string;
}) => {
  return (
    <View style={[styles.box, !!bgColor && { backgroundColor: bgColor }]}>
      <Text style={[styles.text, !!textColor && { color: textColor }]}>
        {`Для добавления упражнений в дневник тренировок, выберите необходимую программу тренировок в разделе " Мои Программы"`}
      </Text>
    </View>
  );
};

export default EmptyComponent;

const styles = StyleSheet.create({
  box: {
    marginTop: 15,
  },
  text: {
    fontSize: 22,
    lineHeight: 29,
    textAlign: "center",
    fontWeight: "700",
    color: COLORS.WHITE,
  },
});
