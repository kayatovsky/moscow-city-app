import {TouchableWithoutFeedback, Keyboard} from "react-native";
import React from "react";

export const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)
