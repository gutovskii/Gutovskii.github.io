const app = {
	data: () => ({
		questions: [
			{ title: "Как тебя зовут?", placeholder: "Иван" },
            { title: "Сколько тебе лет?", placeholder: "15", type: "number" },
            { title: "Твой email", placeholder: "ivan@example.com", required: true },
            { title: "Фамилия", placeholder: "Логинов", required: true }
		],
        inputData: []
	}),
    methods: {
        invalidInput(e){
            if (e.target.required){
                if (e.target.value.length == 0) e.target.classList.add('invalid-input')
                else e.target.classList.remove('invalid-input')
            }
        },
        show(){
            /*console.log(this.inputData)*/
        }
    }
}
const newApp = Vue.createApp(app)

newApp.component('my-input', {
	props: {
		title: String,
		placeholder: String,
		type: String,
        modelValue: String,
		required: Boolean
	},
    emits:['update:modelValue', 'blur'],
	template: `
	<div class="inputs-item">
        <label class="inputs-label">{{ required == true ? title + '*' : title }}</label>
        <input class="inputs-input"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
                @blur="$emit('blur', $event)"
                :placeholder="placeholder"
                :type="type"
                :required="required">
    </div>
	`
})

newApp.mount('#app')