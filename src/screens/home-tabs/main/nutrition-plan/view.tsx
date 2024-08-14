import { View, Text } from 'react-native'
import { styles } from './style'
import { NutritionPlanHooks } from './hooks'
import { ButtonPrimary, Header } from '../../../../components/common'

const NutritionPlanView = () => {
	const {
		nutritionPlan,
		loading,
		setLoading,
		disabled,
		onPress,
		isAdmin,
		deleteLoading,
		onDeletePlan
	} = NutritionPlanHooks()
	return (
		<View style={styles.container}>
			<Header title={nutritionPlan.title} />
			<View style={{ flex: 1, justifyContent: 'space-between' }}>
				<View>
					<Text style={styles.text}>{nutritionPlan.description}</Text>
				</View>

				<View style={{ marginHorizontal: 30, marginBottom: 90 }}>
					<ButtonPrimary
						fill
						onPress={onPress}
						loading={loading}
						disabled={disabled}
						style={styles.button}
						textStyle={styles.buttonText}
						text={'Добавить в "Мои планы питания"'}
					/>
					{isAdmin && (
						<ButtonPrimary
							fill
							onPress={onDeletePlan}
							loading={deleteLoading}
							disabled={disabled}
							style={styles.button}
							textStyle={styles.buttonText}
							text={'Удалить план питания'}
						/>
					)}
				</View>
			</View>
		</View>
	)
}

export default NutritionPlanView
