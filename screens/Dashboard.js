import React, { useCallback, useState } from 'react';
import {
    Animated,
    Easing,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import AllocationSlider from '../components/AllocationSlider';
import PieChart from '../components/PieChart';

const Dashboard = () => {
  const paycheckAmount = 2000;
  const [allocations, setAllocations] = useState({
    savings: 30,
    bills: 40,
    spending: 30
  });
  const [showSaved, setShowSaved] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const handleSliderChange = useCallback((category, value) => {
    setAllocations(prev => {
      const newAllocations = {...prev, [category]: value};
      
      // Adjust other categories proportionally
      const otherCategories = Object.keys(prev).filter(key => key !== category);
      const totalOther = otherCategories.reduce((sum, key) => sum + prev[key], 0);
      
      if (totalOther > 0) {
        const remaining = 100 - value;
        otherCategories.forEach(key => {
          newAllocations[key] = Math.round((prev[key] / totalOther) * remaining);
        });
      }

      // Ensure total is exactly 100
      const total = Object.values(newAllocations).reduce((sum, val) => sum + val, 0);
      if (total !== 100) {
        newAllocations[otherCategories[0]] += 100 - total;
      }
      
      return newAllocations;
    });
  }, []);


  const handleSave = () => {
    setShowSaved(true);
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => setShowSaved(false));
      }, 2000);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Income Allocation</Text>
          <Text style={styles.paycheck}>Paycheck: ${paycheckAmount.toFixed(2)}</Text>
        </View>

        <View style={styles.chartContainer}>
          <PieChart allocations={allocations} paycheckAmount={paycheckAmount} />
        </View>

        <View style={styles.slidersContainer}>
          <AllocationSlider
            key={`slider-savings`}
            label="Savings"
            value={allocations.savings}
            onValueChange={(value) => handleSliderChange('savings', value)}
            color="#4CAF50"
          />
          <AllocationSlider
            key={`slider-bills`}
            label="Bills"
            value={allocations.bills}
            onValueChange={(value) => handleSliderChange('bills', value)}
            color="#2196F3"
          />
          <AllocationSlider
            key={`slider-spending`}
            label="Spending"
            value={allocations.spending}
            onValueChange={(value) => handleSliderChange('spending', value)}
            color="#FF9800"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Rule</Text>
        </TouchableOpacity>

        {showSaved && (
          <Animated.View style={[styles.savedMessage, { opacity: fadeAnim }]}>
            <Text style={styles.savedMessageText}>
              Allocation Saved!{'\n'}
              Savings: ${(paycheckAmount * allocations.savings / 100).toFixed(2)}{'\n'}
              Bills: ${(paycheckAmount * allocations.bills / 100).toFixed(2)}{'\n'}
              Spending: ${(paycheckAmount * allocations.spending / 100).toFixed(2)}
            </Text>
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  paycheck: {
    fontSize: 18,
    color: '#666',
  },
  chartContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  slidersContainer: {
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  savedMessage: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(98, 0, 238, 0.9)',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  savedMessageText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default Dashboard;