const timeout = 2500
const URL = 'http://localhost:3000'

describe(
  '/ (CommentBox)',
  () => {
    let page = null

    beforeAll(async () => {
      page = await global.__BROWSER__.newPage()
      await page.goto(URL, { waitUntil: 'networkidle2' })
    })

    afterAll(async () => {
      await page.close()
    })

    it('01) page load', async () => {
      const main = await page.$('#main')
      expect(main).not.toBeNull()
    })
  },
  timeout
)
