const timeout = 2500
const URL = 'http://localhost:3000'

const getTextarea = async (page) => page.$('textarea')
const getTextareaValue = async (page) => page.evaluate((element) => element.value, await getTextarea(page))
const getCommentBox = async (page) => page.$('#user-mentions')
const getCommentBoxChildren = async (page) => (await getCommentBox(page)).$$(':scope > *')

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

    it('03) type `hello how are you?`', async () => {
      const textarea = await getTextarea(page)
      await textarea.focus()

      const text = 'hello how are you?'
      await page.keyboard.type(text)

      const textareaValue = await getTextareaValue(page)
      expect(textareaValue).toBe(text)

      const commentBox = await getCommentBox(page)
      expect(commentBox).toBeNull()
    })

    it('04) type ` @`, click 1st', async () => {
      const textarea = await getTextarea(page)
      await textarea.focus()

      const text = ' @'
      await page.keyboard.type(text)

      const textareaValue = await getTextareaValue(page)
      expect(textareaValue).toBe(`hello how are you? @`)

      const commentBox = await getCommentBox(page)
      expect(commentBox).not.toBeNull()

      const children = await getCommentBoxChildren(page)
      expect(children.length).toBe(6)

      await children[0].click()
      const textareaValue2 = await getTextareaValue(page)
      expect(textareaValue2).toBe(`hello how are you? @pturner0 `)
    })

    it('05) type `@fre`, click 2nd', async () => {
      const textarea = await getTextarea(page)
      await textarea.focus()
      await page.keyboard.type(`@fre`)

      const textareaValue = await getTextareaValue(page)
      expect(textareaValue).toBe(`hello how are you? @pturner0 @fre`)

      const children = await getCommentBoxChildren(page)
      expect(children.length).toBe(2)

      await children[1].click()
      const textareaValue2 = await getTextareaValue(page)
      expect(textareaValue2).toBe(`hello how are you? @pturner0 @jferguson30 `)
    })

    it('06) delete jferguson30 , type mel, click 1st', async () => {
      const textarea = await getTextarea(page)
      textarea.selectionStart = 0

      await page.keyboard.press('Backspace')
      await page.keyboard.press('Backspace')
      await page.keyboard.press('Backspace')
      await page.keyboard.press('Backspace')
      await page.keyboard.press('Backspace')
      await page.keyboard.press('Backspace')
      await page.keyboard.press('Backspace')
      await page.keyboard.press('Backspace')
      await page.keyboard.press('Backspace')
      await page.keyboard.press('Backspace')
      await page.keyboard.press('Backspace')
      await page.keyboard.press('Backspace')

      const textareaValue = await getTextareaValue(page)
      expect(textareaValue).toBe(`hello how are you? @pturner0 @`)

      await page.keyboard.type(`mel`)
      const commentBox = await getCommentBox(page)
      expect(commentBox).not.toBeNull()

      const children = await getCommentBoxChildren(page)
      expect(children.length).toBe(4)

      await children[3].click()
      const textareaValue2 = await getTextareaValue(page)
      expect(textareaValue2).toBe(`hello how are you? @pturner0 @mmcdonald4i `)
    })
  },
  timeout
)
