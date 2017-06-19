import R from 'ramda';

const regions = [
  {
    "id": 480,
    "name": "North, Central and South America and the Caribbean",
    "areaCode": "USA",
    "countries": [
      {
        "iso2Code": "PR",
        "iso3Code": "PRI",
        "name": "Puerto Rico",
        "id": 144
      },
      {
        "iso2Code": "AG",
        "iso3Code": "ATG",
        "name": "Antigua And Barbuda",
        "id": 183
      },
      {
        "iso2Code": "AR",
        "iso3Code": "ARG",
        "name": "Argentina",
        "id": 184
      },
      {
        "iso2Code": "BS",
        "iso3Code": "BHS",
        "name": "Bahamas",
        "id": 187
      },
      {
        "iso2Code": "BB",
        "iso3Code": "BRB",
        "name": "Barbados",
        "id": 189
      },
      {
        "iso2Code": "BZ",
        "iso3Code": "BLZ",
        "name": "Belize",
        "id": 190
      },
      {
        "iso2Code": "BM",
        "iso3Code": "BMU",
        "name": "Bermuda",
        "id": 191
      },
      {
        "iso2Code": "BO",
        "iso3Code": "BOL",
        "name": "Bolivia",
        "id": 192
      },
      {
        "iso2Code": "BR",
        "iso3Code": "BRA",
        "name": "Brazil",
        "id": 193
      },
      {
        "iso2Code": "CA",
        "iso3Code": "CAN",
        "name": "Canada",
        "id": 194
      },
      {
        "iso2Code": "KY",
        "iso3Code": "CYM",
        "name": "Cayman Islands",
        "id": 195
      },
      {
        "iso2Code": "CL",
        "iso3Code": "CHL",
        "name": "Chile",
        "id": 196
      },
      {
        "iso2Code": "CO",
        "iso3Code": "COL",
        "name": "Colombia",
        "id": 197
      },
      {
        "iso2Code": "CR",
        "iso3Code": "CRI",
        "name": "Costa Rica",
        "id": 198
      },
      {
        "iso2Code": "CU",
        "iso3Code": "CUB",
        "name": "Cuba",
        "id": 199
      },
      {
        "iso2Code": "DM",
        "iso3Code": "DMA",
        "name": "Dominica",
        "id": 200
      },
      {
        "iso2Code": "EC",
        "iso3Code": "ECU",
        "name": "Ecuador",
        "id": 202
      },
      {
        "iso2Code": "SV",
        "iso3Code": "SLV",
        "name": "El Salvador",
        "id": 203
      },
      {
        "iso2Code": "FK",
        "iso3Code": "FLK",
        "name": "Falkland Islands",
        "id": 204
      },
      {
        "iso2Code": "GF",
        "iso3Code": "GUF",
        "name": "French Guiana",
        "id": 206
      },
      {
        "iso2Code": "GL",
        "iso3Code": "GRL",
        "name": "Greenland",
        "id": 208
      },
      {
        "iso2Code": "GD",
        "iso3Code": "GRD",
        "name": "Grenada",
        "id": 209
      },
      {
        "iso2Code": "GP",
        "iso3Code": "GLP",
        "name": "Guadeloupe",
        "id": 210
      },
      {
        "iso2Code": "GT",
        "iso3Code": "GTM",
        "name": "Guatemala",
        "id": 211
      },
      {
        "iso2Code": "GY",
        "iso3Code": "GUY",
        "name": "Guyana",
        "id": 212
      },
      {
        "iso2Code": "HT",
        "iso3Code": "HTI",
        "name": "Haiti",
        "id": 213
      },
      {
        "iso2Code": "HN",
        "iso3Code": "HND",
        "name": "Honduras",
        "id": 214
      },
      {
        "iso2Code": "JM",
        "iso3Code": "JAM",
        "name": "Jamaica",
        "id": 215
      },
      {
        "iso2Code": "MQ",
        "iso3Code": "MTQ",
        "name": "Martinique",
        "id": 217
      },
      {
        "iso2Code": "MX",
        "iso3Code": "MEX",
        "name": "Mexico",
        "id": 218
      },
      {
        "iso2Code": "AN",
        "iso3Code": "DAN",
        "name": "Netherlands Antilles",
        "id": 223
      },
      {
        "iso2Code": "NI",
        "iso3Code": "NIC",
        "name": "Nicaragua",
        "id": 224
      },
      {
        "iso2Code": "PA",
        "iso3Code": "PAN",
        "name": "Panama",
        "id": 225
      },
      {
        "iso2Code": "PY",
        "iso3Code": "PRY",
        "name": "Paraguay",
        "id": 226
      },
      {
        "iso2Code": "PE",
        "iso3Code": "PER",
        "name": "Peru",
        "id": 227
      },
      {
        "iso2Code": "LC",
        "iso3Code": "LCA",
        "name": "St. Lucia",
        "id": 230
      },
      {
        "iso2Code": "SR",
        "iso3Code": "SUR",
        "name": "Suriname",
        "id": 233
      },
      {
        "iso2Code": "US",
        "iso3Code": "USA",
        "name": "United States of America",
        "id": 236
      },
      {
        "iso2Code": "UY",
        "iso3Code": "URY",
        "name": "Uruguay",
        "id": 237
      },
      {
        "iso2Code": "VE",
        "iso3Code": "VEN",
        "name": "Venezuela",
        "id": 238
      },
      {
        "iso2Code": "AQ",
        "iso3Code": "ATC",
        "name": "Antarctica (Cruising)",
        "id": 242
      },
      {
        "iso2Code": "DO",
        "iso3Code": "DOM",
        "name": "Dominican Rep.",
        "id": 249
      },
      {
        "iso2Code": "KN",
        "iso3Code": "KNA",
        "name": "St. Kitts-Nevis",
        "id": 277
      },
      {
        "iso2Code": "VC",
        "iso3Code": "VCT",
        "name": "St. Vincent & Grenadines",
        "id": 278
      },
      {
        "iso2Code": "TT",
        "iso3Code": "TTO",
        "name": "Trinidad & Tobago",
        "id": 279
      },
      {
        "iso2Code": "VI",
        "iso3Code": "VIR",
        "name": "Virgin Islands",
        "id": 280
      }
    ]
  },
  {
    "id": 481,
    "name": "Africa, Middle East, Indian Sub-Continent & Asia",
    "areaCode": "AME",
    "countries": [
      {
        "iso2Code": "DZ",
        "iso3Code": "DZA",
        "name": "Algeria",
        "id": 11
      },
      {
        "iso2Code": "EG",
        "iso3Code": "EGY",
        "name": "Egypt",
        "id": 21
      },
      {
        "iso2Code": "IL",
        "iso3Code": "ISR",
        "name": "Israel",
        "id": 30
      },
      {
        "iso2Code": "KZ",
        "iso3Code": "KAZ",
        "name": "Kazakhstan",
        "id": 32
      },
      {
        "iso2Code": "MA",
        "iso3Code": "MAR",
        "name": "Morocco",
        "id": 40
      },
      {
        "iso2Code": "TN",
        "iso3Code": "TUN",
        "name": "Tunisia",
        "id": 53
      },
      {
        "iso2Code": "TR",
        "iso3Code": "TUR",
        "name": "Turkey",
        "id": 59
      },
      {
        "iso2Code": "AF",
        "iso3Code": "AFG",
        "name": "Afghanistan",
        "id": 62
      },
      {
        "iso2Code": "AO",
        "iso3Code": "AGO",
        "name": "Angola",
        "id": 63
      },
      {
        "iso2Code": "AZ",
        "iso3Code": "AZE",
        "name": "Azerbaijan",
        "id": 66
      },
      {
        "iso2Code": "BH",
        "iso3Code": "BHR",
        "name": "Bahrain",
        "id": 67
      },
      {
        "iso2Code": "BJ",
        "iso3Code": "BEN",
        "name": "Benin",
        "id": 68
      },
      {
        "iso2Code": "BT",
        "iso3Code": "BTN",
        "name": "Bhutan",
        "id": 69
      },
      {
        "iso2Code": "BW",
        "iso3Code": "BWA",
        "name": "Botswana",
        "id": 70
      },
      {
        "iso2Code": "BF",
        "iso3Code": "BFA",
        "name": "Burkina Faso",
        "id": 72
      },
      {
        "iso2Code": "BI",
        "iso3Code": "BDI",
        "name": "Burundi",
        "id": 73
      },
      {
        "iso2Code": "CM",
        "iso3Code": "CMR",
        "name": "Cameroon",
        "id": 75
      },
      {
        "iso2Code": "CF",
        "iso3Code": "CAF",
        "name": "Central African Republic",
        "id": 77
      },
      {
        "iso2Code": "TD",
        "iso3Code": "TCD",
        "name": "Chad",
        "id": 78
      },
      {
        "iso2Code": "CN",
        "iso3Code": "CHN",
        "name": "China",
        "id": 79
      },
      {
        "iso2Code": "KM",
        "iso3Code": "COM",
        "name": "Comoros",
        "id": 82
      },
      {
        "iso2Code": "DJ",
        "iso3Code": "DJI",
        "name": "Djibouti",
        "id": 87
      },
      {
        "iso2Code": "GQ",
        "iso3Code": "GNQ",
        "name": "Equatorial Guinea",
        "id": 89
      },
      {
        "iso2Code": "ER",
        "iso3Code": "ERI",
        "name": "Eritrea",
        "id": 90
      },
      {
        "iso2Code": "ET",
        "iso3Code": "ETH",
        "name": "Ethiopia",
        "id": 91
      },
      {
        "iso2Code": "GA",
        "iso3Code": "GAB",
        "name": "Gabon",
        "id": 93
      },
      {
        "iso2Code": "GM",
        "iso3Code": "GMB",
        "name": "Gambia",
        "id": 94
      },
      {
        "iso2Code": "GH",
        "iso3Code": "GHA",
        "name": "Ghana",
        "id": 95
      },
      {
        "iso2Code": "GN",
        "iso3Code": "GIN",
        "name": "Guinea",
        "id": 97
      },
      {
        "iso2Code": "GW",
        "iso3Code": "GNB",
        "name": "Guinea-Bissau",
        "id": 98
      },
      {
        "iso2Code": "IN",
        "iso3Code": "IND",
        "name": "India",
        "id": 100
      },
      {
        "iso2Code": "IR",
        "iso3Code": "IRN",
        "name": "Iran",
        "id": 102
      },
      {
        "iso2Code": "IQ",
        "iso3Code": "IRQ",
        "name": "Iraq",
        "id": 103
      },
      {
        "iso2Code": "JO",
        "iso3Code": "JOR",
        "name": "Jordan",
        "id": 105
      },
      {
        "iso2Code": "KE",
        "iso3Code": "KEN",
        "name": "Kenya",
        "id": 106
      },
      {
        "iso2Code": "KW",
        "iso3Code": "KWT",
        "name": "Kuwait",
        "id": 109
      },
      {
        "iso2Code": "KG",
        "iso3Code": "KGZ",
        "name": "Kyrgyzstan",
        "id": 110
      },
      {
        "iso2Code": "LB",
        "iso3Code": "LBN",
        "name": "Lebanon",
        "id": 112
      },
      {
        "iso2Code": "LS",
        "iso3Code": "LSO",
        "name": "Lesotho",
        "id": 113
      },
      {
        "iso2Code": "LR",
        "iso3Code": "LBR",
        "name": "Liberia",
        "id": 114
      },
      {
        "iso2Code": "LY",
        "iso3Code": "LBY",
        "name": "Libya",
        "id": 115
      },
      {
        "iso2Code": "MO",
        "iso3Code": "MAC",
        "name": "Macau",
        "id": 116
      },
      {
        "iso2Code": "MG",
        "iso3Code": "MDG",
        "name": "Madagascar",
        "id": 117
      },
      {
        "iso2Code": "MW",
        "iso3Code": "MWI",
        "name": "Malawi",
        "id": 118
      },
      {
        "iso2Code": "MV",
        "iso3Code": "MDV",
        "name": "Maldives",
        "id": 120
      },
      {
        "iso2Code": "ML",
        "iso3Code": "MLI",
        "name": "Mali",
        "id": 121
      },
      {
        "iso2Code": "MR",
        "iso3Code": "MRT",
        "name": "Mauritania",
        "id": 122
      },
      {
        "iso2Code": "MU",
        "iso3Code": "MUS",
        "name": "Mauritius",
        "id": 123
      },
      {
        "iso2Code": "MN",
        "iso3Code": "MNG",
        "name": "Mongolia",
        "id": 126
      },
      {
        "iso2Code": "MZ",
        "iso3Code": "MOZ",
        "name": "Mozambique",
        "id": 127
      },
      {
        "iso2Code": "NA",
        "iso3Code": "NAM",
        "name": "Namibia",
        "id": 129
      },
      {
        "iso2Code": "NP",
        "iso3Code": "NPL",
        "name": "Nepal",
        "id": 131
      },
      {
        "iso2Code": "NE",
        "iso3Code": "NER",
        "name": "Niger",
        "id": 133
      },
      {
        "iso2Code": "NG",
        "iso3Code": "NGA",
        "name": "Nigeria",
        "id": 134
      },
      {
        "iso2Code": "OM",
        "iso3Code": "OMN",
        "name": "Oman",
        "id": 139
      },
      {
        "iso2Code": "PK",
        "iso3Code": "PAK",
        "name": "Pakistan",
        "id": 140
      },
      {
        "iso2Code": "QA",
        "iso3Code": "QAT",
        "name": "Qatar",
        "id": 145
      },
      {
        "iso2Code": "RW",
        "iso3Code": "RWA",
        "name": "Rwanda",
        "id": 147
      },
      {
        "iso2Code": "ST",
        "iso3Code": "STI",
        "name": "São Tomé and Príncipe",
        "id": 149
      },
      {
        "iso2Code": "SA",
        "iso3Code": "SAU",
        "name": "Saudi Arabia",
        "id": 150
      },
      {
        "iso2Code": "SN",
        "iso3Code": "SEN",
        "name": "Senegal",
        "id": 151
      },
      {
        "iso2Code": "SC",
        "iso3Code": "SYC",
        "name": "Seychelles",
        "id": 152
      },
      {
        "iso2Code": "SL",
        "iso3Code": "SLE",
        "name": "Sierra Leone",
        "id": 153
      },
      {
        "iso2Code": "SO",
        "iso3Code": "SOM",
        "name": "Somalia",
        "id": 156
      },
      {
        "iso2Code": "ZA",
        "iso3Code": "ZAF",
        "name": "South Africa",
        "id": 157
      },
      {
        "iso2Code": "LK",
        "iso3Code": "LKA",
        "name": "Sri Lanka",
        "id": 158
      },
      {
        "iso2Code": "SD",
        "iso3Code": "SDN",
        "name": "Sudan",
        "id": 159
      },
      {
        "iso2Code": "SZ",
        "iso3Code": "SWZ",
        "name": "Swaziland",
        "id": 161
      },
      {
        "iso2Code": "SY",
        "iso3Code": "SYR",
        "name": "Syria",
        "id": 162
      },
      {
        "iso2Code": "TW",
        "iso3Code": "TWN",
        "name": "Taiwan",
        "id": 163
      },
      {
        "iso2Code": "TJ",
        "iso3Code": "TJK",
        "name": "Tajikistan",
        "id": 164
      },
      {
        "iso2Code": "TZ",
        "iso3Code": "TZA",
        "name": "Tanzania",
        "id": 165
      },
      {
        "iso2Code": "TG",
        "iso3Code": "TGO",
        "name": "Togo",
        "id": 167
      },
      {
        "iso2Code": "TM",
        "iso3Code": "TKM",
        "name": "Turkmenistan",
        "id": 169
      },
      {
        "iso2Code": "UG",
        "iso3Code": "UGA",
        "name": "Uganda",
        "id": 171
      },
      {
        "iso2Code": "AE",
        "iso3Code": "ARE",
        "name": "United Arab Emirates",
        "id": 172
      },
      {
        "iso2Code": "UZ",
        "iso3Code": "UZB",
        "name": "Uzbekistan",
        "id": 173
      },
      {
        "iso2Code": "YE",
        "iso3Code": "YEM",
        "name": "Yemen",
        "id": 178
      },
      {
        "iso2Code": "ZM",
        "iso3Code": "ZMB",
        "name": "Zambia",
        "id": 179
      },
      {
        "iso2Code": "ZW",
        "iso3Code": "ZWE",
        "name": "Zimbabwe",
        "id": 180
      },
      {
        "iso2Code": "BD",
        "iso3Code": "BGD",
        "name": "Bangladesh",
        "id": 188
      },
      {
        "iso2Code": "PT",
        "iso3Code": "AZO",
        "name": "Azores",
        "id": 245
      },
      {
        "iso2Code": "CV",
        "iso3Code": "CPV",
        "name": "Cape Verde",
        "id": 246
      },
      {
        "iso2Code": "CI",
        "iso3Code": "CIV",
        "name": "Ivory Coast",
        "id": 250
      },
      {
        "iso2Code": "KR",
        "iso3Code": "PSY",
        "name": "Korea (south)",
        "id": 264
      },
      {
        "iso2Code": "RE",
        "iso3Code": "REU",
        "name": "Reunion",
        "id": 275
      },
      {
        "iso2Code": "IC",
        "iso3Code": "CIS",
        "name": "Canary Islands",
        "id": 283
      },
      {
        "iso2Code": "CD",
        "iso3Code": "COD",
        "name": "Congo, Democratic Republic",
        "id": 286
      },
      {
        "iso2Code": "SS",
        "iso3Code": "SSD",
        "name": "South Sudan",
        "id": 313
      }
    ]
  },
  {
    "id": 482,
    "name": "Europe",
    "areaCode": "EUR",
    "countries": [
      {
        "iso2Code": "AL",
        "iso3Code": "ALB",
        "name": "Albania",
        "id": 10
      },
      {
        "iso2Code": "AD",
        "iso3Code": "AND",
        "name": "Andorra",
        "id": 12
      },
      {
        "iso2Code": "AT",
        "iso3Code": "AUT",
        "name": "Austria",
        "id": 13
      },
      {
        "iso2Code": "BY",
        "iso3Code": "BLR",
        "name": "Belarus",
        "id": 14
      },
      {
        "iso2Code": "BE",
        "iso3Code": "BEL",
        "name": "Belgium",
        "id": 15
      },
      {
        "iso2Code": "BG",
        "iso3Code": "BGR",
        "name": "Bulgaria",
        "id": 17
      },
      {
        "iso2Code": "HR",
        "iso3Code": "HRV",
        "name": "Croatia",
        "id": 18
      },
      {
        "iso2Code": "CZ",
        "iso3Code": "CZE",
        "name": "Czech Republic",
        "id": 19
      },
      {
        "iso2Code": "DK",
        "iso3Code": "DNK",
        "name": "Denmark",
        "id": 20
      },
      {
        "iso2Code": "EE",
        "iso3Code": "EST",
        "name": "Estonia",
        "id": 22
      },
      {
        "iso2Code": "FI",
        "iso3Code": "FIN",
        "name": "Finland",
        "id": 23
      },
      {
        "iso2Code": "FR",
        "iso3Code": "FRA",
        "name": "France",
        "id": 24
      },
      {
        "iso2Code": "GE",
        "iso3Code": "GEO",
        "name": "Georgia",
        "id": 25
      },
      {
        "iso2Code": "DE",
        "iso3Code": "DEU",
        "name": "Germany",
        "id": 26
      },
      {
        "iso2Code": "GI",
        "iso3Code": "GIB",
        "name": "Gibraltar",
        "id": 27
      },
      {
        "iso2Code": "HU",
        "iso3Code": "HUN",
        "name": "Hungary",
        "id": 28
      },
      {
        "iso2Code": "IS",
        "iso3Code": "ISL",
        "name": "Iceland",
        "id": 29
      },
      {
        "iso2Code": "IT",
        "iso3Code": "ITA",
        "name": "Italy",
        "id": 31
      },
      {
        "iso2Code": "LV",
        "iso3Code": "LVA",
        "name": "Latvia",
        "id": 33
      },
      {
        "iso2Code": "LI",
        "iso3Code": "LIE",
        "name": "Liechtenstein",
        "id": 34
      },
      {
        "iso2Code": "LT",
        "iso3Code": "LTU",
        "name": "Lithuania",
        "id": 35
      },
      {
        "iso2Code": "LU",
        "iso3Code": "LUX",
        "name": "Luxembourg",
        "id": 36
      },
      {
        "iso2Code": "MK",
        "iso3Code": "MKD",
        "name": "Macedonia",
        "id": 37
      },
      {
        "iso2Code": "NL",
        "iso3Code": "NLD",
        "name": "Netherlands",
        "id": 41
      },
      {
        "iso2Code": "NO",
        "iso3Code": "NOR",
        "name": "Norway",
        "id": 42
      },
      {
        "iso2Code": "PL",
        "iso3Code": "POL",
        "name": "Poland",
        "id": 43
      },
      {
        "iso2Code": "PT",
        "iso3Code": "PRT",
        "name": "Portugal",
        "id": 44
      },
      {
        "iso2Code": "RO",
        "iso3Code": "ROU",
        "name": "Romania",
        "id": 45
      },
      {
        "iso2Code": "SM",
        "iso3Code": "SMR",
        "name": "San Marino",
        "id": 47
      },
      {
        "iso2Code": "SK",
        "iso3Code": "SVK",
        "name": "Slovakia",
        "id": 49
      },
      {
        "iso2Code": "SI",
        "iso3Code": "SVN",
        "name": "Slovenia",
        "id": 50
      },
      {
        "iso2Code": "SE",
        "iso3Code": "SWE",
        "name": "Sweden",
        "id": 51
      },
      {
        "iso2Code": "CH",
        "iso3Code": "CHE",
        "name": "Switzerland",
        "id": 52
      },
      {
        "iso2Code": "UA",
        "iso3Code": "UKR",
        "name": "Ukraine",
        "id": 54
      },
      {
        "iso2Code": "CY",
        "iso3Code": "CYP",
        "name": "Cyprus",
        "id": 55
      },
      {
        "iso2Code": "GR",
        "iso3Code": "GRC",
        "name": "Greece",
        "id": 56
      },
      {
        "iso2Code": "MT",
        "iso3Code": "MLT",
        "name": "Malta",
        "id": 57
      },
      {
        "iso2Code": "ES",
        "iso3Code": "ESP",
        "name": "Spain",
        "id": 58
      },
      {
        "iso2Code": "AM",
        "iso3Code": "ARM",
        "name": "Armenia",
        "id": 65
      },
      {
        "iso2Code": "FO",
        "iso3Code": "FRO",
        "name": "Faroe Islands",
        "id": 205
      },
      {
        "iso2Code": "MC",
        "iso3Code": "MCO",
        "name": "Monaco",
        "id": 221
      },
      {
        "iso2Code": "BA",
        "iso3Code": "HEZ",
        "name": "Herzegovina",
        "id": 262
      },
      {
        "iso2Code": "MD",
        "iso3Code": "MDA",
        "name": "Moldova",
        "id": 267
      },
      {
        "iso2Code": "ME",
        "iso3Code": "MNE",
        "name": "Montenegro",
        "id": 268
      },
      {
        "iso2Code": "RU",
        "iso3Code": "RUS",
        "name": "Russia",
        "id": 270
      },
      {
        "iso2Code": "RS",
        "iso3Code": "SRB",
        "name": "Serbia",
        "id": 271
      },
      {
        "iso2Code": "VA",
        "iso3Code": "VAT",
        "name": "Vatican City",
        "id": 273
      },
      {
        "iso2Code": "IE",
        "iso3Code": "IRL",
        "name": "Ireland, Republic",
        "id": 287
      }
    ]
  },
  {
    "id": 483,
    "name": "UK",
    "areaCode": "UKA",
    "countries": [
      {
        "iso2Code": "GB",
        "iso3Code": "ENG",
        "name": "England",
        "id": 1
      },
      {
        "iso2Code": "GB",
        "iso3Code": "NIR",
        "name": "Northern Ireland",
        "id": 2
      },
      {
        "iso2Code": "GB",
        "iso3Code": "SCO",
        "name": "Scotland",
        "id": 3
      },
      {
        "iso2Code": "GB",
        "iso3Code": "GBR",
        "name": "United Kingdom",
        "id": 4
      },
      {
        "iso2Code": "GB",
        "iso3Code": "CAB",
        "name": "Wales",
        "id": 5
      },
      {
        "iso2Code": "GB",
        "iso3Code": "CHI",
        "name": "Channel Islands",
        "id": 6
      }
    ]
  },
  {
    "id": 484,
    "name": "South East Asia, Hong Kong, Japan",
    "areaCode": "SEA",
    "countries": [
      {
        "iso2Code": "BN",
        "iso3Code": "BRN",
        "name": "Brunei",
        "id": 71
      },
      {
        "iso2Code": "KH",
        "iso3Code": "KHM",
        "name": "Cambodia",
        "id": 74
      },
      {
        "iso2Code": "TL",
        "iso3Code": "TLS",
        "name": "East Timor",
        "id": 88
      },
      {
        "iso2Code": "GU",
        "iso3Code": "GUM",
        "name": "Guam",
        "id": 96
      },
      {
        "iso2Code": "HK",
        "iso3Code": "HKG",
        "name": "Hong Kong",
        "id": 99
      },
      {
        "iso2Code": "ID",
        "iso3Code": "IDN",
        "name": "Indonesia",
        "id": 101
      },
      {
        "iso2Code": "JP",
        "iso3Code": "JPN",
        "name": "Japan",
        "id": 104
      },
      {
        "iso2Code": "KI",
        "iso3Code": "KIR",
        "name": "Kiribati",
        "id": 107
      },
      {
        "iso2Code": "MY",
        "iso3Code": "MYS",
        "name": "Malaysia",
        "id": 119
      },
      {
        "iso2Code": "NR",
        "iso3Code": "NRU",
        "name": "Nauru",
        "id": 130
      },
      {
        "iso2Code": "PW",
        "iso3Code": "PLW",
        "name": "Palau",
        "id": 141
      },
      {
        "iso2Code": "PG",
        "iso3Code": "PNG",
        "name": "Papua New Guinea",
        "id": 142
      },
      {
        "iso2Code": "PH",
        "iso3Code": "PHL",
        "name": "Philippines",
        "id": 143
      },
      {
        "iso2Code": "SG",
        "iso3Code": "SGP",
        "name": "Singapore",
        "id": 154
      },
      {
        "iso2Code": "TH",
        "iso3Code": "THA",
        "name": "Thailand",
        "id": 166
      },
      {
        "iso2Code": "VN",
        "iso3Code": "VNM",
        "name": "Vietnam",
        "id": 175
      },
      {
        "iso2Code": "MH",
        "iso3Code": "MHL",
        "name": "Marshall Islands",
        "id": 216
      },
      {
        "iso2Code": "FM",
        "iso3Code": "FSM",
        "name": "Micronesia",
        "id": 219
      },
      {
        "iso2Code": "LA",
        "iso3Code": "LAO",
        "name": "Laos",
        "id": 253
      },
      {
        "iso2Code": "MM",
        "iso3Code": "MMR",
        "name": "Myanmar (Burma)",
        "id": 254
      },
      {
        "iso2Code": "MP",
        "iso3Code": "MNP",
        "name": "Northern Marianas",
        "id": 255
      }
    ]
  },
  {
    "id": 485,
    "name": "South Pacific and Norfolk Is.",
    "areaCode": "SPN",
    "countries": [
      {
        "iso2Code": "CK",
        "iso3Code": "COK",
        "name": "Cook Islands",
        "id": 85
      },
      {
        "iso2Code": "FJ",
        "iso3Code": "FJI",
        "name": "Fiji",
        "id": 92
      },
      {
        "iso2Code": "NC",
        "iso3Code": "NCL",
        "name": "New Caledonia",
        "id": 132
      },
      {
        "iso2Code": "NU",
        "iso3Code": "NIU",
        "name": "Niue",
        "id": 135
      },
      {
        "iso2Code": "NF",
        "iso3Code": "NFK",
        "name": "Norfolk Island",
        "id": 136
      },
      {
        "iso2Code": "WS",
        "iso3Code": "USS",
        "name": "Samoa",
        "id": 148
      },
      {
        "iso2Code": "SB",
        "iso3Code": "SLB",
        "name": "Solomon Islands",
        "id": 155
      },
      {
        "iso2Code": "TO",
        "iso3Code": "TON",
        "name": "Tonga",
        "id": 168
      },
      {
        "iso2Code": "TV",
        "iso3Code": "TUV",
        "name": "Tuvalu",
        "id": 170
      },
      {
        "iso2Code": "VU",
        "iso3Code": "VUT",
        "name": "Vanuatu",
        "id": 174
      },
      {
        "iso2Code": "AS",
        "iso3Code": "ASM",
        "name": "American Samoa",
        "id": 181
      },
      {
        "iso2Code": "PF",
        "iso3Code": "PYF",
        "name": "French Polynesia",
        "id": 207
      },
      {
        "iso2Code": "TK",
        "iso3Code": "TKL",
        "name": "Tokelau",
        "id": 295
      }
    ]
  },
  {
    "id": 486,
    "name": "Australia",
    "areaCode": "AUS",
    "countries": [
      {
        "iso2Code": "AU",
        "iso3Code": "AUS",
        "name": " Australia", //space here is deliberate, puts Australia at the start of the list when sorted.
        "id": 60
      }
    ]
  }
];

const toCountries = (state) => R.map((r) => r.countries, state);
const toListItems = (countries) => R.map((c) => ({ text: c.name, value: c.iso3Code }), countries);
const sortItems = (list) => R.sortBy((x) => x.text, list);

const countries = R.flatten(toCountries(regions));
const countryList = sortItems(toListItems(countries));

module.exports = {
  countryList
}