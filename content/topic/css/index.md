```javascript
const week = 4
const order = 1
```

# An Intro to CSS

## First Again, Why Is This Important?

Beyond just “making it look good,” what does learning CSS do for us? What can we take away from it? Many things will be in common [with HTML](../html/index.md#first-why-do-we-care)—but what else?

<details>
<summary>

Why should a designer care about CSS?

</summary>

- **You’ll be working with a developer who (probably) does *not*&#x202F;!**

- **The patterns of CSS—relationships, rules, types, classes, exceptions—are useful models/tools for *any* design work, even non-digital things.**

- **In particular, its “large to small” specificity/cascade paradigm helps structure robust, resilient design thinking.**

- **Unpacking our design intuition in code makes us better at understanding and then verbalizing our rationale, IRL.**

- **It offers many novel forms of expression, which can broaden our aesthetic horizons.**

- **Within *one* language, we can tackle (international) typesetting, (all kinds of software) interaction, and (even) motion.**

- **It is flexible, powerful, and *evolving*&#x202F;! Gets better every day.**
<!-- .balance -->

</details>

## CSS stands for *Cascading Style Sheets*

**CSS is the standard language/format for styling web pages, which specifies what the page’s HTML will look like in the browser.**
<!-- data-description -->

- [<cite>CSS – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS) \
	MDN, as is custom.

- [<cite>Basics of CSS</cite>](https://www.youtube.com/watch?v=BUZIaTHm_oE) \
	Another ASMR introduction from Laurel.

- [<cite>Google’s *web.dev* CSS Course</cite>](https://web.dev/learn/css/) \
	Different order from ours, but pretty good.

- [<cite>HTML Color Codes</cite>](https://htmlcolorcodes.com/) \
	Too many ads, but some nice tools for color.

- [<cite>Google Fonts</cite>](https://fonts.google.com) \
	We’ll use this for free font families.

- [<cite>Wakamai Fondue</cite>](https://wakamaifondue.com) \
	“What can my font do?”
<!-- .right .rows--6 -->

In our ongoing analogy, CSS is the *skin* of the web. [Just like HTML](../html/index.md), at its most basic it is still just text, in a file, on a computer. It can live inside HTML documents themselves, but is more commonly seen on its own with the extension `.css`

CSS came after HTML, first proposed by [H<span class="a-ring">å</span>kon Wium Lie](https://www.w3.org/Style/CSS20/history.html) in 1994—who was working with our friend Tim at CERN and wanted more control over the presentation of web pages. (Tim was *against* the idea, thinking it should be up to each user—he lost.) It’s had three major revisions that have grown the vocabulary:

- CSS 1, 1996
- CSS 2, 1998
- CSS 3, 1999

<sub>For the past decade or so, features have been added incrementally by browsers “within” the CSS 3 “standard” (as it was/is with HTML). That’s how it goes, these days.</sub>

> The change in relationship between generator and consumer of information is going to take some getting used to. \
> …
>
> I'll comment that style sheets constitute a wormhole into unspeakable universes. People start thinking they'll just set up a little file […] and soon it grows uncontrollable.
>
> [<cite>James D. Mason, 1994</cite>](http://ksi.cpsc.ucalgary.ca/archives/HTML-WG/html-wg-94q4.messages/0279.html)

## Where CSS Lives

Before we get into the CSS syntax itself, let’s talk about how it is incorporated with your HTML.

**There are ~~three~~ *four* ways CSS can be added to your page:**

1. [**Inline**](#1-inline-with-style) on individual HTML tags themselves
1. [**In-HTML**](#2-in-html-with-style) blocks via `<style>` elements
1. [**External**](#3-external-with-link), separate `.css` files via `<link>` elements
1. [**External (layered)**](#4external-with-import-to-assign-layer) using `@import`/`layer()`

### 1.<span class="cap"> </span>Inline with `style=`

This is the original and most straightforward way to add styles, directly as [*attributes*](../html/index.md#attributes) in HTML tags:

```html
<p style="color: red;">This text will be red!</p>
```

Seems obvious. However this has some big downsides—imagine you want to style all of your paragraphs in the same way, and with multiple properties:
<!-- .before -->

```html <!-- .all -->
<p style="color: red; font-family: sans-serif;">This text will be red!</p>
<p style="color: red; font-family: sans-serif;">I’d also like this to be red.</p>
<p style="color: red; font-family: sans-serif;">And they are all sans-serif, too.</p>
<p style="color: red; font-family: sans-serif;">Awful lot of repetition, here.</p>
<p style="color: red; font-family: sans-serif;">You get the idea, this is bad.</p>
```

It makes it hard to read, and hard to change and maintain—you’d have to update every single instance. (In software, we’d refer to this as [*brittle*](https://en.wikipedia.org/wiki/Software_brittleness)—meaning it is easy to break.)
<!-- .before -->

### 2.<span class="cap"> </span>In-HTML with `<style>`

<div class="center verso">

The next way that was added to the standard was using a special HTML element, `<style>`, that wraps blocks of CSS that then apply to an entire document. They go up in the `<head>` of our [HTML documents](../html/index.md#the-basic-document).

The rules are written written with selectors—more on those, below. But importantly, we can now control styling of all the paragraphs easily, at once.

</div>

<div class="recto">

```html
<!doctype html>
<html>
	<head>
		<title>Page title</title>
		<style>
			p {
				color: red;
				font-family: sans-serif;
			}
		</style>
	</head>
	<body>
		<p>This is a paragraph.</p>
		<p>This is another paragraph.</p>
		<p>This is third paragraph.</p>
		<p>They would all be red!</p>
	</body>
</html>
```

</div>

### 3.<span class="cap"> </span>External with `<link>`

<div class="verso center">

Things are getting much better, allowing us to style whole pages easily and consistently. But what about when we have *multiple* pages?

If you wanted a whole site to use the same styles, you’d have to duplicate the `<style>` tag over and over, updating it everywhere whenever it changes. Still brittle. So along comes the `<link>` element.

</div>

<div class="after recto">

```html
<!-- `index.html` -->
<!doctype html>
<html>
	<head>
		<title>Page title</title>
		<link href="style.css" rel="stylesheet">
	</head>
	<body>
		<p>This is a paragraph.</p>
		<p>This is another paragraph.</p>
		<p>This is third paragraph.</p>
		<p>It would still be red!</p>
	</body>
</html>
```

</div>

<div class="verso">

And then in a separate `style.css` file (in this case, in the same directory as our HTML file), we can have the same rules as before—no need for the outside wrapping `<style>` tag.

This will apply to any page that we add the `<link>` to, and updating the styles will now change the color of the paragraphs for our *entire web site*.

</div>

<div class="recto center">

```css
/* `style.css` */
p {
	color: red;
	font-family: sans-serif;
}
```

</div>

### 4.<span class="cap"> </span>External with `@import` to assign `layer()`

<div class="verso center">

We’ll talk more about [*specificity*](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) later, but as your projects grow you’ll often want to organize your styles further to avoid “collisions” of multiple applied styles.

CSS more recently added [*cascade layers*](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Cascade_layers#creating_cascade_layers) to help manage this. These are most easily used in a `<style>` tag, using [`@import`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@import) to reference an external file and [`layer()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@import/layer_function) to assign it priority.

Each lower/subsequent layer takes precedent over the previous—no matter the selectors/specificity inside!

</div>

```html <!-- .recto -->
<!doctype html>
<html>
	<head>
		<title>Page title</title>
		<style>
			@import 'reset.css' layer(reset);
			@import 'base.css' layer(base);
			@import 'page.css' layer(page);
		</style>
	</head>
	<body>
		<p>…your complicated project!</p>
	</body>
</html>
```


**We’ll touch on [specificity](#specificity) below, but keep in mind that [*inline* styles](#1-inline-with-style) takes over all other methods—under the “closest, then lowest” logic. It’s another reason why we avoid it! And why `layer()` gives us more intuitive control.**

---

#### Separation of Concerns

[*Separation of Concerns*](https://en.wikipedia.org/wiki/Separation_of_concerns) is an ideology that code should be split up into sections that are responsible for a single behavior—the smaller, the better. In the case of websites—our HTML, CSS, and JS map to the different behaviors of *content*, *form*, and *function*. (Or in our anatomical analogy: *skeleton*, *skin*, and *muscles*.) These are different *concerns*.

- [<cite>Separation of Concerns - Wikipedia</cite>](https://en.wikipedia.org/wiki/Separation_of_concerns) \
	Divide your big problems into smaller ones!
<!-- .right -->

It's *much* easier to understand how it all comes together if you keep the code for these three behaviors in separate files. Your IDE will be easier to use; your diffs more sensical; you’ll know where to start looking to figure something out.

> [!WARNING]
>
> So we’ll use [external](#3external-with-link) [styles](#4using-import-to-assign-layer), only! You might see [inline](#1inline-with-style) or [in-HTML](#2style-in-html) styles elsewhere. But we should not see them in your code.
>
> <sub>They are generally a sign something has gone wrong—and that you (or your [resource](../../syllabus.md#attribution)) don’t understand why.</sub>


## CSS Rules

Even though it is used to style HTML elements, [the syntax of CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax) is very different. CSS *rules* are made up of *selectors*—used to target certain elements—and then the *declarations* that you want to apply to them. *For this thing, do this!*

- [<cite>CSS Syntax – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax) \
	They really need to update their diagrams.

- [<cite>CSS Reference – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference) \
	Their exhaustive list goes into the hundreds.
<!-- .right .rows--2 -->

The [curly brackets](https://en.wikipedia.org/wiki/Bracket#Curly_brackets) <nobr>`{` `}`</nobr> (also known as *mustaches* or *handlebars*, for their shape) enclose all the declarations you want to apply to a given selector. These *declarations* are in turn made up of *properties* and *values*.

Properties are always separated from their corresponding values by a colon `:`, and each declaration line has to end in a semicolon `;`. (It’s just how it is!) Also, there are no spaces between values and their units (like `2rem`)! You will get used to it.

<figure class="borderless all justify-center">
<img src="rule.svg">
</figure>

### Ergonomics

<div class="verso">

Just [like HTML](../html/index.md#case-whitespace-tabs-line-breaks), CSS *usually* does not care about capitalization, extra white space, or line breaks. Folks generally use tabs/indenting to indicate hierarchy, but again it is just whatever makes it easier for you!

Capitalization <em>does</em> matter when using `#id` or `.classes` as [selectors](#basic-selectors), which have to match the HTML to target exactly.

Like with HTML, it’s easiest just to be consistent and stick to lowercase (and no spaces)!

</div>

<div class="recto center">

```css
p {
	color: red;
	font-family: 'Geneva', sans-serif;
}

/* Is the same as… */

P{COLOR:RED;FONT-FAMILY:'GENEVA',SANS-SERIF;}
```

</div>

**Know that there are [many, many, *many* CSS properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference). We’ll go over some in our exercises, but look through these to become more familiar.**
<!-- .before -->

## Basic Selectors

CSS [selectors](https://web.dev/learn/css/selectors) are used to *target* certain HTML elements within the page. These can get pretty complicated, but we’ll look at the three simplest and most common targeting methods to start:

- [<cite>Type, Class, and ID Selectors – MDN</cite>](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Type_Class_and_ID_Selectors) \
	MDN again, as we do.

- [<cite>Selectors – web.dev</cite>](https://web.dev/learn/css/selectors) \
	Google, too.
<!-- .right .rows--3 -->

1. [**Elements**](#1-element-type-p-a-main-etc) like <nobr>`p` `a` `main`</nobr>, etc.
1. [**Classes**](#2-a-class-class-name) via `.class-name`
1. [**Identifiers**](#3-an-identifier-some-id) with `#some-id`
<!-- .after -->

### 1.<span class="cap"> </span>Element Type: `p` `a` `main`, etc.

If you want to change the styles for all instances of a given HTML element, you drop the <nobr>`<` `>`</nobr> from the tag for an element selector. These are called [*type selectors*](https://developer.mozilla.org/en-US/docs/Web/CSS/Type_selectors), and are a good way to “paint with broad strokes” and define some basics:

- [<cite>Type selectors – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/Type_selectors) \
	Match by node name.
<!-- .right -->

<figure style="--lines: 10">

***[Element Example](element/style.css)***

<figcaption>

Note that CSS has different `/* comment syntax */` too.

</figcaption>
</figure>

### 2.<span class="cap"> </span>A Class: `.class-name`

But maybe you don’t want to style *all* of the paragraphs. You can then use a `.class` to [target specific instances](https://developer.mozilla.org/en-US/docs/Web/CSS/Class_selectors). They are added in your HTML as an [*attribute*](../html/index.md#attributes) on the element you want to target, and can be applied specifically where you want:

- [<cite>Class selectors – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/Class_selectors) \
	Specify/match things that are alike.
<!-- .right -->

<figure style="--lines: 16">

***[Class Example](class/)***

<figcaption>

Be sure to flip between the HTML and CSS!

</figcaption>
</figure>

The *value* here is our class name, which we write in CSS by prefixing with a `.` as with `.highlight` and `.faded`. You can use these over and over, on any kind of HTML element.

 And individual elements can have *multiple* classes, too. Class names are usually qualitative/descriptive but can be whatever you want—there are [whole](https://css-tricks.com/bem-101/) [methodologies](https://css-tricks.com/lets-define-exactly-atomic-css/) about what to call these things! (And many an argument.) They are the one of the most common way to target things in CSS, especially at scale.

<sub>We’ll talk about how [conflicting](#specificity) [rules](#oh-right-the-cascade) are handled, below!</sub>

### 3.<span class="cap"> </span>An Identifier: `#some-id`

You can also use an `#id`, which is a kind of [special attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id) that can only be used *once* in an HTML document. These are useful thus useful for targeting singular, unique things in your document—like your navigation, the document title, specific headings, etc:

- [<cite>ID selectors – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/ID_selectors) \
	Specify/match singular elements.
<!-- .right -->

<figure style="--lines: 14">

***[ID Example](id/)***

</figure>

These are prefixed by `#` in your CSS, as with <nobr>`#title`/`#introduction`</nobr>—but *not* when they are in the HTML attributes, like <nobr>`id="title"`/`id="introduction"`</nobr>. This will catch you up; it still gets us sometimes!

<sub>If you remember, identifiers can also be used as [link destinations](../html/index.md#id)! Which *do* keep the `#` at the start. Computers!</sub>

## Fancy Selectors

### Compound and lists: `selector.selector` `selector, selector`

You can use [compound/combinations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Selectors/Selector_structure#compound_selector) of the above *elements*, *classes*, and *identifiers* to be even more specific—however, this can likely mean you just need to rethink your HTML structure. (We’ll unpack [*specificity*](#specificity), below.)

- [<cite>Compound selector – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Selectors/Selector_structure#compound_selector) \
	Combine simple selectors to be more specific.

- [<cite>Selector list – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/Selector_list) \
	This, that, the other.
<!-- .right .rows--2 -->

More commonly, you might apply declarations to multiple selectors, sometimes called *group selectors*, with a <nobr>comma-delineated</nobr> [selector list](https://developer.mozilla.org/en-US/docs/Web/CSS/Selector_list)—when possible, [*don’t repeat yourself*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)!

<figure style="--lines: 14">

***[Group Example](group/style.css)***

<figcaption>

Be thinking about how these might help organize your stylesheets as “design systems.” But maybe you actually want a [`.class`](#2-a-class-class-name)?

</figcaption>
</figure>

### Specific Attributes: `selector[attribute]`

You can use various other HTML [attributes](../html/index.md#attributes) as selectors too, using square brackets <nobr>`[` `]`</nobr> around them in your CSS. These are usually very similar to using *classes*, but can help you [differentiate things](https://css-tricks.com/attribute-selectors/) like internal and external links, for example:

- [<cite>Attribute selectors – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Attribute_selectors) \
	Select with other non-`.class`, non-`#id` HTML attributes.
<!-- .right -->

<figure style="--lines: 10">

***[Attribute Example](attribute/style.css)***

</figure>

### Pseudo-Classes: `selector:state` `selector:instance`

#### States / Instances

These are [special selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes), added to `element`, `.class`, or `#id`, separated with `:`, which target unique *states* or *instances* of HTML elements. For example, you’ll often see these used to target [link states](https://web.dev/learn/css/pseudo-classes/#historic-states):

- [<cite>Pseudo-classes – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes) \
	Select elements in a particular *state*.
<!-- .right -->

<figure style="--lines: 13">

***[Pseudo-Class Example](pseudo-state/style.css)***

<figcaption>

Note that `:hover` [can apply](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:hover) on any element, not just links!

</figcaption>
</figure>

#### Counts / Positions

Other common pseudo-class examples have to do with [counts and positions](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes#tree-structural_pseudo-classes). The [syntax for these](https://css-tricks.com/useful-nth-child-recipies/) can be pretty complicated, but they are very powerful—for targeting specific children, often as within [lists](../html/index.md#lists):
<!-- .center -->

- [<cite>CSS `:nth-child` Tester</cite>](https://csstoolkit.net/nth-child-tester//) \
	A tool to make these more intelligible.

- [<cite>Quantity Queries – CSS Tip</cite>](https://css-tip.com/quantity-queries/) \
	Another for selecting the container.
<!-- .right -->

<figure style="--lines: 13">

***[Pseudo-Child Example](pseudo-child/style.css)***

<figcaption>

Many designs treat the first or last (top or bottom) instances differently—this is a way to select them without needing a `.class`.

</figcaption>
</figure>

#### Negation / `:not`

There is also a special [`:not` pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:not) that flips the logic and selects what does *not* match the given selector(s):

- [<cite>`:not()` pseudo-class – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:not) \
	Invert/negate the selector(s) inside the `()`.
<!-- .right -->

<figure style="--lines: 14">

***[Pseudo-Negation Example](pseudo-not/style.css)***

<figcaption>

It’s pretty easy to over-select with `:not`—but *can* be quicker than selecting a bunch of other things.

</figcaption>
</figure>


It can be [tricky](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:not#description) and confusing to use, though—so consider flipping your mental model, instead of the logic! Selectors are already hard enough.

### Pseudo-Elements: `selector::pseudo`

Slightly different are the various [pseudo-*elements*](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements), which let you style a particular *part* of an element. You’ll most often see these as `::before` and `::after`, which let us insert things around text—or for targeting [`::first-letter`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::first-letter)/[`::first-line`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::first-line):

- [<cite>Pseudo-elements – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements) \
	Not *quite* elements!
<!-- .right -->

<figure style="--lines: 17">

***[Pseudo-Element Example](pseudo-element/style.css)***

<figcaption>

Note the difference in `:` for pseudo-selectors and `::` for pseudo-elements! Also only [some properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::first-letter#allowable_properties) will work for `::first-letter`/`::first-line`.

</figcaption>
</figure>

### And Combinators: `>` `+` `~`

Last, you will often want to target something based on its relationship to other elements in HTML—its *siblings* or its *parents*. For this, CSS has [*combinators*](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Combinators), which let you relate all the various selectors we’ve learned about here together:

- [<cite>CSS combinators – MDN</cite>](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Combinators) \
	Based on HTML relationships.
<!-- .right -->

<figure style="--lines: 17">

***[Combinator Example](combinator/style.css)***

<figcaption>

These can get tricky, but also let you express some specific design intent!

</figcaption>
</figure>

Importantly, combinators can only target elements top-down, meaning that it can only “see” elements *before* and *above* themselves—meaning their *previous <em>(older?)</em> siblings* or their *parents*. This directionality somewhat corresponds with the [*cascade*](#oh-right-the-cascade), which we’ll talk about shortly.

## The Golden Age of CSS

**CSS is a living standard, and new features are shipping in browsers all the time—often making our (front-end) lives easier. Here are a few:**

### `:has()` Has Changed Things!

For many, *many* years folks have wanted a “parent selector” in CSS—meaning a way to apply a style to a parent/container based on one of its children or siblings. This has not been possible before, as mentioned above.

- [<cite>`:has()` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has) \
	This can *completely* transform and simplify style systems!
<!-- .right .rows--2 -->

CSS has [finally added](https://webkit.org/blog/13096/css-has-pseudo-class/) the [`:has()` pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:has), just in the past couple years. It allows us to write much simpler, logical styles:
<!-- .before .after -->

<div class="verso">

```css
section:has(p) { background-color: red; }
```

<sub>“All `section` with a paragraph inside.”</sub>

</div>

<div class="recto">

```css
section:has(+ ul) { background-color: gold; }
```

<sub>“All `section` that have `ul` right after”—lets you look “backwards”!</sub>

</div>

Importantly, the property is applied on the *parent* (here, the `section`)—not the selector inside the `:has()`—but is based on its presence. You can use any selector, in either position. This is *very* powerful, especially with dynamic content! All the major browsers have *[baseline (widely available)](https://web.dev/baseline)* support for it [now](https://caniuse.com/css-has).
<!-- .before -->

**All CSS expresses [*rules*](#css-rules), but think about `:has()` for matching/explaining your intuition: “this thing is a certain way because it *has* this other thing inside.”**

### Simpler `:is()` / `:where()`

There are also the recent [`:is()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:is) and [`:where()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:where) pseudo-classes—which can often be used to replace (or simplify) other [compound/list](#compound-and-lists-selectorselector-selector-selector) selectors:

- [<cite>Meet `:is()` and `:where()`– web.dev</cite>](https://web.dev/articles/css-is-and-where) \
	Simpler grouping of styles.
<!-- .right -->

<div class="verso before">

**This kind of mess:**

```css
main > h2, main > h3, main > h4,
aside > h2, aside > h3, aside > h4 {
	color: tomato;
}
```

</div>

<div class="recto">

**Can become this:**

```css
:is(main, aside) > :is(h2, h3, h4) {
	color: tomato;
}
```

</div>

<sub>Also `:where()` [can be used](https://css-tricks.com/quick-reminder-that-is-and-where-are-basically-the-same-with-one-key-difference/) to zero-out/prevent [specificity](#specificity) increases!</sub>

Sometimes adding `.classes` would work better for this kind of thing—but `:is()`/`:where()` can often more easily express the *intent* behind the relationships! And with many fewer HTML round-trips.
<!-- .before -->

**Remember, code is going to be *read* [more often](../html/index.md#case-white-space-tabs-line-breaks) than *written*&#x202F;! Make it easier to understand.**

### Also, (Native) Nesting?!

While we’re on the subject of more cutting-edge additions to CSS—[even more recently](https://caniuse.com/css-nesting) browsers have added support [for *nesting*](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting/Using_CSS_nesting) selectors—a way to easily “scope” them hierarchically, even more intuitively/flexibly than `:is()`/`:where()`.

- [<cite>Using CSS nesting – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Nesting/Using) \
	Simplify and make your style relationships more evident!
<!-- .right .rows--2 -->

This more straightforward style of writing [descendent/child selectors](#and-combinators---) was popularized by the ubiquitous [SASS extension](https://sass-lang.com)—which improved the ergonomics of CSS ahead of the language incorporating new features.

<div class="verso before">

**Instead of writing like this:**

```css
header,
footer { color: blue; }

header .any-descendent,
footer .any-descendent { color: teal; }

header > .direct-child,
footer > .direct-child { color: aqua; }

header + .right-after,
footer + .right-after { color: gray; }

header ~ .following,
footer ~ .following { color: lime; }

header.with-class,
footer.with-class { color: cyan; }

header:hover,
footer:hover { color: navy; }

header::before,
footer::before { content: 'Nesting?'; }

.parent header,
.parent footer { color: plum; }

```

</div>

<div class="recto">

**You can write like this:**

```css
header,
footer {
	color: blue;

	.any-descendent { color: teal; }

	> .direct-child { color: aqua; }

	+ .right-after { color: gray; }

	~ .following { color: lime; }

	&.with-class { color: cyan; }

	&:hover { color: navy; }

	&::before { content: 'Nesting!'; }

	.parent & { color: plum; }
}
```

<sub>Note the `&` [*nesting selector*](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Nesting_selector) which stands in for “parent element.”</sub>

</div>

…to make the actual/HTML hierarchical relationship self-evident, less redundant, and easier to change—especially as your stylesheets inevitably grow! Each level (generation?) can be any CSS selector.
<!-- .before -->

**These all can dramatically improve your editing experience! Write your styles to match your design *intent*—the reasoning, in code.**
<!-- .before -->

> [!NOTE]
>
> Embrace new developments when you can!
>
> In the experimental realm of this course, we encourage you to explore all recent developments! Our course site makes *heavy* use of `:has` / nesting, for example.
>
> <sub>Out in the “Real World,” you might work on projects that have to support older browsers—and so you won’t be able to always use such new, modern developments. But it is getting better!</sub>

## Pitfalls, Gotchas, Frustrations

**CSS has a *lot* of these—where you will find yourself asking “where is this style coming from?!” But it’s often one of these:**

### Specificity

We can’t talk about CSS without talking about *specificity*—bane of many a front-end developer. This is one way of determining what style will be applied, when there are multiple/conflicting rules.

- [<cite>Specifics on CSS Specificity – CSS Tricks</cite>](https://css-tricks.com/specifics-on-css-specificity/) \
	A *brief* overview of a very complicated thing.

- [<cite>Specificity Calculator</cite>](https://specificity.keegan.st) \
	Compare selector values and see who wins.
<!-- .right .rows--3 -->

The first three [targeting methods](#basic-selectors) (`element`, `.class`, `#id`) are listed in increasing order of [*specificity*](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity), meaning that a class beats an element rule, and an `#id` beats a class.

Said another way: identifiers are thus *more specific* than classes, which are *more specific* than element selectors. (And you shouldn’t really use them, but [inline styles](#1-inline-with-style) beat them all.) Take this example:

<figure style="--lines: 11">

***[Specificity Example](specificity/style.css)***

<figcaption>

The *specificity* “decides” what style is applied here.

</figcaption>
</figure>

You could write a *long* book (and many people have) about CSS specificity—the myriad of ways that some CSS rules take precedent over others. It is often one the more frustrating parts (especially when working with legacy code that is poorly considered).

> [!TIP]
>
> The easiest way to deal with specificity problems are to avoid them—going from “large to small” in your stylesheets, top-to-bottom!
>
> Also avoid really [complicated selectors](#fancy-selectors), which can compound specificity.
>
> <sub>And then use [`@layer`](#4-external-with-import-to-assign-layer) for larger projects with more structure!</sub>

### Oh Right, the Cascade

Yikes, we haven’t even talked about that first *C*&#x202F;! Remember, it stands for [*cascading*](https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade)—the other way of deciding what gets applied.

- [<cite>Introducing the CSS Cascade – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade) \
	MDN is pretty dry on this one.

- [<cite>The CSS Cascade</cite>](https://2019.wattenberger.com/blog/css-cascade) \
	A much nicer interactive explanation from [Amelia Wattenberger](https://wattenberger.com/).
<!-- .right .rows--2 -->

This means that when there is a tie of the same specificity (like two `.class` applying the same property), the *lowest* rule wins—literally the one further down within a CSS document, or within a style tag. If you have multiple CSS documents with `<link>` element, the lower linked document will take precedence:

<figure style="--lines: 14">

***[Cascade Example](cascade/)***

<figcaption>

Move the `.warning` above `.note` to see the change.

</figcaption>
</figure>

> [!TIP]
>
> Again, think “large to small” within your stylesheets! Knowing that, generally, lower things with “win” and be applied.
>
> <sub>Cascade will *not* best [specificity](#specificity) problems, but both work better with this top-to-bottom organizing principle.</sub>

### And Inheritance

To add some even more confusion, [some CSS properties](https://developer.mozilla.org/en-US/docs/Web/CSS/inheritance) set on a parent also apply to their children—such as `color` or `font-family` (and most other type styles). Most spacing/layout properties, like `size` and `margin` do not. (More on those, next week!)

[<cite>Inheritance – web.dev</cite>](https://web.dev/learn/css/inheritance) \
	Google is better on this one.
<!-- .right -->

Inheritance allows you to quickly set some properties globally, without having many brittle/redundant rules, as we did before—often the fastest way to approach your design:

<figure style="--lines: 12">

***[Inheritance Example](inheritance/style.css)***

<figcaption>

All the children inherit the `body` styles. Ah, finally, `sans-serif`.

</figcaption>
</figure>

> [!TIP]
>
> Inheritance can be annoying, but is also a *superpower* of CSS!
>
> <sub>Try aiming your work to taking advantage of it, versus fighting it. Like all these annoyances, they’re avoided with *systematic*, *structured* design/thinking.</sub>


### Avoiding These “Problems”

It is easiest—both in visuals, and in code—to think about your design reasoning, rules, and relationships from “large to small” (or “broad to narrow,” or “general to specific”). Decide first on what is *always* true, then move to *subsets*, and finally any *one-offs*.

In CSS, this manifests as styling [`element`](#1-element-type-p-a-main-etc) first for broad, global decisions, then some [`.class`](#2-a-class-class-name) for certain sets of things, and only use [`#id`](#3-an-identifier-some-id) when you *know* it’s a unique, singular scenario. Your stylesheet should (broadly) resemble this:
<!-- .before -->

```css <!-- .all #top-to-bottom -->
body {
	/* Things that are true of everything! */
}

main {
	/* Then moving to smaller pieces… */
}

header {
	/* …going down your page. */

	p {
		/* Maybe with some “scoped” nesting. */
	}
}

.featured {
	/* Then into more granular groups of things… */
}

.warning {
	/* …that you manually specify in your HTML. */

	p {
		/* These might also have some nesting relationships. */
	}
}

#navigation {
	/* Last, _maybe_ a couple one-offs! */
}
```

**We think this methodology will help *both* your design thinking *and* your CSS implementation!**

> [!WARNING]
>
> We should *never* see an [`!important` keyword](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/important) in your stylesheet, to “fix” these problems—it tells us you do not understand!

## Color and Type Properties

**Alright, so all this has been about *targeting* elements—what about actually styling them? Let’s introduce a few quick *properties* to get us started:**

### Color

Besides the basic examples above, [*color*](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) can be specified in a handful of different ways. What works best for you will depend on your project (and mindset); here are some of the approaches:

[<cite>CSS Colors – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors) \
	Come for the picker, stay for all the info.
<!-- .right -->

<figure style="--lines: 31">

***[Color Example](color/style.css)***

<figcaption>

Note the [`:nth-child` counting](#counts-positions) selectors. There are [147 <em>named</em>](https://htmlcolorcodes.com/color-names/) CSS colors! `tomato` is a favorite.

</figcaption>
</figure>

Named colors are quick to work with when you know a few, but [`hsla`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl) (and recently, [`color-mix`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix)) offer a much more intuitive/human way to adjust and work with colors and transparency—more how our designer brains think of these things.

<sub>These can also all be applied to `background-color` and `border`, but we’ll talk about those next week!</sub>

### Fonts

Remember, the web is text [*all the way down*](../everything/index.md#so-what-are-web-pages)&#x202F;! Much of your design vocabulary will come from your type and its decisions—especially when starting out. Everything you work on will start here.

[<cite>Fundamental Text and Font Styling – MDN</cite>](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Fundamentals) \
	All your properties.
<!-- .right .rows--2 -->

So most importantly for us, you’ll always be customizing your [typography](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Fundamentals)—starting with the [`font-family` property](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family):
<!-- .before -->

<figure style="--lines: 28">

***[Font-Family Example](font-family/style.css)***

<figcaption>

With great power comes great responsibility!

</figcaption>
</figure>

Web font licensing is a *Whole Big Thing*—so we’ll start out by making use of [Google Fonts](https://fonts.google.com) (though you can use another [free option](../typography/index.md#type-foundries)), which offers many *open-source* typefaces nicely packaged for web use. You can select *families* and *weights* there to easily include in your pages, as in the example above.

- [<cite>Google Fonts</cite>](https://fonts.google.com/)
	Easy to start with!
<!-- .right -->

### Other Type Properties

Once you’ve got a `font-family` in, there are many additional properties to control the typography—you’ll want to investigate all of these to make your type your own:

[<cite>Web Typography –<br>Interneting Is Hard</cite>](https://internetingishard.netlify.app/html-and-css/web-typography) \
	A more qualitative take.
<!-- .right -->

<figure style="--lines: 39">

***[Font Example](font/style.css)***

<figcaption>

For now, just eyeball your units in `rem`, focusing on size *relationships*. We’ll talk about other *absolute* and *relative* units soon!

</figcaption>
</figure>

## Resets

**As we talked about [last week](../html/index.md#user-agent-styles), browsers have their own, built-in way that they display HTML elements. These *<nobr>user-agent</nobr> styles* are specific, somewhat, to each platform and each browser.**

This is [the “look” we have been seeing](http://contemporary-home-computing.org/prof-dr-style/) when we write plain HTML without any CSS—usually *Times New Roman*, with blue links, and small spacing between elements.

Often, when you are working towards your own design, you will find yourself working *against* these built-in styles. So many designers/front-end folk instead start with [*resets*](https://meyerweb.com/eric/tools/css/reset/)—a semi-standard collection of CSS rules that “zero out” the browser’s built-in look for a “clean slate.”

This means you have to write everything yourself, but you have more control and aren’t building on unknown foundations. And things should be (more) consistent, across browsers and platforms.
<!-- .after -->

**This is the clean base we’ll be working from! Here is a [simple, modern reset](../../../assets/reset.css) for your `<head>`:**

```html <!-- .all -->
<link href="https://typography-interaction-2627.github.io/assets/reset.css" rel="stylesheet">
```

<sub>This is what we use here for our course site!</sub>

> [!TIP]
>
> Be sure to put the reset *before* your [own stylesheet](#3-external-with-link), lest you [override](#oh-right-the-cascade) your own work!

---

> The author of HTML documents has no influence over the presentation. Indeed, if conflicts arise the user should have the last word, but one should also allow the author to attach style hints.
> …
>
> The last point has especially been a source of much frustration among professions that are used to being in control of paper-based publishing. This proposal tries to soften the tension between the author and the reader.
>
> [<cite>Håkon Wium Lie, 1994</cite>](https://www.w3.org/People/howcome/p/cascade.html)
