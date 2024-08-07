import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { Header } from "../../../../components/common";
import { styles } from "./style";
import EventEmitter from "../../../../utils/EventEmitter";
import { RecommendationHooks } from "./hooks";
import { FC } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { NUTRITION } from "../../../../navigation/ROUTES";
import { NutritionStackParamList } from "..";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type AddOnlyProductsScreenNavigationProp = NativeStackNavigationProp<
  NutritionStackParamList,
  NUTRITION.RECOMMENDATION
>;

export type AddOnlyProductsScreenRouteProp = RouteProp<
  NutritionStackParamList,
  NUTRITION.RECOMMENDATION
>;
const text1 =
  "Расчёт вашей суточной нормы калорий, т.е. тех калорий, которые нужны для поддержания того веса, который вы имеете на данный момент. Из этих калорий будет вычитаться то количество калорий (количество дефицита), которое вы укажите далее";
const text2 =
  "Расчёт вашей суточной нормы калорий, т.е. тех калорий, которые нужны для поддержания того веса, который вы имеете на данный момент. Из этих калорий будет вычитаться то количество калорий (количество дефицита), которое вы укажите далее";

const RecommendationView: FC = () => {
  const { recommendationContent } = RecommendationHooks();
  const route = useRoute<AddOnlyProductsScreenRouteProp>();
  const { value } = route.params;

  return (
    <View style={styles.container}>
      <SafeAreaView />

      <Header
        title="Рекомендации!"
        onBackPress={() => {
          EventEmitter.notify(value);
        }}
      />
      <ScrollView
        style={{ marginBottom: 90 }}
        showsVerticalScrollIndicator={false}
      >
        {recommendationContent[value].map((text, index) => (
          <Text key={index} style={styles.text}>
            {text}
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
