import { cn } from '@/utilities/ui'

type DecorativeSectionBackgroundProps = {
  variant?: 'topo-corner' | 'topo-band'
}

export function DecorativeSectionBackground({
  variant = 'topo-corner',
}: DecorativeSectionBackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn('section-decor section-decor--topo', `section-decor--${variant}`)}
    >
      <svg viewBox="0 0 720 520" preserveAspectRatio="none" focusable="false">
        <path d="M-40 384 C94 330 164 394 282 342 C394 293 444 198 570 204 C650 208 705 246 760 218" />
        <path d="M-36 330 C76 282 166 324 260 285 C372 238 420 144 552 148 C642 151 704 196 758 168" />
        <path d="M-28 274 C90 227 170 265 254 226 C350 182 416 96 536 96 C638 96 690 139 756 120" />
        <path d="M-20 218 C76 182 168 202 244 170 C342 129 394 54 514 48 C620 43 688 78 754 66" />
        <path d="M50 430 C146 390 208 430 300 390 C410 342 446 274 564 272 C642 270 700 296 762 276" />
        <path d="M104 476 C190 440 240 470 334 434 C438 394 486 334 600 334 C672 334 722 356 766 344" />
        <path d="M126 134 C198 112 235 136 296 110 C364 82 384 24 470 18 C548 12 600 38 642 28" />
        <path d="M202 508 C276 482 326 500 406 466 C498 427 534 388 630 390 C688 392 730 408 768 398" />
      </svg>
    </div>
  )
}
