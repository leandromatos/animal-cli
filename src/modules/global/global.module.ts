import { ProviderManager } from '@leandromatos/provider-manager'

import { ConfigManager } from '@/core/config-manager'

export const registerGlobalModule = (providerManager: ProviderManager): void => {
  providerManager.registerProvider(() => ConfigManager.getInstance(), 'ConfigManager')
}
