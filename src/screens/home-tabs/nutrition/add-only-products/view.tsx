import React from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import {
	ButtonPrimary,
	ButtonTabs,
	Header,
	Icon,
	InputPrimary
} from '../../../../components/common'
import { PRODUCT_AMOUNT } from '../../../../constants/AMOUNT'
import { COLORS } from '../../../../constants/COLORS'
import { AddProductsHooks } from './hooks'
import { styles } from './style'
import ButtonTabsMy from '../../../../components/common/ButtonTabsMy'
import { Assets } from '../../../../utils/requireAssets'

const AddProductsView = () => {
	const {
		searchValue,
		setSearchValue,
		activeTab,
		setActiveTab,
		activeCategory,
		setActiveCategory,
		products,
		selected,
		onSearch,
		onSelect,
		onAdd,
		language,
		productCategories,
		navigateSearch,
		i18n,
		t
	} = AddProductsHooks()

	return (
		<View style={styles.container}>
			<SafeAreaView />

			<Header />

			<TouchableOpacity onPress={navigateSearch} style={styles.containerMy}>
				<ButtonPrimary
					style={{
						padding: 0,
						backgroundColor: 'transparent'
					}}
					icon={<Icon source={Assets.icons.search} />}
				/>
				<Text style={styles.textMy}>{t('search')}</Text>
			</TouchableOpacity>

			<ButtonTabs
				secondary
				titles={[t('my-products'), t('product-base')]}
				active={activeTab}
				setActive={setActiveTab}
				containerStyle={styles.tab1Cont}
			/>

			<View style={styles.scrollCont}>
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					<ButtonTabsMy
						marginLeft={15}
						active={activeCategory}
						setActive={setActiveCategory}
						containerStyle={styles.tab2Cont}
						titles={[...productCategories.map(a => a.name[i18n.language as 'ru'])]}
					/>
				</ScrollView>
			</View>

			<ScrollView showsVerticalScrollIndicator={false}>
				{products.map((p, pI) => (
					<View style={styles.box} key={`${p._id}/${pI}`}>
						<View style={styles.header}>
							<View>
								<Text style={styles.text1}>{p.name[i18n.language as 'ru']}</Text>
								<Text style={styles.text2}>{`${t('per_100g', {
									amount: PRODUCT_AMOUNT
								})}`}</Text>
							</View>
							<TouchableOpacity style={styles.checkbox} onPress={() => onSelect(p)}>
								{selected.find(s => s._id === p._id) && <View style={styles.checkboxFilled} />}
							</TouchableOpacity>
						</View>
						<View style={styles.main}>
							<View>
								<Text style={styles.text3}>
									{'Б - '}
									<Text style={styles.text4}>{`${p.protein} гр`}</Text>
								</Text>
								<Text style={styles.text3}>
									{'Ж - '}
									<Text style={styles.text4}>{`${p.oil} гр`}</Text>
								</Text>
								<Text style={styles.text3}>
									{'У - '}
									<Text style={styles.text4}>{`${p.carb} гр`}</Text>
								</Text>
							</View>
							<Text style={styles.text5}>{`${p.calories} каллорий`}</Text>
						</View>
					</View>
				))}

				<View style={{ marginBottom: 20 }} />
			</ScrollView>
			{selected.length > 0 && (
				<ButtonPrimary
					fill
					text='Добавить'
					onPress={onAdd}
					style={styles.btn}
					textStyle={styles.btnText}
					loadingColor={COLORS.WHITE}
					disabled={!selected.length}
				/>
			)}
		</View>
	)
}

export default AddProductsView
