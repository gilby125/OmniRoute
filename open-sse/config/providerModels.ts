import { generateModels, generateAliasMap, type RegistryModel } from "./providerRegistry.ts";

// Provider models - Generated from providerRegistry.js (single source of truth)
export const PROVIDER_MODELS = generateModels();

// Provider ID to alias mapping - Generated from providerRegistry.js
export const PROVIDER_ID_TO_ALIAS = generateAliasMap();

function normalizeRegistryLookupModelId(modelId: string): string {
  let normalized = String(modelId || "").trim();
  if (!normalized) return normalized;

  if (normalized.includes("/")) {
    normalized = normalized.split("/").pop() || normalized;
  }

  return normalized.replace(/-\d{4}-\d{2}-\d{2}$/, "");
}

function findModelEntry(aliasOrId: string, modelId: string): RegistryModel | undefined {
  const providerKey = PROVIDER_ID_TO_ALIAS[aliasOrId] || aliasOrId;
  const models = PROVIDER_MODELS[providerKey];
  if (!models) return undefined;

  return (
    models.find((m) => m.id === modelId) ||
    models.find((m) => m.id === normalizeRegistryLookupModelId(modelId))
  );
}

// Helper functions
export function getProviderModels(aliasOrId: string): RegistryModel[] {
  return PROVIDER_MODELS[aliasOrId] || [];
}

export function getDefaultModel(aliasOrId: string): string | null {
  const models = PROVIDER_MODELS[aliasOrId];
  return models?.[0]?.id || null;
}

export function isValidModel(
  aliasOrId: string,
  modelId: string,
  passthroughProviders = new Set<string>()
): boolean {
  if (passthroughProviders.has(aliasOrId)) return true;
  return Boolean(findModelEntry(aliasOrId, modelId));
}

export function findModelName(aliasOrId: string, modelId: string): string {
  const found = findModelEntry(aliasOrId, modelId);
  return found?.name || modelId;
}

export function getModelTargetFormat(aliasOrId: string, modelId: string): string | null {
  const found = findModelEntry(aliasOrId, modelId);
  return found?.targetFormat || null;
}

export function getModelsByProviderId(providerId: string): RegistryModel[] {
  const alias = PROVIDER_ID_TO_ALIAS[providerId] || providerId;
  return PROVIDER_MODELS[alias] || [];
}
