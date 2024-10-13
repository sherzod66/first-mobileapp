import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
	LayoutAnimation
} from 'react-native'
import { styles } from './style'
import { ButtonPrimary, Controls, Header, InputPrimary } from '../../../../components/common'
import { CreateWorkoutPlanHooks } from './hooks'
import { COLORS } from '../../../../constants/COLORS'
import Active_Button from '../../../../components/common/Active_Buutton'
import Active_ButtonMy from '../../../../components/common/Active_BuuttonMy'

const CreateWorkoutPlanView = () => {
	const {
		loading,
		title,
		setTitle,
		description,
		setDescription,
		week,
		groupWorkouts,
		incWeek,
		decWeek,
		addGroupWorkout,
		removeGroupWorkout,
		onAddWorkouts,
		onSave,
		name,
		setName,
		isSuperAdminOrTrainer,
		setShouldShow,
		shouldShow,
		drop,
		setDrop,
		setToggle,
		toggle,
		price,
		setPrice,
		setPublic,
		publicly,
		t,
		trainer
	} = CreateWorkoutPlanHooks()

	return (
		<View style={styles.container}>
			<SafeAreaView />
			<Header title='Создание своей программы' />

			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={{ marginBottom: 90 }}>
					{/* <Text style={styles.inputTopText}>{"Имя составителя"}</Text>
          <InputPrimary
            value={title}
            onChange={(t) => setTitle(t)}
            disablePlaceholder
            containerStyle={styles.input}
            inputStyle={styles.inputInner}
          /> */}
					<Text style={styles.inputTopText}>{t('prgramm-name')}</Text>
					<InputPrimary
						value={title}
						onChange={t => setTitle(t)}
						disablePlaceholder
						containerStyle={styles.input}
						inputStyle={styles.inputInner}
					/>
					{/* <Text style={styles.inputTopText}>{"Название программы"}</Text>
          <View style={styles.descriptionBox}>
            <Text style={styles.text}>
              {
                "Для достижения видимого результата в тренировках груди важен прогресс рабочих весов."
              }
            </Text>
          </View> */}

					<Text style={styles.inputTopText}>{t('week-training-quantity')}</Text>

					{groupWorkouts.map((g, i) => (
						<ButtonPrimary
							fill
							key={`/${i}/`}
							text={`${t('training')} ${i + 1}`}
							onPress={() => onAddWorkouts(i)}
							style={g.length ? styles.greenButton : styles.button}
							textStyle={styles.buttonText}
						/>
					))}

					<Controls
						text={t('training')}
						onIncrement={addGroupWorkout}
						onDecrement={removeGroupWorkout}
						textStyle={{ marginTop: 3 }}
					/>

					<Text style={styles.inputTopText}>{t('quantity-weeks')}</Text>

					{new Array(week).fill(1).map((w, i) => (
						<View key={i} style={styles.box}>
							<Text style={styles.boxText}>{`${t('week')} ${i * 4 + 1}-${(i + 1) * 4}`}</Text>
						</View>
					))}

					{/* <Controls
            textStyle={{ marginTop: 3 }}
            text="Недели"
            onDecrement={decWeek}
            onIncrement={incWeek}
          /> */}

					<Text style={styles.inputTopText}>{t('description')}</Text>
					<InputPrimary
						multiline={true}
						disablePlaceholder
						value={description}
						onChange={t => setDescription(t)}
						inputStyle={styles.inputInner}
						containerStyle={styles.inputMultiline}
					/>
					{isSuperAdminOrTrainer && (
						<>
							<Text style={styles.inputTopText}>{t('programm-price')}</Text>
							<InputPrimary
								value={price}
								onChange={t => setPrice(t)}
								placeholder=''
								containerStyle={styles.input}
								inputStyle={styles.inputInner}
							/>
							<>
								<Text style={styles.inputTopText}>{t('level')}</Text>
								<TouchableOpacity
									activeOpacity={0.7}
									style={styles.animated}
									onPress={() => {
										LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
										setShouldShow(!shouldShow)
									}}
								>
									<Text style={styles.textOne}>{drop}</Text>
									{/* {!shouldShow ? <ArrowDown /> : <ArrowUp />} */}
								</TouchableOpacity>
								<View style={{}}>
									{!shouldShow ? (
										<View style={styles.animatedOne}>
											{(
												['Новичок', 'Опытный', 'Продвинутый'] as Array<
													'Новичок' | 'Опытный' | 'Продвинутый'
												>
											).map(e => {
												return (
													<TouchableOpacity
														key={e}
														onPress={() => {
															setShouldShow(true)
															setDrop(e)
														}}
														style={styles.btnLanguage}
													>
														<Text style={styles.textOne}>{e}</Text>
													</TouchableOpacity>
												)
											})}
										</View>
									) : null}
								</View>
							</>
							<View style={styles.activeBox}>
								<Text style={styles.activeText}>{t('by-woman')}</Text>
								<Active_Button toggle={toggle} setToggle={setToggle} />
								<Text style={styles.activeText}>{t('by-man')}</Text>
							</View>
							{trainer?.isEducation && (
								<View style={styles.activeBox}>
									<Text style={styles.activeText}>{t('public')}</Text>
									<Active_ButtonMy toggle={publicly} setToggle={setPublic} />
									<Text style={styles.activeText}>{t('private')}</Text>
								</View>
							)}
						</>
					)}
					<ButtonPrimary
						text={t('save-training-programm')}
						fill
						loading={loading}
						loadingColor={COLORS.WHITE}
						onPress={onSave}
						style={styles.saveBtn}
						textStyle={styles.saveBtnText}
					/>
				</View>
			</ScrollView>
		</View>
	)
}

export default CreateWorkoutPlanView
