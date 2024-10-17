import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { styles } from './style'
import { ButtonPrimary, Header, InputPrimary } from '../../../../../components/common'
import { SearchHooks } from './hooks'
import { COLORS } from '../../../../../constants/COLORS'

const SearchProductsView = () => {
	const {
		searchState,
		setSearchState,
		onSearch,
		setOnSearch,
		allProducts,
		searchProduct,
		findProduct,
		onSelect,
		selected,
		loading,
		onAdd,
		t,
		i18n
	} = SearchHooks()
	return (
		<View style={styles.container}>
			<SafeAreaView />
			<Header />
			<InputPrimary
				onChange={v => searchProduct(v)}
				placeholder={t('search')}
				placeholderColor={COLORS.WHITE}
				containerStyle={{
					backgroundColor: COLORS.GREY3,
					marginTop: 0,
					borderRadius: 10
				}}
				autoFocus={true}
				inputStyle={{
					backgroundColor: COLORS.GREY3,
					color: COLORS.WHITE
				}}
				onSearch={() => console.log('')}
			/>
			<ScrollView showsVerticalScrollIndicator={false}>
				{findProduct.length > 0 ? (
					findProduct.map((a, i) => (
						<View style={styles.box} key={i}>
							<View style={styles.header}>
								<View>
									<Text style={styles.text1}>{a.name[i18n.language as 'ru']}</Text>
									<Text style={styles.text2}>{t('per_100g_product')}</Text>
								</View>
								<TouchableOpacity style={styles.checkbox} onPress={() => onSelect(a)}>
									{selected.find(s => s._id === a._id) && <View style={styles.checkboxFilled} />}
								</TouchableOpacity>
							</View>
							<View style={styles.main}>
								<View>
									<Text style={styles.text3}>
										{`${t('reduction-protein')} - `}
										<Text style={styles.text4}>{`${a.protein} ${t('grams')}`}</Text>
									</Text>
									<Text style={styles.text3}>
										{`${t('reduction-fats')} - `}
										<Text style={styles.text4}>{`${a.oil} ${t('grams')}`}</Text>
									</Text>
									<Text style={styles.text3}>
										{`${t('reduction-carbohydrates')} - `}
										<Text style={styles.text4}>{`${a.carb} ${t('grams')}`}</Text>
									</Text>
								</View>
								<Text style={styles.text5}>{`${a.calories} ${t('calories')}`}</Text>
							</View>
							{/* <TouchableOpacity
              onPress={() => onDeletePress(a)}
              style={styles.row}
            >
              <Text style={styles.text5}>Удалить</Text>
            </TouchableOpacity> */}
						</View>
					))
				) : (
					<Text>Найдите нужный продукт</Text>
				)}
				<View style={{ marginBottom: 200 }} />
			</ScrollView>
			<View style={styles.createButtonContainer}>
				{selected.length > 0 && (
					<ButtonPrimary
						fill
						onPress={onAdd}
						loading={loading}
						style={styles.btn}
						textStyle={styles.btnText}
						disabled={!!!selected.length}
						text={t('add_to_my_products')}
					/>
				)}
			</View>
		</View>
	)
}

export default SearchProductsView
