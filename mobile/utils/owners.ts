import type { Owner } from '../types/global.types'

export const sortOwners = (owners: Owner[], sort: 'name' | 'cats' | undefined): Owner[] => {
  if (sort === 'name') return owners.slice().sort((a, b) => a.name.localeCompare(b.name))
  if (sort === 'cats') return owners.slice().sort((a, b) => b.cats.length - a.cats.length)
  return owners
}

export const applyMasterTop = (owners: Owner[], masterId: string | null): Owner[] => {
  if (!masterId) return owners
  return owners.slice().sort((a, b) => (a.id === masterId ? -1 : b.id === masterId ? 1 : 0))
}