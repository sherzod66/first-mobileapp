import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { Header } from "../../../../components/common";
import { styles } from "./style";
import { RecommendationHooks } from "./hooks";
import { NUTRITION_TYPE } from "../../../../types";

const RecommendationView = () => {
  const { nType, mass, oil } = RecommendationHooks();
  return (
    <View style={styles.container}>
      <SafeAreaView />

      <Header title="Рекомендации" />
      <ScrollView
        style={{ marginBottom: 90 }}
        showsVerticalScrollIndicator={false}
      >
        {nType === NUTRITION_TYPE.FAT &&
          oil.map((item, index) => (
            <Text key={index} style={styles.text}>
              {item}
            </Text>
          ))}
        {nType === NUTRITION_TYPE.THIN &&
          mass.map((item, index) => (
            <Text key={index} style={styles.text}>
              {item}
            </Text>
          ))}
        <Text style={styles.text}>
          Рамис Сахибов – Фитнес Тренер, Фитнес Нутрициолог
        </Text>
      </ScrollView>
    </View>
  );
};

export default RecommendationView;
