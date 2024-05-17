import * as LucideIcons from 'lucide-react';

type IconNames = keyof typeof LucideIcons;

interface IconProps {
  iconName: IconNames;
  className?: string;
}

export default function DynamicIcon({ iconName, className }: IconProps) {
  const LucideIcon = LucideIcons[iconName] as React.ComponentType<React.SVGProps<SVGSVGElement>>;
  return <LucideIcon className={className} />;
}