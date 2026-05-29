<template>
  <section id="pricing" class="py-16 md:py-24 lg:py-32 bg-bg">
    <UContainer>
      <div class="text-center max-w-48ch mx-auto mb-12 md:mb-16">
        <p class="eyebrow">
          Pricing
        </p>
        <h2 class="text-2xl md:text-3xl lg:text-4xl font-display font-normal leading-tight tracking-tight mb-3">
          Simple, Transparent Pricing That Scales With Your SKU Count.
        </h2>
        <p class="text-base md:text-lg text-muted leading-relaxed">
          No hidden fees. Start free and scale as you grow.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-400px md:max-w-none mx-auto md:mx-0">
        <UCard class="border border-ring hover:shadow-md transition-shadow relative" :ui="{ body: { padding: 'p-6 md:p-8' } }">
          <div class="font-display text-sm font-semibold mb-1">
            Starter
          </div>
          <div class="font-display text-3xl md:text-4xl font-normal tracking-tight mb-1">
            R2,500
          </div>
          <p class="text-sm text-muted mb-6">
            per month
          </p>
          <ul class="space-y-1.5 mb-8 list-none">
            <li class="flex items-start gap-2 text-sm md:text-base text-muted">
              <span class="text-success font-bold">✓</span>
              Up to 10 SKUs
            </li>
            <li class="flex items-start gap-2 text-sm md:text-base text-muted">
              <span class="text-success font-bold">✓</span>
              Basic emission tracking
            </li>
            <li class="flex items-start gap-2 text-sm md:text-base text-muted">
              <span class="text-success font-bold">✓</span>
              Systembolaget CSV export
            </li>
          </ul>
          <UButton to="#" variant="outline" block>
            Get Started
          </UButton>
        </UCard>
        <UCard class="border-2 border-accent shadow-[0_4px_24px_rgba(91,118,254,0.12)] hover:shadow-md transition-shadow relative" :ui="{ body: { padding: 'p-6 md:p-8' } }">
          <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white font-display text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
            Most Popular
          </div>
          <div class="font-display text-sm font-semibold mb-1">
            Professional
          </div>
          <div class="font-display text-3xl md:text-4xl font-normal tracking-tight mb-1">
            R7,500
          </div>
          <p class="text-sm text-muted mb-6">
            per month
          </p>
          <ul class="space-y-1.5 mb-8 list-none">
            <li class="flex items-start gap-2 text-sm md:text-base text-muted">
              <span class="text-success font-bold">✓</span>
              Up to 50 SKUs
            </li>
            <li class="flex items-start gap-2 text-sm md:text-base text-muted">
              <span class="text-success font-bold">✓</span>
              Full ISO 14067 compliance
            </li>
            <li class="flex items-start gap-2 text-sm md:text-base text-muted">
              <span class="text-success font-bold">✓</span>
              Audit trail documentation
            </li>
            <li class="flex items-start gap-2 text-sm md:text-base text-muted">
              <span class="text-success font-bold">✓</span>
              Priority support
            </li>
          </ul>
          <UButton to="#" block>
            Get Started
          </UButton>
        </UCard>
        <UCard class="border border-ring hover:shadow-md transition-shadow relative" :ui="{ body: { padding: 'p-6 md:p-8' } }">
          <div class="font-display text-sm font-semibold mb-1">
            Enterprise
          </div>
          <div class="font-display text-3xl md:text-4xl font-normal tracking-tight mb-1">
            Custom
          </div>
          <p class="text-sm text-muted mb-6">
            per month
          </p>
          <ul class="space-y-1.5 mb-8 list-none">
            <li class="flex items-start gap-2 text-sm md:text-base text-muted">
              <span class="text-success font-bold">✓</span>
              Unlimited SKUs
            </li>
            <li class="flex items-start gap-2 text-sm md:text-base text-muted">
              <span class="text-success font-bold">✓</span>
              Custom integrations
            </li>
            <li class="flex items-start gap-2 text-sm md:text-base text-muted">
              <span class="text-success font-bold">✓</span>
              Dedicated account manager
            </li>
          </ul>
          <UButton to="#" variant="outline" block>
            Contact Sales
          </UButton>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>
