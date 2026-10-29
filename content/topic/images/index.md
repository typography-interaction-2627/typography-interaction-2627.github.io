```javascript
const week = 11
const draft = true
```

# Working With Images

## A Thousand Words?

**Let’s look at the specifics around using images on the web! (Finally.)**

- [<cite>HTML Images – MDN</cite>](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML) \
	<sub>Pretty good overview.</sub>

- [<cite>Choose the Right Image Format – web.dev</cite>](https://web.dev/choose-the-right-image-format/) \
	<sub>Also discusses *Retina*/High DPI (Hi&NoBreak;DPI) screens.</sub>
<!-- .right .rows--3 -->

Remember that images *weren’t* a part of the [early web](../everything/index.md#when-was-the-web-invented), and so—much like CSS—can feel somewhat “bolted on” and are still often tricky to work with. (Our guy Tim Berners-Lee was even [reticent](https://www.wired.com/1997/04/a-brief-history-of-html/)). It has gotten much better recently, though!

---

> I'd like to propose a new, optional HTML tag: `IMG`
>
> Required argument is `SRC="url"`.
>
> This names a bitmap file for the browser to attempt to pull over the network and interpret as an image, to be embedded in the text at the point of the tag's occurrence. An example is:
>
> <!-- eslint-disable-next-line -- Keep the caps! -->
> `<IMG SRC="file://foobar.com/​foo/bar/blargh.xbm">`
>
> …
>
> Let me know what you think.&NoBreak;.&NoBreak;.&NoBreak;.&NoBreak;.&NoBreak;.&NoBreak;.&NoBreak;.&NoBreak;.
>
> [<cite>Marc Andreessen, 1993</cite>](http://1997.webhistory.org/www.lists/www-talk.1993q1/0182.html)

<sub>(DON’T KNOW IF WE TOLD YOU, BUT HTML [USED TO SHOUT](https://www.w3.org/TR/html40/struct/global.html)!)</sub>

## Image Types

### Common Formats

<div class="before left">

**There are several commonly used image formats on the web, each with their own purpose:**
<!-- .sticky -->

</div>

<dl class="antibody balance before" id="formats">
<dt>

<h4 id="gif" tabindex="-1"><a href="https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#gif_graphics_interchange_format"><cite><code>.gif</code> / Graphics Interchange Format</cite></a></h4>

</dt>
<dd>

<figure class="borderless" id="tim-gif" style="--height: 150px">
<img src="tim.gif">
</figure>

An early [raster/bitmap format](https://en.wikipedia.org/wiki/Raster_graphics), heavily compressed with reduced palettes. It survives now because it does animations! This is the only reason to use this format, nowadays.

GIF compression is primitive and so they can quickly have *huge* file-sizes—and can still slow down computers (downloading and rendering), even now. Be careful with these. (If you have longer motion needs, consider a proper [`video` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video).)

<sub>We say GIF with a hard *G* (as in *gift*), and we are your instructors and are right.</sub>

</dd>
<dt>

<h4 id="jpg" tabindex="-1"><a href="https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#jpeg_joint_photographic_experts_group_image"><cite><code>.jpg</code> / Joint Photographic [Experts] Group</cite></a></h4>

</dt>
<dd>

<figure class="borderless" id="tim-jpg" style="--height: 150px">
<img src="tim.jpg">
</figure>

Ancient-but-timeless raster/bitmap format that remains a good choice for photos. JPG&NoBreak;s can compress images down to much, much smaller file-sizes with adjustable, *lossy* [compression ratios](https://en.wikipedia.org/wiki/JPEG#Effects_of_JPEG_compression).

The combination of busyness and blurriness in photos tends to hide the resulting *compression artifacts* better than simple illustrations/graphics, so JPG lives on as a common, widely-used image format. When you are looking at a photo online, it is almost certainly a JPG.

<sub>Folks pretty much always call these *jay-pegs*.</sub>

</dd>
<dt>

<h4 id="png" tabindex="-1"><a href="https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#png_portable_network_graphics"><cite><code>.png</code> / Portable Network Graphics</cite></a></h4>

</dt>
<dd>

<figure class="borderless" id="tim-png" style="--height: 150px">
<img src="tim.png">
</figure>

Still raster/bitmap, but better than GIF&NoBreak;s (if you don’t need animation) and JPG&NoBreak;s (if you don’t care about file-size) as they can use [*lossless* compression](https://en.wikipedia.org/wiki/Portable_Network_Graphics#Advantages)—meaning they won’t leave crunchy edges around high-contrast areas.

They also support [<nobr>*alpha-channel*</nobr>](https://en.wikipedia.org/wiki/Alpha_compositing) (*partial/smooth/aliased/masked*) transparency, letting you overlay things on other backgrounds.

You’ll often use PNG&NoBreak;s for illustrations and graphics—things with large areas of repeated colors—or where you need exact color accuracy, or the transparency. (But many of these should be SVG&NoBreak;s, up next.) You *can* save photos as PNG&NoBreak;s, but they will be much larger than JPG&NoBreak;s. It’s a good “utility” format.

<sub>Many people use the acronym; you’ll also sometimes hear *pings*.</sub>

</dd>
<dt>

<h4 id="svg" tabindex="-1"><a href="https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#svg_scalable_vector_graphics"><cite><code>.svg</code> / Scalable Vector Graphics</cite></a></h4>

</dt>
<dd>

<figure class="borderless" id="tim-svg" style="--height: 150px">
<img src="tim.svg">
</figure>

Finally, a [vector format](https://en.wikipedia.org/wiki/Vector_graphics)! SVG&NoBreak;s should be used for any icons, logos, or illustrations where you have access to the original source artwork for the vectors (shapes). You can also “hand” draw them yourself, in code! More on that [below](#svg-s-for-ui).

They store the vectors in code (a bit like HTML, we’ll see), and can be scaled cleanly for different sizes/resolutions. You can also target them with CSS, if they are *inlined* (embedded) directly into your DOM.

<sub>Everyone says *S-V-G*.</sub>

</dd>
</dl>

### Other, “Modern” Formats

After *years* of discussion and [competing standards](https://xkcd.com/927/), several “modern” replacement formats are starting to gain browser support and developer/designer traction. They are all designed to overcome the various shortcomings of the legacy formats above—usually around compression efficiency.
<!-- style="margin-block-end: 1rlh" -->

<div class="before left">

**It’s still a confusing, evolving mess out there! But here are some other, “modern” formats you might encounter:**
<!-- .sticky -->

</div>

<dl class="antibody balance before">
<dt>

[<cite>AVIF</cite>](https://en.wikipedia.org/wiki/AVIF)

</dt>
<dd>

*AV1 Image File Format*, the new(est) replacement for everything. It… *might* be the next big one.

<dt>

[<cite>HEIC/HEIF</cite>](https://en.wikipedia.org/wiki/High_Efficiency_Image_File_Format)

</dt>
<dd>

*High Efficiency Image File Format*, intended to replace JPG&NoBreak;s—you might have seen `.heic` from your iPhones, annoying folks.

<dt>

[<cite>JPEG XL</cite>](https://en.wikipedia.org/wiki/JPEG_XL)

</dt>
<dd>

Guess the “L” is for long-term? This is a competitor to AVIF as the *One Format to Rule Them All*.

<dt>

[<cite>WebP</cite>](https://en.wikipedia.org/wiki/WebP)

</dt>
<dd>

*Web Picture format*, Google’s been pushing this since 2010—the first of these improved formats. Finally has pretty wide support.

</dd>
</dl>

---

**You still can’t go wrong with GIF&NoBreak;/&NoBreak;JPG&NoBreak;/&NoBreak;PNG&NoBreak;/&NoBreak;SVG&NoBreak;s, used appropriately!**
<!-- style="margin-block-start: initial" -->

## Images and Sizing

### The `img` Element

<div>

If you remember *waaaay* back to our [HTML intro](../html/index.md#images), images are a special HTML element:
<!-- .balance -->

```html
<img src="tim.jpg" alt="Tim Berners-Lee at a computer.">
```

</div>

[<cite>`<img>` image embed element - MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img) \
<sub>How we add images to our HTML.</sub>
<!-- .right -->

In their most basic, simplest form—the `src` [attribute](../html/index.md#attributes) can point to a local image file (as it does here—a JPG in the same directory) or an external URL! The `alt` provides a description for [accessibility/screen readers](https://axesslab.com/alt-texts/).
<!-- .before -->

### Intrinsic, Inline

By default, images will scale to their [*intrinsic* size](https://developer.mozilla.org/en-US/docs/Glossary/Intrinsic_Size)—the (`1x` density) pixel dimensions of the file itself—and are [*inline*](../html/index.md#inline-elements) elements:
<!-- .balance -->

[<cite>Intrinsic size – MDN</cite>](https://developer.mozilla.org/en-US/docs/Glossary/Intrinsic_Size) \
<sub>Based the content, not any layout/CSS.</sub>
<!-- .right -->

<figure style="--lines: 16">

***[Inline Example](inline/index.html)***

<figcaption>

This [image file](./inline/tim.jpg) is 250 (actual) pixels wide, and is (likely) blurry on your (probably) high-resolution display. Also note the extra space at the bottom, from the `display: inline;` default!

</figcaption>
</figure>

**This default intrinsic/inline behavior is rarely what you want, though—more often your image should be sized *from* your design, not vice-versa.**

Also by default the image pixles are scaled up to [CSS pixels](https://tomroth.dev/dpr/), so it is blurry on modern [*Hi&NoBreak;DPI*](https://web.dev/articles/high-dpi) (a.k.a. [*retina*](https://en.wikipedia.org/wiki/Retina_display)/`2x`, even `3x`) screens—which is really most of our screens, these days.
<!-- .balance -->

> [!NOTE]
>
> Most [resets](../css/index.md#resets) (like [ours](/assets/reset.css)) include `img { max-inline-size: 100%; }`, to keep them under control.
>
> <sub>Otherwise large images will often poke/[overflow](../advanced-css/index.md#overflow) out of their containers, by default—breaking your design!</sub>
>
>

### `width` / `height`

In the past, you would manually set an image size within your HTML via special `width` and `height` [attributes](../html/index.md#attributes):
<!-- .balance -->

```html <!-- .all -->
<img src="tim.jpg" alt="Tim Berners-Lee at a computer." width="230" height="150">
```
<sub>No [units](../box-model/index.md#css-lengths), even!</sub>

But this *forces* the image into a fixed size, which usually doesn’t work well in our modern, responsive, many-device-width-and-varied-content contexts.
<!-- .before -->

So you’ll often want to set images to [`display: block;`](../box-model/index.md#block), and then control their size/positioning via CSS—just like any other elements. Make sure your actual actual image dimensions are (at least) about twice their displayed, *CSS-pixel* size, so nothing is blurry:
<!-- .before -->

<figure style="--lines: 13">

***[Block Example](block/style.css)***

<figcaption>

*This* [image file](./block/tim.jpg) is intrinsically 1600 pixels wide, plenty more than twice the container size. Nice and sharp!

</figcaption>
</figure>

### `object-fit` / `object-position`

CSS added the [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) and corresponding [`object-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position) properties for sizing images *within* their containers—as if the image file is a child of `img`. This is often used when setting an `img` to fill a container size set by your design:

- [<cite>`object-fit` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)
- [<cite>`object-position` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position) \
	<sub>This used to be *much* harder!</sub>
<!-- .right -->

<figure style="--lines: 24">

***[Object-fit Example](object-fit/style.css)***

<figcaption>

Note the `block-size` on the section, otherwise the container would still resize to the image. Adjust the divider to see the behavior!

</figcaption>
</figure>

### `aspect-ratio`

CSS also added an [`aspect-ratio` property](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio) to control the width-to-height ratio of an element—maintaining this relationship as an element scales. (This used to be [*unnecessarily* hard](https://css-tricks.com/aspect-ratio-boxes/) to achieve. CSS heights are always weird! You kids have it easy.)

[<cite>`aspect-ratio` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio) \
<sub>So much easier now.</sub>
<!-- .right -->

This is not *just* for images (you can use it on *any* element!), but it commonly comes up when using/constraining them in your design:
<!-- .balance -->

<figure style="--lines: 8">

***[Aspect-Ratio Example](aspect-ratio/style.css)***

<figcaption>

Note that without the `object-fit: cover;`, Tim would be distorted to the ratio! Don’t distort Tim (or generally, most images) unless you *really* [mean to](https://www.moma.org/calendar/exhibitions/1646).

</figcaption>
</figure>

### `background-image` / `-size` / `-origin`

You can also use images as backgrounds on elements with the [`background-image`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image), [`background-size`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-size), and [`background-origin` properties](https://developer.mozilla.org/en-US/docs/Web/CSS/background-origin)—particularly if you want to put something in front of them, like text.

- [<cite>`background-image` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image)
- [<cite>`background-size` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/background-size)
- [<cite>`background-origin` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/CSS/background-origin) \
	<sub>Careful with these!</sub>
<!-- .right .rows--2 -->

However this isn’t very semantic, as it blurs the content/presentation boundaries—since the image paths are moved into your CSS, and there is no `alt` text description available for screen-readers. So you should *only* use this for contextual or decorative images—not actual content:

<figure style="--lines: 8">

***[Background Example](background/style.css)***

<figcaption>

We wouldn’t use something like this as a `background`&#x202F;. Mind your legibility! And your accessibility.

</figcaption>
</figure>

> [!CAUTION]
>
> Accessibility is our responsibility! Always ask yourself, “would this page make sense if I couldn’t see this image?”
>
> <sub>[If the answer](https://www.w3.org/WAI/tutorials/images/decision-tree/) is “no,” then use an `<img>` with an `alt`, instead—using the `alt` text to convey the *meaning* of the image in your page.</sub>

## Semantic Containers

### `<figure>` / `<figcaption>`

Speaking of semantics—HTML also has a [`figure` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure) that you can use to associate an image (or other visual) with a visible [`figcaption`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption) description or legend. These containers formally link the meaning/context of the elements together:

- [<cite>`figure` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure)
- [<cite>`figcaption` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption) \
	<sub>Many of your images should be in `figure` containers.</sub>
<!-- .right -->

<figure style="--lines: 17">

***[Figure Example](figure/index.html)***

<figcaption>

These can also be used to group things like videos, illustrations, and diagrams with their captions. There can be multiple visuals in each `figure`, if needed.

</figcaption>
</figure>

> [!TIP]
>
> Including visible captions is a good example of a [*“curb-cut”* approach](https://en.wikipedia.org/wiki/Curb_cut_effect) towards accessibility. Your `alt` text description could be useful for more than just folks using screen readers!
>
> <sub>Always strive for this kind of broad benefit (a.k.a. *universal design*) in all your work. Everyone benefits from a “curb cut”!</sub>

</aside>

## Responsive Images

With regards to their layout, you make images responsive in the same way you (should) make all your page structure responsive—by writing [*mobile-first*](../responsive/index.md#mobile-first-design) front-end for their containers. You can change their flow, size, shape, and <nobr>so-on</nobr>—all via the box you put them in.

[<cite>Using responsive images in HTML – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images) \
<sub>Improve them across devices!</sub>
<!-- .right -->

But using images introduces some additional considerations, going across breakpoints. You might want to serve/show *different* images at different sizes—whether for dimensional (file-size, bandwidth, performance) or <nobr>art-direction</nobr> (scale, crop) reasons.

**The exact same image file is *rarely* ideal at both `375px` and `2560px`! Let’s make them responsive.**

### `<picture>` / `<source>`

Our venerable `<img>` element added some control for this with the addition of the [`srcset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset) and [`sizes`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes) attributes. But we think it is much easier (at least ergonomically) to skip right into using the modern `picture` container.

- [<cite>`picture` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture)
- [<cite>`source` – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source) \
	<sub>These containers/children allow you to make your `img` responsive.</sub>
<!-- .right .rows--2 -->

The [`<picture>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) is a wrapper/container for an `<img>`, giving it alternate [`<source>` tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source) that offer different image files for different scenarios. They use [media-query-like](../responsive/index.md#media-queries) syntax to change what image is loaded and displayed:
<!-- .before -->

<figure style="--lines: 21">

***[Picture Example](picture/index.html)***

<figcaption>

This is all in the HTML; there is no (relevant) CSS. Adjust the divider to see the swaps!

</figcaption>
</figure>

Note that you still include the `<img>` as a *fallback*—put your largest size there. We’ve found it helpful to follow the same *mobile-first* philosophy here as you do in the rest of your code—putting your smaller images first, and your larger lower. You can have as many `<source>` elements as you need—for image sizing, crops, or both.

<sub>*Unlike* CSS’s cascade, though—the browser stops at the first “matching” image! (So it doesn’t download any unnecessary files.) Thus we use `width <` limiting queries here, instead of our usual `>`.</sub>

**Responsive images (like the rest of this) can get [very complicated](https://web.dev/learn/design/picture-element/), very quickly—so always start with the basics (and mobile) first!**

## SVG&NoBreak;s for UI

**SVG&NoBreak;s are a (digital) designer’s best friend—mixing the adaptability and maintainability of code with the freedom and flexibility of visual design.**

- [<cite>Including Vector Graphics in HTML – MDN</cite>](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Including_vector_graphics_in_HTML#what_is_svg) \
	<sub>Good overview.</sub>

- [<cite>How to Code SVG Icons by Hand</cite>](https://www.aleksandrhovhannisyan.com/blog/svg-tutorial/) \
	<sub>Aleksandr Hovhannisyan goes deep on making SVG&NoBreak;s. This is how the *Pros* do.</sub>
<!-- .right .rows--3 -->

Anything you can draw in Figma (or Sketch, or Illustrator before it) lends itself to this hybrid representation. It’s common to export out `.svg` vector work from a design program, but you can also create (or at least edit) these files yourself—just like any other code:
<!-- .before -->

```html <!-- .all -->
<svg width="48" height="40" viewBox="0 0 48 40" xmlns="http://www.w3.org/2000/svg">
	<line x1="2" y1="20" x2="44" y2="20" stroke="black" />
	<polyline points="26,4 44,20 26,36" fill="none" stroke="black" />
</svg>
```

### Inlining / Embedding

In addition to being our only vector/scaleable format, SVG&NoBreak;s have another trick up their sleeve. You can use the files as a `src`, like all the examples above—but their code can also be included directly into your HTML! This is called *inlining* (though some folks say *embedding*):
<!-- .before -->

[<cite>SVG in HTML introduction - MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/SVG/Guides/SVG_in_HTML)
<sub>More control than as a `src=`</sub>
<!-- .right -->

<figure style="--lines: 20">

***[SVG Example](svg/index.html)***

<figcaption>

Be sure to look at the `styles.css`—targeting the SVG nodes just like any other HTML elements!

</figcaption>
</figure>

When targeting (or directly editing) SVG contents, note they have slightly different syntax than HTML/CSS—using [`fill`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/fill) and [`stroke`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/stroke) instead of `background-color` and `border`, for example. There are many other [special properties](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Fills_and_Strokes) for adjusting/controling your inlined SVG&NoBreak;s!

[<cite>Fills and strokes – MDN</cite>](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Fills_and_Strokes) \
<sub>HTML/CSS are nothing if not inconsistent.</sub>
<!-- .right -->

<sub>Also remember that any `width` and `height` attributes will set the default SVG size (just like on an `img`)—but you can override this with your styles.</sub>

---

> A picture is often said to be worth a thousand words. Similarly, an interface is worth a thousand pictures.
>
> [<cite>Ben Shneiderman, 1999</cite>](https://www.cs.umd.edu/~ben/papers/Shneiderman2001Supporting.pdf)

<!-- TODO Re-using SVG without re-embedding -->
<!-- TODO Talk about file-sizes? -->
<!-- TODO How you make/save images? -->
