const expect = require('expect')
const $$observable = require('symbol-observable')
const rxhr = require('../src')
const baseUrl = '//localhost:8070'

describe('rxhr', () => {
  it('should export a function', done => {
    expect(typeof rxhr).toBe('function')
    let request = rxhr({
      method: 'get',
      url: baseUrl + '/json'
    })
    expect(typeof request[$$observable]).toBe('function')
    expect(typeof request[$$observable]()).toBe('object')
    const subscription = request.subscribe(
      res => {
        done()
      },
      err => {
        console.log(err)
        done()
      },
      () => {
        console.log('done')
      }
    )
    expect(typeof subscription.unsubscribe).toBe('function')
    // subscription.unsubscribe()
  })
})
