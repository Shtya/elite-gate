import { ExcelDownloadResponse } from "@/types/workers/excelDownload.types";

type ExcelDownloadWorkerOptions = {
    onComplete?: (name: string, buffer: ArrayBuffer) => void;
    onError?: (error: ErrorEvent) => void;
    setLoading: (loading: boolean) => void;
    unMounted: React.RefObject<boolean>;
    workerRef: React.RefObject<Worker | null>;
};

export function setupExcelDownloadWorker({
    onComplete,
    onError,
    setLoading,
    unMounted,
    workerRef,
}: ExcelDownloadWorkerOptions) {
    const worker = new Worker(new URL('../workers/exel.download.worker.js', import.meta.url));

    worker.onmessage = (e: MessageEvent<ExcelDownloadResponse>) => {
        setLoading(false);

        const { buffer, name, success, message, stack } = e.data;

        if (!buffer || !name) {
            console.error('Missing buffer or filename in worker response');
            return;
        }

        if (!success) {
            console.error('Worker failed:', message, stack);
            return;
        }


        const blob = new Blob([buffer], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        a.click();
        URL.revokeObjectURL(url);

        onComplete?.(name, buffer);

        if (unMounted.current) {
            worker.terminate();
            workerRef.current = null;
        }
    };

    worker.onerror = (err) => {
        setLoading(false);
        console.error('Worker fatal error:', err);
        onError?.(err);
    };

    workerRef.current = worker;
}