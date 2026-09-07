export function getBaseApiUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codespaceName && codespaceName.trim() !== '') {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}

export function buildApiUrl(resource) {
  const normalizedResource = resource.startsWith('/') ? resource.slice(1) : resource;
  return `${getBaseApiUrl()}/api/${normalizedResource}/`;
}
