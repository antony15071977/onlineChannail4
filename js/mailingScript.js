$(document).ready(function() {
	$('form.elementor-form').each(function() {
		$(this).validate({
			//Правила валидации
			rules: {
				name: {
					required: true,
				},
				email: {
					required: true,
					email: true
				},
				phone: {
					required: true,
				},
			},
			//Сообщения об ошибках
			messages: {
				name: {
					required: "Обязательно укажите имя",
				},
				email: {
					required: "Обязательно укажите Email",
				},
				phone: {
					required: "Укажите номер телефона",
				},
			},
			/*Отправка формы в случае успеха валидации*/
			submitHandler: function(form) {
				sendAjaxForm($(form).prop('id')); //Вызываем функцию отправки формы
			}
		});
	})

	function sendAjaxForm(formId) {
		$.ajax({
			url: 'ajax-form.php', //url страницы (ajax-form.php)
			type: "POST", //метод отправки
			dataType: "html", //формат данных
			data: $("#" + formId).serialize(), // Сеарилизуем объекты формы
			success: function(response) { //Данные отправлены успешно
				var formParent = $('#' + formId).parent();
				$('.form-result-success', formParent).removeClass('d-none').addClass('d-success');
				$('#' + formId)[0].reset();
				setTimeout(function() {
					$('.form-result-success', formParent).removeClass('d-success').addClass('d-none');
				}, 4000);
			},
			error: function(response) { // Данные не отправлены
				//Ваш код если ошибка
				var formParent = $('#' + formId).parent();
				$('.form-result-error', formParent).removeClass('d-none').addClass('d-flex');
				$('#' + formId)[0].reset();
				$('input').on('focus', function() {
					$('.form-result-error', formParent).removeClass('d-flex').addClass('d-none');
				});
			}
		});
	}
});