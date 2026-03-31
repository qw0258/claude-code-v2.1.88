import { z } from 'zod'

// SandboxManager stub - static class-like object
export const SandboxManager = {
  isSupportedPlatform() { return false },
  checkDependencies() { return { errors: [], warnings: [] } },
  async initialize(_config, callback) { if (callback) await callback() },
  updateConfig(_config) {},
  async reset() {},
  async wrapWithSandbox(_config, fn) { return fn() },
  getFsReadConfig() { return null },
  getFsWriteConfig() { return null },
  getNetworkRestrictionConfig() { return null },
  getIgnoreViolations() { return null },
}

export const SandboxRuntimeConfigSchema = z.object({}).passthrough()

export class SandboxViolationStore {
  add() {}
  getAll() { return [] }
  clear() {}
}
