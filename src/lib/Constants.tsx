export const routes = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  ORDERS: "/orders",
  NEW_ORDERS: "/orders/new",
  DRIVERS: "/drivers",
  NEW_DRIVERS: "/new-drivers",
  SETTINGS: "/settings",
  PASSWORD: "/settings/password",
  TRANSACTIONS: "/transactions",

  ADD_USER: "/users/add-user",
  USERS: "/users",

  CITIES: "/cities",
  ADD_CITY: "/cities/add-city",
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

export const transactionStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Successfull", value: "SUCCESSFULL" },
  { label: "Failed", value: "FAILED" },
];

export const transactionTypes = [
  { label: "Order", value: "ORDER" },
  { label: "Refund", value: "REFUND" },
];

export const days = [
  { label: "Sunday", value: "SUNDAY" },
  { label: "Monday", value: "MONDAY" },
  { label: "Tuesday", value: "TUESDAY" },
  { label: "Wednesday", value: "WEDNESDAY" },
  { label: "Thursday", value: "THURSDAY" },
  { label: "Friday", value: "FRIDAY" },
  { label: "Saturday", value: "SATURDAY" },
];

export const carTypes = [
  { label: "Sedan/Salon", value: "SALON" },
  { label: "5-seater SUV", value: "FIVE_SEATER_SUV" },
  { label: "7-seater SUV", value: "SEVEN_SEATER_SUV" },
  { label: "Van", value: "VAN" },
  { label: "Truck", value: "TRUCK" },
];

export const availabiltys = [
  { label: "Mornings (between 8AM and 12NOON)", value: "MORNING" },
  { label: "Afternoons (between 12NOON and 4PM)", value: "AFTERNOON" },
  { label: "Evenings (between 4PM and 8PM)", value: "EVENING" },
  { label: "Night time (between 8PM and 11:59PM)", value: "NIGHT" },
];

export const limit = 6;

export enum DriverStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
}

export enum GENDER {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum ROLE {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
}

export const regions = [
  {
    label: "Alberta",
    value: "ALBERTA",
  },
  {
    label: "British Columbia",
    value: "BRITISH_COLUMBIA",
  },
  {
    label: "Manitoba",
    value: "MANITOBA",
  },
  {
    label: "Newfound and Labrador",
    value: "NEWFOUNDLAND_AND_LABRADOR",
  },
  {
    label: "new Brunswick",
    value: "NEW_BRUNSWICK",
  },
  {
    label: "Northwest Territories",
    value: "NORTHWEST_TERRITORIES",
  },

  {
    label: "Nova Scotia",
    value: "NOVA_SCOTIA",
  },

  {
    label: "Nunavut",
    value: "NUNAVUT",
  },
  {
    label: "Ontario",
    value: "ONTARIO",
  },
  {
    label: "Prince Edward Island",
    value: "PRINCE_EDWARD_ISLAND",
  },
  {
    label: "Qubec",
    value: "QUEBEC",
  },
  {
    label: "Saskatchewan",
    value: "SASKATCHEWAN",
  },
  {
    label: "Yukon",
    value: "YUKON",
  },
];

const { ORDERS, NEW_ORDERS, SETTINGS, DRIVERS, PASSWORD } = routes;
export const allowedPaths = {
  ADMIN: [ORDERS, NEW_ORDERS, SETTINGS, DRIVERS, PASSWORD],
  DRIVER: [ORDERS, SETTINGS, PASSWORD],
};
