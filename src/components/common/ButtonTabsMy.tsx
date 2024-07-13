import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  ScrollView,
} from "react-native";
import React from "react";
import { COLORS } from "../../constants/COLORS";
import ButtonSecondary from "./ButtonSecondary";
import ButtonUnderline from "./ButtonUnderline";

interface IProps {
  titles: string[];
  active: number;
  setActive: (index: number) => void;
  primary?: boolean;
  secondary?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  inActiveBtnStyle?: StyleProp<ViewStyle>;
  inActiveTextStyle?: StyleProp<TextStyle>;
  marginLeft?: number;
  marginLeft2?: number;
  scroll?: boolean;
}

const ButtonTabsMy = ({
  titles,
  active,
  setActive,
  containerStyle,
  primary,
  secondary,
  buttonStyle,
  textStyle,
  inActiveBtnStyle,
  inActiveTextStyle,
  marginLeft = 10,
  marginLeft2,
  scroll = true,
}: IProps) => {
  const Wrapper = scroll ? ScrollView : React.Fragment;

  return (
    <View style={[styles.container, containerStyle]}>
      <Wrapper
        horizontal
        contentContainerStyle={{
          alignItems: "baseline",
          justifyContent: "center",
        }}
      >
        {titles.map((title, i) =>
          primary ? (
            <TouchableOpacity
              key={i}
              onPress={() => setActive(i)}
              style={[styles.col, active === i ? styles.activeCol : undefined]}
            >
              <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
          ) : secondary ? (
            active === i ? (
              <ButtonSecondary
                key={i}
                text={title}
                textStyle={textStyle}
                onPress={() => setActive(i)}
                containerStyle={[
                  { marginLeft: i ? marginLeft : 0 },
                  buttonStyle,
                ]}
              />
            ) : (
              <TouchableOpacity
                key={i}
                onPress={() => setActive(i)}
                style={[
                  {
                    marginLeft: i
                      ? marginLeft2 && i - 1 !== active
                        ? marginLeft2
                        : marginLeft
                      : 0,
                  },
                  buttonStyle,
                  inActiveBtnStyle,
                ]}
              >
                <Text style={[styles.inActiveText, inActiveTextStyle]}>
                  {title}
                </Text>
              </TouchableOpacity>
            )
          ) : active === i ? (
            <ButtonUnderline
              key={i}
              text={title}
              onPress={() => setActive(i)}
              style={{ marginLeft: i ? marginLeft : 0 }}
            />
          ) : (
            <TouchableOpacity
              key={i}
              onPress={() => setActive(i)}
              style={{ marginLeft: i ? marginLeft : 0 }}
            >
              <Text style={styles.inActiveText}>{title}</Text>
            </TouchableOpacity>
          )
        )}
      </Wrapper>
    </View>
  );
};

export default ButtonTabsMy;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 0,
    overflow: "hidden",
    backgroundColor: COLORS.GREY,
  },
  col: {
    flex: 1,
    borderRadius: 24,
    paddingVertical: 15,
    alignItems: "center",
  },
  activeCol: {
    backgroundColor: COLORS.RED2,
  },
  text: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "600",
    textAlign: "center",
    color: COLORS.WHITE,
    textAlignVertical: "center",
    marginHorizontal: 15,
  },
  inActiveText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400",
    textAlign: "center",
    color: COLORS.GREY8,
    textAlignVertical: "center",
  },
});
