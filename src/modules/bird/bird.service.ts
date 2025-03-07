import { Injectable } from '@leandromatos/provider-manager/decorators'

import { ConfigManager } from '@/core/config-manager'
import { LoggerService } from '@/core/log/log.service'

@Injectable()
export class BirdService {
  private readonly logger: LoggerService = new LoggerService('BirdService')
  private readonly configManager: ConfigManager = ConfigManager.getInstance()
  private readonly isVerboseConfigEnabled = this.configManager.get<boolean>('verbose')
  private readonly isEmojiConfigEnabled = this.configManager.get<boolean>('emoji')

  constructor() {
    if (this.isVerboseConfigEnabled) this.logger.log('BirdService initialized')
  }

  getHello(): void {
    const hello = 'Hello, I am a bird!'
    if (this.isEmojiConfigEnabled) return this.logger.log('🐦', hello)

    return this.logger.log(hello)
  }
}
