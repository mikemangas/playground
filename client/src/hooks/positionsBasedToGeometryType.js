export function latBasedToGeometryType(playground) {
  return playground?.geometry?.type === "Point" &&
    playground?.geometry?.coordinates[1]
    ? `${playground?.geometry?.coordinates[1]}`
    : playground?.geometry?.type === "Polygon" &&
      playground?.geometry?.coordinates[0][1][1]
    ? `${playground?.geometry?.coordinates[0][1][1]}`
    : playground?.geometry?.type === "LineString" &&
      playground?.geometry?.coordinates[0][1]
    ? `${playground?.geometry?.coordinates[0][1]}`
    : playground?.geometry?.type === "MultiPolygon" &&
      playground?.geometry?.coordinates[0][0][0][1]
    ? `${playground?.geometry?.coordinates[0][0][0][1]}`
    : console.error(
        `problem in finding the playground coordinates: ${playground?._id}`
      );
}

export function lonBasedToGeometryType(playground) {
  return playground?.geometry?.type === "Point" &&
    playground?.geometry?.coordinates[0]
    ? `${playground?.geometry?.coordinates[0]}`
    : playground?.geometry?.type === "Polygon" &&
      playground?.geometry?.coordinates[0][1][0]
    ? `${playground?.geometry?.coordinates[0][1][0]}`
    : playground?.geometry?.type === "LineString" &&
      playground?.geometry?.coordinates[0][0]
    ? `${playground?.geometry?.coordinates[0][0]}`
    : playground?.geometry?.type === "MultiPolygon" &&
      playground?.geometry?.coordinates[0][0]
    ? `${playground?.geometry?.coordinates[0][0][0][0]}`
    : console.error(
        `problem in finding the playground coordinates: ${playground?._id}`
      );
}
