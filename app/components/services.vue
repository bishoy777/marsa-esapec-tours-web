<template>
    <section class="px-4 py-12" id="services">
        <div class="max-w-6xl mx-auto">
            <!-- Header -->
            <div class="transition-all duration-1000 transform opacity-100 translate-y-0">
                <h2 class="text-3xl md:text-4xl font-bold text-primary-foreground text-center mb-4">
                    {{ $t('services_section.title') }}
                </h2>

                <p class="text-border text-center max-w-xl mx-auto mb-12">
                    {{ $t('services_section.subtitle') }}
                </p>
            </div>

            <div class="grid md:grid-cols-2 gap-8">
                <div v-for="(service, index) in services" :key="index" class="group flex flex-col lg:flex-row gap-6 bg-background border border-border rounded-2xl p-6 shadow-sm 
                    hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ease-out"
                    :style="{ transitionDelay: `${index * 100}ms` }">

                    <!-- Image -->
                    <div class="overflow-hidden rounded-xl shrink-0">
                        <img :src="service.img"
                            class="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                            alt="">
                    </div>

                    <div class="flex text-primary-foreground flex-col justify-center">
                        <h3
                            class="text-xl font-bold text-secondary mb-2 transition-colors duration-300 group-hover:text-primary">
                            {{ service.title }}
                        </h3>

                        <p class="text-sm mb-4 text-[#666666]">
                            {{ service.description }}
                        </p>

                        <ul class="space-y-2 mb-5">
                            <li v-for="(feature, i) in service.features" :key="i"
                                class="flex items-center gap-2 text-sm text-[#666666] transform transition-all duration-500 group-hover:translate-x-1"
                                :style="{ transitionDelay: `${i * 50}ms` }">
                                <CheckCircle class="w-4 h-4 text-primary animate-pulse" />
                                {{ feature }}
                            </li>
                        </ul>

                        <nuxt-link :to="service.to" class="bg-primary-danger text-white font-semibold px-5 py-2 rounded-lg text-sm w-fit 
                        hover:shadow-lg hover:scale-105 active:scale-95 
                       transition-all duration-300">
                            {{ $t('services_section.view_button') }}
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { CheckCircle } from "lucide-vue-next";
import taxitransfer from "@/assets/images/taxitransfer.png";
import simservices from "@/assets/images/simservices.png";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const services = computed(() => {
    return [
        {
            title: t('services_section.taxi_title'),
            description: t('services_section.taxi_desc'),
            img: taxitransfer,
            to: "/taxitransfer",
            features: [
                t('services_section.taxi_f1'),
                t('services_section.taxi_f2'),
                t('services_section.taxi_f3')
            ]
        },
        {
            title: t('services_section.sim_title'),
            description: t('services_section.sim_desc'),
            img: simservices,
            to: "/simservices",
            features: [
                t('services_section.sim_f1'),
                t('services_section.sim_f2'),
                t('services_section.sim_f3')
            ]
        },
    ]
});
</script>
<style scoped>
/* Ensuring smooth rendering of animated images */
img {
    backface-visibility: hidden;
    transform: translateZ(0);
}

/* Custom easing for the card lift */
.hover\:-translate-y-2:hover {
    transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>