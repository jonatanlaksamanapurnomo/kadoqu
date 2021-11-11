import { MONTHS } from "../data/constants";

// these functions are intended for providing valid value for date / time input
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
  let days = ["Minggu", "Senin", " Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  let months = [
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
  let date =
    days[d.getDay()] +
    ", " +
    d.getDate() +
    " " +
    months[d.getMonth()] +
    " " +
    d.getFullYear();
  return date;
};

const monthNumToName = monthNum => {
  return MONTHS[monthNum - 1] || "";
};
const monthNameToNum = monthName => {
  const month = MONTHS.indexOf(monthName);
  return month ? month + 1 : 0;
};

const addMonths = (date, months) => {
  const newDateObject = new Date(date);
  newDateObject.setMonth(date.getMonth() + months);
  return newDateObject;
};

const addDays = (date, days) => {
  const newDateObject = new Date(date);
  newDateObject.setDate(newDateObject.getDate() + days);
  return newDateObject;
};

const addDaysString = days => {
  let date = new Date();
  date.setDate(date.getDate() + days);
  return (
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).substr(-2, 2) +
    "-" +
    ("0" + date.getDate()).substr(-2, 2)
  );
};

export {
  getFullDate,
  getTime,
  getFullDateTime,
  getFullDateTimeName,
  indonesianDateParser,
  monthNameToNum,
  monthNumToName,
  addMonths,
  addDays,
  addDaysString
};
