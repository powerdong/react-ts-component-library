/*
 * @Author: Lambda
 * @Begin: 2020-06-02 08:45:35
 * @Update: 2020-06-02 09:09:45
 * @Update log: 更新日志
 */ 
test('should common matcher', () => {
  expect(2 + 2).toBe(4)
  expect(2 + 2).not.toBe(5)
})


test('should to be true of false', () => {
  expect(1).toBeTruthy()
  expect(0).toBeFalsy()
})


test('should number', () => {
  expect(4).toBeGreaterThan(3)
  expect(2).toBeLessThan(3)
})


test('should Object', () => {
  expect({name: 'lambda'}).toEqual({name : 'lambda'})
})
