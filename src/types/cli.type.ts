import { Config } from '@/core/config/types'

export interface CommandOptions extends Partial<Config> {
  config?: string
}
