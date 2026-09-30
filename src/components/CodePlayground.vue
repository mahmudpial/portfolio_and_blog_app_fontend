<template>
  <div class="my-8 rounded-2xl border overflow-hidden shadow-2xl transition-all font-mono text-xs sm:text-sm"
    style="background: #0D0915; border-color: #3B2A5A; box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.7), 0 0 20px rgba(139, 92, 246, 0.15);"
  >
    <!-- Code Window Header / Toolbar -->
    <div class="px-4 py-3 border-b flex items-center justify-between flex-wrap gap-2"
      style="background: linear-gradient(135deg, #180F28 0%, #120E1C 100%); border-color: rgba(139, 92, 246, 0.2);"
    >
      <!-- Window Controls & File Tab -->
      <div class="flex items-center gap-3">
        <!-- Mac Window Dots -->
        <div class="flex items-center gap-1.5">
          <span class="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
          <span class="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
          <span class="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
        </div>

        <!-- Language Tabs -->
        <div class="flex items-center gap-1 ml-2">
          <button
            v-for="(snippet, index) in snippets"
            :key="snippet.lang"
            @click="activeTab = index"
            class="px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
            :style="activeTab === index
              ? 'background: rgba(139, 92, 246, 0.25); color: #C084FC; border: 1px solid rgba(139, 92, 246, 0.4);'
              : 'background: transparent; color: #94A3B8; border: 1px solid transparent;'"
          >
            <span class="w-2 h-2 rounded-full" :style="{ background: getLangColor(snippet.lang) }"></span>
            <span>{{ snippet.filename || snippet.lang }}</span>
          </button>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-2">
        <!-- Run / Preview Toggle -->
        <button
          v-if="hasLivePreview"
          @click="showPreview = !showPreview"
          class="px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
          :style="showPreview
            ? 'background: #10B981; color: white;'
            : 'background: rgba(16, 185, 129, 0.15); color: #34D399; border: 1px solid rgba(16, 185, 129, 0.3);'"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <span>{{ showPreview ? 'View Code' : 'Live Output' }}</span>
        </button>

        <!-- Copy Code Button -->
        <button
          @click="copyCurrentCode"
          class="px-2.5 py-1 rounded-lg text-xs font-semibold border transition hover:bg-white/10 flex items-center gap-1.5 cursor-pointer text-slate-300"
          :style="{ borderColor: copied ? '#10B981' : '#3B2A5A', color: copied ? '#34D399' : '#C9B9E8' }"
          title="Copy code to clipboard"
        >
          <svg v-if="!copied" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          <svg v-else class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
        </button>
      </div>
    </div>

    <!-- Code Block Body -->
    <div v-if="!showPreview" class="p-4 sm:p-5 overflow-x-auto relative">
      <pre class="m-0 leading-relaxed text-slate-200"><code v-html="highlightedCode"></code></pre>
    </div>

    <!-- Interactive Live Preview Box -->
    <div v-else class="p-5 bg-[#090610] border-t border-purple-900/30">
      <div class="p-4 rounded-xl border bg-black/40 border-purple-500/20 text-xs text-slate-300 space-y-3 font-sans">
        <div class="flex items-center justify-between pb-2 border-b border-white/10 text-[11px] font-semibold text-purple-300">
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Simulated Runtime Output</span>
          </span>
          <span class="font-mono text-emerald-400">200 OK • 18ms</span>
        </div>
        
        <!-- Live Preview Content -->
        <div v-if="currentSnippet.previewHtml" v-html="currentSnippet.previewHtml"></div>
        <pre v-else-if="currentSnippet.previewJson" class="text-emerald-300 font-mono text-xs overflow-x-auto p-3 rounded-lg bg-black/60">{{ currentSnippet.previewJson }}</pre>
        <div v-else class="text-purple-300/80 italic">No custom interactive output defined for this snippet.</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  snippets: {
    type: Array,
    default: () => [
      {
        lang: 'php',
        filename: 'TenantScopeMiddleware.php',
        code: `<?php

namespace App\\Http\\Middleware;

use Closure;
use Illuminate\\Http\\Request;
use App\\Models\\Tenant;

class TenantScopeMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $tenantId = $request->header('X-Tenant-ID') 
            ?? $request->user()?->tenant_id;

        if (!$tenantId || !Tenant::where('id', $tenantId)->exists()) {
            return response()->json([
                'error' => 'Unauthorized Tenant Domain',
                'status' => 403
            ], 403);
        }

        app()->instance('currentTenant', Tenant::find($tenantId));

        return $next($request);
    }
}`,
        previewJson: `{
  "success": true,
  "tenant": {
    "id": "tenant_8923a",
    "name": "Enterprise Healthcare Corp",
    "plan": "Enterprise Pro",
    "status": "active",
    "database_cluster": "aws-us-east-1"
  }
}`
      }
    ]
  }
})

const activeTab = ref(0)
const showPreview = ref(false)
const copied = ref(false)

const currentSnippet = computed(() => {
  return props.snippets[activeTab.value] || props.snippets[0]
})

const hasLivePreview = computed(() => {
  return !!(currentSnippet.value?.previewHtml || currentSnippet.value?.previewJson)
})

function getLangColor(lang) {
  const map = {
    php: '#8892BE',
    vue: '#42B883',
    javascript: '#F7DF1E',
    js: '#F7DF1E',
    sql: '#00758F',
    bash: '#4EAA25',
    json: '#F59E0B'
  }
  return map[lang?.toLowerCase()] || '#8B5CF6'
}

function copyCurrentCode() {
  if (!currentSnippet.value?.code) return
  navigator.clipboard.writeText(currentSnippet.value.code)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2200)
}

// Simple syntax highlighter for clean color presentation
const highlightedCode = computed(() => {
  const raw = currentSnippet.value?.code || ''
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/(\/\/.+)/g, '<span style="color:#64748B;font-style:italic;">$1</span>')
    .replace(/(public|private|protected|class|function|return|namespace|use|if|else|new|import|from|export|default|const|let|var|await|async)/g, '<span style="color:#C084FC;font-weight:600;">$1</span>')
    .replace(/(\$this|\$request|\$next|\$tenantId|app\(\))/g, '<span style="color:#38BDF8;">$1</span>')
    .replace(/('[\s\S]*?'|"[\s\S]*?")/g, '<span style="color:#4ADE80;">$1</span>')
    .replace(/(\b\d+\b)/g, '<span style="color:#FBBF24;">$1</span>')
})
</script>
