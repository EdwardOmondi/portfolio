<template>
  <section class="max-w-4xl mx-auto px-6 py-10 text-default font-sans">
    <!-- Header -->
    <header class="flex flex-col md:flex-row md:items-start md:justify-between border-b-2 border-primary pb-4 mb-6 gap-2">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-highlighted">
          Edward Omondi
        </h1>
        <p class="text-primary font-semibold mt-1">
          Software Engineer &middot; Full-Stack Developer &middot; Solutions Architect
        </p>
      </div>
      <div class="text-sm text-muted md:text-right leading-relaxed">
        <p>Nairobi, Kenya</p>
        <p>+254 701 088 334</p>
        <a
          href="mailto:ewomondi@gmail.com"
          class="hover:text-primary"
        >ewomondi@gmail.com</a><br>
        <a
          href="https://edwardomondi.github.io"
          target="_blank"
          class="hover:text-primary"
        >edwardomondi.github.io</a><br>
        <a
          href="https://linkedin.com/in/edwardomondi-6644b7a8"
          target="_blank"
          class="hover:text-primary"
        >LinkedIn</a>
        &middot;
        <a
          href="https://github.com/EdwardOmondi"
          target="_blank"
          class="hover:text-primary"
        >GitHub</a>
      </div>
    </header>

    <!-- Profile -->
    <h2 class="text-xs font-bold uppercase tracking-widest text-primary border-b border-muted pb-1 mb-3">
      Profile
    </h2>
    <p class="text-[15px] leading-relaxed text-default mb-6">
      Full-Stack Software Engineer and Solutions Architect with 5+ years of experience designing,
      building, and maintaining production web and mobile applications across the Java/Spring,
      Vue/Nuxt, and Angular ecosystems. Track record of taking products from prototype to production,
      co-founding and architecting two live SaaS platforms, and integrating secure authentication
      (OAuth 2.0 / Keycloak), event-driven architectures with Apache Artemis message queues,
      PostgreSQL databases, and CI/CD pipelines. Mechatronics engineering background enables
      end-to-end ownership of hardware-connected IoT systems (Raspberry Pi, RFID, microcontrollers).
    </p>

    <!-- Skills -->
    <h2 class="text-xs font-bold uppercase tracking-widest text-primary border-b border-muted pb-1 mb-3">
      Core Skills
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-2 mb-6">
      <div
        v-for="skill in skills"
        :key="skill.label"
        class="text-sm text-default"
      >
        <span class="font-semibold text-highlighted">{{ skill.label }}: </span>{{ skill.value }}
      </div>
    </div>

    <!-- Experience -->
    <h2 class="text-xs font-bold uppercase tracking-widest text-primary border-b border-muted pb-1 mb-3">
      Professional Experience
    </h2>
    <div class="space-y-5 mb-6">
      <div
        v-for="job in experience"
        :key="job.title + job.org"
      >
        <div class="flex flex-wrap items-baseline justify-between gap-x-3">
          <div>
            <span class="font-bold text-highlighted">{{ job.title }}</span> —
            <a
              v-if="job.link"
              :href="job.link"
              target="_blank"
              class="text-primary font-semibold hover:underline"
            >{{ job.org }}</a>
            <span
              v-else
              class="text-primary font-semibold"
            >{{ job.org }}</span>
          </div>
          <span class="text-xs text-muted whitespace-nowrap">{{ job.dates }}</span>
        </div>
        <ul class="list-disc list-inside text-sm text-default mt-1 space-y-0.5">
          <li
            v-for="(bullet, i) in job.bullets"
            :key="i"
          >
            {{ bullet }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Projects -->
    <h2 class="text-xs font-bold uppercase tracking-widest text-primary border-b border-muted pb-1 mb-3">
      Selected Projects
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <div
        v-for="project in projects"
        :key="project.name"
        class="border border-muted rounded-lg p-3"
      >
        <div class="flex items-baseline justify-between">
          <a
            v-if="project.link"
            :href="project.link"
            target="_blank"
            class="font-bold text-highlighted hover:text-primary"
          >{{ project.name }}</a>
          <span
            v-else
            class="font-bold text-highlighted"
          >{{ project.name }}</span>
          <span class="text-[11px] text-dimmed">{{ project.dates }}</span>
        </div>
        <div class="text-[11px] text-primary font-medium mb-1">
          {{ project.stack }}
        </div>
        <p class="text-sm text-muted">
          {{ project.desc }}
        </p>
      </div>
    </div>

    <!-- Certs + Education -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
      <div>
        <h2 class="text-xs font-bold uppercase tracking-widest text-primary border-b border-muted pb-1 mb-3">
          Certifications
        </h2>
        <ul class="list-disc list-inside text-sm text-default space-y-1">
          <li>Certified Ethical Hacker (CEH), EC-Council</li>
          <li>Intro to Cyber Security, Cisco</li>
        </ul>
      </div>
      <div>
        <h2 class="text-xs font-bold uppercase tracking-widest text-primary border-b border-muted pb-1 mb-3">
          Education
        </h2>
        <ul class="list-disc list-inside text-sm text-default space-y-1">
          <li>BSc. Mechatronics Engineering, JKUAT, Nairobi (2015–2021)</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * EdwardOmondiCV.vue
 * Drop-in CV section for a Nuxt 3 portfolio site.
 * Requires Tailwind CSS to be configured in the host project
 * (no other dependencies — pure data-driven template).
 *
 * Usage in a page/layout:
 *   <EdwardOmondiCV />
 */

const skills = [
  { label: 'Backend', value: 'Java, Spring Boot, Spring MVC, Jakarta EE, FastAPI' },
  { label: 'Frontend', value: 'Vue.js, Nuxt, Angular, Flutter' },
  { label: 'Mobile', value: 'Kotlin (Jetpack Compose), Swift (SwiftUI), Flutter' },
  { label: 'Databases', value: 'PostgreSQL, MySQL, Firebase' },
  { label: 'Security', value: 'OAuth 2.0, Keycloak, CEH Certified' },
  { label: 'Messaging / EDA', value: 'Apache Artemis, JMS, Message Queues, Async Processing' },
  { label: 'DevOps / Cloud', value: 'Linux, AWS, DigitalOcean, Docker, Kubernetes, Jenkins' },
  { label: 'Tools', value: 'Git, GitHub/GitLab, Figma' },
  { label: 'IoT / Embedded', value: 'Raspberry Pi, Microcontrollers, RFID' }
]

const experience = [
  {
    title: 'Software Engineer',
    org: 'Technovation Ventures Ltd',
    dates: 'Jul 2022 – Present',
    bullets: [
      'Design, build, and maintain full-stack web and mobile applications deployed across bare-metal and virtual Linux servers.',
      'Develop backend services in Java (Spring, Spring Boot, Jakarta EE) and frontends in Nuxt (Vue) and Angular.',
      'Build native mobile apps with Kotlin (Jetpack Compose) for Android and Swift (SwiftUI) for iOS.',
      'Implement secure authentication using Keycloak and OAuth 2.0 across multiple production applications.',
      'Architect event-driven components using Apache Artemis message queues to decouple services and handle asynchronous processing.',
      'Design automated CI/CD pipelines to standardize and speed up releases.'
    ]
  },
  {
    title: 'Software Architect & Co-Founder',
    org: 'Cardly',
    dates: 'May 2025 – Present',
    link: 'https://cardly.gift',
    bullets: [
      'Co-founded and architected Cardly, a Vue/Nuxt + Spring Boot SaaS platform for digital gift cards and vouchers.',
      'Designed an integrated loyalty program enabling businesses to reward and retain customers via points-based redemption.',
      'Implemented event-driven architecture using Apache Artemis queues to process point calculations, notifications, and transactions asynchronously.'
    ]
  },
  {
    title: 'Managing Director & Co-Founder',
    org: 'Aims',
    dates: 'May 2022 – Present',
    link: 'https://aims.homes',
    bullets: [
      'Co-founded Aims, an Angular + Spring Boot rental/property management platform integrated with a Raspberry Pi IoT controller for automated keyless entry.',
      'Built the Python controller service enabling secure, remote solenoid lock access for guests.',
      'Used Apache Artemis message queues to reliably relay lock/unlock events between the web platform and the Raspberry Pi controller, decoupling hardware communication from the core application.'
    ]
  },
  {
    title: 'Freelance Software Developer',
    org: 'Nairobi, Kenya',
    dates: 'Jan 2022 – Jul 2022',
    bullets: [
      'Delivered mobile and web apps to the Google Play Store using Flutter and Firebase, end-to-end from requirements to deployment.'
    ]
  },
  {
    title: 'Workshop Manager',
    org: 'DK Engineering Ltd',
    dates: 'Nov 2021 – May 2022',
    bullets: [
      'Maintained a 100% on-time delivery success rate across all completed jobs while managing workshop operations.'
    ]
  },
  {
    title: 'Technical Lead',
    org: 'Mulika Africa Solar Ltd',
    dates: 'Aug 2019 – Nov 2021',
    bullets: [
      'Designed solar PV and solar water heating systems; supervised installations and resolved inverter/system faults.'
    ]
  },
  {
    title: 'Trainer & Customer Service Representative',
    org: 'ITC Africa Kenya',
    dates: 'Jan 2019 – Jan 2021',
    bullets: [
      'Trained end users on system applications, including a successful rollout for the Chango crowdfunding platform; provided first-line technical support.'
    ]
  }
]

const projects = [
  {
    name: 'Funding Campaign Manager',
    dates: 'Apr – May 2026',
    stack: 'Nuxt + Spring Boot',
    desc: 'Campaign management & donation tracking web app.',
    link: 'https://churchprojects.rgchuruma.org'
  },
  {
    name: 'Herdwise',
    dates: 'Apr – May 2025',
    stack: 'Angular + Firebase',
    desc: 'Livestock data collection tool for agricultural offtakers.',
    link: 'https://herdwiseapp.web.app'
  },
  {
    name: 'Digital SMS',
    dates: 'Jan – Apr 2025',
    stack: 'Bulk Messaging Platform',
    desc: 'Bulk SMS platform for scaled outbound messaging in Mexico.'
  },
  {
    name: 'Kidsquad Points Scanning System',
    dates: 'Jan – May 2024',
    stack: 'RFID System',
    desc: 'RFID wearable-based points tracking for an entertainment venue.'
  }
]
</script>
