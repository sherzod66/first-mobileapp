import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { styles } from "./style";
import { Header } from "../../../../components/common";
// import YouTube from "react-native-youtube";

import Youtube from "react-native-youtube-iframe";
import { WorkoutExerciseHooks } from "./hooks";

function youtube_parser(url: string | undefined) {
  var regExp =
    /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
  var match = url?.match(regExp);
  return match ? match[1] : "";
}

const ExerciseView = () => {
  const { exercise, i18n } = WorkoutExerciseHooks();

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
        <Header title={exercise.title[i18n.language as "ru" | "en" | "uz"]} />
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
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
            {exercise.description[i18n.language as "ru" | "en" | "uz"]}
          </Text>
          {/* <Text style={styles.text}>{exercise.metadescription}</Text> */}
        </View>
      </ScrollView>
    </View>
  );
};

const youtubeStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  youtubePlayer: {
    alignSelf: "stretch",
    height: 200,
  },
});

export default ExerciseView;
