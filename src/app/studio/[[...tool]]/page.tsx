import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export const dynamic = 'force-static'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Yönetim Paneli | Asmalıder',
  }
}

export { viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={config} />
}
