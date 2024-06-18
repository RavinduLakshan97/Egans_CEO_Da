import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Switch
} from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import { statisticsCardsData } from "@/data";
import axios from "axios";
import moment from "moment";
import Chart from "react-apexcharts";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { chartsConfig } from "@/configs";

export function Home() {

  const [toggle, setToggle] = useState();

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

// const productPurchaseAuditChart = (data) => ({
//   type: "donut",
//   height: 220,
//   series: data.series,
//   options: {
//     ...chartsConfig,
//     colors: ["#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#FFCD56", "#C9CBCF", "#36A2EB"],
//     labels: data.labels,
//   },
// });

const productPurchaseAuditChart = {
  type: "donut",
  height: 220,
  series: [],
  options: {
    ...chartsConfig,
    colors: ["#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#FFCD56", "#C9CBCF", "#36A2EB"],
    labels: [],
  },
};

  const [statisticsChartsData, setStatisticsChartsData] = useState([
    // {
    //   color: "white",
    //   title: (
    //     <div className="flex justify-between items-center w-full">
    //       <Typography variant="h6" color="blue-gray">
    //         Best Buy Supplier
    //       </Typography>
    //       <Switch
    //         color="blue"
    //         checked={toggle}
    //         onChange={() => setToggle(!toggle)}
    //       />
    //     </div>
    //   ),
    //   description: "",
    //   chart: bestBuySupplierChartTemplate,
    // },
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
      //chart: productPurchaseAuditChart({ series: [30, 26, 25], labels: ["CENCOBV0", "STACAMV0", "RICKEIV0"] }),
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
  //const [chartData, setChartData] = useState(bestBuySupplierChartTemplate);
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

  const [card3Content, setCard3Content] = useState("");
  const [card4Content, setCard4Content] = useState("");
  const [tableData, setTableData] = useState([]);
  const [filteredTableData, setFilteredTableData] = useState([]);

  const [selectedTimeFrame, setSelectedTimeFrame] = useState('year');
  const [priceHikeChartData, setPriceHikeChartData] = useState(statisticsChartsData[1].chart);
  const [productPurchaseAuditChartState, setProductPurchaseAuditChartState] = useState(productPurchaseAuditChart);


  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (fromDate && toDate && searchTerm && basedOn && viewCount) {
      fetchData();
      //fetchChartData();
    }
  }, [fromDate, toDate, searchTerm, basedOn, viewCount]);

  useEffect(() => {
    fetchChartData();
  }, []);

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
  

  const fetchProducts = async () => {
    try {
      const url = `https://testportalapi.egansgroup.com.au/api/bestsupplier/getallproducts`;
      const response = await axios.get(url);
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
  
      const response = await axios.get(`https://testportalapi.egansgroup.com.au/api/bestsupplier/getbestsupplier?from=${fromDate}&to=${toDate}&productCode=${searchTerm ? searchTerm.value : ''}&isBasedOnInvoiceCount=${isBasedOnInvoiceCount}&isBasedOnValue=${isBasedOnValue}&isBasedOnQty=${isBasedOnQty}&viewCount=${viewCount}`);
      
      const dashboardModels = response.data.dashboardModels;
  
      let yAxisData;
      let yAxisLabel;
  
      if (isBasedOnInvoiceCount) {
        yAxisData = dashboardModels.map(item => item.invoiceCount);
        yAxisLabel = "Invoice Count";
      } else if (isBasedOnValue) {
        yAxisData = dashboardModels.map(item => item.totalAmount);
        yAxisLabel = "Total Amount";
      } else if (isBasedOnQty) {
        yAxisData = dashboardModels.map(item => item.totalQuantity);
        yAxisLabel = "Total Quantity";
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
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };
  
  
  
  
  //pie chart api fetching function

  const fetchProductPurchaseAuditData = async () => {
    try {
      const response = await axios.get(`https://testportalapi.egansgroup.com.au/api/bestsupplier/getmaximumordersforproducts?from=${fromDate}&to=${toDate}&viewCount=${viewCount}`);
  
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
  
  
  

  const fetchData = async () => {
    const isBasedOnInvoiceCount = basedOn === 'count';
    const isBasedOnValue = basedOn === 'value';
    const isBasedOnQty = basedOn === 'qty';
  
    const bestSupplierUrl = `https://testportalapi.egansgroup.com.au/api/bestsupplier/getbestsupplier?from=${fromDate}&to=${toDate}&productCode=${searchTerm.value}&isBasedOnInvoiceCount=${isBasedOnInvoiceCount}&isBasedOnValue=${isBasedOnValue}&isBasedOnQty=${isBasedOnQty}&viewCount=${viewCount}`;
    const analyticsPriceUrl = `https://testportalapi.egansgroup.com.au/api/bestsupplier/getanalyticspriceforproduct?from=${fromDate}&to=${toDate}&productCode=${searchTerm.value}&viewCount=${viewCount}`;
    const avgPurchaseQtyUrl = `https://testportalapi.egansgroup.com.au/api/bestsupplier/getaveragepurchasequantity?from=${fromDate}&to=${toDate}&productCode=${searchTerm.value}`;
    const totalOrdersUrl = `https://testportalapi.egansgroup.com.au/api/bestsupplier/gettotalnooforders?from=${fromDate}&to=${toDate}&productCode=${searchTerm.value}`;
    const mostSuppliedSuppliersUrl = `https://testportalapi.egansgroup.com.au/api/bestsupplier/getproductmostsuppliedsupplier?from=${fromDate}&to=${toDate}&productCode=${searchTerm.value}&viewCount=${viewCount}`;
    const bestBuyProductsUrl = `https://testportalapi.egansgroup.com.au/api/bestsupplier/getbestbuyproducts?from=${fromDate}&to=${toDate}&viewCount=5`;
    
  try {
    const [
      bestSupplierResponse,
      analyticsPriceResponse,
      avgPurchaseQtyResponse,
      totalOrdersResponse,
      mostSuppliedSuppliersResponse,
      bestBuyProductsResponse
    ] = await Promise.all([
      axios.get(bestSupplierUrl),
      axios.get(analyticsPriceUrl),
      axios.get(avgPurchaseQtyUrl),
      axios.get(totalOrdersUrl),
      axios.get(mostSuppliedSuppliersUrl),
      axios.get(bestBuyProductsUrl)
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

      // Handle most supplied suppliers data
      const mostSuppliedSuppliersData = mostSuppliedSuppliersResponse.data.mostSuppliedSupplierss.map((supplier) => ({
        code: supplier.supplierCode,
        description: supplier.totalSupplied
      }));
      setTableData(mostSuppliedSuppliersData);

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
      const url = `https://testportalapi.egansgroup.com.au/api/bestsupplier/getproductaveragepriceforaperiod?productCode=${searchTerm.value}&type=${selectedTimeFrame}&value=2023-05-20`;
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


  const getHoverContent = (seriesIndex, dataPointIndex, series) => {
    const month = moment().isoWeek(dataPointIndex + 1).format('MMM');
    const day = moment().isoWeek(dataPointIndex + 1).day(dataPointIndex).format('dddd');
    const year = moment().subtract(dataPointIndex, 'years').format('YYYY');
    
    let content = '';
    if (selectedTimeFrame === 'day') {
      content = `<div class="arrow_box">
          <span>${day}</span>
          <br/>
          <label>Purchases: </label>
          <span>${series[seriesIndex][dataPointIndex]}</span>
        </div>`;
    } else if (selectedTimeFrame === 'week' || selectedTimeFrame === 'month') {
      content = `<div class="arrow_box">
          <span>${month}</span>
          <br/>
          <label>Purchases: </label>
          <span>${series[seriesIndex][dataPointIndex]}</span>
        </div>`;
    } else if (selectedTimeFrame === 'year') {
      content = `<div class="arrow_box">
          <span>${year}</span>
          <br/>
          <label>Purchases: </label>
          <span>${series[seriesIndex][dataPointIndex]}</span>
        </div>`;
    }
    return content;
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
    <div className="mt-3">
      <div className="mb-7 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {/* <Card className="grid xl:grid-cols-2 border border-blue-gray-100 shadow-sm bg-gray-200" style={{ backgroundColor: '#F28482' }}> */}
        <Card className="grid xl:grid-cols-2 border border-blue-gray-100 shadow-sm bg-gray-200">
          <div className="px-1 mt-3 grid grid-cols-1">      
            <label className="block text-sm font-medium text-black mb-0 mt-1 px-1"> From </label> 
            <input type="date" className="mb-14 width-full border-blue-gray-100 shadow-sm px-4 rounded-md" value={fromDate} onChange={(e) => setFromDate(e.target.value)}/>     
          </div>
          <div className="px-1 mt-3 grid grid-cols-1">      
            <label className="block text-sm font-medium text-black mb-0 mt-1 px-1"> To </label>
            <input type="date" className="mb-14 width-full border-blue-gray-100 shadow-sm px-4 rounded-md" value={toDate} onChange={(e) => setToDate(e.target.value)}/>     
          </div>
        </Card>
        {/* <Card className="bg-gray-200" style={{ backgroundColor: '#C8B6FF' }}> */}
        <Card className="bg-gray-200">
          <label className="block text-sm font-medium text-black mb-2 mt-3 px-4"> All Product/Supplier </label>
          <select className="block w-2/3 px-3 py-1 border border-gray-300 rounded-md shadow-sm text-gray-600 ml-3" value={selectedOption} onChange={handleOptionChange}>
            <option value="allProducts">All Products</option>
            <option value="allSuppliers">All Suppliers</option>
          </select>
        </Card>
        {/* <Card className="bg-gray-200" style={{ backgroundColor: '#FFF3B0' }}> */}
        <Card className="bg-gray-200">
          <div className="mr-auto md:mr-4 md:w-56 mt-3 ml-2">
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
        {/* <Card className="bg-gray-200" style={{ backgroundColor: '#CAF0F8' }}> */}
        <Card className="bg-gray-200" >
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
              // marks={{
              //   1: '1',
              //   2: '2',
              //   3: '3',
              //   4: '4',
              //   5: '5',
              // }}
              trackStyle={customSliderStyles.trackStyle}
              handleStyle={customSliderStyles.handleStyle}
              railStyle={customSliderStyles.railStyle}
            />
          </div>
          <label className="block text-sm font-medium text-black mb-2 mt-2 ml-2">Based On</label>
          <div className="flex items-center space-x-6 ml-2 mb-2">
            <div>
              <input className="mr-1" type="radio" id="value" name="basedOn" value="value" checked={basedOn === 'value'} onChange={(e) => setBasedOn(e.target.value)} />
              <label htmlFor="value" className="text-black">Value</label>
            </div>
            <div>
              <input className="mr-1" type="radio" id="qty" name="basedOn" value="qty" checked={basedOn === 'qty'} onChange={(e) => setBasedOn(e.target.value)} />
              <label htmlFor="qty" className="text-black">Quantity</label>
            </div>
            <div>
              <input className="mr-1" type="radio" id="count" name="basedOn" value="count" checked={basedOn === 'count'} onChange={(e) => setBasedOn(e.target.value)} />
              <label htmlFor="count" className="text-black">Count</label>
            </div>
          </div>
        </Card>
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
      card3Content={card3Content}
      card4Content={card4Content}
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
    />
  ))}
</div>

      <div className="mb-3 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
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
