import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  ButtonPrimary,
  Header,
  InputPrimary,
} from "../../../../components/common";
import { UpdatePartPlanHooks } from "./hooks";
import { styles } from "./style";

const UpdatePartPlanView = () => {
  const {
    index,
    topCalories,
    topProtein,
    topOil,
    topCarb,
    calories,
    protein,
    oil,
    carb,
    language,
    receptions,
    amountsP,
    amountsD,
    onChangeP,
    onChangeD,
    onPress,
    onAddReception,
  } = UpdatePartPlanHooks();

  return (
    <View style={styles.container}>
      <SafeAreaView />

      <View style={styles.mh25}>
        <Header title={`План ${index + 1} ( Корректировка )`} />
      </View>

      <View style={styles.row}>
        <View style={styles.box}>
          <Text style={styles.title}>{"Целевые Ккал"}</Text>
          <View style={styles.box1}>
            <Text style={styles.text1}>{topCalories || ""}</Text>
          </View>
        </View>
        <View style={styles.box}>
          <Text style={styles.title}>{"Б"}</Text>
          <View style={styles.box2}>
            <Text style={styles.text1}>{topProtein || ""}</Text>
          </View>
        </View>
        <View style={styles.box}>
          <Text style={styles.title}>{"Ж"}</Text>
          <View style={styles.box2}>
            <Text style={styles.text1}>{topOil || ""}</Text>
          </View>
        </View>
        <View style={styles.box}>
          <Text style={styles.title}>{"У"}</Text>
          <View style={styles.box2}>
            <Text style={styles.text1}>{topCarb || ""}</Text>
          </View>
        </View>
      </View>

      <View style={styles.row1}>
        <View style={styles.box}>
          <Text style={styles.title}>{"Фактические Ккал"}</Text>
          <View style={[styles.box1, styles.bgGrey]}>
            <Text style={styles.text1}>{calories || ""}</Text>
          </View>
        </View>
        <View style={styles.box}>
          <Text style={styles.title}>{"Б"}</Text>
          <View style={[styles.box2, styles.bgGrey]}>
            <Text style={styles.text1}>{Math.round(protein) || ""}</Text>
          </View>
        </View>
        <View style={styles.box}>
          <Text style={styles.title}>{"Ж"}</Text>
          <View style={[styles.box2, styles.bgGrey]}>
            <Text style={styles.text1}>{Math.round(oil) || ""}</Text>
          </View>
        </View>
        <View style={styles.box}>
          <Text style={styles.title}>{"У"}</Text>
          <View style={[styles.box2, styles.bgGrey]}>
            <Text style={styles.text1}>{Math.round(carb) || ""}</Text>
          </View>
        </View>
      </View>

      <View style={styles.scroll}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {receptions &&
            receptions.map((r, i) => (
              <View key={i} style={styles.scrollBox}>
                <View style={styles.header}>
                  <View style={styles.headerBox}>
                    <Text style={styles.text2}>{`${i + 1}-й Приём`}</Text>
                  </View>
                  {r && (
                    <TouchableOpacity onPress={() => onAddReception(i, r)}>
                      <Text style={styles.text3}>{"Изменить"}</Text>
                    </TouchableOpacity>
                  )}
                </View>
                <View style={styles.main}>
                  {r &&
                    r.products.map((p, ii) => (
                      <View
                        key={ii}
                        style={[styles.mainRow, !!ii && styles.mt5]}
                      >
                        <Text style={styles.text4}>{p.name[language]}</Text>
                        <InputPrimary
                          containerStyle={styles.inputCont}
                          onChange={(t) => onChangeP(t, i, ii)}
                          inputStyle={[styles.text4, styles.input]}
                          keyboardType="number-pad"
                          value={(
                            (amountsP[i] && amountsP[i][ii]) ||
                            0
                          ).toString()}
                        />
                      </View>
                    ))}
                  {r &&
                    r.dishes.map((d, ii) => (
                      <View
                        key={ii}
                        style={[
                          styles.mainRow,
                          (!!r.products.length || !!ii) && styles.mt5,
                        ]}
                      >
                        <Text style={styles.text4}>{d.name}</Text>
                        <InputPrimary
                          containerStyle={styles.inputCont}
                          onChange={(t) => onChangeD(t, i, ii)}
                          inputStyle={[styles.text4, styles.input]}
                          value={(
                            (amountsD[i] && amountsD[i][ii]) ||
                            0
                          ).toString()}
                        />
                      </View>
                    ))}
                </View>
              </View>
            ))}

          <View style={styles.line} />

          <ButtonPrimary
            fill
            text="Сохранить"
            onPress={onPress}
            style={styles.btn}
            textStyle={styles.btnText}
          />

          <View style={{ marginBottom: 100 }} />
        </ScrollView>
      </View>
    </View>
  );
};

export default UpdatePartPlanView;
