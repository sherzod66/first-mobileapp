import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Controls from "./common/Controls";
import { COLORS } from "../constants/COLORS";
import { Product } from "../types";
import { ButtonSecondary } from "./common";

interface IProps {
  isDisabled?: boolean;
  loading?: number | boolean;
  products: Product[];
  amounts: number[];
  navigateAddProducts: () => void;
  onShow: (index: number, value: string) => void;
  onRemove: () => void;
  onRemoveByIndex: (index: number) => void;
  style?: StyleProp<ViewStyle>;
}

const ProductListStudent = ({
  isDisabled,
  loading,
  products,
  amounts,
  navigateAddProducts,
  onShow,
  onRemove,
  onRemoveByIndex,
  style,
}: IProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.header, styles.radiusTop]}>
        <View style={styles.left}>
          <Text style={styles.title}>{"Наименование продукта"}</Text>
          <View style={styles.dots}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>
        <View style={styles.right}>
          <Text style={styles.text4}>{"Кол-во"}</Text>
        </View>
      </View>
      {products.map((product, index) => (
        <View
          key={`${product._id}/${index}`}
          style={[
            styles.row,
            index === products.length - 1 && styles.radiusBottom,
          ]}
        >
          <View style={styles.left}>
            <Text style={styles.textMy}>{product.name.ru}</Text>
            <TouchableOpacity onPress={() => onRemoveByIndex(index)}>
              {typeof loading === "number" && loading === index ? (
                <ActivityIndicator size={"small"} />
              ) : (
                <Text style={styles.text2}>{"Удалить"}</Text>
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.right}
            onPress={() => onShow(index, `${amounts[index]}`)}
          >
            <Text style={styles.text1}>{amounts[index]}</Text>
          </TouchableOpacity>
        </View>
      ))}
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "center",
        }}
      ></View>
      {/* {!isDisabled && (
        <Controls
          text={title}
          onDecrement={onRemove}
          onIncrement={() => navigateAddProducts()}
          loading={typeof loading === "boolean" && loading}
          textStyle={{ marginTop: 3 }}
        />
      )} */}
    </View>
  );
};

export default ProductListStudent;

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.GREY3,
  },
  title: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "800",
    color: COLORS.WHITE,
  },
  left: {
    flex: 1,
    borderRightWidth: 1,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 23,
    borderColor: COLORS.GREY11,
    justifyContent: "space-between",
  },
  right: {
    width: 90,
    borderLeftWidth: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLORS.GREY11,
  },
  row: {
    borderTopWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    borderColor: COLORS.GREY11,
    backgroundColor: COLORS.GREY2,
  },
  input: {
    width: "50%",
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  text1: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
  textMy: {
    fontSize: 11,
    lineHeight: 18,
    fontWeight: "700",
    color: COLORS.WHITE,
    width: 170,
  },
  text2: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "600",
    color: COLORS.GREY11,
  },

  text4: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "600",
    color: COLORS.GREEN2,
  },
  dot: {
    width: 5,
    height: 5,
    marginTop: 3,
    borderRadius: 5,
    backgroundColor: COLORS.RED2,
  },
  dots: {},
  radiusTop: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  radiusBottom: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
