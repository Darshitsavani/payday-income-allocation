import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const AllocationPieChart = ({ allocations, paycheckAmount }) => {
  const data = [
    {
      name: 'Savings',
      percentage: allocations.savings,
      amount: (paycheckAmount * allocations.savings / 100).toFixed(2),
      color: '#4CAF50',
      legendFontColor: '#333',
      legendFontSize: 15,
    },
    {
      name: 'Bills',
      percentage: allocations.bills,
      amount: (paycheckAmount * allocations.bills / 100).toFixed(2),
      color: '#2196F3',
      legendFontColor: '#333',
      legendFontSize: 15,
    },
    {
      name: 'Spending',
      percentage: allocations.spending,
      amount: (paycheckAmount * allocations.spending / 100).toFixed(2),
      color: '#FF9800',
      legendFontColor: '#333',
      legendFontSize: 15,
    },
  ];

  return (
    <View style={styles.container}>
      <PieChart
        data={data}
        width={screenWidth - 40}
        height={200}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="percentage"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
      <View style={styles.legendContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>
              {item.name}: {item.percentage}% (${item.amount})
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  legendText: {
    fontSize: 14,
    color: '#333',
  },
});

export default AllocationPieChart;