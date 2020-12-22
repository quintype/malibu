export function loadFormPageData(client, formSlug, next) {
  return client
    .request(`/api/v1/forms/${formSlug}`)
    .then(result => ({ form: result.data, cacheKeys: result.cacheKeys }))
    .catch(response => {
      return response.statusCode === 404 ? next() : Promise.reject(response);
    });
}
