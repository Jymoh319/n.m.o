import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import GlassInput from "./GlassInput";

export default function Table({
    columns = [],
    data = [],
    renderCell,
    pageSize = 8,
    searchable = true,
    searchPlaceholder = "Search...",
    searchKeys = [],
    className = "",
}) {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        setPage(1);
    }, [search]);

    const filtered = searchable
        ? data.filter((row) => {
            if (!search.trim() || searchKeys.length === 0) return true;
            const q = search.toLowerCase();
            return searchKeys.some((key) =>
                String(row[key] ?? "").toLowerCase().includes(q)
            );
        })
        : data;

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const current = Math.min(page, totalPages);
    const paged = filtered.slice((current - 1) * pageSize, current * pageSize);

    return (
        <div className={`table-wrap ${className}`}>
            {searchable && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 pt-5 pb-4 border-b border-[rgba(255,255,255,0.06)]">
                    <div className="w-full sm:max-w-xs">
                        <GlassInput
                            icon={<Search size={18} className="text-[#7C8CA3]" />}
                            type="text"
                            placeholder={searchPlaceholder}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="text-sm"
                        />
                    </div>
                    <span className="text-sm text-[#7C8CA3]">
                        {filtered.length} {filtered.length === 1 ? "record" : "records"}
                    </span>
                </div>
            )}

            <div className="table-scroll">
                <table className="table">
                    <thead>
                        <tr>
                            {columns.map((col, i) => (
                                <th key={i}>{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paged.map((row, i) => (
                            <tr key={row?.id ?? i}>
                                {renderCell
                                    ? renderCell(row, i)
                                    : columns.map((_, j) => <td key={j}>{row[j]}</td>)}
                            </tr>
                        ))}
                        {paged.length === 0 && (
                            <tr>
                                <td colSpan={columns.length} className="py-10 text-center text-[#7C8CA3]">
                                    No records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-[rgba(255,255,255,0.06)]">
                    <span className="text-sm text-[#7C8CA3]">
                        Page {current} of {totalPages}
                    </span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={current === 1}
                            className="btn btn-ghost min-h-[2.4rem] px-4 py-2 text-sm disabled:opacity-40"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={current === totalPages}
                            className="btn btn-ghost min-h-[2.4rem] px-4 py-2 text-sm disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
