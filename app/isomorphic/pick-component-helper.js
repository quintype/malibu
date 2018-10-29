export function pickComponentHelper(components, loadChunk) {
  return {
    pickComponent: pickComponent,
    getChunkName: getChunkName
  }

  function pickComponent(pageType) {
    const { chunk, component } = components[pageType] || components['default'];
    return loadChunk[chunk]().then(chunk => chunk[component]);
  }

  function getChunkName(pageType) {
    const { chunk } = components[pageType] || components['default'];
    return chunk;
  }
}
