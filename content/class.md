```javascript
const order = 3
```

# Our Class

[<cite>Who We Are</cite>](https://docs.google.com/document/d/TKTKTK)

- [Jasmine]()
- [Yen]()
- [Leila]()
- [Valerie]()
- [Hyunjin]()
- [Fan]()
- [Linzhuo]()
- [Claire]()
- [Jun]()
- [Jiho]()
<!-- #students -->

<button id="shuffle">
	<p>Shuffle</p>
</button>

<script>
	const students = document.querySelector('#students')
	const shuffleStudents = () => students.append(...[...students.children].sort(() => Math.random() - 0.5))

	shuffleStudents()
	document.querySelector('#shuffle').onclick = () => shuffleStudents()
</script>
