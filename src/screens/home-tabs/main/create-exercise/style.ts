import { StyleSheet } from 'react-native'
import { COLORS } from '../../../../constants/COLORS'

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.BLACK,
		paddingBottom: 20,
		paddingTop: 50
	},
	header: { marginHorizontal: 20, marginBottom: 20 },
	inputCont: {
		marginTop: 12,
		borderRadius: 10,
		backgroundColor: COLORS.GREY2,
		paddingBottom: 15,
		paddingTop: 15
	},
	input: {
		color: COLORS.WHITE,
		backgroundColor: COLORS.GREY2
	},
	textOne: { fontSize: 12, fontWeight: '600', color: COLORS.WHITE },
	contentContainer: { marginBottom: 55, paddingRight: 20, paddingLeft: 20 },
	categoryContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	plusContainer: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 30,
		borderColor: COLORS.RED,
		borderWidth: 2
	},
	imageSelect: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 30,
		borderColor: COLORS.RED,
		borderWidth: 2,
		marginTop: 20
	},
	plusIcon: {
		width: 20,
		height: 20,
		transform: [{ rotate: '45deg' }]
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
	}
})
