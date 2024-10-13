import { View, ScrollView, TouchableOpacity } from 'react-native'
import { styles } from './style'
import { Box, ButtonTabs, ButtonPrimary } from '../../../../../components/common'
import { Assets } from '../../../../../utils/requireAssets'
import { MyExercisesHooks } from './hooks'
import { COLORS } from '../../../../../constants/COLORS'
import { imageLink } from '../../../../../utils/imageLink'
import ButtonTabsMy from '../../../../../components/common/ButtonTabsMy'

const MyExercisesView = () => {
	const {
		isFavorite,
		setIsFavorite,
		activeCategory,
		setActiveCategory,
		activeSubCategory,
		setActiveSubCategory,
		exerciseCategories,
		language,
		exercises,
		onRemove,
		loading,
		show,
		setShow,
		select,
		onSelect,
		onAdd,
		loadingSelect,
		i18n,
		onPress,
		t
	} = MyExercisesHooks()

	return (
		<View style={styles.container}>
			<ButtonTabs
				primary
				active={isFavorite}
				setActive={setIsFavorite}
				titles={[t('selected'), t('select-from-general-database')]}
				containerStyle={styles.favoriteBtnCont}
				scroll={false}
			/>

			<ButtonTabs
				secondary
				active={activeCategory}
				setActive={setActiveCategory}
				titles={[...exerciseCategories.map(a => a.name[i18n.language as 'ru'])]}
				containerStyle={styles.categoryBtnCont}
			/>

			<ButtonTabsMy
				active={activeSubCategory}
				setActive={setActiveSubCategory}
				titles={
					!!exerciseCategories && exerciseCategories.length > 0
						? [
								...exerciseCategories[activeCategory].children.map(
									a => a.name[i18n.language as 'ru']
								)
						  ]
						: []
				}
				containerStyle={styles.subCategoryBtnCont}
			/>

			<ScrollView showsVerticalScrollIndicator={false}>
				{exercises.map((e, i) => (
					<TouchableOpacity
						key={e._id}
						activeOpacity={0.6}
						style={{ marginTop: 10 }}
						onPress={() => onPress(e)}
					>
						<Box
							dots={!!!isFavorite}
							dotsLoading={!!!isFavorite && loading && loading[i]}
							show={!!!isFavorite && show && show[i]}
							setShow={() => !!!isFavorite && setShow({ [i]: !(show && show[i]) })}
							onRemove={() => !!!isFavorite && onRemove(i)}
							canSelect={!!isFavorite}
							select={select.find(a => a === e._id)}
							onSelect={() => onSelect(e._id)}
							title={e.title[i18n.language as 'ru' | 'en' | 'uz']}
							cover={{ uri: imageLink(e.image) }}
							containerStyle={{ marginTop: 10 }}
						/>
					</TouchableOpacity>
				))}
			</ScrollView>

			{!!!isFavorite && <View style={{ marginBottom: 100 }} />}

			{!!isFavorite && (
				<View style={{ paddingBottom: 90 }}>
					<ButtonPrimary
						fill
						disabled={!!!select.length}
						loading={loadingSelect}
						loadingColor={COLORS.WHITE}
						onPress={onAdd}
						style={styles.button}
						text={t('add-to-favorites')}
						textStyle={styles.buttonText}
					/>
				</View>
			)}
		</View>
	)
}

export default MyExercisesView
