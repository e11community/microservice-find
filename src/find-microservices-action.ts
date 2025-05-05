import {readdirSync} from 'fs'
import {join} from 'path'

function after(subject: string, search: string): string {
  const index = subject.indexOf(search)
  if (index < 0) return subject
  return subject.substring(search.length)
}

export function findMicroserviceChildren(grandparent = '.', exceptions: string[] = []): string[] {
  const found: string[] = []
  const parent = join(grandparent, 'microservices')
  const entries = readdirSync(parent, {recursive: false, withFileTypes: true})
  for (const entry of entries) {
    if (entry.isDirectory() && entry.name.startsWith('service-')) {
      const service = after(entry.name, 'service-')
      if (!exceptions.includes(service) && !found.includes(service)) found.push(service)
    }
  }
  return found.sort()
}
