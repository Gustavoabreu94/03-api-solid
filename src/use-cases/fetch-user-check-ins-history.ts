import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

interface FechtUserCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FechtUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FechtUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FechtUserCheckInsHistoryUseCaseRequest): Promise<FechtUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
