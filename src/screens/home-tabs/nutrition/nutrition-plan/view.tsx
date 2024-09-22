import React from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { Header, ButtonPrimary } from '../../../../components/common'
import { convertDishToProduct } from '../../../../utils/convertDishToProduct'
import { getSumValues } from '../../../../utils/getSumValues'
import { NutritionPlanHooks } from './hooks'
import { styles } from './style'
import ButtonTabsMy from '../../../../components/common/ButtonTabsMy'
import { COLORS } from '../../../../constants/COLORS'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ReactNativeModal from 'react-native-modal'
import TouchableNativeFeedback from 'react-native-gesture-handler/lib/typescript/components/touchables/TouchableNativeFeedback.android'

const NutritionPlanView = () => {
	const {
		language,
		plan,
		reception,
		activePlan,
		setActivePlan,
		activeReception,
		setActiveReception,
		loading,
		onAddDiary,
		deleteLoading,
		onDeletePlan,
		isTrainer,
		nutritionPlan,
		onModalToggle,
		onSelect,
		onSubmitAdd,
		trainer,
		user,
		isShow,
		selected
	} = NutritionPlanHooks()

	const { nutritions } = plan

	return plan ? (
		<View style={styles.container}>
			<SafeAreaView />

			<Header title={plan.title} />

			<View style={styles.scrollCont}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.compositionRow}>
						<View style={styles.compositionCol}>
							<Text style={styles.compositionTitle}>{'Белки'}</Text>
							<View style={styles.compositionBox}>
								<View style={styles.compositionBox1}>
									<Text style={styles.compositionText1}>{`${plan.proteinPercent}%`}</Text>
								</View>
								<View style={styles.compositionLine} />
								<View style={styles.compositionBox2}>
									<Text style={styles.compositionText2}>{`${Math.trunc(
										(plan.calories * plan.proteinPercent) / 400
									)}гр`}</Text>
								</View>
							</View>
						</View>
						<View style={styles.compositionCol}>
							<Text style={styles.compositionTitle}>{'Жиры'}</Text>
							<View style={styles.compositionBox}>
								<View style={styles.compositionBox1}>
									<Text style={styles.compositionText1}>{`${plan.oilPercent}%`}</Text>
								</View>
								<View style={styles.compositionLine} />
								<View style={styles.compositionBox2}>
									<Text style={styles.compositionText2}>{`${Math.trunc(
										(plan.calories * plan.oilPercent) / 900
									)}гр`}</Text>
								</View>
							</View>
						</View>
						<View style={styles.compositionCol}>
							<Text style={styles.compositionTitle}>{'Углеводы'}</Text>
							<View style={styles.compositionBox}>
								<View style={styles.compositionBox1}>
									<Text style={styles.compositionText1}>{`${
										100 - (plan.proteinPercent + plan.oilPercent)
									}%`}</Text>
								</View>
								<View style={styles.compositionLine} />
								<View style={styles.compositionBox2}>
									<Text style={styles.compositionText2}>{`${Math.trunc(
										(plan.calories * (100 - (plan.proteinPercent + plan.oilPercent))) / 400
									)}гр`}</Text>
								</View>
							</View>
						</View>
					</View>

					<View style={styles.planTabsCont}>
						<ScrollView horizontal showsHorizontalScrollIndicator={false}>
							<ButtonTabsMy
								secondary
								marginLeft={20}
								active={activePlan}
								setActive={setActivePlan}
								textStyle={styles.planTabsText}
								buttonStyle={styles.planTabsBtn}
								containerStyle={styles.planTabs}
								titles={plan.nutritions.map((g, i) => `План ${i + 1}`)}
							/>
						</ScrollView>
					</View>

					<View style={styles.receptTabsCont}>
						<ScrollView horizontal showsHorizontalScrollIndicator={false}>
							<ButtonTabsMy
								marginLeft={15}
								active={activeReception}
								setActive={setActiveReception}
								textStyle={styles.receptTabsText}
								buttonStyle={styles.receptTabsBtn}
								containerStyle={styles.receptTabs}
								titles={plan.nutritions[activePlan].map((r, i) => `${i + 1}-Прием`)}
							/>
						</ScrollView>
					</View>

					{reception && (
						<View style={styles.main}>
							{reception.products.map((p, i) => (
								<View key={i} style={[styles.row, i === 0 && { marginTop: 0 }]}>
									<Text style={styles.text1}>{p.name[language]}</Text>
									<Text style={styles.text2}>{`${reception.amountsP[i] ?? 0} гр`}</Text>
								</View>
							))}
							{reception.dishes.map((dish, i) => (
								<View key={i} style={[styles.row, i === 0 && { marginTop: 0 }]}>
									<Text style={styles.text1}>{dish.name}</Text>
									<Text style={styles.text2}>{`${reception.amountsD[i] ?? 0} гр`}</Text>
								</View>
							))}
							<View style={styles.sum}>
								<Text style={styles.text3}>
									{`Общие Ккал: ${getSumValues(
										[...reception.products, ...reception.dishes.map(d => convertDishToProduct(d))],
										[...reception.amountsP, ...reception.amountsD],
										'calories'
									)}`}
								</Text>
							</View>
						</View>
					)}

					<ButtonPrimary
						fill
						onPress={onAddDiary}
						style={styles.btn}
						textStyle={styles.btnText}
						loading={loading}
						text='Добавить в пищевой дневник'
					/>

					<View style={styles.mt26}>
						<Text style={styles.title}>{'Рекомендации'}</Text>
						<View style={styles.recommendation}>
							<ScrollView showsVerticalScrollIndicator={false}>
								<Text style={styles.text}>
									{nutritions[activePlan][activeReception].recommendation}
								</Text>
							</ScrollView>
						</View>
					</View>

					<ButtonPrimary
						fill
						onPress={onDeletePlan}
						style={styles.button}
						textStyle={styles.buttonText}
						loading={deleteLoading}
						text='Удалить из моих планов'
					/>

					{isTrainer && trainer?.isEducation && nutritionPlan?.creatorUser?._id === user?._id && (
						<ButtonPrimary
							fill
							onPress={onModalToggle}
							loading={loading}
							disabled={loading}
							style={styles.button}
							loadingColor={COLORS.WHITE}
							textStyle={styles.buttonText}
							text={'Отправить ученикам'}
						/>
					)}

					<View style={{ marginBottom: 100 }} />
				</ScrollView>
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
									<TouchableWithoutFeedback style={styles.checkbox} onPress={() => onSelect(item)}>
										<TouchableWithoutFeedback onPress={() => onSelect(item)}>
											<View style={styles.checkbox}>
												{selected.find(s => s._id === item._id) && (
													<View style={styles.checkboxFilled}></View>
												)}
											</View>
										</TouchableWithoutFeedback>
									</TouchableWithoutFeedback>
								</View>
							</View>
						))}
					{selected.length > 0 && (
						<ButtonPrimary
							fill
							onPress={onSubmitAdd}
							loading={loading}
							style={styles.send}
							loadingColor={COLORS.WHITE}
							textStyle={styles.buttonText}
							text={'Отправить ученикам'}
						/>
					)}
				</View>
			</ReactNativeModal>
		</View>
	) : null
}

export default NutritionPlanView
