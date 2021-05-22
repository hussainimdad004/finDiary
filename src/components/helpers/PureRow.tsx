import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ENTRY_COLOR, ENTRY_MAIN_COLOR, MAIN_GRAY, PRIMARY_COLOR, YELLOW_COLOR } from '../../../assets/color';
import { scale, verticalScale } from './Scaling';
interface Props {
	navigation: any;
	nav: any;
	navigate: any;
	item: any;
	index: number;
	title: String;
}
class PureRow extends PureComponent {
	props: Props;
	constructor(props) {
		super(props);
	}

	render() {
		const { item, index, title } = this.props;
		return (
			<TouchableOpacity
				activeOpacity={0.6}
				key={index}
				onPress={() => { this.openDetail(item.id, title, item) }}>
				<LinearGradient
					start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
					colors={[ENTRY_MAIN_COLOR, YELLOW_COLOR]}
					style={{
						flexDirection: "row",
						marginTop: verticalScale(4),
						// marginHorizontal: scale(12),
						marginLeft: scale(16),
						borderLeftWidth: 1,
						borderColor: 'transparent',
						borderTopLeftRadius: 8,
						borderBottomLeftRadius: 8,
						minHeight: verticalScale(40),
						paddingVertical: verticalScale(6), 
						marginBottom: verticalScale(4),
						shadowColor: ENTRY_MAIN_COLOR,
						shadowOffset: {
							width: 0,
							height: 2,
						},
						shadowOpacity: 0.25,
						shadowRadius: 3.84,

						elevation: 5,
					}}
				>
					<View
						style={{
							flex: 1,
							marginLeft: 12
						}}
					>
						<Text
							style={{
								color: MAIN_GRAY,
								fontSize: scale(10),
								marginTop: 8,
								fontStyle: 'italic',
								fontFamily: "BurlingamePro-CondBold",
							}}
						>
							{item.time}
						</Text>
						<Text
							style={{
								color: '#000',
								fontSize: scale(10),
								fontFamily: "BurlingamePro-CondMedium",
							}}
						>
							{item.title.toUpperCase()}
						</Text>
					</View>
				</LinearGradient>
			</TouchableOpacity>
		);
	}

	openDetail = (index, _title, item) => {
		console.log("****TTTT", index, _title, item)
		console.log('nav', this.props)
		this.props.nav.navigate('StoryDetail', {
			item: item
		})
	}
}

export default PureRow;