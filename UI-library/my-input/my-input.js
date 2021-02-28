const app = {
	data: () => ({
		questions: [
			{ title: "Как тебя зовут?", placeholder: "Иван", type: "text", pattern: "^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$", errorMessage: "Введите имя без пробелов и лишних символов" },
            { title: "Сколько тебе лет?", placeholder: "15", type: "number" },
            { title: "Твой email", placeholder: "ivan@example.com", type: "email", required: true, pattern: "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$", errorMessage: "Неправильный e-mail" },
            { title: "Фамилия", placeholder: "Логинов", type: "text", required: true, pattern: "^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$", errorMessage: "Введите фамилию буквами и без пробелов" }
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

    }
}
const newApp = Vue.createApp(app)

newApp.component('my-input', {
	props: {
		title: String,
		placeholder: String,
		type: String,
        modelValue: String,
        pattern: String,
        errorMessage: String,
		required: Boolean
	},
    emits:['update:modelValue', 'blur'],
    methods: {
        checkStringByPattern(str, pattern){
            if ( str !== undefined && pattern !== undefined && str.length > 0 ){
                if ( str.search(pattern) == -1 ){
                    return true
                }
                
            }
        } 
    },
	template: `
	<div class="inputs-item">
        <label class="inputs-label">{{ required == true ? title + '*' : title }}</label>
        <div class="input-box">
            <input class="inputs-input"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
                @blur="$emit('blur', $event)"
                :placeholder="placeholder"
                :type="type"
                :required="required">
            <span class="inputs-error" v-if="checkStringByPattern(modelValue, pattern)">{{ errorMessage }}</span>
        </div>
    </div>
	`
})

newApp.mount('#app')