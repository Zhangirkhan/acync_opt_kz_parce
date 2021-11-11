// Loading the dependencies. We don't need pretty
// because we shall not log html to the terminal
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const exportReestrsToExcel = require('./exportService');
// // var reestr = [];
const reestrs = new Array();

const workSheetColumnName = [
	"Наименование предприятия",
	"БИН/ИИН",
	"Контакты",
	"Отрасль",
	"КПВЭД",
	"Продукция",
	"Номер сертификата",
	"Дата выдачи",
	"Сайт",
];

const getHTML = async (url) => {
    const { data } = await axios.get(url);
    return cheerio.load(data);
  };
async function getPagesNumber(){
  const $ = await getHTML(`https://kanobu.ru/games/ps-4/popular/?page=1`);
  const pagesNumber = $('swiper-wrapper').text();
  return pagesNumber;
}




// const getHTML = async (url) => {
//     const { data } = await axios.get(url);
//     return cheerio.load(data);
//   };

// async function getPagesNumber(){
//         const $ = await getHTML(`https://otp.kz/?page=1`);
//         const pagesNumber = $('.pagination-link').html();

//         // const pagesNumber = $('.pagination-link').text().slice(1);
//         console.log(pagesNumber);
//         // return pagesNumber;
// }




// URL of the page we want to scrape
// const url = "https://otp.kz/?page=1";

console.log(getPagesNumber());
// Async function which scrapes the data
// async function scrapeData()  {
//     const reestr = new Array();

//     const url_first = "https://otp.kz/?page=";

//     const workSheetName = 'otp.kz';
//     const filePath = './outputFiles/export.xlsx';
// 	try {

//         for (i = 1; i <= pagesNumber; i++) {

//             const url = url_first + i;
//             const { data } = await axios.get(url);

//             const $ = cheerio.load(data);

//             const listItems = $("tbody > tr");

//             listItems.each((idx, element) => {
//                 //Ташим все td
//                 const tds = $(element).find("td");

//                 const country = {
//                     name: "",
//                     bin_iin: "",
//                     contacts: "",
//                     otrasl: "",
//                     kpved: "",
//                     production: "",
//                     nomer_sertificata: "",
//                     data_vidachi: "",
//                     sait: ""
//                 };

//                 country.name = $(tds[0]).text();
//                 country.bin_iin = $(tds[1]).text();
//                 country.contacts = $(tds[2]).text();
//                 country.otrasl = $(tds[3]).text();
//                 country.kpved = $(tds[4]).text();
//                 country.production = $(tds[5]).text();
//                 country.nomer_sertificata = $(tds[6]).text();
//                 country.data_vidachi = $(tds[7]).text();
//                 country.sait = $(tds[8]).text();

//                 reestr.push(country);
//             });

//             console.log(url + " Обработан")
//         }
//         //Запись в базу данных
//         exportReestrsToExcel(reestr, workSheetColumnName, workSheetName, filePath);
// 	} catch (err) {
// 		console.error(err);
// 	}
// }
//Запуск кода
// scrapeData();
