import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { ButtonPrimary, ButtonTabs, Icon, InputPrimary } from '../../../../../components/common'
import { BaseProductsHooks } from './hooks'
import { styles } from './style'
import { Assets } from '../../../../../utils/requireAssets'
import ButtonTabsMy from '../../../../../components/common/ButtonTabsMy'
const BaseProductsView = () => {
	const {
		activeTab,
		setActiveTab,
		products,
		selected,
		language,
		loading,
		productCategories,
		onSelect,
		onAdd,
		onCreate,
		onDeletePress,
		isSuperAdmin,
		onUpdateNavigate,
		onSearch,
		i18n,
		t
	} = BaseProductsHooks()

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={onSearch} style={styles.containerMy}>
				<ButtonPrimary
					style={{
						padding: 0,
						backgroundColor: 'transparent'
					}}
					icon={<Icon source={Assets.icons.search} />}
				/>
				<Text style={styles.textMy}>{t('search')}</Text>
			</TouchableOpacity>
			<View style={styles.scrollCont}>
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					<ButtonTabsMy
						marginLeft={20}
						active={activeTab}
						setActive={setActiveTab}
						containerStyle={styles.tabCont}
						textStyle={{ backgroundColor: 'aquamarine' }}
						titles={[...productCategories.map(a => a.name[i18n.language as 'ru'])]}
					/>
				</ScrollView>
			</View>

			<ScrollView showsVerticalScrollIndicator={false}>
				{products?.map((a, i) => (
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
						{isSuperAdmin && (
							<TouchableOpacity onPress={() => onDeletePress(a)} style={styles.row}>
								<Text style={styles.text5}>{t('delete')}</Text>
							</TouchableOpacity>
						)}
						{isSuperAdmin && (
							<TouchableOpacity onPress={() => onUpdateNavigate(a)} style={styles.rowEdit}>
								<Text style={styles.text5}>{t('edit')}</Text>
							</TouchableOpacity>
						)}
					</View>
				))}
				<View style={{ marginBottom: 200 }} />
			</ScrollView>

			<View style={styles.createButtonContainer}>
				<>
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
					{isSuperAdmin && <ButtonPrimary text={t('add-product')} onPress={onCreate} />}
				</>
			</View>
		</View>
	)
}

export default BaseProductsView
