import * as LucideIcons from 'lucide-react';
import { LessonContentTypes } from './enums';

export const CourseStatuses = [
  {
    label: 'Published',
    value: 'Published',
    icon: 'CircleCheck' as keyof typeof LucideIcons,
  },
  {
    label: 'Unpublished',
    value: 'Unpublished',
    icon: 'CircleAlert' as keyof typeof LucideIcons,
  },
];

export const CourseTypes = [
  {
    value: 'Free',
    label: 'Free',
    icon: 'WalletMinimal' as keyof typeof LucideIcons,
  },
  {
    value: 'Paid',
    label: 'Paid',
    icon: 'DollarSign' as keyof typeof LucideIcons,
  },
];

export const UserStatues = [
  {
    value: 'Active',
    label: 'Active',
    icon: 'CircleCheck' as keyof typeof LucideIcons,
  },
  {
    value: 'InActive',
    label: 'InActive',
    icon: 'Ban' as keyof typeof LucideIcons,
  },
];

export const UserRoles = [
  {
    value: 'Student',
    label: 'Student',
  },
  {
    value: 'Instructor',
    label: 'Instructor',
  },
];

export const ContentTypes: { [key in LessonContentTypes]: keyof typeof LucideIcons } = {
  [LessonContentTypes.VIDEO]: 'MonitorPlay',
  [LessonContentTypes.DOCUMENT]: 'File',
};
