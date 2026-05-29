<template>
  <section id="solution" class="py-16 md:py-24 lg:py-32 bg-bg">
    <UContainer>
      <div class="max-w-48ch mb-12 md:mb-16">
        <p class="eyebrow">
          The Solution
        </p>
        <h2 class="text-2xl md:text-3xl lg:text-4xl font-display font-normal leading-tight tracking-tight mb-3">
          The Carbon Compliance Operating System Built for South African Exporters.
        </h2>
        <p class="text-base md:text-lg text-muted leading-relaxed">
          We've mapped the entire compliance workflow into one platform. From vineyard to Swedish shelf—fully automated, fully auditable.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UCard class="border border-ring hover:shadow-md hover:border-accent transition-all" :ui="{ body: { padding: 'p-6 md:p-8' } }">
          <p class="font-display text-sm font-semibold text-accent mb-2">
            01
          </p>
          <h3 class="font-display text-lg font-semibold mb-3">
            Visual Supply Chain Builder
          </h3>
          <p class="text-sm md:text-base text-muted leading-relaxed">
            Map your entire upstream chain (Vineyard → Winery → Bottler → Logistics) with drag-drop nodes. See your carbon footprint visually, identify hotspots instantly.
          </p>
        </UCard>
        <UCard class="border border-ring hover:shadow-md hover:border-accent transition-all" :ui="{ body: { padding: 'p-6 md:p-8' } }">
          <p class="font-display text-sm font-semibold text-teal-dark mb-2">
            02
          </p>
          <h3 class="font-display text-lg font-semibold mb-3">
            Guided Data Collection
          </h3>
          <p class="text-sm md:text-base text-muted leading-relaxed">
            English and Afrikaans wizards that walk contributors through cultivation, production, packaging, and transport data—no technical expertise required.
          </p>
        </UCard>
        <UCard class="border border-ring hover:shadow-md hover:border-accent transition-all" :ui="{ body: { padding: 'p-6 md:p-8' } }">
          <p class="font-display text-sm font-semibold text-[#746019] mb-2">
            03
          </p>
          <h3 class="font-display text-lg font-semibold mb-3">
            SA-Localized Calculations
          </h3>
          <p class="text-sm md:text-base text-muted leading-relaxed">
            Proprietary emission factor library with Eskom grid data, SAWIS practice data, and route-specific ocean freight calculations (Cape Town → Northern Europe).
          </p>
        </UCard>
        <UCard class="border border-ring hover:shadow-md hover:border-accent transition-all" :ui="{ body: { padding: 'p-6 md:p-8' } }">
          <p class="font-display text-sm font-semibold text-coral-dark mb-2">
            04
          </p>
          <h3 class="font-display text-lg font-semibold mb-3">
            One-Click Export
          </h3>
          <p class="text-sm md:text-base text-muted leading-relaxed">
            Generate Systembolaget/CarbonCloud-ready CSV reports and branded PDF reports with full verification trails. Audit-ready in seconds.
          </p>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>
