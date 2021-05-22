import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { GRAPE_COLOR, MAIN_GRAY, PRIMARY_COLOR } from "../../../assets/color";
import Button from '../helpers/Button';
import CustomBackHeader from '../helpers/CustomHeaderBackButton';
import PureRow from '../helpers/PureRow';
import { scale, verticalScale } from '../helpers/Scaling';
import moment from 'moment';
import FloatingButton from '../helpers/FloatingButton';

interface State {
    entryList: any;
}
interface Props {
    navigation: any;
    isFocused: boolean;
}
const entryList = [
    {
        title: 'A. C. Benson',
        time: moment().format('l'),
        description: 'A diary need not be a dreary chronicle of ones movements; it should aim rather at giving salient account of some particular episode, a walk, a book, a conversation.'
    },
    {
        title: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones',
        time: moment().add(20, 'm').format('l'),
        description: '“Every action you take is a vote for the type of person you wish to become. No single instance will transform your beliefs, but as the votes build up, so does the evidence of your new identity.” James Clear'
    },
    {
        title: 'Small Beginnings',
        time: moment().add(5, 'd').format('l'),
        description: '“All big things come from small beginnings. The seed of every habit is a single, tiny decision. But as that decision is repeated, a habit sprouts and grows stronger. Roots entrench themselves and branches grow. The task of breaking a bad habit is like uprooting a powerful oak within us. And the task of building a good habit is like cultivating a delicate flower one day at a time.” James Clear'
    },
    {
        title: 'Be Proud',
        time: moment().add(2, 'w').format('l'),
        description: '“The more pride you have in a particular aspect of your identity, the more motivated you will be to maintain the habits associated with it. If you’re proud of how your hair looks, you’ll develop all sorts of habits to care for and maintain it. If you’re proud of the size of your biceps, you’ll make sure you never skip an upper-body workout. If you’re proud of the scarves you knit, you’ll be more likely to spend hours knitting each week. Once your pride gets involved, you’ll fight tooth and nail to maintain your habits.” James Clear'
    }
]
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
    _renderRowItem = ({ item, index }: {item: any, index: number}) => (
        <PureRow item={item} index={index} nav={this.props.navigation} title="Entry" />
    )
    render() {
        const navigate = this.props.navigation
        return (
            <View style={{ flex: 1, paddingTop: verticalScale(20), backgroundColor: '#fff' }}>
                {/* <CustomBackHeader show_backButton={false} nav={navigate} title={"Diary"} /> */}

                <FlatList
                    showsVerticalScrollIndicator={false}
                    disableVirtualization={false}
                    data={entryList}
                    renderItem={this._renderRowItem}
                    contentContainerStyle={{ marginTop: verticalScale(16), paddingBottom: verticalScale(20) }}
                    keyExtractor={item => item.title + ""}
                />
                <FloatingButton on_press={() => { this.props.navigation.navigate('AddEntry') }}/>
            </View>
        );
    }
}
export default EntryListing;