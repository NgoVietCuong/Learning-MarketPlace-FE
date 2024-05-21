import { useState } from 'react';
import { cn } from '@/lib/utils';
import { CheckIcon } from '@radix-ui/react-icons';
import { CirclePlus, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { CategoryList } from '@/types/schema';

interface AddCategoryProps {
  categories: CategoryList;
  selectedCategories: CategoryList;
  handleSelectCategory: (value: CategoryList) => void;
}

export default function AddCategory({ categories, selectedCategories, handleSelectCategory }: AddCategoryProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="w-full bg-blue">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="font-normal w-full justify-between text-gray-700"
        >
          Select up to 3 categories
          <ChevronsUpDown className="ml-2 h-[13px] w-[13px] shrink-0 opacity-50 text-slate-800" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="w-full bg-white-primary">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => {
                const isSelected = selectedCategories.map((c) => c.id).includes(category.id);
                return (
                  <CommandItem
                    key={category.id}
                    value={category.name}
                    className="text-gray-700"
                    onSelect={() => {
                      if (isSelected) {
                        handleSelectCategory(selectedCategories.filter((c) => c.id !== category.id));
                      } else if (selectedCategories.length === 3) {
                        handleSelectCategory(selectedCategories);
                      } else {
                        handleSelectCategory([...selectedCategories, category]);
                      }
                    }}
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        isSelected ? 'bg-primary text-primary-foreground' : 'opacity-50 [&_svg]:invisible',
                      )}
                    >
                      <CheckIcon className={cn('h-4 w-4')} />
                    </div>
                    {category.name}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
