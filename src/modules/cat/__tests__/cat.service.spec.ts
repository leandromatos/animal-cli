import { ProviderManager } from '@leandromatos/provider-manager'
import { Provider } from '@leandromatos/provider-manager/types'
import { describe, expect, it, vi } from 'vitest'

import { registerBirdModule } from '@/modules/bird/bird.module'
import { CatController } from '@/modules/cat/cat.controller'
import { registerCatModule } from '@/modules/cat/cat.module'
import { registerDogModule } from '@/modules/dog/dog.module'
import { registerGlobalModule } from '@/modules/global/global.module'

export type Overrides = Record<string, Provider<unknown> | undefined>

/**
 * Creates a testing module by setting up the dependency container with the option to override providers.
 * @param overrides A map of provider identifiers and their corresponding mock or replacement functions.
 * @returns Configured DependencyContainer for testing.
 */
const createTestingModule = (overrides: Overrides = {}): ProviderManager => {
  const providerManager = new ProviderManager()

  // Register default modules
  registerGlobalModule(providerManager)
  registerBirdModule(providerManager)
  registerCatModule(providerManager)
  registerDogModule(providerManager)

  // Apply overrides
  Object.keys(overrides).forEach(identifier => {
    if (overrides[identifier]) {
      providerManager.registerProvider(overrides[identifier], identifier)
    }
  })

  return providerManager
}

// Example usage in a test
describe('CatController Tests', () => {
  it('should call getHello', () => {
    const mockHello = vi.fn()
    const providerManager = createTestingModule({
      CatController: () => ({ getHello: mockHello }),
    })

    const catController = providerManager.get(CatController)
    catController.getHello()
    expect(mockHello).toHaveBeenCalled()
  })
})
