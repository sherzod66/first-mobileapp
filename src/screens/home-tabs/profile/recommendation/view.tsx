import { View, Text, SafeAreaView } from "react-native";
import { Header } from "../../../../components/common";
import { styles } from "./style";

const text1 =
  "Расчёт вашей суточной нормы калорий, т.е. тех калорий, которые нужны для поддержания того веса, который вы имеете на данный момент. Из этих калорий будет вычитаться то количество калорий (количество дефицита), которое вы укажите далее";
const text2 =
  "Расчёт вашей суточной нормы калорий, т.е. тех калорий, которые нужны для поддержания того веса, который вы имеете на данный момент. Из этих калорий будет вычитаться то количество калорий (количество дефицита), которое вы укажите далее";

const RecommendationView = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView />

      <Header title="Рекомендации" />

      <Text style={styles.text}>{text1}</Text>
      <Text style={styles.text}>{text2}</Text>
    </View>
  );
};

export default RecommendationView;
