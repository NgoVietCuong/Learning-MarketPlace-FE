import useSWR from 'swr';
import { Response } from '@/types/response';
import { CategoryList } from '@/types/schema';

export default function useCategories() {
  const { data: categoryList, isLoading: categoryLoading } = useSWR<Response<CategoryList>>('/category/list');

  return { categoryList, categoryLoading };
}
