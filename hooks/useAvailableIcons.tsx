import {ANTD_ICONS, MATERIAL_COMMUNITY_ICONS, MATERIAL_ICONS} from "@/constants/icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React from "react";

export const useAvailableIcons = (iconName, size, color) => {
    const iconExists = (iconName, availableIcons) => availableIcons.includes(iconName);

    const Icon = () => {
        if (iconName && iconExists(iconName, ANTD_ICONS)) {
            return <AntDesign name={iconName} size={size} color={color} />;
        }
        if (iconName && iconExists(iconName, MATERIAL_ICONS)) {
            return <MaterialIcons name={iconName} size={size} color={color}/>;
        }
        if (iconName && iconExists(iconName, MATERIAL_COMMUNITY_ICONS)) {
            return <MaterialCommunityIcons name={iconName} size={size} color={color}/>;
        }
        return '';
    };

  return { Icon };
};