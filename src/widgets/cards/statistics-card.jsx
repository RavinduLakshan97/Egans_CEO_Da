import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";

export function StatisticsCard({
  color,
  icon,
  titles,
  footer,
  showCustomFields = false,
  showOrderStats = false,
  showProductStats = false,
  showMostPurchaseProductSupplier = false,
  backgroundColor,
  tableData,
  selectedOption,
  average_price,
  highest_price,
  highest_price_date,
  lowest_price,
  lowest_price_date,
  average_price_quantity,
  total_no_of_orders,
  bestBuyProducts,
  bestBuySupplierCode,
  chart,
  chart1,
  showChart,
  showTotalOrdersChart,
  span = 1, // New prop to determine the span of the card
  ...rest
}) {
  return (
    <Card className={`border border-blue-gray-100 shadow-sm ${backgroundColor} ${span === 2 ? "col-span-2" : ""}`}>
      <CardBody className="p-4 text-left">
       
      {showCustomFields && (
  <div>
    <div className="mb-4">
      <label className="block text-sm font-medium text-black mb-1 sm:mb-2 lg:mb-1">Average Price</label>
      <input
        type="text"
        className="mt-2 lg:mt-0 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600"
        value={average_price}
        readOnly
      />
    </div>
    <div className="mb-4 sm:grid sm:grid-cols-2 sm:gap-4 flex flex-col">
      <div className="flex flex-col space-y-2">
        <label className="block text-sm font-medium text-black mb-1 sm:mb-2 lg:mb-1">Highest Price</label>
        <input
          type="text"
          className="mt-2 lg:mt-0 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600"
          value={highest_price}
          readOnly
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="block text-sm font-medium text-black mb-1 sm:mb-2 lg:mb-1">Highest Price On Date</label>
        <span className="mt-2 lg:mt-0 block text-sm text-gray-700 ml-4">{highest_price_date}</span>
      </div>
    </div>
    <div className="mb-4 sm:grid sm:grid-cols-2 sm:gap-4 flex flex-col">
      <div className="flex flex-col space-y-2">
        <label className="block text-sm font-medium text-black mb-1 sm:mb-2 lg:mb-1">Lowest Price</label>
        <input
          type="text"
          className="mt-2 lg:mt-0 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600"
          value={lowest_price}
          readOnly
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="block text-sm font-medium text-black mb-1 sm:mb-2 lg:mb-1">Lowest Price On Date</label>
        <span className="mt-2 lg:mt-0 block text-sm text-gray-700 ml-4">{lowest_price_date}</span>
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
                value={total_no_of_orders}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black mb-2">
                {selectedOption === "allSuppliers" ? "Best Buy Product" : "Best Buy Supplier"}
              </label>
              <input
                type="text"
                className="mt-1 block w-full xl:h-1/3 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600"
                value={selectedOption === "allSuppliers" ? bestBuyProducts : bestBuySupplierCode}
                readOnly
              />
            </div>
          </div>
        )}
        {showChart && chart && (
          <div className="card-chart mt-4">
            <Chart {...chart} />
          </div>
        )}
        {showTotalOrdersChart && chart1 && (
          <div className="card-chart mt-4">
            <Chart {...chart1} />
          </div>
        )}
        {footer && (
          <div className="card-footer mt-2">
            <p className={`text-${footer.color}`}>{footer.value} {footer.label}</p>
          </div>
        )}
         <Typography variant="h6" color="blue-gray">{titles}</Typography>
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
  icon: PropTypes.node,
  titles: PropTypes.node.isRequired,
  value: PropTypes.node,
  footer: PropTypes.node,
  showDatePickers: PropTypes.bool,
  showCustomFields: PropTypes.bool,
  showOrderStats: PropTypes.bool,
  showProductStats: PropTypes.bool,
  showMostPurchaseProductSupplier: PropTypes.bool,
  tableData: PropTypes.array,
  selectedOption: PropTypes.string,
  average_price: PropTypes.string,
  highest_price: PropTypes.string,
  highest_price_date: PropTypes.string,
  lowest_price: PropTypes.string,
  lowest_price_date: PropTypes.string,
  chart: PropTypes.object,
  chart1: PropTypes.object,
  showChart: PropTypes.bool,
  showTotalOrdersChart: PropTypes.bool, // New prop for the new chart
  span: PropTypes.number, // Add this prop type
};

StatisticsCard.displayName = "/src/widgets/cards/statistics-card.jsx";

export default StatisticsCard;
