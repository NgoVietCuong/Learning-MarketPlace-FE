import * as LucideIcons from 'lucide-react';
import { LessonContentTypes } from './enums';

export const Statuses = [
  {
    value: 'Published',
    label: 'Published',
    icon: 'CircleCheck' as keyof typeof LucideIcons,
  },
  {
    value: 'Unpublished',
    label: 'Unpublished',
    icon: 'CircleAlert' as keyof typeof LucideIcons,
  },
];

export const Types = [
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

export const ContentTypes: { [key in LessonContentTypes]: keyof typeof LucideIcons } = {
  [LessonContentTypes.VIDEO]: 'MonitorPlay',
  [LessonContentTypes.TEXT]: 'BookText',
  [LessonContentTypes.DOCUMENT]: 'File',
}