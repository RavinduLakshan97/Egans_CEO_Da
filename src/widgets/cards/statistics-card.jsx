import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";

 

export function StatisticsCard({ color, icon, title, value, footer,from,to,product,based_on,average_price  ,showDatePickers = false, showProductSelector = false,showCustomFields = false,showOrderStats = false,showProductStats = false,backgroundColor,...rest }) {
  
  // const [searchProduct, setsearchProduct] = useState('');

  

  return (
    <Card className={`border border-blue-gray-100 shadow-sm ${backgroundColor}`}>
      {/* <CardHeader
        variant="gradient"
        color={color}
        floated={false}
        shadow={false}
        className="absolute grid h-12 w-12 place-items-center"
      >
        {icon}
      </CardHeader> */}
      <CardBody className="p-4 text-left">
        <Typography variant="small" className="font-normal text-blue-gray-600">
          {title}
        </Typography>
        
        
         {showDatePickers && (
          <div>
          
            <label className="block text-sm font-medium text-black mb-2 mt-1">
                From
            </label>
           
            <input type="date" className="mb-3 border-blue-gray-100 shadow-sm px-8 rounded-sm" />
            
            <label className="block text-sm font-medium text-black mb-2 mt-1">
                To
            </label>
            
            <input type="date" className="mb-3 border-blue-gray-100 shadow-sm px-8 rounded-sm" />
            
          </div>
        )}
        
        {showProductSelector && (
    <div>
          <label className="block text-sm font-medium text-black mb-2 mt-2">
                Product
              </label>
              <input
                type="text"
                className="mt-1 block xl:w-full xl:h-1/3  px-3 py-2  border border-gray-300 rounded-md shadow-sm text-gray-600"
                // value={searchProduct}
                // onChange={(e) => setsearchProduct(e.target.value)}
              />
              <label className="block text-sm font-medium text-black mb-2 mt-2">
                Based On
              </label>
      <div className="flex items-center space-x-6">  {/* Added flex container with space-x-4 for spacing */}
        <div>
          <input className="mr-1" type="radio" id="value" name="product" value="value" />
          <label htmlFor="value" className="text-black">Value</label>
        </div>
        <div>
          <input className="mr-1" type="radio" id="qty" name="product" value="qty" />
          <label htmlFor="qty" className="text-black">Quantity</label>
        </div>
        <div>
          <input className="mr-1" type="radio" id="count" name="product" value="count" />
          <label htmlFor="count" className="text-black">Count</label>
        </div>
      </div>
    </div>
  )}


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
  showProductSelector: PropTypes.bool,
};

StatisticsCard.displayName = "/src/widgets/cards/statistics-card.jsx";

export default StatisticsCard;
