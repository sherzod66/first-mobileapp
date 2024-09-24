import { useRoute } from '@react-navigation/native'
import { useMemo, useState } from 'react'
import { useRedux } from '../../../../store/hooks'
import { selectSchemaNutritions } from '../../../../store/slices/appSlice'
import { NUTRITION_TYPE } from '../../../../types'

export const MyDataHooks = () => {
	const [active, setActive] = useState(0)
	const [schemaNutritions] = useRedux(selectSchemaNutritions)
	const nType = useMemo(() => {
		if (schemaNutritions && schemaNutritions.length > 0) {
			return schemaNutritions[schemaNutritions.length - 1].data?.nType
		} else {
			return NUTRITION_TYPE.FAT
		}
	}, [schemaNutritions])

	const route = useRoute()

	return {
		active,
		setActive,
		apprenticeId: route?.params?.apprenticeId,
		nType
	}
}
