import { ProviderManager } from '@leandromatos/provider-manager'

import { CatController } from '@/modules/cat/cat.controller'
import { CatService } from '@/modules/cat/cat.service'

export const registerCatModule = (providerManager: ProviderManager): void => {
  providerManager.registerProvider(CatService)
  providerManager.registerProvider(CatController)
}
