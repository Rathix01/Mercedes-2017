import Bacon from 'baconjs';
import R from 'ramda';
// // import { toTimeline } from '../../../stores/animation-store';
// import Actions from '../../../../actions/actions';
// import publish from '../../../stores/state-store';

const addressResults = {
  "results": [
    {
      "line1": "1 Test Street",
      "line2": null,
      "suburb": "South Hill",
      "city": "Oamaru",
      "postcode": "9400",
      "country": "New Zealand"
    },
    {
      "line1": "2 Test Street",
      "line2": null,
      "suburb": "South Hill",
      "city": "Oamaru",
      "postcode": "9400",
      "country": "New Zealand"
    },
    {
      "line1": "2A Test Street",
      "line2": null,
      "suburb": "South Hill",
      "city": "Oamaru",
      "postcode": "9400",
      "country": "New Zealand"
    },
    {
      "line1": "3 Test Street",
      "line2": null,
      "suburb": "South Hill",
      "city": "Oamaru",
      "postcode": "9400",
      "country": "New Zealand"
    },
    {
      "line1": "4 Test Street",
      "line2": null,
      "suburb": "South Hill",
      "city": "Oamaru",
      "postcode": "9400",
      "country": "New Zealand"
    },
    {
      "line1": "4A Test Street",
      "line2": null,
      "suburb": "South Hill",
      "city": "Oamaru",
      "postcode": "9400",
      "country": "New Zealand"
    },
    {
      "line1": "6 Test Street",
      "line2": null,
      "suburb": "South Hill",
      "city": "Oamaru",
      "postcode": "9400",
      "country": "New Zealand"
    },
    {
      "line1": "8 Test Street",
      "line2": null,
      "suburb": "South Hill",
      "city": "Oamaru",
      "postcode": "9400",
      "country": "New Zealand"
    },
    {
      "line1": "10 Test Street",
      "line2": null,
      "suburb": "South Hill",
      "city": "Oamaru",
      "postcode": "9400",
      "country": "New Zealand"
    },
    {
      "line1": "12 Test Street",
      "line2": null,
      "suburb": "South Hill",
      "city": "Oamaru",
      "postcode": "9400",
      "country": "New Zealand"
    },
    {
      "line1": "14 Test Street",
      "line2": null,
      "suburb": "South Hill",
      "city": "Oamaru",
      "postcode": "9400",
      "country": "New Zealand"
    },
    {
      "line1": "16 Test Street",
      "line2": null,
      "suburb": "South Hill",
      "city": "Oamaru",
      "postcode": "9400",
      "country": "New Zealand"
    },
    {
      "line1": "20 Test Street",
      "line2": null,
      "suburb": "South Hill",
      "city": "Oamaru",
      "postcode": "9400",
      "country": "New Zealand"
    },
    {
      "line1": "22 Test Street",
      "line2": null,
      "suburb": "South Hill",
      "city": "Oamaru",
      "postcode": "9400",
      "country": "New Zealand"
    },
    {
      "line1": "23 Test Street",
      "line2": null,
      "suburb": "South Hill",
      "city": "Oamaru",
      "postcode": "9400",
      "country": "New Zealand"
    },
    {
      "line1": "24 Test Street",
      "line2": null,
      "suburb": "South Hill",
      "city": "Oamaru",
      "postcode": "9400",
      "country": "New Zealand"
    },
    {
      "line1": "25 Test Street",
      "line2": null,
      "suburb": "South Hill",
      "city": "Oamaru",
      "postcode": "9400",
      "country": "New Zealand"
    },
    {
      "line1": "25A Test Street",
      "line2": null,
      "suburb": "South Hill",
      "city": "Oamaru",
      "postcode": "9400",
      "country": "New Zealand"
    },
    {
      "line1": "27 Test Street",
      "line2": null,
      "suburb": "South Hill",
      "city": "Oamaru",
      "postcode": "9400",
      "country": "New Zealand"
    },
    {
      "line1": "27A Test Street",
      "line2": null,
      "suburb": "South Hill",
      "city": "Oamaru",
      "postcode": "9400",
      "country": "New Zealand"
    }
  ]
}


const doctorResults = {
  "results": [
    {
      "doctor-id": "17592186046679",
      "title": "Dr",
      "first-name": "Jeremy",
      "last-name": "West",
      "org-name": "Clendon Medical Services Limited",
      "suburb": "Manurewa West"
    },
    {
      "doctor-id": "17592186052096",
      "title": "Dr",
      "first-name": "Anna",
      "last-name": "Tabuteau",
      "org-name": "West Harbour Medical Centre",
      "suburb": "West Harbour"
    },
    {
      "doctor-id": "17592186052095",
      "title": "Dr",
      "first-name": "Philip",
      "last-name": "Haggo",
      "org-name": "West Harbour Medical Centre",
      "suburb": "West Harbour"
    },
    {
      "doctor-id": "17592186054134",
      "org-name": "West Harbour Medical Centre",
      "suburb": "West Harbour"
    },
    {
      "doctor-id": "17592186046675",
      "title": "Dr",
      "first-name": "Peter",
      "last-name": "Didsbury",
      "org-name": "Clendon Medical Services Limited",
      "suburb": "Manurewa West"
    },
    {
      "doctor-id": "17592186046676",
      "title": "Dr",
      "first-name": "Richard",
      "last-name": "Ruddell",
      "org-name": "Clendon Medical Services Limited",
      "suburb": "Manurewa West"
    },
    {
      "doctor-id": "17592186047061",
      "title": "Dr",
      "first-name": "Tullio Gianluigi",
      "last-name": "Testa",
      "org-name": "Dr Testa   (Rust Ave Med Centre)",
      "suburb": "Whangarei"
    },
    {
      "doctor-id": "17592186052578",
      "org-name": "Clendon Medical Services Limited",
      "suburb": "Manurewa West"
    },
    {
      "doctor-id": "17592186046678",
      "title": "Dr",
      "first-name": "Daya",
      "last-name": "Mudannayake",
      "org-name": "Clendon Medical Services Limited",
      "suburb": "Manurewa West"
    },
    {
      "doctor-id": "17592186048613",
      "title": "Dr",
      "first-name": "Jann",
      "last-name": "Singer",
      "org-name": "Luckens Road Medical Centre",
      "suburb": "West Harbour"
    },
    {
      "doctor-id": "17592186052759",
      "org-name": "Dr Testa   (Rust Ave Med Centre)",
      "suburb": "Whangarei"
    },
    {
      "doctor-id": "17592186046677",
      "title": "Dr",
      "first-name": "Richard",
      "last-name": "Kenner",
      "org-name": "Clendon Medical Services Limited",
      "suburb": "Manurewa West"
    },
    {
      "doctor-id": "17592186048611",
      "title": "Dr",
      "first-name": "Julyan",
      "last-name": "Lawry",
      "org-name": "Luckens Road Medical Centre",
      "suburb": "West Harbour"
    },
    {
      "doctor-id": "17592186048614",
      "title": "Dr",
      "first-name": "Paul",
      "last-name": "Nicholls",
      "org-name": "Luckens Road Medical Centre",
      "suburb": "West Harbour"
    },
    {
      "doctor-id": "17592186048612",
      "title": "Dr",
      "first-name": "Joanne",
      "last-name": "Shooter",
      "org-name": "Luckens Road Medical Centre",
      "suburb": "West Harbour"
    },
    {
      "doctor-id": "17592186053243",
      "org-name": "Luckens Road Medical Centre",
      "suburb": "West Harbour"
    },
    {
      "doctor-id": "17592186051695",
      "title": "Dr",
      "first-name": "Linda",
      "last-name": "Chaffey",
      "org-name": "University Health Services",
      "suburb": "Victoria Street West"
    },
    {
      "doctor-id": "17592186051688",
      "title": "Dr",
      "first-name": "Yvonne",
      "last-name": "Greenfield",
      "org-name": "UNITEC Student Health Centre",
      "suburb": "Victoria Street West"
    },
    {
      "doctor-id": "17592186054163",
      "org-name": "White Cross Healthcare LTD - Group Admin Office",
      "suburb": "Victoria Street West"
    },
    {
      "doctor-id": "17592186054036",
      "org-name": "University Health Services",
      "suburb": "Victoria Street West"
    }
  ]
}

module.exports = {
  addressResults, doctorResults
}