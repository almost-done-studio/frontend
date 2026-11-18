import type { ReactNode } from 'react'
import { ASSETS } from '../constants/ASSETS'
import { V2_UI } from '../constants/V2_UI'
import styles from './page.module.css'

interface FolioScreenProps {
  titleId: string
  onReturn: () => void
  /** Sits in the painted arch: a portrait, or nothing on a text page. */
  ornament?: ReactNode
  children: ReactNode
}

export function FolioScreen({ titleId, onReturn, ornament, children }: FolioScreenProps) {
  return (
    <section className={`${styles.page} ${styles.folioArt}`} aria-labelledby={titleId}>
      <div className={styles.column}>
        <div className={styles.arch}>{ornament}</div>
        <div className={styles.sheet}>{children}</div>
      </div>
      <button type="button" className={styles.back} onClick={onReturn}>
        <img src={ASSETS.ui.characterSelect.arrowLeft} alt="" />
        <span>{V2_UI.returnLabel}</span>
      </button>
    </section>
  )
}

interface RibbonProps {
  label: string
  onClick: () => void
  disabled?: boolean
  className?: string
  ariaLabel?: string
}

export function Ribbon({ label, onClick, disabled = false, className, ariaLabel }: RibbonProps) {
  const classes = [styles.ribbonFace, styles.ribbon, className].filter(Boolean).join(' ')

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel ?? label}
    >
      {label}
    </button>
  )
}

interface ArrowButtonProps {
  direction: 'previous' | 'next'
  label: string
  onClick: () => void
}

export function ArrowButton({ direction, label, onClick }: ArrowButtonProps) {
  const src =
    direction === 'previous'
      ? ASSETS.ui.characterSelect.arrowLeft
      : ASSETS.ui.characterSelect.arrowRight

  return (
    <button type="button" className={styles.arrow} onClick={onClick} aria-label={label}>
      <img src={src} alt="" />
    </button>
  )
}

interface PortraitProps {
  src: string
  fit: 'bust' | 'fill'
  locked?: boolean
}

export function Portrait({ src, fit, locked = false }: PortraitProps) {
  const stageClass = locked ? `${styles.frame} ${styles.locked}` : styles.frame

  return (
    <div className={stageClass}>
      <div className={styles.backing} aria-hidden="true" />
      <img className={fit === 'bust' ? styles.bust : styles.fill} src={src} alt="" />
      <img className={styles.frameImg} src={ASSETS.ui.characterSelect.portraitFrame} alt="" />
    </div>
  )
}
