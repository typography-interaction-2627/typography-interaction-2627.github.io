```javascript
const week = 5
const draft = true
```

# The Box Model

## Boxes Within Boxes Within Boxes Within Boxes

For real layout, the we first need to understand how CSS sizes elements—and how we can add space between them. This is called the [*the box model*](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model), as everything on the web begins as a rectangle.
<!-- .start style="min-block-size: calc(7rlh - 1rcap)" -->

- [<cite>Introduction to CSS Layout – MDN</cite>](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Introduction)
	As usual.

- [<cite>Layout – web.dev</cite>](https://web.dev/learn/css/layout/)
	This gets into `grid` and `flex`; we’ll talk about those next unit.

- [<cite>Learn CSS Layout</cite>](https://learnlayout.com)
	An old-but-still-good run-through.
<!-- .right .rows--2 -->

> …Use the effectiveness of the former “background” quite deliberately, and consider the blank white spaces on the paper as formal elements just as much as the areas of black type.
>
> [<cite>Jan Tschichold, 1928</cite>](https://readings.design/PDF/ThePrinciplesoftheNewTypography.pdf)

<figure
	@caption="With `box-sizing: content-box;` per the spec."
	@source="box-model.svg"
	class="before--4 verso"
	>
</figure>

<figure
	@caption="With `box-sizing: border-box;` the defacto standard. Most [CSS resets](/topic/css#resets) will do this for you! Like we said, very common."
	@source="box-model-border.svg"
	class="before--4 recto"
	>
</figure>

By default, all browsers’ *user-agent styles* have an unfortunate default—`box-sizing: content-box;`—which means that the `padding` (and `border`) exists *outside* the content `inline-size`/`width` or `block-size`/`height`—so `padding` (and `border`) is then an *outset.*

But this is often unintuitive for designers and doesn’t fit with most web design patterns—so it is very, *very* common (nearly universal) to instead override this to `box-sizing: border-box;`—which makes `padding` and `border` exist *inside* the content dimensions. Then `padding` (and `border`) is easier to think of as an *inset*. [W3C](https://www.w3.org/TR/css-box-3/) might have got this default wrong. Good ol’ CSS!

**Let’s take a look at this box, going *inside-to-outside.***

## Content

The *content area* is the guts of the element, usually text or an image. Its dimensions are defined by that content, but also can be specified directly via `width` or `height`—or `inline-size` and `block-size`. (More on those soon.)
<!-- .balance -->

<figure
	@caption="Be sure to look at the HTML here! It’s a similar structure throughout."
	@source="content/preview/?active=style.css"
	style="--lines: 11"
	>
</figure>

<aside>

<mark>Note: all styles shown are explicit</mark>

We’ve pulled our standard [CSS reset](/topic/css#resets) into the `<head>` for all of these examples, so we are only seeing the styles that are expressly written out here—no defaults!

</aside>

## Padding

Next comes [`padding`](https://developer.mozilla.org/en-US/docs/Web/CSS/padding), which extends the element’s area around the content. It’s easiest to think of this as an *inset* (if we’ve made our `box-sizing` the more-intuitive `border-box`, above):
<!-- .balance -->

[<cite>Padding – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/padding)
	There will be many of these.
<!-- .right -->

<figure
	@source="padding/preview/?active=style.css"
	style="--lines: 14"
	>
</figure>

### A Sidebar About *Shorthand*

Know that `padding`—and many other properties, including `border` and <nobr>`margin`—</nobr>can be specified with a [*shorthand* property](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties) to make it easier to use the same spacing all around, or shared top/bottom and left/right.
<!-- .balance -->

[<cite>Shorthand Properties – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties)
	Be wary of the siren call of shorthand properties!
<!-- .right -->

<div class="verso before--2">

|     |     |
| --- | --- |
|1 value:<br><br>  | All Directions/Sides           |
|2 values:<br><br> | `top/bottom` `left/right`      |
|3 values:<br><br> | `top` `left/right` `bottom`    |
|4 values:<br><br> | `top` `right` `bottom`  `left` |

</div>

<div class="recto before--2 center">

```css
section { padding: 1rem; }
section { padding: 1rem 2rem; }
section { padding: 1rem 2rem 4rem; }
section { padding: 1rem 2rem 4rem 2rem; }
```

</div>

<div class="balance verso before--2 center">

These three- and four-value rules are often harder to read and quickly understand though, so we tend to avoid them. You can *always* write the individual directions out, for clarity! (And cleaner diffs, with whole-line changes.)

</div>

<div class="recto before--2">

```css
section {
	padding-top: 1rem;
	padding-bottom: 4rem;
	padding-right: 2rem;
	padding-left: 2rem;
}
```

</div>

### …and *Logical* Properties <!-- .before--4 -->

You can also now define all your box model properties using [*logical* directions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values)—meaning instead of *physical* (`top`/`bottom`, `left`/`right`) orientations, you can [map your rules](https://adrianroselli.com/2019/11/css-logical-properties.html) to the *flow* of the text (`block-start`/`block-end`, `inline-start`/`inline-end`).
<!-- .balance -->

[<cite>CSS Logical Properties</cite>](https://adrianroselli.com/2019/11/css-logical-properties.html)
	[Adrian Roselli](https://adrianroselli.com/) has a very thorough explanation.
<!-- .right -->

In horizontal, left-to-right writing modes (as in English):
<!-- .before--2 -->

```css <!-- .verso -->
/* These horizontal physical directions: */
padding-left: 1rem;
padding-right: 1rem;

/* Map to these logical directions: */
padding-inline-start: 1rem;
padding-inline-end: 1rem;

/* And this combined property: */
padding-inline: 1rem;

/* Also this physical dimension: */
width: 20rem;

/* Becomes this logical one: */
inline-size: 20rem;
```

```css <!-- .recto -->
/* Same for the vertical directions: */
padding-top: 1rem;
padding-bottom: 1rem;

/* Mapping to these: */
padding-block-start: 1rem;
padding-block-end: 1rem;

/* And this shorthand for both: */
padding-block: 1rem;

/* This physical size: */
height: 20rem;

/* Becomes this logical one: */
block-size: 20rem;
```

<sub>This `start` / `end` terminology will come up later with `flexbox` and `grid`, so it is a good habit/mindset to get into!</sub>

This allows your design/styles to behave in a *logically* (if not *physically*) consistent way across languages with varied [writing modes](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode) and different [text directions](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir). You can write styles that work even when your site is translated! (And the two-direction shorthand is nice, here.)
<!-- .before--2 -->

<aside>

<mark>Logical properties make sense</mark>

This is a real mental model shift—for your instructors, too! We’re going to try using/referencing logical properties exclusively this year. It is the correct and modern way!

</aside>

## Border

Back to our box model, moving outwards, with [`border`](https://developer.mozilla.org/en-US/docs/Web/CSS/border). Border is… the border around an element. It has its own `border-width`, `border-color`, and also `border-style`:
<!-- .balance -->

[<cite>Border – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/border)
	Our first non-text design element! You are allowed.
<!-- .right -->

<figure
	@caption="The shorthand `border-block-start` property value order here doesn’t matter! Isn’t CSS *…logical*."
	@source="border/preview/?active=style.css"
	style="--lines: 13"
	>
</figure>

The various `border-style` options:

<figure
	@caption="Look at all those borders."
	@source="border-style/preview/?active=style.css"
	style="--lines: 23"
	>
</figure>

And fun with `border-radius`:

<figure
	@source="border-radius/preview/?active=style.css"
	style="--lines: 20"
	>
</figure>

## Margin

The last part of our box is [`margin`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin)—the space *around* an element, empty/white-space area that is used to separate an element from its *siblings*. Like `padding` and `border`, you can specify it all around or on individual sides:
<!-- .balance -->

[<cite>Margin – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/margin)
	The space between things.
<!-- .right -->

<figure
	@caption="This is away to *suggest* a multi-column feeling while keeping your reading flow clear."
	@source="margin/preview/?active=style.css"
	style="--lines: 11"
	>
</figure>

Margin has a couple tricks up its sleeve. First, it can have *negative* values—which will eat up/remove space between elements. (`padding` and `border` only take up space.) Just add a minus before the value and watch it bring things closer together:
<!-- .balance -->

<figure
	@caption="The first element pulls the second element closer with a *negative* margin."
	@source="margin-negative/preview/?active=style.css"
	style="--lines: 13"
	>
</figure>

Also [margins *collapse*](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing), meaning that they are sometimes combined into a single value (whichever is largest) between two elements. This happens most often on adjacent siblings, and is both useful and an absolute pain:
<!-- .balance -->

<figure
	@caption="You might expect the margin between the first two `section` to be `10rem`, but it is only `6rem`! They have *collapsed* to the larger value."
	@source="margin-collapse/preview/?active=style.css"
	style="--lines: 13"
	>
</figure>

## And Their Units

Okay, so now we have all these box properties—but how do we specify the dimensions? CSS has many [*length units*](https://developer.mozilla.org/en-US/docs/Web/CSS/length), used for `inline-size`, `block-size`, and also  `padding`, `border`, `margin`, and even `font-size`. (Picas, anyone?) We’ll look at some common ones.
<!-- .balance -->

[<cite>`<length>` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/length)
	*Length* is used by many properties!
<!-- .right -->

<div class="balance body center">

### Absolute Units

Maybe the easiest ones to understand, these are fixed to physical (well, sort of) sizes. In general, we try and avoid these as they are necessarily *brittle*. Remember: the web is not a “physical” medium!

<sub>With the many vagaries of screen size and density, the physical/ruler lengths will only be correct when you print. And maybe not even then!</sub>

</div>

<div class="before--3 right">

```css
.pixels {
	block-size: 360px;
	inline-size: 720px;
}

.inches {
	block-size: 5in;
	inline-size: 10in;
}

.mm {
	block-size: 84mm;
	inline-size: 400mm;
}

.pt {
	block-size: 12pt;
	inline-size: 72pt;
}
```

</div>

### Relative Units

<div class="balance verso">

<div class="before--2 sticky" style="inset-block-start: 45vh; margin-block-end: 2rlh">

Most of the time we want to use `relative` units, which depend on and respond to their context—particularly as we think ahead to *responsive* design.

<sub>These are distinctly and intrinsically *web* measurements.</sub>

</div>

</div>

<div class="add-before recto">

```css
/* Relative to nearest “sized” ancestor. */
.percentage {
	block-size: 90%;
	inline-size: 75%;
}

/* Relative to viewport height/width. */
.viewport {
	block-size: 75vh;
	inline-size: 80vw;
}

/* Relative to `:root`/`html` font-size. */
/* These define our typographic systems! */
.rem {
	block-size: 12rem;
	inline-size: 2.4rem;
}

/* These are relative to an element’s font-size. */
/* `1em` is “one line.” */
.em { block-size: 14em; }

/* The cap height. */
.cap { block-size: 1cap; }

/* Roughly one letter width. */
.ch { inline-size: 1ch; }

/* The x-height. */
.ex { block-size: 1ex; }

/* A line-height (baseline to baseline). */
.lh { block-size: 1lh; }

/* These all have `:root`-relative versions too: */
/* `rch` `rcap` `rex` `rlh` */
```

</div>

### Combine Them With a `calc()` <!-- .before--3 -->

<div class="balance center verso">

Often you will want to use different units together! Mixing types or otherwise doing some maths. For this we have the [`calc()` function](https://developer.mozilla.org/en-US/docs/Web/CSS/calc()).

</div>

<div class="add-before recto">

```css
.flexible-and-fixed {
	inline-size: calc(50% - 2rem);
}

.computer-do-the-math {
	inline-size: calc(100% / 12);
}
```

</div>

### Limit/Constrain Them

<div class="balance start before--2 verso">

<div class="before sticky" style="inset-block-start: 45vh; margin-block-end: 2rlh">

You’ll often want to set limits/constraints on values—particularly with flexible, `relative` units (and *responsive design*, which we’ll talk about soon.)

You can usually set [*minimums*](https://developer.mozilla.org/en-US/docs/Web/CSS/min-inline-size) and [*maximums*](https://developer.mozilla.org/en-US/docs/Web/CSS/max-block-size) by using the prefixes `min-` and `max-`.

</div>

</div>

<div class="recto">

```css
.constrained-width {
	min-inline-size: 12rem;
	inline-size: 50%;
	max-inline-size: 24rem;
}

.constrained-height {
	min-block-size: 6rem;
	block-size: 100%;
	max-block-size: 12rem;
}

/* Handy to watch your line lengths! */
p {
	max-inline-size: 65ch; /* 65ish letters. */
}
```

</div>

**CSS is big and massive and overwhelming and sometimes indefensibly nonsensical—but remember that you can do a surprising amount with just these basic properties!**
/* .before */

**No matter how complex it gets, it really always comes back to these basics.**

## Position

With an idea of how elements take up space, now we’ll look at how they exist and move together in the [*document flow*](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Normal_Flow). The CSS property `position` [sets this relationship](https://developer.mozilla.org/en-US/docs/Web/CSS/position).
<!-- .balance -->

[<cite>Position – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/position)
	Interesting web work often uses `position`.
<!-- .right -->

### Static

By default, every element is `static`—just meaning its normal, stacked position in the document.
<!-- .balance -->

<sub>You’ll rarely, if ever, actually set this yourself—it’s the default!</sub>

<figure
	@caption="Nothing changes here—`static` is the default. Be sure to scroll these examples!"
	@source="position-static/preview/?active=style.css"
	style="--lines: 13"
	>
</figure>

### Relative

The first thing we might want to do is adjust an element *from* that normal `static` position, which we can do with `relative` positioning.
<!-- .balance -->

Once you have set `position: relative;` you can use the logical `inset-block-start`, `inset-inline-end`, `inset-block-end`, and `inset-inline-start` values (with any of [the units](#and-their-units), above) to move the element away from its default, normal position in the flow:
<!-- .balance -->

<figure
	@caption="Note the space—the element still exists/takes up space in the *flow*."
	@source="position-relative/preview/?active=style.css"
	style="--lines: 13"
	>
</figure>

### Absolute

`absolute` positioning is somewhat similar to `relative`—but instead of placing an element in relation to its own default position, it uses the position of its nearest *positioned* ancestor as the origin.
<!-- .balance -->

So `absolute` elements will go “up the tree” of parents and wrapper elements until they find one set to anything other than default/<nobr>`static`—</nobr>then the same offset properties the element around from there.
<!-- .balance -->

Importantly, `position: absolute;` also *removes* the element from the normal document flow—meaning it takes up *no space* in the page layout.
<!-- .balance -->

<sub>This is often used for exacting, specific design element placement. But it is inherently *brittle*&NoBreak;!</sub>

<figure
	@caption="The element is out of the *flow*, and placed according to the `relative` parent."
	@source="position-absolute/preview/?active=style.css"
	style="--lines: 22"
	>
</figure>

### Fixed

`fixed` positioning also removes the element from the document flow, but it places elements with relation to the *browser viewport*—the boundaries of the window or device.
<!-- .balance -->

So `position: fixed;` brings the element *completely* out of the page’s normal flow, like it is sitting on its own separate layer.
<!-- .balance -->

<sub>This is often used for things like navigation elements.</sub>

<figure
	@caption="Try doing this in print."
	@source="position-fixed/preview/?active=style.css"
	style="--lines: 13"
	>
</figure>

### Sticky

The most recent addition to the *position* party, `position: sticky;` elements are placed according to the normal flow of the document, like `static`, until their nearest *scrolling ancestor* (usually the viewport) moves past them. The element is then *stuck* in relation to this element.
<!-- .balance -->

<sub>This is often used for headers on tables and lists.</sub>

<figure
	@caption="You’ll hear Michael say this a lot: this always feels very *web*-y."
	@source="position-sticky/preview/?active=style.css"
	style="--lines: 12"
	>
</figure>

### “Depth”

Okay, `z-index` is not strictly *positioning*—it is a separate property. You can see that all these `position` properties have given us ways to make things overlap, and `z-index` is how we can decide the *front-to-back* ordering (think [*<nobr>z-axis</nobr>*](https://en.wikipedia.org/wiki/Cartesian_coordinate_system#Three_dimensions)).
<!-- .balance -->

[<cite>Z-Index – MDN</cite>]((https://developer.mozilla.org/en-US/docs/Web/CSS/z-index))
	This can be tricky to work with!
<!-- .right -->

By default, items that are lower in the HTML (coming *after* each other) are in front of higher, earlier elements:
<!-- .balance .before--2 -->

<figure
	@caption="The two `position` properties both create new stacking contexts, `z-index: 1;` moves even elements in front."
	@source="z-index/preview/?active=style.css"
	style="--lines: 16"
	>
</figure>

A whole lot of things make a new [*stacking context*](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context) (including most `position` changes) which is kind of like a *group* (or a Figma *frame*) that has its own internal depth/overlap order.
<!-- .balance -->

No amount of internal `z-index` adjustments can “break” something out of that group—which is one of the reasons why *z* can be really difficult to understand and tricky to use. But you can always adjust the `z-index` of the group, as we do here!
<!-- .balance -->

## Display

In our [HTML introduction](/topic/html#block-elements) we briefly talked about `block` and `inline` elements—as set by the user-agent styles. These are the first two examples of [the `display` property](https://developer.mozilla.org/en-US/docs/Web/CSS/display).
<!-- .balance -->

[<cite>Display – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/display)
	Our `block` and `inline` elements (and later, `grid` and `flex`).
<!-- .right -->

### Block

As we discussed, most HTML elements are *block-level* by default. But you can also set `display: block;` manually on an `inline` element, too. This would mean that it starts on a new line, takes up the full width available, and you can specify a `block-size`, `inline-size`, and use `margin` above and below:
<!-- .balance -->

<figure
	@caption="Whenever you are linking a whole area (like an image and text together), safe bet that you want `block`."
	@source="display-block/preview/?active=style.css"
	style="--lines: 15"
	>
</figure>

### Inline

And then going the other way, you can make `block` elements switch to `inline` with `display: inline;`. They will no longer start on their own lines, will only take up as much space as their content/children, and *don’t* accept `block-size` or `inline-size` (or any `-block-start`/`-block-end`) properties:
<!-- .balance -->

<figure
	@caption="The [`white-space` property `pre`](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)-vents the spaces in the paragraphs from collapsing!"
	@source="display-inline/preview/?active=style.css"
	style="--lines: 13"
	>
</figure>

### But Also `inline-block`

You can also combine the qualities of `block` and `inline` with `display: inline-block;`. These elements take `block-size` and `inline-size` (and vertical `margin`) like *block-level* elements, but do not start on their own line:
<!-- .balance -->

<figure
	@source="display-inline-block/preview/?active=style.css"
	style="--lines: 17"
	>
</figure>

### And Sometimes `none`

Setting `display: none;` hides an element visually (and from screen readers) in the document—as well as taking it out of the *flow*. (Keep in mind the HTML is still there, if someone opens up the source code.)
<!-- .balance -->

This is a common way to hide/show (by setting another `display` property) elements on the page, but it will *reflow* the document when applied—as if the element is actually added/removed from the HTML:
<!-- .balance -->

<figure
	@caption="Poof. Like it wasn’t even there."
	@source="display-none/preview/?active=style.css"
	style="--lines: 8"
	>
</figure>

### …vs. Visibility?

You can also hide something visually *without* taking it out of the document *flow,* which is useful when you don’t want the page to jump/*reflow* when something appears/disappears.
<!-- .balance -->

[<cite>Visibility – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility)
	This also hides elements from assistive technologies (screen readers).
<!-- .right .rows--2 -->

Setting `visibility: hidden;` keeps the space an element had before, but makes it invisible and unable to be interacted with. The value `visible` is the default:
<!-- .balance -->

<figure
	@source="visibility/preview/?active=style.css"
	style="--lines: 8"
	>
</figure>

### …vs. Opacity?

Another way to hide an element visually is to adjust `opacity`, which uses values on a scale from `0`&NoBreak;–&NoBreak;`1` or `0%`&NoBreak;–&NoBreak;`100%`. This differs from `visibility` because elements with no (or partial) opacity can still be interacted with:
<!-- .balance -->

[<cite>Opacity – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/opacity)
	The entire element *and* its descendents are adjusted, as one.
<!-- .right  -->

<figure
	@caption="You can still select the text (or click links) of not-fully-opaque elements."
	@source="opacity/preview/?active=style.css"
	style="--lines: 8"
	>
</figure>

Keep in mind that `display: none;`, `visibility: hidden;`, and `opacity: 0;` only hide things in the *rendered* browser view. The HTML is always still visible in the source code!
<!-- .balance -->

## What About Floats?

Oh right, floats. Sometimes you’ll want to have an image or block flow within a block of text. There are a lot of ways to do this now, but the oldest (and sometimes still the trickiest) is a [`float`](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Floats).
<!-- .balance -->

[<cite>Floats – MDN</cite>](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Floats)
	You don’t see these used as much, anymore!
<!-- .right -->

### Left and Right

The declarations `float: inline-start;` and `float: inline-end;` take an element out of the normal flow and place it on the left or right side of its parent container.
<!-- .balance -->

Any text *siblings* will then flow around the element—like a *text wrap*—filling up any available space to its side. They will go as far up as the top of the *floated element*:
<!-- .balance -->

<figure
	@source="float/preview/?active=style.css"
	style="--lines: 17"
	>
</figure>

### Don’t Forget to `clear`

Since this takes the floated element out of the *flow*, if we want the following element (often another text block, like a `<p>`) to not move up it needs to be *cleared* with `clear: inline-start;` , `clear: inline-end;`, or `clear: both;`.
<!-- .balance -->

Applied on the following element, it will make it stay entirely below (clear of) the *floated* element:
<!-- .balance -->

<figure
	@caption="Uh oh, classic `float` problem on the second one."
	@source="float-clear/preview/?active=style.css"
	style="--lines: 19"
	>
</figure>

If you have a parent wrapper and no following element, there won’t be anything there to *clear* the float—meaning the parent will collapse down to the size of the text content. Almost never what you want.
<!-- .balance -->

You can solve this broken look with a [*clearfix hack*](https://developer.mozilla.org/en-US/docs/Web/CSS/clear#sect1), which uses a pseudo-element as an ersatz `last-child` to clear the container.
<!-- .balance -->

<figure
	@caption="Much better. `:after` is a pseudo-element—which acts here as a last child that clears the `div`."
	@source="float-clearfix/preview/?active=style.css"
	style="--lines: 23"
	>
</figure>

**Generally, folks try and avoid floats—they aren’t common in modern design patterns and have been giving people headaches for… decades now.**

They require you to know how long your content is and also how big your viewport/page will be—*both* things that you don’t always have control over in responsive/mobile 2025. But sometimes they are still the only thing that can do what you need!
<!-- .balance -->

### What about `flex` and `grid`?

**We’ll cover these next unit! They’ll make your (layout) life easier.**

> ``` <!-- @nested="true" -->
> E.g.:
> ____________
>
>  H1 has a 1 character left margin
>
>  So does H2
>
>       P starts here and could
>       go on forever. Wow, a 5
>       character left margin
>       sure looks great!
>        _____
>       | + + | Wow, you can do
>       |  @  | images as well?
>       | --- | Then you'll
>       |_____| want a 1 character
>       margin on the left side.
>       Until, you're below the
>       image that is.
> _____________
>
> This is where we the simple stacked
> box model is a bit too simple.
> ```
>
> [<cite>Håkon Wium Lie, 1995</cite>](https://lists.w3.org/Archives/Public/www-style/1995Jun/0003.html)
