import * as LucideIcons from 'lucide-react';

export const statuses = [
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

export const types = [
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
