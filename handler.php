<?php
// хешМД5 для ссылки КУПИТЬ
// MerchantLogin:OutSum:InvId:Пароль#1:sph_item=
$mrh_pass2 = "f14aO6f8ehirw3iTTRgq";
// чтение параметров
$out_summ = $_REQUEST["OutSum"];
$inv_id = $_REQUEST["InvId"];
$shp_item = $_REQUEST["shp_item"];
$crc = $_REQUEST["SignatureValue"];
$crc = strtoupper($crc);
$my_crc = strtoupper(md5("$out_summ:$inv_id:$mrh_pass2:shp_item=$shp_item"));
//проверка секретного ключа
if ($my_crc !=$crc) {
      echo "bad sign\n";
      exit();
    }
//массив ссылок на продажу
$array_links = [
    1 => array("Курс «Синусный слайсинг крючковыми ножницами» 
        1 урок -
        https://www.youtube.com/watch?v=4tgV6v-vMAM&t=833s
        2 урок –
        https://www.youtube.com/watch?v=49cgw4OT_4M&t=462s 
        3 урок –
        https://www.youtube.com/watch?v=tSo1-lTcqCI&t=1s
        ", 6999),
    2 => array("Курс «Кутикульный слайсинг с Titanium Blade»
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
        https://www.youtube.com/watch?v=D6xzL-Taom0&t=228s", 1499),
];

if(!empty($_POST["OutSum"]) && !empty($_POST["EMail"]) ){ // если был POST и переданы данные
    $order_number = $_POST["shp_item"];
    $link = $array_links[$order_number] [0];
        //Надо добавить проверку на сумму платежа
        //если оплата правильная, можно отсылать письмо с ссылкой
    $summ = $array_links[$order_number] [1];
    $paid = $_POST["OutSum"];
    if ($paid >= $summ) {
            //Теперь давайте настроим куда отправляем и откуда
            $to_email = $_POST["EMail"]; // Куда отправляем
            $sender_email = '<CHANNAIL4.ONLINE@CHANNAIL4.COM>'; // От кого отправляем
            $title = "Ваш курс"; 

            //Сообщение, которое приходит на почту со всеми нужными нам данными:

            $mes = "
            Поздравляю!
            Только что на ваш Email пришло письмо с доступом к урокам на учебной платформе Channail4. Приступайте к изучению материалов прямо сейчас!\n
            -------------------------------\n
            Ваша ссылка на  \n
            $link \n 

            Если Вас интересует более подробная информация по нашим курсам, пожалуйста, свяжитесь с нами!\n
            channail4school@yandex.ru
            ";

            //Всё, теперь можно отправлять письмо на почту

            $send = mail ($to_email,$title,$mes,"Content-type:text/plain; charset = utf-8\r\nFrom:$sender_email");
            // признак успешно проведенной операции
            echo "OK$inv_id\n";
            
        }
        else {
            header("Location:sorry.html");
        }
    }

?>