"use client";

import { MUSIC_COLORS } from '@/lib/music-colors';

type Props = {
  selected: string[];
  onChange: (colors: string[]) => void;
};

export default function ColorFilter({ selected, onChange }: Props) {
  const toggle = (id: string) => {
    onChange(
      selected.includes(id)
        ? selected.filter(x => x !== id)
        : [...selected, id]
    );
  };

  return (
    <div className="color-filter-wrap">
      <div className="filter-heading-row">
        <div>
          <p className="eyebrow">FIND BY COLOR</p>
          <h3>기억나는 색으로 찾아보세요.</h3>
        </div>

        {selected.length > 0 && (
          <button className="clear-button" onClick={() => onChange([])}>
            선택 {selected.length}개 · 전체 해제
          </button>
        )}
      </div>

      <div className="color-grid">
        {MUSIC_COLORS.map(color => {
          const active = selected.includes(color.id);

          return (
            <button
              key={color.id}
              onClick={() => toggle(color.id)}
              className={`color-button ${active ? 'active' : ''}`}
              style={{
                background: color.hex,
                color: color.text,
              }}
            >
              <span>{active ? '✓ ' : ''}{color.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
