import throttle from "lodash.throttle";

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form')

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onInputData, 500));

populateFeedbackForm();

function onFormSubmit(event) {
    event.prevenDefault();
    const { email, message } = e.currentTarget.elements;
    console.log({ email: email.value, message: message.value });

    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
}

function onInputData(e) {
    let data = localStorage.getItem(STORAGE_KEY);
    data = data ? JSON.parse(data) : {};
    let { email, message } = form.elements;
    data = {
    email: email.value.trim(),
    message: message.value.trim(),
    };
    
data[e.target.name] = e.target.value.trim(); 
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
    
function populateFeedbackForm() {
    let data = localStorage.getItem(STORAGE_KEY);
    if (data) {
    data = JSON.parse(data);
    Object.entries(data).forEach(([name, value]) => {
    form.elements[name].value = value ?? '';
    });
    }
    }