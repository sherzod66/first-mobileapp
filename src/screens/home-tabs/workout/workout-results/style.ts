import { Platform, StyleSheet } from 'react-native'
import { COLORS } from '../../../../constants/COLORS'

export const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: COLORS.BLACK, paddingHorizontal: 20 },
	modal: {
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, .55)'
	},
	modalBox: {
		padding: 25,
		paddingTop: 20,
		borderRadius: 10,
		backgroundColor: COLORS.GREY2,
		alignItems: 'center'
	},
	modalTitle: {
		fontSize: 12,
		lineHeight: 16,
		fontWeight: '600',
		color: COLORS.WHITE
	},
	btn: {
		paddingVertical: 18,
		backgroundColor: COLORS.RED,
		marginBottom: 80
	},
	btnText: {
		fontSize: 15,
		lineHeight: 15,
		fontWeight: '700',
		color: COLORS.WHITE
	},
	modalMain: {
		marginTop: 6,
		alignSelf: 'stretch',
		flexDirection: 'row'
	},
	modalLeft: {
		flex: 1,
		alignItems: 'center'
	},
	modalRight: {
		flex: 1,
		marginLeft: 20,
		alignItems: 'center'
	},
	modalInputCont: {
		marginTop: 12,
		borderRadius: 10,
		backgroundColor: COLORS.GREY12
	},
	modalInput: {
		color: COLORS.WHITE,
		backgroundColor: 'transparent'
	},
	modalError: {
		marginTop: 20,
		color: COLORS.RED2
	},
	modalBtnText: {
		fontSize: 11,
		lineHeight: 16,
		fontWeight: '600',
		color: COLORS.WHITE
	},
	modalBtn: {
		paddingVertical: 10,
		paddingHorizontal: 40,
		backgroundColor: COLORS.RED2
	},
	titleRow: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	title: {
		fontSize: 21,
		lineHeight: 28,
		fontWeight: '700',
		marginRight: 10,
		color: COLORS.WHITE
	},
	title2: {
		fontSize: 16,
		lineHeight: 22,
		fontWeight: '400'
	},
	content: {
		flex: 1,
		paddingBottom: Platform.OS === 'ios' ? 100 : 75
	},
	row: {
		marginTop: 20
	},
	head: {
		flexDirection: 'row',
		alignItems: 'center'
		// backgroundColor: "aqua",
		// justifyContent: "space-between",
	},
	main: {
		marginTop: 20,
		flexDirection: 'row'
	},
	mainLeft: {
		justifyContent: 'space-around'
	},
	mainRight: {
		flex: 1,
		marginLeft: 16,
		flexDirection: 'row'
	},
	text: {
		width: 150,
		fontSize: 15,
		lineHeight: 21,
		fontWeight: '600',
		color: COLORS.WHITE
	},
	textLast: {
		width: '100%',
		fontSize: 15,
		lineHeight: 21,
		fontWeight: '600',
		marginTop: 10,
		color: COLORS.GREEN,
		textAlign: 'center'
	},
	text2: {
		fontSize: 13,
		lineHeight: 16,
		fontWeight: '600',
		color: COLORS.WHITE
	},
	btnStyle: {
		marginLeft: 10,
		borderRadius: 10,
		paddingVertical: 8,
		paddingHorizontal: 28,
		borderColor: COLORS.RED2
	},
	btnTextStyle: {
		fontSize: 13,
		lineHeight: 16,
		fontWeight: '600',
		color: COLORS.RED2
	},
	input: {
		width: 64,
		height: 72,
		marginLeft: 10,
		borderRadius: 10,
		backgroundColor: COLORS.GREY2
	}
})
