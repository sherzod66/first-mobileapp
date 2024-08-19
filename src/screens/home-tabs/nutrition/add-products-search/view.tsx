import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Modal } from 'react-native'
import { styles } from './style'
import { PRODUCT_AMOUNT } from '../../../../constants/AMOUNT'
import { ButtonPrimary, Header, InputPrimary } from '../../../../components/common'
import { SearchHooks } from './hooks'
import { COLORS } from '../../../../constants/COLORS'
import { getSumValues } from '../../../../utils/getSumValues'
import { Dish } from '../../../../types'
import { language } from '../../../../utils/language'

const AddProductsSearchView = () => {
	const { foundProduct, loading, selected, onAdd, onSelect, setSearchValue, i18n } = SearchHooks()
	return (
		<View style={styles.container}>
			<SafeAreaView />
			<Header />
			<InputPrimary
				onChange={v => setSearchValue(v)}
				placeholder={'Поиск'}
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
				{foundProduct.map((p, pI) => {
					let amount = 0
					let name = p.name[i18n.language as 'ru']
					let protein = p.protein
					let oil = p.oil
					let carb = p.carb
					let calories = p.calories

					if (p.category?.type === 'PRODUCT') {
						amount = PRODUCT_AMOUNT
					} else {
						// @ts-ignore
						const dish: Dish = { ...p }

						amount = dish.amounts.reduce((acc, val) => acc + val)
						protein = getSumValues(dish.products, dish.amounts, 'protein')
						oil = getSumValues(dish.products, dish.amounts, 'oil')
						carb = getSumValues(dish.products, dish.amounts, 'carb')
						calories = getSumValues(dish.products, dish.amounts, 'calories')
					}
					return (
						<View style={styles.box} key={`${p._id}/${pI}`}>
							<View style={styles.header}>
								<View>
									<Text style={styles.text1}>{name}</Text>
									<Text style={styles.text2}>{`на ${amount}гр. продукта`}</Text>
								</View>
								<TouchableOpacity style={styles.checkbox} onPress={() => onSelect(p)}>
									{selected.find(s => s._id === p._id) && <View style={styles.checkboxFilled} />}
								</TouchableOpacity>
							</View>
							<View style={styles.main}>
								<View>
									<Text style={styles.text3}>
										{'Б - '}
										<Text style={styles.text4}>{`${protein} гр`}</Text>
									</Text>
									<Text style={styles.text3}>
										{'Ж - '}
										<Text style={styles.text4}>{`${oil} гр`}</Text>
									</Text>
									<Text style={styles.text3}>
										{'У - '}
										<Text style={styles.text4}>{`${carb} гр`}</Text>
									</Text>
								</View>
								<Text style={styles.text5}>{`${calories} каллорий`}</Text>
							</View>
						</View>
					)
				})}
				<View style={{ marginBottom: 100 }} />
			</ScrollView>
			{selected.length > 0 && (
				<ButtonPrimary
					fill
					text='Добавить'
					onPress={onAdd}
					loading={loading}
					style={styles.btn}
					textStyle={styles.btnText}
					loadingColor={COLORS.WHITE}
					disabled={!selected.length}
				/>
			)}
		</View>
	)
}

export default AddProductsSearchView
