<template>

    <div class="min-h-screen w-full bg-muted">
        <div class="px-4 sm:px-8 lg:px-24 pt-8">
            <nav class="flex items-center gap-2 text-sm text-primary-foreground mb-8">
                <nuxt-link to="/" class="hover:text-foreground">
                    {{ $t('breadcrumbs.home') }}
                </nuxt-link>
                <ChevronRight class="w-4 h-4" />
                <nuxt-link to="/trips" class="hover:text-foreground">
                    <span class="font-medium">{{ $t('breadcrumbs.all_trips') }}</span>
                </nuxt-link>
                <ChevronRight class="w-4 h-4" />
                <span class="text-foreground font-medium">
                    {{ data?.name }}
                </span>
            </nav>
        </div>
        <!-- Hero Image -->
        <div class="animate-in fade-in zoom-in duration-700 delay-300 fill-mode-both">
            <UiGallery :title="data?.name" :images="data?.images" />
        </div>
        <!-- Content -->
        <div class="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-5 gap-8">

            <!-- Left -->
            <div class="lg:col-span-3 space-y-8">

                <!-- Overview -->
                <div>
                    <h2 class="text-2xl font-bold text-primary-foreground mb-3">{{ $t('booking.Overview') }}</h2>
                    <p class="text-[#666666] leading-relaxed">
                        {{ data?.overview }}
                    </p>
                </div>

                <!-- Highlights -->
                <div>
                    <h2 class="text-2xl font-bold text-primary-foreground mb-4">{{ $t('booking.TourHighlights') }}</h2>

                    <ul class="space-y-3">
                        <li class="flex items-center gap-3 text-primary-foreground" v-for="p in data?.places">
                            <Landmark class="w-5 h-5 text-[#666666]" />
                            {{ p }}
                        </li>
                    </ul>
                </div>

                <!-- Itinerary -->
                <div>
                    <h2 class="text-2xl font-bold text-primary-foreground mb-6">{{ $t('booking.Itinerary') }}</h2>

                    <!-- Day 1 -->
                    <div class="flex gap-4 mb-8" v-for="(d, index) in data?.days">
                        <div class="flex flex-col items-center">
                            <div
                                class="w-8 h-8 rounded-full bg-[#5EA3D5] text-white flex items-center justify-center text-xs font-bold">
                                0 {{ ++index }}
                            </div>

                        </div>

                        <div>


                            <p class="font-semibold text-primary-foreground mb-1">{{ $t('booking.Morning') }}:</p>
                            <ul class="text-[#666666] mb-3 space-y-1 text-sm">
                                <li v-for="m in d?.morning">• {{ m }}</li>

                            </ul>

                            <p class="font-semibold text-primary-foreground italic mb-1">{{ $t('booking.Afternoon') }}:</p>
                            <ul class="text-[#666666] mb-3 space-y-1 text-sm">
                                <li v-for="f in d?.afternoon">• {{ f }}</li>

                            </ul>

                            <p class="font-semibold text-primary-foreground mb-1">{{ $t('booking.Evening') }}:</p>
                            <ul class="text-[#666666] mb-3 space-y-1 text-sm">
                                <li v-for="e in d?.evining">• {{ e }}</li>

                            </ul>
                        </div>
                    </div>
                    <div>
                        <!-- Included -->
                        <div>
                            <h2 class="text-2xl font-bold text-primary-foreground mb-4">{{ $t('booking.Included') }}</h2>
                            <ul class="space-y-3">
                                <li v-for="item in data?.included" :key="item"
                                    class="flex items-center gap-3 text-primary-foreground text-sm">
                                    <span
                                        class="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">
                                        <includeduicon />
                                    </span>
                                    {{ item }}
                                </li>
                            </ul>
                        </div>

                        <!-- Not Included -->
                        <div class="mt-8">
                            <h2 class="text-2xl font-bold text-primary-foreground mb-4">{{ $t('booking.NotIncluded') }}</h2>
                            <ul class="space-y-3">
                                <li v-for="item in data?.excluded" :key="item"
                                    class="flex items-center gap-3 text-primary-foreground text-sm">
                                    <span
                                        class="w-5 h-5 rounded-full bg-destructive/10 text-destructive flex items-center justify-center text-xs">
                                        <notincludeduicon />
                                    </span>
                                    {{ item }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right -->
            <div class="lg:col-span-2">
                <div class="bg-background text-primary-foreground rounded-2xl shadow-lg p-6 sticky top-8">

                    <h3 class="text-xl font-bold text-primary-foreground mb-1">
                        {{ $t('booking.title') }}
                    </h3>

                    <p class="mb-5">
                        <span class="text-[#666666]">{{ $t('booking.from') }} </span>
                        <span class="text-primary-danger font-bold text-xl">
                            €{{ data?.price }}
                        </span>
                        <span class="text-[#666666] text-sm"> {{ $t('booking.per_person') }}</span>
                    </p>

                    <h4 class="text-primary-foreground font-bold mb-3">{{ $t('booking.details_title') }}</h4>

                    <!-- Date -->
                    <label class="text-sm font-semibold mb-1 block">{{ $t('booking.date') }}</label>
                    <div class="flex items-center gap-2 border rounded-lg px-4 py-3 mb-4">
                        <Calendar class="w-5 h-5" />
                        <input type="date" v-model="form.date" class="bg-transparent outline-none text-sm flex-1" />
                    </div>
                    <p v-if="errors.date" class="text-red-500 text-xs mt-1">{{ errors.date }}</p>

                    <!-- Guests -->
                    <label class="text-sm font-semibold mb-1 block">{{ $t('booking.guests') }}</label>
                    <div class="flex items-center gap-2 border rounded-lg px-4 py-3 mb-4">
                        <Users class="w-5 h-5" />
                        <input type="number" min="1" v-model="form.peopleCount"
                            class="bg-transparent outline-none text-sm flex-1" />
                    </div>
                    <p v-if="errors.peopleCount" class="text-red-500 text-xs mt-1">{{ errors.peopleCount }}</p>

                    <!-- Hotel -->
                    <label class="text-sm font-semibold text-primary-foreground mb-1 block">{{ $t('booking.hotel')
                    }}</label>
                    <div class="flex items-center gap-2 border rounded-lg px-4 py-3 mb-4">
                        <Hotel class="w-5 h-5" />
                        <input v-model="form.hotel" type="text" :placeholder="$t('booking.hotel_placeholder')"
                            class="bg-transparent outline-none text-sm flex-1" />
                    </div>
                    <p v-if="errors.hotel" class="text-red-500 text-xs mt-1">{{ errors.hotel }}</p>

                    <!-- Room -->
                    <label class="text-sm font-semibold mb-1 block">{{ $t('booking.room') }}</label>
                    <div class="flex items-center gap-2 border rounded-lg px-4 py-3 mb-4">
                        <Phone class="w-5 h-5" />
                        <input v-model="form.roomNumber" type="number" :placeholder="$t('booking.room_placeholder')"
                            class="bg-transparent outline-none text-sm flex-1" />
                    </div>
                    <p v-if="errors.roomNumber" class="text-red-500 text-xs mt-1">{{ errors.roomNumber }}</p>

                    <!-- Name -->
                    <label class="text-sm font-semibold mb-1 block">{{ $t('booking.name') }}</label>
                    <div class="flex items-center gap-2 border rounded-lg px-4 py-3 mb-4">
                        <User class="w-5 h-5" />
                        <input v-model="form.name" type="text" :placeholder="$t('booking.name_placeholder')"
                            class="bg-transparent outline-none text-sm flex-1" />
                    </div>
                    <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>

                    <!-- WhatsApp -->
                    <label class="text-sm font-semibold mb-1 block">{{ $t('booking.whatsapp') }}</label>
                    <div class="flex items-center gap-2 border rounded-lg px-4 py-3 mb-4">
                        <MessageCircle class="w-5 h-5" />
                        <input v-model="form.phone" type="text" :placeholder="$t('booking.whatsapp_placeholder')"
                            class="bg-transparent outline-none text-sm flex-1" />
                    </div>
                    <p v-if="errors.phone" class="text-red-500 text-xs mt-1">{{ errors.phone }}</p>

                    <!-- Special Request -->
                    <label class="text-sm font-semibold mb-1 block">{{ $t('booking.special_request') }}</label>
                    <textarea v-model="form.specialRequest"
                        class="w-full border rounded-lg px-4 py-3 mb-6 text-sm h-28 resize-none bg-transparent" />

                    <!-- Total -->
                    <div class="text-center mb-4">
                        <p class="text-[#666666] font-bold">{{ $t('booking.total_price') }}</p>
                        <p class="text-primary-danger font-bold text-2xl">
                            €{{ data?.price * form?.peopleCount }}
                        </p>
                    </div>

                    <!-- Button -->
                    <button @click="submitBooking" :disabled="loading"
                        class="w-full bg-primary-danger text-white font-semibold py-3 rounded-full transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-90">
                        <svg v-if="loading" class="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>

                        <span>
                            {{ loading ? $t('booking.processing') : $t('booking.submit') }}
                        </span>
                    </button>

                    <p class="text-[#666666] text-xs text-center mt-3">
                        {{ $t('booking.disclaimer') }}
                    </p>

                </div>
            </div>
        </div>
        <div class="bg-background">
            <section class="py-12 md:py-20 px-4">
                <div class="max-w-7xl mx-auto">

                    <!-- Reviews Header -->
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 md:mb-10">
                        <h2 class="text-xl md:text-3xl font-bold text-primary-foreground">
                            {{ $t('reviews.title') }}
                        </h2>
                        <button @click="router.push(`/tripreview/${route.params.id}`)"
                            class="bg-primary-danger text-white px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-sm border border-white/10">
                            {{ $t('reviews.write_review') }}
                        </button>
                    </div>

                    <div class="divide-y divide-border">
                        <div v-for="r in data?.reviews.filter((r: any) => r.status === 'accepted')" :key="r.id"
                            class="py-6 flex flex-col md:flex-row gap-4 md:gap-6">

                            <!-- Avatar (Initials) -->
                            <div
                                class="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary-foreground text-white flex items-center justify-center font-bold flex-shrink-0">
                                {{ r.userName?.trim()?.charAt(0)?.toUpperCase() || $t('reviews.anonymous').charAt(0) }}
                            </div>

                            <!-- Content -->
                            <div class="flex flex-col md:flex-row gap-3 md:gap-6 w-full">
                                <!-- Left Info -->
                                <div class="md:w-44 flex-shrink-0">
                                    <!-- Stars -->
                                    <div class="flex gap-0.5 mb-1">
                                        <Star v-for="j in 5" :key="j" class="w-3.5 h-3.5"
                                            :class="j <= r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'" />
                                    </div>

                                    <!-- Name -->
                                    <div class="flex items-center gap-1.5">
                                        <span class="text-sm font-semibold text-[#666666]">
                                            {{ r.userName || $t('reviews.anonymous') }}
                                        </span>
                                    </div>

                                    <!-- Date -->
                                    <p class="text-xs text-muted-foreground mt-0.5">
                                        {{ r.date || $t('reviews.recently') }}
                                    </p>
                                </div>

                                <!-- Right Comment -->
                                <div class="flex-1">
                                    <h3 class="font-bold text-primary-foreground text-sm md:text-base mb-1">
                                        {{ r.comment }}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Related Tours Section -->
                    <div class="max-w-7xl mx-auto mt-12 md:mt-20">
                        <h2 class="text-xl md:text-3xl font-bold text-primary-foreground mb-4">
                            {{ $t('reviews.related_title') }}
                        </h2>

                        <UiCardLoader v-if="!data" />

                        <div class="grid md:grid-cols-3 gap-8" v-else>
                            <div v-for="(trip, index) in relatetTrips" :key="index">
                                <UiTripCard :trip="trip" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <section class="py-16 md:py-12 px-4">
            <div class="max-w-3xl mx-auto">
                <h2 class="text-2xl md:text-4xl font-bold text-primary-foreground  mb-12">
                    {{ $t('faqs.title') }}
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


<script setup>
import { Star, CheckCheck, ChevronDown } from "lucide-vue-next";
import { addItem } from "@/services/trips"
import { getItems } from "~/services/trips";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";


const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const loading = ref(false)
const activeIndex = ref();
const toggle = (index) => {
    activeIndex.value = activeIndex.value === index ? null : index;
};
onMounted(() => {
    getTrips()
})
const data = ref();
const form = reactive({
    date: '',
    peopleCount: 2,
    hotel: '',
    roomNumber: 143,
    name: '',
    phone: '',
    specialRequest: ''
});
const errors = reactive({
    date: '',
    peopleCount: '',
    hotel: '',
    roomNumber: '',
    name: '',
    phone: ''
});
const validateForm = () => {
    let isValid = true

    // Reset errors
    Object.keys(errors).forEach((key) => {
        errors[key] = ''
    })

    if (!form.date) {
        errors.date = t('validation.date_required')
        isValid = false
    }

    if (!form.peopleCount || form.peopleCount < 1) {
        errors.peopleCount = t('validation.guests_required')
        isValid = false
    }

    if (!form.hotel) {
        errors.hotel = t('validation.hotel_required')
        isValid = false
    }

    if (!form.roomNumber) {
        errors.roomNumber = t('validation.room_required')
        isValid = false
    }

    if (!form.name) {
        errors.name = t('validation.name_required')
        isValid = false
    }

    if (!form.phone) {
        errors.phone = t('validation.phone_required')
        isValid = false
    }

    return isValid
};
import { useToast } from "@/composables/useToast";
const { addToast } = useToast()
const submitBooking = async () => {
    console.log('Booking:', "payload")
    console.log(validateForm())
    if (!validateForm()) {
        addToast(t('validation.toast'), 'error')
        return
    } loading.value = true
    try {

        const payload = {
            tripId: +route.params?.id,
            ...form,

        }
        const res = await addItem('reservations', payload)
        router.push(`/trips/confirmations/${res.data?.id}`)


    } catch (er) {

    }
    finally {
        loading.value = false
    }

}
const relatetTrips = ref();
const faqs = ref()
const getTrips = async () => {
    const id = route.params.id
    try {
        const res = await getItems(`trip/${id}`)
        data.value = res.data
        const res2 = await getItems(`trip`)
        relatetTrips.value = res2.data?.data?.splice(0, 3);
        const res3 = await getItems(`faqs`);
        faqs.value = res3.data
    } catch (err) { }
}

import {
    Calendar,
    Users,
    Hotel,
    Phone,
    User,
    MessageCircle,
    Landmark,

} from "lucide-vue-next";
import includeduicon from "@/assets/svgs/included.svg";
import notincludeduicon from "@/assets/svgs/noincluded.svg";
</script>