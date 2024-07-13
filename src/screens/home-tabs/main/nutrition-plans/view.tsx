import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { styles } from "./style";
import {
  ButtonTabs,
  Header,
  ButtonPrimary,
} from "../../../../components/common";
import { NutritionPlansHooks } from "./hooks";
import { NutritionBox } from "../../../../components";
import { ProfileHomeHooks } from "../../profile/home/hooks";
import { MyNutritionPlansHooks } from "../../nutrition/nutrition-layout/my-nutrition-plans/hooks";
import { useState } from "react";
import { formatPrice } from "../../../../utils/formatPrice";

// const NutritionPlansView = () => {
//   const {
//     state,
//     setState,
//     onIndividualPress,
//     subCategory,
//     setSubCategory,
//     onCreatePlan,
//   } = NutritionPlansHooks();

//   const { isAdmin } = ProfileHomeHooks();

//   return (
//     <View style={styles.container}>
//       <SafeAreaView />

//       <Header title="Планы Питания" />

//       <ButtonTabs
//         active={state}
//         setActive={setState}
//         titles={["Жиросжигание", "Массанабор"]}
//         primary
//         containerStyle={{
//           justifyContent: "center",
//           marginVertical: 15,
//         }}
//         scroll={false}
//       />
//       {state !== 1 && (
//         <ButtonTabs
//           active={subCategory}
//           setActive={setSubCategory}
//           titles={["2 приема пищи", "3 приема пищи"]}
//           secondary
//           containerStyle={{
//             justifyContent: "center",
//             backgroundColor: "transparent",
//             marginBottom: 10,
//           }}
//           scroll={false}
//         />
//       )}

//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={{ marginBottom: 40 }}>
//           <TouchableOpacity style={{ marginVertical: 10 }} activeOpacity={0.7}>
//             <NutritionBox simple />
//           </TouchableOpacity>
//           <TouchableOpacity style={{ marginVertical: 10 }} activeOpacity={0.7}>
//             <NutritionBox simple />
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//       <View style={{ marginBottom: 90 }}>
//         <ButtonPrimary
//           text="Заказать План ( индивидуальный )"
//           fill
//           style={styles.button}
//           textStyle={styles.buttonText}
//           onPress={onIndividualPress}
//         />
//       </View>
//       {isAdmin && (
//         <View style={styles.createButtonContainer}>
//           <ButtonPrimary text="Добавить план" onPress={onCreatePlan} />
//         </View>
//       )}
//     </View>
//   );
// };

const NutritionPlansView = () => {
  const {
    activeTab,
    setActiveTab,
    plans,
    onIndividualPress,
    setSubCategory,
    subCategory,
    onIndividualPlan,
  } = NutritionPlansHooks();

  return (
    <View style={styles.container}>
      <Header title="Планы Питания" />

      <ButtonTabs
        active={activeTab}
        setActive={setActiveTab}
        titles={["Жиросжигание", "Массанабор"]}
        primary
        containerStyle={styles.btnCont}
        scroll={false}
      />

      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: 5 }}
          >
            {plans.map((nP, i) => (
              <TouchableOpacity onPress={() => onIndividualPress(nP)} key={i}>
                <View style={[styles.box, !!i && styles.mt8]}>
                  <Text style={styles.title}>{nP.title}</Text>
                  <View style={styles.main}>
                    <View style={styles.center}>
                      <Text
                        style={styles.text1}
                      >{`${nP.proteinPercent}%`}</Text>
                      <Text style={styles.text2}>{"Белков"}</Text>
                      <Text style={styles.text3}>{`${Math.trunc(
                        (nP.calories * nP.proteinPercent) / 400
                      )}гр`}</Text>
                    </View>
                    <View style={[styles.center, styles.ml20]}>
                      <Text style={styles.text1}>{`${nP.oilPercent}%`}</Text>
                      <Text style={styles.text2}>{"Жиров"}</Text>
                      <Text style={styles.text3}>{`${Math.trunc(
                        (nP.calories * nP.oilPercent) / 900
                      )}гр`}</Text>
                    </View>
                    <View style={[styles.center, styles.ml20]}>
                      <Text style={styles.text1}>{`${
                        100 - (nP.proteinPercent + nP.oilPercent)
                      }%`}</Text>
                      <Text style={styles.text2}>{"Углеводов"}</Text>
                      <Text style={styles.text3}>{`${Math.trunc(
                        (nP.calories *
                          (100 - (nP.proteinPercent + nP.oilPercent))) /
                          400
                      )}гр`}</Text>
                    </View>
                  </View>
                  <Text style={[styles.title, { textAlign: "right" }]}>
                    {nP.price ? `${formatPrice(nP.price)} UZS` : "Бесплатно"}{" "}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      <View style={styles.buttonCont}>
        <ButtonPrimary
          text="Заказать Программу ( индивидуальную )"
          fill
          style={styles.button}
          textStyle={styles.buttonText}
          onPress={onIndividualPlan}
        />
      </View>
    </View>
  );
};

export default NutritionPlansView;
