import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";

export function StatisticsCard({
  color,
  icon,
  title,
  footer,
  showCustomFields = false,
  showOrderStats = false,
  showProductStats = false,
  showMostPurchaseProductSupplier = false,
  backgroundColor,
  card3Content,
  card4Content,
  tableData,
  selectedOption,
  average_price,
  highest_price,
  highest_price_date,
  lowest_price,
  lowest_price_date,
  average_price_quantity,
  ...rest
}) {
  return (
    <Card className={`border border-blue-gray-100 shadow-sm ${backgroundColor}`}>
      <CardBody className="p-4 text-left">
        <Typography variant="small" className="font-normal text-blue-gray-600">{title}</Typography>
        {showCustomFields && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black mb-1">Average Price</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600"
                value={average_price}
                readOnly
              />
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <label className="block text-sm font-medium text-black mb-1">Highest Price</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600"
                  value={highest_price}
                  readOnly
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="block text-sm font-medium text-black mb-1">Highest Price On Date</label>
                <span className="block text-sm text-gray-700 pt-3 ml-4">{highest_price_date}</span>
              </div>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <label className="block text-sm font-medium text-black mb-1">Lowest Price</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600"
                  value={lowest_price}
                  readOnly
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="block text-sm font-medium text-black mb-1">Lowest Price On Date</label>
                <span className="block text-sm text-gray-700 pt-3 ml-4">{lowest_price_date}</span>
              </div>
            </div>
          </div>
        )}
        {showOrderStats && (
          <div>
            <div className="mb-5">
              <label className="block text-sm font-medium text-black mb-1">Average Purchased Quantity</label>
              <input
                type="text"
                className="mt-1 block w-full xl:h-1/3 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600"
                value={average_price_quantity}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black mb-1">Total Number of Orders Raised</label>
              <input
                type="text"
                className="mt-1 block w-full xl:h-1/3 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600"
              />
            </div>
          </div>
        )}
        {showProductStats && (
          <div>
            <div className="mb-5">
              <label className="block text-sm font-medium text-black mb-2">
                {selectedOption === "allSuppliers" ? "Most Supplied Products" : "Most Supplied Suppliers"}
              </label>
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
              <label className="block text-sm font-medium text-black mb-2">
                {selectedOption === "allSuppliers" ? "Best Buy Product" : "Best Buy Suppliers"}
              </label>
              <input
                type="text"
                className="mt-1 block w-full xl:h-1/3 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600"
                value={card4Content}
                readOnly
              />
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
  average_price: PropTypes.string,
  highest_price: PropTypes.string,
  highest_price_date: PropTypes.string,
  lowest_price: PropTypes.string,
  lowest_price_date: PropTypes.string,
};

StatisticsCard.displayName = "/src/widgets/cards/statistics-card.jsx";

export default StatisticsCard;
