import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import EvilIcons from "react-native-vector-icons/EvilIcons";
import LinearGradient from 'react-native-linear-gradient';
import { ENTRY_MAIN_COLOR, GRAPE_COLOR, LIGHT_GRAY, MAIN_GRAY, ONYX_COLOR, YELLOW_COLOR } from '../../../assets/color';
import { scale, verticalScale } from './Scaling';
const FloatingButton = (props) => {
    return (
        <TouchableOpacity
            onPress={props.on_press}>
            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={[props.icon ? ENTRY_MAIN_COLOR : MAIN_GRAY, props.icon ? YELLOW_COLOR : ONYX_COLOR]} style={[styles.touchable_bg, props.custom_style]}>

                {
                    props.icon
                        ?
                        <EvilIcons
                            color={'#fff'}
                            name="pencil"
                            size={62}
                        />
                        :
                        <Text style={[styles.text_color, props.text_style]}>
                            {props?.button_label ? props.button_label : '+'}
                        </Text>
                }
                {
                    props.show_spinner
                    &&
                    <ActivityIndicator size="small" color={'#fff'} style={{ marginLeft: 8, marginRight: 8 }} />

                }
            </LinearGradient>
        </TouchableOpacity>
    );
}
const styles = {
    touchable_bg: {
        width: 60,
        justifyContent: 'center',
        height: 60,
        borderRadius: 30,
        position: 'absolute',
        bottom: 10,
        right: 10,
        marginBottom: verticalScale(12),
        marginRight: scale(8),
        shadowColor: ENTRY_MAIN_COLOR,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text_color: {
        color: YELLOW_COLOR,
        left: 20,
        fontFamily: 'BurlingamePro-CondSemiBold',
        fontSize: scale(24),
    }
}
export default FloatingButton;
