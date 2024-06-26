import { useEffect } from 'react';
import InstructorLayout from '@/components/layout/instructor-layout';
import useProfile from '@/hooks/useProfile';

export default function InstructorDashboard() {
  const { profile } = useProfile();

  useEffect(() => {
    if (profile && profile.data) {
      setTimeout(() => {
        const iframe = document.querySelector('iframe');
        const filter = iframe?.contentDocument;
        console.log('iframe', iframe, filter);
      }, 1000)
    }
  }, [profile])

  return (
    <div className="grow flex justify-center items-center">
      <div className="bg-white-primary w-[95%] h-[95%] shadow-lg rounded-xl overflow-y-scroll">
        {profile && profile.data && (
          <iframe src={`${process.env.NEXT_PUBLIC_METABASE_URL}?instructorid=${profile.data.id}`} width="100%" height="100%"></iframe>
        )}
      </div>
    </div>
  );
}

InstructorDashboard.getLayout = function (page: React.ReactNode) {
  return <InstructorLayout>{page}</InstructorLayout>;
};
