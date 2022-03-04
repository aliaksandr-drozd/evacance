import { Service } from 'typedi'

import { UID_LOCALSTORAGE_KEY } from '../common/consts'


@Service<IDService>()
export class IDService {
  private readonly uid: string

  constructor() {
    let id: string | null = localStorage.getItem(UID_LOCALSTORAGE_KEY)

    if (!id) {
      id = this.createUid()

      localStorage.setItem(UID_LOCALSTORAGE_KEY, id)
    }

    this.uid = id
  }

  getUid = () => this.uid

  private createUid = () => String.fromCharCode(Math.floor(Math.random() * 26) + 97)
    + Math.random().toString(16).slice(2)
    + Date.now().toString(16).slice(4)

  collisionTest = (iterations = 1000000) => {
    let track = new Set();
    let count = -1;

    void console.time('Collision test')

    while (++count < iterations) {
      void track.add(this.createUid())
    }

    void console.timeEnd('Collision test')
    void console.log('Total iterations:', iterations)
    void console.log('Total collisions:', iterations - track.size)
    void console.log('Total unique ids:', track.size)
  }
}
