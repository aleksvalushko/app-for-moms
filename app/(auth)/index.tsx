import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import React, {useState} from "react";
import {
    Keyboard,
    StyleSheet,
    TouchableWithoutFeedback,
    useWindowDimensions,
    View
} from "react-native";
import Login from "@/app/(auth)/login";
import Register from "@/app/(auth)/register";
import {SafeAreaView} from "react-native-safe-area-context";
import CustomText from "@/components/CustomText";

type RoutesProps = {
    key: string;
    title: string;
}

const renderScene = SceneMap({
    login: Login,
    register: Register,
});

const AuthComponent = () => {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);

    const routes: RoutesProps[] = [
        {key: 'login', title: 'Войти'},
        {key: 'register', title: 'Зарегистрироваться'},
    ];

    const renderTabBar = (props: any) => (
        <TabBar
            {...props}
            indicatorStyle={{backgroundColor: '#4371d6'}}
            style={styles.tabBarView}
            activeColor='#4371d6'
            inactiveColor='lightgrey'
        />
    );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <View style={styles.titleWrapper}>
                    <CustomText style={styles.title}>Приложение для мам 👩‍🍼</CustomText>
                </View>
                <SafeAreaView style={{flex: 3}}>
                    <TabView<RoutesProps>
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

export default AuthComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleWrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        marginVertical: 20,
        color: '#4371d6',
    },
    tabBarView: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
});
