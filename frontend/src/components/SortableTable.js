import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function SortableTable({ columns, data, emptyText = 'No data found' }) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const sorted = [...(data || [])].sort((a, b) => {
    if (!sortKey) return 0;
    const av = a[sortKey] ?? '';
    const bv = b[sortKey] ?? '';
    const cmp = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv));
    return sortDir === 'asc' ? cmp : -cmp;
  });

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-white/5">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`text-left px-4 py-3 text-slate-400 font-medium select-none ${col.sortable !== false ? 'cursor-pointer hover:text-white' : ''}`}
                onClick={() => col.sortable !== false && handleSort(col.key)}
              >
                <div className="flex items-center gap-1">
                  {col.label}
                  {col.sortable !== false && (
                    <span className="flex flex-col">
                      <ChevronUp size={10} className={sortKey === col.key && sortDir === 'asc' ? 'text-indigo-400' : 'text-slate-600'} />
                      <ChevronDown size={10} className={sortKey === col.key && sortDir === 'desc' ? 'text-indigo-400' : 'text-slate-600'} />
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 ? (
            <tr><td colSpan={columns.length} className="text-center py-10 text-slate-500">{emptyText}</td></tr>
          ) : (
            sorted.map((row, i) => (
              <tr key={i} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-slate-300">
                    {col.render ? col.render(row[col.key], row) : row[col.key] ?? '—'}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
