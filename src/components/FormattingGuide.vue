<template>
    <div class="formatting-guide">
        <div class="guide-wrapper">
            <h4 class="guide-title">📝 Blog Post Formatting Guide</h4>
            
            <div class="guide-section">
                <h5 class="guide-subtitle">🖼️ Images</h5>
                <p class="guide-text">Add images to your post using HTML img tag:</p>
                <code class="code-block">&lt;img src="https://example.com/image.jpg" alt="Description" style="max-width:100%; border-radius:12px; margin:1.5rem auto; display:block;"&gt;</code>
            </div>

            <div class="guide-section">
                <h5 class="guide-subtitle">💻 Code Blocks</h5>
                <p class="guide-text">Use &lt;pre&gt; and &lt;code&gt; tags for code snippets:</p>
                <code class="code-block">&lt;pre&gt;&lt;code&gt;
function helloWorld() {
  console.log("Hello, World!");
}
&lt;/code&gt;&lt;/pre&gt;</code>
            </div>

            <div class="guide-section">
                <h5 class="guide-subtitle">🔗 Links</h5>
                <p class="guide-text">Create clickable links with HTML anchor tags:</p>
                <code class="code-block">&lt;a href="https://example.com" target="_blank"&gt;Click here&lt;/a&gt;</code>
            </div>

            <div class="guide-section">
                <h5 class="guide-subtitle">📌 Headings</h5>
                <p class="guide-text">Structure your content with headings:</p>
                <code class="code-block">&lt;h2&gt;Main Section&lt;/h2&gt;
&lt;h3&gt;Subsection&lt;/h3&gt;</code>
            </div>

            <div class="guide-section">
                <h5 class="guide-subtitle">💬 Quotes</h5>
                <p class="guide-text">Highlight important quotes:</p>
                <code class="code-block">&lt;blockquote&gt;
  &lt;p&gt;This is an important quote&lt;/p&gt;
&lt;/blockquote&gt;</code>
            </div>

            <div class="guide-section">
                <h5 class="guide-subtitle">📋 Lists</h5>
                <p class="guide-text">Use unordered or ordered lists:</p>
                <code class="code-block">&lt;ul&gt;
  &lt;li&gt;Item one&lt;/li&gt;
  &lt;li&gt;Item two&lt;/li&gt;
&lt;/ul&gt;</code>
            </div>

            <div class="guide-section guide-example">
                <h5 class="guide-subtitle">✨ Complete Example</h5>
                <code class="code-block">&lt;h2&gt;Getting Started with Vue&lt;/h2&gt;

&lt;img src="https://example.com/vue-logo.jpg" alt="Vue Logo" style="max-width:100%; border-radius:12px; margin:1.5rem auto; display:block;"&gt;

&lt;p&gt;Vue is a great JavaScript framework. Here's a simple example:&lt;/p&gt;

&lt;pre&gt;&lt;code&gt;
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
&lt;/code&gt;&lt;/pre&gt;

&lt;p&gt;Learn more at &lt;a href="https://vuejs.org" target="_blank"&gt;Vue.js official site&lt;/a&gt;&lt;/p&gt;

&lt;blockquote&gt;
  &lt;p&gt;Vue makes building interactive interfaces simple and fun!&lt;/p&gt;
&lt;/blockquote&gt;</code>
            </div>

            <div class="guide-tips">
                <strong>💡 Pro Tips:</strong>
                <ul>
                    <li>Always use <code>target="_blank"</code> for external links</li>
                    <li>Keep images under 2MB for better loading</li>
                    <li>Use meaningful alt text for images</li>
                    <li>Format code for readability with proper indentation</li>
                    <li>Test your post layout before publishing</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.formatting-guide {
    background: #05080F;
    border-radius: 8px;
    padding: 1rem;
    margin-top: 1rem;
}

.guide-wrapper {
    max-height: 400px;
    overflow-y: auto;
    padding-right: 0.5rem;
}

.guide-wrapper::-webkit-scrollbar {
    width: 6px;
}

.guide-wrapper::-webkit-scrollbar-track {
    background: #0D1220;
    border-radius: 3px;
}

.guide-wrapper::-webkit-scrollbar-thumb {
    background: #1e3a5f;
    border-radius: 3px;
}

.guide-wrapper::-webkit-scrollbar-thumb:hover {
    background: #3B82F6;
}

.guide-title {
    font-size: 1rem;
    font-weight: 700;
    color: #60A5FA;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #1e3a5f;
}

.guide-section {
    margin-bottom: 1.2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #1e3a5f;
}

.guide-subtitle {
    font-size: 0.9rem;
    font-weight: 600;
    color: #A8C4E8;
    margin-bottom: 0.5rem;
}

.guide-text {
    font-size: 0.85rem;
    color: #75839E;
    margin-bottom: 0.5rem;
}

.code-block {
    display: block;
    background: #0a0e1a;
    border: 1px solid #1e3a5f;
    border-radius: 6px;
    padding: 0.75rem;
    font-family: 'Courier New', monospace;
    font-size: 0.8rem;
    color: #4ade80;
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-word;
}

.guide-example {
    background: #0D1220;
    padding: 1rem;
    border-radius: 6px;
}

.guide-tips {
    background: rgba(59, 130, 246, 0.1);
    border-left: 3px solid #3B82F6;
    padding: 1rem;
    border-radius: 6px;
    font-size: 0.85rem;
    color: #A8C4E8;
}

.guide-tips strong {
    color: #60A5FA;
}

.guide-tips ul {
    margin: 0.5rem 0 0 1.5rem;
}

.guide-tips li {
    margin-bottom: 0.4rem;
    line-height: 1.6;
}

.guide-tips code {
    background: rgba(59, 130, 246, 0.2);
    padding: 2px 6px;
    border-radius: 3px;
    color: #60A5FA;
    font-family: 'Courier New', monospace;
    font-size: 0.8em;
}
</style>
