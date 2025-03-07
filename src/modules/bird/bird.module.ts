import { ProviderManager } from '@leandromatos/provider-manager'

import { BirdController } from '@/modules/bird/bird.controller'
import { BirdService } from '@/modules/bird/bird.service'

export const registerBirdModule = (providerManager: ProviderManager): void => {
  providerManager.registerProvider(BirdService)
  providerManager.registerProvider(BirdController)
}
