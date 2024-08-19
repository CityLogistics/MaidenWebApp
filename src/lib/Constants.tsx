export const routes = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  ORDERS: "/orders",
  NEW_ORDERS: "/orders/new",
  DRIVERS: "/drivers",
  NEW_DRIVERS: "/new-drivers",
};

export const orderTpes = [
  { label: "Health & Medicine", value: "HEALTH_AND_MEDICINE" },
  { label: "Book & Stationary", value: "BOOK_AND_STATIONARY" },
  { label: "Services & Industry", value: "SERVICES_AND_INDUSTRY" },
  { label: "Fashion & Beauty", value: "FASHION_AND_BEAUTY" },
  { label: "Home & Living", value: "HOME_AND_LIVING" },
  { label: "Electronics", value: "ELECTRONICS" },
  { label: "Mobile & Phone", value: "MOBILE_AND_PHONE" },
  { label: "Accessories", value: "ACCESSORIES" },
];

export const orderStatus = [
  { label: "Completed", value: "COMPLETED" },
  { label: "Processing", value: "PROCESSING" },
  { label: "Rejected", value: "REJECTED" },
  { label: "On Hold", value: "ON_HOLD" },
  { label: "In Transit", value: "IN_TRANSIT" },
];

export const limit = 2;
