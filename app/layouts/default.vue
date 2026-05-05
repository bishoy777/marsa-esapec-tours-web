<template>
    <nav class="flex items-center justify-between px-4 sm:px-8 lg:px-24 py-4 z-50 ">
        <!-- Logo -->
        <NuxtLink to="/"
            class="w-32 h-10 bg-muted rounded flex items-center justify-center text-muted-foreground text-sm">
            <Logo />
        </NuxtLink>

        <!-- Mobile: Hamburger -->
        <button @click="open = !open"
            class="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
            aria-label="Toggle menu" :aria-expanded="open">
            <svg v-if="!open" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

        <!-- Desktop Links -->
        <div class="hidden md:flex items-center gap-8">
            <NuxtLink to="/" class="text-foreground hover:text-secondary transition-colors"
                exact-active-class="text-secondary font-semibold border-b-2 border-secondary pb-1">
                {{ $t('nav.home') }}
            </NuxtLink>

            <NuxtLink to="/trips" class="text-foreground hover:text-secondary transition-colors"
                active-class="text-secondary font-semibold border-b-2 border-secondary pb-1">
                {{ $t('nav.trips') }}
            </NuxtLink>

            <NuxtLink to="/packages" class="text-foreground hover:text-secondary transition-colors"
                active-class="text-secondary font-semibold border-b-2 border-secondary pb-1">
                {{ $t('nav.packages') }}
            </NuxtLink>

            <NuxtLink to="/buildpackage" class="text-foreground hover:text-secondary transition-colors"
                active-class="text-secondary font-semibold border-b-2 border-secondary pb-1">
                {{ $t('nav.buildPackage') }}
            </NuxtLink>
            <NuxtLink to="/taxitransfer" class="text-foreground hover:text-secondary transition-colors"
                active-class="text-secondary font-semibold border-b-2 border-secondary pb-1">
                {{ $t('nav.taxiTransfers') }}
            </NuxtLink>
            <NuxtLink to="/simservices" class="text-foreground hover:text-secondary transition-colors"
                active-class="text-secondary font-semibold border-b-2 border-secondary pb-1">
                {{ $t('nav.simServices') }}
            </NuxtLink>
        </div>
        <!-- Desktop Right -->
        <div class="hidden md:flex items-center gap-4">
            <div class="relative">
                <button @click="showLocale = !showLocale" type="button"
                    class="flex items-center gap-2 border border-foreground rounded-full pl-3 pr-8 py-2 text-sm bg-transparent text-foreground cursor-pointer">
                    <component :is="currentLocale.flag" class="h-5 w-5" />
                    <span>{{ currentLocale.code.toUpperCase() }}</span>
                    <ChevronDown class="w-3 h-3 absolute right-3 pointer-events-none" />
                </button>

                <div v-if="showLocale"
                    class="absolute right-0 mt-2 min-w-[150px] rounded-xl border border-border bg-white shadow-lg overflow-hidden z-50">
                    <button v-for="item in locales" :key="item.code"
                        @click="changeLocale(item.code); showLocale = false"
                        class="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted">
                        <component :is="item.flag" class="h-5 w-5" />
                        <span>{{ item.code.toUpperCase() }}</span>
                    </button>
                </div>
            </div>

            <button
                class="border border-foreground rounded-full px-5 py-2 text-sm font-semibold text-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors">
                {{ $t('nav.getStarted') }}
            </button>
        </div>

        <!-- Mobile Menu (slide down) -->
        <transition name="slide-fade">
            <div v-show="open"
                class="md:hidden fixed z-50 bg-white top-14 mt-3 w-[calc(100%-2rem)] left-4 bg-surface rounded-xl shadow-xl p-5 border border-slate-100">
                <div class="flex flex-col gap-4">
                    <NuxtLink to="/" class="text-foreground transition-colors py-1"
                        exact-active-class="text-secondary font-bold border-b-2 border-secondary self-start"
                        @click="open = false">
                        {{ $t('nav.home') }}
                    </NuxtLink>

                    <NuxtLink to="/trips" class="text-foreground transition-colors py-1"
                        active-class="text-secondary font-bold border-b-2 border-secondary self-start"
                        @click="open = false">
                        {{ $t('nav.trips') }}
                    </NuxtLink>

                    <NuxtLink to="/packages" class="text-foreground transition-colors py-1"
                        active-class="text-secondary font-bold border-b-2 border-secondary self-start"
                        @click="open = false">
                        {{ $t('nav.packages') }}
                    </NuxtLink>

                    <NuxtLink to="/buildpackage" class="text-foreground transition-colors py-1"
                        active-class="text-secondary font-bold border-b-2 border-secondary self-start"
                        @click="open = false">
                        {{ $t('nav.buildPackage') }}
                    </NuxtLink>

                    <NuxtLink to="/taxitransfer" class="text-foreground transition-colors py-1"
                        active-class="text-secondary font-bold border-b-2 border-secondary self-start"
                        @click="open = false">
                        {{ $t('nav.taxiTransfers') }}
                    </NuxtLink>

                    <NuxtLink to="/simservices" class="text-foreground transition-colors py-1"
                        active-class="text-secondary font-bold border-b-2 border-secondary self-start"
                        @click="open = false">
                        {{ $t('nav.simServices') }}
                    </NuxtLink>

                    <!-- Bottom Actions -->
                    <div class="relative">
                        <button @click="showLocale = !showLocale" type="button"
                            class="flex items-center gap-2 border border-foreground rounded-full pl-3 pr-8 py-2 text-sm bg-transparent text-foreground cursor-pointer">
                            <component :is="currentLocale.flag" class="h-5 w-5" />
                            <span>{{ currentLocale.code.toUpperCase() }}</span>
                            <ChevronDown class="w-3 h-3 absolute right-3 pointer-events-none" />
                        </button>

                        <div v-if="showLocale"
                            class="absolute left-0 mt-2 min-w-[150px] rounded-xl border border-border bg-white shadow-lg overflow-hidden z-50">
                            <button v-for="item in locales" :key="item.code"
                                @click="changeLocale(item.code); showLocale = false"
                                class="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted">
                                <component :is="item.flag" class="h-5 w-5" />
                                <span>{{ item.code.toUpperCase() }}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </nav>
    <slot></slot>
    <!-- Footer -->
    <footer class="bg-background border-t border-border py-12 mt-10 px-4">
        <div class="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">

            <!-- Brand -->
            <div class="col-span-2 md:col-span-1 text-primary-foreground">
                <div
                    class="w-32 h-10 bg-muted rounded flex items-center justify-center text-muted-foreground text-sm mb-4">
                    <Logo />
                </div>

                <p class=" text-xs leading-relaxed mb-4">
                    {{ $t('footer.description') }}
                </p>

                <div class="flex gap-3">
                    <a href="https://www.facebook.com/share/1BtV7JnRvn/" target="_blank"
                        class="w-8 h-8 rounded-full border border-border flex items-center justify-center cursor-pointer hover:bg-muted">
                        <Facebook class="w-4 h-4" />
                    </a>

                    <a href="https://www.instagram.com/marsaescapetours?igsh=MTJlcmczMmhpdGNoaA==" target="_blank"
                        class="w-8 h-8 rounded-full border border-border flex items-center justify-center cursor-pointer hover:bg-muted">
                        <Instagram class="w-4 h-4" />
                    </a>
                </div>
            </div>

            <!-- Quick Links -->
            <div>
                <h4 class="font-semibold text-primary-foreground text-sm mb-4">{{ $t('footer.quickLinks') }}</h4>
                <ul class="space-y-2">
                    <li v-for="l in quickLinks" :key="l.name">
                        <NuxtLink :to="l.path" class="text-primary-foreground text-sm hover:text-foreground transition">
                            {{ l.name }}
                        </NuxtLink>
                    </li>
                </ul>
            </div>
            <div>
                <h4 class="font-semibold text-foreground text-sm mb-4">{{ $t('footer.services') }}</h4>
                <ul class="space-y-2">
                    <li v-for="l in services" :key="l.name">
                        <NuxtLink :to="l.path" class="text-primary-foreground text-sm hover:text-foreground transition">
                            {{ l.name }}
                        </NuxtLink>
                    </li>
                </ul>
            </div>


            <a href="https://wa.me/201055330883" target="_blank"
                class="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-lg hover:scale-110 transition">
                <whatsapp class="w-6 h-6 text-white" />
            </a>

            <!-- Support -->
            <div>
                <h4 class="font-semibold text-primary-foreground text-sm mb-4">{{ $t('footer.support') }}</h4>
                <ul class="space-y-2">
                    <li v-for="l in support" :key="l.name">
                        <NuxtLink :to="l.path" class="text-primary-foreground text-sm hover:text-foreground transition">
                            {{ l.name }}
                        </NuxtLink>
                    </li>
                </ul>
            </div>
            <!-- Contact -->
            <div>
                <h4 class="font-semibold text-primary-foreground text-sm mb-4">{{ $t('footer.contact') }}</h4>
                <ul class="space-y-3">
                    <li class="flex items-center gap-2 text-primary-foreground text-sm">
                        <MapPin class="w-4 h-4" /> {{ $t('footer.location') }}
                    </li>
                    <li class="flex items-center gap-2 text-primary-foreground text-sm">
                        <Phone class="w-4 h-4" /> <a href="https://wa.me/201055330883" target="_blank">+20 105 533
                            0883</a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="max-w-6xl mx-auto mt-10 pt-6 border-t border-border text-center">
            <p class="text-primary-foreground text-sm">{{ $t('footer.copyright') }}</p>
        </div>
    </footer>
</template>

<script setup>
import Logo from "@/assets/svgs/marsaescapelogo.svg";
import Facebook from "@/assets/svgs/facebook.svg"
import Instagram from "@/assets/svgs/instagram.svg"
import whatsapp from "@/assets/svgs/whatsapp.svg"
import { ref } from 'vue';
import { Globe, ChevronDown } from "lucide-vue-next";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const { locale, setLocale } = useI18n();
import Us from "@/assets/svgs/us.svg"
import Italy from "@/assets/svgs/italy.svg"
import Germany from "@/assets/svgs/germany.svg"
import Poland from "@/assets/svgs/poland.svg"
const changeLocale = async (code) => {
    await setLocale(code);
};
const open = ref(false);

const showLocale = ref(false);

const locales = [
    { code: "en", flag: Us },
    { code: "de", flag: Germany },
    { code: "pl", flag: Poland },
    { code: "it", flag: Italy }
];

const currentLocale = computed(() => {
    return locales.find(item => item.code === locale.value) || locales[0];
});


const quickLinks = computed(() => [
    { name: t('footer.links.home'), path: "/" },
    { name: t('footer.links.trips'), path: "/trips" },
    { name: t('footer.links.services'), path: "/#services" },
    { name: t('footer.links.packages'), path: "/packages" },
    { name: t('footer.links.plan_trip'), path: "/buildpackage" },
]);

const services = computed(() => [
    { name: t('footer.services.taxi'), path: "/taxitransfer" },
    { name: t('footer.services.sim'), path: "/simservices" },
]);

const support = computed(() => [
    { name: t('footer.support.faq'), path: "/#faqs" },
    { name: t('footer.support.reviews'), path: "/#reviews" },
]);

</script>

<style>
/* Optional simple transition */
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 200ms ease;
}

.slide-fade-enter-from {
    opacity: 0;
    transform: translateY(-6px);
}

.slide-fade-enter-to {
    opacity: 1;
    transform: translateY(0);
}

.slide-fade-leave-from {
    opacity: 1;
    transform: translateY(0);
}

.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}
</style>
