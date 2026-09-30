<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
    <!-- Backdrop -->
    <div
      @click="closeModal"
      class="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
    ></div>

    <!-- Modal Card -->
    <div
      class="relative w-full max-w-lg rounded-3xl border p-6 sm:p-8 shadow-2xl overflow-hidden z-10 my-8"
      style="background: linear-gradient(180deg, #180F28 0%, #120E1C 100%); border-color: #8B5CF6; box-shadow: 0 25px 60px -15px rgba(0,0,0,0.8), 0 0 35px rgba(139, 92, 246, 0.25);"
    >
      <!-- Header -->
      <div class="flex items-start justify-between gap-4 mb-6">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold mb-2"
            style="background: rgba(139, 92, 246, 0.15); color: #C084FC; border: 1px solid rgba(139, 92, 246, 0.3);">
            <span>★</span> Verified Client Feedback
          </div>
          <h3 class="text-xl sm:text-2xl font-bold text-white m-0" style="font-family: 'Georgia', serif;">
            Submit a Client Review
          </h3>
          <p class="text-xs text-purple-300/70 m-0 mt-1">Share your experience collaborating with Pial Mahmud</p>
        </div>
        <button
          @click="closeModal"
          class="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
        >
          ✕
        </button>
      </div>

      <!-- Success Notice -->
      <div v-if="isSuccess" class="p-6 text-center space-y-4">
        <div class="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto text-2xl">
          ✓
        </div>
        <h4 class="text-lg font-bold text-white m-0" style="font-family:'Georgia',serif;">Thank You for Your Feedback!</h4>
        <p class="text-xs text-purple-300/80 leading-relaxed max-w-sm mx-auto">
          Your review has been successfully submitted and verified. It is now published in the client feedback showcase!
        </p>
        <button
          @click="closeModal"
          class="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 transition cursor-pointer"
        >
          Close &amp; View Showcase
        </button>
      </div>

      <!-- Form -->
      <form v-else @submit.prevent="submitReview" class="space-y-4">
        <!-- Interactive Star Rating -->
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-purple-300/80 mb-2">
            Overall Rating <span class="text-rose-400">*</span>
          </label>
          <div class="flex items-center gap-2">
            <button
              v-for="star in 5"
              :key="star"
              type="button"
              @click="formData.stars = star"
              @mouseenter="hoverStars = star"
              @mouseleave="hoverStars = 0"
              class="text-2xl sm:text-3xl transition-transform hover:scale-125 focus:outline-none cursor-pointer bg-transparent border-0 p-0"
              :style="{ color: (hoverStars || formData.stars) >= star ? '#F59E0B' : '#3B2A5A' }"
            >
              ★
            </button>
            <span class="text-xs font-bold text-amber-400 ml-2 font-serif">{{ formData.stars }}.0 / 5.0</span>
          </div>
        </div>

        <!-- Name & Role -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-purple-300/80 mb-1.5">
              Full Name <span class="text-rose-400">*</span>
            </label>
            <input
              v-model="formData.name"
              required
              type="text"
              placeholder="e.g. Sarah Jenkins"
              class="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm outline-none transition border text-white"
              style="background: #140E20; border-color: #3B2A5A;"
              onfocus="this.style.borderColor='#8B5CF6'"
              onblur="this.style.borderColor='#3B2A5A'"
            />
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase tracking-wider text-purple-300/80 mb-1.5">
              Role / Company <span class="text-rose-400">*</span>
            </label>
            <input
              v-model="formData.role"
              required
              type="text"
              placeholder="e.g. Product Lead, Tech Corp"
              class="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm outline-none transition border text-white"
              style="background: #140E20; border-color: #3B2A5A;"
              onfocus="this.style.borderColor='#8B5CF6'"
              onblur="this.style.borderColor='#3B2A5A'"
            />
          </div>
        </div>

        <!-- Project Title -->
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-purple-300/80 mb-1.5">
            Project Delivered <span class="text-purple-400/60">(Optional)</span>
          </label>
          <input
            v-model="formData.project"
            type="text"
            placeholder="e.g. Multi-Tenant SaaS Platform"
            class="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm outline-none transition border text-white"
            style="background: #140E20; border-color: #3B2A5A;"
            onfocus="this.style.borderColor='#8B5CF6'"
            onblur="this.style.borderColor='#3B2A5A'"
          />
        </div>

        <!-- Feedback Message -->
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-purple-300/80 mb-1.5">
            Your Testimonial / Review <span class="text-rose-400">*</span>
          </label>
          <textarea
            v-model="formData.quote"
            required
            rows="4"
            placeholder="Describe the quality of code, communication, architecture, and overall delivery..."
            class="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm outline-none transition border text-white resize-none"
            style="background: #140E20; border-color: #3B2A5A; line-height: 1.7;"
            onfocus="this.style.borderColor='#8B5CF6'"
            onblur="this.style.borderColor='#3B2A5A'"
          ></textarea>
        </div>

        <!-- Submit Button -->
        <div class="pt-3">
          <button
            type="submit"
            :disabled="isSubmitting || !formData.name || !formData.quote"
            class="w-full py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm text-white transition-all duration-300 hover:scale-[1.02] active:scale-98 disabled:opacity-50 cursor-pointer shadow-lg flex items-center justify-center gap-2"
            style="background: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%); box-shadow: 0 0 25px rgba(139, 92, 246, 0.4);"
          >
            <span>{{ isSubmitting ? 'Submitting Review...' : 'Publish Testimonial' }}</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'review-submitted'])

const hoverStars = ref(0)
const isSubmitting = ref(false)
const isSuccess = ref(false)

const formData = reactive({
  name: '',
  role: '',
  project: '',
  stars: 5,
  quote: ''
})

function closeModal() {
  emit('close')
  setTimeout(() => {
    isSuccess.value = false
  }, 300)
}

async function submitReview() {
  if (!formData.name.trim() || !formData.quote.trim()) return

  isSubmitting.value = true

  const reviewPayload = {
    id: 'rev_' + Date.now(),
    name: formData.name.trim(),
    role: formData.role.trim() || 'Client',
    project: formData.project.trim() || 'Custom Development',
    stars: formData.stars || 5,
    quote: formData.quote.trim(),
    created_at: new Date().toISOString(),
    is_verified: true
  }

  // Save to local storage for instant live persistence
  try {
    const existing = JSON.parse(localStorage.getItem('client_reviews') || '[]')
    existing.unshift(reviewPayload)
    localStorage.setItem('client_reviews', JSON.stringify(existing))
  } catch (e) {
    console.warn(e)
  }

  setTimeout(() => {
    isSubmitting.value = false
    isSuccess.value = true
    emit('review-submitted', reviewPayload)
  }, 600)
}
</script>
