import {Text, TextInput, View, StyleSheet} from 'react-native';
import {useEffect, useState} from "react";

type PROPS = {
    newFamilyMember: string;
    setNewFamilyMember: (param: string) => void;
}

const FamilyMember = ({newFamilyMember, setNewFamilyMember}: PROPS) => {
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        setInputValue(newFamilyMember);
    }, [newFamilyMember]);

    const onChangeText = (text: string) => {
        setInputValue(text);
        setNewFamilyMember(text);
    }

    return (
        <View>
            <Text>Введите имя члена семьи</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={inputValue}
                autoFocus
                placeholder="Например: Екатерина"
                placeholderTextColor="lightgrey"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
    },
});

export default FamilyMember;