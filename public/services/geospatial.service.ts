import { buffer, simplify } from '@turf/turf'
import { lineString } from '@turf/helpers'
import { Service } from 'typedi'
import { LatLngTuple } from 'leaflet'


@Service<GeospatialService>()
export class GeospatialService {
  lineToSegment = (coords: LatLngTuple[], tolerance: number) => {
    const polygon = lineString(coords)
    const simplified = simplify(polygon, { tolerance: 0.01, highQuality: false })
    const buff = buffer(simplified, tolerance, { units: 'kilometers', steps: 1 })
    const result = simplify(buff, { tolerance: 0.01, highQuality: false })

    return result.geometry?.coordinates[0] as LatLngTuple[]
  }

  isPointInsidePolygon = (point: LatLngTuple, polygon: LatLngTuple[]) => {
    const x = point[0], y = point[1]

    let inside = false
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0], yi = polygon[i][1]
      const xj = polygon[j][0], yj = polygon[j][1]

      const intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
      if (intersect) inside = !inside
    }

    return inside
  }

  distance = ([x1, y1]: LatLngTuple, [x2, y2]: LatLngTuple) => {
    let xs = x2 - x1, ys = y2 - y1

    xs *= xs
    ys *= ys

    return Math.sqrt(xs + ys)
  }
}
