import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import PureRow from '../helpers/PureRow';
import { scale, verticalScale } from '../helpers/Scaling';
import FloatingButton from '../helpers/FloatingButton';
import MyStorage from '../helpers/MyStorage';
import { ENTRY_MAIN_COLOR, MAIN_GRAY, ONYX_COLOR, YELLOW_COLOR } from '../../../assets/color';

interface State {
    entryList: any;
}
interface Props {
    navigation: any;
    isFocused: boolean;
}
const entryListStatic = [];
class EntryListing extends Component {
    state: State;
    props: Props;
    entryList: any[];
    _unsubscribe: any;
    constructor(props) {
        super(props);
        this.state = {
            entryList: []
        };
    }
    componentDidMount() {

        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({
                entryList: []
            })
            this.setDataOnFocus();
        })
    }
    componentWillUnmount() {
        this._unsubscribe();
    }
    setDataOnFocus = async () => {
        let tempList = []
        const storage = new MyStorage();
        // storage.removeItem('entry_list')
        await storage.getEntry().then(entry => {
            if (entry)
                JSON.parse(entry).map((item) => {
                    const found = tempList.some(el => el.id === item.id);
                    if (!found) tempList.push(item);
                })
        })
        this.setState({
            entryList: tempList
        })
    }
    _renderRowItem = ({ item, index }: { item: any, index: number }) => (
        <PureRow item={item} index={index} nav={this.props.navigation} title="Entry" />
    )
    render() {
        const navigate = this.props.navigation
        return (
            <View style={{ flex: 1, paddingTop: verticalScale(20), backgroundColor: '#fff' }}>
                {
                    this.state.entryList.length > 0
                        ?
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            disableVirtualization={false}
                            data={this.state.entryList}
                            renderItem={this._renderRowItem}
                            contentContainerStyle={{ marginTop: verticalScale(16), paddingBottom: verticalScale(20) }}
                            keyExtractor={item => item.title + ""}
                        />
                        :
                        <View style={{
                            flex: 1,
                            marginTop: verticalScale(46),
                            alignItems: 'center',
                            marginHorizontal: scale(16)
                        }}>
                            <Text style={{
                                fontFamily: 'BurlingamePro-CondBold',
                                color: ENTRY_MAIN_COLOR,
                                fontSize: scale(38),
                                paddingBottom: verticalScale(8)
                            }}>Fin<Text style={{ color: YELLOW_COLOR }}>Diary</Text></Text>
                            <Text style={{
                                textAlign: 'center',
                                fontFamily: "BurlingamePro-CondBold",
                                fontSize: scale(14),
                                color: ONYX_COLOR

                            }}>
                                {"This is the very beginning of your Stories with finDiary."}
                                <Text style={{
                                    marginTop: verticalScale(4),
                                    fontFamily: "BurlingamePro-CondSemiBold",
                                    color: MAIN_GRAY
                                }}>{`\nPlease add your stories.`}</Text>
                            </Text>
                        </View>
                }
                <FloatingButton on_press={() => {
                    this.props.navigation.navigate('AddEntry')
                }} />
            </View>
        );
    }
}
export default EntryListing;