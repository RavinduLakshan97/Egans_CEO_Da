import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [

  {
    color: "gray",
    icon: UsersIcon,
    backgroundColor: "bg-custom-yellow",
    title: "Average price",
    average_price: "Average price",
    value: "2,300",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
    },
    showCustomFields: true,
  },
  {
    color: "gray",
    icon: UserPlusIcon,
    backgroundColor: "bg-custom-green",
    title: "New Clients",
    value: "3,462",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
    showOrderStats: true,
  },

  {
    color: "gray",
    icon: ChartBarIcon,
    backgroundColor: "bg-custom-red",
    title: "Sales",
    value: "$103,430",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than yesterday",
    },
    showProductStats: true,
  },
  {
    showMostPurchaseProductSupplier: true,
    backgroundColor: "bg-custom-red",
  }
  
];

export default statisticsCardsData;
