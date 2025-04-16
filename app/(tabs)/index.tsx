import {Text, View} from "react-native";
import {Link} from "expo-router";

export default function Index() {
    return (
        <View
            className="bg-primary"
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
                <Link href="../modals/FamilyMemberModal">
                    Open modal
                </Link>
        </View>
    );
}