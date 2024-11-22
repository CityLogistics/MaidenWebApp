export const routes = {
  HOME: "/",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  RESET_PASSWORD_LINK_SENT: "/reset-password-link-set",
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

  MANUAL_ORDERS: "/manual-orders",
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

const { ORDERS, NEW_ORDERS, SETTINGS, DRIVERS, PASSWORD, MANUAL_ORDERS } =
  routes;
export const allowedPaths = {
  ADMIN: [ORDERS, NEW_ORDERS, SETTINGS, DRIVERS, PASSWORD, MANUAL_ORDERS],
  DRIVER: [ORDERS, SETTINGS, PASSWORD],
};

export const allProvinceCities = {
  NOVA_SCOTIA: [
    "New Glasgow",
    "Chester",
    "Lunenburg",
    "Wolfville",
    "Truro",
    "Oxford",
    "Yarmouth",
    "Sydney",
    "Liverpool",
    "Kentville",
    "Bridgewater",
    "Antigonish",
    "Digby",
    "Shelburne",
    "Bridgetown",
    "Amherst",
    "Mahone Bay",
    "Annapolis Royal",
    "Cornwallis Square",
    "Coffinscroft",
    "Middleton",
    "Pictou",
    "Hantsport",
    "Scotsville",
    "Stewiacke",
    "Trenton",
  ],
  NORTHWEST_TERRITORIES: [
    "Yellowknife",
    "Aklavik",
    "Hay River",
    "Norman Wells",
    "Fort Smith",
    "Tuktoyaktuk",
    "Inuvik",
    "Fort Simpson",
    "Ulukhaktok",
    "Enterprise",
    "Tsiigehtchic",
    "Délı̨nę",
    "Fort Good Hope",
    "Fort McPherson",
    "Fort Liard",
    "Tulita",
    "Whati",
    "Lutselk'e",
    "Kakisa",
    "Dettah",
  ],
  YUKON: [
    "Dawson City",
    "Whitehorse",
    "Carmacks",
    "Watson Lake",
    "Teslin",
    "Faro",
    "Yukon",
    "Mayo",
    "Keno City",
    "Haines Junction",
    "Ibex Valley",
    "Canyon City",
    "Swift River",
    "Tagish",
    "Forty Mile",
    "Grand Forks",
    "Lansdowne",
    "Ross River",
    "Silver City",
    "West Dawson",
    "Conrad",
    "Paris",
  ],
  NUNAVUT: [
    "Iqaluit",
    "Taloyoak",
    "Gjoa Haven",
    "Baker Lake",
    "Rankin Inlet",
    "Pangnirtung",
    "Arviat",
    "Cambridge Bay",
    "Naujaat",
    "Coral Harbour",
    "Clyde River",
    "Chesterfield Inlet",
    "Whale Cove",
    "Kugluktuk",
    "Igloolik",
    "Pond Inlet",
    "Arctic Bay",
    "Sanirajak",
    "Kugaaruk",
    "Kinngait",
    "Alert",
    "Qikiqtarjuaq",
    "Sanikiluaq",
    "Eureka",
  ],
  QUEBEC: [
    "Québec City",
    "Saguenay",
    "Roberval",
    "Saint-Félicien",
    "Desbiens",
    "Normandin",
    "Montreal",
    "La Prairie",
    "Gatineau",
    "Pont-Rouge",
    "Brossard",
    "Levis",
    "Pointe-Claire",
    "Thetford Mines",
    "Joliette",
    "Châteauguay",
    "Salaberry-de-Valleyfield",
    "Lavaltrie",
    "Boisbriand",
    "Saint-Colomban",
  ],
  MANITOBA: [
    "Winnipeg",
    "Brandon",
    "Winkler",
    "Selkirk",
    "Dauphin",
    "Flin Flon",
    "Thompson",
    "Morden",
    "Portage la Prairie",
    "Steinbach",
    "The Pas",
    "Virden",
    "Stonewall",
    "Carman",
    "Carberry",
    "Altona",
    "Stony Mountain",
    "Swan River",
    "Lac du Bonnet",
    "Winnipeg Beach",
    "Crystal City",
    "Riverton",
    "Erickson",
    "MacGregor",
    "Lockport",
    "Souris",
    "Warren",
    "Roblin",
    "Matlock",
    "Rapid City",
  ],
  BRITISH_COLUMBIA: [
    "Vancouver",
    "Victoria",
    "Duncan",
    "Prince George",
    "Merritt",
    "North Vancouver",
    "Vernon",
    "Terrace",
    "Richmond",
    "West Vancouver",
    "Prince Rupert",
    "Houston",
    "Sidney",
    "Cumberland",
    "Australian",
    "Campbell River",
    "Greenwood",
    "Burnaby",
    "Surrey",
    "Abbotsford",
    "Phoenix",
    "Kimberley",
    "Nanaimo",
    "Coquitlam",
    "Delta",
    "Kelowna",
    "Langley",
    "Rossland",
    "Kamloops",
    "Chilliwack",
    "Penticton",
    "Cranbrook",
    "Courtenay",
    "Parksville",
    "Mission",
  ],
  SASKATCHEWAN: [
    "Saskatoon",
    "Prince Albert",
    "Swift Current",
    "Warman",
    "Regina",
    "Yorkton",
    "Moose Jaw",
    "North Battleford",
    "Estevan",
    "Weyburn",
    "Lloydminster",
    "Melfort",
    "Humboldt",
    "Meadow Lake",
    "Martensville",
    "Melville",
    "Wadena",
    "Lanigan",
    "Major",
    "Davidson",
    "Saint Louis",
    "Imperial",
    "Star City",
    "Sovereign",
    "Radisson",
    "Liberty",
    "La Ronge",
    "Esterhazy",
    "Biggar",
    "Hudson Bay",
    "Dalmeny",
    "Outlook",
    "Wynyard",
  ],
  ALBERTA: [
    "Calgary",
    "Edmonton",
    "Edson",
    "St. Albert",
    "Millet",
    "Devon",
    "Entrance",
    "Beaumont",
    "Brooks",
    "Hinton",
    "Airdrie",
    "Wembley",
    "Sherwood Park",
    "Manning",
    "Alberta Beach",
    "Grande Prairie",
    "Cynthia",
    "Clyde",
    "Wildwood",
    "Marlboro",
    "Diamond City",
    "Yellowstone",
    "Bowden",
    "Legal",
    "Nordegg",
    "Chinook Valley",
    "Cold Lake",
    "MacKay",
    "Bentley",
    "Donnelly",
    "Tomahawk",
    "Raven",
    "Mountain Park",
    "Bow City",
  ],
  NEWFOUNDLAND_AND_LABRADOR: [
    "St. John's",
    "Labrador City",
    "Woodstock",
    "Rocky Harbour",
    "Red Bay",
    "Churchill Falls",
    "Charleston",
    "Triton",
    "Roundabout",
    "Princeton",
    "North River",
    "Winterland",
    "Saint Lewis",
    "Cow Head",
    "Meadows",
    "Terra Nova",
    "St. Anthony",
    "North West River",
    "Elliston",
    "Burlington",
    "Nain",
    "Lourdes",
    "Raleigh",
    "St. Lawrence",
    "St Pauls",
    "Branch",
    "Cape Saint George",
    "Reidville",
    "Howley",
    "Hopedale",
    "Mount Pearl",
    "Corner Brook",
    "Paradise",
    "Gander",
    "Happy Valley-Goose Bay",
    "Grand Falls-Windsor",
    "Tilt Cove",
    "Stephenville",
    "Torbay",
    "Wabush",
    "Nippers Harbour",
    "Brent's Cove",
    "Lawn",
    "Little Bay",
    "Deer Lake",
    "Bay Roberts",
    "Marystown",
    "Conception Bay South",
    "Springdale",
    "Channel-Port aux Basques",
  ],
  ONTARIO: [
    "Niagara Falls",
    "Windsor",
    "Waterloo",
    "Ottawa",
    "Kingston",
    "Mississauga",
    "Toronto",
    "Cornwall",
    "Woodstock",
    "Guelph",
    "Hamilton",
    "London",
    "Sarnia",
    "Thunder Bay",
    "Welland",
    "North Bay",
    "Peterborough",
    "Brantford",
    "Brampton",
    "Ontario",
    "Kitchener",
    "Markham",
    "Vaughan",
    "Wawa",
    "Greater Sudbury",
    "Ontario",
    "Belleville",
    "Kenora",
    "Kearney",
    "Cochrane",
    "Marathon",
    "Ontario",
    "Ontario",
    "Timmins",
    "King City",
    "St. Catharines",
    "Oshawa",
    "Pickering",
    "Elliot Lake",
    "Barrie",
    "Sault Ste. Marie",
    "Brockville",
    "Owen Sound",
    "Stratford",
    "Richmond Hill",
  ],
  PRINCE_EDWARD_ISLAND: [
    "Summerside",
    "Charlottetown",
    "Kensington",
    "Alberton",
    "Souris",
    "Cornwall",
    "Georgetown",
    "Stratford",
    "Breadalbane",
    "Darlington",
    "Montague",
    "Borden-Carleton",
    "Brackley",
    "Abram-Village",
    "O'Leary",
    "Wellington",
    "North Rustico",
    "Lorne Valley",
    "Hampshire",
    "Victoria",
    "Cavendish",
    "North Shore",
    "Clyde River",
    "Alexandra",
    "West River",
    "Norway",
    "Eastern Kings",
    "Sherbrooke",
    "Union Road",
    "Murray River",
    "Saint Peters Bay",
    "Albany",
    "Crapaud",
    "Morell",
    "Mount Pleasant",
    "Peterville",
    "New London",
    "Central Kings",
    "Hunter River",
    "Long River",
    "Saint Louis",
    "Hazelbrook",
    "North Wiltshire",
    "Tyne Valley",
    "Kingston",
    "Tracadie",
    "St-Nicholas",
    "Belfast",
    "Warren Grove",
  ],
  NEW_BRUNSWICK: [
    "Saint John",
    "Moncton",
    "Fredericton",
    "Sussex",
    "Stanley",
    "Centreville",
    "Stoney Creek",
    "Elgin",
    "Prince William",
    "Bath",
    "Minto",
    "Hartland",
    "Canal",
    "Somerville",
    "Woodstock",
    "New Brunswick",
    "Sussex Corner",
    "New Maryland",
    "Tracy",
    "Kingston",
    "Miramichi",
    "Four Falls",
    "Fredericton Junction",
    "Welsford",
    "Benton",
    "Millville",
    "Val-Comeau",
    "Petitcodiac",
    "Forest City",
    "Maugerville",
    "Chipman",
    "Cambridge-Narrows",
    "White Rapids",
    "New Denmark",
    "Gagetown",
    "Glassville",
    "Sunny Corner",
    "Bay du Vin",
    "Kent Junction",
    "Lower Newcastle",
    "Pabineau Falls",
    "Saint-Norbert",
    "Sainte-Rosette",
    "Florenceville-Bristol",
    "Woodstock First Nation",
    "Mount Middleton",
    "Renous",
    "Gray Rapids",
    "Penniac",
    "Saint-Laurent",
    "Taymouth",
    "Durham Bridge",
  ],
};
