export function loadFormPageData(client, formSlug) {
  return client.request(`/api/v1/forms/${formSlug}`).then(result => ({ form: result.data }));
}
