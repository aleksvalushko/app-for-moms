import {ANTD_ICONS, MATERIAL_COMMUNITY_ICONS, MATERIAL_ICONS} from "@/constants/icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React from "react";

export const useAvailableIcons = (name, size, color) => {
    const iconExists = (name, availableIcons) => availableIcons.includes(name);

    const Icon = () => {
        if (name && iconExists(name, ANTD_ICONS)) {
            return <AntDesign name={name} size={size} color={color} />;
        }
        if (name && iconExists(name, MATERIAL_ICONS)) {
            return <MaterialIcons name={name} size={size} color={color}/>;
        }
        if (name && iconExists(name, MATERIAL_COMMUNITY_ICONS)) {
            return <MaterialCommunityIcons name={name} size={size} color={color}/>;
        }
        return '';
    };

  return { Icon };
};