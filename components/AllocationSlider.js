import Slider from '@react-native-community/slider';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AllocationSlider = ({ label, value, onValueChange, color }) => {
  const [sliderValue, setSliderValue] = useState(value);
  const [displayValue, setDisplayValue] = useState(value);

  // Debounce the actual value updates
  useEffect(() => {
    const timer = setTimeout(() => {
      if (sliderValue !== value) {
        onValueChange(sliderValue);
      }
    }, 150); // 150ms debounce delay
    
    return () => clearTimeout(timer);
  }, [sliderValue]);

  // Update display value immediately for smooth UI
  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.value, { color }]}>
          {displayValue}% (${((2000 * displayValue) / 100).toFixed(2)})
        </Text>
      </View>
      <Slider
        value={displayValue}
        onValueChange={setSliderValue}
        minimumValue={0}
        maximumValue={100}
        step={1}
        minimumTrackTintColor={color}
        maximumTrackTintColor="#ddd"
        thumbTintColor={color}
        style={styles.slider}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  slider: {
    width: '100%',
    height: 40,
  },
});

export default React.memo(AllocationSlider);