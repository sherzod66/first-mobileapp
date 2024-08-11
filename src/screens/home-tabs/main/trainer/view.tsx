import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ButtonPrimary, Header } from "../../../../components/common";
import { COLORS } from "../../../../constants/COLORS";
import { TrainerHooks } from "./hooks";
import { styles } from "./style";
import telegram from "../../../../assets/icons/telegram.png";
import instagram from "../../../../assets/icons/instagram.png";
import { imageLink } from "../../../../utils/imageLink";

const TrainerView = () => {
  const { trainer, openLink, onPlansPress, onApplicationPress } =
    TrainerHooks();

  return (
    <View style={styles.container}>
      <SafeAreaView />

      <Header />

      <View style={styles.headerContainer}>
        <Image
          style={styles.image}
          source={{ uri: imageLink(trainer.avatar) }}
        />

        <View style={styles.headerRight}>
          <View>
            <Text style={styles.textName}>{trainer.name}</Text>
            <Text style={styles.textOld}>
              {trainer.age}
              {trainer.age > 21 ? " года" : " лет"}
            </Text>
            <Text style={styles.textOld}>{trainer.city}</Text>
          </View>
        </View>
        <View style={{ justifyContent: "center" }}>
          <Text style={[styles.textOld, { marginBottom: 10 }]}>
            Связаться с тренером:
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity
              onPress={openLink(trainer.telegramLink)}
              activeOpacity={0.7}
              style={{ marginRight: 12 }}
            >
              <Image style={{ width: 28, height: 28 }} source={telegram} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={openLink(trainer.instagramLink)}
              activeOpacity={0.7}
            >
              <Image style={{ width: 28, height: 28 }} source={instagram} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        <View>
          <Text style={styles.textCart}>{"Специальность"}</Text>
          <View style={styles.about}>
            <Text style={styles.aboutText}>{trainer.speciality}</Text>
          </View>
          <Text style={styles.textCart}>{"Образование"}</Text>
          <View style={styles.about}>
            <Text style={styles.aboutText}>{trainer.education}</Text>
          </View>
          <Text style={styles.textCart}>{"Номер телефона"}</Text>
          <View style={styles.about}>
            {trainer.isPhoneNumber ? (
              <Text style={styles.aboutText}>{trainer.email}</Text>
            ) : (
              <Text style={styles.aboutText}>
                Тренер решил скрыть номер телефона
              </Text>
            )}
          </View>
          <Text style={styles.textCart}>{"О себе"}</Text>
        </View>
        <View style={styles.aboutView}>
          <Text style={styles.aboutText}>{trainer.aboutMe}</Text>
        </View>

        <View style={{ marginHorizontal: 15, marginBottom: 100 }}>
          <TouchableOpacity
            style={{ marginBottom: 40, marginTop: 20 }}
            activeOpacity={0.7}
          >
            <ButtonPrimary
              text="Оставить заявку"
              fill
              style={{
                borderRadius: 10,
                paddingVertical: 18,
                backgroundColor: COLORS.BLACK,
                borderWidth: 1,
                borderColor: COLORS.RED,

                marginBottom: 10,
              }}
              textStyle={{
                color: COLORS.RED,
                fontWeight: "700",
                fontSize: 15,
                lineHeight: 15,
              }}
              onPress={onApplicationPress}
            />
          </TouchableOpacity>

          <ButtonPrimary
            text="Планы питания"
            fill
            style={{
              borderRadius: 10,
              paddingVertical: 18,
              backgroundColor: COLORS.RED,
              marginBottom: 10,
            }}
            textStyle={{
              color: COLORS.WHITE,
              fontWeight: "700",
              fontSize: 15,
              lineHeight: 15,
            }}
            onPress={onPlansPress("Планы питания")}
          />

          <ButtonPrimary
            onPress={onPlansPress("Планы тренировок")}
            text="Планы тренировок"
            fill
            style={{
              borderRadius: 10,
              paddingVertical: 18,
              backgroundColor: COLORS.RED,
              marginBottom: 10,
            }}
            textStyle={{
              color: COLORS.WHITE,
              fontWeight: "700",
              fontSize: 15,
              lineHeight: 15,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default TrainerView;
