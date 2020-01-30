import * as Styles from '../styles'
import {FastIconType, SizeType} from './icon'
import {iconMeta, IconType} from './icon.constants-gen'
import './icon.css'

const Kb = {IconType}

// cache this so we don't mutate always
const fastMap = new Map<string, FastIconType>()
export function makeFastType(type: IconType): FastIconType {
  const maybe = fastMap.get(type)
  if (maybe) {
    return maybe
  }

  const fast: FastIconType = {isFast: true, type}
  fastMap.set(type, fast)
  return fast
}

export function defaultColor(type: IconType): string | null {
  switch (type) {
    case Kb.IconType.iconfont_crown_admin:
      return Styles.globalColors.black_35
    case Kb.IconType.iconfont_crown_owner:
      return Styles.globalColors.yellowDark
    case Kb.IconType.iconfont_proof_broken:
      return Styles.globalColors.red
    case Kb.IconType.iconfont_proof_pending:
      return Styles.globalColors.black_50
    case Kb.IconType.iconfont_close:
      return Styles.globalColors.black_20
    default:
      return null
  }
}

export function defaultHoverColor(type: IconType): string | null {
  switch (type) {
    case Kb.IconType.iconfont_proof_broken:
    case Kb.IconType.iconfont_proof_pending:
      return defaultColor(type)
    case Kb.IconType.iconfont_close:
      return Styles.globalColors.black_50
    default:
      return null
  }
}

export function typeExtension(type: IconType): string {
  return iconMeta[type].extension || 'png'
}

export function getImagesDir(type: IconType): string {
  return iconMeta[type].imagesDir || 'icons'
}

export function fontSize(type: IconType): {fontSize: number} | null {
  const meta = iconMeta[type]
  if (!meta) {
    throw new Error('Invalid icon type: ' + type)
  }

  const fontSize: number | null = meta.gridSize || null

  if (fontSize) {
    return {fontSize}
  } else {
    return null
  }
}

export function isValidIconType(inputType: string): inputType is IconType {
  let iconType: IconType = inputType as IconType
  return !!iconType && !!iconMeta[iconType]
}

export function typeToFontSize(sizeType: SizeType) {
  switch (sizeType) {
    case 'Huge':
      return Styles.isMobile ? 64 : 48
    case 'Bigger':
      return Styles.isMobile ? 48 : 36
    case 'Big':
      return Styles.isMobile ? 32 : 24
    case 'Default':
      return Styles.isMobile ? 20 : 16
    case 'Small':
      return Styles.isMobile ? 16 : 12
    case 'Tiny':
      return Styles.isMobile ? 10 : 8
  }
}

type MultMap = {
  [1]?: number
  [2]?: number
  [3]?: number
}

const multiKeys = [1, 2, 3] as const

const idealSizeMultMap: {[key: string]: MultMap} = {
  '128': {'1': 256, '2': 256, '3': 960},
  '16': {'1': 192, '2': 192, '3': 192},
  '32': {'1': 192, '2': 192, '3': 192},
  '48': {'1': 192, '2': 192, '3': 192},
  '64': {'1': 192, '2': 256, '3': 192},
  '96': {'1': 192, '2': 192, '3': 960},
}

const _getMultsMapCache: {[key: string]: MultMap} = {}
export function getMultsMap(imgMap: {[size: string]: any}, targetSize: number): MultMap {
  const ssizes = Object.keys(imgMap)

  if (!ssizes.length) {
    return {}
  }

  const sizeKey = targetSize + ']' + ssizes.join(':')
  if (_getMultsMapCache[sizeKey]) {
    return _getMultsMapCache[sizeKey] || {}
  }

  const sizes = ssizes.map(s => parseInt(s, 10)).sort((a: number, b: number) => a - b)

  const multsMap: MultMap = {
    [1]: undefined,
    [2]: undefined,
    [3]: undefined,
  }

  multiKeys.forEach(mult => {
    // find ideal size if it exist
    const level1 = idealSizeMultMap[String(targetSize)]
    if (level1) {
      const level2 = level1[mult]
      if (level2) {
        multsMap[mult] = level2
        return
      }
    }

    // fallback
    const ideal = mult * targetSize
    const size = sizes.find(size => size >= ideal)
    multsMap[mult] = size || sizes[sizes.length - 1]
  })

  _getMultsMapCache[sizeKey] = multsMap
  return multsMap
}

export function castPlatformStyles(styles: any) {
  return styles
}

function makePaddingStyles(): PaddingStyles {
  type Keys = keyof typeof Styles.globalMargins
  const keys = (Object.keys(Styles.globalMargins) as any) as Array<Keys>
  return keys.reduce<PaddingStyles>(
    (styles, paddingName) => ({
      ...styles,
      [paddingName]: {padding: Styles.globalMargins[paddingName]},
    }),
    {} as any
  )
}

type PaddingStyles = {
  [K in keyof typeof Styles.globalMargins]: Styles.StylesCrossPlatform
}
export const paddingStyles: PaddingStyles = makePaddingStyles()
