<script setup lang="ts">
const isMobileMenuOpen = ref(false);
</script>

<template>
  <header class="sticky top-0 z-100 bg-bg/92 backdrop-blur-12 border-b border-ring">
    <UContainer>
      <div class="flex items-center justify-between py-3 gap-4">
        <NuxtLink to="/" class="font-display text-lg md:text-xl font-semibold text-fg no-underline tracking-tight">
          EmissioTrace
        </NuxtLink>
        <button
          class="md:hidden flex items-center justify-center w-9 h-9 border border-border rounded-lg"
          aria-label="Toggle menu"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="text-fg">
            <rect y="3" width="20" height="2" rx="1" fill="currentColor" />
            <rect y="9" width="20" height="2" rx="1" fill="currentColor" />
            <rect y="15" width="20" height="2" rx="1" fill="currentColor" />
          </svg>
        </button>
        <ul
          class="hidden md:flex items-center gap-4 lg:gap-8 list-none"
          :class="{ 'flex! flex-col absolute top-full left-0 right-0 bg-bg border-b border-ring p-4 gap-2!': isMobileMenuOpen }"
        >
          <li>
            <NuxtLink to="#solution" class="text-sm text-muted no-underline hover:text-fg">
              Product
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="#pricing" class="text-sm text-muted no-underline hover:text-fg">
              Pricing
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="#" class="text-sm text-muted no-underline hover:text-fg">
              About
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="#" class="text-sm text-muted no-underline hover:text-fg">
              Contact
            </NuxtLink>
          </li>
          <li class="md:ml-2">
            <UButton to="#" color="primary" size="sm" class="font-display font-bold">
              Request Demo
            </UButton>
          </li>
          <li><UColorModeSelect /></li>
        </ul>
      </div>
    </UContainer>
  </header>
</template>
