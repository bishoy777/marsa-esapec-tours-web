<template>
    <div>
        <div id="hero" class="relative w-full min-h-[500px] md:h-[70vh] overflow-hidden bg-secondary">

            <!-- Background Image -->
            <img :src="hero" alt="Hero Background" loading="eager"
                class=" inset-0 w-full h-64 object-cover object-center" />

            <!-- Original Overlay Color -->
            <div class="absolute inset-0 bg-secondary/80 animate-fade-in z-10"></div>

            <section class="relative  mb-8 z-20 w-full h-full flex items-center justify-center py-12 md:py-0">
                <div class="text-center px-4 max-w-4xl">

                    <!-- Main Heading: Original Colors -->
                    <h1
                        class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white opacity-0 animate-slide-up">
                        Discover <span class="text-blue-200">Unforgettable</span> Adventures In Marsa Alam & Beyond
                    </h1>

                    <!-- Subtext: Original Style -->
                    <p class="text-base md:text-lg mb-8 max-w-xl mx-auto text-white opacity-0 animate-slide-up-delayed">
                        Pack your bags and let us redefine your travel experience. Where every journey is a story
                        waiting to be told.
                    </p>

                    <!-- Button: Original Style -->
                    <div class="opacity-0 animate-pop-in mb-8">
                        <button @click="router.push('/trips')"
                            class="group bg-white text-[#082852] font-semibold px-8 py-3 rounded-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300 text-base flex items-center gap-2 mx-auto">
                            Explore Trips
                            <span class="inline-block transform group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </div>
                </div>
            </section>
        </div>
        <about />
        <trips />
        <services />
        <package />
        <reviews />
        <faqs />
    </div>

</template>

<script setup>
import { Calendar, Users, Search, ChevronDown, Globe, CheckCircle } from "lucide-vue-next";
import hero from "@/assets/images/camels-walking-each-other-diani-beach-kenya 1.png"

import { useRouter } from "vue-router";
const router = useRouter();
const features = [
    "All-in-one travel services",
    "Easy communication via WhatsApp",
    "Local experts you can trust",
    "Flexible cash payment",
];
</script>
<style scoped>
@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes popIn {
    0% {
        opacity: 0;
        transform: scale(0.9);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}

/* Custom Utility Classes */
.animate-slide-up {
    animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-slide-up-delayed {
    animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: 0.2s;
}

.animate-pop-in {
    animation: popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    animation-delay: 0.4s;
}

.animate-fade-in {
    animation: fadeIn 1.2s ease-out forwards;
}
</style>