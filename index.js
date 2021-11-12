// Loading the dependencies. We don't need pretty
// because we shall not log html to the terminal
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const exportReestrsToExcel = require('./exportService');
// // var reestr = [];
const reestrs = new Array();

let maxpage = null;
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


// URL of the page we want to scrape
// const url = "https://otp.kz/?page=1";

// Async function which scrapes the data
async function scrapeData(first, second)  {
    const reestr = [];
    const url_first = "https://otp.kz/?page=";
    const workSheetName = 'otp.kz';
    const filePath = './outputFiles/export_'+first+'_'+second+'.xlsx';
	try {
        // const { pages } = await axios.get("https://otp.kz/?page=1");
        // const page = cheerio.load(pages);
        // const pagesNumber = page('.pagination-link').text().slice(1);

        //Количество страниц на сайте
        for (i = first; i <= second; i=i+1) {
            // console.log(i);
            const url = url_first + i;
            const { data } = await axios.get(url);
            const $ = await cheerio.load(data);
            const listItems = await $("tbody > tr");
            await listItems.each((idx, element) => {
                //Ташим все td
                const tds = $(element).find("td");

                const country = {
                    name: "",
                    bin_iin: "",
                    contacts: "",
                    otrasl: "",
                    kpved: "",
                    production: "",
                    nomer_sertificata: "",
                    data_vidachi: "",
                    sait: ""
                };

                country.name = $(tds[0]).text();
                country.bin_iin = $(tds[1]).text();
                country.contacts = $(tds[2]).text();
                country.otrasl = $(tds[3]).text();
                country.kpved = $(tds[4]).text();
                country.production = $(tds[5]).text();
                country.nomer_sertificata = $(tds[6]).text();
                country.data_vidachi = $(tds[7]).text();
                country.sait = $(tds[8]).text();

                reestr.push(country);
            });

            console.log(url + " Обработан")
        }
        //Запись в базу данных
        exportReestrsToExcel(reestr, workSheetColumnName, workSheetName, filePath);
	} catch (err) {
		console.error(err);
	}
}
// scrapeData(501,502);
//Создаем разные excel файлы для хранения. А то они станут очень большими
// scrapeData(1,500);
// scrapeData(501,1000);
// scrapeData(1001,1500);
// scrapeData(1501,2000);
// scrapeData(2001,2500);
scrapeData(2500,2624);
