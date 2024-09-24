import { StyleSheet } from 'react-native'
import { COLORS } from '../../../../constants/COLORS'

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.BLACK,
		paddingHorizontal: 20
	},
	text: {
		color: COLORS.GREY4,
		marginRight: 20,
		marginVertical: 5,
		marginBottom: 10
	}
})
