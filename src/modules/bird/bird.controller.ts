import { Inject, Injectable } from '@leandromatos/provider-manager/decorators'

import { BirdService } from '@/modules/bird/bird.service'

@Injectable()
export class BirdController {
  constructor(@Inject('BirdService') private readonly birdService: BirdService) {}

  getHello(): void {
    this.birdService.getHello()
  }
}
