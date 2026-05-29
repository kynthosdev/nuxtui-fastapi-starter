<template>
  <footer class="bg-[#fafbfc] border-t border-ring py-16 md:py-24 lg:py-32">
    <UContainer>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
        <div class="footer-brand">
          <NuxtLink to="/" class="font-display text-lg font-semibold text-fg no-underline">
            EmissioTrace
          </NuxtLink>
          <p class="text-sm text-muted mt-2 max-w-32ch leading-relaxed">
            Carbon compliance automation for South African beverage exporters targeting Systembolaget.
          </p>
        </div>
        <div class="footer-col">
          <h4 class="font-display text-sm font-semibold mb-2">
            Product
          </h4>
          <ul class="list-none m-0 p-0">
            <li class="mb-1.5">
              <NuxtLink to="#solution" class="text-sm text-muted no-underline hover:text-fg">
                Features
              </NuxtLink>
            </li>
            <li class="mb-1.5">
              <NuxtLink to="#pricing" class="text-sm text-muted no-underline hover:text-fg">
                Pricing
              </NuxtLink>
            </li>
            <li class="mb-1.5">
              <a href="#" class="text-sm text-muted no-underline hover:text-fg">Integrations</a>
            </li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 class="font-display text-sm font-semibold mb-2">
            Company
          </h4>
          <ul class="list-none m-0 p-0">
            <li class="mb-1.5">
              <a href="#" class="text-sm text-muted no-underline hover:text-fg">About</a>
            </li>
            <li class="mb-1.5">
              <a href="#" class="text-sm text-muted no-underline hover:text-fg">Contact</a>
            </li>
            <li class="mb-1.5">
              <a href="#" class="text-sm text-muted no-underline hover:text-fg">Blog</a>
            </li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 class="font-display text-sm font-semibold mb-2">
            Legal
          </h4>
          <ul class="list-none m-0 p-0">
            <li class="mb-1.5">
              <a href="#" class="text-sm text-muted no-underline hover:text-fg">Privacy</a>
            </li>
            <li class="mb-1.5">
              <a href="#" class="text-sm text-muted no-underline hover:text-fg">Terms</a>
            </li>
            <li class="mb-1.5">
              <a href="#" class="text-sm text-muted no-underline hover:text-fg">Compliance</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex items-center justify-between pt-4 border-t border-ring text-sm text-muted flex-wrap gap-2">
        <span>&copy; {{ new Date().getFullYear() }} EmissioTrace. All rights reserved.</span>
        <div class="flex gap-4">
          <a href="#" class="text-muted no-underline hover:text-fg">Privacy</a>
          <a href="#" class="text-muted no-underline hover:text-fg">Terms</a>
        </div>
      </div>
    </UContainer>
  </footer>
</template>
