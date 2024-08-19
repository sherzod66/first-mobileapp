import React from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { ProductList } from '../../../../components'
import { ButtonPrimary, Header, InputPrimary } from '../../../../components/common'
import Modal from './modal'
import { AddReceptionHooks } from './hooks'
import { styles } from './style'

const AddReceptionView = () => {
	const {
		index,
		show,
		calories,
		protein,
		oil,
		carb,
		amounts,
		products,
		recommendation,
		setRecommendation,
		modalValue,
		setModalValue,
		onSave,
		onShow,
		onCancel,
		onSaveAmount,
		onRemove,
		onRemoveByIndex,
		navigateAddProducts
	} = AddReceptionHooks()

	return (
		<View style={styles.container}>
			<SafeAreaView />

			<View style={styles.mh25}>
				<Header title={`${index + 1}-й прием пищи`} />
			</View>

			<View style={styles.row}>
				<View style={styles.box}>
					<Text style={styles.title}>{'Фактические Ккал'}</Text>
					<View style={styles.box1}>
						<Text style={styles.text}>{calories || ''}</Text>
					</View>
				</View>
				<View style={styles.box}>
					<Text style={styles.title}>{'Б'}</Text>
					<View style={styles.box2}>
						<Text style={styles.text}>{Math.round(protein) || ''}</Text>
					</View>
				</View>
				<View style={styles.box}>
					<Text style={styles.title}>{'Ж'}</Text>
					<View style={styles.box2}>
						<Text style={styles.text}>{Math.round(oil) || ''}</Text>
					</View>
				</View>
				<View style={styles.box}>
					<Text style={styles.title}>{'У'}</Text>
					<View style={styles.box2}>
						<Text style={styles.text}>{Math.round(carb) || ''}</Text>
					</View>
				</View>
			</View>

			<View style={styles.main}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<ProductList
						title='Добавить продукт'
						amounts={amounts}
						products={products}
						onShow={onShow}
						onRemove={onRemove}
						onRemoveByIndex={onRemoveByIndex}
						navigateAddProducts={navigateAddProducts}
					/>

					<View style={styles.recommendation}>
						<Text style={styles.title}>{'Рекомендации'}</Text>
						<InputPrimary
							multiline={true}
							disablePlaceholder
							value={recommendation}
							onChange={t => setRecommendation(t)}
							inputStyle={styles.recomInput}
							containerStyle={styles.recomInputCont}
						/>
					</View>

					<ButtonPrimary
						fill
						text='Сохранить'
						onPress={onSave}
						style={styles.btn}
						textStyle={styles.btnText}
						disabled={!!!products.length}
					/>

					<View style={{ marginBottom: 100 }} />
				</ScrollView>
			</View>

			<Modal
				show={show}
				value={modalValue}
				setValue={setModalValue}
				onCancel={onCancel}
				onSave={onSaveAmount}
			/>
		</View>
	)
}

export default AddReceptionView
