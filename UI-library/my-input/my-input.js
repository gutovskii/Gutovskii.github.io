const app = {
	data: () => ({
		questions: [
			{ title: "Как тебя зовут?", placeholder: "Иван" },
            { title: "Сколько тебе лет?", placeholder: "15", type: "number" },
            { title: "Твой email", placeholder: "ivan@example.com", required: true }
		]
	})
}
const newApp = Vue.createApp(app)

newApp.component('my-input', {
	props: {
		title: String,
		placeholder: String,
		type: String,
		required: Boolean
	},
	template: `
	<div class="inputs-item">
		<label class="inputs-label">{{ required == true ? title + '*' : title }}</label>
		<input class="inputs-input" :placeholder="placeholder" :type="type" :required="required">
	</div>
	`
})

newApp.mount('#app')