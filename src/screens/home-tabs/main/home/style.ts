import { StyleSheet } from 'react-native'
import { COLORS } from '../../../../constants/COLORS'

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.BLACK
	},
	text1: {
		color: COLORS.WHITE,
		fontSize: 20,
		width: 300,
		textAlign: 'center',
		letterSpacing: 1.5,
		marginTop: 30,
		fontWeight: '900',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginBottom: 15
	}
})
