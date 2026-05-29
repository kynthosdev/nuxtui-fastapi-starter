<template>
  <section class="py-16 md:py-24 lg:py-32 bg-bg relative overflow-hidden">
    <div class="absolute -top-1/5 -right-1/10 w-150 h-150 bg-[radial-gradient(circle,rgba(91,118,254,0.06)_0%,transparent_70%)] pointer-events-none" />
    <UContainer>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div class="relative z-1">
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-display font-normal leading-tight tracking-tight mb-6 max-w-20ch">
            Don't Lose Your Systembolaget Market to Carbon Compliance.
          </h1>
          <p class="text-base md:text-lg text-muted leading-relaxed max-w-42ch mb-8">
            Turn mandatory 2026 carbon reporting from a threat into your competitive advantage. ISO 14067 compliance for South African beverage exporters—automated, auditable, done.
          </p>
          <div class="flex flex-wrap gap-3 mb-6">
            <UButton to="#" size="lg" class="font-display font-bold text-base">
              Start Free Trial
            </UButton>
            <UButton to="#solution" variant="outline" size="lg" class="font-display font-bold text-base">
              See How It Works
            </UButton>
          </div>
          <p class="text-sm text-muted flex items-center gap-2">
            <span class="inline-block w-2 h-2 bg-success rounded-full flex-shrink-0" />
            Join 80+ SA wine exporters preparing for 2026
          </p>
        </div>
        <div class="relative z-1 max-w-125 mx-auto md:mx-0">
          <UCard class="border border-ring shadow-sm">
            <template #header>
              <h3 class="font-display text-lg flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="9" stroke="var(--color-success)" stroke-width="2" />
                  <path d="M6 10l3 3 5-5" stroke="var(--color-success)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                Compliance Status — 2026 Ready
              </h3>
            </template>
            <div class="space-y-0">
              <div class="flex items-center justify-between py-2.5 border-b border-ring text-sm">
                <span>SKU #A102 — Chenin Blanc 2024</span>
                <span class="w-2 h-2 bg-success rounded-full flex-shrink-0" />
              </div>
              <div class="flex items-center justify-between py-2.5 border-b border-ring text-sm">
                <span>SKU #A103 — Pinotage Reserve</span>
                <span class="w-2 h-2 bg-success rounded-full flex-shrink-0" />
              </div>
              <div class="flex items-center justify-between py-2.5 border-b border-ring text-sm">
                <span>SKU #A104 — Methode Cap Classique</span>
                <span class="w-2 h-2 bg-[#f59e0b] rounded-full flex-shrink-0" />
              </div>
              <div class="flex items-center justify-between py-2.5 border-b border-ring text-sm">
                <span>Systembolaget CSV Export</span>
                <span class="w-2 h-2 bg-success rounded-full flex-shrink-0" />
              </div>
              <div class="flex items-center justify-between py-2.5 text-sm">
                <span>ISO 14067 Audit Trail</span>
                <span class="w-2 h-2 bg-success rounded-full flex-shrink-0" />
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </UContainer>
  </section>
</template>
