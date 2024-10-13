import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { CustomCalendar, ProductList } from '../../../../components'
import { ButtonPrimary, ButtonSecondary, Header } from '../../../../components/common'
import Modal from './modal'
import { ConsumeCalendarHooks } from './hooks'
import { styles } from './style'
import ProductListMy from '../../../../components/ProductListMy'

const ConsumeCalendarView = () => {
	const {
		show,
		loading,
		modalLoading,
		monthlyData,
		activeTog,
		activeCalories,
		activeProtein,
		activeOil,
		activeCarb,
		calories,
		protein,
		oil,
		carb,
		products,
		amounts,
		activeDay,
		setActiveDay,
		activeMonth,
		setActiveMonth,
		activeYear,
		setActiveYear,
		modalValue,
		setModalValue,
		onShow,
		onCancel,
		onSave,
		onRemove,
		onRemoveByIndex,
		navigateAddProducts,
		tab,
		dateCopy,
		setDateCopy,
		onPaste,
		setShowDots,
		showDots,
		t
	} = ConsumeCalendarHooks()

	return (
		<View style={styles.container}>
			<SafeAreaView />

			<View style={styles.mh20}>
				<Header
					right
					title={t('food-consumed')}
					recommendation={tab > 0 ? 'foodConsumedPerDayMass' : 'foodConsumedPerDayOil'}
				/>
			</View>

			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={[styles.mh20, styles.mt7]}>
					<CustomCalendar
						special
						data={monthlyData}
						activeDay={activeDay}
						activeMonth={activeMonth}
						activeYear={activeYear}
						setActiveDay={setActiveDay}
						setActiveMonth={setActiveMonth}
						setActiveYear={setActiveYear}
					/>
				</View>
				<View style={styles.row}>
					<View style={styles.box}>
						{activeTog ? (
							<Text style={styles.rowTitle}>{t('surplus-calorie-norm')}</Text>
						) : (
							<Text style={styles.rowTitle}>{t('deficit-calorie-norm')}</Text>
						)}
						<View style={styles.col3}>
							<Text style={styles.text}>{activeCalories || ''}</Text>
						</View>
					</View>
					<View style={styles.box}>
						<Text style={styles.rowTitle}>{t('reduction-protein')}</Text>
						<View style={styles.col1}>
							<Text style={styles.text}>{Math.round(activeProtein) || ''}</Text>
						</View>
					</View>
					<View style={styles.box}>
						<Text style={styles.rowTitle}>{t('reduction-fats')}</Text>
						<View style={styles.col1}>
							<Text style={styles.text}>{Math.round(activeOil) || ''}</Text>
						</View>
					</View>
					<View style={styles.box}>
						<Text style={styles.rowTitle}>{t('reduction-carbohydrates')}</Text>
						<View style={styles.col1}>
							<Text style={styles.text}>{Math.round(activeCarb) || ''}</Text>
						</View>
					</View>
				</View>
				<View style={styles.row1}>
					<View style={styles.box}>
						<Text style={styles.rowTitle}>{t('actual-calories')}</Text>
						<View style={[styles.col3, styles.bgGrey]}>
							<Text style={styles.text}>{Math.round(calories) || ''}</Text>
						</View>
					</View>
					<View style={styles.box}>
						<Text style={styles.rowTitle}>{t('reduction-protein')}</Text>
						<View style={[styles.col1, styles.bgGrey]}>
							<Text style={styles.text}>{Math.round(protein) || ''}</Text>
						</View>
					</View>
					<View style={styles.box}>
						<Text style={styles.rowTitle}>{t('reduction-fats')}</Text>
						<View style={[styles.col1, styles.bgGrey]}>
							<Text style={styles.text}>{Math.round(oil) || ''}</Text>
						</View>
					</View>
					<View style={styles.box}>
						<Text style={styles.rowTitle}>{t('reduction-carbohydrates')}</Text>
						<View style={[styles.col1, styles.bgGrey]}>
							<Text style={styles.text}>{Math.round(carb) || ''}</Text>
						</View>
					</View>
				</View>
				<View style={styles.mh20}>
					<ProductListMy
						title={t('add-product')}
						loading={loading}
						amounts={amounts}
						products={products}
						onShow={onShow}
						onRemove={onRemove}
						onRemoveByIndex={onRemoveByIndex}
						navigateAddProducts={navigateAddProducts}
						isDots={showDots}
						setIsDots={setShowDots}
						activeDay={activeDay}
						dateCopy={dateCopy}
						setDateCopy={setDateCopy}
						onPaste={onPaste}
					/>
				</View>
				<View style={{ marginBottom: 100 }} />
			</ScrollView>

			<Modal
				show={show}
				loading={modalLoading}
				value={modalValue}
				setValue={setModalValue}
				onCancel={onCancel}
				onSave={onSave}
			/>
		</View>
	)
}

export default ConsumeCalendarView
