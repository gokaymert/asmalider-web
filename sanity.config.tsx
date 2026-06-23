'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

function StudioLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '4px' }}>
      <img
        src="/images/logo.png"
        alt="Asmalıder Logo"
        style={{ width: '36px', height: '36px', objectFit: 'contain' }}
      />
      <span style={{ fontWeight: 'bold', fontSize: '16px', letterSpacing: '0.5px' }}>
        Asmalıder Yönetim Paneli
      </span>
    </div>
  )
}

export default defineConfig({
  title: 'Asmalı Derneği',
  basePath: '/studio',
  studio: {
    components: {
      logo: StudioLogo,
    },
  },
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
