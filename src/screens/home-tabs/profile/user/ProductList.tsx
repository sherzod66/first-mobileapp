import { FC } from "react";
import {
  LayoutAnimation,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./style";
import { TIsShow } from "./useGetUser";
import { Dish, Product, User } from "../../../../types";

type TUserKeyLis = {
  products: Product[];
  dishes: Dish[];
};

type TUserListProps = {
  openList: (value: keyof TIsShow) => void;
  isShow: TIsShow;
  user: User;
  title: string;
  userKeyIsShow: keyof TIsShow;
  userKeyList: keyof TUserKeyLis;
};
const ProductList: FC<TUserListProps> = ({
  isShow,
  openList,
  user,
  title,
  userKeyIsShow,
  userKeyList,
}) => {
  return (
    <View style={{ marginTop: 10 }}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.animated}
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          openList(userKeyIsShow);
        }}
      >
        <Text style={styles.textOne}>
          {title}: {user[userKeyList].length}
        </Text>
      </TouchableOpacity>
      {!isShow[userKeyIsShow] ? (
        <ScrollView showsVerticalScrollIndicator={true} style={{ height: 200 }}>
          <View style={styles.animatedOne}>
            {user[userKeyList].map((item) => (
              <Text key={item._id} style={styles.text}>
                <Text style={styles.textOne}>
                  {typeof item.name === "string" ? item.name : item.name.ru}
                </Text>
              </Text>
            ))}
          </View>
        </ScrollView>
      ) : null}
    </View>
  );
};

export default ProductList;
