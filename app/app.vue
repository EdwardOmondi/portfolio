<script setup lang="ts">
const colorMode = useColorMode()
const { footer, global } = useAppConfig()
const siteConfig = useSiteConfig()
const route = useRoute()

const color = computed(() =>
  colorMode.value === 'dark' ? '#020618' : 'white'
)

const canonicalUrl = computed(() => `${siteConfig.url}${route.path}`)

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'canonical', href: canonicalUrl }
  ],
  htmlAttrs: {
    lang: 'en'
  },
  script: [
    {
      key: 'schema-org-person',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': 'Edward Omondi',
        'url': siteConfig.url,
        'image': `${siteConfig.url}/images/edward-profile.png`,
        'jobTitle': 'Software Engineer',
        'description': siteConfig.description,
        'email': global.email,
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Nairobi',
          'addressCountry': 'KE'
        },
        'alumniOf': {
          '@type': 'CollegeOrUniversity',
          'name': 'Jomo Kenyatta University of Agriculture and Technology (JKUAT)'
        },
        'knowsAbout': [
          'Java', 'Spring Boot', 'Nuxt', 'Vue.js', 'Angular', 'TypeScript',
          'PostgreSQL', 'OAuth 2.0', 'Keycloak', 'Apache Artemis',
          'Kotlin', 'Swift', 'Flutter', 'Raspberry Pi', 'IoT', 'Solutions Architecture'
        ],
        'sameAs': footer?.links
          ?.map(link => link.to)
          .filter((to): to is string => typeof to === 'string' && to.startsWith('http'))
      })
    }
  ]
})

useSeoMeta({
  titleTemplate: '%s',
  ogUrl: canonicalUrl
})

const [{ data: navigation }, { data: files }] = await Promise.all([
  useAsyncData(
    'navigation',
    () => {
      return Promise.all([queryCollectionNavigation('blog')])
    },
    {
      transform: data => data.flat()
    }
  ),
  useLazyAsyncData(
    'search',
    () => {
      return Promise.all([queryCollectionSearchSections('blog')])
    },
    {
      server: false,
      transform: data => data.flat()
    }
  )
])
</script>

<template>
  <UApp>
    <NuxtLayout>
      <UMain class="relative">
        <NuxtPage />
      </UMain>
    </NuxtLayout>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
        shortcut="meta_k"
        :links="navLinks"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </UApp>
</template>
