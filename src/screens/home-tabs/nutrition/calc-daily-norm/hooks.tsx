import { useEffect, useMemo, useState } from 'react'
import { useRedux } from '../../../../store/hooks'
import { selectSchemaNutritions } from '../../../../store/slices/appSlice'
import { NUTRITION_TYPE } from '../../../../types'

const maleItems = [
	{ text: 'Сидячий образ жизни. Мало хожу пешком', value: 23 },
	{ text: 'Мало-подвижный. 3-5 тыс. шагов в день.', value: 25 },
	{
		text: 'Фитнес тренировки 3 раза в неделю. 3-5 тыс. шагов в день.',
		value: 27
	},
	{ text: 'Средняя Активность. 8-10 тыс. шагов в день.', value: 28 },
	{
		text: 'Фитнес тренировки 3 раза в неделю. 8-10 тыс. шагов в день.',
		value: 29
	},
	{ text: 'Высокая Активность. 12-15 тыс. шагов в день.', value: 30 },
	{
		text: 'Фитнес тренировки 3 раза в неделю. 12-15 тыс. шагов в день.',
		value: 32
	}
]

const femaleItems = [
	{ text: 'Сидячий образ жизни. Мало хожу пешком', value: 20 },
	{ text: 'Мало-подвижный. 3-5 тыс. шагов в день.', value: 22 },
	{
		text: 'Фитнес тренировки 3 раза в неделю. 3-5 тыс. шагов в день.',
		value: 23
	},
	{ text: 'Средняя Активность. 8-10 тыс. шагов в день.', value: 24 },
	{
		text: 'Фитнес тренировки 3 раза в неделю. 8-10 тыс. шагов в день.',
		value: 25
	},
	{ text: 'Высокая Активность. 12-15 тыс. шагов в день.', value: 26 },
	{
		text: 'Фитнес тренировки 3 раза в неделю. 12-15 тыс. шагов в день.',
		value: 28
	}
]

export const CalcDailyNormHooks = () => {
	const [weight, setWeight] = useState('')
	const [gender, setGender] = useState(0)
	const [selected, setSelected] = useState<number | undefined>()
	const [calculated, setCalculated] = useState(0)
	const [items, setItems] = useState<{ text: string; value: number }[]>([])
	const [schemaNutritions] = useRedux(selectSchemaNutritions)
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

	return {
		weight,
		setWeight,
		gender,
		setGender,
		calculated,
		selected,
		onSelect,
		items,
		nType
	}
}
