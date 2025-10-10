import {Tabs} from "expo-router";
import {FontAwesome} from "@expo/vector-icons";
import {View, Text} from "react-native";
import React from "react";

type Props = {
    focused: boolean;
    color: string;
    icon: any;
    title: string;
}

const TabIcon: React.FC<Props> = ({focused, color, icon, title}: Props) => {
    if (focused) {
        return (
            <View
                className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden">
                <FontAwesome size={24} name={icon} color={color}/>
                <Text className="text-activeTab font-semibold ml-2">{title}</Text>
            </View>
        )
    } else {
        return (
            <View className="size-full justify-center items-center mt-4 text-white rounded-full">
                <FontAwesome size={24} name={icon} color={color}/>
            </View>
        )
    }
}

const _Layout = () => {
    return <Tabs screenOptions={{
        tabBarActiveTintColor: '#4575D4',
        tabBarInactiveTintColor: 'white',
        tabBarActiveBackgroundColor: '#6B8FD4',
        tabBarShowLabel: false,
        tabBarItemStyle: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        },
        tabBarStyle: {
            height: 60,
            backgroundColor: '#05296E',
            overflow: 'hidden',
        }
    }}>
        <Tabs.Screen name="index" options={{
            title: 'Домой',
            headerShown: false,
            tabBarItemStyle: {
                width: '100%',
                height: 60,
                flexDirection: 'row'
            },
            tabBarIcon: ({focused, color}) => <TabIcon focused={focused} color={color} icon="home" title="Домой"/>
        }}/>
        <Tabs.Screen name="settings" options={{
            title: 'Настройки',
            headerShown: false,
            tabBarItemStyle: {
                width: '100%',
                height: 60,
                flexDirection: 'row'
            },
            tabBarIcon: ({focused, color}) => <TabIcon focused={focused} color={color} icon="gears" title="Настройки"/>
        }}/>
    </Tabs>
}

export default _Layout;