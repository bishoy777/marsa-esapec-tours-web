<template>
    <div class="min-h-screen bg-background">
        <div class="max-w-2xl mx-auto px-4 py-16 md:py-24">
            <h1 class="text-2xl md:text-3xl font-bold text-primary-foreground text-center mb-2">
                {{ $t('review_page.title') }}
            </h1>

            <p class="text-[#666666] text-center mb-10">
                {{ $t('review_page.subtitle') }}
            </p>

            <div class="border border-[#999999] rounded-2xl p-6 md:p-8 space-y-6">
                <!-- Full Name -->
                <div>
                    <label class="text-sm font-semibold text-primary-foreground mb-2 block">
                        {{ $t('review_page.labels.full_name') }}
                    </label>

                    <div class="relative">
                        <User class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666]" />
                        <input v-model="fullName" type="text" :placeholder="$t('review_page.placeholders.full_name')"
                            class="w-full pl-9 pr-4 py-2.5 rounded-lg border border-[#999999] bg-background text-foreground placeholder:text-[#666666] text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                </div>

                <!-- Rating -->
                <div>
                    <label class="text-sm font-semibold text-primary-foreground mb-2 block">
                        {{ $t('review_page.labels.rating_question') }}
                    </label>

                    <div class="flex items-center gap-1">
                        <button v-for="star in 5" :key="star" type="button" class="focus:outline-none"
                            @mouseenter="hovered = star" @mouseleave="hovered = 0" @click="rating = star">
                            <Star :class="[
                                'w-6 h-6 transition-colors',
                                star <= (hovered || rating)
                                    ? 'fill-yellow-500 text-yellow-500'
                                    : 'fill-muted text-[#666666]/30'
                            ]" />
                        </button>

                        <span class="ml-2 text-sm text-[#666666]">
                            {{ $t(`review_page.rating_descriptions.${hovered || rating}`) }}
                        </span>
                    </div>
                </div>

                <!-- Review Text -->
                <div>
                    <label class="text-sm font-semibold text-primary-foreground mb-2 block">
                        {{ $t('review_page.labels.your_review') }}
                    </label>

                    <textarea v-model="review" rows="5" :placeholder="$t('review_page.placeholders.review_text')"
                        class="w-full px-4 py-3 rounded-lg border border-[#999999] bg-background text-foreground placeholder:text-[#666666] text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
                </div>

                <!-- Submit -->
                <button
                    class="w-full bg-primary-danger text-white font-semibold py-3.5 rounded-full hover:bg-primary-danger/90 transition-colors text-sm md:text-base"
                    @click="submitReview">
                    {{ $t('review_page.submit_button') }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { Star, User, ImagePlus } from "lucide-vue-next";
import { useToast } from "@/composables/useToast";

const ratingLabels = ["", "Poor", "Fair", "Average", "Good", "Excellent"];
import { useRoute } from "vue-router";
import { addItem } from "@/services/trips"
const { addToast } = useToast();
const route = useRoute();
const rating = ref(4);
const hovered = ref(0);
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const fullName = ref("");
const review = ref("");
const photos = ref([]);
const submitReview = async () => {
    const payload = {
        userName: fullName.value,
        rating: rating.value,
        comment: review.value
    };
    const url = route.params.id == 1 ? "/taxireviews" : "/simcardreviews";
  
    try {
        await addItem(url, payload);
        addToast(t('review_page.toasts.success'), "success");
        // Reset form
        fullName.value = "";
        rating.value = 4;
        review.value = "";
    } catch (error) {
        addToast(t('review_page.toasts.error'), "error");
    }


};
</script>