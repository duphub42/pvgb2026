import type { ComponentProps, FC } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { CMSLink } from '@/components/Link'
import { ArrowRight, Zap } from 'lucide-react'
import type { SitePage } from '@/payload-types'

type HeroStat = {
  value?: string | null
  label?: string | null
}

type CMSLinkProps = ComponentProps<typeof CMSLink>

type ProAthleteHeroType = SitePage['hero'] & {
  badge?: string | null
  stats?: HeroStat[] | null
}

export const ProAthleteHero: FC<ProAthleteHeroType> = ({
  badge,
  subheadline,
  headline,
  headlineLine1,
  headlineLine2,
  headlineLine3,
  description,
  links,
  stats,
}) => {
  const badgeText = badge || subheadline || undefined
  const headlineLines = headline
    ? headline.split('\n').filter(Boolean)
    : [headlineLine1, headlineLine2, headlineLine3].filter(
        (line): line is string => Boolean(line),
      )

  const ctaLinks = (links ?? [])
    .map((item) => item?.link)
    .filter(Boolean) as CMSLinkProps[]

  const primaryLink = ctaLinks[0]
  const secondaryLink = ctaLinks[1]

  return (
    <section className="relative w-full overflow-hidden bg-background min-h-screen flex flex-col transition-colors duration-500">
      <style jsx>{`
        @keyframes float-element {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-25px); }
        }
        .animate-float { animation: float-element 7s ease-in-out infinite; }
        .grid-mask {
          mask-image: radial-gradient(circle at center, black 100%, transparent 100%);
          -webkit-mask-image: radial-gradient(circle at center, black 100%, transparent 100%);
        }
      `}</style>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/bg-profile.png"
          alt=""
          fill
          className="object-cover opacity-100 dark:opacity-40 transition-opacity duration-700"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-200/50 via-zinc-300/30 to-slate-400/50 dark:from-zinc-950/90 dark:via-zinc-900/80 dark:to-black/90 mix-blend-multiply dark:mix-blend-normal" />
        <div className="absolute inset-0 grid-mask opacity-60 dark:opacity-30 transition-opacity">
          <Image
            src="/images/millimeter-paper.png"
            alt=""
            fill
            className="object-cover invert dark:invert-0 scale-105"
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row w-full min-h-screen">
        <div className="relative z-30 order-2 lg:order-1 w-full lg:w-1/2 flex flex-col justify-center px-6 py-16 lg:px-20 bg-white/40 dark:bg-zinc-900/70 backdrop-blur-3xl border-t lg:border-t-0 lg:border-r border-white/40 dark:border-white/10 shadow-2xl">
          <div className="max-w-xl mx-auto lg:mx-0">
            {badgeText ? (
              <Badge
                variant="outline"
                className="w-fit font-mono text-[10px] tracking-[0.2em] uppercase border-zinc-500 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 px-3 py-1.5 mb-8 bg-white/90 dark:bg-zinc-800/90 shadow-md"
              >
                <Zap className="w-3 h-3 mr-2 text-zinc-500 fill-zinc-500" />
                {badgeText}
              </Badge>
            ) : null}

            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.85] text-foreground mb-8 uppercase italic drop-shadow-sm">
              {headlineLines.length > 0 ? (
                headlineLines.map((line, index) => (
                  <span key={index}>
                    {line}
                    {index !== headlineLines.length - 1 ? <br /> : null}
                  </span>
                ))
              ) : (
                <>Unleash the<br />Mountain<br />Within.</>
              )}
            </h1>

            <p className="text-base lg:text-lg text-zinc-900 dark:text-zinc-100 mb-10 leading-relaxed max-w-[42ch] font-medium">
              {description ||
                'Engineered for elite performance at altitude. Our pro-grade gear system fuses cutting-edge materials science with biomechanical precision.'}
            </p>

            <div className="flex flex-wrap items-center gap-5 mb-12">
              {primaryLink ? (
                <CMSLink
                  {...primaryLink}
                  appearance="default"
                  className="h-14 px-10 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all flex items-center group shadow-xl"
                >
                  {primaryLink.label}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </CMSLink>
              ) : null}
              {secondaryLink ? (
                <CMSLink
                  {...secondaryLink}
                  appearance="link"
                  className="text-foreground font-bold underline decoration-zinc-500 dark:decoration-zinc-500 underline-offset-8 decoration-2 hover:decoration-foreground transition-all"
                >
                  {secondaryLink.label}
                </CMSLink>
              ) : null}
            </div>

            {stats && stats.length > 0 ? (
              <div className="flex flex-wrap gap-10 pt-8 border-t border-zinc-900/20 dark:border-white/20">
                {stats.map((stat, index) => (
                  <div key={`${stat.label || index}-${index}`}>
                    <div className="font-mono text-2xl font-bold text-foreground italic tracking-tighter">
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.2em] mt-1 font-bold">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="relative z-10 order-1 lg:order-2 w-full lg:w-[60%] h-[55vh] lg:h-auto flex items-center justify-center lg:-ml-[10%]">
          <div className="relative w-full h-full flex items-center justify-center overflow-visible">
            <div className="relative w-[130%] lg:w-[150%] h-full flex items-center justify-center translate-y-[15%] lg:translate-y-0 animate-float">
              <div className="absolute w-full h-auto opacity-60 dark:opacity-40 mix-blend-multiply dark:mix-blend-screen scale-110 pointer-events-none">
                <Image
                  src="/images/powderparty.png"
                  alt=""
                  width={1000}
                  height={600}
                  priority
                  className="w-full h-auto"
                />
              </div>
              <div className="relative w-full h-auto drop-shadow-[0_45px_45px_rgba(0,0,0,0.35)] dark:drop-shadow-[0_45px_45px_rgba(255,255,255,0.1)]">
                <Image
                  src="/images/skijump.png"
                  alt="Athlete"
                  width={1400}
                  height={1000}
                  className="object-contain w-full h-auto scale-110 lg:scale-[1.3] origin-bottom transition-transform duration-700"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full z-40 pointer-events-none">
        <svg viewBox="0 0 1440 200" className="w-full h-auto block" preserveAspectRatio="none">
          <path d="M0,160 C320,260 480,10 640,110 C800,210 1120,60 1440,160 L1440,200 L0,200 Z" className="fill-background opacity-20" />
          <path d="M0,140 C280,220 560,40 840,140 C1120,240 1260,100 1440,140 L1440,200 L0,200 Z" className="fill-background opacity-50" />
          <path d="M0,120 C360,220 720,20 1080,120 C1240,170 1360,140 1440,120 L1440,200 L0,200 Z" className="fill-background" />
        </svg>
      </div>
    </section>
  )
}
