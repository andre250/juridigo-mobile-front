import { PropTypes } from 'prop-types';
import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TextInputMask } from 'react-native-masked-text'

const PlainTextInput = ({
    disabled,
    placeholder,
    customStyle,
    secure,
    maskOptions,
    maskType,
    keyboardType,
    placeholderTextColor,
    field: {
        name,
        onBlur,
        onChange,
        value,
    },
    form: {
        errors,
        touched,
    },
}) => (
        <View>
            <TextInputMask
                onChangeText={onChange(name)}
                onBlur={onBlur(name)}
                editable={!disabled}
                placeholder={placeholder}
                secureTextEntry={secure === 'true'}
                keyboardType={keyboardType}
                selectTextOnFocus={!disabled}
                placeholderTextColor={placeholderTextColor}
                type={maskType}
                options={maskOptions}
                style={[
                    customStyle,
                    {
                        color: disabled ? 'gray' : 'black',
                        borderColor: errors[name] && touched[name] ? 'red' : 'gray',
                        borderWidth: errors[name] && touched[name] ? 1 : 0
                    },
                ]}
                value={value}
            />
            {errors[name] && touched[name] && <Text style={styles.rootError}>{errors[name]}</Text>}
        </View>
    );

PlainTextInput.propTypes = {
    disabled: PropTypes.bool,
    field: PropTypes.shape({
        name: PropTypes.string.isRequired,
        onBlur: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.string,
    }).isRequired,
    form: PropTypes.shape({
        errors: PropTypes.object.isRequired,
        touched: PropTypes.object.isRequired,
    }).isRequired,
};

PlainTextInput.defaultProps = {
    disabled: false,
};

const styles = StyleSheet.create({
    rootInput: {
        backgroundColor: 'white',
        color: '#333333',
        borderRadius: 3,
        height: hp('9%'),
        padding: hp('1%'),
        marginTop: hp('4%'),
    },
    rootError: {
        color: 'red',
    },
});

export default PlainTextInput;