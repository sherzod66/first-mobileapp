import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TrainerBox } from "../../../../components";
import {
  ButtonPrimary,
  ButtonTabs,
  Header,
  InputPrimary,
} from "../../../../components/common";
import { COLORS } from "../../../../constants/COLORS";
import { TrainersHooks } from "./hooks";
import { styles } from "./style";

const FitnessClubView = () => {
  const {
    search,
    setSearch,
    active,
    setActive,
    trainers,
    onPress,
    individual,
    isSuperAdmin,
    onCreateTrainer,
  } = TrainersHooks();

  return (
    <View style={styles.container}>
      <SafeAreaView />

      <Header title={individual ? "Фитнесс клубы" : "Фитнесс клубы"} />

      {individual && (
        <Text style={styles.text}>
          {
            "Чтобы заказать индивидуальный план питания вам нужно выбрать тренера и написать ему в мессенджер, который указан в его профиле"
          }
        </Text>
      )}

      <InputPrimary
        value={search}
        onChange={(value) => setSearch(value)}
        placeholder={"Поиск"}
        placeholderColor={COLORS.WHITE}
        containerStyle={{
          backgroundColor: COLORS.GREY3,
          marginTop: 10,
          borderRadius: 10,
        }}
        inputStyle={{
          backgroundColor: COLORS.GREY3,
          color: COLORS.WHITE,
        }}
        onSearch={() => console.log("onSearch!!")}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 100, marginTop: 20 }}>
          {trainers.map((trainer, i) => (
            <TouchableOpacity
              key={trainer._id}
              onPress={() => onPress(i)}
              activeOpacity={0.7}
              style={{ marginBottom: 10 }}
            >
              <TrainerBox
                avatar={{ uri: trainer.avatar }}
                name={trainer.name}
                age={trainer.age}
                city={trainer.city}
                experience={trainer.experience}
                trainer={trainer}
                isFitness={true}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {isSuperAdmin && (
        <View style={styles.createButtonContainer}>
          <ButtonPrimary
            text="Добавить фитнесс клуб"
            onPress={onCreateTrainer}
          />
        </View>
      )}
    </View>
  );
};

export default FitnessClubView;
