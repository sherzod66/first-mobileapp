import { View, Text, SafeAreaView } from "react-native";
import { Header } from "../../../../components/common";
import { WorkoutExerciseHooks } from "./hooks";
import { styles } from "./style";

import Youtube from "react-native-youtube-iframe";

function youtube_parser(url: string | undefined) {
  var regExp =
    /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
  var match = url?.match(regExp);
  return match ? match[1] : "";
}

const WorkoutExerciseView = () => {
  const { exercise, i18n } = WorkoutExerciseHooks();

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
        <Header title={exercise.title[i18n.language as "ru" | "uz" | "en"]} />
      </View>
      <View>
        <Youtube
          key={exercise.video}
          height={300}
          videoId={youtube_parser(exercise.video)}
          initialPlayerParams={{
            modestbranding: true,
            rel: false,
          }}
          play={true}
        />
        <Text style={styles.text}>
          {exercise.description[i18n.language as "ru" | "uz" | "en"]}
        </Text>
        {/* <Text style={styles.text}>{exercise.metadescription}</Text> */}
      </View>
    </View>
  );
};

export default WorkoutExerciseView;
