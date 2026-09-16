```javascript
const week = 4
const order = 1
const draft = true
```

# An Intro to CSS

## First, Why Is This Important?

Beyond just “making it look good,” what does learning CSS do for us? What can we take away from it?

<details>
<summary>

Why should a designer care about CSS?

</summary>

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

**There are three ways CSS can be added to your page:**

1. *Inline* on HTML tags themselves
1. Via `<style>` elements in HTML documents
1. As separate/external `.css` files, via `<link>` elements

### 1.&emsp;Inline with `style=`

This is original and maybe most straightforward way to add styles, directly as [*attributes*](../html/index.md#attributes) in HTML tags:

```html
<p style="color: red;">This text will be red!</p>
```

Seems obvious. However this has some downsides—imagine you want to style all of your paragraphs in the same way, and with multiple properties:
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

### 2.&emsp;`<style>` in HTML

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

### 3.&emsp;External with `<link>`

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

**We’ll talk more about *[specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)* later, but know that the [*inline* approach](#1-inline-with-style) takes precedent over other methods—under the “closest, then lowest” logic. It’s another reason why we avoid it!**

## Separation of Concerns

[*Separation of Concerns*](https://en.wikipedia.org/wiki/Separation_of_concerns) is an ideology that code should be split up into sections that are responsible for a single behavior—the smaller, the better. In the case of websites—our HTML, CSS, and JS map to the different behaviors of *content*, *form*, and *function*. (Or in our anatomical analogy: *skeleton*, *skin*, and *muscles*.) These are different *concerns*.

- [<cite>Separation of Concerns - Wikipedia</cite>](https://en.wikipedia.org/wiki/Separation_of_concerns) \
	Divide your big problems into smaller ones!
<!-- .right -->

It's *much* easier to understand how it all comes together if you keep the code for these three behaviors in separate files. Your IDE will be easier to use; your diffs more sensical; you’ll know where to start looking to figure something out.

> [!WARNING]
>
> We’ll use external styles, only! You might see inline or in-HTML styles elsewhere. But we shouldn’t see them in your code!
>
> <sub>They are generally a sign something has gone wrong—and that you (or your [resource](../../syllabus.md#attribution)) don’t understand.</sub>


## CSS Rules

Even though it is used to style HTML elements, [the syntax of CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax) is very different. CSS *rules* are made up of *selectors*—used to target certain elements—and then the *declarations* that you want to apply to them. *For this thing, do this!*

- [<cite>CSS Syntax – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax) \
	They really need to update their diagrams.

- [<cite>CSS Reference – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference) \
	Their exhaustive list goes into the hundreds.
<!-- .right .rows--2 -->

The [curly brackets](https://en.wikipedia.org/wiki/Bracket#Curly_brackets) <nobr>`{` `}`</nobr> (also known as *mustaches* or *handlebars*, for their shape) enclose all the declarations you want to apply to a given selector. These *declarations* are in turn made up of *properties* and *values*.

Properties are always separated from their corresponding values by a colon `:`, and each declaration line has to end in a semicolon `;`. (It’s just how it is!) Also, there are no spaces between values and their units (like `2rem`)! You will get used to it.

<figure class="borderless">
<img src="rule.svg">
</figure>

**There are [many, many, many CSS properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference). We’ll go over some in our exercises, but look through these to become more familiar.**

### Ergonomics

<div class="verso">

Just [like HTML](../html/index.md#case-whitespace-tabs-line-breaks), CSS *usually* does not care about capitalization, extra white space, or line breaks. Folks generally use tabs/indenting to indicate hierarchy, but again it is just whatever makes it easier for you!

Capitalization <em>does</em> matter when using `id` or classes as selectors, which have to match the HTML to target correctly.

Like with HTML, it’s easiest just to be consistent and stick to lowercase (and no spaces)!

</div>

<div class="recto" style="align-self: center">

```css
p {
	color: red;
	font-family: 'Gorton', sans-serif;
}

/* Is the same as… */

P{COLOR:RED;FONT-FAMILY:'GORTON',SANS-SERIF;}
```

</div>

## Basic Selectors

Selectors are used to *target* certain HTML elements within the page. These can get pretty complicated, but we’ll look at the three simplest and most common targeting methods to start:

- [<cite>Type, Class, and ID Selectors – MDN</cite>](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Type_Class_and_ID_Selectors) \
	MDN again, as we do.

- [<cite>Selectors – web.dev</cite>](https://web.dev/learn/css/selectors) \
	Google, too.
<!-- .right -->

1. Elements (like <nobr>`p` `a` `main`</nobr> etc.)
1. Classes (written `.class-name`&thinsp;)
1. Identifiers (and `#some-id`&thinsp;)
<!-- .after--4 -->

### 1.&emsp;By Element Type: `p` `a` `main` etc.

If you want to change the styles for all instances of a given HTML element, you drop the <nobr>`<` `>`</nobr> from the tag for an element selector. These are called [*type selectors*](https://developer.mozilla.org/en-US/docs/Web/CSS/Type_selectors):

- [<cite>Type selectors – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/Type_selectors) \
	Match by node name.
<!-- .right -->

<figure style="--lines: 10">

***[Element Example](element/style.css)***

<figcaption>

Note that CSS has different `/* comment syntax */` too."

</figcaption>
</figure>

### 2.&emsp;With a Class: `.class-name`

But maybe you don’t want to style all of the paragraphs. You can then use a `class` to [target specific instances](https://developer.mozilla.org/en-US/docs/Web/CSS/Class_selectors). They are  added as an *[attribute](../html/index.md#attributes)* on the element you want to target:
<!-- .balance -->

- [<cite>Class selectors – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/Class_selectors) \
	Specify/match things that are alike.
<!-- .right -->

<figure style="--lines: 16">

***[Class Example](class/)***

</figure>

The *value* here is our class name, which we write in CSS by prefixing with a `.` as with `.highlight` and `.faded`.

You can use these over and over, on any kind of element. And individual elements can have *multiple* classes, too. Class names can be whatever you want—there are whole methodologies about what to call these things! (And many an argument.) They are the most common way to target things in CSS, especially at scale.

<sub>We’ll talk about how conflicting rules are handled, below.</sub>

### 3.&emsp;With an Identifier: `#some-id`

You can also use an `id`, which is a kind of [special attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id) that can only be used *once* in an HTML document. These are useful thus useful for targeting singular things—like your navigation, the document title, specific headings, etc:
<!-- .balance -->

- [<cite>ID selectors – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/ID_selectors) \
	Specify/match singular elements.
<!-- .right -->

<figure style="--lines: 14">

***[ID Example](id/)***

</figure>

These are prefixed by `#` in CSS, as with `#title` and `#introduction`. If you remember, they can also be used as [link destinations](../html/index.md#id)!

## Fancy Selectors

### Compound and lists: `selector.selector` `selector, selector` <!-- .all -->

You can use [compound/combinations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Selectors/Selector_structure#compound_selector) of the above *elements*, *classes*, and *identifiers* to be even more specific—however, this likely means you just need to rethink your HTML structure. (We’ll unpack *specificity*, below.)

- [<cite>Compound selector – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Selectors/Selector_structure#compound_selector) \
	Combine simple selectors to be more specific.

- [<cite>Selector list – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/Selector_list) \
	This, that, the other.
<!-- .right .rows--3 -->

More commonly, you might apply declarations to multiple selectors, sometimes called *group selectors*, with a <nobr>comma-delineated</nobr> [selector list](https://developer.mozilla.org/en-US/docs/Web/CSS/Selector_list):

<figure style="--lines: 14">

***[Group Example](group/style.css)***

</figure>

### With Specific Attributes: `selector[attribute]` <!-- .all -->

You can use the various [attributes](../html/index.md#attributes) as selectors too, using square brackets <nobr>`[` `]`</nobr>. These are usually very similar to using *classes*, but can help you [differentiate things](https://css-tricks.com/attribute-selectors/) like internal and external links, for example:
<!-- .balance -->

- [<cite>Attribute selectors – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Attribute_selectors) \
	Select with other non-`.class`, non-`#id` HTML attributes.
<!-- .right -->

<figure style="--lines: 10">

***[Attribute Example](attribute/style.css)***

</figure>

### Pseudo-Classes: `selector:state` `selector:instance` <!-- .all -->

These are [special selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes), added to `element`, `class`, or `id`, separated with `:`, which target unique *states* or *instances* of HTML elements. You’ll often see these used to target [link states](https://web.dev/learn/css/pseudo-classes/#historic-states):

- [<cite>Pseudo-classes – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes) \
	Select elements in a particular *state*.
<!-- .right -->

<figure style="--lines: 13">

***[Pseudo-Class Example](pseudo-link/style.css)***

<figcaption>

Note that `:hover` works on any element, not just links!"

</figcaption>
</figure>

Other common pseudo-Class examples have to do with [counts and positions](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes#tree-structural_pseudo-classes). The [syntax for these](https://css-tip.com/quantity-queries/) can be complicated, but they are very powerful:

<figure style="--lines: 16">

***[Pseudo-Child Example](pseudo-child/style.css)***

</figure>

### Pseudo-Elements: `selector::pseudo` <!-- .all -->

Slightly different the various [pseudo-*elements*](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements), which let you style a particular *part* of an element. You’ll most often see these as `::before` and `::after`, which let us insert things around text—or targeting first letters/lines:
<!-- .balance -->

- [<cite>Pseudo-elements – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements) \
	Not *quite* elements!
<!-- .right -->

<figure style="--lines: 19">

***[Pseudo-Element Example](pseudo-element/style.css)***

<figcaption>

Note the difference in `:` for pseudo-selectors and `::` for pseudo-elements."

</figcaption>
</figure>

### Finally, Combinators: `>` `+` `~` <!-- .all -->

Last, you will often want to target something based on its relationship to other elements—its *siblings* or its *parents*. For this, CSS has [*combinators*](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Combinators), which let you relate all the various selectors we’ve learned about here together:
<!-- .balance -->

- [<cite>CSS combinators – MDN</cite>](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Combinators) \
	Based on HTML relationships.
<!-- .right -->

<figure style="--lines: 17">

***[Combinator Example](combinator/style.css)***

</figure>

Importantly, combinators can only target elements top-down, meaning that it can only “see” elements *before* and *above* themselves—meaning their *previous <em>(older?)</em> siblings* or their *parents*. This directionality somewhat corresponds with the *cascade*, which we’ll talk about shortly.

## The Golden Age of CSS

### `:has()` Really …Has Changed Things! <!-- .all -->

For many, *many* years folks have wanted a “parent selector” in CSS—meaning a way to apply a style to a parent/container based on one of its children or siblings. This has not been possible before, as we mentioned above.

- [<cite>`:has()` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has) \
	This can *completely* transform and simplify style systems!
<!-- .right .rows--2 -->

CSS has [finally added](https://webkit.org/blog/13096/css-has-pseudo-class/) the [`:has()` pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:has), just in the past couple years. It allows us to write much simpler, logical styles:
<!-- .before--2 .after -->

<div class="verso">

```css
div:has(p) { background-color: red; }
```

<sub>“All `div`&thinsp;s with a paragraph inside.”</sub>

</div>

<div class="recto">

```css
div:has(+ ul) { background-color: gold; }
```

<sub>“All `div`&thinsp;s that have `ul` right after”—lets you look “backwards”!</sub>

</div>

Importantly, the property is applied on the *parent* (here, the `div`)—not the selector inside the `:has()`—but is based on its presence. You can use any selector, in either position. This is *very* powerful, especially with dynamic content! All the major browsers have *[baseline (widely available)](https://web.dev/baseline)* support for it now.
<!-- .before -->

### Oh Also, Nesting?!

While we’re on the subject of cutting-edge additions to CSS—[even more recently](https://caniuse.com/css-nesting) browsers have added support [for *nesting*](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting/Using_CSS_nesting) selectors.
<!-- .balance -->

- [<cite>Using CSS nesting – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Nesting/Using) \
	Simplify and make your style relationships more evident!
<!-- .right .rows--2 -->

This more straightforward style of writing [descendent/child selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Descendant_combinator) was popularized by the ubiquitous [SASS extension](https://sass-lang.com)—which improved the ergonomics of CSS ahead of the language incorporating new features.
<!-- .after--2 -->

<!-- TODO Add example! Also :is/:where? -->

<div class="verso add-before">

**Instead of writing like this:**

```css <!-- .add-before -->
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

```css <!-- .add-before -->
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

…to make the hierarchical relationship self-evident, less redundant, and easier to change—especially as your stylesheets inevitably grow! Each level (generation?) can be any CSS selector.
<!-- .before--2 -->

**These can dramatically improve your editing experience!**

> [!NOTE]
>
> Embrace these new developments when you can!
>
> In the experimental realm of this course, we encourage you to explore all recent developments! Our course site makes *heavy* use of `:has` / nesting, for example.
>
> <sub>Out in the “Real World,” you might work on projects that have to support older browsers—and so you won’t be able to always use such new, modern developments.</sub>

## Specificity

We can’t talk about CSS without talking about *specificity*—bane of many a front-end developer.
<!-- .balance -->

- [<cite>Specifics on CSS Specificity – CSS Tricks</cite>](https://css-tricks.com/specifics-on-css-specificity/) \
	A brief overview of a very complicated thing.

- [<cite>Specificity Calculator</cite>](https://specificity.keegan.st) \
	Compare selector values and see who wins.
<!-- .right .rows--3 -->

The first three targeting methods (`element`, `.class`, `#id`) are listed in increasing order of [*specificity*](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity), meaning that a class trumps an element rule, and an `id` trumps a class. Identifiers are thus *more specific* than classes, which are *more specific* than element selectors. (And you shouldn’t really use them, but inline styles beat them all.) Take this example:

<figure style="--lines: 11">

***[Specificity Example](specificity/style.css)***

</figure>

You could write a *long* book (and many people have) about CSS specificity—the myriad of ways that some CSS rules take precedent over others. It is often one the more frustrating parts (especially when working with legacy code that is poorly considered).
<!-- .balance -->

> [!TIP]
>
> Suffice it to say *it’s complicated.* We generally recommend `.class` use, to start!
>
> <sub>The easiest way to avoid specificity problems is generally to stay at the same level throughout your HTML, usually by just using classes throughout. Then “lowest” wins!</sub>

## Oh Right, the Cascade

Yikes, we haven’t even talked about that first *C&thinsp;*! Remember, it stands for [*cascading*](https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade).

- [<cite>Introducing the CSS Cascade – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade) \
	MDN is particularly *dry* on this one.

- [<cite>The CSS Cascade</cite>](https://2019.wattenberger.com/blog/css-cascade) \
	A much nicer interactive explanation from [Amelia Wattenberger](https://wattenberger.com/).
<!-- .right .rows--3 -->

This means that when there is a tie (like two classes applying the same property), the *lowest* rule wins—literally the one further down within a CSS document, or within a style tag. If you have multiple CSS documents with `<link>` element, the lower linked document will take precedence:

<figure style="--lines: 14">

***[Cascade Example](cascade/)***

<figcaption>

Try to avoid relying on this or even having it come up! This is one of the reasons people are frustrated by CSS."

</figcaption>
</figure>

<!-- TODO Add note about cascade layers? -->

## And Inheritance

To add even more confusion, [some CSS properties](https://developer.mozilla.org/en-US/docs/Web/CSS/inheritance) set on a parent also apply to their children—such as `color` or `font-family`. Most spacing/layout properties, like `width` and `margin` do not. (More on those, next week.)

[<cite>Inheritance – web.dev</cite>](https://web.dev/learn/css/inheritance) \
	Google is better on this one.
<!-- .right -->

This allows you to quickly set some properties globally, without having many brittle/redundant rules, as we did before:
<!-- .balance -->

<figure style="--lines: 12">

***[Inheritance Example](inheritance/style.css)***

<figcaption>

All the children inherit the `body` styles. Ah, finally, `sans-serif`."

</figcaption>
</figure>

## Color and Type Properties

Alright, so all this has been about *targeting* elements—what about actually styling them? Let’s introduce a few quick *properties* to get us started.

### Color

Besides the basic examples above, [*color*](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) can be specified in a few different ways:
<!-- .balance -->

[<cite>CSS Colors – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors) \
	Come for the picker, stay for all the info.
<!-- .right -->

<figure style="--lines: 31">

***[Color Example](color/style.css)***

<figcaption>

There are [147 <em>named</em>](https://htmlcolorcodes.com/color-names/) CSS colors! `tomato` is a favorite."

</figcaption>
</figure>

Named colors are quick to work with when you know a few, but [`hsla`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl) (and recently, [`color-mix`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix)) offer a much more intuitive/human way to adjust and work with colors and transparency.
<!-- .balance -->

<sub>These can also all be applied to `background-color` (and `border`, but we’ll talk about that next week).</sub>

### Fonts

Then perhaps most importantly, you’ll always be customizing your [typography](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Fundamentals)—starting with the [`font-family` property](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family). Remember, the web is text *all the way down*:
<!-- .balance -->

[<cite>Fundamental Text and Font Styling – MDN</cite>](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Fundamentals) \
	All your properties.
<!-- .right -->

<figure style="--lines: 28">

***[Font-Family Example](font-family/style.css)***

<figcaption>

With great power comes great responsibility."

</figcaption>
</figure>

Web font licensing is a *Whole Big Thing*—so let’s start out by making use of [Google Fonts](https://fonts.google.com), which offers many *open-source* typefaces nicely packaged for web use. You can select *families* and *weights* there to easily include in your pages, as in the example above.
<!-- .balance -->

### Other Type Properties

Once you’ve got a `font-family` in, there are many additional properties to control the typography:
<!-- .balance -->

[<cite>Web Typography –<br>Interneting Is Hard</cite>](https://internetingishard.netlify.app/html-and-css/web-typography) \
	A more qualitative take.
<!-- .right -->

<figure style="--lines: 39">

***[Font Example](font/style.css)***

<figcaption>

For now, just eyeball your units in `rem`, focusing on relationships. We’ll talk about other *absolute* and *relative* units soon."

</figcaption>
</figure>

## Resets

As we talked about [last week](../html/index.md#user-agent-styles), browsers have their own, built-in way that they display HTML elements. These *<nobr>user-agent</nobr> styles* are specific, somewhat, to each platform and each browser.

This is [the “look” we have been seeing](http://contemporary-home-computing.org/prof-dr-style/) when we write plain HTML without any CSS—usually *Times New Roman*, with blue links, and small spacing between elements.

Often, when you are working towards your own design, you will find yourself fighting against these built-in styles. So many designers/front-end folk instead start with [*resets*](https://meyerweb.com/eric/tools/css/reset/)—a semi-standard collection of CSS rules that “zero out” the browser’s built-in styles.

This means you have to write everything yourself, but you have more control and aren’t building on unknown foundations. And things should be (more) consistent, across browsers and platforms.
<!-- .after--2 -->

**Here is a [simple, modern one](../../../assets/reset.css) for your `<head>`:**

```html <!-- .all -->
<link href="https://typography-interaction-2627.github.io/assets/reset.css" rel="stylesheet">
```

<sub>This is what we use here for our course site!</sub>

> The author of HTML documents has no influence over the presentation. Indeed, if conflicts arise the user should have the last word, but one should also allow the author to attach style hints.
> …
>
> The last point has especially been a source of much frustration among professions that are used to being in control of paper-based publishing. This proposal tries to soften the tension between the author and the reader.
>
> [<cite>Håkon Wium Lie, 1994</cite>](https://www.w3.org/People/howcome/p/cascade.html)
