import {useRouter} from "expo-router";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import React, {useEffect, useState} from "react";
import {Keyboard, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, useWindowDimensions} from "react-native";
import {useUser} from "@/hooks/useUser";
import {UserProviderProps} from "@/types";
import Login from "@/app/auth/login";
import Register from "@/app/auth/register";

type RoutesProps = {
    key: string;
    title: string;
}

const renderScene = SceneMap({
    login: Login,
    register: Register,
});

const routes: RoutesProps[] = [
    {key: 'login', title: 'Войти'},
    {key: 'register', title: 'Зарегистрироваться'},
];

const renderTabBar = props => (
    <TabBar
        {...props}
        indicatorStyle={{backgroundColor: '#01153e'}}
        style={styles.tabBarView}
        activeColor='#01153e'
        inactiveColor='lightgrey'
    />
);

const AuthLayout = () => {
    const layout = useWindowDimensions();
    const router = useRouter()

    const [index, setIndex] = useState<number>(0);

    const {user} = useUser<UserProviderProps>();

    useEffect(() => {
        if (user) {
            router.replace("/(tabs)");
        } else {
            console.log(user)
        }
    }, [user])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Приложение для мам 👩‍🍼</Text>
                <TabView
                    navigationState={{index, routes}}
                    renderScene={renderScene}
                    renderTabBar={renderTabBar}
                    onIndexChange={setIndex}
                    initialLayout={{width: layout.width}}
                />
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

export default AuthLayout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        marginVertical: 20,
        color: '#1A237E',
    },
    tabBarView: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
});
