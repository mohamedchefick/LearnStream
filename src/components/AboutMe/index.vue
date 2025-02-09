<script setup>
import Headers from '../Helper/Header/index.vue'
import hero from './hero.vue';
import assignment from'./assignment.vue'
import whyWisoria from './whyWisoria.vue';
import vision from './vision.vue'
import ourValues from './ourValues.vue';
import hit from './hit.vue';
import team from './team.vue';
import join from './join.vue';
import fotter from '../Helper/Footer/index.vue'
</script>

<template>
    <div class="">
        <Headers />
    </div>
    <div class="">
        <hero />
        <assignment />
        <whyWisoria />
        <vision />
        <ourValues />
        <hit />
        <div class="">
            <team/>
            <div class="-mt-8 xl:-mt-10">
                <join/>
            </div>
        </div>
        <fotter />
    </div>
</template>