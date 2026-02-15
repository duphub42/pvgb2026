import * as migration_20260213_172621_initial from './20260213_172621_initial'
import * as migration_20260215_000000_hero_philipp_bacher from './20260215_000000_hero_philipp_bacher'
import * as migration_20260215_100000_header_logo from './20260215_100000_header_logo'

export const migrations = [
  {
    up: migration_20260213_172621_initial.up,
    down: migration_20260213_172621_initial.down,
    name: '20260213_172621_initial',
  },
  {
    up: migration_20260215_000000_hero_philipp_bacher.up,
    down: migration_20260215_000000_hero_philipp_bacher.down,
    name: '20260215_000000_hero_philipp_bacher',
  },
  {
    up: migration_20260215_100000_header_logo.up,
    down: migration_20260215_100000_header_logo.down,
    name: '20260215_100000_header_logo',
  },
]
