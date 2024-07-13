import {
  Image,
  ImageStyle,
  StyleProp,
  ImageSourcePropType,
} from "react-native";
import { COLORS } from "../../constants/COLORS";

interface IProps {
  width?: number | string;
  height?: number | string;
  tintColor?: string;
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
}

const Icon = ({
  source,
  width = 20,
  height = 20,
  tintColor = COLORS.WHITE,
  style,
}: IProps) => (
  <Image source={source} style={[style, { width, height, tintColor }]} />
);

export default Icon;
