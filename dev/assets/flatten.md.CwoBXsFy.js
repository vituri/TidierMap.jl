import{_ as s,c as i,o as a,a6 as t}from"./chunks/framework.8idlyvhX.js";const u=JSON.parse('{"title":"Flatten","description":"","frontmatter":{},"headers":[],"relativePath":"flatten.md","filePath":"flatten.md","lastUpdated":null}'),n={name:"flatten.md"},e=t(`<h1 id="Flatten" tabindex="-1">Flatten <a class="header-anchor" href="#Flatten" aria-label="Permalink to &quot;Flatten {#Flatten}&quot;">​</a></h1><p>The flatten family of functions aim to &quot;reduce one level&quot; of a object: if you have a dictionary where some values are also dictionaries, we &quot;peel&quot; this inner dictionary and spread it among the original dictionary. This is specially useful when parsing the output of a rest API and transforming it into a dataframe.</p><h2 id="Dictionaries" tabindex="-1">Dictionaries <a class="header-anchor" href="#Dictionaries" aria-label="Permalink to &quot;Dictionaries {#Dictionaries}&quot;">​</a></h2><p>Consider the following nested dictionary describing a vehicle:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> TidierIteration</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">d1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Dict</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;id&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;model&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Kadettão&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;year&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1998</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;details&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Dict</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;plate_number&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;XXX1234&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        ,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;chassi&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 999</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        ,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;location&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Dict</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            &quot;country&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Brasil&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            ,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;state&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;São Paulo&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    )</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>Dict{String, Any} with 4 entries:</span></span>
<span class="line"><span>  &quot;details&quot; =&gt; Dict{String, Any}(&quot;plate_number&quot;=&gt;&quot;XXX1234&quot;, &quot;location&quot;=&gt;Dict(&quot;c…</span></span>
<span class="line"><span>  &quot;model&quot;   =&gt; &quot;Kadettão&quot;</span></span>
<span class="line"><span>  &quot;year&quot;    =&gt; 1998</span></span>
<span class="line"><span>  &quot;id&quot;      =&gt; 1</span></span></code></pre></div><p>We can flat the inner dictionaries as follows:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">flatten_dict</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(d1)</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>Dict{String, Any} with 6 entries:</span></span>
<span class="line"><span>  &quot;model&quot;                =&gt; &quot;Kadettão&quot;</span></span>
<span class="line"><span>  &quot;year&quot;                 =&gt; 1998</span></span>
<span class="line"><span>  &quot;id&quot;                   =&gt; 1</span></span>
<span class="line"><span>  &quot;details_chassi&quot;       =&gt; 999</span></span>
<span class="line"><span>  &quot;details_plate_number&quot; =&gt; &quot;XXX1234&quot;</span></span>
<span class="line"><span>  &quot;details_location&quot;     =&gt; Dict(&quot;country&quot;=&gt;&quot;Brasil&quot;, &quot;state&quot;=&gt;&quot;São Paulo&quot;)</span></span></code></pre></div><p>We can apply the <code>flatten_dict</code> <code>n</code> consecutive times adding <code>n</code> to the end of the function call:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">flatten_dict</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(d1, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>Dict{String, Any} with 7 entries:</span></span>
<span class="line"><span>  &quot;details_location_country&quot; =&gt; &quot;Brasil&quot;</span></span>
<span class="line"><span>  &quot;details_location_state&quot;   =&gt; &quot;São Paulo&quot;</span></span>
<span class="line"><span>  &quot;model&quot;                    =&gt; &quot;Kadettão&quot;</span></span>
<span class="line"><span>  &quot;year&quot;                     =&gt; 1998</span></span>
<span class="line"><span>  &quot;details_chassi&quot;           =&gt; 999</span></span>
<span class="line"><span>  &quot;details_plate_number&quot;     =&gt; &quot;XXX1234&quot;</span></span>
<span class="line"><span>  &quot;id&quot;                       =&gt; 1</span></span></code></pre></div><p>Converting it to a dataframe is simple:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">flatten_dict</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(d1, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> DataFrame</span></span></code></pre></div><p>In case of a vector of nested dictionaries, there is the <code>flatten_dicts_to_df</code>:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">d2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Dict</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;id&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;model&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Monzão&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;year&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1995</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;details&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Dict</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;plate_number&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;ZZZ1234&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        ,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;chassi&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1234</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        ,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;location&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Dict</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            &quot;country&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Brasil&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            ,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;state&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Amazonas&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        )</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        ,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;stolen&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    )</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ds </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [d1, d2]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">flatten_dicts_to_df</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(ds, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><h2 id="Functions" tabindex="-1">Functions <a class="header-anchor" href="#Functions" aria-label="Permalink to &quot;Functions {#Functions}&quot;">​</a></h2><div style="border-width:1px;border-style:solid;border-color:black;padding:1em;border-radius:25px;"><a id="TidierIteration.flatten_dict" href="#TidierIteration.flatten_dict">#</a> <b><u>TidierIteration.flatten_dict</u></b> — <i>Function</i>. <div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">flatten_dict</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(key, value)</span></span></code></pre></div><p>Transform a pair <code>key</code> and <code>value</code> into a dictionary.</p><p><a href="https://github.com/TidierOrg/TidierIteration.jl" target="_blank" rel="noreferrer">source</a></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">flatten_dict</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(key, value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Dict{&lt;:Any, &lt;:Any}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>Given a <code>key</code> and a <code>value</code> which is a dictionary, concatenate the <code>key</code> string to every other key of the dictionary <code>value</code>. A dictionary of dictionaries will become only a dictionary of values.</p><p>Thus, we are &quot;flattening&quot; the inner dictionaries.</p><p><a href="https://github.com/TidierOrg/TidierIteration.jl" target="_blank" rel="noreferrer">source</a></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">flatten_dict</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(dict</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Dict{&lt;:Any, &lt;:Any}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, n </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>Remove one layer of dictionaries of a dictionary.</p><p><a href="https://github.com/TidierOrg/TidierIteration.jl" target="_blank" rel="noreferrer">source</a></p></div><br><div style="border-width:1px;border-style:solid;border-color:black;padding:1em;border-radius:25px;"><a id="TidierIteration.flatten_dicts_to_df" href="#TidierIteration.flatten_dicts_to_df">#</a> <b><u>TidierIteration.flatten_dicts_to_df</u></b> — <i>Function</i>. <div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">flatten_dicts_to_df</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(dicts</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Vector{&lt;:Dict}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, n</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Int</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>Given a vector of dictionaries, flatten each of them and concatenate on a dataframe.</p><p><a href="https://github.com/TidierOrg/TidierIteration.jl" target="_blank" rel="noreferrer">source</a></p></div><br>`,21),l=[e];function p(h,k,o,d,r,c){return a(),i("div",null,l)}const E=s(n,[["render",p]]);export{u as __pageData,E as default};