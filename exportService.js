const xlsx = require('xlsx');
const path = require('path');
const fs = require("fs");


const exportExcel = (data, workSheetColumnNames, workSheetName, filePath) => {
    const workBook = xlsx.utils.book_new();
    const workSheetData = [
        workSheetColumnNames,
        ... data
    ];
    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
    xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
    xlsx.writeFile(workBook, path.resolve(filePath));
}

const exportReestrsToExcel = (reestrs, workSheetColumnNames, workSheetName, filePath) => {
    const data = reestrs.map(reestr => {
        return [reestr.name, reestr.bin_iin, reestr.contacts, reestr.otrasl, reestr.kpved, reestr.production, reestr.nomer_sertificata, reestr.data_vidachi, reestr.sait];
    });
    //Создаем файл если файла нет
    fs.exists(filePath, function(exists) {
    if(exists) {
        // Create a file
    }
    else {
        console.log("Файл уже существует", filePath);
    }
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
}

module.exports = exportReestrsToExcel;
