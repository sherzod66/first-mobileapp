import { View, Text, SafeAreaView } from "react-native";
import { ButtonTabs, Header } from "../../../../components/common";
import MyNutrition from "./my-nutrition";
import MyWorkout from "./my-workout";
import MyMeasurements from "./my-measurements";
import { MyDataHooks } from "./hooks";
import { styles } from "./style";
import { NUTRITION_TYPE } from "../../../../types";

const MyDataView = () => {
  const { active, setActive, apprenticeId, nType } = MyDataHooks();

  return (
    <View style={styles.container}>
      <SafeAreaView />

      <View style={styles.mh25}>
        <Header
          title="Мои данные"
          bottom={active === 2}
          recommendation={
            nType === NUTRITION_TYPE.FAT
              ? "dynamicsAndAnalysisOil"
              : "dynamicsAndAnalysisMass"
          }
        />

        <View style={styles.mt18}>
          <ButtonTabs
            primary
            active={active}
            setActive={setActive}
            titles={["Моё питание", "Мой тренинг", "Мои замеры"]}
            scroll={false}
          />
        </View>
      </View>

      {active === 0 && <MyNutrition apprenticeId={apprenticeId} />}
      {active === 1 && <MyWorkout apprenticeId={apprenticeId} />}
      {active === 2 && <MyMeasurements apprenticeId={apprenticeId} />}
    </View>
  );
};

export default MyDataView;
