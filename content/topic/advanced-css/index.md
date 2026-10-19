```javascript
const week = 9
const draft = true
```

# Some Additional, Advanced CSS

## Nuance and Webbiness

Our HTML/CSS focus up to this point has been relatively broad, to start with the basics. Here we want to sand down some of the rough edges, and introduce you to some specific, advanced techniques you can use to refine and enliven your work—still with just CSS, no JavaScript (yet)!

A good pattern to follow in web (and all) development is to use each technology *only* for what it does *best*—using HTML for semantic meaning, CSS to handle how we form a page, and, later, JavaScript to introduce more interaction. But even before we get to JS, we can start to layer in some more interest and liveliness with our CSS.

**Let’s look at some examples.**

---

> It is vain to do with more what can be done with less.
>
> [<cite>William of Ockham, 1324</cite>](https://mathshistory.st-andrews.ac.uk/Biographies/Ockham)

## Overflows and Scrolling

An `overflow` in CSS happens when there is too much content to fit in a container—usually because you have manually constrained its `block-size` or `inline-size`. (By default, the browser will try to show you everything!)
<!-- .balance -->

- [<cite>`overflow` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
- [<cite>Overflowing Content – MDN</cite>](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Overflowing_content)
	<sub>Lot of MDNs, here.</sub>
<!-- .right .rows--2 -->

But we can use this behavior *intentionally* to crop our content, or create interally-scrolling areas:
<!-- .balance -->

<figure
	@source="overflow/preview/?active=style.css"
	style="--lines: 23"
	>
</figure>

Importantly, this creates a new *stacking context*—which means things with `position` (namely, `position: sticky`)—and some other properties—will now use the `overflow` container as their reference/origin:
<!-- .balance .before--3 -->

[<cite>The stacking context – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context)
<sub>*Always* confusing; think of these as *frames* or *groups* in Figma.</sub>
<!-- .right -->

<figure
	@source="overflow-sticky/preview/?active=style.css"
	style="--lines: 16"
	>
</figure>

<!-- TODO: scroll-behavior: smooth; example! -->

### `text-overflow` / `-webkit-line-clamp`

You can also *excerpt* text (perhaps on a landing page) with the `text-overflow` (for a single line) or `-webkit-line-clamp` (for multiple lines) properties—which will add [an ellipsis](https://en.wikipedia.org/wiki/Ellipsis) <samp>…</samp> where the text overflows. Only do this when the full text is available on a subsequent page:
<!-- .balance -->

- [<cite>`text-overflow` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow)
	<sub>For single lines…</sub>
- [<cite>`-webkit-line-clamp` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp)
	<sub>And multiple lines!</sub>
<!-- .right -->

<figure
	@caption="This `-webkit` stuff is hokey, but still how it is done! Browsers are weird."
	@source="text-overflow/preview/?active=style.css"
	style="--lines: 18"
	>
</figure>

## Precise Text Positioning

You have probably noticed that HTML renders a lot of extra space around text elements, called the *line box* (or, in design software parlance, the *bounding box*).

- [<cite>Font Metrics, Line-&NoBreak;Height and Vertical-&NoBreak;Align</cite>](https://iamvdo.me/en/blog/css-font-metrics-line-height-and-vertical-align)
	<sub>A deep-dive on type positioning.</sub>

- [<cite>Vertical Spacing and Line-Height in Design Systems – Google Fonts</cite>](https://fonts.google.com/knowledge/using_type/vertical_spacing_and_line_height_in_design_systems)
	<sub>It’s all very complicated.</sub>
<!-- .right .rows--3 -->

It is based on the `font-family`, the `font-size`, and the `line-height`, which basically means it is different all the time—and crucially, often different from Adobe/Figma to HTML. This makes it difficult to position type precisely—especially at large, expressive sizes like your headings! It’s always annoying, and you’ll often be adding/subtracting your spacing (`margin` or `padding`) to account for it, if you want to line everything up *just right*, optically.

Let’s avoid it. We can use [pseudo-elements](../css/index.md#pseudo-elements-selectorpseudo), `::after`/`::before`—which you may remember are entirely created by CSS, not in your HTML—to negate this vertical space with a negative margin. By doing this on the pseudo-elements, we can still position the parent element normally, otherwise:
<!-- .balance .before--3 -->

<figure
	@caption="Here we also move the text with `margin-inline-start` and `margin-inline-end`, though usually this adjustment is much more minor (to the point of ignoring)."
	@source="bounding-box/preview/?active=style.css"
	style="--lines: 31"
	>
</figure>

### `text-box` is coming

Figma was actually *ahead* of CSS here with its [recent <samp>Vertical Trim</samp> option](https://help.figma.com/hc/en-us/articles/360039956634-Explore-text-properties#h_01H96FW9Z3W7J7Z2HEN8V17BZT). The code for this kind of thing is getting *much* easier with the analogous `text-box-trim` and `text-box-edge` properties! These will negate all this pseudo-element, negative-margin dance with one line of code.
<!-- .balance -->

- [<cite>`text-box` - MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/text-box)
- [<cite>`text-box-trim` - web.dev</cite>](https://developer.chrome.com/blog/css-text-box-trim)
	<sub>So… much… easier!</sub>
<!-- .right -->

<aside>

<mark>Caution: uneven browser support</mark>

After a decade of workarounds and discussion, both shipping Chrome and Safari [now support](https://caniuse.com/css-text-box-trim) the super-easy `text-box` properties! But Firefox still does not, and it might be some time there.

(This course site uses these heavily—among the reasons it appears slightly broken in Firefox/older browsers!)

</aside>

## Text Ragging (Kinda)

We’ve gone on-and-on about how you can’t treat the web like print—always [perfectly ragging](../typography/index.md#ragging) your text for nice, smooth blocks. In modern (responsive) web design we don’t always know what our text will be, nor where it will wrap!

But we can do a handful of things to make for *better* ragging/wraps, given the unknowns—judiciously using `hyphens`&#x202F;/&thinsp;`&shy;`, `<wbr>`, `white-space`, `<nobr>` and `&nbsp;`, and `text-wrap` to *somewhat* control your line breaks.

### `hyphens` / `&shy;`

The `hyphens` property allows long, multi-syllable words to be [hyphenated](https://en.wikipedia.org/wiki/Hyphen#Justification_and_line-wrapping) when they wrap across multiple lines. This can be done automatically by the browser, or by manually inserting `&shy;` (for [*soft hyphen*](https://en.wikipedia.org/wiki/Soft_hyphen)) as an [HTML character/entity references](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#:~:text=All%20named%20character%20entity%20references):
<!-- .balance -->

[<cite>`hyphens` - MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens)
<sub>This depends on the browser and [`lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/lang), unless you manually add `&shy;`.</sub>
<!-- .right -->

<figure
	@caption='Note `<html lang="en">` is needed—as the `auto` property works from each browser’s different, internal (and usually, only English) dictionary—so this all has somewhat limited utility/reliability/consistency.'
	@source="hyphens/preview/?active=style.css"
	style="--lines: 15"
	>
</figure>

### `<wbr>`

Somewhat related/similar to `&shy;`, the `<wbr>` is a <nobr>(void/empty)</nobr> HTML element that denotes a *word break* opportunity—a bit like an optional `<br>`&#x202F;! You can use these to manually control where single long word will wrap, *without* a hyphen:
<!-- .balance -->

[<cite>`wbr` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/wbr)
<sub>These are often needed with slashes/URL&NoBreak;s.</sub>
<!-- .right -->

<figure
	@source="wbr/preview/?active=index.html"
	style="--lines: 20"
	>
</figure>

### `white-space: nowrap;` / `<nobr>` / `&nbsp;`

But much more often, you’ll want to keep certain words *together*—to avoid a [widow or orphan](../typography/index.md#widows-and-orphans), or to keep important/related text together—like in dates, *October 24*, or with  names like *van Zanten*.

- [<cite>`white-space` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
	<sub>*Prevents* text from wrapping.</sub>

- [<cite>`nobr` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nobr)
	<sub>This is *technically* deprecated. But [one of your instructors](https://michaelfehrenbach.com) is a “stan.”</sub>
<!-- .right .rows--3 -->

You can keep multiple words (or whole phrases) together with `white-space: nowrap;`. Historically, the `<nobr>` tag applied this—keeping in mind that like `<em>` or `<strong>`the default behavior is cleared by most [resets](../css/index.md#resets) (ours included)—so likewise you have to restore the property in your own CSS.

You can also use a manual `&nbsp;` [character/entity reference](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#:~:text=All%20named%20character%20entity%20references) between words:

<figure
	@caption="On a Mac, you can insert an *encoded* `&&NoBreak;nbsp;` with <nobr><kbd>⌥</kbd> <kbd>Space</kbd></nobr>&#x202F;. (It’s apparently [much harder](https://superuser.com/a/1414666) on Windows.) This works in many programs, not just your IDE! It’s harder to see, but easier to read."
	@source="nobr-nbsp/preview/?active=index.html"
	style="--lines: 23"
	>
</figure>

### `text-wrap: balance;`

After many, many years of patient, typographic waiting (and [some JS](https://github.com/adobe/balance-text) [shenanigans](https://www.ctrl.blog/entry/text-wrap-balance.html)) we now have widespread (and mostly even) [browser support](https://caniuse.com/css-text-wrap-balance) for “balancing” uneven line lengths with `text-wrap: balance;`&#x202F;:
<!-- .balance -->

[<cite>`text-wrap` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap)
<sub>Don’t overuse/abuse this in running text, though!</sub>
<!-- .right -->

<figure
	@caption="This is particularly noticeable (and helpful) for centered text! There is also [`pretty`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap#pretty), but Safari *just* started [to support it](https://caniuse.com/mdn-css_properties_text-wrap_pretty) and Firefox still doesn’t."
	@source="balance/preview/?active=style.css"
	style="--lines: 9"
	>
</figure>

## Hanging Punctuation (Sorta)

Ideally we could set punctuation *outside* of our text blocks, for visual alignment based solely on the letters—a traditional design technique called [*hanging punctuation*](https://en.wikipedia.org/wiki/Hanging_punctuation). (There *is* actually a [CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/hanging-punctuation) for this, but [only Safari](https://caniuse.com/?search=hanging-punctuation) supports it! …ish.) But we can still approximate the behavior, at least for quotes:
<!-- .balance -->

[<cite>`::before` and `::after` – CSS Tricks</cite>](https://css-tricks.com/almanac/selectors/a/after-and-before/)
<sub>Another great *CSS Tricks* article.</sub>
	<!-- .right -->

<figure
	@caption="Note that the (pasted-in) [curly quotation marks](https://en.wikipedia.org/wiki/Quotation_mark) are *not* in the HTML here in the last example! [Pseudo-elements](../css/index.md#pseudo-elements-selectorpseudo) again, `::before` and `::after`."
	@source="hanging-punctuation/preview/?active=style.css"
	style="--lines: 28"
	>
</figure>

**When in doubt, *[The Elements of Typographic Style](https://readings.design/PDF/the_elements_of_typographic_style.pdf)* explains these conventions.**

**But also, as Bringhurst says, “read the text before designing it.” Always put yourself in the mind of your reader!**

<aside>

<mark>Reminder: *There is no perfect layout*</mark>

These strategies only work if you can *manually* edit your text content, which is not always feasible—with templating/content management systems, editors, time, and so on.

Do it when feasible—and give more attention to your large headings, then your body copy, etc. going down your hierarchy.

</aside>

## Filters!

CSS can apply visual effects on elements—adjusting their graphical display *after* they are laid out and rendered in the page—with the `filter` property:
<!-- .balance -->

[<cite>`filter` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)
<sub>Back to MDN.</sub>
<!-- .right -->

<figure
	@caption="Note that multiple filters are applied in *sequence*—changing the order changes the end/rendered result."
	@source="filter/preview/?active=style.css"
	style="--lines: 24"
	>
</figure>

These have corresponding `backdrop-filter` values—which apply the effect to the page *behind* an element! You’ll often use these in conjunction with an [`opacity` (or semi-transparent `color`)](../css/index.md#color) or a `mix-blend-mode` for interesting Photoshop/Figma-like layer-blending effects:
<!-- .balance -->

- [<cite>`backdrop-filter` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
- [<cite>`mix-blend-mode` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode)
	<sub>Often used together.</sub>
<!-- .right -->

<figure
	@caption="These are “hot rn.”"
	@source="backdrop-filter/preview/?active=style.css"
	style="--lines: 29"
	>
</figure>

## Transforms!

<div class="body">

Beyond our standard sizing and layout afforded by CSS, you can also *visually* manipulate elements using CSS [transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)—scaling, skewing, translating, or rotating elements *after* they are laid out in the DOM. It’s like grabbing the “corner handles” in Adobe/Figma!
<!-- .after--3 -->

`scale()`&#x202F;/&thinsp;`scaleX()`&#x202F;/&thinsp;`scaleY()`&#x202F;/&thinsp;`scaleZ()`&#x202F;/&thinsp;`scale3d()`
: Change the displayed size of the element—as if it is an image.

`skew()`&#x202F;/&thinsp;`skewX()`&#x202F;/&thinsp;`skewY()`
: Tilt an element to the left or right, like turning a rectangle into a parallelogram.

`translate()`&#x202F;/&thinsp;`translateX()`&#x202F;/&thinsp;`translateY()`&#x202F;/&thinsp;`translate3d()`
: Move an element left/right and up/down, and also in three-dimensional space.

`rotate()`&#x202F;/&thinsp;`rotate3d()`
: Rotate the element.

`perspective()`
: Doesn’t affect the element itself, but sets the distance between the user and the <nobr>three-dimensional</nobr> plane.
<!-- .balance -->

</div>

<div class="right">

[<cite>`transform` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
<sub>These are fun—but should *not* be used for actual layout!</sub>
<!-- .sticky -->

</div>

The units for these are all a bit different; [MDN is your friend](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function) here, as usual. You can apply single or multiple transforms, which are written *space-separated* and applied one after the other:
<!-- .balance .before--3 -->

<div class="before--1 left">

```css
.rotated {
	transform: rotate(-5deg);
}
```

</div>

<div class="before--1" style="grid-column: left-end / five-end">

```css
.rotated-and-scaled {
	transform: rotate(-5deg) scale(120%);
}
```
</div>

Keep in mind that these transformations are applied *after* the rest of the CSS is parsed, and thus treat your element a bit like an image. And like `overflow` [above](#overflows-and-scrolling), `transform` also creates a new [*stacking context*](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context) for its children:
<!-- .balance .before--2 -->

<figure
	@caption="Note how the elements *don’t* take up more space in the document flow/layout—but they *do* cause an overflow!"
	@source="transform/preview/?active=style.css"
	style="--lines: 20"
	>
</figure>

You shouldn’t use `transform` for layout—as in, don’t use `translate` when `margin`, `padding`, `flex`, or `grid` can achieve your layout. This is *bad* practice, and usually very brittle! Especially when working responsively.

**Use `transform` only for what other properties can’t accomplish!**

## Transitions!

CSS [transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions) allow us to move nicely between CSS property values.

[<cite>Using CSS Transitions – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions)
<sub>Every state change is better with some easing.</sub>
<!-- .right .rows--2 -->

Instead of having a property take effect *immediately* when a pseudo-class is applied (or later, and more commonly, with JS—a proper class), we can tell a CSS property to *transition* from one value to another over a given amount of time (`duration`), and with a specific acceleration (`timing-function`), or a delay. Motion can quickly get very complex!
<!-- .balance -->

You’ll often see a `transition` in shorthand:
<!-- .before--3 -->

<div class="before verso">

```css
.some-cool-transition {
	transition: all 2s 1s linear;
}
```

</div>

<div class="before recto">

```css
.some-cool-transition {
	transition-delay: 1s;
	transition-duration: 2s;
	transition-property: all;
	transition-timing-function: linear;
}
```

</div>

You can also control how different properties of an element transition independently, with a *comma-separated* list:
<!-- .balance .before--3 -->

```css <!-- .before .verso -->
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

<sub>Sometimes the shorthand here is easier than discrete properties, where you have to maintain the same order across all of them. It’s all the same to the computer!</sub>

Often, CSS transitions will be used *with* JavaScript when adding/removing classes, to make a state change less abrupt. For now, we’ll use [*pseudo-classes*](../css/index.md#pseudo-classes-selectorstate-selectorinstance) to demonstrate:
<!-- .balance .before--3 -->

<figure
	@caption="You can get even more control over the easing with a [custom curve function](https://easings.net)."
	@source="transition/preview/?active=style.css"
	style="--lines: 15"
	>
</figure>

Nearly all CSS properties can be transitioned—but keep in mind that changes that cause a *reflow* (re-triggering *layout*, sometimes called *paint*) [are slow](https://web.dev/animations-guide/#triggers) and can make your page feel glitchy—especially when you start having many of them. Each in-between state causes the browser to re-render your entire document! So stick to changes of `color`, `opacity`, and `transform` for the smoothest performance.

## And Animations!

Sometimes, transitioning a property from one value to another isn’t enough—you may need more complicated (or repeating) motion behavior. CSS `animation` allows precise state sequencing with `@keyframes` (akin to… *keyframes* or a timeline in other software contexts).
<!-- .balance -->

[<cite>Using CSS Animations – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)
<sub>Make things feel more alive.</sub>
<!-- .right .rows--2 -->

To create a keyframe animation, we define an element’s initial state in CSS—then an `animation` property, which includes timing and behavior, as well as an animation name (something that you make up). Again, you’ll often see these in shorthand:
<!-- .balance .before--3 -->

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
<!-- .balance .before--3 -->

<figure
	@caption="Don’t go overboard! A little animation goes a long way."
	@source="animation/preview/?active=style.css"
	style="--lines: 22"
	>
</figure>

**For accessibility, it is best-practice to *scope* your transitions and animations to folks who don’t mind the motion with [media queries](../responsive/index.md#prefers-contrast-prefers-reduced-motion).**

---

> With great power there must also come great responsibility.
>
> [<cite>Stan Lee, 1962</cite>](https://en.wikipedia.org/wiki/With_great_power_comes_great_responsibility)
