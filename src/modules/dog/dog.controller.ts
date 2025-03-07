import { Inject, Injectable } from '@leandromatos/provider-manager/decorators'

import { DogService } from '@/modules/dog/dog.service'

@Injectable()
export class DogController {
  constructor(@Inject('DogService') private readonly dogService: DogService) {}

  getHello(): void {
    this.dogService.getHello()
  }
}
