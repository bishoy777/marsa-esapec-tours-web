<template>
    <div>
        <div id="hero" class=" w-full bg-hero bg-cover bg-no-repeat bg-center "
            :style="{ backgroundImage: `url(${simhero})` }">
            <section
                class="relative h-[70vh] min-h-[500px] text-white flex items-center justify-center overflow-hidden">
                <div class="absolute inset-0 bg-secondary/90"></div>
                <div class="relative z-10 text-center px-4 max-w-3xl animate-in slide-in-from-bottom-8 duration-700">
                    <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        {{ $t('sim_services.hero.title') }}
                    </h1>
                    <p class="text-lg md:text-xl ">
                        {{ $t('sim_services.hero.description') }}
                    </p>
                </div>
            </section>
        </div>
        <div class="min-h-screen bg-background">
            <div class="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
                <div class="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    <!-- LEFT -->
                    <div class="flex-1 min-w-0">
                        <h1 class="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                            {{ $t('sim_page.title') }}
                        </h1>

                        <div class="space-y-4 text-[#666666] text-sm md:text-base leading-relaxed mb-8">
                            <p>{{ $t('sim_page.description') }}</p>
                        </div>

                        <!-- Why Choose -->
                        <h2 class="text-xl md:text-2xl font-bold text-primary-foreground mb-4">
                            {{ $t('sim_page.sections.why_choose_title') }}
                        </h2>
                        <ul class="space-y-3 mb-8">
                            <li v-for="(item, i) in whyChoose" :key="i" class="flex items-center gap-3">
                                <div
                                    class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <component :is="item.icon" class="w-3.5 h-3.5 text-primary" />
                                </div>
                                <span class="text-[#666666] text-sm md:text-base">
                                    {{ item.text }}
                                </span>
                            </li>
                        </ul>

                        <!-- How to Book -->
                        <h2 class="text-xl md:text-2xl font-bold text-secondary mb-4">
                            {{ $t('sim_page.sections.how_it_works_title') }}
                        </h2>
                        <ul class="space-y-3 mb-10">
                            <li v-for="(item, i) in howToBook" :key="i" class="flex items-center gap-3">
                                <div
                                    class="w-7 h-7 rounded-full bg-primary-foreground/90 flex items-center justify-center shrink-0">
                                    <span class="text-white text-xs font-bold">
                                        {{ String(i + 1).padStart(2, '0') }}
                                    </span>
                                </div>
                                <span class="text-[#666666] text-sm md:text-base">
                                    {{ item }}
                                </span>
                            </li>
                        </ul>
                    </div>

                    <!-- RIGHT -->
                    <div class="lg:col-span-2">
                        <div class="bg-background rounded-2xl shadow-lg p-6 sticky top-8 text-primary-foreground">
                            <h3 class="text-xl font-bold text-primary-foreground mb-1">
                                {{ $t('sim_page.booking_card.header') }}
                            </h3>
                            <p class="mb-5">
                                <span class="text-primary-danger font-bold text-xl">
                                    {{ selectedSimPackagePrice * form.cardsCount }} €
                                </span>
                            </p>

                            <h4 class="text-primary-foreground font-bold mb-3">
                                {{ $t('sim_page.booking_card.customize_title') }}
                            </h4>

                            <!-- SIM Package Select -->
                            <div class="space-y-1.5 my-2">
                                <label
                                    class="text-[11px] font-bold uppercase tracking-wider text-muted-foreground ml-1">
                                    {{ $t('sim_page.booking_card.labels.sim_package') }}
                                </label>
                                <div class="relative">
                                    <select v-model="form.simPackage"
                                        class="w-full bg-white border border-border rounded-lg pl-4 pr-10 py-2.5 appearance-none focus:border-primary-danger focus:ring-2 focus:ring-primary-danger/10 outline-none text-sm font-medium transition-all">
                                        <option value="" disabled>{{
                                            $t('sim_page.booking_card.labels.sim_package_placeholder') }}</option>
                                        <option :value="item?.capacity" v-for="item in simPackges" :key="item.capacity">
                                            {{ item?.capacity }}
                                        </option>
                                    </select>
                                    <ChevronDown
                                        class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                                <p v-if="errors.simPackage" class="text-red-500 text-xs mt-1">{{ errors.simPackage }}
                                </p>
                            </div>

                            <!-- Cards Count -->
                            <label class="text-sm font-semibold mb-1 block">{{
                                $t('sim_page.booking_card.labels.cards_count') }}</label>
                            <div class="flex items-center gap-2 border rounded-lg px-4 py-3 mb-4">
                                <Users class="w-5 h-5" />
                                <input type="number" min="1" v-model="form.cardsCount"
                                    class="bg-transparent outline-none text-sm flex-1" />
                            </div>
                            <p v-if="errors.cardsCount" class="text-red-500 text-xs mt-1">{{ errors.cardsCount }}</p>

                            <h4 class="text-primary-foreground font-bold mb-3">{{
                                $t('sim_page.booking_card.delivery_title') }}</h4>

                            <!-- Delivery Location -->
                            <label class="text-sm font-semibold mb-1 block text-uppercase">{{
                                $t('sim_page.booking_card.labels.delivery_location') }}</label>
                            <div class="flex items-center gap-2 border rounded-lg px-4 py-3 mb-4">
                                <Hotel class="w-5 h-5" />
                                <input type="text" v-model="form.deliveryLocation"
                                    class="bg-transparent outline-none text-sm flex-1" />
                            </div>
                            <p v-if="errors.deliveryLocation" class="text-red-500 text-xs mt-1">{{
                                errors.deliveryLocation }}</p>

                            <!-- Date -->
                            <label class="text-sm font-semibold mb-1 block">{{ $t('sim_page.booking_card.labels.date')
                            }}</label>
                            <div class="flex items-center gap-2 border rounded-lg px-4 py-3 mb-4">
                                <Calendar class="w-5 h-5" />
                                <input type="date" v-model="form.date"
                                    class="bg-transparent outline-none text-sm flex-1" />
                            </div>
                            <p v-if="errors.date" class="text-red-500 text-xs mt-1">{{ errors.date }}</p>

                            <!-- Room/Flight -->
                            <label class="text-sm font-semibold mb-1 block">{{
                                $t('sim_page.booking_card.labels.room_flight') }}</label>
                            <div class="flex items-center gap-2 border rounded-lg px-4 py-3 mb-4">
                                <Hotel class="w-5 h-5" />
                                <input v-model="form.roomNumber" type="text"
                                    :placeholder="$t('sim_page.booking_card.placeholders.room_number')"
                                    class="bg-transparent outline-none text-sm flex-1" />
                            </div>
                            <p v-if="errors.roomNumber" class="text-red-500 text-xs mt-1">{{ errors.roomNumber }}</p>

                            <!-- Full Name -->
                            <label class="text-sm font-semibold mb-1 block">{{
                                $t('sim_page.booking_card.labels.full_name') }}</label>
                            <div class="flex items-center gap-2 border rounded-lg px-4 py-3 mb-4">
                                <User class="w-5 h-5" />
                                <input v-model="form.fullName" type="text"
                                    :placeholder="$t('sim_page.booking_card.placeholders.full_name')"
                                    class="bg-transparent outline-none text-sm flex-1" />
                            </div>
                            <p v-if="errors.fullName" class="text-red-500 text-xs mt-1">{{ errors.fullName }}</p>

                            <!-- WhatsApp -->
                            <label class="text-sm font-semibold mb-1 block">{{
                                $t('sim_page.booking_card.labels.whatsapp_number') }}</label>
                            <div class="flex items-center gap-2 border rounded-lg px-4 py-3 mb-4">
                                <MessageCircle class="w-5 h-5" />
                                <input v-model="form.phone" type="text"
                                    :placeholder="$t('sim_page.booking_card.placeholders.whatsapp')"
                                    class="bg-transparent outline-none text-sm flex-1" />
                            </div>
                            <p v-if="errors.phone" class="text-red-500 text-xs mt-1">{{ errors.phone }}</p>

                            <!-- Special Request -->
                            <label class="text-sm font-semibold mb-1 mt-2 block">{{
                                $t('sim_page.booking_card.labels.special_request') }}</label>
                            <textarea v-model="form.specialRequest"
                                class="w-full border rounded-lg px-4 py-3 mb-6 text-sm h-28 resize-none bg-transparent" />

                            <!-- Submit Button -->
                            <button @click="submit" :disabled="loading"
                                class="w-full bg-primary-danger text-white font-semibold py-3 rounded-full transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-90">
                                <svg v-if="loading" class="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4" />
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                </svg>
                                <span>
                                    {{ loading ? $t('sim_page.booking_card.button.loading') :
                                        $t('sim_page.booking_card.button.default') }}
                                </span>
                            </button>
                            <p class="text-[#666666] text-xs text-center mt-3">
                                {{ $t('sim_page.booking_card.footer_disclaimer') }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-background">
            <section class="max-w-7xl mx-auto px-4 md:px-6">
                <div class="max-w-7xl mx-auto">

                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 md:mb-10">
                        <h2 class="text-xl md:text-3xl font-bold text-primary-foreground">
                            {{ $t('footer.support.reviews') }}
                        </h2>
                        <button @click="router.push('/reviews/2')"
                            class="bg-primary-danger text-white px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-sm border border-white/10">
                            {{ $t('footer.write_review') }}
                        </button>
                    </div>

                    <div class="divide-y divide-border">

                        <div v-for="r in reviews" :key="r.id" class="py-6 flex flex-col md:flex-row gap-4 md:gap-6">

                            <!-- Avatar (Initials) -->
                            <div
                                class="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary-foreground  text-white flex items-center justify-center font-bold flex-shrink-0">
                                {{ r.userName?.trim()?.charAt(0)?.toUpperCase() || 'U' }}
                            </div>

                            <!-- Content -->
                            <div class="flex flex-col md:flex-row gap-3 md:gap-6 w-full">

                                <!-- Left -->
                                <div class="md:w-44 flex-shrink-0">

                                    <!-- Stars -->
                                    <div class="flex gap-0.5 mb-1">
                                        <Star v-for="j in 5" :key="j" class="w-3.5 h-3.5" :class="j <= r.rating
                                            ? 'text-yellow-400 fill-yellow-400'
                                            : 'text-muted-foreground/30'" />
                                    </div>

                                    <!-- Name -->
                                    <div class="flex items-center gap-1.5">
                                        <span class="text-sm font-semibold text-[#666666]">
                                            {{ r.userName }}
                                        </span>
                                    </div>
                                    <!-- Date -->
                                    <p class="text-xs text-muted-foreground mt-0.5">
                                        {{ r.date || t('Recently') }}
                                    </p>
                                </div>
                                <!-- Right -->
                                <div class="flex-1">
                                    <h3 class="font-bold text-primary-foreground text-sm md:text-base mb-1">
                                        {{ r.comment }}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <section class="py-16 md:py-12 px-4">
            <div class="max-w-7xl mx-auto px-4 md:px-6">
                <h2 class="text-2xl md:text-4xl font-bold text-primary-foreground  mb-12">
                    {{ $t('fags.title') }}
                </h2>
                <div class="space-y-4">
                    <div v-for="(faq, i) in faqs" :key="i"
                        class="border border-[#999999] rounded-xl transition-all duration-300">
                        <!-- Question -->
                        <div @click="toggle(i)"
                            class="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-muted/50">
                            <span class="text-foreground text-sm md:text-base font-medium">
                                {{ faq.question }}
                            </span>
                            <ChevronDown class="w-5 h-5 text-muted-foreground transition-transform duration-300"
                                :class="{ 'rotate-180': activeIndex === i }" />
                        </div>
                        <!-- Answer -->
                        <div v-show="activeIndex === i" class="px-6 pb-4 text-muted-foreground text-sm leading-relaxed">
                            {{ faq.answer }}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    </div>
</template>
<script setup lang="ts">
import simhero from "@/assets/images/simhero.png";
import { getItems } from "~/services/trips";
import { addItem } from "@/services/trips"
import {
    Users,
    Calendar as CalendarIcon,
    CarFront,
    Plane,
    IdCard,
    Hotel,
    ShieldCheck,
    CloudSnow,
    Clock3,
    User, Smartphone,
    ChevronDown, Star

} from "lucide-vue-next"
import { useToast } from "@/composables/useToast";
import { useRoute, useRouter } from "vue-router";
const router = useRouter()
const { addToast } = useToast();
const faqs = ref()
const activeIndex = ref();
const toggle = (index: number) => {
    activeIndex.value = activeIndex.value === index ? null : index;
};
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const simPackges = ref([
])
const reviews = ref([
])
const selectedSimPackagePrice = computed(() => {
    if (!form.simPackage || simPackges.value.length === 0) return 0;
    const selectedPackage = simPackges.value.find((item: any) => item.capacity === form.simPackage);
    return selectedPackage ? selectedPackage.price : 0;
})
const getTrips = async () => {

    try {
        const res2 = await getItems(`simcards`)
        simPackges.value = res2.data?.data.map((item: any) => ({
            capacity: item.capacity,
            price: item.price
        }))
        const res3 = await getItems(`simfaqs`);
        faqs.value = res3.data;
        const res4 = await getItems(`simcardreviews`);
        reviews.value = res4.data?.filter(
            (r: any) => r.status === 'accepted'
        )
    } catch (err) { }
}
onMounted(() => {
    getTrips()
})

const form = reactive({
    simPackage: "",
    cardsCount: 1,
    deliveryLocation: "",
    date: "",
    roomNumber: "",
    fullName: "",
    phone: "",
    price: 0,
    specialRequest: "",
});
const errors = reactive({
    simPackage: "",
    cardsCount: "",
    deliveryLocation: "",
    date: "",
    roomNumber: "",
    fullName: "",
    phone: "",
});
const loading = ref(false);
const validateForm = () => {
    let valid = true;

    // reset errors
    Object.keys(errors).forEach((key) => (errors[key] = ""));

    if (!form.simPackage) {
        errors.simPackage = t('errors.sim_package_required');
        valid = false;
    }

    if (!form.cardsCount || form.cardsCount < 1) {
        errors.cardsCount = t('errors.cards_count_min');
        valid = false;
    }

    if (!form.deliveryLocation) {
        errors.deliveryLocation = t('errors.delivery_location_required');
        valid = false;
    }

    if (!form.date) {
        errors.date = t('errors.date_required');
        valid = false;
    }

    if (!form.roomNumber) {
        errors.roomNumber = t('errors.room_number_required');
        valid = false;
    }

    if (!form.fullName) {
        errors.fullName = t('errors.full_name_required');
        valid = false;
    }

    if (!form.phone) {
        errors.phone = t('errors.phone_required');
        valid = false;
    }

    return valid;
};

const submit = async () => {
    if (!validateForm()) {
        addToast(t('validation.toast'), "error");

        return
    }
    ;

    loading.value = true;

    try {
        form.price = selectedSimPackagePrice.value * form.cardsCount;
        const payload = {
            ...form,
            roomNumber: Number(form.roomNumber), // 👈 match backend type
        };

        const res = await addItem("simreservation", payload);
        // success handling
        router.push(`/simservices/confirmations/${res.data?.id}`)
        // reset form (optional)
        Object.keys(form).forEach((key) => (form[key] = ""));
        form.cardsCount = 1;

    } catch (err) {
        console.error(err);
    } finally {
        loading.value = false;
    }
};
/* ---------- Static Data ---------- */
const whyChoose = computed(() => [
    { icon: Hotel, text: t('whyChoose.instant_activation') },
    { icon: ShieldCheck, text: t('whyChoose.easy_communication') },
    { icon: CloudSnow, text: t('whyChoose.fast_connection') },
    { icon: Clock3, text: t('whyChoose.reliable_service') }
]);

const howToBook = computed(() => [
    t('howToBook.step_1_online_request'),
    t('howToBook.step_2_delivery_location'),
    t('howToBook.step_3_receive_sim'),
    t('howToBook.step_4_start_using')
]);
</script>