import {
	View,
	Text,
	StyleSheet,
	StyleProp,
	TextStyle,
	ViewStyle,
	TouchableOpacity,
	ActivityIndicator
} from 'react-native'
import { COLORS } from '../../constants/COLORS'

interface IProps {
	text: string
	textStyle?: StyleProp<TextStyle>
	containerStyle?: StyleProp<ViewStyle>
	onPress: () => void
	loading?: boolean
	disabled?: boolean
}

const ButtonSecondary = ({
	text,
	textStyle,
	containerStyle,
	onPress,
	loading,
	disabled
}: IProps) => {
	return (
		<TouchableOpacity onPress={onPress} disabled={disabled}>
			<View style={[styles.container, containerStyle]}>
				{loading ? (
					<ActivityIndicator size={'small'} color={COLORS.WHITE} />
				) : (
					<Text style={[styles.text, textStyle, disabled && { opacity: 0.25 }]}>{text}</Text>
				)}
			</View>
		</TouchableOpacity>
	)
}

export default ButtonSecondary

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderRadius: 30,
		paddingVertical: 5,
		paddingHorizontal: 15,
		alignSelf: 'flex-start',
		borderColor: COLORS.WHITE
	},
	text: {
		fontSize: 11,
		lineHeight: 16,
		fontWeight: '600',
		textAlign: 'center',
		color: COLORS.WHITE,
		textAlignVertical: 'center'
	}
})
