import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import AdItem from "./ad-item";
import { styles } from "./styles";
import { ButtonSecondary, InputPrimary } from "../../../../components/common";
import { useAdsHook } from "./hooks";

const sliderWidth = Dimensions.get("window").width;
const itemWidth = sliderWidth - 30;

const AdsScreen = () => {
  const { onInputChange, onAdSubmit, loading, ads, fetchAds } = useAdsHook();

  return (
    <View style={styles.container}>
      <View>
        <Carousel
          data={ads}
          renderItem={({ ...rest }) => <AdItem {...rest} fetchAds={fetchAds} />}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
        />
      </View>
      <View style={{ marginHorizontal: 15 }}>
        <Text style={[styles.textOne, { marginVertical: 10 }]}>
          Чтобы добавить рекламу, пожалуйста, заполните поля ниже
        </Text>
        <Text style={[styles.textOne, { marginVertical: 10 }]}>
        Ссылка на Изображения
        </Text>
        <InputPrimary
          disablePlaceholder
          inputStyle={styles.input}
          containerStyle={styles.inputCont}
          onChange={onInputChange("imageUrl")}
        />
        <Text style={[styles.textOne, { marginVertical: 10 }]}>
          Ссылка на видео
        </Text>
        <InputPrimary
          disablePlaceholder
          inputStyle={styles.input}
          containerStyle={styles.inputCont}
          onChange={onInputChange("videoUrl")}
        />
        <Text style={[styles.textOne, { marginVertical: 10 }]}>
          Ссылка на сайт
        </Text>
        <InputPrimary
          disablePlaceholder
          inputStyle={styles.input}
          containerStyle={styles.inputCont}
          onChange={onInputChange("link")}
        />
        {loading ? (
          <ActivityIndicator />
        ) : (
          <ButtonSecondary
            containerStyle={{
              width: "100%",
              marginVertical: 20,
              paddingVertical: 15,
            }}
            text="Cоздать"
            onPress={onAdSubmit}
          />
        )}
      </View>
    </View>
  );
};

export default AdsScreen;
