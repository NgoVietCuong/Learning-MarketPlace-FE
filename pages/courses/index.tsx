import { useRouter } from "next/router";
import { GetServerSidePropsContext } from 'next';
import { Button } from "@/components/ui/button";

interface CoursesProps {
  search: string | null;
  category: string | null;
  level: string | null;
  price: string | null;
}

export default function Courses({ search, category, level, price }: CoursesProps) {
  console.log(search);
  const router = useRouter();

  return (
    <div>
      <Button onClick={() => router.push('/courses?search=test')}>Test</Button>
      <Button onClick={() => router.push('/courses?level=beginner')}>Test2</Button>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const { search, category, level, price } = query;

  return {
    props: {
      search: search || null,
      category: category || null,
      level: level || null,
      price: price || null,
    }
  }
}