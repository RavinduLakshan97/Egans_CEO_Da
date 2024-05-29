import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import axios from 'axios';
import { StatisticsChart } from "@/widgets/charts";
 

export function StatisticsCard({ color, icon, title, value, footer,from,to,product,based_on,average_price  ,showDatePickers = false, showCustomFields = false,showOrderStats = false,showProductStats = false,backgroundColor,showMostPurchaseProductSupplier=false,...rest }) {
  
  

  return (
    <Card className={`border border-blue-gray-100 shadow-sm ${backgroundColor}`}>
      <CardBody className="p-4 text-left">
        <Typography variant="small" className="font-normal text-blue-gray-600">
          {title}
        </Typography>
        
        
       
       


      {showCustomFields && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black mb-1">
                Average Price
              </label>
              <input
                type="text"
                className="mt-1  block w-full xl:h-1/3 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600"
                // disabled
                // value=""
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black mb-1">
                Highest Price
              </label>
              <input
                type="text"
                className="mt-1 block w-full xl:h-1/3 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600"
                // disabled
                // value=""
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black mb-1">
                Lowest Price
              </label>
              <input
                type="text"
                className="mt-1 block w-full xl:h-1/3 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600"
                // disabled
                // value=""
              />
            </div>
          </div>
        )}

      {showOrderStats && (
          <div>
            <div className="mb-5">
              <label className="block text-sm font-medium text-black mb-1">
                Average Purchased Quantity
              </label>
              <input
                type="text"
                className="mt-1 block w-full xl:h-1/3 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600"
                // disabled
                // value=""
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black mb-1">
                Total Number of Orders Raised
              </label>
              <input
                type="text"
                className="mt-1 block w-full xl:h-1/3 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600"
                // disabled
                // value=""
              />
            </div>
          </div>
        )}

        
          



      {showProductStats && (
          <div>
            <div className="mb-5">
              <label className="block text-sm font-medium text-black mb-1">
                Most Frequently Purchased Product
              </label>
              <input
                type="text"
                className="mt-1 block w-full xl:h-1/3 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600"
                // disabled
                // value=""
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black mb-1">
                Best Buy Products
              </label>
              <input
                type="text"
                className="mt-1 block w-full xl:h-1/3 px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-600"
                // disabled
                // value=""
              />
            </div>
          </div>
        )}

        {showMostPurchaseProductSupplier && (
          <div>
            <div className='mb-5'>
            <label className="block text-sm font-medium text-black mb-1">
                Most Purchased Product
              </label>
            </div>
          </div>
        )}

      {/* {chartData && (
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
        )} */}
  
      </CardBody>
     
    </Card>
  );
}

StatisticsCard.defaultProps = {
  color: "blue",
  footer: null,
};

StatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  footer: PropTypes.node,
  showDatePickers: PropTypes.bool,
  // showProductSelector: PropTypes.bool,
};

StatisticsCard.displayName = "/src/widgets/cards/statistics-card.jsx";

export default StatisticsCard;
