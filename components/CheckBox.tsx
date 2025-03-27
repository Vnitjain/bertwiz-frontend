import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CheckBoxProps {
  value: boolean;
  onValueChange: () => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ value, onValueChange }) => {
  return (
    <TouchableOpacity onPress={onValueChange} style={styles.container}>
      <View style={[styles.box, value ? styles.checked : styles.unchecked]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 5,
  },
  box: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 3,
  },
  checked: {
    backgroundColor: 'skyblue',
  },
  unchecked: {
    backgroundColor: 'white',
  },
});

export default CheckBox;