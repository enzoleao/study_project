// Mapeia os filtros para poder ser chamado inserido no where do FindMany
export const mappingFilters = (where, filters) => {
  for (const key in filters) {
    if (key !== 'page' && key !== 'perPage') {
      if (Array.isArray(filters[key])) {
        where[key] = {
          in: filters[key],
        };
      } else {
        where[key] = filters[key];
      }
    }
  }
  return where;
};
