import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  ButtonPrimary,
  Icon,
  InputPrimary,
  Box,
  ButtonSecondary,
  ButtonTabs,
  ButtonUnderline,
  Header,
} from "../components/common";
import { TrainerBox, NutritionBox } from "../components";
import { COLORS } from "../constants/COLORS";
import { Assets } from "../utils/requireAssets";

const Example = () => {
  const [input, setInput] = useState("");
  const [active1, setActive1] = useState(0);
  const [active2, setActive2] = useState(0);
  const [active3, setActive3] = useState(0);

  return (
    <View style={styles.container}>
      {/* <Header title="Title" /> */}

      {/* <FullBodyScreen/>  1 screen */}

      {/* <WorkoutProgramScreen/> 2 screen */}

      {/* <ButtonPrimary
        text="Lorem"
        fill
        style={{
          borderRadius: 4,
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
        onPress={() => console.log("onPress")}
      /> */}

      {/* <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
        <InputPrimary
          value={input}
          onChange={(value) => setInput(value)}
          disablePlaceholder
          containerStyle={{
              flex: 3,
            backgroundColor: COLORS.GREY3,
            marginBottom: 10,
          }}
          inputStyle={{
            backgroundColor: COLORS.GREY3,
            color: COLORS.WHITE,
          }}
        />
        <InputPrimary
          value={input}
          onChange={(value) => setInput(value)}
          disablePlaceholder
          containerStyle={{
            flex: 1,
            backgroundColor: COLORS.GREY3,
            marginBottom: 10,
            marginLeft: 10,
          }}
          inputStyle={{
            backgroundColor: COLORS.GREY3,
            color: COLORS.WHITE,
          }}
        />
        <InputPrimary
          value={input}
          onChange={(value) => setInput(value)}
          disablePlaceholder
          containerStyle={{
            flex: 1,
            backgroundColor: COLORS.GREY3,
            marginBottom: 10,
            marginLeft: 10,
          }}
          inputStyle={{
            backgroundColor: COLORS.GREY3,
            color: COLORS.WHITE,
          }}
        />
        <InputPrimary
          value={input}
          onChange={(value) => setInput(value)}
          disablePlaceholder
          containerStyle={{
            flex: 1,
            backgroundColor: COLORS.GREY3,
            marginBottom: 10,
            marginLeft: 10,
          }}
          inputStyle={{
            backgroundColor: COLORS.GREY3,
            color: COLORS.WHITE,
          }}
        />
      </View> */}

      {/* <InputPrimary
        value={input}
        onChange={(value) => setInput(value)}
        placeholder={"Поиск"}
        placeholderColor={COLORS.WHITE}
        containerStyle={{
          backgroundColor: COLORS.GREY3,
          marginBottom: 10,
        }}
        inputStyle={{
          backgroundColor: COLORS.GREY3,
          color: COLORS.WHITE,
        }}
        onSearch={() => console.log("onSearch!!")}
      /> */}

      {/* <Box
        cover={Assets.images.cover1}
        title="title"
        text="text"
        // right="right"
        containerStyle={{ marginTop: 10 }}
      /> */}

      {/* <View style={{ marginTop: 20 }} />
      <TrainerBox
        avatar={Assets.images.avatar}
        name="Дима Пономарев"
        speciality="Тренер по фитнесу"
        age={23}
        city="city 1"
        experience={5}
      /> */}

      {/* <View style={{ marginTop: 20 }} />
      <NutritionBox simple /> */}

      <View style={{ marginTop: 20 }} />
      <ButtonSecondary
        text="Статус"
        onPress={() => console.log("ButtonSecondary")}
      />

      <View style={{ marginTop: 20 }} />
      <ButtonTabs
        active={active1}
        setActive={setActive1}
        titles={["Title 1", "Title 2"]}
        primary
        containerStyle={{
          justifyContent: "center",
        }}
      />

      <View style={{ marginTop: 20 }} />
      <ButtonTabs
        active={active2}
        setActive={setActive2}
        titles={["Title 1", "Title 2", "Title 3", "Title 4", "Title 5"]}
        secondary
        containerStyle={{
          justifyContent: "center",
          backgroundColor: "transparent",
        }}
      />

      {/* <View style={{ marginTop: 20 }} />
      <ButtonTabs
        active={active2}
        setActive={setActive2}
        titles={["Title 1", "Title 2"]}
        secondary
        containerStyle={{
          justifyContent: "center",
          backgroundColor: "transparent",
        }}
      /> */}

      <View style={{ marginTop: 20 }} />
      <ButtonTabs
        active={active3}
        setActive={setActive3}
        titles={["Title 1", "Title 2", "Title 3"]}
        containerStyle={{
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "transparent",
        }}
      />
    </View>
  );
};

export default Example;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: COLORS.BLACK,
  },
});
