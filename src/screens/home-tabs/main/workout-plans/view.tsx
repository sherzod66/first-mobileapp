import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { styles } from './style'
import { Assets } from '../../../../utils/requireAssets'
import { Box, ButtonPrimary, ButtonTabs, Header } from '../../../../components/common'
import { WorkoutPlansHooks } from './hooks'
import { formatPrice } from '../../../../utils/formatPrice'

const WorkoutPlansView = () => {
	const {
		activeGender,
		setActiveGender,
		activeLevel,
		setActiveLevel,
		workoutPlans,
		onPress,
		onIndividualPress,
		loading,
		setShow,
		show,
		onRemove,
		isSuperAdmin,
		t
	} = WorkoutPlansHooks()
	const textsMapper = {
		0: t('new-bie-description'),
		1: t('experienced-description'),
		2: t('advanced-description')
	}
	return (
		<View style={styles.container}>
			<SafeAreaView />

			<View style={styles.header}>
				<Header title={t('training-programs')} />
			</View>
			<ButtonTabs
				primary
				active={activeGender}
				setActive={setActiveGender}
				titles={[t('mans'), t('womans')]}
				containerStyle={styles.genderBtnCont}
				scroll={false}
			/>
			<ButtonTabs
				secondary
				active={activeLevel}
				setActive={setActiveLevel}
				titles={[t('newbie'), t('experienced'), t('advanced')]}
				containerStyle={styles.levelBtnCont}
				scroll={true}
			/>

			<Text style={styles.text}>{textsMapper[activeLevel]}</Text>

			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.main}>
					{workoutPlans.map((workoutPlan, i) => (
						<TouchableOpacity activeOpacity={0.7} key={workoutPlan._id} onPress={() => onPress(i)}>
							<Box
								dots={isSuperAdmin}
								dotsLoading={loading && loading[i]}
								show={show && show[i]}
								setShow={() => setShow({ [i]: !(show && show[i]) })}
								cover={Assets.images.cover1}
								title={workoutPlan.title}
								text={workoutPlan.creator.name}
								onRemove={() => onRemove(workoutPlan._id, i)}
								containerStyle={{ marginTop: 15 }}
								right={workoutPlan.price ? `${formatPrice(workoutPlan.price)} UZS` : t('free')}
							/>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>

			<View style={styles.buttonCont}>
				<ButtonPrimary
					text={t('order-program')}
					fill
					style={styles.button}
					textStyle={styles.buttonText}
					onPress={onIndividualPress}
				/>
			</View>
		</View>
	)
}

export default WorkoutPlansView
