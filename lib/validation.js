export const ValidateText = (name, max) =>
  name.replace(/[^0-9a-zء-ي_)(+,.،-ًٌٍَُِّْ ]/gi, "").slice(0, max);
