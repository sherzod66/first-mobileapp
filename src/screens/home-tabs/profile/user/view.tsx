import { FC } from "react";
import {
  FlatList,
  LayoutAnimation,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./style";
import { Header } from "../../../../components/common";
import { useGetUser } from "./useGetUser";
import { GetDataString } from "../../../../utils/Date.heper";
import UserList from "./UserList";
import ProductList from "./ProductList";
import UserRole from "./UserRole";

const UserView: FC = () => {
  const { isLoading, user, openList, isShow, changeRole } = useGetUser();
  return (
    <View style={styles.container}>
      {user && (
        <>
          <Header title={user.name} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.topColumn}>
              <Text style={styles.text}>Email: {user.phoneNumber}</Text>
              <Text style={styles.text}>Id: {user._id}</Text>
              <Text style={styles.text}>
                Зарегистрирован: {GetDataString(user.createdAt)}
              </Text>
            </View>
            <UserList
              isShow={isShow}
              openList={openList}
              title="Любимые упражнения"
              user={user}
              userKeyIsShow="favoriteExercise"
              userKeyList="favoriteExercises"
            />
            <ProductList
              isShow={isShow}
              openList={openList}
              title="Продукты"
              user={user}
              userKeyIsShow="product"
              userKeyList="products"
            />
            <ProductList
              isShow={isShow}
              openList={openList}
              title="Блюда"
              user={user}
              userKeyIsShow="dishes"
              userKeyList="dishes"
            />
            <Text style={styles.textRole}>Роль</Text>
            <UserRole
              isShow={isShow}
              role={user.role}
              openList={openList}
              userKeyIsShow="role"
              user={user}
              changeRole={changeRole}
            />
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default UserView;
