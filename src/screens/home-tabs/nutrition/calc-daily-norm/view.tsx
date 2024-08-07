import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  ButtonSecondary,
  Header,
  InputPrimary,
} from "../../../../components/common";
import { CalcDailyNormHooks } from "./hooks";
import { styles } from "./style";

import { RouteProp, useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { MAIN, NUTRITION, ROUTES } from "../../../../navigation/ROUTES";
import { COLORS } from "../../../../constants/COLORS";
import { NutritionStackParamList } from "..";
import { NUTRITION_TYPE } from "../../../../types";

export type DailyScreenRouteProp = RouteProp<
  NutritionStackParamList,
  NUTRITION.CALC_DAILY_NORM
>;
const text =
  "Расчёт вашей суточной нормы калорий, т.е. тех калорий, которые нужны для поддержания того веса, который вы имеете на данный момент. Из этих калорий будет вычитаться то количество калорий (количество дефицита), которое вы укажите далее";

const textThin =
  "Расчёт вашей суточной нормы калорий, т.е. тех калорий, которые нужны для поддержания того веса, который вы имеете на данный момент. К этим калориям будет добавлено то количество калорий (количество профицита), которое вы укажите далее";

const CalcDailyNormView = () => {
  const {
    weight,
    setWeight,
    gender,
    setGender,
    selected,
    onSelect,
    calculated,
    items,
    nType,
  } = CalcDailyNormHooks();

  const route = useRoute<DailyScreenRouteProp>();
  const navigation = useNavigation();
  const { onSave, tab } = route.params || {};

  return (
    <View style={styles.container}>
      <SafeAreaView />

      <Header
        onBackPress={
          !!onSave && !!weight && !!selected
            ? () => onSave(`${Number(weight) * items[selected].value}`)
            : () => {
                navigation.navigate(ROUTES.TABS.PROFILE.HOME as never);
              }
        }
        recommendation={tab > 0 ? "dailyNormMass" : "dailyNormOil"}
        right
      />

      <ScrollView>
        <Text style={styles.title}>
          {"Расчет вашей суточной нормы калорий"}
        </Text>
        <Text style={styles.text1}>
          {nType === NUTRITION_TYPE.FAT ? text : textThin}
        </Text>

        <View style={styles.mid}>
          <View style={styles.left}>
            <Text style={styles.title1}>{"Вес натoщак"}</Text>

            <InputPrimary
              value={!!weight && `${weight} кг`}
              disablePlaceholder
              inputStyle={styles.input}
              containerStyle={styles.inputCont}
              onChange={(t) => setWeight(t.replace(/[^\d.-]+/g, ""))}
            />
          </View>
          <View style={styles.right}>
            <Text style={styles.title1}>{"Пол"}</Text>

            <View style={styles.rightRow}>
              <ButtonSecondary
                text="Муж"
                onPress={() => setGender(0)}
                containerStyle={[!!gender && styles.inActiveBtn]}
                textStyle={!gender ? styles.text2 : styles.inActiveBtnText}
              />
              <ButtonSecondary
                text="Жен"
                onPress={() => setGender(1)}
                textStyle={gender ? styles.text2 : styles.inActiveBtnText}
                containerStyle={[styles.ml15, !!!gender && styles.inActiveBtn]}
              />
            </View>
          </View>
        </View>

        <Text style={styles.title2}>{"Какой образ жизни вы ведете?"}</Text>
        {items.map((e, i) => (
          <TouchableOpacity
            key={i}
            style={styles.row}
            onPress={() => onSelect(i)}
          >
            <View style={styles.checkbox}>
              {i === selected && <View style={styles.checkboxFilled} />}
            </View>
            <Text style={styles.text3}>{e.text}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={{ paddingBottom: 60 }}>
        <Text style={styles.title3}>{"Ваша суточная норма калорий"}</Text>
        <View
          style={[
            styles.result,
            selected !== undefined &&
              Number(weight) && { backgroundColor: COLORS.RED2 },
          ]}
        >
          <Text style={[styles.title1, { fontSize: 16 }]}>
            {selected !== undefined && Number(weight) * items[selected].value}{" "}
            Ккал
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CalcDailyNormView;
