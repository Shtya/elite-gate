// download.worker.ts
import * as XLSX from 'xlsx';
import { ExcelDownloadRequest, ExcelDownloadResponse } from '@/types/excelDownload.types';

self.onmessage = ({ data }) => {
    const { headers, columnWidths, rows, sheetName, fileName } = data;

    try {
        // build sheet
        const aoa = [headers, ...rows];
        const ws = XLSX.utils.aoa_to_sheet(aoa);
        (ws)['!cols'] = columnWidths;

        // build workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, sheetName || 'Sheet1');

        // build timestamped filename
        const now = new Date().toISOString().replace(/\.\d+Z$/, '').replace(/[:T]/g, '-');
        const base = fileName || 'ExcelData';
        const name = `${base}_${now}.xlsx`;

        // **generate** ArrayBuffer, **don’t** call writeFile here
        const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

        // post success back with filename
        self.postMessage({ success: true, buffer, name }, [buffer]);
    }
    catch (err) {
        self.postMessage({ success: false, message: err.message, stack: err.stack });
    }
};
