import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  Alert,
} from "react-native";
import { COLORS } from "../constants/COLORS";
import { useSelector } from "react-redux";
import { selectUser, setTrainer } from "../store/slices/appSlice";
import { ROLES } from "../types";
import { ApiService } from "../services";
import { useRedux } from "../store/hooks";
import EventEmitter from "../utils/EventEmitter";

interface IProps {
  avatar?: ImageSourcePropType;
  name: string;
  speciality?: string;
  age?: number;
  city?: string;
  experience?: number;
  id?: string;
  trainer?: any;
  isFitness: boolean;
}

const TrainerBox = ({
  avatar,
  name,
  speciality,
  age,
  city,
  experience,
  id,
  trainer,
  isFitness,
}: IProps) => {
  let [user, dispatch] = useRedux(selectUser);
  let isSuperAdmin = user?.role === ROLES.SUPERADMIN;

  const onDeleteConfirm = async (id: string) => {
    try {
      await ApiService.delete(
        isFitness ? "/fitness-club/" + id : `/trainers/${trainer._id}`
      );
      EventEmitter.notify("refreshTrainers");
      Alert.alert("Внимание !", "Удалено");
    } catch (error) {
      Alert.alert("Ошибка !", "Не удалос удалить!");
    }
  };

  const onDeletePress = (el: string) => {
    Alert.alert(
      "Внимание !",
      "Вы уверены, что хотите удалить этого пользователя?",
      [
        {
          text: "Удалить",
          style: "destructive",
          onPress: () => onDeleteConfirm(el),
        },
        { text: "Отменить" },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Image
          source={
            !!avatar
              ? avatar
              : {
                  uri: "https://i.pinimg.com/280x280_RS/df/59/82/df59828572828e074eeac6fe46b4c187.jpg",
                }
          }
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View style={styles.main}>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.speciality}>{speciality}</Text>
          {!!id && <Text style={styles.speciality}>ID: {id}</Text>}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {age && <Text style={styles.age}>{`${age} лет`}</Text>}
            {isSuperAdmin && (
              <TouchableOpacity onPress={() => onDeletePress(id ? id : "")}>
                <Text style={[styles.experience, { color: COLORS.RED }]}>
                  Удалить
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.city}>{city}</Text>
          {!!experience && (
            <Text style={styles.experience}>{`Опыт - ${experience} лет`}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default TrainerBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: COLORS.GREY2,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: "hidden",
    marginVertical: 16,
    backgroundColor: "pink",
  },
  main: {
    flex: 1,
    marginLeft: 16,
  },
  bottom: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 17,
    lineHeight: 23,
    fontWeight: "600",
    color: COLORS.WHITE,
  },
  speciality: {
    fontSize: 11,
    marginTop: 4,
    lineHeight: 13,
    fontWeight: "400",
    color: COLORS.WHITE,
  },
  age: {
    fontSize: 11,
    marginTop: 4,
    lineHeight: 13,
    fontWeight: "400",
    color: COLORS.WHITE,
  },
  city: {
    fontSize: 11,
    lineHeight: 13,
    fontWeight: "400",
    color: COLORS.WHITE,
  },
  experience: {
    fontSize: 11,
    lineHeight: 13,
    fontWeight: "700",
    color: COLORS.WHITE,
  },
});
