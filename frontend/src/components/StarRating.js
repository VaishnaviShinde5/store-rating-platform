import React, { useState } from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ value, onChange, readonly = false, size = 20 }) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value || 0;

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          className={`transition-colors ${readonly ? 'cursor-default' : 'cursor-pointer'} ${
            s <= display ? 'text-amber-400' : 'text-slate-600'
          }`}
          fill={s <= display ? '#fbbf24' : 'none'}
          onMouseEnter={() => !readonly && setHovered(s)}
          onMouseLeave={() => !readonly && setHovered(0)}
          onClick={() => !readonly && onChange && onChange(s)}
        />
      ))}
    </div>
  );
}
