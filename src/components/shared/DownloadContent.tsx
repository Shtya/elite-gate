'use client'
import { useState, useRef, useEffect } from 'react'
import { ExcelDownloadRequest } from '@/types/workers/excelDownload.types'
import { setupExcelDownloadWorker } from '@/libs/worker-setup'
import Menu from '@/components/shared/Menu'


interface DownloadContentProps {
    text?: string
    headers?: string[]
    columnWidths?: { wch: number }[]
    rows?: (string | number | null)[][]
    sheetName?: string
    fileName?: string
}

///
/// The component logic and size will be improved 
///
export default function DownloadContent({
    text = 'تحميل القائمة',
    headers,
    columnWidths,
    rows,
    sheetName = 'Sheet1',
    fileName = 'ExcelData',
}: DownloadContentProps) {
    const [isLoading, setLoading] = useState(false)
    const workerRef = useRef<Worker | null>(null)
    const unMounted = useRef(false);

    useEffect(() => {
        setupExcelDownloadWorker({ setLoading, unMounted, workerRef });
        return () => {
            unMounted.current = true;
        };
    }, []);


    // Excel export helper using the worker
    const postExcelToWorker = (
        exportRows: (string | number | null)[][],
        exportHeaders: string[],
        exportWidths: { wch: number }[],
        name: string,
        sheet: string,
    ) => {
        if (!workerRef.current) {
            setupExcelDownloadWorker({ setLoading, unMounted, workerRef });
        }
        if (!workerRef.current) return;

        const payload: ExcelDownloadRequest = {
            headers: exportHeaders,
            columnWidths: exportWidths,
            rows: exportRows,
            sheetName: sheet,
            fileName: name,
        }
        setLoading(true)
        workerRef.current.postMessage(payload)
    }

    // Mock: fetch more table data up to limit rows
    const fetchMoreTableData = async (
        limit: number,
        columns: number,
    ): Promise<(string | number | null)[][]> => {
        const max = Math.max(0, limit | 0)
        const result: (string | number | null)[][] = []
        for (let i = 0; i < max; i++) {
            const row: (string | number | null)[] = []
            for (let c = 0; c < columns; c++) {
                row.push(`R${i + 1}-C${c + 1}`)
            }
            result.push(row)
        }
        // simulate async
        await new Promise((r) => setTimeout(r, 300))
        return result
    }

    // Mock: PDF export
    const exportToPdf = async (
        exportHeaders: string[],
        exportRows: (string | number | null)[][],
        name: string,
    ) => {
        // Minimal mock implementation: create a text blob and trigger download
        const lines = [exportHeaders.join(','), ...exportRows.map(r => r.join(','))]
        const blob = new Blob([lines.join('\n')], { type: 'application/pdf' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${name}.pdf`
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(url)
    }

    type ExportType = 'excel' | 'pdf'
    type ExportScope = 'current' | 'more'

    const ExportMenuContent = ({ onClose }: { onClose: () => void }) => {
        const [type, setType] = useState<ExportType>('excel')
        const [scope, setScope] = useState<ExportScope>('current')
        const [maxRows, setMaxRows] = useState<number>(1000)

        const hasCurrent = !!(headers?.length && columnWidths?.length && rows?.length)
        const columnsCount = headers?.length ?? (rows && rows[0]?.length) ?? 0
        const canExport =
            isLoading
                ? false
                : scope === 'current'
                    ? hasCurrent
                    : columnsCount > 0 && maxRows > 0

        const handleExport = async () => {
            try {
                if (type === 'excel') {
                    if (scope === 'current') {
                        if (!hasCurrent) return
                        postExcelToWorker(rows!, headers!, columnWidths!, fileName, sheetName)
                    } else {
                        const generated = await fetchMoreTableData(maxRows, columnsCount)
                        const exportHeaders = headers ?? Array.from({ length: columnsCount }, (_, i) => `Column ${i + 1}`)
                        const exportWidths = columnWidths ?? Array.from({ length: columnsCount }, () => ({ wch: 20 }))
                        postExcelToWorker(generated, exportHeaders, exportWidths, `${fileName}-more`, sheetName)
                    }
                } else {
                    if (scope === 'current') {
                        if (!hasCurrent) return
                        await exportToPdf(headers!, rows!, fileName)
                    } else {
                        const generated = await fetchMoreTableData(maxRows, columnsCount)
                        const exportHeaders = headers ?? Array.from({ length: columnsCount }, (_, i) => `Column ${i + 1}`)
                        await exportToPdf(exportHeaders, generated, `${fileName}-more`)
                    }
                }
            } finally {
                onClose()
            }
        }

        return (
            <div className="space-y-3" data-popup>
                <div className="space-y-1">
                    <div className="text-sm font-medium">نوع التصدير</div>
                    <div className="flex items-center gap-3">
                        <label className="inline-flex items-center gap-1 cursor-pointer">
                            <input
                                type="radio"
                                name="export-type"
                                className="radio"
                                checked={type === 'excel'}
                                onChange={() => setType('excel')}
                            />
                            <span>Excel</span>
                        </label>
                        <label className="inline-flex items-center gap-1 cursor-pointer">
                            <input
                                type="radio"
                                name="export-type"
                                className="radio"
                                checked={type === 'pdf'}
                                onChange={() => setType('pdf')}
                            />
                            <span>PDF</span>
                        </label>
                    </div>
                </div>

                <div className="space-y-1">
                    <div className="text-sm font-medium">نطاق التصدير</div>
                    <div className="flex items-center gap-3">
                        <label className="inline-flex items-center gap-1 cursor-pointer ">
                            <input
                                type="radio"
                                name="export-scope"
                                className="radio"
                                checked={scope === 'current'}
                                onChange={() => setScope('current')}
                            />
                            <span>الجدول الحالي</span>
                        </label>
                        <label className="inline-flex items-center gap-1 cursor-pointer">
                            <input
                                type="radio"
                                name="export-scope"
                                className="radio"
                                checked={scope === 'more'}
                                onChange={() => setScope('more')}
                            />
                            <span>بيانات أكثر</span>
                        </label>
                    </div>
                </div>

                {scope === 'more' && (
                    <div className="space-y-1">
                        <label className="block text-sm font-medium" htmlFor="max-rows">أقصى عدد للصفوف</label>
                        <input
                            id="max-rows"
                            type="number"
                            min={1}
                            className="input rounded-sm block input-bordered w-full border"
                            value={maxRows}
                            onChange={(e) => setMaxRows(Math.max(1, Number(e.target.value) || 0))}
                        />
                    </div>
                )}

                <div className="flex items-center justify-start gap-2 pt-1">
                    <button
                        className={`bg-primary rounded-full py-2 px-4 text-sm text-white ${!canExport ? 'btn-disabled opacity-60' : ''}`}
                        onClick={handleExport}
                        disabled={!canExport}
                    >
                        {isLoading ? 'جاري التصدير...' : 'تصدير'}
                    </button>
                    <button className="btn btn-ghost" onClick={onClose}>إلغاء</button>
                </div>
            </div>
        )
    }

    return (
        <Menu
            width={250}
            align="left"
            trigger={(toggle) => (
                <button className="btn-primary" onClick={toggle} disabled={isLoading}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="w-5 h-5 inline-block ml-2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                        />
                    </svg>
                    {isLoading ? 'جاري التصدير...' : text}
                </button>
            )}
        >
            <ExportMenuContent onClose={() => { }} />
        </Menu>
    )
}
