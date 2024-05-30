import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
} from "@/data";
import axios from "axios";
import moment from "moment";

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
      //setCard4Content("");
      setTableData([
        { code: "P001", description: "Product 1" },
        { code: "P002", description: "Product 2" },
        { code: "P003", description: "Product 3" },
        { code: "P004", description: "Product 4" },
        { code: "P005", description: "Product 5" },
      ]);
    } else if (option === "allSuppliers") {
      setCard3Content("Content for Suppliers - Card 3");
      //setCard4Content("");
      setTableData([
        { code: "S001", description: "Supplier 1" },
        { code: "S002", description: "Supplier 2" },
        { code: "S003", description: "Supplier 3" },
        { code: "S004", description: "Supplier 4" },
        { code: "S005", description: "Supplier 5" },
      ]);
    }
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
            <select className="block w-2/3 px-3 py-1 border border-gray-300 rounded-md shadow-sm text-gray-600" value={viewCount} onChange={(e) => setViewCount(e.target.value)}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
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
          <StatisticsChart
            key={props.title}
            {...props}
            footer={<Typography variant="small" className="flex items-center font-normal text-blue-gray-600">&nbsp;{props.footer}</Typography>}
          />
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
          description="Shows the audit of product purchases"
        />
      )}
    </div>
  );
}

export default Home;
