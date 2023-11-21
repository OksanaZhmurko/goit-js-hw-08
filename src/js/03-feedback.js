import throttle from "lodash.throttle";
const saveFormDataToLocalStorage = throttle(() => {
    const formData = {
      email: document.querySelector('input[name="email"]').value,
      message: document.querySelector('textarea[name="message"]').value,
    };
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  }, 500); // Ограничение вызова функции не чаще, чем раз в 500 мс
  
  // Функция для заполнения формы данными из локального хранилища при загрузке страницы
  const loadFormDataFromLocalStorage = () => {
    const storedFormData = localStorage.getItem('feedback-form-state');
    if (storedFormData) {
      const parsedData = JSON.parse(storedFormData);
      document.querySelector('input[name="email"]').value = parsedData.email;
      document.querySelector('textarea[name="message"]').value = parsedData.message;
    }
  };
  
  // Функция для обработки отправки формы
  const handleSubmit = (event) => {
    event.preventDefault(); // Внимание на исправление этой строки!
  
    const formData = {
      email: document.querySelector('input[name="email"]').value,
      message: document.querySelector('textarea[name="message"]').value,
    };
  
    console.log(formData);
    localStorage.removeItem('feedback-form-state');
    document.querySelector('.feedback-form').reset();
  };
  
  // Добавляем обработчики событий
  document.addEventListener('DOMContentLoaded', () => {
    loadFormDataFromLocalStorage(); // Загрузка данных из локального хранилища при загрузке страницы
  
    const form = document.querySelector('.feedback-form');
    form.addEventListener('input', () => {
      saveFormDataToLocalStorage(); // Сохранение данных в локальное хранилище при вводе
    });
  
    form.addEventListener('submit', handleSubmit); // Обработка отправки формы
  });