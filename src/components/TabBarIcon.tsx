import { View, Text } from "react-native";
import { COLORS } from "../constants/COLORS";
import { ROUTES } from "../navigation/ROUTES";
import { Assets } from "../utils/requireAssets";
import { Icon } from "./common";

interface IProps {
  focused?: boolean;
  route: any;
}

const getObj = (route: any) => {
  switch (route.name) {
    case ROUTES.TABS.MAIN.TAB:
      return {
        icon: Assets.icons.home1,
        label: "Main",
      };
    case ROUTES.TABS.WORKOUT.TAB:
      return {
        icon: Assets.icons.dumbbell1,
        label: "Workout",
      };
    case ROUTES.TABS.NUTRITION.TAB:
      return {
        icon: Assets.icons.nutrition1,
        label: "Nutrition",
      };
    case ROUTES.TABS.PROFILE.TAB:
      return {
        icon: Assets.icons.profile1,
        label: "Profile",
      };
    default:
      return {
        icon: Assets.icons.search,
        label: "Search",
      };
  }
};

const TabBarIcon = ({ focused, route }: IProps) => {
  const { icon, label } = getObj(route);

  return (
    <View style={{ alignItems: "center" }}>
      <Icon
        source={icon}
        tintColor={focused ? COLORS.WHITE : COLORS.GREY6}
      />
      <Text
        style={{
          marginTop: 3,
          fontSize: 11,
          lineHeight: 13,
          fontWeight: "400",
          color: focused ? COLORS.WHITE : COLORS.GREY6,
        }}
      >
        {label}
      </Text>
    </View>
  );
};

export default TabBarIcon;
