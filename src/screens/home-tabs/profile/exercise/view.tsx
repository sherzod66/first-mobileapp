import { View, Text, SafeAreaView } from "react-native";
import { styles } from "./style";
import { Header } from "../../../../components/common";
import { ExerciseHooks } from "./hooks";

const ExerciseView = () => {
  const { exercise } = ExerciseHooks();

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
        <Header title={exercise.title} />
      </View>
      <View>
        <View style={styles.videoContainer} />
        <Text style={styles.text}>{exercise.description}</Text>
        <Text style={styles.text}>{exercise.metadescription}</Text>
      </View>
    </View>
  );
};

export default ExerciseView;
