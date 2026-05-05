<template>
    <div class="min-h-screen bg-background">
        <div class="px-4 sm:px-8 lg:px-24 pt-8">
            <nav class="flex items-center gap-2 text-sm text-primary-foreground mb-8">
                <nuxt-link to="/" class="hover:text-foreground">
                    {{ $t('sim_page.breadcrumb.home') }}
                </nuxt-link>

                <ChevronRight class="w-4 h-4" />
                <span>{{ $t('sim_page.breadcrumb.services') }}</span>

                <ChevronRight class="w-4 h-4" />
                <span class="text-foreground font-medium">
                    {{ $t('sim_page.breadcrumb.taxi_transfer') }}
                </span>

                <ChevronRight class="w-4 h-4" />
                <span class="text-foreground font-medium">
                    {{ $t('sim_page.breadcrumb.booking_confirmation') }}
                </span>
            </nav>
        </div>
        <div class="max-w-4xl mx-auto px-4 pt-8">

            <!-- Breadcrumb -->

            <Transition name="fade-up" appear v-if="data">
                <div>
                    <!-- Success -->
                    <div class="flex flex-col items-center mb-8 py-10">
                        <div
                            class="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6 animate-pulse">
                            <CheckCircle class="w-12 h-12 text-green-500" />
                        </div>

                        <h1 class="text-2xl font-bold text-primary-foreground text mb-2">
                            {{ $t('sim_page.success_message.title') }}
                        </h1>

                        <p class="text-[#666666] text-sm text-center">
                            {{ $t('sim_page.success_message.description') }}
                        </p>
                    </div>
                    <!-- Summary -->

                    <div class="max-w-xl mx-auto border border-border rounded-lg p-6 mb-8">
                        <h2 class="font-bold text-primary-foreground mt-6 mb-3">
                            {{ $t("last") }}
                        </h2>
                        <div v-for="(row, i) in bookingInfo" :key="i"
                            class="flex justify-between py-2.5 border-b border-border last:border-b-0">
                            <span class="text-sm text-primary-foreground">
                                {{ row[0] }}
                            </span>
                            <span class="text-sm text-primary-foreground font-medium">
                                {{ row[1] }}
                            </span>
                        </div>
                        <div v-if="data.simCapacity">
                            <h2 class="font-bold text-primary-foreground mt-6 mb-3">
                                sim card included
                            </h2>
                            <div v-for="(row, i) in simInfo" :key="i"
                                class="flex justify-between py-2.5 border-b border-border last:border-b-0">
                                <span class="text-sm text-primary-foreground">
                                    {{ row[0] }}
                                </span>
                                <span class="text-sm text-primary-foreground font-medium">
                                    {{ row[1] }}
                                </span>
                            </div>
                        </div>
                        <!-- Total -->
                        <div class="flex justify-between mt-4 pt-2">
                            <span class="font-bold text-primary-foreground">{{ 'total' }}</span>
                            <span class="font-bold text-primary-foreground">{{ data.totalPrice }} €</span>
                        </div>
                    </div>
                </div>
            </Transition>
            <div v-else>
                <UiConfirmationLoader />
            </div>

            <!-- CTA -->
            <div class="flex justify-center pb-12">
                <nuxt-link to="/taxitransfer"
                    class="bg-primary-danger text-white px-8 py-3 rounded-full font-medium hover:bg-primary-danger/90 transition-colors">
                    {{ $t('taxi_page.success_message.book_another') }}
                </nuxt-link>
            </div>

        </div>
    </div>
</template>
<script setup>
import { CheckCircle, ChevronRight, Check } from "lucide-vue-next"
import { useRoute } from "vue-router"
import { getItems } from "~/services/trips"
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const route = useRoute()
const data = ref(null)

const transferPrice = ref()
const getTrips = async () => {
    const id = route.params.id

    try {
        const res = await getItems(`taxibooking/${id}`)
        data.value = res.data
        console.log(res.data)
        transferPrice.value = data.value.carType == 'Microbus' ? data.value.taxi?.HighSprice : data.value.taxi?.sedanPrice
    } catch (err) {
        console.error(err)
    }
}

/* ---------- Computed ---------- */


const bookingInfo = computed(() => {
    if (!data.value) return []

    return [
        [
            [t('taxi_page.summary.pickup_location'), data.value.taxi?.from],
            [t('taxi_page.summary.dropoff_location'), data.value.taxi?.to],
            [t('taxi_page.summary.date'), data.value.date],
            [t('taxi_page.summary.guest'), `${data.value.peopleCount} ${t('taxi_page.summary.guest_suffix')}`],
            [t('taxi_page.summary.room_flight'), data.value.flightroomNumber],
            [t('taxi_page.summary.phone'), data.value.phone],
            [t('taxi_page.summary.vehicle'), data.value.carType],
            [t('taxi_page.summary.price'), `${transferPrice.value} €`]
        ]


    ]
});
const simInfo = computed(() => {
    if (!data.value) return []

    return [
        [t('aa'), data.value.simCapacity],
        [t('bb'), data.value.simCards],
        [t('taxi_page.summary.price'), `${Number(data.value.totalPrice) - transferPrice.value} €`],

    ]
})

const totalPrice = computed(() => data.value?.trip?.price || 0)

onMounted(() => {
    getTrips()
})
</script>
<style scoped>
.fade-up-enter-active {
    transition: all 0.6s ease;
}

.fade-up-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

.fade-up-enter-to {
    opacity: 1;
    transform: translateY(0);
}
</style>