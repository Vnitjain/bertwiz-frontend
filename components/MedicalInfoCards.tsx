import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import CheckBox from "./CheckBox";
import { LineChart } from "react-native-chart-kit";

const data = {
  labels: (() => {
    const today = new Date();
    const labels = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'short' });
      labels.unshift(`${day} ${month}`);
    }
    return labels;
  })(),
  datasets: [
    {
      data: [120, 122, 118, 124, 126, 130, 128],
      color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
      name: "Blood Pressure",
      visible: true,
    },
    {
      data: [72, 75, 78, 70, 73, 76, 79],
      color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
      name: "Heart Rate",
      visible: true,
    },
    {
      data: [190, 195, 185, 200, 210, 205, 198],
      color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
      name: "Cholesterol",
      visible: true,
    },
    {
      data: [110, 105, 120, 115, 130, 125, 118],
      color: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`,
      name: "Blood Sugar",
      visible: true,
    },
    {
      data: [14.0, 13.8, 14.2, 13.9, 14.1, 13.7, 14.0],
      color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
      name: "Hemoglobin",
      visible: true,
    },
  ],
};

const MedicalInfoCards = () => {
  const [chartData, setChartData] = useState(data);

  const toggleVisibility = (datasetName) => {
    const newData = { ...chartData };
    newData.datasets.forEach((dataset) => {
      if (dataset.name === datasetName) {
        dataset.visible = !dataset.visible;
      }
    });
    setChartData(newData);
  };

  const visibleDatasets = chartData.datasets.filter((dataset) => dataset.visible);


  return (
    <View style={styles.container}>
      <View style={styles.checkboxes}>
      {chartData.datasets.map((dataset) => (
          <View key={dataset.name} style={styles.checkboxContainer}>
            <CheckBox
              value={dataset.visible}
              onValueChange={() => toggleVisibility(dataset.name)}
            />
            <Text style={{ color: dataset.color(1) }}>{dataset.name}</Text>
          </View>
        ))}
      </View>
      <LineChart
        data={{
          labels: chartData.labels,
          datasets: visibleDatasets,
        }}
        width={350}
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: { r: "3", strokeWidth: "1", stroke: "#ffa726" },
          propsForBackgroundLines: {
            strokeDasharray: "",
            strokeWidth: 0,
            stroke: "#ffffff",
          },
          propsForLabels: { fontSize: 10 },
        }}
        bezier
        style={{ marginVertical: 8, borderRadius: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkboxes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 5,
  },
});

export default MedicalInfoCards;