import React, {useState} from 'react'
import {AuthTemplate} from "../Components/Container";
import TextInput from "src/Components/Common/TextInput";
import {useDispatch, useSelector} from "react-redux";
import {setField} from "src/Slices/auth";
import {isDebugMode} from "../../../config";

export default function Name({navigation}) {

    const {username} = useSelector(state => state.auth)
    const [name, setName] = useState(username)
    const [isError, setError] = useState(false)
    const [errorText, setErrorText] = useState("")
    const dispatch = useDispatch()

    const proceed = () => {
        if ((name.length <= 15 && name.length > 0 && name.trim()) || isDebugMode) {
            dispatch(setField('username', name));
            navigation.navigate('RegisterAddress')
        }
        else if (name.length === 0 || !name.trim()) {
            setError(true)
            setErrorText("Пожалуйста, введите ваше имя")
            setName("")
        }
        else {
            setError(true)
            setErrorText("Имя не должно быть длиннее 15 символов")
        }
    }

    const handleTextChange = text => {
        setError(false);
        setErrorText("");
        setName(text);
    }

    return (
        <AuthTemplate
            title='Как вас зовут?'
            buttonText='Далее'
            isAbleToMoveBack={true}
            buttonAction={proceed}
            navigation={navigation}
        >
            <TextInput
                title='Ваше имя'
                withContainer={false}
                value={name}
                isError={isError}
                errorMessage={errorText}
                onChange={handleTextChange}
            />
        </AuthTemplate>
    );
}

