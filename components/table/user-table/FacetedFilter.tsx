import * as React from 'react';
import { useRouter } from 'next/router';
import { CheckIcon } from '@radix-ui/react-icons';
import { CirclePlus } from 'lucide-react';
import { Column } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { ParsedUrlQueryInput } from 'querystring';
import { Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import DynamicIcon from '@/components/dynamic-icon';
import * as LucideIcons from 'lucide-react';

interface Query extends ParsedUrlQueryInput {
  search?: string;
  isActive?: string;
  role?: string;
  page?: string;
}


interface DataTableFacetedFilterProps<TData, TValue> {
  queryField: 'isActive' | 'role';
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: keyof typeof LucideIcons;
  }[];
  filter: {
    search: string | null;
    isActive: string | null;
    role: string | null;
  };
}

export function DataTableFacetedFilter<TData, TValue>({
  queryField,
  column,
  title,
  options,
  filter
}: DataTableFacetedFilterProps<TData, TValue>) {
  const router = useRouter();
  const facets = column?.getFacetedUniqueValues();
  const selectedValue = filter[`${queryField}`];

  const handleSearchUsers = (value: string | undefined) => {
    const query: Query = {};
    if (filter.search) query.search = filter.search;
    if (queryField === 'isActive') {
      if (value) query.isActive = value;
      if (filter.role) query.role = filter.role;
    }

    if (queryField === 'role') {
      if (filter.isActive) query.isActive = filter.isActive;
      if (value) query.role = value;
    }

    router.push({ pathname: '/admin', query: query });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="base" className="border-gray-border text-gray-500 border-dashed">
          <CirclePlus className="mr-1 h-4 w-4" />
          {title}
          {selectedValue && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              {options
                .filter((option) => option.value === selectedValue)
                .map((option) => (
                  <Badge variant="secondary" key={option.value} className="rounded-sm px-2 font-normal">
                    {option.label}
                  </Badge>
                ))}
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0 bg-white-primary" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValue === option.value;
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        handleSearchUsers(undefined);
                      } else {
                        handleSearchUsers(option.value);
                      }
                    }}
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary cursor-pointer',
                        isSelected ? 'bg-primary text-primary-foreground' : 'opacity-50 [&_svg]:invisible',
                      )}
                    >
                      <CheckIcon className={cn('h-4 w-4')} />
                    </div>
                    
                    {option.icon && <DynamicIcon iconName={option.icon} className="mr-1 h-[15px] w-[15px] text-gray-500" />}
                    <Text size="tx" className="!text-gray-700">
                      {option.label}
                    </Text>
                    {facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValue && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => handleSearchUsers(undefined)}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
