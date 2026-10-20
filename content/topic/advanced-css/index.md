```javascript
const week = 9
const draft = true
```

# Some Additional, Advanced CSS

## Nuance and Webbiness

Our HTML/CSS focus up to this point has been relatively broad, to start with the basics. Here we want to sand down some of the rough edges, and introduce you to some specific, advanced techniques you can use to refine and enliven your work—still with just CSS, no JavaScript (yet)!

A good pattern to follow in web (and all) development is to use each technology *only* for what it does *best*—using HTML for semantic meaning, CSS to handle how we form a page, and, later, JavaScript to introduce more interaction. But even before we get to JS, we can start to layer in some more nuance, interest, and liveliness with our CSS.

**Let’s look at some examples.**

---

> It is vain to do with more what can be done with less.
>
> [<cite>William of Ockham, 1324</cite>](https://mathshistory.st-andrews.ac.uk/Biographies/Ockham)

## Advanced Typography

### Precise, Optical `text-box`

You have probably noticed that HTML renders a lot of extra space around text elements, called the *line box* (or, in design software parlance, the *bounding box*).

- [<cite>Font Metrics, Line-&NoBreak;Height and Vertical-&NoBreak;Align</cite>](https://iamvdo.me/en/blog/css-font-metrics-line-height-and-vertical-align)
	<sub>A deep-dive on type positioning.</sub>

- [<cite>Vertical Spacing and Line-Height in Design Systems – Google Fonts</cite>](https://fonts.google.com/knowledge/using_type/vertical_spacing_and_line_height_in_design_systems)
	<sub>It’s all very complicated.</sub>

- [<cite>`text-box` - MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/text-box)
	<sub>Now, control the *bounding box*!</sub>

- [<cite>`text-box-trim` - web.dev</cite>](https://developer.chrome.com/blog/css-text-box-trim)
	<sub>So… much… easier!</sub>
<!-- .right .rows--4 -->

It is based on the `font-family`, the `font-size`, and the `line-height`, which basically means it is different all the time—and crucially, often different from Adobe/Figma to HTML. This makes it difficult to position type visually and precisely—especially at large, expressive sizes like your headings! It’s always annoying, and you’ll often be adding/subtracting your spacing (`margin` or `padding`) to account for it, if you want to line everything up *just right*, optically.

But we can avoid it, now! After a decade of workarounds and discussion, browsers recently [added support](https://caniuse.com/css-text-box-trim) for the super-easy [`text-box`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-box) properties to give us control:
<!-- .balance .before -->

<figure style="--lines: 14">

***[Text-Box Example](text-box/style.css)***

<figcaption>

You you might consider doing this on *everything* with the shorthand `* { text-box: trim-both cap alphabetic; }`! Note though that Chrome [doesn’t apply it](https://caniuse.com/mdn-css_properties_text-box-trim_inline_elements) on `inline` elements, for some reason.

</figcaption>
</figure>

> [!NOTE]
>
> Figma was actually *ahead* of CSS here with its [recent <samp>Vertical Trim</samp> option](https://help.figma.com/hc/en-us/articles/360039956634-Explore-text-properties#h_01H96FW9Z3W7J7Z2HEN8V17BZT)!

### Hanging Punctuation (Kinda)

Ideally we could set our punctuation *outside* of our text blocks, for nice visual alignment based solely on the letters—a traditional design technique called [*hanging punctuation*](https://en.wikipedia.org/wiki/Hanging_punctuation).

[<cite>7 Practical Uses for `::before` and `::after` – CSS Tricks</cite>](https://css-tricks.com/7-practical-uses-for-the-before-and-after-pseudo-elements-in-css/)
<sub>Another great *CSS Tricks* article.</sub>
	<!-- .right .rows--2 -->

There *is* actually a [`hanging-punctuation` property](https://developer.mozilla.org/en-US/docs/Web/CSS/hanging-punctuation) for this—but [only Safari](https://caniuse.com/?search=hanging-punctuation) supports it! But we can still approximate the behavior in a few ways, at least for quotes:

<figure style="--lines: 23">

***[Hanging Punctuation Example](hanging-punctuation/style.css)***

<figcaption>

Note that the (pasted-in) [curly quotation marks](https://en.wikipedia.org/wiki/Quotation_mark) are *not* in the HTML here in the last example! [Pseudo-elements](../css/index.md#pseudo-elements-selectorpseudo) again, `::before` and `::after`.

</figcaption>
</figure>

### Text Ragging (Sorta)

We’ve gone on-and-on about how you can’t treat the web like print—always [perfectly ragging](../typography/index.md#ragging) your text for nice, smooth blocks. In modern (responsive) web design we don’t always know what our text will be, nor where it will wrap!

But we *can* do a handful of things to make for *better* ragging/wraps, given the unknowns—judiciously using `hyphens`/`&shy;`, `<wbr>`, `white-space`, `<nobr>` and `&nbsp;`, and `text-wrap` to *somewhat* control our line breaks, for better readability.

#### `hyphens` / `&shy;`

The [`hyphens` property](https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens) allows long, multi-syllable words to be [hyphenated](https://en.wikipedia.org/wiki/Hyphen#Justification_and_line-wrapping) when they wrap across multiple lines. This can be done automatically by the browser, or by manually inserting `&shy;` (for [*soft hyphen*](https://en.wikipedia.org/wiki/Soft_hyphen)) as an [HTML character/entity references](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#:~:text=All%20named%20character%20entity%20references):
<!-- .balance -->

[<cite>`hyphens` - MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens)
<sub>This depends on the browser and [`lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/lang), unless you manually add `&shy;`.</sub>
<!-- .right -->

<figure style="--lines: 16">

***[Hyphens Example](hyphens/style.css)***

<figcaption>

Note `<html lang="en">` is needed—as the `auto` property works from each browser’s different, internal (and usually, only English) dictionary—so this all has somewhat limited utility/reliability/consistency.

</figcaption>
</figure>

#### `<wbr>`

Somewhat related/similar to `&shy;`, the `<wbr>` is a <nobr>(void/empty)</nobr> HTML element that denotes a *word break* opportunity—a bit like an optional `<br>`! You can use these to manually control where single long word will wrap, *without* a hyphen:
<!-- .balance -->

[<cite>`wbr` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/wbr)
<sub>These are often needed with slashes/URL&NoBreak;s.</sub>
<!-- .right -->

<figure style="--lines: 18">

***[Wbr Example](wbr/index.html)***

</figure>

#### `white-space: nowrap;` / `<nobr>` / `&nbsp;`

But much more often, you’ll want to keep certain words *together*—to avoid a [widow or orphan](../typography/index.md#widows-and-orphans), or to keep important/related text together—like in dates, *October 22*, or with  names like *van Zanten*.

- [<cite>`white-space` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
	<sub>*Prevents* text from wrapping.</sub>

- [<cite>`nobr` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nobr)
	<sub>This is *technically* deprecated. But [one of your instructors](https://michaelfehrenbach.com) is a “stan.”</sub>
<!-- .right .rows--3 -->

You can keep multiple words (or whole phrases) together with `white-space: nowrap;`. Historically, the `<nobr>` tag applied this—keeping in mind that like `<em>` or `<strong>`the default behavior is cleared by most [resets](../css/index.md#resets) (ours included)—so likewise you have to restore the property in your own CSS.

You can also use a manual `&nbsp;` [character/entity reference](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#:~:text=All%20named%20character%20entity%20references) between words:
<!-- .balance .before -->

<figure style="--lines: 21">

***[Nobr/Nbsp example](nobr-nbsp/index.html)***

<figcaption>

On a Mac, you can insert an *encoded* `&nbsp;` with <kbd><kbd><span class="x2325">⌥</span></kbd>+<kbd>Space</kbd></kbd>. (It’s apparently [*much* harder](https://superuser.com/a/1414666) on Windows!) This works in many programs, not just your IDE! It’s harder to see, but easier to read.

</figcaption>
</figure>

#### `text-wrap: balance;`

After many, *many* years of patient, typographic waiting (and [some JS](https://github.com/adobe/balance-text) [shenanigans](https://www.ctrl.blog/entry/text-wrap-balance.html)) we now have widespread [browser support](https://caniuse.com/css-text-wrap-balance) for “balancing” uneven line lengths with [`text-wrap: balance;`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap):
<!-- .balance -->

[<cite>`text-wrap` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap)
<sub>Don’t overuse/abuse this in running text, though!</sub>
<!-- .right -->

<figure style="--lines: 8">

***[Balance Example](balance/style.css)***

<figcaption>

This is particularly noticeable (and helpful) for centered text! There is also [`pretty`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap#pretty), but Safari *just* started [to support it](https://caniuse.com/mdn-css_properties_text-wrap_pretty) and Firefox still doesn’t.

</figcaption>
</figure>

**When in doubt, *[The Elements of Typographic Style](https://readings.design/PDF/the_elements_of_typographic_style.pdf)* explains many of these conventions.**

**But also, as Bringhurst says, “read the text before designing it.” Always put yourself in the mind of your reader!**

<aside>

Remember that [*there is no perfect layout*](../../syllabus.md#unit-2-there-is-no-perfect-layout)!

These strategies only work if you can *manually* edit your text content, which is often not feasible—with templating/content management systems, editors, time, and so on.

<sub>Do it when you can—and give more attention to your large headings, then your body copy, etc. going down your hierarchy.</sub>

</aside>

## Overflows and Scrolling

### `overflow`

An [`overflow`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow) in CSS happens when there is too much content to fit in a container—usually because you have manually constrained its `block-size` or `inline-size`. (By default, the browser will try to show you everything!)
<!-- .balance -->

- [<cite>`overflow` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
- [<cite>Overflowing Content – MDN</cite>](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Overflowing_content)
	<sub>What to do when things don’t fit.</sub>
<!-- .right .rows--2 -->

But we can use this behavior *intentionally* to crop our content, or create interally-scrolling areas:
<!-- .balance -->

<figure style="--lines: 24">

***[Overflow Example](overflow/style.css)***

</figure>

<!-- TODO Update this to `overflow-block`/`overflow-inline` next year! -->

### `oveflow` / `sticky`

Importantly, `overflow` creates a new [*stacking context*](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context)—which means things with `position` (namely, `position: sticky;`)—and some other properties—will now use the `overflow` container as their reference/origin:
<!-- .balance .before -->

[<cite>Stacking Context – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context)
<sub>*Always* confusing; think of these as *frames* or *groups* in Figma.</sub>
<!-- .right -->

<figure style="--lines: 16">

***[Overflow Sticky Example](overflow-sticky/style.css)***

</figure>

### `text-overflow` / `-webkit-line-clamp`

You can also *excerpt* text (perhaps on a landing page) with the [`text-overflow`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow) (for a single line) or [`-webkit-line-clamp`](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp) (for multiple lines) properties—which will add [an ellipsis](https://en.wikipedia.org/wiki/Ellipsis) <samp>…</samp> where the text overflows. Only do this when the full text is available on a subsequent page:
<!-- .balance -->

- [<cite>`text-overflow` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow)
	<sub>For single lines…</sub>

- [<cite>`-webkit-line-clamp` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp)
	<sub>And multiple lines!</sub>
<!-- .right -->

<figure style="--lines: 18">

***[Text-overflow Example](text-overflow/style.css)***

<figcaption>

This `-webkit` stuff is hokey, but still how it is done! Browsers are weird.

</figcaption>
</figure>

## Visual and Compositing Effects

### `filter`

CSS can apply visual and compositing effects on elements—adjusting their graphical display *after* they are laid out and rendered in the page—with the [`filter` property](https://developer.mozilla.org/en-US/docs/Web/CSS/filter):
<!-- .balance -->

[<cite>`filter` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)
<sub>Applied *after* everything else.</sub>
<!-- .right -->

<figure style="--lines: 24">

***[Filter Example](filter/style.css)***

<figcaption>

Note that multiple filters are applied in *sequence*—changing the order changes the end/rendered result.

</figcaption>
</figure>

### `backdrop-filter` / `mix-blend-mode`

These have corresponding `backdrop-filter` values—which apply the effect to the page *behind* an element! You’ll often use these in conjunction with an [`opacity` (or semi-transparent `color`)](../css/index.md#color) or a `mix-blend-mode` for interesting Photoshop/Figma-like layer-blending effects:
<!-- .balance -->

- [<cite>`backdrop-filter` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
- [<cite>`mix-blend-mode` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode)
	<sub>Often used together.</sub>
<!-- .right -->

<figure style="--lines: 24">

***[Backdrop Filter Example](backdrop-filter/style.css)***

<figcaption>

These are “hot rn.” Always mind your legibility/readability, though!

</figcaption>
</figure>

### `transform`

#### Transform `function()`

<div class="body">

Beyond our standard [sizing and layout](../box-model/index.md) afforded by CSS, you can also *visually* manipulate elements using CSS [transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)—scaling, skewing, translating, or rotating elements *after* they are laid out in the DOM. It’s like grabbing the “corner handles” in Adobe/Figma!
<!-- .after -->

<dl class="balance">
<dt>

`scale()`/`scaleX()`/`scaleY()`/`scaleZ()`/`scale3d()`

</dt>
<dd>

[Change the displayed size](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/transform-function/scale) of the element—as if it is an image.

</dd>

<dt>

`skew()`/`skewX()`/`skewY()`

</dt>
<dd>

[Tilt an element](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/transform-function/skew) to the left or right, like turning a rectangle into a parallelogram.

</dd>

<dt>

`translate()`/`translateX()`/`translateY()`/`translate3d()`

</dt>
<dd>

[Move an element](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/transform-function/translate) left/right and up/down, and also in three-dimensional space.

</dd>

<dt>

`rotate()`/`rotate3d()`

</dt>
<dd>

[Spin the element](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/transform-function/rotate).

</dd>

<dt>

`perspective()`

</dt>
<dd>

Doesn’t affect the element itself, but [sets the distance](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/transform-function/perspective) between the user and the <nobr>three-dimensional</nobr> plane.

</dd>
</dl>

<sub>The units for these are all a bit different; [MDN is your friend](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function) here, as usual!</sub>
<!-- .before -->

</div>

<div class="right">

- [<cite>`transform` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
	<sub>These are fun—but should *not* be used for actual layout!</sub>

- [<cite>`<transform-function>` type – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/transform-function)
	<sub>The different types.</sub>
<!-- .sticky -->

</div>

#### Multiple Transforms <!-- .before -->

 You can also have multiple transforms on a single element, which are written *space-separated* (no comma!) and then are applied one after the other:
<!-- .balance .before style="margin-block-end: 1rlh" -->

```css <!-- .before .verso -->
.rotated {
	transform: rotate(-5deg);
}
```

```css <!-- .after .before .recto -->
.rotated-and-scaled {
	transform: rotate(-5deg) scale(120%);
}
```

#### Individual Properties <!-- .before -->

The most commonly used `transform` types [now](https://caniuse.com/mdn-css_properties_translate) also have their own separate, individual properties: [`translate`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/translate), [`rotate`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/rotate), and [`scale`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scale)—which are applied in that order!

You just pull the values out of the function, without the `()`. This can make complicated `transform` combinations much easier to read/understand:

```css <!-- .before .body .center -->
.transformed {
	transform: translate(1rem 1rem) rotate(-5deg) scale(120%) skew(5deg);
}
```

```css <!-- .before .right -->
.transformed-individually {
	translate: 1rem 1rem;
	rotate: -5deg;
	scale: 120%;
	transform: skew(10deg);
}
```

#### Okay, What Do They Do? <!-- .before -->

Keep in mind that these transformations are also applied *after* the rest of the CSS is parsed (like [`filter`](#filter)), and thus treat your element a bit like an image. And like `overflow` [above](#overflow), `transform` also creates a new [*stacking context*](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context) for its children:
<!-- .balance .before -->

<figure style="--lines: 24">

***[Transform example](transform/style.css)***

<figcaption>

Note how the elements *don’t* take up more space in the document flow/layout—but they *do* cause an overflow!

</figcaption>
</figure>

> [!CAUTION]
>
> You should *not* use `transform` for layout—only for what other properties *can’t* accomplish!
>
> <sub>It might be tempting, but don’t use `translate` when `margin`/`padding` or `flex`/`grid` can achieve your layout. This is *bad* practice, and usually very brittle! Especially when working responsively.</sub>
>

## And Motion!

### `transition`

CSS [transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions) allow us to move nicely between changing CSS property values—triggered by interaction.

- [<cite>Using CSS Transitions – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions)
	<sub>Every state change is better with some easing.</sub>

- [<cite>Easing Functions</cite>](https://easings.net/)
	<sub>Custom [`cubic-bezier()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/easing-function/cubic-bezier) curves for acceleration control.</sub>
<!-- .right .rows--3 -->

Instead of having a property take effect *immediately* when a change is applied, we can tell a CSS property to *transition* from one value to another over a given amount of time ([a *duration*](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transition-duration)), and with a specific acceleration ([a *timing-function*](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transition-timing-function)), or after some time ([a *delay*](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transition-delay)). Motion can quickly get very complex!
<!-- .balance -->

#### You Need Two States to Transition!

Frequently, CSS transitions will be used *with* JavaScript (later, for us) when adding/removing classes—to make a *state* change (before vs. after) less abrupt.

For now, we’ll use [*pseudo-classes*](../css/index.md#pseudo-classes-selectorstate-selectorinstance) to demonstrate different *states*, the most common being `:hover`:
<!-- .balance -->

<figure style="--lines: 19">

***[Transition Example](transition/style.css)***

<figcaption>

`:hover` changes can often use a bit of [*coyote time*](https://en.wiktionary.org/wiki/coyote_time) to feel less flickery/glitchy!.

</figcaption>
</figure>

#### Shorthand?

You’ll often see a `transition` in shorthand, but [again](../box-model/index.md#a-sidebar-about-shorthand) it can be clearer with the discrete properties:
<!-- .before -->

```css <!-- .before .center .verso -->
.some-cool-transition {
	transition: all 2s 1s linear;
}
```

```css <!-- .before .recto -->

.some-cool-transition {
	transition-delay: 1s;
	transition-duration: 2s;
	transition-property: all;
	transition-timing-function: linear;
}
```

#### Multiple Transitions? <!-- .before -->

You can also control how different properties of an element transition independently, with a *comma-separated* list:
<!-- .balance -->

```css <!-- .before .center .verso -->
.some-cool-transition {
	transition: background-color 2s linear, transform 1s ease-in-out;
}
```

```css <!-- .before .recto -->
.some-cool-transition {
	transition-duration: 2s, 1s;
	transition-property: background-color, transform;
	transition-timing-function: linear, ease-in-out;
}
```

<sub>The shorthand here is *sometimes* easier than discrete properties, where you have to maintain the same order across all of them. It’s all the same to the computer!</sub>

#### Avoid Reflows!

Nearly all CSS properties can be transitioned—but keep in mind that changes that cause a *reflow* (re-triggering *layout*, sometimes called *paint*) [are slow](https://web.dev/animations-guide/#triggers) and can make your page feel glitchy—especially when you start having many of them, or they’re easy to trigger (like `:hover`).

Each and every in-between state causes the browser to re-render your entire document! So stick to changes of `color`, `opacity`, and `transform` for the smoothest performance.

### `animation`

Sometimes, transitioning a property from one value to another isn’t enough—you may need more complicated (or repeating) motion behavior. CSS `animation` allows precise state sequencing with `@keyframes` (akin to… *keyframes* or a timeline in other software contexts).
<!-- .balance -->

[<cite>Using CSS Animations – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)
<sub>Make things feel more alive.</sub>
<!-- .right .rows--2 -->

To create a keyframe animation, we define an element’s initial state in CSS—then an `animation` property, which includes timing and behavior, as well as an animation name (something that you make up). Again, you’ll often see these in shorthand:
<!-- .balance .before -->

<div class="verso">

```css <!-- .before .verso -->
section {
	animation: blinking 3s infinite ease-in-out;
}
```

</div>

```css <!-- .before .recto -->
section {
	animation-duration: 3s;
	animation-iteration-count: infinite;
	animation-name: blinking;
	animation-timing-function: ease-in-out;
}
```

Importantly, we then define the actual keyframes of an animation in a separate [*at-rule*](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_syntax/At-rule). Each *keyframe* is specified with a percentage of the animation’s duration, and can specify multiple properties—a bit like *selectors* for the time:
<!-- .balance .before -->

<figure style="--lines: 22">

***[Animation Example](animation/style.css)***

<figcaption>

Don’t go overboard! A little animation goes a long way.

</figcaption>
</figure>

**For accessibility, it is best-practice to *scope* your transitions and animations to folks who don’t mind the motion with [media queries](../responsive/index.md#prefers-contrast-prefers-reduced-motion).**

---

> With great power there must also come great responsibility.
>
> [<cite>Stan Lee, 1962</cite>](https://en.wikipedia.org/wiki/With_great_power_comes_great_responsibility)
