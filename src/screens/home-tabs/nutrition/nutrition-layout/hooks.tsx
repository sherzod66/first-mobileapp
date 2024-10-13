import { useEffect, useState } from 'react'
import { useRedux } from '../../../../store/hooks'
import { selectUser } from '../../../../store/slices/appSlice'
import { useTranslation } from 'react-i18next'

export const NutritionLayoutHooks = () => {
	const [activeTab, setActiveTab] = useState(0)
	const [user] = useRedux(selectUser)
	const { t } = useTranslation()

	useEffect(() => {
		// console.log("user: ", JSON.stringify(user, null, 4));
	}, [])

	return { activeTab, setActiveTab, t }
}
