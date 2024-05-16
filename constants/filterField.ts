import { FilePenLine, Trash2, CircleCheck, CircleAlert, WalletMinimal, DollarSign } from 'lucide-react';

export const statuses = [
  {
    value: 'Published',
    label: "Published",
    icons: CircleCheck
  }, {
    value: "Unpublished",
    label: "Unpublished",
    icons: CircleAlert
  }
]

export const types = [
  {
    value: 'Free',
    label: "Free",
    icons: WalletMinimal
  }, {
    value: "Paid",
    label: "Paid",
    icons: DollarSign
  }
]