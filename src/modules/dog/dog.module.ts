import { ProviderManager } from '@leandromatos/provider-manager'

import { DogController } from '@/modules/dog/dog.controller'
import { DogService } from '@/modules/dog/dog.service'

export const registerDogModule = (providerManager: ProviderManager): void => {
  providerManager.registerProvider(DogService)
  providerManager.registerProvider(DogController)
}
