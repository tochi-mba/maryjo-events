import { Crown, Presentation, Rocket, Trophy, Users, Wine } from 'lucide-vue-next'

export const serviceIcons = {
  presentation: Presentation,
  crown: Crown,
  trophy: Trophy,
  rocket: Rocket,
  users: Users,
  wine: Wine
}

export type ServiceIcon = keyof typeof serviceIcons
