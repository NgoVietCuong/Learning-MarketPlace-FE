import useSWR from 'swr';
import { Response } from '@/types/response';
import { CategoryList } from '@/types/schema';

export default function useCategories() {
  const { data: categoryList, isLoading: categoriesLoading } = useSWR<Response<CategoryList>>('/category/list');

  return { categoryList, categoriesLoading };
}
