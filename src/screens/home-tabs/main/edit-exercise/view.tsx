import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ButtonSecondary,
  Header,
  InputPrimary,
} from "../../../../components/common";
import { CreateExerciseHook } from "./hooks";
import { styles } from "./style";
import { imageLink } from "../../../../utils/imageLink";
import { COLORS } from "../../../../constants/COLORS";

const CreateExerciseView = () => {
  const {
    exercise,
    changeValue,
    onExerciseSubmit,
    ImagePicker,
    isLoading,
    setExercise,
  } = CreateExerciseHook();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header title="Редактирование упражнения" />
      </View>
      <ScrollView style={styles.contentContainer}>
        <Text style={[styles.textOne, { marginVertical: 10 }]}>
          Название (Ru)
        </Text>
        <InputPrimary
          disablePlaceholder
          inputStyle={styles.input}
          containerStyle={styles.inputCont}
          value={exercise.title.ru}
          onChange={(e) =>
            setExercise((prev) => ({
              ...prev,
              title: {
                en: prev.title ? prev.title.en : "",
                ru: e,
                uz: prev.title ? prev.title.uz : "",
              },
            }))
          }
        />
        <Text style={[styles.textOne, { marginVertical: 10 }]}>
          Название (Uz)
        </Text>
        <InputPrimary
          disablePlaceholder
          inputStyle={styles.input}
          containerStyle={styles.inputCont}
          value={exercise.title.uz}
          onChange={(e) =>
            setExercise((prev) => ({
              ...prev,
              title: {
                en: prev.title ? prev.title.en : "",
                ru: prev.title ? prev.title.ru : "",
                uz: e,
              },
            }))
          }
        />
        <Text style={[styles.textOne, { marginVertical: 10 }]}>
          Название (En)
        </Text>
        <InputPrimary
          disablePlaceholder
          inputStyle={styles.input}
          containerStyle={styles.inputCont}
          value={exercise.title.en}
          onChange={(e) =>
            setExercise((prev) => ({
              ...prev,
              title: {
                en: e,
                ru: prev.title ? prev.title.ru : "",
                uz: prev.title ? prev.title.uz : "",
              },
            }))
          }
        />
        <Text style={[styles.textOne, { marginVertical: 10 }]}>
          Описание (Ru)
        </Text>
        <InputPrimary
          multiline={true}
          disablePlaceholder
          value={exercise.description.ru}
          inputStyle={styles.input}
          containerStyle={styles.inputCont}
          onChange={(e) =>
            setExercise((prev) => ({
              ...prev,
              description: {
                en: prev.description ? prev.description.en : "",
                ru: e,
                uz: prev.description ? prev.description.uz : "",
              },
            }))
          }
        />
        <Text style={[styles.textOne, { marginVertical: 10 }]}>
          Описание (Uz)
        </Text>
        <InputPrimary
          multiline={true}
          disablePlaceholder
          value={exercise.description.uz}
          inputStyle={styles.input}
          containerStyle={styles.inputCont}
          onChange={(e) =>
            setExercise((prev) => ({
              ...prev,
              description: {
                en: prev.description ? prev.description.en : "",
                ru: prev.description ? prev.description.ru : "",
                uz: e,
              },
            }))
          }
        />
        <Text style={[styles.textOne, { marginVertical: 10 }]}>
          Описание (En)
        </Text>
        <InputPrimary
          multiline={true}
          disablePlaceholder
          value={exercise.description.en}
          inputStyle={styles.input}
          containerStyle={styles.inputCont}
          onChange={(e) =>
            setExercise((prev) => ({
              ...prev,
              description: {
                en: e,
                ru: prev.description ? prev.description.ru : "",
                uz: prev.description ? prev.description.uz : "",
              },
            }))
          }
        />
        <Text style={[styles.textOne, { marginVertical: 10 }]}>
          Описание(Meta)
        </Text>
        <InputPrimary
          multiline={true}
          disablePlaceholder
          inputStyle={styles.input}
          value={exercise.metadescription}
          containerStyle={styles.inputCont}
          onChange={(e) => changeValue(e, "metadescription")}
        />
        {exercise.image &&
          (isLoading ? (
            <View style={styles.absolute}>
              <ActivityIndicator color={COLORS.WHITE} size={"small"} />
            </View>
          ) : (
            <Image
              style={{
                width: "100%",
                height: 150,
                marginTop: 15,
                borderRadius: 5,
              }}
              source={{ uri: imageLink(exercise.image) }}
            />
          ))}

        <TouchableOpacity style={styles.imageSelect} onPress={ImagePicker}>
          <Text style={[styles.textOne, { marginVertical: 10 }]}>
            Выбрать другое фото
          </Text>
        </TouchableOpacity>
        <Text style={[styles.textOne, { marginVertical: 10 }]}>
          Ссылка на видео
        </Text>
        <InputPrimary
          disablePlaceholder
          inputStyle={styles.input}
          value={exercise.video}
          containerStyle={styles.inputCont}
          onChange={(e) => changeValue(e, "video")}
        />
        <ButtonSecondary
          containerStyle={{
            width: "100%",
            marginVertical: 20,
            paddingVertical: 15,
          }}
          text="Редактировать"
          onPress={onExerciseSubmit}
        />
      </ScrollView>
    </View>
  );
};

export default CreateExerciseView;
