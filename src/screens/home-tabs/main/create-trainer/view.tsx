import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import {
  ButtonSecondary,
  Header,
  InputPrimary,
} from "../../../../components/common";
import SelectPrimary from "../../../../components/common/SelectPrimary";
import { CreateTrainerHook } from "./hooks";
import { styles } from "./style";
import { GENDER } from "../../../../types";

const CreateTrainerView = () => {
  const { onChange, onTrainerSubmit, trainer } = CreateTrainerHook();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header title="Создание тренера" />
      </View>
      <ScrollView style={styles.contentContainer}>
        <Text style={[styles.textOne, { marginVertical: 10 }]}>Ф.И.О </Text>
        <InputPrimary
          disablePlaceholder
          inputStyle={styles.input}
          containerStyle={styles.inputCont}
          onChange={onChange("name")}
        />
        <Text style={[styles.textOne, { marginVertical: 10 }]}>
          Номер телефона
        </Text>
        <InputPrimary
          disablePlaceholder
          inputStyle={styles.input}
          containerStyle={styles.inputCont}
          onChange={onChange("phoneNumber")}
        />
        <Text style={[styles.textOne, { marginVertical: 10 }]}>Почта</Text>
        <InputPrimary
          disablePlaceholder
          inputStyle={styles.input}
          containerStyle={styles.inputCont}
          onChange={onChange("email")}
        />
        <Text style={[styles.textOne, { marginVertical: 10 }]}>Возраст </Text>
        <InputPrimary
          disablePlaceholder
          inputStyle={styles.input}
          containerStyle={styles.inputCont}
          onChange={onChange("age")}
        />
        <Text style={[styles.textOne, { marginVertical: 10 }]}>Город </Text>
        <InputPrimary
          disablePlaceholder
          inputStyle={styles.input}
          containerStyle={styles.inputCont}
          onChange={onChange("city")}
        />
        <Text style={[styles.textOne, { marginVertical: 10 }]}>Аватар </Text>
        <InputPrimary
          disablePlaceholder
          inputStyle={styles.input}
          containerStyle={styles.inputCont}
          onChange={onChange("avatar")}
        />
        <Text style={[styles.textOne, { marginVertical: 10 }]}>
          Специализация{" "}
        </Text>
        <InputPrimary
          disablePlaceholder
          inputStyle={styles.input}
          containerStyle={styles.inputCont}
          onChange={onChange("speciality")}
        />
        <Text style={[styles.textOne, { marginVertical: 10 }]}>Опыт </Text>
        <InputPrimary
          disablePlaceholder
          inputStyle={styles.input}
          containerStyle={styles.inputCont}
          onChange={onChange("experience")}
        />
        <Text style={[styles.textOne, { marginVertical: 10 }]}>
          Образование{" "}
        </Text>
        <InputPrimary
          disablePlaceholder
          inputStyle={styles.input}
          containerStyle={styles.inputCont}
          onChange={onChange("education")}
        />
        <Text style={[styles.textOne, { marginVertical: 10 }]}>Телеграм</Text>
        <InputPrimary
          disablePlaceholder
          inputStyle={styles.input}
          containerStyle={styles.inputCont}
          onChange={onChange("telegramLink")}
        />
        <Text style={[styles.textOne, { marginVertical: 10 }]}>Инстаграм</Text>
        <InputPrimary
          disablePlaceholder
          inputStyle={styles.input}
          containerStyle={styles.inputCont}
          onChange={onChange("instagramLink")}
        />
        <Text style={[styles.textOne, { marginVertical: 10 }]}>Пол</Text>
        <SelectPrimary
          data={[
            { label: "Мужской", value: GENDER.MALE },
            { label: "Женский", value: GENDER.FEMALE },
          ]}
          onChange={onChange("trainerGenderType")}
        />

        <Text style={[styles.textOne, { marginVertical: 10 }]}>О себе</Text>
        <InputPrimary
          multiline={true}
          disablePlaceholder
          inputStyle={styles.input}
          containerStyle={styles.inputCont}
          onChange={onChange("aboutMe")}
        />

        <ButtonSecondary
          containerStyle={{
            width: "100%",
            marginVertical: 20,
            paddingVertical: 15,
          }}
          text="Save"
          onPress={onTrainerSubmit}
        />
      </ScrollView>
    </View>
  );
};

export default CreateTrainerView;
