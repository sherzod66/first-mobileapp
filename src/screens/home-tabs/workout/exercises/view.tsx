import React from "react";
import { View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import {
  Box,
  ButtonPrimary,
  ButtonTabs,
  Header,
} from "../../../../components/common";
import { WorkoutExercisesHooks } from "./hooks";
import { Assets } from "../../../../utils/requireAssets";
import { Env } from "../../../../../env";
import ButtonTabsMy from "../../../../components/common/ButtonTabsMy";

const WorkoutExercisesScreen = () => {
  const {
    isFavorite,
    setIsFavorite,
    activeCategory,
    setActiveCategory,
    activeSubCategory,
    setActiveSubCategory,
    exerciseCategories,
    language,
    exercises,
    selected,
    onSelect,
    onAdd,
    i18n,
  } = WorkoutExercisesHooks();

  return (
    <View style={styles.container}>
      <SafeAreaView />

      <Header />

      <ButtonTabs
        primary
        active={isFavorite}
        setActive={setIsFavorite}
        titles={["Выбранные", "База упражнений"]}
        containerStyle={styles.favoriteBtnCont}
        scroll={false}
      />

      <ButtonTabs
        secondary
        active={activeCategory}
        setActive={setActiveCategory}
        titles={[
          ...exerciseCategories.map(
            (a) => a.name[i18n.language as "ru" | "en" | "uz"]
          ),
        ]}
        containerStyle={styles.categoryBtnCont}
      />

      <ButtonTabsMy
        active={activeSubCategory}
        setActive={setActiveSubCategory}
        titles={[
          ...exerciseCategories[activeCategory].children.map(
            (a) => a.name[i18n.language as "ru" | "en" | "uz"]
          ),
        ]}
        containerStyle={styles.subCategoryBtnCont}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {exercises.map((e, i) => (
          <TouchableOpacity
            key={e._id}
            activeOpacity={0.6}
            style={{ marginTop: 10 }}
          >
            <Box
              canSelectIn
              selectIn={
                !!selected.find(
                  (a) => a.exercise._id.toString() === e._id.toString()
                )
              }
              onSelectIn={() => onSelect(e)}
              title={e.title[i18n.language as "ru" | "en" | "uz"]}
              cover={{ uri: `${Env.StaticUrl}${e.image}` }}
              containerStyle={{ marginTop: 10 }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {!!!selected.length && <View style={{ marginBottom: 100 }} />}

      {!!selected.length && (
        <View style={{ paddingBottom: 90 }}>
          <ButtonPrimary
            fill
            onPress={onAdd}
            text={`Добавить (${selected.length}) упражнений`}
            style={styles.button}
            textStyle={styles.buttonText}
          />
        </View>
      )}
    </View>
  );
};

export default WorkoutExercisesScreen;
