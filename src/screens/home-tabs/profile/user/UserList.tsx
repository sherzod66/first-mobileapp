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
import { Exercise, User } from "../../../../types";

type TUserKeyLis = {
  favoriteExercises: Exercise[];
};

type TUserListProps = {
  openList: (value: keyof TIsShow) => void;
  isShow: TIsShow;
  user: User;
  title: string;
  userKeyIsShow: keyof TIsShow;
  userKeyList: keyof TUserKeyLis;
};
const UserList: FC<TUserListProps> = ({
  isShow,
  openList,
  user,
  title,
  userKeyIsShow,
  userKeyList,
}) => {
  return (
    <>
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
      {!isShow.favoriteExercise ? (
        <ScrollView showsVerticalScrollIndicator={true} style={{ height: 200 }}>
          <View style={styles.animatedOne}>
            {user[userKeyList].map((item) => (
              <Text key={item._id} style={styles.text}>
                <Text style={styles.textOne}>{item.title}</Text>
              </Text>
            ))}
          </View>
        </ScrollView>
      ) : null}
    </>
  );
};

export default UserList;
