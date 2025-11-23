import { sortOwners, applyMasterTop } from '../owners'
import type { Owner } from '../../types/global.types'

const owners: Owner[] = [
  { id: '1', name: 'Bob', cats: [{ id: 'c1', name: 'A' }] },
  { id: '2', name: 'Alice', cats: [{ id: 'c2', name: 'B' }, { id: 'c3', name: 'C' }] },
  { id: '3', name: 'Carol', cats: [] },
]

test('sort by name', () => {
  const sorted = sortOwners(owners, 'name')
  expect(sorted.map(o => o.name)).toEqual(['Alice', 'Bob', 'Carol'])
})

test('sort by cats count', () => {
  const sorted = sortOwners(owners, 'cats')
  expect(sorted.map(o => o.id)).toEqual(['2', '1', '3'])
})

test('apply master on top', () => {
  const sorted = applyMasterTop(owners, '3')
  expect(sorted[0].id).toBe('3')
})