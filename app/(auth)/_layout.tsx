import {useRouter} from "expo-router";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import React, {useEffect, useState} from "react";
import {Keyboard, StyleSheet, Text, TouchableWithoutFeedback, useWindowDimensions, View} from "react-native";
import {useUser} from "@/hooks/useUser";
import Login from "@/app/(auth)/login";
import Register from "@/app/(auth)/register";
import {SafeAreaView} from "react-native-safe-area-context";

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

const renderTabBar = (props: any) => (
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
    const router = useRouter();

    const [index, setIndex] = useState<number>(0);

    const {user} = useUser();

    useEffect(() => {
        if (user) {
            router.replace("/(tabs)");
        }
    }, [user])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>Приложение для мам 👩‍🍼</Text>
                </View>
                <SafeAreaView style={{flex: 3}}>
                    <TabView
                        navigationState={{index, routes}}
                        renderScene={renderScene}
                        renderTabBar={renderTabBar}
                        onIndexChange={setIndex}
                        initialLayout={{width: layout.width}}
                    />
                </SafeAreaView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

export default AuthLayout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
    },
    titleWrapper: {
        flex: 1,
        justifyContent: 'center',
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
