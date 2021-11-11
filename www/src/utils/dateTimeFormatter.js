const DAYS = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
  "Setiap Hari"
];
const DAYS_EN = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Everyday"
];
const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember"
];
const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Ags",
  "Sep",
  "Okt",
  "Nov",
  "Des"
];

const getFullDate = string => {
  const date = new Date(string);
  return (
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).substr(-2, 2) +
    "-" +
    ("0" + date.getDate()).substr(-2, 2)
  );
};

const getTime = string => {
  const date = new Date(string);
  return (
    ("0" + date.getHours()).substr(-2, 2) +
    ":" +
    ("0" + date.getMinutes()).substr(-2, 2)
  );
};

const getFullDateTime = string => {
  const date = new Date(string);
  return (
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).substr(-2, 2) +
    "-" +
    ("0" + date.getDate()).substr(-2, 2) +
    " " +
    ("0" + date.getHours()).substr(-2, 2) +
    ":" +
    ("0" + date.getMinutes()).substr(-2, 2)
  );
};

const getFullDateTimeName = string => {
  const date = new Date(string);
  return (
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).substr(-2, 2) +
    "-" +
    ("0" + date.getDate()).substr(-2, 2) +
    "-" +
    ("0" + date.getHours()).substr(-2, 2) +
    "-" +
    ("0" + date.getMinutes()).substr(-2, 2)
  );
};

const indonesianDateParser = createdAt => {
  let d = new Date(createdAt);
  let date =
    DAYS[d.getDay()] +
    ", " +
    d.getDate() +
    " " +
    MONTHS[d.getMonth()] +
    " " +
    d.getFullYear();
  return date;
};

const indonesianDateMonthYearParser = createdAt => {
  let d = new Date(createdAt);
  let date = d.getDate() + " " + MONTHS[d.getMonth()] + " " + d.getFullYear();
  return date;
};

const shortIndonesianDateMonthYearParser = createdAt => {
  let d = new Date(createdAt);
  let date =
    d.getDate() + " " + MONTHS_SHORT[d.getMonth()] + " " + d.getFullYear();
  return date;
};

const dayEnToIn = day => {
  return DAYS[DAYS_EN.findIndex(e => e === day)];
};

export {
  getFullDate,
  getTime,
  getFullDateTime,
  getFullDateTimeName,
  indonesianDateParser,
  indonesianDateMonthYearParser,
  shortIndonesianDateMonthYearParser,
  dayEnToIn
};
