import React, { useState, useEffect } from "react";
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
} from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import { statisticsCardsData } from "@/data";
import axios from "axios";
import moment from "moment";
import Chart from "react-apexcharts";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const chartsConfig = {
  // Add your chartsConfig settings here
};

const websiteViewsChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Purchases",
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
      name: "Purchases",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
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
  type: "donut",
  height: 220,
  series: data.series,
  options: {
    ...chartsConfig,
    colors: ["#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#FFCD56", "#C9CBCF", "#36A2EB"],
    labels: data.labels,
  },
});

const statisticsChartsData = [
  {
    color: "white",
    title: "Best Buy Supplier",
    description: "",
    footer: "",
    chart: websiteViewsChart,
  },
  {
    color: "white",
    title: "Average prices for the period",
    description: "",
    footer: "updated 4 min ago",
    chart: dailySalesChart,
  },
  {
    color: "white",
    title: "Product Purchase Audit",
    description: "",
    footer: "just updated",
    chart: completedTasksChart({ series: [30, 26, 25], labels: ["CENCOBV0", "STACAMV0", "RICKEIV0"] }),
  },
];

export function Home() {
  const currentFromDate = moment().startOf('day').format('YYYY-MM-DD');
  const currentToDate = moment().endOf('day').format('YYYY-MM-DD');

  const [selectedOption, setSelectedOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState(currentFromDate);
  const [toDate, setToDate] = useState(currentToDate);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [basedOn, setBasedOn] = useState('value');
  const [viewCount, setViewCount] = useState(3);
  const [chartData, setChartData] = useState(null);

  const [card3Content, setCard3Content] = useState("");
  const [card4Content, setCard4Content] = useState("");
  const [tableData, setTableData] = useState([]);
  const [filteredTableData, setFilteredTableData] = useState([]);

  const [selectedTimeFrame, setSelectedTimeFrame] = useState('year');
  const [priceHikeChartData, setPriceHikeChartData] = useState(statisticsChartsData[1].chart);

  useEffect(() => {
    fetchProducts(selectedOption);
    updateCardContents(selectedOption);
  }, [selectedOption]);

  useEffect(() => {
    filterTableData();
  }, [tableData, viewCount]);

  useEffect(() => {
    if (fromDate && toDate && products && basedOn && viewCount) {
      fetchData();
    }
  }, [fromDate, toDate, products, basedOn, viewCount]);

  useEffect(() => {
    updatePriceHikeChart(selectedTimeFrame);
  }, [selectedTimeFrame]);

  const fetchProducts = async (option) => {
    try {
      const url = `{API_URL}api/products?type=${option}`;
      const response = await axios.get(url);
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = products.filter(product => product.name.toLowerCase().includes(term.toLowerCase()));
    setFilteredProducts(filtered);
  };

  const fetchData = async () => {
    const isBasedOnInvoiceCount = basedOn === 'count';
    const isBasedOnValue = basedOn === 'value';
    const isBasedOnQty = basedOn === 'qty';

    const url = `{API_URL}api/bestsupplier/getbestsupplier?from=${fromDate}&to=${toDate}&productCode=${products}&isBasedOnInvoiceCount=${isBasedOnInvoiceCount}&isBasedOnValue=${isBasedOnValue}&isBasedOnQty=${isBasedOnQty}&viewCount=${viewCount}`;

    try {
      const response = await axios.get(url);
      const data = response.data.dashboardModels;
      const labels = data.map(item => item.supplierCode);
      const values = data.map(item => {
        if (basedOn === 'value') return item.totalAmount;
        if (basedOn === 'qty') return item.totalQuantity;
        if (basedOn === 'count') return item.invoiceCount;
        return 0;
      });

      setChartData({
        series: values,
        options: {
          labels: labels,
          colors: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
        },
      });
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
    if (option === "allProducts") {
      setCard3Content("Content for Products - Card 3");
      setTableData([
        { code: "P001", description: "Product 1" },
        { code: "P002", description: "Product 2" },
        { code: "P003", description: "Product 3" },
        { code: "P004", description: "Product 4" },
        { code: "P005", description: "Product 5" },
      ]);
    } else if (option === "allSuppliers") {
      setCard3Content("Content for Suppliers - Card 3");
      setTableData([
        { code: "S001", description: "Supplier 1" },
        { code: "S002", description: "Supplier 2" },
        { code: "S003", description: "Supplier 3" },
        { code: "S004", description: "Supplier 4" },
        { code: "S005", description: "Supplier 5" },
      ]);
    }
  };

  const generatePriceHikeData = (timeFrame) => {
    const now = moment();
    let categories = [];
    let seriesData = [
      { name: "Product A", data: [] },
      { name: "Product B", data: [] },
      { name: "Product C", data: [] },
    ];
    let tooltipLabels = [];

    switch (timeFrame) {
      case 'year':
        for (let i = 0; i < 5; i++) {
          categories.push(now.clone().subtract(i, 'years').format('YYYY'));
          seriesData[0].data.push(Math.floor(Math.random() * 500) + 100);
          seriesData[1].data.push(Math.floor(Math.random() * 500) + 100);
          seriesData[2].data.push(Math.floor(Math.random() * 500) + 100);
          tooltipLabels.push(now.clone().subtract(i, 'years').format('YYYY'));
        }
        categories.reverse();
        seriesData.forEach(series => series.data.reverse());
        tooltipLabels.reverse();
        break;

      case 'month':
        const currentMonth = now.month(); // 0-11
        for (let i = currentMonth; i >= 0; i--) {
          categories.push(now.month(i).format('MMM'));
          seriesData[0].data.push(Math.floor(Math.random() * 500) + 100);
          seriesData[1].data.push(Math.floor(Math.random() * 500) + 100);
          seriesData[2].data.push(Math.floor(Math.random() * 500) + 100);
          tooltipLabels.push(now.month(i).format('MMM'));
        }
        categories.reverse();
        seriesData.forEach(series => series.data.reverse());
        tooltipLabels.reverse();
        break;

      case 'week':
        const currentWeek = now.isoWeek();
        for (let i = 0; i < currentWeek; i++) {
          categories.push(`Week ${now.clone().subtract(i, 'weeks').isoWeek()}`);
          seriesData[0].data.push(Math.floor(Math.random() * 500) + 100);
          seriesData[1].data.push(Math.floor(Math.random() * 500) + 100);
          seriesData[2].data.push(Math.floor(Math.random() * 500) + 100);
          tooltipLabels.push(now.clone().subtract(i, 'weeks').format('MMM'));
        }
        categories.reverse();
        seriesData.forEach(series => series.data.reverse());
        tooltipLabels.reverse();
        break;

      case 'day':
        for (let i = 0; i < 7; i++) {
          categories.push(now.clone().subtract(i, 'days').format('ddd'));
          seriesData[0].data.push(Math.floor(Math.random() * 500) + 100);
          seriesData[1].data.push(Math.floor(Math.random() * 500) + 100);
          seriesData[2].data.push(Math.floor(Math.random() * 500) + 100);
          tooltipLabels.push(now.clone().subtract(i, 'days').format('dddd'));
        }
        categories.reverse();
        seriesData.forEach(series => series.data.reverse());
        tooltipLabels.reverse();
        break;

      default:
        break;
    }

    return { categories, seriesData, tooltipLabels };
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
    const { categories, seriesData } = generatePriceHikeData(timeFrame);

    const newChartData = {
      series: seriesData,
      options: {
        ...priceHikeChartData.options,
        colors: ["#FFCE56", "#4BC0C0", "#9966FF"], 
        xaxis: {
          categories: categories,
        },
        tooltip: {
          custom: ({ seriesIndex, dataPointIndex, w }) => {
            return getHoverContent(seriesIndex, dataPointIndex, w.globals.series);
          }
        }
      },
    };

    setPriceHikeChartData(newChartData);
  };

  const handleTimeFrameChange = (timeFrame) => {
    setSelectedTimeFrame(timeFrame);
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
        <Card className="grid xl:grid-cols-2 border border-blue-gray-100 shadow-sm bg-gray-200" style={{ backgroundColor: '#F28482' }}>
          <div className="px-1 mt-3 grid grid-cols-1">      
            <label className="block text-sm font-medium text-black mb-0 mt-1 px-1"> From </label> 
            <input type="date" className="mb-14 width-full border-blue-gray-100 shadow-sm px-4 rounded-md" value={fromDate} onChange={(e) => setFromDate(e.target.value)}/>     
          </div>
          <div className="px-1 mt-3 grid grid-cols-1">      
            <label className="block text-sm font-medium text-black mb-0 mt-1 px-1"> To </label>
            <input type="date" className="mb-14 width-full border-blue-gray-100 shadow-sm px-4 rounded-md" value={toDate} onChange={(e) => setToDate(e.target.value)}/>     
          </div>
        </Card>
        <Card className="bg-gray-200" style={{ backgroundColor: '#C8B6FF' }}>
          <label className="block text-sm font-medium text-black mb-2 mt-3 px-4"> All Product/Supplier </label>
          <select className="block w-2/3 px-3 py-1 border border-gray-300 rounded-md shadow-sm text-gray-600 ml-3" value={selectedOption} onChange={handleOptionChange}>
            <option value="allProducts">All Products</option>
            <option value="allSuppliers">All Suppliers</option>
          </select>
        </Card>
        <Card className="bg-gray-200" style={{ backgroundColor: '#FFF3B0' }}>
          <div className="mr-auto md:mr-4 md:w-56 mt-3 ml-2">
            <label className="block text-sm font-medium text-black mb-2 mt-0 px-1">Search by Product Code</label>
            <Menu open={!!searchTerm} handler={setSearchTerm}>
              <MenuHandler>
                <Input
                  className="mb-3 bg-white border-blue-gray-100 shadow-sm px-4 rounded-lg"
                  label="Search Product Code"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </MenuHandler>
              <MenuList>
                {filteredProducts.map((product, index) => (
                  <MenuItem key={index}>{product.name}</MenuItem>
                ))}
              </MenuList>
            </Menu>
          </div>
        </Card>
        <Card className="bg-gray-200" style={{ backgroundColor: '#CAF0F8' }}>
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
      {chartData && (
        <StatisticsChart
          chart={{
            type: 'pie',
            height: 220,
            series: chartData.series,
            options: chartData.options,
          }}
          title="Product Purchase Audit"
          description=""
        />
      )}
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
