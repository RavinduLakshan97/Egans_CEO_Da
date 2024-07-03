import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Button,
  IconButton,
  Switch
} from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import { FunnelIcon } from '@heroicons/react/24/outline';

import axios from "axios";
import moment from "moment";
import Chart from "react-apexcharts";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { chartsConfig } from "@/configs";
import {
  All_Products_URL,
  Best_Buy_Supplier_URL,
  Analytics_Price_URL,
  Average_Purchase_Quantity_URL,
  Total_Orders_URL,
  Most_Supplied_Suppliers_URL,
  Maximum_Orders_URL,
  Average_Price_Period_URL
} from "../../../config";

export function Home() {

  // api urls

  const getallproductsurl = `${All_Products_URL}`;

  const bestBuySupplierChartTemplate = {
    type: "bar",
    height: 220,
    series: [
      {
        name: "Purchases",
        data: [],
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
        categories: [],
      },
    },
  };

const priceHikeChart = {
  type: "line",
  height: 220,
  series: [],
  options: {
    ...chartsConfig,
    colors: ["#0288d1"],
    stroke: {
      lineCap: "round",
      curve: 'smooth',
    },
    markers: {
      size: 5,
    },
  },
};


const productPurchaseAuditChart = {
  type: "donut",
  height: 220,
  series: [],
  options: {
    ...chartsConfig,
    colors: ["#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#FFCD56", "#C9CBCF", "#36A2EB"],
    labels: [""],
  },
};


const radialBarChartTemplate = {
  type: "radialBar",
  height: 280,  
  series: [],  
  options: {
    chart: {
      height: 280,  
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 5,
          size: '30%',
          background: 'transparent',
        },
        dataLabels: {
          total: {
            show: true,
            label: 'TOTAL',
            formatter: () => '0'
          },
          value: {
            formatter: (val) => `${val.toFixed(2)}%`
          }
        }
      }
    },
    labels: [], 
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val.toFixed(2)}%`;
        }
      }
    }
  },
};

const totalOrdersRadialBarChart = {
  type: "radialBar",
  height: 280,
  series: [],
  options: {
    chart: {
      height: 280,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        track: {
          background: '#333',
          startAngle: -135,
          endAngle: 135,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "30px",
            show: true
          },
          total: {
            show: true,
            label: 'Total Orders',
            formatter: function() {
              return '0';
            }
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        gradientToColors: ["#87D4F9"],
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: "butt"
    },
    labels: [""],
    //colors: ["#FF4560"],
    tooltip: {
      enabled: true,
      y: {
        formatter: function(val, opts) {
          return `${opts.w.globals.series[opts.seriesIndex]} Orders`;
        }
      }
    }
  }
};

const maxPriceRadialBarChart = {
  type: "radialBar",
  height: 280,
  series: [],
  options: {
    chart: {
      height: 280,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 5,
          size: '30%',
          background: 'transparent',
        },
        dataLabels: {
          name: {
            show: true,
            formatter: function(val, opts) {
              if (opts.seriesIndex === 0) return `Max Price`;
              if (opts.seriesIndex === 1) return `Avg Price`;
              if (opts.seriesIndex === 2) return `Min Price`;
              return `${val}`;
            }
          },
          value: {
            fontSize: "20px",
            show: true,
            formatter: function(val, opts) {
              if (opts.seriesIndex === 0) return `$${val.toFixed(2)}`;
              if (opts.seriesIndex === 1) return `$${val.toFixed(2)}`;
              if (opts.seriesIndex === 2) return `$${val.toFixed(2)}`;
              return `$${val.toFixed(2)}`;
            }
          },
          total: {
            show: true,
            label: 'Min Price',
            formatter: function(w) {
              const minPrice = w.config.series[2];
              return `${minPrice.toFixed(2)}`;
            }
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        gradientToColors: ["#87D4F9", "#FF4560", "#00E396"], // Colors for maxPrice, avgPrice, minPrice
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: "butt"
    },
    labels: ["Max Price", "Avg Price", "Min Price"],
    colors: ["#87D4F9", "#FF4560", "#00E396"], // Colors for maxPrice, avgPrice, minPrice
    tooltip: {
      enabled: true,
      y: {
        formatter: function(val, opts) {
          if (opts.seriesIndex === 0) return `Max: $${val.toFixed(2)}`;
          if (opts.seriesIndex === 1) return `Avg: $${val.toFixed(2)}`;
          if (opts.seriesIndex === 2) return `Min: $${val.toFixed(2)}`;
          return `${val.toFixed(2)}`;
        }
      }
    }
  }
};






const [statisticsCardsData, setStatisticsCardsData] = useState([
  {
    color: "gray",
    backgroundColor: "bg-custom-yellow",
    average_price: "Average price",
    value: "2,300",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
    },
    showCustomFields: true,
  },
  // {
  //   color: "gray",
  //   backgroundColor: "bg-custom-green",
  //   value: "3,462",
  //   footer: {
  //     color: "text-red-500",
  //     value: "-2%",
  //     label: "than yesterday",
  //   },
  //   showOrderStats: true,
  // },
  // Add the chart cards here
  {
    color: "gray",
    backgroundColor: "white",
    titles: "Most Supplied Suppliers",
    chart: radialBarChartTemplate,
    showChart: true,
    span: 1 ,
    
    
  },
  {
    color: "gray",
    backgroundColor: "white",
    titles: "Total Orders",
    chart1: totalOrdersRadialBarChart,
    showTotalOrdersChart: true,
    span: 1,
  },
  {
    color: "gray",
    backgroundColor: "white",
    titles: "Max Price",
    chart2: maxPriceRadialBarChart,
    showMaxPriceChart: true, 
    span: 1,
  }
]);

  const [statisticsChartsData, setStatisticsChartsData] = useState([
    {
      color: "white",
      title: "Best Buy Supplier",
      description: "",
      chart: bestBuySupplierChartTemplate,
    },
    {
      color: "white",
      title: "Average prices for the period",
      description: "",
      chart: priceHikeChart,
    },
    {
      color: "white",
      title: "Maximum Orders For Products",
      description: "",
      chart: productPurchaseAuditChart,
    },
  ]);

  const currentFromDate = moment().startOf('day').format('YYYY-MM-DD');
  const currentToDate = moment().endOf('day').format('YYYY-MM-DD');

  const [selectedOption, setSelectedOption] = useState("");
  const [searchTerm, setSearchTerm] = useState(null);
  const [fromDate, setFromDate] = useState(currentFromDate);
  const [toDate, setToDate] = useState(currentToDate);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [basedOn, setBasedOn] = useState('value');
  const [viewCount, setViewCount] = useState(3);
  const [bestBuySupplierChartState, setBestBuySupplierChartState] = useState(bestBuySupplierChartTemplate);

  // New state variables for the new API data
  const [averagePrice, setAveragePrice] = useState("");
  const [highestPrice, setHighestPrice] = useState("");
  const [highestPriceDate, setHighestPriceDate] = useState("");
  const [lowestPrice, setLowestPrice] = useState("");
  const [lowestPriceDate, setLowestPriceDate] = useState("");
  const [averagePriceQTY, setAveragePriceQTY] = useState("");
  const [totalNoOfOrders, setTotalNoOfOrders] = useState("");
  const [bestBuyProducts, setBestBuyProducts] = useState([]);
  const [bestBuySupplierCode, setBestBuySupplierCode] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [filteredTableData, setFilteredTableData] = useState([]);

  const [selectedTimeFrame, setSelectedTimeFrame] = useState('year');
  const [priceHikeChartData, setPriceHikeChartData] = useState(statisticsChartsData[1].chart);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);


  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (fromDate && toDate && searchTerm && viewCount) {
      fetchRadialBarChartData();
    }
  }, [fromDate, toDate, searchTerm, viewCount]);
  

  useEffect(() => {
    if (fromDate && toDate && searchTerm && basedOn && viewCount) {
      fetchData();
    }
  }, [fromDate, toDate, searchTerm, basedOn, viewCount]);

  useEffect(() => {
    fetchProducts(selectedOption);
    updateCardContents(selectedOption);
  }, [selectedOption]);

  useEffect(() => {
    filterTableData();
  }, [tableData, viewCount]);

  useEffect(() => {
    updatePriceHikeChart(selectedTimeFrame);
  }, [selectedTimeFrame]);

  useEffect(() => {
    if(fromDate && toDate && viewCount){
      fetchProductPurchaseAuditData();
    }
  }, [fromDate,toDate,viewCount]);

  useEffect(() => {
    if (fromDate && toDate && searchTerm && basedOn && viewCount) {
      fetchChartData();
    }
  }, [fromDate, toDate, searchTerm, basedOn, viewCount]);



  useEffect(() => {
    if (fromDate && toDate && searchTerm) {
      fetchTotalOrdersData();
      fetchMaxPriceData(); // Fetch max price data
    }
  }, [fromDate, toDate, searchTerm]);
  
  
  const fetchProducts = async () => {
    try {   
      const response = await axios.get(getallproductsurl);
      const products = response.data.products.map((product) => ({
        value: product.catlogCode,
        label: product.catlogCode,
      }));
      setProducts(products);
      setFilteredProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearchChange = (selectedOption) => {
    setSearchTerm(selectedOption);
    if (!selectedOption) {
      setAveragePrice("");
      setHighestPrice("");
      setHighestPriceDate("");
      setLowestPrice("");
      setLowestPriceDate("");
      setAveragePriceQTY("");
      setTotalNoOfOrders("");
    }
  };
  
  
  //bar chart api fetching function

  const fetchChartData = async () => {
    try {
      const isBasedOnInvoiceCount = basedOn === 'count';
      const isBasedOnValue = basedOn === 'value';
      const isBasedOnQty = basedOn === 'qty';
  
      const response = await axios.get(`${Best_Buy_Supplier_URL}?from=${fromDate}&to=${toDate}&productCode=${searchTerm ? searchTerm.value : ''}&isBasedOnInvoiceCount=${isBasedOnInvoiceCount}&isBasedOnValue=${isBasedOnValue}&isBasedOnQty=${isBasedOnQty}&viewCount=${viewCount}`);
      
      const dashboardModels = response.data.dashboardModels;
  
      let yAxisData;
      let yAxisLabel;
      let maxSupplierCode = '';
  
      if (isBasedOnInvoiceCount) {
        yAxisData = dashboardModels.map(item => item.invoiceCount);
        yAxisLabel = "Invoice Count";
        maxSupplierCode = dashboardModels.reduce((max, item) => item.invoiceCount > max.invoiceCount ? item : max, dashboardModels[0]).supplierCode;
      } else if (isBasedOnValue) {
        yAxisData = dashboardModels.map(item => item.totalAmount);
        yAxisLabel = "Total Amount";
        maxSupplierCode = dashboardModels.reduce((max, item) => item.totalAmount > max.totalAmount ? item : max, dashboardModels[0]).supplierCode;
      } else if (isBasedOnQty) {
        yAxisData = dashboardModels.map(item => item.totalQuantity);
        yAxisLabel = "Total Quantity";
        maxSupplierCode = dashboardModels.reduce((max, item) => item.totalQuantity > max.totalQuantity ? item : max, dashboardModels[0]).supplierCode;
      }
  
      const supplierCodes = dashboardModels.map(item => item.supplierCode);
  
      const updatedChartState = {
        ...bestBuySupplierChartTemplate,
        series: [{ name: yAxisLabel, data: yAxisData }],
        options: {
          ...bestBuySupplierChartTemplate.options,
          xaxis: { categories: supplierCodes },
          yaxis: {
            labels: {
              formatter: (value) => value.toFixed(2),
            },
          },
        },
      };
  
      setStatisticsChartsData(prevState =>
        prevState.map(chartData => {
          if (chartData.title === "Best Buy Supplier") {
            return {
              ...chartData,
              chart: updatedChartState,
            };
          }
          return chartData;
        })
      );
  
      // Set the best buy supplier code based on the maximum value logic
      setBestBuySupplierCode(maxSupplierCode);
  
      // Fetch best buy products data
      // const bestBuyProductsUrl = `https://testportalapi.egansgroup.com.au/api/bestsupplier/getbestbuyproducts?from=${fromDate}&to=${toDate}&viewCount=5`;
      // const bestBuyProductsResponse = await axios.get(bestBuyProductsUrl);
      // const bestBuyProducts = bestBuyProductsResponse.data.BestBuyProducts;
      // const highestProduct = bestBuyProducts.reduce((max, product) => product.OrderQty > max.OrderQty ? product : max, bestBuyProducts[0]);
      // setBestBuyProducts(highestProduct.catlogCode);
  
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };
  
  
  
  const fetchRadialBarChartData = async () => {
    try {
      const response = await axios.get(`${Most_Supplied_Suppliers_URL}?from=${fromDate}&to=${toDate}&productCode=${searchTerm ? searchTerm.value : ''}&viewCount=${viewCount}`);
      
      console.log('API Response:', response.data);
  
      const mostSuppliedSuppliers = response.data.mostSuppliedSupplierss;
      const radialBarData = mostSuppliedSuppliers.map(item => item.totalSupplied);
      const labels = mostSuppliedSuppliers.map(item => item.supplierCode);
  
      // Calculate totalSupplied
      const totalSupplied = radialBarData.reduce((total, amount) => total + amount, 0);
  
      // Normalize data
      const normalizedRadialBarData = radialBarData.map(value => (value / totalSupplied) * 100);
  
      console.log('Radial Bar Data:', radialBarData);
      console.log('Normalized Radial Bar Data:', normalizedRadialBarData);
      console.log('Labels:', labels);
      console.log('Total Supplied:', totalSupplied);
  
      const updatedChartState = {
        ...radialBarChartTemplate,
        series: normalizedRadialBarData,
        options: {
          ...radialBarChartTemplate.options,
          labels: labels,
          plotOptions: {
            radialBar: {
              hollow: {
                margin: 5,
                size: '30%',
                background: 'transparent',
              },
              dataLabels: {
                total: {
                  show: true,
                  label: 'TOTAL',
                  formatter: () => `${totalSupplied.toFixed(2)}`
                },
                value: {
                  formatter: (val) => `${(val / 100 * totalSupplied).toFixed(2)}`
                }
              }
            }
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return `${val.toFixed(2)}%`;
              }
            }
          }
        }
      };
  
      console.log('Updated Chart State:', updatedChartState);
  
      setStatisticsCardsData (prevState => 
        prevState.map(chartData => 
          chartData.titles === "Most Supplied Suppliers"
            ? { ...chartData, chart: updatedChartState }
            : chartData
        )
      );
    } catch (error) {
      console.error("Error fetching radial bar chart data:", error);
    }
  };
  
  
  //pie chart api fetching function

  const fetchProductPurchaseAuditData = async () => {
    try {
      const response = await axios.get(`${Maximum_Orders_URL}?from=${fromDate}&to=${toDate}&viewCount=${viewCount}`);
  
      const maxOrderQtyData = response.data.maxOrderQty;
  
      // Limit to top 5 results
      const top5Data = maxOrderQtyData.slice(0, 5);
  
      // Extracting series data and labels
      const seriesData = top5Data.map(item => item.maxOrderQty);
      const labels = top5Data.map(item => item.catlogCode);
  
      const updatedChartState = {
        ...productPurchaseAuditChart,
        series: seriesData,
        options: {
          ...productPurchaseAuditChart.options,
          labels: labels,
          legend: {
            formatter: function(val, opts) {
              return labels[opts.seriesIndex];
            }
          },
          tooltip: {
            y: {
              formatter: function (value, { seriesIndex, dataPointIndex, w }) {
                return `${labels[dataPointIndex]}: ${value}`;
              }
            }
          }
        },
      };
  
      setStatisticsChartsData((prevState) =>
        prevState.map((chartData) => {
          if (chartData.title === "Maximum Orders For Products") {
            return {
              ...chartData,
              chart: updatedChartState,
            };
          }
          return chartData;
        })
      );
    } catch (error) {
      console.error("Error fetching Maximum Orders For Products data:", error);
    }
  };
  

  //total no of orders radial bar chart

const fetchTotalOrdersData = async () => {
  try {
    const response = await axios.get(`${Total_Orders_URL}?from=${fromDate}&to=${toDate}&productCode=${searchTerm.value}`);
    const totalOrders = response.data.totNoOfOrders[0].totalOrders;

    const percentage = (totalOrders / 10000) * 100; // Calculate the percentage of total orders out of 10,000

    const updatedChartState = {
      ...totalOrdersRadialBarChart,
      series: [percentage], // Set the calculated percentage
      options: {
        ...totalOrdersRadialBarChart.options,
        plotOptions: {
          ...totalOrdersRadialBarChart.options.plotOptions,
          radialBar: {
            ...totalOrdersRadialBarChart.options.plotOptions.radialBar,
            dataLabels: {
              ...totalOrdersRadialBarChart.options.plotOptions.radialBar.dataLabels,
              total: {
                ...totalOrdersRadialBarChart.options.plotOptions.radialBar.dataLabels.total,
                formatter: () => `${percentage.toFixed(2)}%` // Display the percentage
              },
              value: {
                formatter: (val) => `${val.toFixed(2)}%` // Display the percentage in the value label as well
              }
            }
          }
        },
        //labels: [` ${totalOrders}`], // Display total orders as a label
        tooltip: {
          enabled: true,
          y: {
            formatter: (val) => `${totalOrders} Orders` // Display total orders in the tooltip
          }
        }
      }
    };

    setStatisticsCardsData(prevState => 
      prevState.map(cardData => 
        cardData.titles === "Total Orders"
          ? { ...cardData, chart1: updatedChartState }
          : cardData
      )
    );
  } catch (error) {
    console.error("Error fetching total orders data:", error);
  }
};


//max price radial bar chart

const fetchMaxPriceData = async () => {
  try {
    const response = await axios.get(`${Analytics_Price_URL}?from=${fromDate}&to=${toDate}&productCode=${searchTerm.value}&viewCount=${viewCount}`);
    const maxPrice = response.data.DashboardPrices[0].maxPrice;
    const minPrice = response.data.DashboardPrices[0].minPrice;
    const avgPrice = response.data.DashboardPrices[0].avgPrice;

    // Calculate percentages
    const minPricePercentage = (minPrice / maxPrice) * 100;
    const avgPricePercentage = (avgPrice / maxPrice) * 100;

    const updatedChartState = {
      ...maxPriceRadialBarChart,
      series: [100, avgPricePercentage, minPricePercentage], // Max price as 100%, avgPrice and minPrice as percentages
      options: {
        ...maxPriceRadialBarChart.options,
        plotOptions: {
          ...maxPriceRadialBarChart.options.plotOptions,
          radialBar: {
            ...maxPriceRadialBarChart.options.plotOptions.radialBar,
            hollow: {
              margin: 5,
              size: '30%',
              background: 'transparent',
            },
            dataLabels: {
              ...maxPriceRadialBarChart.options.plotOptions.radialBar.dataLabels,
              total: {
                ...maxPriceRadialBarChart.options.plotOptions.radialBar.dataLabels.total,
                formatter: function() {
                  return `${minPrice.toFixed(2)}`; // Display the min price
                }
              },
              value: {
                formatter: function(val, opts) {
                  if (opts.seriesIndex === 0) return `${maxPrice.toFixed(2)}`;
                  if (opts.seriesIndex === 1) return `${avgPrice.toFixed(2)}`;
                  if (opts.seriesIndex === 2) return `${minPrice.toFixed(2)}`;
                  return `${val.toFixed(2)}`;
                }
              }
            }
          }
        },
        tooltip: {
          enabled: true,
          y: {
            formatter: (val, opts) => {
              if (opts.seriesIndex === 0) return `${maxPrice.toFixed(2)}`;
              if (opts.seriesIndex === 1) return `${avgPrice.toFixed(2)}`;
              if (opts.seriesIndex === 2) return `${minPrice.toFixed(2)}`;
              return `${val.toFixed(2)}`;
            }
          }
        }
      }
    };

    setStatisticsCardsData(prevState => 
      prevState.map(cardData => 
        cardData.titles === "Max Price"
          ? { ...cardData, chart2: updatedChartState }
          : cardData
      )
    );
  } catch (error) {
    console.error("Error fetching max price data:", error);
  }
};






  
  
  
  
  const fetchData = async () => {

    const isBasedOnInvoiceCount = basedOn === 'count';
    const isBasedOnValue = basedOn === 'value';
    const isBasedOnQty = basedOn === 'qty';
  
    const bestSupplierUrl = `${Best_Buy_Supplier_URL}?from=${fromDate}&to=${toDate}&productCode=${searchTerm.value}&isBasedOnInvoiceCount=${isBasedOnInvoiceCount}&isBasedOnValue=${isBasedOnValue}&isBasedOnQty=${isBasedOnQty}&viewCount=${viewCount}`;
    const analyticsPriceUrl = `${Analytics_Price_URL}?from=${fromDate}&to=${toDate}&productCode=${searchTerm.value}&viewCount=${viewCount}`;
    const avgPurchaseQtyUrl = `${Average_Purchase_Quantity_URL}?from=${fromDate}&to=${toDate}&productCode=${searchTerm.value}`;
    const totalOrdersUrl = `${Total_Orders_URL}?from=${fromDate}&to=${toDate}&productCode=${searchTerm.value}`;
    const mostSuppliedSuppliersUrl = `${Most_Supplied_Suppliers_URL}?from=${fromDate}&to=${toDate}&productCode=${searchTerm.value}&viewCount=${viewCount}`;


    try {
      const [
        bestSupplierResponse,
        analyticsPriceResponse,
        avgPurchaseQtyResponse,
        totalOrdersResponse,
        mostSuppliedSuppliersResponse,
      ] = await Promise.all([
        axios.get(bestSupplierUrl),
        axios.get(analyticsPriceUrl),
        axios.get(avgPurchaseQtyUrl),
        axios.get(totalOrdersUrl),
        axios.get(mostSuppliedSuppliersUrl),
      ]);
  
      // Handle best supplier data
      const bestSupplierData = bestSupplierResponse.data.dashboardModels;
      const categories = bestSupplierData.map(item => item.supplierCode);
      const series = bestSupplierData.map(item => item.totalAmount);
  
      setBestBuySupplierChartState({
        ...bestBuySupplierChartTemplate,
        series: [{ name: "Purchases", data: series }],
        options: {
          ...bestBuySupplierChartTemplate.options,
          xaxis: { categories },
        },
      });
  
      // Handle analytics price data
      const analyticsPriceData = analyticsPriceResponse.data.DashboardPrices[0];
      setAveragePrice(analyticsPriceData.avgPrice.toFixed(2));
      setHighestPrice(analyticsPriceData.maxPrice);
      setHighestPriceDate(analyticsPriceData.maxPriceDate);
      setLowestPrice(analyticsPriceData.minPrice);
      setLowestPriceDate(analyticsPriceData.minPriceDate);
  
      // Handle average purchase quantity data
      const avgPurchaseQtyData = avgPurchaseQtyResponse.data.avgPurchaseQty[0];
      setAveragePriceQTY(avgPurchaseQtyData.avgPurchaseQty.toFixed(2));
  
      // Handle total orders data
      const totalOrdersData = totalOrdersResponse.data.totNoOfOrders[0];
      setTotalNoOfOrders(totalOrdersData.totalOrders);
  
      
      const mostSuppliedSuppliersData = mostSuppliedSuppliersResponse.data.mostSuppliedSupplierss.map((supplier) => ({
        code: supplier.supplierCode,
        description: supplier.totalSupplied
      }));
      setTableData(mostSuppliedSuppliersData);
      if (mostSuppliedSuppliersData.length > 0) {
        setBestBuySupplierCode(mostSuppliedSuppliersData[0].code);
      }   
  
      // Handle best buy products data
      const bestBuyProducts = bestBuyProductsResponse.data.BestBuyProducts;
      const highestProduct = bestBuyProducts.reduce((max, product) => product.OrderQty > max.OrderQty ? product : max, bestBuyProducts[0]);
      setBestBuyProducts(highestProduct.catlogCode);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setSearchTerm("");
    fetchProducts(e.target.value);
    updateCardContents(e.target.value);
  };

  const filterTableData = () => {
    const filteredData = tableData.slice(0, viewCount);
    setFilteredTableData(filteredData);
  };

  const updateCardContents = (option) => {
    // Update card contents based on the selected option
  };


  const fetchAveragePricesData = async (timeFrameType) => {
    try {
      const url = `${Average_Price_Period_URL}?productCode=${searchTerm.value}&type=${selectedTimeFrame}&value=${toDate}`;
      const response = await axios.get(url);
      const productAveragePrices = response.data.productAveragePrices;
  
      let categories = [];
      let seriesData = [];
  
      if (timeFrameType === 0) {
        categories = productAveragePrices.map(item => item.year);
      } else if (timeFrameType === 1) {
        categories = productAveragePrices.map(item => `Month ${item.month}`);
      } else if (timeFrameType === 2) {
        categories = productAveragePrices.map(item => `Week ${item.week}`);
      } else if (timeFrameType === 3) {
        categories = productAveragePrices.map(item => item.day);
      }
  
      seriesData = productAveragePrices.map(item => item.averagePrice);
  
      const updatedChartData = {
        series: [{ name: "Average Price", data: seriesData }],
        options: {
          ...priceHikeChartData.options,
          xaxis: {
            categories: categories,
          },
        },
      };
  
      setPriceHikeChartData(updatedChartData);
    } catch (error) {
      console.error("Error fetching average prices data:", error);
    }
  };



  const updatePriceHikeChart = (timeFrame) => {
    let timeFrameType;
    switch (timeFrame) {
      case 'year':
        timeFrameType = 0;
        break;
      case 'month':
        timeFrameType = 1;
        break;
      case 'week':
        timeFrameType = 2;
        break;
      case 'day':
        timeFrameType = 3;
        break;
      default:
        timeFrameType = 0;
    }
  
    fetchAveragePricesData(timeFrameType);
  };
  

  const handleTimeFrameChange = (timeFrame) => {
    setSelectedTimeFrame(timeFrame);
    updatePriceHikeChart(timeFrame);
  };
  

  const customSliderStyles = {
    trackStyle: { backgroundColor: '#3a0ca3' },
    handleStyle: {
      borderColor: '#3a0ca3',
      backgroundColor: '#3a0ca3'
    },
    railStyle: { backgroundColor: '#d3d3d3' },
  };

  return (
    <div className="mt-5">
      <IconButton
        variant="text"
        color="black"
        className={`mb-2 rounded-full grid xl:hidden ${isDrawerOpen ? 'bg-black text-white' : 'bg-gray-400 text-black'}`}
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
      >
        <FunnelIcon className={`h-5 w-5 ${isDrawerOpen ? 'text-white' : 'text-black'}`} />
      </IconButton>

    <div className={`mb-7 grid gap-y-5 gap-x-6 md:grid-cols-2 xl:grid-cols-4 ${isDrawerOpen ? 'block' : 'hidden lg:grid'}`}>
  <Card className="grid xl:grid-cols-2 border border-blue-gray-100 shadow-sm bg-gray-200">
    <div className="px-1 mt-3 grid grid-cols-1">
      <label className="block text-sm font-medium text-black mb-0 mt-1 px-1">From</label>
      <input
        type="date"
        className="mb-2 md:mb-14 width-full border-blue-gray-100 shadow-sm px-4 rounded-md"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
      />
    </div>
    <div className="px-1 mt-3 grid grid-cols-1">
      <label className="block text-sm font-medium text-black mb-0 mt-1 px-1">To</label>
      <input
        type="date"
        className="mb-2 md:mb-14 width-full border-blue-gray-100 shadow-sm px-4 rounded-md"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
      />
    </div>
  </Card>
  <Card className="bg-gray-200">
    <label className="block text-sm font-medium text-black mb-2 mt-3 px-4">All Product/Supplier</label>
    <select
      className="block w-2/3 px-3 py-1 border border-gray-300 rounded-md shadow-sm text-gray-600 ml-3"
      value={selectedOption}
      onChange={handleOptionChange}
    >
      <option value="allProducts">All Products</option>
    </select>
  </Card>
  <Card className="bg-gray-200">
    <div className="mr-auto md:mr-4 md:w-45 mt-3 ml-2">
      <label className="block text-sm font-medium text-black mb-2 mt-0 px-1">Search by Product Code</label>
      <Select
        className="mb-3"
        value={searchTerm}
        onChange={handleSearchChange}
        options={filteredProducts}
        isClearable
      />
    </div>
  </Card>
  <Card className="bg-gray-200 mb-2">
    <div className="flex-1 mt-3 ml-2">
      <label className="block text-sm font-medium text-black mb-2">View Count</label>
      <Slider
        className="w-2/3 ml-2 mb-2 rounded-md border-blue-gray-100"
        min={1}
        max={5}
        valueLabelDisplay="auto"
        keyboard
        value={viewCount}
        onChange={value => setViewCount(value)}
        trackStyle={customSliderStyles.trackStyle}
        handleStyle={customSliderStyles.handleStyle}
        railStyle={customSliderStyles.railStyle}
      />
    </div>
    <label className="block text-sm font-medium text-black mb-2 mt-2 ml-2">Based On</label>
    <div className="flex items-center space-x-6 ml-2 mb-2">
      <div>
        <input
          className="mr-1"
          type="radio"
          id="value"
          name="basedOn"
          value="value"
          checked={basedOn === 'value'}
          onChange={(e) => setBasedOn(e.target.value)}
        />
        <label htmlFor="value" className="text-black">Value</label>
      </div>
      <div>
        <input
          className="mr-1"
          type="radio"
          id="qty"
          name="basedOn"
          value="qty"
          checked={basedOn === 'qty'}
          onChange={(e) => setBasedOn(e.target.value)}
        />
        <label htmlFor="qty" className="text-black">Quantity</label>
      </div>
      <div>
        <input
          className="mr-1"
          type="radio"
          id="count"
          name="basedOn"
          value="count"
          checked={basedOn === 'count'}
          onChange={(e) => setBasedOn(e.target.value)}
        />
        <label htmlFor="count" className="text-black">Count</label>
      </div>
    </div>
  </Card>
  <Card className="bg-gray-200" style={{ backgroundColor: "#d8e2dc" }}>
    <label className="block text-sm font-medium text-black mb-4 mt-3 px-4">Average Price</label>
                <input
                type="text"
                className="mt-0 mb-2 ml-2 block w-4/5 xl:h-1/3 px-3 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600"
                value={averagePrice}
              />
  </Card>
  {/* <Card className="bg-gray-200">
    <label className="block text-sm font-medium text-black mb-4 mt-3 px-4">Highest Price</label>
                <input
                type="text"
                className="mt-0 mb-2 ml-2 block w-4/5 xl:h-1/3 px-3 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600"
                value={highestPrice}
              />
  </Card> */}
</div>

    <div className="mb-8 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
      {statisticsCardsData.map(({ icon, title, footer, from, to, product, based_on, showDatePickers, showCustomFields, showOrderStats, showProductStats, showMostPurchaseProductSupplier, backgroundColor, ...rest }) => (
        <StatisticsCard
          key={title}
          {...rest}
          from={from}
          to={to}
          product={product}
          backgroundColor={backgroundColor}
          showDatePickers={showDatePickers}
          based_on={based_on}
          icon={React.createElement(icon, { className: "w-6 h-6 text-white" })}
          showCustomFields={showCustomFields}
          showOrderStats={showOrderStats}
          showProductStats={showProductStats}
          showMostPurchaseProductSupplier={showMostPurchaseProductSupplier}
          tableData={filteredTableData}
          selectedOption={selectedOption}
          average_price={searchTerm ? averagePrice : ""}
          highest_price={searchTerm ? highestPrice : ""}
          highest_price_date={searchTerm ? highestPriceDate : ""}
          lowest_price={searchTerm ? lowestPrice : ""}
          lowest_price_date={searchTerm ? lowestPriceDate : ""}
          average_price_quantity={searchTerm ? averagePriceQTY : ""}
          total_no_of_orders={searchTerm ? totalNoOfOrders : ""}
          bestBuyProducts={bestBuyProducts}
          bestBuySupplierCode={bestBuySupplierCode}
        />
      ))}
    </div>


      <div className="mb-8 grid grid-cols-1 gap-y-8 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
        {statisticsChartsData.map((props) => (
          props.title !== "Average prices for the period" && (
            <StatisticsChart
              key={props.title}
              {...props}
              footer={<Typography variant="small" className="flex items-center font-normal text-blue-gray-600">&nbsp;{props.footer}</Typography>}
            />
          )
        ))}
      </div>
      <Card className="border border-blue-gray-100 shadow-sm">
        <CardHeader variant="gradient" color="white" floated={false} shadow={false}>
          <div className="flex justify-start space-x-2 mb-2">
            <Button
              className={`rounded-none ${selectedTimeFrame === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
              onClick={() => handleTimeFrameChange('year')}
            >
              Year
            </Button>
            <Button
              className={`rounded-none ${selectedTimeFrame === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
              onClick={() => handleTimeFrameChange('month')}
            >
              Month
            </Button>
            <Button
              className={`rounded-none ${selectedTimeFrame === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
              onClick={() => handleTimeFrameChange('week')}
            >
              Week
            </Button>
            <Button
              className={`rounded-none ${selectedTimeFrame === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
              onClick={() => handleTimeFrameChange('day')}
            >
              Day
            </Button>
          </div>
          <Chart {...priceHikeChartData} height={220} />
        </CardHeader>
        <CardBody className="px-6 pt-0">
          <Typography variant="h6" color="blue-gray">
          Average prices for the period
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
}

export default Home;
