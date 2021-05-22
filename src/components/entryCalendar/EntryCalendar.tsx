import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { ENTRY_COLOR, ENTRY_MAIN_COLOR, GRAPE_COLOR, LIGHT_GRAY, MAIN_GRAY, PRIMARY_COLOR } from "../../../assets/color";
import { Calendar } from 'react-native-calendars';
import CustomBackHeader from '../helpers/CustomHeaderBackButton';
import { scale, verticalScale } from '../helpers/Scaling';
import moment from 'moment';
import Button from '../helpers/Button';
import { ScrollView } from 'react-native-gesture-handler';
import PureRow from '../helpers/PureRow';
import FloatingButton from '../helpers/FloatingButton';
interface State {
    entryList: number[];
    available_slots: string[]
}
interface Props {
    navigation: any;
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
class EntryCalendar extends Component {
    state: State;
    props: Props;
    constructor(props) {
        super(props);
        this.state = {
            entryList: [],
            available_slots: ['8:30 AM', '9:30 PM', '8:30 AM', '9:30 PM']
        };
    }
    onDayPress = (value) => {
    }
    _renderRowItem = ({ item, index }) => (
        <PureRow item={item} index={index} nav={this.props.navigation} title="Entry" />
    )
    createSlot = (time) => {
        return (
            <TouchableOpacity
                key={time}
                onPress={() => {
                    this.setState({ selected_time: time, slot_error: false })
                }}
                style={{
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderRadius: 14,
                    marginVertical: verticalScale(4),
                    borderColor: LIGHT_GRAY,
                    paddingVertical: verticalScale(8),
                    marginHorizontal: scale(12)
                }}>
                <Text style={{
                    fontFamily: 'BurlingamePro-Medium',
                    fontSize: scale(12)
                }}>{time}</Text>
            </TouchableOpacity>
        )
    }
    render() {
        const navigate = this.props.navigation
        return (<View style={{ flex: 1 }}>
            {/* <CustomBackHeader show_backButton={false} nav={navigate} title={"My Diary Calendar"} /> */}
            <View style={{
                flexDirection: "row",
                marginTop: verticalScale(25),
                marginHorizontal: scale(12),
                marginVertical: verticalScale(10)
            }} >
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Calendar
                    style={{
                        marginBottom: verticalScale(4),
                        marginHorizontal: scale(12),
                        borderRadius: scale(4),
                        shadowColor: ENTRY_MAIN_COLOR,
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                    }}
                    minDate={moment().format('YYYY-MM-DD')}
                    theme={{
                        arrowStyle: {
                            backgroundColor: MAIN_GRAY,
                            padding: scale(10),
                            borderWidth: 1,
                            borderColor: 'transparent',
                            borderRadius: 2
                        },
                        arrowColor: LIGHT_GRAY,
                        monthTextColor: '#000',
                        textMonthFontWeight: 'bold',
                        textMonthFontSize: 20,
                    }}
                    onMonthChange={(month) => {
                        this.setState({
                            availableSlots: []
                        })
                    }}
                    onDayPress={this.onDayPress}
                    hideExtraDays
                    markingType={'custom'}
                    markedDates={{
                        '2021-04-16': {
                            customStyles: {
                                container: {
                                    backgroundColor: PRIMARY_COLOR,
                                },
                                text: {
                                    color: '#fff',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        '2021-04-18': {
                            customStyles: {
                                container: {
                                    backgroundColor: 'white',
                                    borderWidth: 1,
                                    borderColor: PRIMARY_COLOR,
                                    elevation: 2
                                },
                                text: {
                                    color: PRIMARY_COLOR,
                                    fontWeight: 'bold'
                                }
                            }
                        }
                    }}
                />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    disableVirtualization={false}
                    data={entryList}
                    renderItem={this._renderRowItem}
                    contentContainerStyle={{ marginTop: verticalScale(8) }}
                    keyExtractor={item => item.title + ""}
                />
            </ScrollView>
            <FloatingButton on_press={() => { this.props.navigation.navigate('AddEntry') }} />
        </View>
        );
    }
}
export default EntryCalendar;