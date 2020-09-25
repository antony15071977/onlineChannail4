<?php
//Надо добавить проверку чтоб обрабатывать ПОСТ только с айпи платежки
if (!in_array($_SERVER['REMOTE_ADDR'], array('136.243.38.147', '136.243.38.149', '136.243.38.150', '136.243.38.151', '136.243.38.189', '136.243.38.108'))) die('ERROR IP');
$merchant_id = '224303';
$merchant_secret = 'zpfnw4na';
//проверка секретного ключа
$sign = md5($merchant_id.':'.$_REQUEST['AMOUNT'].':'.$merchant_secret.':'.$_REQUEST['MERCHANT_ORDER_ID']);
if ($sign != $_REQUEST['SIGN']) {
    die('wrong sign');
}
//массив ссылок на продажу
$array_links = [
    1 => array("«Синусный слайсинг крючковыми ножницами» 
        1 урок -
        https://www.youtube.com/watch?v=4tgV6v-vMAM&t=833s
        2 урок –
        https://www.youtube.com/watch?v=49cgw4OT_4M&t=462s 
        3 урок –
        https://www.youtube.com/watch?v=tSo1-lTcqCI&t=1s
        ", 6999),
    2 => array("«Кутикульный слайсинг с Titanium Blade»
        1 урок - 
        https://www.youtube.com/watch?v=7_qigl8AYnM&t=2s
        2 урок - 
        https://www.youtube.com/watch?v=kiqCVz6_Ggw&t=2s
        3 урок - 
        https://www.youtube.com/watch?v=7MCuNBSViUQ&t=2s
        ", 7999),
    3 => array("Урок «Мокасиновая стопа»
        https://www.youtube.com/watch?v=9h-yXRdkhU0&t=3s", 8500),
    4 => array("Урок «Анатомическая лопатка»
        https://www.youtube.com/watch?v=t5vfFtSeYfQ&t=651s", 2499),
    5 => array("Урок «Скоростное снятие»
        https://www.youtube.com/watch?v=kiqCVz6_Ggw&t=2s", 1399),
    6 => array("Урок «Скоростной подпил»
        https://www.youtube.com/watch?v=7MCuNBSViUQ&t=2s", 999),    
    7 => array("Урок «Anderвстык 1:0»
        https://www.youtube.com/watch?v=D6xzL-Taom0&t=228s", 70),
];

if(!empty($_POST["MERCHANT_ID"]) && !empty($_POST["P_EMAIL"]) ){ // если был POST и переданы данные
    $order_number = $_POST["us_desc"];
    $link = $array_links[$order_number] [0];

        //Надо добавить проверку на сумму платежа
        //если оплата правильная, можно отсылать письмо с ссылкой
    $summ = $array_links[$order_number] [1];
    $paid = $_POST["AMOUNT"];
    if ($paid >= $summ) {
            //Теперь давайте настроим куда отправляем и откуда
            $to_email = $_POST["P_EMAIL"]; // Куда отправляем
            $sender_email = '<CHANNAIL4.ONLINE@CHANNAIL4.COM>'; // От кого отправляем
            $title = "Ваш курс"; 

            //Сообщение, которое приходит на почту со всеми нужными нам данными:

            $mes = "
            Поздравляю!
            Только что на ваш Email пришло письмо с доступом к урокам на учебной платформе Channail4. Приступайте к изучению материалов прямо сейчас!\n
            -------------------------------\n
            Ваша ссылка на курс -  \n
            $link \n 

            Если Вас интересует более подробная информация по нашим курсам, пожалуйста, свяжитесь с нами!\n
            channail4school@yandex.ru
            ";

            //Всё, теперь можно отправлять письмо на почту

            $send = mail ($to_email,$title,$mes,"Content-type:text/plain; charset = utf-8\r\nFrom:$sender_email");
            
        }
        else {
            header("Location:sorry.html");
        }
    }

?>