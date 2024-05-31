import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";

export function StatisticsCard({ color, icon, title, value, footer, from, to, product, based_on, average_price, showDatePickers = false, showCustomFields = false, showOrderStats = false, showProductStats = false, backgroundColor, showMostPurchaseProductSupplier = false, card3Content, card4Content, tableData, selectedOption, ...rest }) {
  const [highestPriceDate, setHighestPriceDate] = useState("2024/05/31");
  const [lowestPriceDate, setLowestPriceDate] = useState("2024/05/31");
  
  useEffect(() => {
    // Fetch dates from API and set the state
    const fetchDates = async () => {
      try {
        const response = await axios.get('API_URL'); // Replace 'API_URL' with your actual API endpoint
        setHighestPriceDate(response.data.highestPriceDate);
        setLowestPriceDate(response.data.lowestPriceDate);
      } catch (error) {
        console.error('Error fetching dates:', error);
      }
    };

    fetchDates();
  }, []);

  return (
    <Card className={`border border-blue-gray-100 shadow-sm ${backgroundColor}`}>
      <CardBody className="p-4 text-left">
        <Typography variant="small" className="font-normal text-blue-gray-600">{title}</Typography>
        {showCustomFields && (
          <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-black mb-1">Average Price</label>
            <input type="text" className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600" />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <label className="block text-sm font-medium text-black mb-1">Highest Price</label>
              <input type="text" className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600" />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="block text-sm font-medium text-black mb-1">Highest Price On Date</label>
              <span className="block text-sm text-gray-700 pt-3 ml-4">{highestPriceDate}</span>
            </div>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <label className="block text-sm font-medium text-black mb-1">Lowest Price</label>
              <input type="text" className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600" />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="block text-sm font-medium text-black mb-1">Lowest Price On Date</label>
              <span className="block text-sm text-gray-700 pt-3 ml-4">{lowestPriceDate}</span>
            </div>
          </div>
        </div>
        )}
        {showOrderStats && (
          <div>
            <div className="mb-5">
              <label className="block text-sm font-medium text-black mb-1">Average Purchased Quantity</label>
              <input type="text" className="mt-1 block w-full xl:h-1/3 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black mb-1">Total Number of Orders Raised</label>
              <input type="text" className="mt-1 block w-full xl:h-1/3 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600" />
            </div>
          </div>
        )}
        {showProductStats && (
          <div>
            <div className="mb-5">
              <label className="block text-sm font-medium text-black mb-2">{selectedOption === "allSuppliers" ? "Most Supplied Products" : "Most Supplied Suppliers"}</label>
              <table className="min-w-full bg-white rounded-lg">
                <thead>
                  <tr>
                    <th className="py-1 text-xs">{selectedOption === "allSuppliers" ? "Product Code" : "Supplier Code"}</th>
                    <th className="py-1 text-xs">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td className="border px-2 py-1 text-xs">{row.code}</td>
                      <td className="border px-2 py-1 text-xs">{row.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
          </div>
        )}
        {showMostPurchaseProductSupplier && (
          <div>
            <div className='mb-5'>
              <label className="block text-sm font-medium text-black mb-2">{selectedOption === "allSuppliers" ? "Best Buy Product" : "Best Buy Suppliers"}</label>
              <input type="text" className="mt-1 block w-full xl:h-1/3 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600" value={card4Content} readOnly />
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
}

StatisticsCard.defaultProps = {
  color: "blue",
  footer: null,
};

StatisticsCard.propTypes = {
  color: PropTypes.oneOf(["white", "blue-gray", "gray", "brown", "deep-orange", "orange", "amber", "yellow", "lime", "light-green", "green", "teal", "cyan", "light-blue", "blue", "indigo", "deep-purple", "purple", "pink", "red"]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  footer: PropTypes.node,
  showDatePickers: PropTypes.bool,
  showCustomFields: PropTypes.bool,
  showOrderStats: PropTypes.bool,
  showProductStats: PropTypes.bool,
  showMostPurchaseProductSupplier: PropTypes.bool,
  card3Content: PropTypes.string,
  card4Content: PropTypes.string,
  tableData: PropTypes.array,
  selectedOption: PropTypes.string,
};

StatisticsCard.displayName = "/src/widgets/cards/statistics-card.jsx";

export default StatisticsCard;
