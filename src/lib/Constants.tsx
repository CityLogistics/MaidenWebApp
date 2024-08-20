export const routes = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  ORDERS: "/orders",
  NEW_ORDERS: "/orders/new",
  DRIVERS: "/drivers",
  NEW_DRIVERS: "/drivers/new",
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

export const limit = 3;
