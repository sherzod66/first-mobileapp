import { FC } from "react";
import { LayoutAnimation, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { TIsShow } from "./useGetUser";
import { ROLES, User } from "../../../../types";

type TUserRoleProps = {
  openList: (value: keyof TIsShow) => void;
  isShow: TIsShow;
  user: User;
  role: "SUPERADMIN" | "ADMIN" | "TRAINER" | "USER";
  userKeyIsShow: keyof TIsShow;
  changeRole: (value: "SUPERADMIN" | "ADMIN" | "TRAINER" | "USER") => void;
};

const UserRole: FC<TUserRoleProps> = ({
  isShow,
  openList,
  role,
  user,
  userKeyIsShow,
  changeRole,
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
        <Text style={styles.text}>{user.role}</Text>
        {/* {!shouldShow ? <ArrowDown /> : <ArrowUp />} */}
      </TouchableOpacity>
      <View style={{}}>
        {!isShow[userKeyIsShow] ? (
          <View style={styles.animatedOne}>
            <TouchableOpacity
              style={styles.btnLanguage}
              onPress={() => changeRole("SUPERADMIN")}
            >
              <Text style={styles.textOne}>Super Admin</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnLanguage}
              onPress={() => changeRole("ADMIN")}
            >
              <Text style={styles.textOne}>Admin</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnLanguage}
              onPress={() => changeRole("TRAINER")}
            >
              <Text style={styles.textOne}>Tranier</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnLanguage}
              onPress={() => changeRole("USER")}
            >
              <Text style={styles.textOne}>User</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default UserRole;
