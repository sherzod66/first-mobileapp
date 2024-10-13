import { View, ScrollView, TouchableOpacity } from 'react-native'
import { styles } from './style'
import { Assets } from '../../../../../utils/requireAssets'
import { Box, ButtonPrimary, EmptyComponent } from '../../../../../components/common'
import { MyWorkoutPlansHooks } from './hooks'
import { ROLES } from '../../../../../types'

const MyWorkoutPlansView = () => {
	const { onPress, onCreate, onRemove, workoutPlans, loading, show, setShow, user, trainer, t } =
		MyWorkoutPlansHooks()
	return (
		<View style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={{ marginTop: 20, marginBottom: 10 }}>
					{!!workoutPlans?.length ? (
						workoutPlans.map((w, i) => (
							<TouchableOpacity
								key={w._id}
								onPress={() => onPress(w)}
								activeOpacity={0.6}
								style={{ marginBottom: 10 }}
							>
								<Box
									dots
									dotsLoading={loading && loading[i]}
									show={show && show[i]}
									setShow={() => setShow({ [i]: !(show && show[i]) })}
									onRemove={() => onRemove(i)}
									cover={Assets.images.cover1}
									title={w.title}
									right={w.price ? `${w.price}` : t('free')}
									containerStyle={{ marginTop: 10 }}
								/>
							</TouchableOpacity>
						))
					) : (
						<EmptyComponent />
					)}
				</View>
			</ScrollView>

			<View style={{ paddingBottom: 90, paddingTop: 20 }}>
				{user?.role === ROLES.SUPERADMIN && (
					<ButtonPrimary
						fill
						onPress={onCreate}
						style={styles.button}
						text={t('make-a-program')}
						textStyle={styles.buttonText}
					/>
				)}
				{user?.role === ROLES.TRAINER && (
					<ButtonPrimary
						fill
						onPress={onCreate}
						style={styles.button}
						text={t('make-a-program')}
						textStyle={styles.buttonText}
					/>
				)}
			</View>
		</View>
	)
}

export default MyWorkoutPlansView
