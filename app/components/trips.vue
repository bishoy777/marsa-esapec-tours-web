<script setup>

import {
    MapPin,
    Calendar,
    Building,
    Bus,
    Smartphone,
    Ship,
    Landmark,
    Star,
    CheckCircle,
} from "lucide-vue-next";
import { getItems } from "~/services/trips";
onMounted(() => {
    getTrips()
})
const data = ref(null)
const getTrips = async () => {
    try {
        const res = await getItems('trip')
        const trips = res.data?.data.filter(item => item.tripType?.id != 1);

        data.value = trips.slice(0, 3)

   
    } catch (err) { }
}

</script>
<template>
    <div class="min-h-screen bg-background">

        <!-- SERVICES -->
        <section class="py-10 px-4">
            <div class="max-w-6xl mx-auto">
                <h2 class="text-3xl md:text-4xl font-bold text-[#082852] text-center mb-4">
                    {{ $t('featuredTrips.title') }}
                </h2>

                <p class="text-[#999999] text-center max-w-xl mx-auto mb-12">
                    {{ $t('featuredTrips.subtitle') }}
                </p>
                
                <UiCardLoader v-if="!data" />
                
                <div class="grid md:grid-cols-3 gap-8" v-else>
                    <div v-for="(trip, index) in data" :key="index">
                        <UiTripCard :trip="trip" />
                    </div>
                </div>

                <div class="w-full text-center my-10">
                    <nuxt-link to="/trips"
                        class="font-medium rounded-xl text-center border border-[#082852] border-5 p-3">
                        {{ $t('featuredTrips.button') }}
                    </nuxt-link>
                </div>
            </div>
        </section>
    </div>
</template>