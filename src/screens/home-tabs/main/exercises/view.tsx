import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import {
  Box,
  ButtonPrimary,
  ButtonTabs,
  Header,
} from "../../../../components/common";
import { ExercisesHooks } from "./hooks";
import { styles } from "./style";
import { Env } from "../../../../../env";
import ButtonTabsMy from "../../../../components/common/ButtonTabsMy";
import { imageLink } from "../../../../utils/imageLink";

const ExercisesView = () => {
  const {
    activeCategory,
    setActiveCategory,
    activeSubCategory,
    setActiveSubCategory,
    onPress,
    exerciseCategories,
    language,
    exercises,
    onCreate,
    isSuperAdmin,
    onRemove,
    removing,
    setShow,
    show,
    onEdit,
    i18n,
  } = ExercisesHooks();

  return (
    <View style={styles.container}>
      <SafeAreaView />

      <View style={styles.header}>
        <Header title="База упражнений" />
      </View>
      <ButtonTabs
        secondary
        active={activeCategory}
        setActive={setActiveCategory}
        containerStyle={styles.categoryBtnCont}
        titles={[
          ...exerciseCategories.map(
            (a) => a.name[i18n.language as "ru" | "en" | "uz"]
          ),
        ]}
      />
      <ButtonTabsMy
        active={activeSubCategory}
        setActive={setActiveSubCategory}
        containerStyle={styles.subCategoryBtnCont}
        titles={
          !!exerciseCategories && exerciseCategories.length > 0
            ? [
                ...exerciseCategories[activeCategory]?.children.map(
                  (a) => a.name[language]
                ),
              ]
            : []
        }
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.main}>
          {exercises.map((exercise, i) => (
            <TouchableOpacity
              key={exercise._id}
              activeOpacity={0.7}
              onPress={() => onPress(i)}
            >
              <Box
                title={exercise.title[i18n.language as "ru" | "en" | "uz"]}
                containerStyle={{ marginTop: 10 }}
                cover={{ uri: imageLink(exercise.image) }}
                show={show && show[i]}
                setShow={() => setShow({ [i]: !(show && show[i]) })}
                dots={isSuperAdmin}
                dotsLoading={removing}
                onRemove={() => onRemove(exercise._id)}
                onEdit={() => onEdit(i)}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {isSuperAdmin && (
        <View style={styles.createButtonContainer}>
          <ButtonPrimary text="Добавить упражнения" onPress={onCreate} />
        </View>
      )}
    </View>
  );
};

export default ExercisesView;
