import { describe, it, expect } from 'vitest'
import { transformData } from './transformData'

const testData = [
  { id: 1, category: 'Hotel', location: { city: 'Bangkok', country: 'TH' }, price: 120, nights: 2 },
  {
    id: 2,
    category: 'Flight',
    location: { city: 'Tokyo', country: 'JP' },
    price: 450,
    passengers: 1,
  },
  { id: 3, category: 'Hotel', location: { city: 'Bangkok', country: 'TH' }, price: 80, nights: 3 },
  { id: 4, category: 'Hotel', location: { city: 'Dubai', country: 'AE' }, price: 200, nights: 1 },
  {
    id: 5,
    category: 'Flight',
    location: { city: 'Bangkok', country: 'TH' },
    price: 300,
    passengers: 2,
  },
]

describe('transformData', () => {
  it('groups by single key', () => {
    const result = transformData(testData, {
      groupBy: 'category',
      aggregations: { price: 'sum' },
    })

    expect(result).toHaveLength(2)
    expect(result.find((r) => r.key === 'Hotel')?.count).toBe(3)
    expect(result.find((r) => r.key === 'Flight')?.count).toBe(2)
  })

  it('calculates sum aggregation', () => {
    const result = transformData(testData, {
      groupBy: 'category',
      aggregations: { price: 'sum' },
    })

    expect(result.find((r) => r.key === 'Hotel')?.aggregates.price).toBe(400)
    expect(result.find((r) => r.key === 'Flight')?.aggregates.price).toBe(750)
  })

  it('calculates avg aggregation', () => {
    const result = transformData(testData, {
      groupBy: 'category',
      aggregations: { nights: 'avg' },
    })

    expect(result.find((r) => r.key === 'Hotel')?.aggregates.nights).toBe(2)
    expect(result.find((r) => r.key === 'Flight')?.aggregates.nights).toBeNull()
  })

  it('calculates min/max aggregation', () => {
    const result = transformData(testData, {
      groupBy: 'category',
      aggregations: { price: 'min' },
    })

    expect(result.find((r) => r.key === 'Hotel')?.aggregates.price).toBe(80)

    const resultMax = transformData(testData, {
      groupBy: 'category',
      aggregations: { price: 'max' },
    })

    expect(resultMax.find((r) => r.key === 'Hotel')?.aggregates.price).toBe(200)
  })

  it('handles nested key paths', () => {
    const result = transformData(testData, {
      groupBy: 'location.city',
      aggregations: { price: 'sum' },
    })

    expect(result.find((r) => r.key === 'Bangkok')?.count).toBe(3)
    expect(result.find((r) => r.key === 'Tokyo')?.count).toBe(1)
    expect(result.find((r) => r.key === 'Dubai')?.count).toBe(1)
  })

  it('supports composite grouping keys', () => {
    const result = transformData(testData, {
      groupBy: ['category', 'location.city'],
      aggregations: { price: 'sum' },
    })

    expect(result.find((r) => r.key === 'Hotel|Bangkok')?.count).toBe(2)
    expect(result.find((r) => r.key === 'Flight|Bangkok')?.count).toBe(1)
  })

  it('sorts by aggregated values', () => {
    const result = transformData(testData, {
      groupBy: 'category',
      aggregations: { price: 'sum' },
      sortBy: { field: 'price', order: 'desc' },
    })

    expect(result[0].key).toBe('Flight')
    expect(result[1].key).toBe('Hotel')
  })

  it('applies pre-filter', () => {
    const result = transformData(testData, {
      groupBy: 'category',
      aggregations: { price: 'sum' },
      filterFn: (item) => item.price > 100,
    })

    expect(result.find((r) => r.key === 'Hotel')?.count).toBe(2)
  })

  it('throws on invalid input', () => {
    expect(() => transformData(null as never, { groupBy: 'x', aggregations: {} })).toThrow()
    expect(() => transformData([], null as never)).toThrow()
  })
})
