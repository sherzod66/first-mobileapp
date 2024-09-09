import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { ButtonPrimary, ButtonTabs, Icon, InputPrimary } from '../../../../../components/common'
import { BaseProductsHooks } from './hooks'
import { styles } from './style'
import { COLORS } from '../../../../../constants/COLORS'
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
		search,
		onSearch
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
				<Text style={styles.textMy}>Поиск</Text>
			</TouchableOpacity>
			<View style={styles.scrollCont}>
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					<ButtonTabsMy
						marginLeft={20}
						active={activeTab}
						setActive={setActiveTab}
						containerStyle={styles.tabCont}
						textStyle={{ backgroundColor: 'aquamarine' }}
						titles={[...productCategories.map(a => a.name[language])]}
					/>
				</ScrollView>
			</View>

			<ScrollView showsVerticalScrollIndicator={false}>
				{products?.map((a, i) => (
					<View style={styles.box} key={i}>
						<View style={styles.header}>
							<View>
								<Text style={styles.text1}>{a.name[language]}</Text>
								<Text style={styles.text2}>{'на 100гр. продукта'}</Text>
							</View>
							<TouchableOpacity style={styles.checkbox} onPress={() => onSelect(a)}>
								{selected.find(s => s._id === a._id) && <View style={styles.checkboxFilled} />}
							</TouchableOpacity>
						</View>
						<View style={styles.main}>
							<View>
								<Text style={styles.text3}>
									{'Б - '}
									<Text style={styles.text4}>{`${a.protein} гр`}</Text>
								</Text>
								<Text style={styles.text3}>
									{'Ж - '}
									<Text style={styles.text4}>{`${a.oil} гр`}</Text>
								</Text>
								<Text style={styles.text3}>
									{'У - '}
									<Text style={styles.text4}>{`${a.carb} гр`}</Text>
								</Text>
							</View>
							<Text style={styles.text5}>{`${a.calories} каллорий`}</Text>
						</View>
						{isSuperAdmin && (
							<TouchableOpacity onPress={() => onDeletePress(a)} style={styles.row}>
								<Text style={styles.text5}>Удалить</Text>
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
							text='Добавить в “ Мои продукты “'
						/>
					)}
					{isSuperAdmin && <ButtonPrimary text='Добавить продукт' onPress={onCreate} />}
				</>
			</View>
		</View>
	)
}

export default BaseProductsView
