/**
 * Mocking client-server processing
 */

const _cities = [
  {'id': 1, 'title': 'Berlin'},
  {'id': 2, 'title': 'Hamburg'},
  {'id': 3, 'title': 'Cologne'}
]

const _data = [
  {'id': 1, 'population': 100, 'year': 1990, 'city_id': 1},
  /* {'id': 2, 'population': 110, 'year': 2000, 'city_id': 1}, */
  {'id': 3, 'population': 115, 'year': 2010, 'city_id': 1},
  {'id': 4, 'population': 70, 'year': 1990, 'city_id': 2},
  {'id': 5, 'population': 75, 'year': 2000, 'city_id': 2},
  {'id': 6, 'population': 85, 'year': 2010, 'city_id': 2},
  {'id': 7, 'population': 75, 'year': 1990, 'city_id': 3},
  {'id': 8, 'population': 80, 'year': 2000, 'city_id': 3},
  {'id': 9, 'population': 85, 'year': 2010, 'city_id': 3}
]

export default {
  getCities (dc) {
    setTimeout(() => dc(_cities), 100)
  },

  getData (dc, currentCity) {
    setTimeout(() => dc(!currentCity.id ? _data : _data.filter(d => d.city_id === currentCity.id)), 100)
  }
}
