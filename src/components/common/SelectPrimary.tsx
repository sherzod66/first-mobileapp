import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  LayoutAnimation,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../constants/COLORS";
import { ReactChildren } from "react-native-toast-message";
import { Assets } from "../../utils/requireAssets";

export interface SelectItem {
  label: string;
  value: string;
}
export interface SelectProps {
  data: Array<SelectItem>;
  title?: string;
  onChange?: (data: SelectItem) => void;
  hasRemove?: boolean;
  onRemove?: (e: string) => void;
}
const SelectPrimary = ({
  data,
  title,
  onChange,
  hasRemove,
  onRemove,
  children,
}: SelectProps & React.PropsWithChildren) => {
  const [shouldShow, setShouldShow] = useState(true);
  const [drop, setDrop] = useState<SelectItem>();
  useEffect(() => {
    if (!!drop && onChange) onChange(drop);
  }, [drop]);

  return (
    <View>
      <Text style={[styles.textOne, { marginBottom: 10 }]}>{title}</Text>
      <>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.animated, children ? { paddingVertical: 15 } : null]}
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            setShouldShow(!shouldShow);
          }}
        >
          <Text style={styles.textOne}>{drop?.label}</Text>
          {/* {!shouldShow ? <ArrowDown /> : <ArrowUp />} */}
          {children && children}
        </TouchableOpacity>
        <View style={{}}>
          {!shouldShow ? (
            <View style={styles.animatedOne}>
              {data.map((e) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setShouldShow(true);
                      setDrop(e);
                    }}
                    key={e.value}
                    style={styles.btnLanguage}
                  >
                    <Text style={styles.textOne}>{e.label}</Text>
                    {hasRemove && (
                      <TouchableOpacity
                        onPress={() => onRemove && onRemove(e.value)}
                      >
                        <Image
                          source={Assets.icons.close}
                          style={styles.removeIcon}
                        />
                      </TouchableOpacity>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>
      </>
    </View>
  );
};

export default SelectPrimary;

const styles = StyleSheet.create({
  removeIcon: {
    width: 20,
    height: 20,
  },
  textOne: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  btnLanguage: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  activeText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  activeBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 30,
  },
  animated: {
    flexDirection: "row",
    backgroundColor: COLORS.GREY2,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 30,
    borderRadius: 10,
  },
  animatedOne: {
    backgroundColor: COLORS.GREY2,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 5,
  },
});
