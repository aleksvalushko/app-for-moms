import {Tabs} from "expo-router";
import React from "react";
import UserOnly from "@/components/Auth/UserOnly";
import CustomTabBar from "@/components/TabBar/CustomTabBar";

const _Layout = () => {
    return <UserOnly>
        <Tabs
            tabBar={props => <CustomTabBar {...props} />}
            screenOptions={{
            tabBarActiveTintColor: '#4575D4',
            tabBarShowLabel: false,
        }}>
            <Tabs.Screen name="index" options={{
                title: 'Домой',
                headerShown: false,
            }}/>
            <Tabs.Screen name="settings" options={{
                title: 'Настройки',
                headerShown: false,
            }}/>
        </Tabs>
    </UserOnly>
}

export default _Layout;