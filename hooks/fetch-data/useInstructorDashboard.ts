import useSWR from 'swr';
import { Response } from '@/types/response';
import { InstructorDashboard } from '@/types/schema';

export default function useInstructorDashboard() {
  const { data: dashboard, isLoading } = useSWR<Response<InstructorDashboard>>('/instructor/dashboard');

  return { dashboard, isLoading };
}