import { Inject, Injectable } from '@leandromatos/provider-manager/decorators'

import { CatService } from '@/modules/cat/cat.service'

@Injectable()
export class CatController {
  constructor(@Inject('CatService') private readonly catService: CatService) {}

  getHello(): void {
    this.catService.getHello()
  }
}
