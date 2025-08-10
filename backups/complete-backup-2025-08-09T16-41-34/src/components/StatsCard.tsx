import React, { memo } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  highlight?: 'primary' | 'secondary' | 'none';
}

const StatsCard = memo<StatsCardProps>(({ title, value, highlight = 'none' }) => {
  const highlightClass = highlight === 'primary' ? 'highlight-primary' : 
                        highlight === 'secondary' ? 'highlight-secondary' : '';

  return (
    <div className={`stats-card ${highlightClass}`}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="text-6xl font-black">{value}</div>
    </div>
  );
});

StatsCard.displayName = 'StatsCard';

export default StatsCard;
