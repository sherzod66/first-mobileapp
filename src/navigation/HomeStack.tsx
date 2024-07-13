import { View, Text, StyleSheet, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainStack from "../screens/home-tabs/main";
import WorkoutStack from "../screens/home-tabs/workout";
import NutritionStack from "../screens/home-tabs/nutrition";
import ProfileStack from "../screens/home-tabs/profile";
import { TabBarIcon } from "../components";
import { ROUTES } from "./ROUTES";
import { COLORS } from "../constants/COLORS";

const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon route={route} focused={focused} />
          ),
          tabBarShowLabel: false,
          tabBarShowIcon: true,
          tabBarStyle: styles.tabBarStyle,
          // tabBarActiveBackgroundColor: "red",
          
          // tabBarStyle: { backgroundColor: "red" },
          tabBarBackground: () => <View style={{ backgroundColor: "green" }} />,
        })}
      >
        <Tab.Screen name={ROUTES.TABS.MAIN.TAB} component={MainStack} />
        <Tab.Screen name={ROUTES.TABS.WORKOUT.TAB} component={WorkoutStack} />
        <Tab.Screen
          name={ROUTES.TABS.NUTRITION.TAB}
          component={NutritionStack}
        />
        <Tab.Screen name={ROUTES.TABS.PROFILE.TAB} component={ProfileStack} />
      </Tab.Navigator>
    </View>
  );
};

export default HomeStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "aquamarine",
  },
  tabBarStyle: {
    position: "absolute",
    // bottom: 4,
    backgroundColor: COLORS.GREY7,
    height: Platform.OS === "ios" ? 80 : 55,
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    paddingHorizontal: 25,
  },
});
