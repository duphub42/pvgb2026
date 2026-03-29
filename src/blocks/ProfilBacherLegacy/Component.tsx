'use client'

/**
 * Alte Seiten haben noch blockType `profilBacher` in der DB (ohne CMS-Felder).
 * Rendert dieselben Abschnitte wie die acht Profil-Blöcke – Inhalt kommt aus den Komponenten-Fallbacks (defaults.ts).
 */
import React from 'react'

import { ProfilCtaBandBlock } from '@/blocks/ProfilCtaBand/Component'
import { ProfilKernkompetenzBlock } from '@/blocks/ProfilKernkompetenz/Component'
import { ProfilKompetenzenBlock } from '@/blocks/ProfilKompetenzen/Component'
import { ProfilLangZertBlock } from '@/blocks/ProfilLangZert/Component'
import { ProfilToolsBlock } from '@/blocks/ProfilTools/Component'
import { ProfilUeberMichBlock } from '@/blocks/ProfilUeberMich/Component'
import { ProfilWerdegangBlock } from '@/blocks/ProfilWerdegang/Component'
import { ProfilZahlenFaktenBlock } from '@/blocks/ProfilZahlenFakten/Component'

type Props = { disableInnerContainer?: boolean }

export const ProfilBacherLegacyBlock: React.FC<Props> = ({ disableInnerContainer }) => (
  <>
    <ProfilUeberMichBlock blockType="profilUeberMich" disableInnerContainer={disableInnerContainer} />
    <ProfilKernkompetenzBlock blockType="profilKernkompetenz" disableInnerContainer={disableInnerContainer} />
    <ProfilKompetenzenBlock blockType="profilKompetenzen" disableInnerContainer={disableInnerContainer} />
    <ProfilWerdegangBlock blockType="profilWerdegang" disableInnerContainer={disableInnerContainer} />
    <ProfilZahlenFaktenBlock blockType="profilZahlenFakten" disableInnerContainer={disableInnerContainer} />
    <ProfilToolsBlock blockType="profilTools" disableInnerContainer={disableInnerContainer} />
    <ProfilLangZertBlock blockType="profilLangZert" disableInnerContainer={disableInnerContainer} />
    <ProfilCtaBandBlock blockType="profilCtaBand" disableInnerContainer={disableInnerContainer} />
  </>
)
