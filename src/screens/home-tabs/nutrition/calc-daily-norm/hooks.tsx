import { useEffect, useMemo, useState } from 'react'
import { useRedux } from '../../../../store/hooks'
import { selectSchemaNutritions } from '../../../../store/slices/appSlice'
import { NUTRITION_TYPE } from '../../../../types'
import { useTranslation } from 'react-i18next'

export const CalcDailyNormHooks = () => {
	const [weight, setWeight] = useState('')
	const [gender, setGender] = useState(0)
	const [selected, setSelected] = useState<number | undefined>()
	const [calculated, setCalculated] = useState(0)
	const [items, setItems] = useState<{ text: string; value: number }[]>([])
	const [schemaNutritions] = useRedux(selectSchemaNutritions)
	const { t, i18n } = useTranslation()
	const nType = useMemo(() => {
		if (schemaNutritions && schemaNutritions.length > 0) {
			return schemaNutritions[schemaNutritions.length - 1].data.nType
		} else {
			return NUTRITION_TYPE.FAT
		}
	}, [schemaNutritions])

	useEffect(() => {
		setItems(gender === 0 ? maleItems : femaleItems)
	}, [gender])

	// const effect = () => {
	//   let result = Number(weight);

	//   if (gender === 0) {
	//     result = result * 2;
	//   }
	//   if (gender === 1) {
	//     result = result * 1.5;
	//   }

	//   if (selected !== undefined) {
	//     if (selected === 0) {
	//       result = result * 2.5;
	//     }
	//     if (selected === 1) {
	//       result = result * 3;
	//     }
	//     if (selected === 2) {
	//       result = result * 3.5;
	//     }
	//     if (selected === 3) {
	//       result = result * 4;
	//     }
	//     if (selected === 4) {
	//       result = result * 5;
	//     }
	//   }

	//   setCalculated(result);
	// };

	// useEffect(() => {
	//   effect();
	// }, [weight, gender, selected]);

	const onSelect = (index: number) => {
		if (selected === index) {
			setSelected(undefined)
		} else {
			setSelected(index)
		}
	}

	const maleItems = useMemo(
		() => [
			{ text: t('sedentary-lifestyle'), value: 23 },
			{ text: t('low-activity'), value: 25 },
			{
				text: t('fitness-3-per-week-low'),
				value: 27
			},
			{ text: t('moderate-activity'), value: 28 },
			{
				text: t('fitness-3-per-week-moderate'),
				value: 29
			},
			{ text: t('high-activity'), value: 30 },
			{
				text: t('fitness-3-per-week-high'),
				value: 32
			}
		],
		[i18n.language]
	)

	const femaleItems = useMemo(
		() => [
			{ text: t('sedentary-lifestyle'), value: 20 },
			{ text: t('low-activity'), value: 22 },
			{
				text: t('fitness-3-per-week-low'),
				value: 23
			},
			{ text: t('moderate-activity'), value: 24 },
			{
				text: t('fitness-3-per-week-moderate'),
				value: 25
			},
			{ text: t('high-activity'), value: 26 },
			{
				text: t('fitness-3-per-week-high'),
				value: 28
			}
		],
		[i18n.language]
	)

	return {
		weight,
		setWeight,
		gender,
		setGender,
		calculated,
		selected,
		onSelect,
		items,
		nType,
		t
	}
}
