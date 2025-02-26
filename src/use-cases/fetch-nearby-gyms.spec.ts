import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Neaby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: 'gym of vi tests',
      latitude: '10',
      longitude: '10',
      phone: '319999999',
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: 'gym of vi tests',
      latitude: '20',
      longitude: '20',
      phone: '319999999',
    })

    const { gyms } = await sut.execute({
      userLatitude: 10,
      userLongitude: 10,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
