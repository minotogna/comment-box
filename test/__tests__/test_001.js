const timeout = 2500
const URL = 'http://localhost:3000'

const getTextarea = async (page) => page.$('textarea')
const getTextareaValue = async (page) => page.evaluate((element) => element.value, await getTextarea(page))
const getCommentBox = async (page) => (await getTextarea(page)).nextSibling

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

    it('02) textarea exists', async () => {
      const textarea = await getTextarea(page)
      expect(textarea).not.toBeNull()
    })

    it('03) type `hello how are you?` -> commentBox closed', async () => {
      const textarea = await getTextarea(page)
      await textarea.focus()

      const text = 'hello how are you?'
      await page.keyboard.type(text)

      const textareaValue = await getTextareaValue(page)
      expect(textareaValue).toBe(text)

      const commentBox = await getCommentBox(page)
      expect(commentBox).toBeUndefined()
    })
  },
  timeout
)
