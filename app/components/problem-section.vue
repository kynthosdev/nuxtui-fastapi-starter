<template>
  <section id="problem" class="py-16 md:py-24 lg:py-32 bg-[#fafbfc]">
    <UContainer>
      <div class="max-w-48ch mb-12 md:mb-16">
        <p class="eyebrow">
          The Threat
        </p>
        <h2 class="text-2xl md:text-3xl lg:text-4xl font-display font-normal leading-tight tracking-tight mb-3">
          Your Highest-Margin Export Market Is About to Close.
        </h2>
        <p class="text-base md:text-lg text-muted leading-relaxed">
          Systembolaget's mandatory carbon reporting by 2026 isn't a suggestion—it's a requirement. Without ISO 14067-compliant lifecycle emission data per SKU, your wines and spirits simply won't reach Swedish shelves.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard class="border border-ring hover:shadow-md transition-shadow" :ui="{ body: { padding: 'p-6 md:p-8' } }">
          <div class="w-12 h-12 rounded-lg bg-red-surface flex items-center justify-center mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#ef4444" stroke-width="2" />
              <path d="M8 8l8 8M16 8l-8 8" stroke="#ef4444" stroke-width="2" stroke-linecap="round" />
            </svg>
          </div>
          <h3 class="font-display text-lg font-semibold mb-3">
            Fragmented Data
          </h3>
          <p class="text-sm md:text-base text-muted leading-relaxed">
            Chasing emission data across grape growers, bottlers, and logistics partners through endless WhatsApp messages and email threads.
          </p>
        </UCard>
        <UCard class="border border-ring hover:shadow-md transition-shadow" :ui="{ body: { padding: 'p-6 md:p-8' } }">
          <div class="w-12 h-12 rounded-lg bg-orange-light flex items-center justify-center mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="6" width="18" height="12" rx="2" stroke="#f59e0b" stroke-width="2" />
              <path d="M3 10h18" stroke="#f59e0b" stroke-width="2" />
            </svg>
          </div>
          <h3 class="font-display text-lg font-semibold mb-3">
            Expensive Consultants
          </h3>
          <p class="text-sm md:text-base text-muted leading-relaxed">
            Spending R150,000–R400,000 per product audit with no defensible audit trail and months of back-and-forth.
          </p>
        </UCard>
        <UCard class="border border-ring hover:shadow-md transition-shadow" :ui="{ body: { padding: 'p-6 md:p-8' } }">
          <div class="w-12 h-12 rounded-lg bg-coral-light flex items-center justify-center mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="4" width="16" height="16" rx="2" stroke="var(--color-coral-dark)" stroke-width="2" />
              <path d="M8 12h8M12 8v8" stroke="var(--color-coral-dark)" stroke-width="2" stroke-linecap="round" />
            </svg>
          </div>
          <h3 class="font-display text-lg font-semibold mb-3">
            Broken Processes
          </h3>
          <p class="text-sm md:text-base text-muted leading-relaxed">
            Manual spreadsheets that take 90+ days to complete, with no guarantee of compliance when the deadline arrives.
          </p>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>
