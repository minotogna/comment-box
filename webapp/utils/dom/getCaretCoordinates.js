import { isFirefox } from './browserCheck'

/**
 * The properties that needs to be copied to the mirrored element.
 * Some browsers, such as Firefox, do not concatenate properties (padding-top, bottom etc.. -> padding).
 *
 * @type {string[]}
 */
const properties = [
  'boxSizing',
  'width', // on Chrome and IE, exclude the scrollbar, so the mirror div wraps exactly as the textarea does
  'height',
  'overflowX',
  'overflowY', // copy the scrollbar for IE

  'borderTopWidth',
  'borderRightWidth',
  'borderBottomWidth',
  'borderLeftWidth',

  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',

  // https://developer.mozilla.org/en-US/docs/Web/CSS/font
  'fontStyle',
  'fontVariant',
  'fontWeight',
  'fontStretch',
  'fontSize',
  'lineHeight',
  'fontFamily',

  'textAlign',
  'textTransform',
  'textIndent',
  'textDecoration', // might not make a difference, but better be safe

  'letterSpacing',
  'wordSpacing',
]

/**
 * Returns left and top coordinates for absolute positioning of an element within a given text input at a given selection point.
 *
 * Based on textarea-caret-position http://jsfiddle.net/dandv/aFPA7/.
 *
 * @param {Element} input - The input element to obtain coordinates for.
 * @param {number} selectionPoint - The selection point for the input.
 *
 * @returns {{left:number, top:number}} - The left and top coordinates.
 */
export const getCaretCoordinates = (input, selectionPoint) => {
  // create a mirror element that will be a clone of the input
  const elementMirrorId = `${input.nodeName}--mirror-div`
  let elementMirror = document.getElementById(elementMirrorId)
  if (!elementMirror) {
    elementMirror = document.createElement('div')
    elementMirror.id = elementMirrorId
    document.body.appendChild(elementMirror)
  }

  // set mirror element style
  const styleElementMirror = elementMirror.style
  const styleElementInput = window.getComputedStyle(input)

  // default textarea styles
  styleElementMirror.whiteSpace = 'pre-wrap'
  if (input.nodeName !== 'INPUT') styleElementMirror.wordWrap = 'break-word' // only for textarea-s

  // position off-screen
  styleElementMirror.position = 'absolute' // required to return coordinates properly
  styleElementMirror.top = `${input.offsetTop + parseInt(styleElementInput.borderTopWidth, 10)}px`
  styleElementMirror.left = '0px'
  styleElementMirror.visibility = 'hidden' // not 'display: none' because we want rendering

  // transfer the element's properties to the div
  properties.forEach(function (prop) {
    styleElementMirror[prop] = styleElementInput[prop]
  })

  if (isFirefox) {
    // Firefox adds 2 pixels to the padding - https://bugzilla.mozilla.org/show_bug.cgi?id=753662
    styleElementMirror.width = `${parseInt(styleElementInput.width, 10) - 2}px`
    // Firefox lies about the overflow property for textareas: https://bugzilla.mozilla.org/show_bug.cgi?id=984275
    if (input.scrollHeight > parseInt(styleElementInput.height, 10)) styleElementMirror.overflowY = 'scroll'
  } else {
    // for Chrome to not render a scrollbar; IE keeps overflowY = 'scroll'
    styleElementMirror.overflow = 'hidden'
  }

  elementMirror.textContent = input.value.substring(0, selectionPoint)
  // the second special handling for input type="text" vs textarea: spaces need to be replaced with non-breaking spaces - http://stackoverflow.com/a/13402035/1269037
  if (input.nodeName === 'INPUT') elementMirror.textContent = elementMirror.textContent.replace(/\s/g, '\u00a0')

  const span = document.createElement('span')
  // Wrapping must be replicated *exactly*, including when a long word gets
  // onto the next line, with whitespace at the end of the line before (#7).
  // The  *only* reliable way to do that is to copy the *entire* rest of the
  // textarea's content into the <span> created at the caret position.
  // for inputs, just '.' would be enough, but why bother?
  span.textContent = input.value.substring(selectionPoint) || '.' // || because a completely empty faux span doesn't render at all
  span.style.backgroundColor = 'lightgrey'
  elementMirror.appendChild(span)

  return {
    top: span.offsetTop + parseInt(styleElementInput.borderTopWidth, 10),
    left: span.offsetLeft + parseInt(styleElementInput.borderLeftWidth, 10),
  }
}
