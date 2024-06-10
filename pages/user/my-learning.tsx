import { Img } from "@/components/ui/img";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import Auth from "@/components/guard/auth";
import useMyCourses from "@/hooks/useMyCourses";
import { Roles } from '@/constants/enums';

export default function MyLearning() {
  return (
    <Auth role={Roles.STUDENT}>
      <Heading>My learning</Heading>
    </Auth>
  );
}