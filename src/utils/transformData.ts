type AggregationType = 'sum' | 'avg' | 'min' | 'max' | 'count'

interface TransformOptions<T> {
  groupBy: string | string[]
  aggregations: Record<string, AggregationType>
  sortBy?: { field: string; order: 'asc' | 'desc' }
  filterFn?: (item: T) => boolean
}

interface TransformResult<T> {
  key: string
  aggregates: Record<string, number | null>
  items: T[]
  count: number
}

function getNestedValue<T>(obj: T, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, obj)
}

function computeAggregation(values: number[], type: AggregationType): number | null {
  if (values.length === 0) return null

  switch (type) {
    case 'sum':
      return values.reduce((a, b) => a + b, 0)
    case 'avg':
      return values.reduce((a, b) => a + b, 0) / values.length
    case 'min':
      return Math.min(...values)
    case 'max':
      return Math.max(...values)
    case 'count':
      return values.length
  }
}

export function transformData<T extends Record<string, unknown>>(
  arr: T[],
  options: TransformOptions<T>
): TransformResult<T>[] {
  if (!Array.isArray(arr)) {
    throw new Error('First argument must be an array')
  }

  if (!options || typeof options !== 'object') {
    throw new Error('Options must be an object')
  }

  const { groupBy, aggregations, sortBy, filterFn } = options

  // Pre-filter if provided
  const filtered = filterFn ? arr.filter(filterFn) : arr

  // Normalize groupBy to array
  const groupKeys = Array.isArray(groupBy) ? groupBy : [groupBy]

  // Group items - O(n)
  const groups = new Map<string, T[]>()

  for (const item of filtered) {
    const keyParts = groupKeys.map((key) => {
      const value = getNestedValue(item, key)
      return value !== undefined ? String(value) : 'undefined'
    })
    const compositeKey = keyParts.join('|')

    const existing = groups.get(compositeKey)
    if (existing) {
      existing.push(item)
    } else {
      groups.set(compositeKey, [item])
    }
  }

  // Build results with aggregations
  const results: TransformResult<T>[] = []

  for (const [key, items] of groups) {
    const aggregates: Record<string, number | null> = {}

    for (const [field, aggType] of Object.entries(aggregations)) {
      const values: number[] = []

      for (const item of items) {
        const value = getNestedValue(item, field)
        if (typeof value === 'number') {
          values.push(value)
        }
      }

      aggregates[field] = computeAggregation(values, aggType)
    }

    results.push({
      key,
      aggregates,
      items,
      count: items.length,
    })
  }

  // Sort if specified
  if (sortBy) {
    const { field, order } = sortBy

    results.sort((a, b) => {
      const aVal = a.aggregates[field] ?? 0
      const bVal = b.aggregates[field] ?? 0

      return order === 'asc' ? aVal - bVal : bVal - aVal
    })
  }

  return results
}
