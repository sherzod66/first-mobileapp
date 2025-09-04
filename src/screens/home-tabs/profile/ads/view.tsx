import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import AdItem from './ad-item';
import { styles } from './styles';
import { ButtonSecondary, InputPrimary } from '../../../../components/common';
import { useAdsHook } from './hooks';
import Carousel from 'react-native-reanimated-carousel';

const sliderWidth = Dimensions.get('window').width;
const itemWidth = sliderWidth - 30;

const AdsScreen = () => {
  const { onInputChange, onAdSubmit, loading, ads, fetchAds } = useAdsHook();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 500, marginHorizontal: 15 }}>
          <Carousel
            data={ads}
            renderItem={({ ...rest }) => (
              <AdItem {...rest} fetchAds={fetchAds} />
            )}
            height={200}
            autoPlay
            autoPlayInterval={4000} // вместо autoPlayDelay
            width={itemWidth}
          />

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
            onChange={onInputChange('imageUrl')}
          />
          <Text style={[styles.textOne, { marginVertical: 10 }]}>
            Ссылка на видео
          </Text>
          <InputPrimary
            disablePlaceholder
            inputStyle={styles.input}
            containerStyle={styles.inputCont}
            onChange={onInputChange('videoUrl')}
          />
          <Text style={[styles.textOne, { marginVertical: 10 }]}>
            Ссылка на сайт
          </Text>
          <InputPrimary
            disablePlaceholder
            inputStyle={styles.input}
            containerStyle={styles.inputCont}
            onChange={onInputChange('link')}
          />
          {loading ? (
            <ActivityIndicator />
          ) : (
            <ButtonSecondary
              containerStyle={{
                width: '100%',
                marginVertical: 20,
                paddingVertical: 15,
              }}
              text="Cоздать"
              onPress={onAdSubmit}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default AdsScreen;
