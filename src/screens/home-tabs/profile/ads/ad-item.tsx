import React, { useState } from 'react'
import { Dimensions, Image, Linking, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ApiService } from '../../../../services'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../../store/slices/appSlice'
import { ROLES } from '../../../../types'
import BoxGif from '../../../../components/common/BoxGif'

export interface IAdItem {
	_id?: string
	imageUrl?: string
	videoUrl?: string
	link?: string
}

const AdItem = ({ item, fetchAds }: { index: number; item: IAdItem; fetchAds: () => void }) => {
	const [show, setShow] = useState(false)
	const [loading, setLoading] = useState(false)
	const user = useSelector(selectUser)
	const isSuperAdmin = user?.role === ROLES.SUPERADMIN
	const onRemove = async () => {
		try {
			setLoading(true)
			const res = await ApiService.delete(`/ads/${item._id}`)
			await fetchAds()
		} catch (error) {}
		setLoading(false)
	}
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => Linking.openURL(item.link ? item.link : '')}>
				<BoxGif
					cover={item.imageUrl || ''}
					dots={isSuperAdmin}
					show={show}
					setShow={() => setShow(e => !e)}
					onRemove={onRemove}
					dotsLoading={loading}
					containerStyle={{ marginTop: 10 }}
				/>
			</TouchableOpacity>
		</View>
	)
}

export default AdItem

const styles = StyleSheet.create({
	container: {
		width: '100%'
	},
	image: {
		width: '100%'
	}
})
