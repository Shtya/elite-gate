import { useState } from "react"

export default function ExportMenuContent({ onClose }: { onClose?: () => void }) {
    const [isLoading, setLoading] = useState(false)
    const [scope, setScope] = useState<'current' | 'more'>('current')
    const [maxRows, setMaxRows] = useState(1000)

    function handleExport() {
        onClose?.()
    }

    return (
        <div className="space-y-3" data-popup>
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


            <div className={`space-y-1 ${scope !== 'more' && 'opacity-50 select-none'}`}>
                <label className="block text-sm font-medium" htmlFor="max-rows">أقصى عدد للصفوف</label>
                <input
                    id="max-rows"
                    type="number"
                    min={1}
                    className={`nput rounded-sm block input-bordered w-full border ${scope !== 'more' && 'select-none'}`}
                    value={maxRows}
                    disabled={scope !== 'more'}
                    onChange={(e) => setMaxRows(Math.max(1, Number(e.target.value) || 0))}
                />
            </div>


            <div className="flex items-center justify-start gap-2 pt-1">
                <button
                    className={`bg-primary rounded-full py-2 px-4 text-sm text-white`}
                    onClick={handleExport}
                >
                    {isLoading ? 'جاري التصدير...' : 'تصدير'}
                </button>
                <button className="btn btn-ghost" onClick={onClose}>إلغاء</button>
            </div>
        </div>
    )
}

