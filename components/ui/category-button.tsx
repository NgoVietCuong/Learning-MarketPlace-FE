import React from 'react';
import clsx from 'clsx';

interface CategoryButtonProps {
  key: number
  category: string;
  isSelected: boolean;
  className?: string;
  onClick: (id: number) => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ key, category, isSelected, className, onClick }) => {
  return (
    <button
      onClick={() => onClick(key)}
      className={clsx(
        'font-medium h-[35px] px-3 rounded-md text-[13px] border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        {
          'text-teal-primary border-teal-primary': isSelected,
          'text-gray-400 border-input': !isSelected,
        },
        className
      )}
    >
      {category}
    </button>
  );
};

export default CategoryButton;
