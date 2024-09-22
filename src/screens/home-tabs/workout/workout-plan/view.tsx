import { View, Text, TouchableOpacity } from 'react-native'
import { ButtonPrimary, Header } from '../../../../components/common'
import { COLORS } from '../../../../constants/COLORS'
import { WorkoutPlanHooks } from './hooks'
import { styles } from './style'
import ReactNativeModal from 'react-native-modal'

const WorkoutPlanView = () => {
	const {
		workoutPlan,
		onPress,
		loading,
		disabled,
		plan,
		trainer,
		isTrainer,
		isShow,
		onModalToggle,
		onSelect,
		selected,
		onSubmitAdd,
		user
	} = WorkoutPlanHooks()

	return (
		<View style={styles.container}>
			<View style={{ marginHorizontal: 20, marginTop: 50 }}>
				<Header title={workoutPlan.title} />
			</View>

			<View style={{ flex: 1, justifyContent: 'space-between' }}>
				<View>
					<Text style={styles.text}>{workoutPlan.description}</Text>
				</View>

				<View style={{ marginHorizontal: 30, marginBottom: 90 }}>
					<ButtonPrimary
						fill
						onPress={onPress}
						loading={loading}
						disabled={disabled}
						style={styles.button}
						loadingColor={COLORS.WHITE}
						textStyle={styles.buttonText}
						text={'Добавить в “ Дневник Тренировок “'}
					/>
					{isTrainer && trainer?.isEducation && plan?.creatorUser?._id === user?._id && (
						<ButtonPrimary
							fill
							onPress={onModalToggle}
							loading={loading}
							disabled={disabled}
							style={styles.button}
							loadingColor={COLORS.WHITE}
							textStyle={styles.buttonText}
							text={'Отправить ученикам'}
						/>
					)}
				</View>
			</View>
			<ReactNativeModal
				isVisible={isShow}
				onDismiss={onModalToggle}
				onBackButtonPress={onModalToggle}
				onBackdropPress={onModalToggle}
			>
				<View style={styles.modalContainer}>
					{trainer &&
						trainer.disciples.map(item => (
							<View style={styles.box} key={`${item._id}`}>
								<View style={styles.header}>
									<View>
										<Text style={styles.text1}>{item.name}</Text>
										<Text style={styles.text2}>{`email: ${item.phoneNumber}`}</Text>
									</View>
									<TouchableOpacity style={styles.checkbox} onPress={() => onSelect(item)}>
										{selected.find(s => s._id === item._id) && (
											<View style={styles.checkboxFilled} />
										)}
									</TouchableOpacity>
								</View>
							</View>
						))}
					{selected.length > 0 && (
						<ButtonPrimary
							fill
							onPress={onSubmitAdd}
							loading={loading}
							disabled={disabled}
							style={styles.send}
							loadingColor={COLORS.WHITE}
							textStyle={styles.buttonText}
							text={'Отправить ученикам'}
						/>
					)}
				</View>
			</ReactNativeModal>
		</View>
	)
}

export default WorkoutPlanView
