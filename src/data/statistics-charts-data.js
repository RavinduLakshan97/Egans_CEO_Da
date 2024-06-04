import { chartsConfig } from "@/configs";

const websiteViewsChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Views",
      data: [45, 20, 10, 22, 30, 10, 40],
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#388e3c",
    plotOptions: {
      bar: {
        columnWidth: "16%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["Steve", "Alex", "Cathy", "Peter", "Morgan", "John", "Sarah"],
    },
  },
};



const dailySalesChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#0288d1"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  },
};



const completedTasksChart = (data) => ({
  type: "pie",
  height: 220,
  series: data.series,
  options: {
    ...chartsConfig,
    colors: ["#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#FFCD56", "#C9CBCF", "#36A2EB"],
    labels: data.labels,
  },
});


export const statisticsChartsData = [
  {
    color: "white",
    title: "Best Buy Supplier",
    description: "",
    chart: websiteViewsChart,
  },
  {
    color: "white",
    title: "Average prices for the period",
    description: "",
    chart: dailySalesChart,
  },
  {
    color: "white",
    title: "Product Purchase Audit",
    description: "Shows the audit of product purchases",
    chart: completedTasksChart({ series: [30, 26, 25], labels: ["CENCOBV0", "STACAMV0", "RICKEIV0"] }),  
  },
];

export default statisticsChartsData;
