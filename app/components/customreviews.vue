<template>
    <div class="min-h-screen bg-background">
        <section class="py-16 md:py-24 px-4">
            <div class="max-w-4xl mx-auto">

                <h2 class="text-2xl md:text-3xl font-bold text-secondary mb-10">
                    {{ $t('reviewsSection.heading') }}
                </h2>

                <div class="divide-y divide-border">
                    <!-- Iterating over the local reviews object -->
                    <div v-for="(r, key) in reviews" :key="key" class="py-6 flex gap-4 md:gap-6">
                        <!-- Avatar -->
                        <div class="w-14 h-14 rounded-full bg-muted-foreground/20 flex-shrink-0" />

                        <!-- Left -->
                        <div class="flex-shrink-0 w-36 md:w-44">

                            <!-- Stars (Ratings usually stay as numbers in code) -->
                            <div class="flex gap-0.5 mb-1">
                                <Star v-for="j in 5" :key="j" class="w-3.5 h-3.5" :class="j <= r.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-muted-foreground/30'" fill="currentColor" />
                            </div>

                            <!-- Name -->
                            <div class="flex items-center gap-1.5">
                                <span class="text-sm font-semibold text-foreground">
                                    {{ r.name }}
                                </span>
                                <CheckCheck class="w-4 h-4 text-primary" />
                            </div>

                            <!-- Date -->
                            <p class="text-xs text-muted-foreground mt-0.5">
                                {{ r.date }}
                            </p>
                        </div>

                        <!-- Right -->
                        <div class="flex-1 min-w-0">
                            <h3 class="font-bold text-secondary text-sm md:text-base mb-1">
                                {{ r.title }}
                            </h3>
                            <p class="text-muted-foreground text-sm leading-relaxed">
                                {{ r.text }}
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    </div>
</template>

<script setup>
import { Star, CheckCheck } from "lucide-vue-next";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

// Pulling data from individual JSON keys into the component logic
const reviews = {
    rev1: {
        name: t('reviewsSection.items.rev1.name'),
        date: t('reviewsSection.items.rev1.date'),
        rating: 4, // Logic values like ratings usually stay in the script
        title: t('reviewsSection.items.rev1.title'),
        text: t('reviewsSection.items.rev1.text'),
    },
    rev2: {
        name: t('reviewsSection.items.rev2.name'),
        date: t('reviewsSection.items.rev2.date'),
        rating: 4,
        title: t('reviewsSection.items.rev2.title'),
        text: t('reviewsSection.items.rev2.text'),
    },
    rev3: {
        name: t('reviewsSection.items.rev3.name'),
        date: t('reviewsSection.items.rev3.date'),
        rating: 4,
        title: t('reviewsSection.items.rev3.title'),
        text: t('reviewsSection.items.rev3.text'),
    }
};
</script>