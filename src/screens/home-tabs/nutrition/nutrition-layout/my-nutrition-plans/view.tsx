import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { ButtonPrimary, ButtonTabs } from '../../../../../components/common'
import { MyNutritionPlansHooks } from './hooks'
import { styles } from './style'
import { formatPrice } from '../../../../../utils/formatPrice'

const MyNutritionPlansView = () => {
	const {
		activeTab,
		setActiveTab,
		plans,
		onPlanPress,
		onPress,
		isSuperAdmin,
		isTrainers,
		trainer,
		t
	} = MyNutritionPlansHooks()
	return (
		<View style={styles.container}>
			<ButtonTabs
				active={activeTab}
				setActive={setActiveTab}
				titles={[t('oil'), t('mass')]}
				primary
				containerStyle={styles.btnCont}
				scroll={false}
			/>

			<View style={{ flex: 1, marginBottom: 100 }}>
				<View style={{ flex: 1 }}>
					<ScrollView showsVerticalScrollIndicator={false}>
						{plans.map((nP, i) => (
							<TouchableOpacity onPress={() => onPlanPress(i)} key={i}>
								<View style={[styles.box, !!i && styles.mt8]}>
									<Text style={styles.title}>{nP.title}</Text>
									<View style={styles.main}>
										<View style={styles.center}>
											<Text style={styles.text1}>{`${nP.proteinPercent}%`}</Text>
											<Text style={styles.text2}>{'Белков'}</Text>
											<Text style={styles.text3}>{`${Math.trunc(
												(nP.calories * nP.proteinPercent) / 400
											)} ${t('grams')}`}</Text>
										</View>
										<View style={[styles.center, styles.ml20]}>
											<Text style={styles.text1}>{`${nP.oilPercent}%`}</Text>
											<Text style={styles.text2}>{'Жиров'}</Text>
											<Text style={styles.text3}>{`${Math.trunc(
												(nP.calories * nP.oilPercent) / 900
											)} ${t('grams')}`}</Text>
										</View>
										<View style={[styles.center, styles.ml20]}>
											<Text style={styles.text1}>{`${
												100 - (nP.proteinPercent + nP.oilPercent)
											}%`}</Text>
											<Text style={styles.text2}>{'Углеводов'}</Text>
											<Text style={styles.text3}>{`${Math.trunc(
												(nP.calories * (100 - (nP.proteinPercent + nP.oilPercent))) / 400
											)} ${t('grams')}`}</Text>
										</View>
									</View>
									<Text style={[styles.title, { textAlign: 'right' }]}>
										{nP.price ? `${formatPrice(nP.price)} UZS` : t('free')}
									</Text>
								</View>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>

				{isSuperAdmin && (
					<ButtonPrimary
						fill
						onPress={onPress}
						style={styles.btn}
						textStyle={styles.btnText}
						text={t('create-paln')}
					/>
				)}
				{isTrainers && trainer?.isEducation && (
					<ButtonPrimary
						fill
						onPress={onPress}
						style={styles.btn}
						textStyle={styles.btnText}
						text={t('create-paln')}
					/>
				)}
			</View>
		</View>
	)
}

export default MyNutritionPlansView
