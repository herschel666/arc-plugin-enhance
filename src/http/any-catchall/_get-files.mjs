import glob from 'glob'
import { join } from 'path'

let cache = {}

/** helper to return files from basePath */
export default function getFiles (basePath, folder) {
  if (!cache[folder]) {
    let root = join(basePath, folder)
    let raw = glob.sync('/**', { dot: false, root })
    let files = raw.filter(f => f.includes('.'))
    // Glob fixed path normalization, but in order to match in Windows we need to re-normalize back to backslashes (lol)
    let isWin = process.platform.startsWith('win')
    if (isWin) files = files.map(p => p.replace(/\//g, '\\'))
    cache[folder] = files
  }
  return cache[folder]
}
