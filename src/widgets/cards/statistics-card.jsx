import React from 'react';
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";

export function StatisticsCard({ color, icon, title, value, footer, from, to, product, based_on, average_price, showDatePickers = false, showCustomFields = false, showOrderStats = false, showProductStats = false, backgroundColor, showMostPurchaseProductSupplier = false, card3Content, card4Content, tableData, selectedOption, ...rest }) {
  return (
    <Card className={`border border-blue-gray-100 shadow-sm ${backgroundColor}`}>
      <CardBody className="p-4 text-left">
        <Typography variant="small" className="font-normal text-blue-gray-600">{title}</Typography>
        {showCustomFields && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black mb-1">Average Price</label>
              <input type="text" className="mt-1 block w-full xl:h-1/3 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black mb-1">Highest Price</label>
              <input type="text" className="mt-1 block w-full xl:h-1/3 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black mb-1">Lowest Price</label>
              <input type="text" className="mt-1 block w-full xl:h-1/3 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600" />
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
              <label className="block text-sm font-medium text-black mb-3">{selectedOption === "allSuppliers" ? "Most Frequent Purchased Suppliers" : "Most Frequently Purchased Product"}</label>
              <table className="min-w-full bg-white rounded-lg">
                <thead>
                  <tr>
                    <th className="py-2">{selectedOption === "allSuppliers" ? "Supplier Code" : "Product Code"}</th>
                    <th className="py-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{row.code}</td>
                      <td className="border px-4 py-2">{row.description}</td>
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
              <label className="block text-sm font-medium text-black mb-1">{selectedOption === "allSuppliers" ? "Most Purchased Suppliers" : "Most Purchased Product"}</label>
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
