```javascript
const week = 7
const order = 2
const draft = true
```

# DevTools&#x202F;/&thinsp;Web Inspector

There is no single *best* browser; they are all kind of differently bad, in [different ways](https://en.wikipedia.org/wiki/Anna_Karenina_principle).
<!-- .intro .body -->

- [<cite>Chrome DevTools</cite>](https://developer.chrome.com/docs/devtools/) \
We’ll be using these.

- [<cite>Safari Web Development Tools</cite>](https://developer.apple.com/safari/tools/)
Got some long-overdue love back in [*Sonoma*](https://developer.apple.com/videos/play/wwdc2023/10118), but [little](https://webkit.org/blog/15865/webkit-features-in-safari-18-0/#web-inspector) [since](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/#web-inspector).

- [<cite>Firefox DevTools User Docs</cite>](https://developer.mozilla.org/en-US/docs/Tools)
Spiritual successor to [*Firebug*](https://thehistoryoftheweb.com/checking-under-the-hood-of-code/), the first suite.
<!-- .right .rows--4 -->

Many developers use [Chrome](https://www.google.com/chrome) for [its popularity/hegemony](https://gs.statcounter.com/browser-market-share), before testing in other browsers. It also arguably has the most robust set of *DevTools*—though [Safari](https://www.apple.com/safari/) and [Firefox](https://developer.mozilla.org/en-US/docs/Tools) have their own versions, too. Much of this is just preference, but ultimately you’ll want to see what your visitors are seeing.
<!-- .before -->

You have always [been able to](https://blog.jim-nielsen.com/2020/the-spirit-of-view-source/#how-browsers-do-view-source-today-on-mac) <samp>View Source</samp>, from [the earliest days/browsers](https://thehistoryoftheweb.com/checking-under-the-hood-of-code/)—remember that the open web has *always* trafficked in source code. But we’ll use DevTools for the same reason we use an IDE—more comfortable ergonomics, specifically around building for the web.

You’ll often hear people (Michael) call it the *Web Inspector*, or just *The Inspector*. It’s going to be your best (Web) friend, showing you everything that the browser has *parsed* to display your pages.

## Inspecting Pages

<div class="after--3 center verso">

In Chrome, you can bring them up by right-clicking on any element/part of a page and clicking <samp>Inspect</samp>&#x202F;:

You can also hit <nobr><kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>I</kbd></nobr>&#x202F;.
<!-- .note -->

</div>

<figure
	@source="right-click.png"
	class="right shadow"
	style="--height: 273px"
	>
</figure>

By default, you’ll see the tools open on the right side of the page. Depending on how big your screen is, they might be laid out a bit differently—but the basics are usually the same:
<!-- .add-before--3 .balance -->

<figure
	@source="dev-tools.png"
	class="shadow"
	>
</figure>

<div class="before--3 center verso">

The Customize <samp style="-webkit-text-stroke-width: 0.05rem">⋮</samp> button will let you change the side they appear on, or undock the tools out entirely into a separate window—sometimes easier on a laptop/small screen:
<!-- .balance -->

</div>

<figure
	@source="customize.svg"
	class="recto"
	style="justify-content: end"
	>
</figure>

## Elements Panel

<div class="verso">

The top part of the tools is [*the DOM*](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)&NoBreak;—you can expand/collapse all the nested HTML *elements* on the opened page.

The first <samp>↖</samp> button in the upper-left lets you mouse over on the page, and will then show you that element nested/hierarchically within the DOM.

The second <samp style="-webkit-text-stroke-width: 0.05rem">⿸</samp> button (more about this [below](#device-mode)) toggles the *Device Toolbar*, a.k.a. “responsive mode.”

The <samp>flex</samp>&#x202F;/<samp>grid</samp> badges (pills?) toggle their layout overlays on the page.

</div>

<figure
	@source="elements.svg"
	class="center recto"
	style="justify-content: end; margin-inline-start: -1em"
	>
</figure>

Handy tip: <nobr><kbd>⌘</kbd> <kbd>F</kbd></nobr> in here will let you search for elements or text by name/class/contents!
<!-- .note .recto .before--0 style="text-align: right"-->

## Styles Tab

<div class="verso">

The area below is for the styles. It shows whatever *CSS properties* apply to the element you have selected above, in the DOM/Elements panel.

These are ordered (somewhat unintuitively) in a *more*-[specific](/topic/css/#specificity), *reverse*-[cascade](/topic/css/#oh-right-the-cascade) sequence—inline styles at the top, external and internal stylesheets, then *user-agent* styles at the bottom—with any cascading/conflicting rules crossed out, as you go down.

On the right, you can see the sum *Computed* (or *rendered*) values of all the rules that apply—regardless of where they come from. These represent *exactly* what the browser is showing to you for the selected element.

</div>

<figure
	@source="styles.svg"
	class="center recto"
	style="justify-content: end; margin-inline-start: -1em"
	>
</figure>

You can type specific CSS properties/values into both <samp>Filter</samp> boxes to quickly narrow things down!
<!-- .note .recto .before--0 style="text-align: right" -->

You can make changes in Elements or Styles, and the edits will be immediately visible on the page *as if you had edited the source files*!
<!-- .intro .before--3 -->

It’s useful to try things out quickly—and diagnose where problems/conflicts arise.
<!-- .intro .before--0 -->

<aside>

<mark>Warning: DevTools edits are ephemeral</mark>

Keep in mind that these changes are only *temporary*—any edits in the DevTools will be lost when you leave or reload the page! They are just for you.

</aside>

## Device Mode

Enter *device mode* with the little phone/laptop <samp style="-webkit-text-stroke-width: 0.05rem">⿸</samp> button, <br>in the upper left of the DevTools:

<figure
	@caption="Be sure to <em>hard-refresh</em> with <nobr><kbd>⌘</kbd> <kbd>⇧</kbd> <kbd>R</kbd></nobr> (to clear the cache) if the page doesn’t rescale correctly when you enter this mode! They sometimes don’t, depending on how they are built—especially with JS shenanigans."
	@source="device.png"
	class="shadow"
	>
</figure>

<figure @source="device-bar.svg"></figure>

<div class="center left">

Generally, use the <samp>Responsive</samp> mode that lets you type in specific pixel dimensions for width/height. Or you can use the divided bar underneath to quickly jump through common/ballpark widths.

The *Preview Zoom* also allows you to approximate views *larger* than your current screen! You can specify larger dimensions, and it will scale down to show the entire viewport. This is great for developing on a laptop—it won’t be precise, but it’ll give you some idea of big screens.

</div>

<figure
	@caption="The <samp>Device List</samp> is… *ancient* and inaccurate—they don’t account for the browser’s own interface, so they are all too tall!"
	@source="responsive.png"
	class="start middle shadow"
	style="--height: 489px; position: relative; inset-inline-start: calc( 2 * var(--alley))"
	>
</figure>

<figure
	@caption="The <samp>More Options</samp> menu here has some handy tricks!"
	@source="options.png"
	class="right shadow"
	style="--height: 260px; position: relative; inset-inline-start: var(--alley)"
	>
</figure>

Remember that you are not targeting specific devices; you are looking for when your design/content *breaks*!
<!-- .intro -->

<aside>

<mark>Always check your work on the *real thing*</mark>

This is just a quicker preview, but isn’t always perfectly accurate—and also won’t reflect any platform-specific behaviors around scrolling or rotating. (We’re looking at you, [<small>i</small>OS Safari](https://developer.apple.com/forums/thread/800125).)

</aside>

## The Console

<div class="verso pretty" style="align-self: start">

The console is used to help you work with [JavaScript](/topic/javascript), by *logging* messages, warnings, and any errors from your code as it runs. It can also evaluate written/pasted JS, live.

If your tools are already open, you can show the <samp>Console</samp> (as a drawer, below) with the Customize <samp>⋮</samp> button, or as a whole panel to the right of <samp>Elements</samp>.

You can also hit <nobr><kbd>⌘</kbd> <kbd>⌥</kbd> <kbd>J</kbd></nobr> to go right there!
<!-- .note -->

</div>

<figure
	@source="panel-drawer.svg"
	class="recto"
	style="justify-content: end"
	>
</figure>

<figure
	@caption="The Console opened under Elements/Styles."
	@source="console-panel.png"
	class="shadow before--3 after--3"
	>
</figure>

This area will show any [messages logged](https://developer.mozilla.org/en-US/docs/Web/API/console#outputting_text_to_the_console) from your JavaScript with `console.log()`.
<!-- .intro -->

<div class="balance verso">

**<span style="color: gold">Warnings</span>** and **<span style="color: tomato">errors</span>** (like missing files, or bad JS syntax) will also be shown here—usually with clickable <samp>script.js:##</samp> line-numbers to the right, to take you directly to the problem. You can clear the *buffer* (what is showing) with the little crossed circle <samp>⊘︎</samp> when it gets cluttered.

You can also evaluate and try your JavaScript here *directly*, by typing (with some nice auto-completion) into the bottom of the console—like `console.log('Hello, world!')` (note the quotes for [a *string*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)).

You can use this to test out parts of your code right away, like `document.querySelector('h1')`. If it *returns* (shows) your element in response, your selector is working!

</div>

<div class="center recto">

<figure @source="console.svg"></figure>

</div>

<aside>

<mark>Open Console in case of JavaScript emergency</mark>

You can check your variables by printing them out with `console.log('Variable: ' + variableName)`, or even just make sure that part of your code ran with `console.log('Made it here!')`.

</aside>

<style>
	@container style(--columns: 6) {
		div.center.left,
		div.verso.pretty {
			margin-inline-end: calc(-1 * var(--alley));
		}

		object[data^="console"] {
			max-inline-size: calc(100% + var(--alley));
			justify-self: end;
		}
	}
</style>
