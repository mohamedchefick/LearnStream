<script setup>
import Headers from '../Helper/Header/index.vue'
import hero from './hero.vue';
import recomadForYou from './recomadForYou.vue'
import footers from '../Helper/Footer/index.vue'
import { ref, watch } from 'vue';
import courses from './courses.vue';
import pathways from './pathways.vue'
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const activeTab = ref('cours')
const searchQuery = ref(route.query.q || '')
const selectedCategory = ref(route.query.category || '')

const handleSearch = (query) => {
  searchQuery.value = query
  updateURL()
}

const handleCategorySelect = (category) => {
  selectedCategory.value = category
  updateURL()
}

const updateURL = () => {
  const query = {}
  if (searchQuery.value) query.q = searchQuery.value
  if (selectedCategory.value) query.category = selectedCategory.value
  
  router.push({ query })
}
</script>

<template>
    <div class="">
        <Headers />
        <!--  -->
        <hero 
          @search="handleSearch"
          @categorySelect="handleCategorySelect"
        />
        <!--  -->
        <!-- <div class="flex justify-between items-center text-base font-semibold pt-10 px-6 sm:px-12 lg:px-24 xl:px-28">
            <div class="flex gap-20 items-center">
                <div class="flex gap-5">
                    <button 
                        @click="activeTab = 'cours'"
                        :class="[
                            'px-3 py-1 rounded-md transition-all duration-300',
                            activeTab === 'cours' 
                                ? 'bg-[#F4A002] text-white' 
                                : 'border border-[#F4A002] text-[#F4A002] hover:bg-[#F4A002] hover:text-white'
                        ]"
                    >
                        Cours
                    </button>
                    <button 
                        @click="activeTab = 'parcours'"
                        :class="[
                            'px-3 py-1 rounded-md transition-all duration-300',
                            activeTab === 'parcours' 
                                ? 'bg-[#F4A002] text-white' 
                                : 'border border-[#F4A002] text-[#F4A002] hover:bg-[#F4A002] hover:text-white'
                        ]"
                    >
                        Parcours
                    </button>
                </div>
            </div>
        </div> -->

        <courses 
          v-if="activeTab === 'cours'"
          :query="searchQuery"
          :category="selectedCategory"
        />
        <pathways 
          v-if="activeTab === 'parcours'"
          :query="searchQuery"
          :category="selectedCategory"
        />
        <!--  -->
        <!-- <recomadForYou /> -->
        <!--  -->
        <footers />
    </div>
</template>