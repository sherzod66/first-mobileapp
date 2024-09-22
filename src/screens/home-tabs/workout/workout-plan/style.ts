import { StyleSheet } from 'react-native'
import { COLORS } from '../../../../constants/COLORS'

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.BLACK
	},
	text: {
		color: COLORS.GREY4,
		marginHorizontal: 20,
		marginTop: 20
	},
	title: {
		fontSize: 20,
		color: COLORS.WHITE,
		marginHorizontal: 20,
		marginVertical: 15,
		fontWeight: 'bold'
	},
	button: {
		borderRadius: 10,
		paddingVertical: 18,
		backgroundColor: COLORS.RED,
		marginBottom: 10
	},

	send: {
		borderRadius: 10,
		paddingVertical: 18,
		backgroundColor: COLORS.RED,
		marginTop: 10
	},
	buttonText: {
		color: COLORS.WHITE,
		fontWeight: '700',
		fontSize: 15,
		lineHeight: 15
	},
	modalContainer: {
		backgroundColor: COLORS.BLACK,
		padding: 15,
		margin: 15,
		borderRadius: 15,
		borderColor: COLORS.GREY,
		borderWidth: 2
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: '600',
		color: COLORS.WHITE
	},
	box: {
		padding: 18,
		marginTop: 10,
		borderRadius: 10,
		backgroundColor: COLORS.GREY2
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	checkbox: {
		width: 20,
		height: 20,
		padding: 2,
		borderWidth: 1,
		borderRadius: 3,
		borderColor: COLORS.GREY6
	},
	checkboxFilled: {
		width: '100%',
		height: '100%',
		backgroundColor: COLORS.RED2
	},
	text1: {
		fontSize: 14,
		lineHeight: 13,
		fontWeight: '700',
		color: COLORS.WHITE
	},
	text2: {
		marginTop: 3,
		fontSize: 10,
		lineHeight: 13,
		fontWeight: '300',
		color: COLORS.WHITE
	}
})
