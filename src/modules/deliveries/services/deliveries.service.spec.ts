import { Test } from '@nestjs/testing'
import { DeliveriesService } from './deliveries.service'
import { DeliveriesRepository } from '../repositories/mock/deliveries.mock.repository'

describe('Teste Delivires Service', () => {
  let deliveriesService: DeliveriesService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DeliveriesService,
        {
          provide: 'DeliveriesRepository',
          useClass: DeliveriesRepository,
        },
      ],
    }).compile()
    deliveriesService = moduleRef.get<DeliveriesService>(DeliveriesService)
  })
})
