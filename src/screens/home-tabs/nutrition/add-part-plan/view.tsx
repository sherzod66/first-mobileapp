import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { ButtonPrimary, Controls, Header } from "../../../../components/common";
import { COLORS } from "../../../../constants/COLORS";
import { AddPartPlanHooks } from "./hooks";
import { styles } from "./style";

const longText =
  "Вывести все приемы пищи в одно окно и подогнать под нужное кол-во Ккал и БЖУ";

const AddPartPlanView = () => {
  const {
    topCalories,
    topProtein,
    topOil,
    topCarb,
    calories,
    protein,
    oil,
    carb,
    index,
    receptions,
    onAddReception,
    onDec,
    onInc,
    onUpdate,
    onSave,
  } = AddPartPlanHooks();

  return (
    <View style={styles.container}>
      <SafeAreaView />

      <View style={styles.mh25}>
        <Header title={`План ${index + 1}`} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.row}>
          <View style={styles.box}>
            <Text style={styles.title}>{"Целевые Ккал"}</Text>
            <View style={styles.box1}>
              <Text style={styles.text}>{topCalories || ""}</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.title}>{"Б"}</Text>
            <View style={styles.box2}>
              <Text style={styles.text}>{topProtein || ""}</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.title}>{"Ж"}</Text>
            <View style={styles.box2}>
              <Text style={styles.text}>{topOil || ""}</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.title}>{"У"}</Text>
            <View style={styles.box2}>
              <Text style={styles.text}>{topCarb || ""}</Text>
            </View>
          </View>
        </View>

        <View style={styles.row1}>
          <View style={styles.box}>
            <Text style={styles.title}>{"Фактические Ккал"}</Text>
            <View style={[styles.box1, styles.bgGrey]}>
              <Text style={styles.text}>{calories || ""}</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.title}>{"Б"}</Text>
            <View style={[styles.box2, styles.bgGrey]}>
              <Text style={styles.text}>{Math.round(protein) || ""}</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.title}>{"Ж"}</Text>
            <View style={[styles.box2, styles.bgGrey]}>
              <Text style={styles.text}>{Math.round(oil) || ""}</Text>
            </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.title}>{"У"}</Text>
            <View style={[styles.box2, styles.bgGrey]}>
              <Text style={styles.text}>{Math.round(carb) || ""}</Text>
            </View>
          </View>
        </View>

        <View style={styles.buttons}>
          {receptions.map((r, i) => (
            <ButtonPrimary
              fill
              key={i}
              text={`Приём ${i + 1}`}
              onPress={() => onAddReception(i)}
              textStyle={styles.text1}
              style={styles[`${r ? "btn2" : "btn1"}`]}
            />
          ))}
          <Controls text="Приём пищи" onDecrement={onDec} onIncrement={onInc} />
        </View>

        <View style={styles.mh25}>
          <ButtonPrimary
            fill
            multiline
            text={longText}
            style={[
              styles.btn3,
              receptions.some((r) => !r) && styles.borderGrey,
            ]}
            textStyle={[
              styles.text2,
              receptions.some((r) => !r) && styles.textGrey,
            ]}
            onPress={receptions.some((r) => !r) ? () => {} : onUpdate}
          />

          <ButtonPrimary
            fill
            text="Сохранить"
            onPress={onSave}
            style={styles.btn4}
            textStyle={styles.text3}
            disabled={receptions.some((r) => !r)}
          />
        </View>

        <View style={{ marginBottom: 100 }} />
      </ScrollView>
    </View>
  );
};

export default AddPartPlanView;
