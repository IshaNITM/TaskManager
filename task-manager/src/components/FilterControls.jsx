// src/components/FilterControls.jsx
import React from 'react';

const FilterControls = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="filter-controls">
      {filters.map(filter => (
        <button
          key={filter.value}
          className={currentFilter === filter.value ? 'active' : ''}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterControls;