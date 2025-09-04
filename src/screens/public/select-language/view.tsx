import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { styles } from './style';
import { FC } from 'react';
import { SelectLanguageHooks } from './hooks';

const SelectLanguageView: FC<{ press: () => void }> = ({ press }) => {
  const { changeLanguage, languageInfo } = SelectLanguageHooks(press);
  return (
    <View>
      <ImageBackground
        style={styles.imageBack}
        source={require('../../../assets/images/BG.png')}
      ></ImageBackground>
      <FlatList
        style={styles.list}
        data={languageInfo}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => changeLanguage(item.key)}
            style={styles.item}
            key={item.key}
          >
            <ImageBackground style={styles.flag} source={item.imagePath} />
            <Text style={styles.text}>{item.value}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SelectLanguageView;
