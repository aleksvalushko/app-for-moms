import {Text, View} from 'react-native';

type PROPS = {
    name: string;
}

const DeleteFamilyMember = ({name}: PROPS) => {

    return (
        <View>
            <Text>Вы действительно хотите удалить <b>{name}</b> из списка членов семьи?</Text>
        </View>
    );
}

export default DeleteFamilyMember;