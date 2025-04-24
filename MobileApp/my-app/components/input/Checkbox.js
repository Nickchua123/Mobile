import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CheckBox = ({ onPress, label, isChecked }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.checkbox, isChecked && styles.checked]}>
        {isChecked && <Text style={styles.checkMark}>✔</Text>}
      </View>
      {label &&
        (typeof label === 'string' ? (
          <Text style={styles.label}>{label}</Text>
        ) : (
          label
        ))}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 30,
    borderWidth: 2,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: 'black',
    borderColor: 'black',
  },
  checkMark: {
    color: 'white',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
  },
});

export default CheckBox;
