import React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ENTRY_COLOR, ENTRY_MAIN_COLOR, LIGHT_GRAY, MAIN_GRAY, ONYX_COLOR, PRIMARY_COLOR, YELLOW_COLOR } from '../../../assets/color';
import Button from '../helpers/Button';
import GradientButton from '../helpers/gradientButton';
import MyStorage from '../helpers/MyStorage';
import { scale, verticalScale } from '../helpers/Scaling';
interface State {
    email: string;
    password: string;
    loading: boolean;
    btn_text: string;
    confirm_password: string;
    match_email: string;
    match_password: string;
}
interface Props {
    navigation: any;
}
export default class LoginView extends React.Component {
    state: State;
    props: Props;
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confirm_password: "",
            loading: false,
            btn_text: "",
            match_email: "",
            match_password: ""
        }
    }
    componentDidMount() {
        const storage = new MyStorage();
        storage.getEmail().then(email => {
            console.log('email', email);
            if (email) {
                this.setState({
                    btn_text: 'LOGIN',
                    match_email: email
                })
                storage.getPassword().then(password => {
                    console.log('password', password);
                    this.setState({
                        match_password: password
                    })
                })
            } else {
                this.setState({
                    btn_text: 'SIGN UP'
                })
            }
        })
    }
    render() {
        return (
            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={[ENTRY_MAIN_COLOR, YELLOW_COLOR]}
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingBottom: '60%'
                }}
            >
                <Text style={{
                    fontFamily: 'BurlingamePro-CondBold',
                    color: '#000',
                    fontSize: scale(38),
                    paddingBottom: verticalScale(28)
                }}>Fin<Text style={{ color: ONYX_COLOR }}>Diary</Text></Text>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Email..."
                        value={this.state.email}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        keyboardType={'email-address'}
                        placeholderTextColor={ONYX_COLOR}
                        onChangeText={text => this.setState({ email: text })} />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        secureTextEntry
                        style={styles.inputText}
                        autoCorrect={false}
                        value={this.state.password}
                        autoCapitalize={'none'}
                        placeholder="Password"
                        placeholderTextColor={ONYX_COLOR}
                        onChangeText={text => this.setState({ password: text })} />
                </View>
                {
                    this.state.btn_text == 'SIGN UP'
                    &&
                    <View style={styles.inputView} >
                        <TextInput
                            secureTextEntry
                            style={styles.inputText}
                            autoCorrect={false}
                            value={this.state.confirm_password}
                            autoCapitalize={'none'}
                            placeholder="Confirm Password"
                            placeholderTextColor={ONYX_COLOR}
                            onChangeText={text => this.setState({ confirm_password: text })} />
                    </View>
                }
                <GradientButton
                    button_label={this.state.btn_text}
                    color_one={'#000'}
                    color_two={ONYX_COLOR}
                    on_press={async () => {
                        this.props.navigation.navigate('EntryList')
                        const storage = new MyStorage();
                        this.setState({ loading: true })
                        if (this.state.email && this.state.password) {
                            if (this.state.match_email && this.state.match_password) {
                                if (this.state.email == this.state.match_email &&
                                    this.state.password == this.state.match_password) {
                                    this.props.navigation.navigate('EntryList')
                                }
                            } else {
                                await storage.setEmail(this.state.email);
                                await storage.setPassword(this.state.password);
                                this.setState({ loading: false });
                                this.props.navigation.navigate('EntryList');
                            }
                        }
                    }}
                    show_spinner={this.state.loading}
                    text_style={{
                        fontFamily: 'BurlingamePro-SemiBold',
                        color: '#fff',
                        paddingHorizontal: scale(60),
                        fontSize: scale(16)
                    }}
                    custom_style={{
                        backgroundColor: MAIN_GRAY,
                        borderWidth: 1,
                        borderColor: MAIN_GRAY,
                        height: verticalScale(32.5),
                        borderRadius: scale(24)
                    }}
                />
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: ENTRY_MAIN_COLOR,
        marginBottom: 40
    },
    inputView: {
        width: "80%",
        backgroundColor: LIGHT_GRAY,
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        fontFamily: 'BurlingamePro-Medium',
        fontSize: 16,
        color: ONYX_COLOR
    },
    loginBtn: {
        width: "80%",
        backgroundColor: ENTRY_MAIN_COLOR,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10,
    },
    loginText: {
        color: '#fff',
        fontFamily: 'BurlingamePro-Bold',
        fontSize: 16
    },
    singUpText: {
        color: PRIMARY_COLOR,
        fontFamily: 'BurlingamePro-Bold',
        fontSize: 16
    }
});