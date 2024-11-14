import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { TrainerBox } from '../../../../components'
import { ButtonPrimary, ButtonTabs, Header, InputPrimary } from '../../../../components/common'
import { COLORS } from '../../../../constants/COLORS'
import { TrainersHooks } from './hooks'
import { styles } from './style'
import { imageLink } from '../../../../utils/imageLink'

const TrainersView = () => {
	const {
		search,
		setSearch,
		active,
		setActive,
		trainers,
		onPress,
		individual,
		isSuperAdmin,
		onCreateTrainer,
		workout,
		onUpdate,
		t
	} = TrainersHooks()

	return (
		<View style={styles.container}>
			<SafeAreaView />

			<Header title={individual ? t('individual-program2') : t('trainers')} />

			{individual && (
				<Text style={styles.text}>
					{`Чтобы заказать индивидуальный ${
						workout ? 'план тренировок' : 'план питания'
					} вам нужно выбрать тренера и написать ему в мессенджер, который указан в его профиле`}
				</Text>
			)}

			<InputPrimary
				value={search}
				onChange={value => setSearch(value)}
				placeholder={t('search')}
				placeholderColor={COLORS.WHITE}
				containerStyle={{
					backgroundColor: COLORS.GREY3,
					marginTop: 10,
					borderRadius: 10,
					paddingBottom: 15,
					paddingTop: 15

				}}
				inputStyle={{
					backgroundColor: COLORS.GREY3,
					color: COLORS.WHITE
				}}
				onSearch={() => console.log('onSearch!!')}
			/>

			<ButtonTabs
				active={active}
				setActive={setActive}
				titles={[t('mans'), t('womans')]}
				primary
				containerStyle={{
					justifyContent: 'center',
					marginVertical: 20
				}}
				scroll={false}
			/>

			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={{ marginBottom: 100 }}>
					{trainers.map((trainer, i) => (
						<TouchableOpacity
							key={trainer._id}
							onPress={() => onPress(i)}
							activeOpacity={0.7}
							style={{ marginBottom: 10 }}
						>
							<TrainerBox
								avatar={{ uri: imageLink(trainer.avatar) }}
								name={trainer.name}
								speciality={trainer.speciality}
								age={trainer.age}
								city={trainer.city}
								experience={trainer.experience}
								id={trainer._id}
								trainer={trainer}
								isFitness={false}
								onUpdate={onUpdate}
							/>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>
			{isSuperAdmin && (
				<View style={styles.createButtonContainer}>
					<ButtonPrimary text={t('add-trainer')} onPress={onCreateTrainer} />
				</View>
			)}
		</View>
	)
}

export default TrainersView
