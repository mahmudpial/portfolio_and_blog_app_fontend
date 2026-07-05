<template>
    <div style="background:#0A0610;min-height:100vh;">

        <!-- ── LOADING ─────────────────────────────────────────── -->
        <div v-if="loading" class="flex items-center justify-center min-h-screen gap-3" style="color:#C9B9E8;">
            <svg class="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6"
                stroke-width="2.5">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            <span style="font-family:system-ui;">Loading article...</span>
        </div>

        <!-- ── NOT FOUND ───────────────────────────────────────── -->
        <div v-else-if="!post" class="flex flex-col items-center justify-center min-h-screen gap-4">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#3B2A5A" stroke-width="1">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
            </svg>
            <p class="text-white font-bold text-xl" style="font-family:'Georgia',serif;">
                Article not found
            </p>
            <RouterLink to="/blog" class="px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
                style="background:#8B5CF6;color:#fff;font-family:system-ui;">
                Back to Blog
            </RouterLink>
        </div>

        <!-- ── POST ────────────────────────────────────────────── -->
        <div v-else>

            <!-- Hero -->
            <section class="relative overflow-hidden " :style="post.hero_image
                ? `background:linear-gradient(to bottom,rgba(5,8,15,0.5) 0%,rgba(5,8,15,0.98) 100%),
             url(${post.hero_image}) center/cover no-repeat;min-height:460px;display:flex;align-items:flex-end;`
                : 'padding-top:7rem;padding-bottom:4rem;'">

                <!-- Fallback gradient bg when no image -->
                <div v-if="!post.hero_image" class="absolute inset-0 pointer-events-none">
                    <div class="absolute" style="width:700px;height:500px;top:-200px;left:50%;
            transform:translateX(-50%);border-radius:50%;
            background:radial-gradient(circle,#6D28D922 0%,transparent 70%);filter:blur(50px);"></div>
                    <div class="absolute inset-0" style="background-image:radial-gradient(circle,#8B5CF612 1px,transparent 1px);
            background-size:32px 32px;opacity:0.5;"></div>
                </div>

                <div class="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-8 pb-12 pt-16">
                    <!-- Breadcrumb -->
                    <div class="flex items-center gap-2 mb-6 text-xs" style="color:#475569;font-family:system-ui;">
                        <RouterLink to="/blog" class="transition-colors hover:text-violet-400" style="color:#475569;">Blog
                        </RouterLink>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2.5">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                        <span style="color:#C9B9E8;">{{ post.title }}</span>
                    </div>

                    <!-- Category + reading time -->
                    <div class="flex items-center gap-3 mb-5 flex-wrap">
                        <span v-if="post.category" class="text-xs font-bold px-3 py-1.5 rounded-full"
                            style="background:#8B5CF6;color:#fff;font-family:system-ui;">
                            {{ post.category.name }}
                        </span>
                        <span class="flex items-center gap-1.5 text-xs" style="color:#475569;font-family:system-ui;">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                            {{ readingTime }} min read
                        </span>
                    </div>

                    <!-- Title -->
                    <h1 class="font-bold text-white leading-tight mb-5" style="font-size:clamp(28px,4.5vw,52px);font-family:'Georgia',serif;
            letter-spacing:-.5px;max-width:760px;">
                        {{ post.title }}
                    </h1>

                    <!-- Author + meta row -->
                    <div class="flex items-center gap-4 flex-wrap">
                        <div class="flex items-center gap-3">
                            <div class="w-9 h-9 rounded-full flex items-center justify-center
                          text-sm font-bold text-white flex-shrink-0"
                                style="background:linear-gradient(135deg,#3B2A5A,#7C3AED);">
                                {{ post.user?.name?.[0]?.toUpperCase() || 'A' }}
                            </div>
                            <div>
                                <div class="text-sm font-semibold text-white" style="font-family:system-ui;">{{
                                    post.user?.name || 'Admin' }}</div>
                                <div class="text-xs" style="color:#475569;font-family:system-ui;">
                                    {{ formatDate(post.created_at) }}
                                </div>
                            </div>
                        </div>
                        <div class="w-px h-8" style="background:#3B2A5A;"></div>
                        <div class="flex items-center gap-1.5 text-xs" style="color:#475569;font-family:system-ui;">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                            {{ post.views }} views
                        </div>

                        <!-- Tags -->
                        <div v-if="post.tags?.length" class="flex flex-wrap gap-2 ml-auto">
                            <span v-for="tag in post.tags" :key="tag.id" class="text-xs px-2.5 py-1 rounded-full border"
                                style="background:#120E1C;color:#C9B9E8;
                border-color:#3B2A5A;font-family:system-ui;">
                                # {{ tag.name }}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ── ARTICLE BODY + SIDEBAR ──────────────────────── -->
            <section class="py-14 px-6 md:px-8">
                <div class="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 xl:gap-16 items-start">

                    <!-- Article content -->
                    <article class="flex-1 min-w-0">
                        <!-- Divider -->
                        <div class="w-full h-px mb-10"
                            style="background:linear-gradient(90deg,#8B5CF6,#3B2A5A,transparent);"></div>

                        <!-- Body content -->
                        <div class="post-content" v-html="post.body"
                            style="color:#C9B9E8;font-family:system-ui;font-size:16px;line-height:1.9;">
                        </div>

                        <!-- ── REACTIONS ──────────────────────────────── -->
                        <div class="mt-12 pt-8 border-t" style="border-color:#241730;">
                            <p class="text-sm font-semibold text-white mb-4" style="font-family:'Georgia',serif;">
                                Did you find this helpful?
                            </p>
                            <div class="flex gap-3 flex-wrap">
                                <button v-for="r in reactions" :key="r.type" @click="toggleLike(r.type)" class="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl border
                         transition-all hover:scale-105 active:scale-95" :style="userReaction === r.type
                            ? 'background:#8B5CF615;border-color:#8B5CF6;box-shadow:0 0 12px #8B5CF630;'
                            : 'background:#120E1C;border-color:#3B2A5A;'" style="font-family:system-ui;">
                                    <span style="font-size:18px;">{{ r.icon }}</span>
                                    <span class="text-sm font-semibold"
                                        :style="userReaction === r.type ? 'color:#C084FC;' : 'color:#C9B9E8;'">
                                        {{ likeCounts[r.type] || 0 }}
                                    </span>
                                    <span class="text-xs hidden sm:block"
                                        :style="userReaction === r.type ? 'color:#C084FC;' : 'color:#475569;'">
                                        {{ r.label }}
                                    </span>
                                </button>
                            </div>
                        </div>

                        <!-- ── COMMENTS ───────────────────────────────── -->
                        <div class="mt-12 pt-8 border-t" style="border-color:#241730;">
                            <h3 class="font-bold text-white text-xl mb-8" style="font-family:'Georgia',serif;">
                                Comments
                                <span class="text-sm font-normal ml-2 px-2.5 py-1 rounded-full" style="background:#120E1C;color:#C084FC;
                  border:1px solid #3B2A5A;font-family:system-ui;">
                                    {{ post.comments?.length || 0 }}
                                </span>
                            </h3>

                            <!-- Comment list -->
                            <div v-if="post.comments?.length > 0" class="flex flex-col gap-5 mb-10">
                                <div v-for="comment in post.comments" :key="comment.id"
                                    class="flex gap-4 p-5 rounded-2xl border"
                                    style="background:#120E1C;border-color:#3B2A5A;">
                                    <!-- Avatar -->
                                    <div class="w-10 h-10 rounded-full flex items-center justify-center
                              text-sm font-bold text-white flex-shrink-0"
                                        style="background:linear-gradient(135deg,#3B2A5A,#7C3AED);">
                                        {{ (comment.user?.name || comment.guest_name || 'A')[0].toUpperCase() }}
                                    </div>
                                    <div class="flex-1">
                                        <div class="flex items-center justify-between gap-3 mb-2 flex-wrap">
                                            <span class="font-semibold text-white text-sm"
                                                style="font-family:'Georgia',serif;">
                                                {{ comment.user?.name || comment.guest_name }}
                                            </span>
                                            <span class="text-xs" style="color:#475569;font-family:system-ui;">
                                                {{ formatDate(comment.created_at) }}
                                            </span>
                                        </div>
                                        <p class="text-sm leading-relaxed"
                                            style="color:#C9B9E8;font-family:system-ui;line-height:1.7;">
                                            {{ comment.body }}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div v-else class="text-center py-10 rounded-2xl border mb-10"
                                style="background:#120E1C;border-color:#3B2A5A;">
                                <svg class="mx-auto mb-3" width="36" height="36" viewBox="0 0 24 24" fill="none"
                                    stroke="#3B2A5A" stroke-width="1">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                </svg>
                                <p class="text-sm" style="color:#475569;font-family:system-ui;">
                                    No comments yet. Be the first to share your thoughts!
                                </p>
                            </div>

                            <!-- ── COMMENT FORM ─────────────────────────── -->
                            <div class="rounded-2xl border p-6" style="background:#120E1C;border-color:#3B2A5A;">
                                <h4 class="font-bold text-white text-lg mb-1" style="font-family:'Georgia',serif;">Leave
                                    a Comment</h4>
                                <p class="text-xs mb-6" style="color:#475569;font-family:system-ui;">
                                    Your comment will appear after approval.
                                </p>

                                <!-- Success -->
                                <div v-if="commentSuccess" class="mb-5 p-4 rounded-xl border flex items-center gap-3"
                                    style="background:#052e16;border-color:#16a34a40;color:#4ade80;">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2.5">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    <span class="text-sm" style="font-family:system-ui;">{{ commentSuccess }}</span>
                                </div>

                                <div v-if="commentError" class="mb-5 p-4 rounded-xl border flex items-center gap-3"
                                    style="background:#1a0505;border-color:#dc262640;color:#f87171;">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2.5">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="15" y1="9" x2="9" y2="15" />
                                        <line x1="9" y1="9" x2="15" y2="15" />
                                    </svg>
                                    <span class="text-sm" style="font-family:system-ui;">{{ commentError }}</span>
                                </div>

                                <!-- Guest fields -->
                                <div v-if="!auth.isLoggedIn" class="grid md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label class="block text-xs font-semibold uppercase tracking-widest mb-2"
                                            style="color:#475569;font-family:system-ui;letter-spacing:.12em;">
                                            Name <span style="color:#8B5CF6;">*</span>
                                        </label>
                                        <input v-model="commentForm.guest_name" type="text" placeholder="Your name"
                                            class="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                                            style="background:#0A0610;border:1px solid #3B2A5A;color:#fff;font-family:system-ui;"
                                            onfocus="this.style.borderColor='#8B5CF6'"
                                            onblur="this.style.borderColor='#3B2A5A'" />
                                    </div>
                                    <div>
                                        <label class="block text-xs font-semibold uppercase tracking-widest mb-2"
                                            style="color:#475569;font-family:system-ui;letter-spacing:.12em;">
                                            Email <span style="color:#8B5CF6;">*</span>
                                        </label>
                                        <input v-model="commentForm.guest_email" type="email"
                                            placeholder="your@email.com"
                                            class="w-full px-4 py-3 rounded-xl text-sm focus:outline-none"
                                            style="background:#0A0610;border:1px solid #3B2A5A;color:#fff;font-family:system-ui;"
                                            onfocus="this.style.borderColor='#8B5CF6'"
                                            onblur="this.style.borderColor='#3B2A5A'" />
                                    </div>
                                </div>

                                <!-- Logged-in user badge -->
                                <div v-else class="flex items-center gap-3 mb-4 p-3 rounded-xl border"
                                    style="background:#0A0610;border-color:#3B2A5A;">
                                    <div class="w-8 h-8 rounded-full flex items-center justify-center
                              text-xs font-bold text-white"
                                        style="background:linear-gradient(135deg,#3B2A5A,#7C3AED);">
                                        {{ auth.user?.name?.[0]?.toUpperCase() }}
                                    </div>
                                    <div>
                                        <span class="text-sm font-medium text-white" style="font-family:system-ui;">{{
                                            auth.user?.name }}</span>
                                        <span class="text-xs ml-2 px-2 py-0.5 rounded-full"
                                            style="background:#8B5CF615;color:#C084FC;font-family:system-ui;">
                                            Signed in
                                        </span>
                                    </div>
                                </div>

                                <!-- Comment textarea -->
                                <div class="mb-4">
                                    <label class="block text-xs font-semibold uppercase tracking-widest mb-2"
                                        style="color:#475569;font-family:system-ui;letter-spacing:.12em;">
                                        Comment <span style="color:#8B5CF6;">*</span>
                                    </label>
                                    <textarea v-model="commentForm.body" rows="5"
                                        placeholder="Share your thoughts or ask a question..."
                                        class="w-full px-4 py-3 rounded-xl text-sm resize-none focus:outline-none"
                                        style="background:#0A0610;border:1px solid #3B2A5A;color:#fff;
                    font-family:system-ui;line-height:1.7;" onfocus="this.style.borderColor='#8B5CF6'"
                                        onblur="this.style.borderColor='#3B2A5A'">
                  </textarea>
                                </div>

                                <button @click="submitComment" :disabled="commentLoading || !commentForm.body.trim()"
                                    class="flex items-center gap-2 px-7 py-3 text-white font-semibold
                         rounded-2xl transition-all hover:scale-105 disabled:opacity-50
                         disabled:cursor-not-allowed"
                                    style="background:#8B5CF6;box-shadow:0 0 20px #8B5CF635;font-family:system-ui;">
                                    <svg v-if="!commentLoading" width="16" height="16" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" stroke-width="2.5">
                                        <line x1="22" y1="2" x2="11" y2="13" />
                                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                    </svg>
                                    <svg v-else class="animate-spin" width="16" height="16" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2.5">
                                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                    </svg>
                                    {{ commentLoading ? 'Submitting...' : 'Post Comment' }}
                                </button>
                            </div>
                        </div>
                    </article>

                    <!-- ── STICKY SIDEBAR ───────────────────────────── -->
                    <aside class="w-full lg:w-72 flex-shrink-0 flex flex-col gap-5 lg:sticky lg:top-28">

                        <!-- Table of contents placeholder / Post info -->
                        <div class="rounded-2xl border overflow-hidden"
                            style="background:#120E1C;border-color:#3B2A5A;">
                            <div class="px-5 py-4 border-b" style="border-color:#241730;">
                                <h4 class="font-bold text-white text-sm" style="font-family:'Georgia',serif;">
                                    Post Details
                                </h4>
                            </div>
                            <div class="p-5 flex flex-col gap-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                        style="background:#8B5CF615;border:1px solid #8B5CF625;">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C084FC"
                                            stroke-width="2">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                            <line x1="16" y1="2" x2="16" y2="6" />
                                            <line x1="8" y1="2" x2="8" y2="6" />
                                            <line x1="3" y1="10" x2="21" y2="10" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div class="text-xs uppercase tracking-wider mb-0.5"
                                            style="color:#475569;font-family:system-ui;">Published</div>
                                        <div class="text-sm text-white" style="font-family:system-ui;">
                                            {{ formatDate(post.created_at) }}
                                        </div>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                        style="background:#8B5CF615;border:1px solid #8B5CF625;">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C084FC"
                                            stroke-width="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div class="text-xs uppercase tracking-wider mb-0.5"
                                            style="color:#475569;font-family:system-ui;">Views</div>
                                        <div class="text-sm text-white" style="font-family:system-ui;">
                                            {{ post.views }}
                                        </div>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                        style="background:#8B5CF615;border:1px solid #8B5CF625;">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C084FC"
                                            stroke-width="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <polyline points="12 6 12 12 16 14" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div class="text-xs uppercase tracking-wider mb-0.5"
                                            style="color:#475569;font-family:system-ui;">Read time</div>
                                        <div class="text-sm text-white" style="font-family:system-ui;">
                                            {{ readingTime }} min
                                        </div>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                        style="background:#8B5CF615;border:1px solid #8B5CF625;">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C084FC"
                                            stroke-width="2">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div class="text-xs uppercase tracking-wider mb-0.5"
                                            style="color:#475569;font-family:system-ui;">Comments</div>
                                        <div class="text-sm text-white" style="font-family:system-ui;">
                                            {{ post.comments?.length || 0 }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Share card -->
                        <div class="rounded-2xl border p-5" style="background:#120E1C;border-color:#3B2A5A;">
                            <h4 class="font-bold text-white text-sm mb-4" style="font-family:'Georgia',serif;">Share
                                Article</h4>
                            <div class="flex gap-2">
                                <a :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`"
                                    target="_blank" class="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl
                         border text-xs font-medium transition-all hover:scale-105"
                                    style="background:#0A0610;border-color:#3B2A5A;color:#C9B9E8;font-family:system-ui;">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                                        <path
                                            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.849L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                    X
                                </a>
                                <button @click="copyLink" class="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl
                         border text-xs font-medium transition-all hover:scale-105" :style="copied
                            ? 'background:#052e16;border-color:#16a34a40;color:#4ade80;'
                            : 'background:#0A0610;border-color:#3B2A5A;color:#C9B9E8;'" style="font-family:system-ui;">
                                    <svg v-if="!copied" width="13" height="13" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" stroke-width="2.5">
                                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                    </svg>
                                    <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" stroke-width="2.5">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    {{ copied ? 'Copied!' : 'Copy' }}
                                </button>
                            </div>
                        </div>

                        <!-- Back to blog -->
                        <RouterLink to="/blog" class="flex items-center justify-center gap-2 py-3 rounded-2xl border
                     text-sm font-medium transition-all hover:scale-105 hover:border-violet-500"
                            style="border-color:#3B2A5A;color:#C9B9E8;background:#120E1C;font-family:system-ui;">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2.5">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            Back to Blog
                        </RouterLink>
                    </aside>
                </div>
            </section>
        </div>

    </div>
</template>

<style scoped>
/* ── Post body typography ────────────────────────────────── */
.post-content :deep(h1),
.post-content :deep(h2),
.post-content :deep(h3),
.post-content :deep(h4),
.post-content :deep(h5),
.post-content :deep(h6) {
    color: #fff;
    font-family: 'Georgia', serif;
    margin: 2rem 0 1rem;
    line-height: 1.3;
    font-weight: 700;
}

.post-content :deep(h1) {
    font-size: 2.2rem;
    border-bottom: 3px solid #8B5CF6;
    padding-bottom: 0.5rem;
}

.post-content :deep(h2) {
    font-size: 1.8rem;
    border-bottom: 2px solid #8B5CF6;
    padding-bottom: 0.5rem;
}

.post-content :deep(h3) {
    font-size: 1.5rem;
    color: #C084FC;
}

.post-content :deep(h4) {
    font-size: 1.3rem;
}

.post-content :deep(h5) {
    font-size: 1.1rem;
}

.post-content :deep(h6) {
    font-size: 1rem;
}

.post-content :deep(p) {
    margin-bottom: 1.3rem;
    color: #C9B9E8;
    line-height: 1.9;
}

/* Links with better styling */
.post-content :deep(a) {
    color: #C084FC;
    text-decoration: none;
    font-weight: 600;
    border-bottom: 2px solid transparent;
    transition: all 0.3s ease;
    position: relative;
}

.post-content :deep(a:hover) {
    color: #8B5CF6;
    border-bottom-color: #8B5CF6;
}

.post-content :deep(a::after) {
    content: '↗';
    margin-left: 2px;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.post-content :deep(a:hover::after) {
    opacity: 1;
}

/* Inline code */
.post-content :deep(p code),
.post-content :deep(li code) {
    background: rgba(59, 130, 246, 0.15);
    color: #C084FC;
    padding: 3px 8px;
    border-radius: 6px;
    font-size: 13px;
    border: 1px solid rgba(59, 130, 246, 0.3);
    font-family: 'Courier New', monospace;
}

/* Code blocks */
.post-content :deep(pre) {
    background: #0a0e1a;
    border: 1px solid #3B2A5A;
    border-radius: 12px;
    padding: 1.5rem;
    overflow-x: auto;
    margin: 1.8rem 0;
    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.3);
    position: relative;
}

.post-content :deep(pre code) {
    background: none;
    border: none;
    padding: 0;
    color: #4ade80;
    font-size: 14px;
    line-height: 1.7;
    font-family: 'Courier New', monospace;
}

/* Blockquotes */
.post-content :deep(blockquote) {
    border-left: 4px solid #8B5CF6;
    padding: 1.2rem 1.5rem;
    margin: 1.8rem 0;
    background: rgba(59, 130, 246, 0.08);
    border-radius: 0 12px 12px 0;
    color: #C9B9E8;
    font-style: italic;
}

.post-content :deep(blockquote p) {
    margin: 0;
}

/* Lists */
.post-content :deep(ul),
.post-content :deep(ol) {
    padding-left: 2rem;
    margin: 1.5rem 0;
    color: #C9B9E8;
    line-height: 1.9;
}

.post-content :deep(li) {
    margin-bottom: 0.6rem;
    line-height: 1.8;
}

.post-content :deep(ul li::marker) {
    color: #8B5CF6;
    font-weight: bold;
}

.post-content :deep(ol li::marker) {
    color: #C084FC;
    font-weight: bold;
}

/* Images - Enhanced styling */
.post-content :deep(img) {
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    margin: 2rem auto;
    border: 1px solid #3B2A5A;
    box-shadow: 0 10px 30px rgba(59, 130, 246, 0.15);
    transition: all 0.3s ease;
    display: block;
}

.post-content :deep(img:hover) {
    transform: scale(1.02);
    box-shadow: 0 10px 40px rgba(59, 130, 246, 0.25);
    border-color: #8B5CF6;
}

/* Horizontal rules */
.post-content :deep(hr) {
    border: none;
    height: 2px;
    background: linear-gradient(90deg, #8B5CF6, #3B2A5A, transparent);
    margin: 2.5rem 0;
    border-radius: 2px;
}

/* Tables */
.post-content :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.8rem 0;
    border: 1px solid #3B2A5A;
    border-radius: 8px;
    overflow: hidden;
}

.post-content :deep(th),
.post-content :deep(td) {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #3B2A5A;
}

.post-content :deep(th) {
    background: rgba(59, 130, 246, 0.1);
    color: #C084FC;
    font-weight: 700;
}

.post-content :deep(tr:hover) {
    background: rgba(59, 130, 246, 0.05);
}

/* Strong & emphasis */
.post-content :deep(strong) {
    color: #C084FC;
    font-weight: 700;
}

.post-content :deep(em) {
    color: #C9B9E8;
    font-style: italic;
}

.post-content :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    font-size: 14px;
}

.post-content :deep(th) {
    background: #180F28;
    color: #C084FC;
    padding: 10px 14px;
    border: 1px solid #3B2A5A;
    text-align: left;
}

.post-content :deep(td) {
    padding: 10px 14px;
    border: 1px solid #3B2A5A;
    color: #C9B9E8;
}
</style>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api/axios'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const auth = useAuthStore()
const post = ref(null)
const loading = ref(true)
const copied = ref(false)

const likeCounts = ref({})
const userReaction = ref(null)
const commentSuccess = ref('')
const commentError = ref('')
const commentLoading = ref(false)

const guestToken = ref(
    localStorage.getItem('guest_token') || Math.random().toString(36).slice(2)
)

const reactions = [
    { type: 'like', icon: '👍', label: 'Like' },
    { type: 'love', icon: '❤️', label: 'Love' },
    { type: 'wow', icon: '😮', label: 'Amazing' },
]

const commentForm = reactive({
    body: '', guest_name: '', guest_email: '',
})

const currentUrl = computed(() => window.location.href)

const readingTime = computed(() => {
    if (!post.value?.body) return 1
    const words = post.value.body.replace(/<[^>]+>/g, '').split(/\s+/).length
    return Math.max(1, Math.ceil(words / 200))
})

onMounted(async () => {
    localStorage.setItem('guest_token', guestToken.value)
    await fetchPost()
})

async function fetchPost() {
    try {
        const { data } = await api.get(`/posts/${route.params.slug}`)
        post.value = data.data
        likeCounts.value = buildLikeCounts(data.data.likes || [])
        userReaction.value = findUserReaction(data.data.likes || [])
    } catch (e) {
        console.warn('Post not found:', e.message)
    } finally {
        loading.value = false
    }
}

async function toggleLike(type) {
    try {
        const { data } = await api.post(`/posts/${post.value.id}/likes`, {
            type,
            guest_token: guestToken.value,
            user_id: auth.isLoggedIn ? auth.user?.id : null,
        })
        if (Array.isArray(data.likes)) {
            likeCounts.value = buildLikeCounts(data.likes)
            userReaction.value = findUserReaction(data.likes)
        } else if (data.likes && typeof data.likes === 'object') {
            likeCounts.value = data.likes
            userReaction.value = userReaction.value === type ? null : type
        } else {
            await fetchPost()
        }
    } catch (e) {
        console.warn('Like failed:', e.message)
    }
}

async function submitComment() {
    if (!commentForm.body.trim()) return
    commentError.value = ''
    commentSuccess.value = ''
    commentLoading.value = true
    try {
        const payload = {
            body: commentForm.body.trim(),
            comment: commentForm.body.trim(),
            post_id: post.value.id,
            guest_token: guestToken.value,
        }

        if (auth.isLoggedIn) {
            payload.user_id = auth.user?.id
            payload.name = auth.user?.name
            payload.email = auth.user?.email
        } else {
            payload.guest_name = commentForm.guest_name.trim()
            payload.guest_email = commentForm.guest_email.trim()
            payload.name = commentForm.guest_name.trim()
            payload.email = commentForm.guest_email.trim()
        }

        const { data } = await api.post(`/posts/${post.value.id}/comments`, payload)
        const createdComment = data.data || data.comment

        if (createdComment?.is_approved) {
            post.value.comments = [createdComment, ...(post.value.comments || [])]
            commentSuccess.value = 'Comment posted successfully.'
        } else {
            commentSuccess.value = 'Comment submitted! It will appear after approval.'
        }

        await fetchPost()
        Object.assign(commentForm, { body: '', guest_name: '', guest_email: '' })
    } catch (e) {
        commentError.value = e.response?.data?.message || 'Comment submission failed.'
        console.warn('Comment failed:', e.message)
    } finally {
        commentLoading.value = false
    }
}

async function copyLink() {
    try {
        await navigator.clipboard.writeText(currentUrl.value)
        copied.value = true
        setTimeout(() => copied.value = false, 2000)
    } catch {
        copied.value = false
    }
}

function formatDate(d) {
    return new Date(d).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    })
}

function buildLikeCounts(likes) {
    return likes.reduce((counts, like) => {
        if (!like?.type) return counts
        counts[like.type] = (counts[like.type] || 0) + 1
        return counts
    }, {})
}

function findUserReaction(likes) {
    const match = likes.find(like => {
        if (auth.isLoggedIn) {
            return Number(like.user_id) === Number(auth.user?.id)
        }
        return like.guest_token === guestToken.value
    })

    return match?.type || null
}
</script>
