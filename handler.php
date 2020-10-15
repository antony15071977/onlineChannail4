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
    1 => array("Курс «Основы слайсинга»", 23000),
    2 => array("Курс «Основы слайсинга» + педикюр «Мокасиновая стопа 1.0»", 26000),
    3 => array("Курс МАНИКЮР: «1 ФОРМА АНАТОМИЧЕСКОЙ ФРЕЗЫ»", 25000),
    4 => array("Курс ПЕДИКЮР «МОКАСИНОВАЯ СТОПА 2.0»", 16000),
    5 => array("Курс «АНАТОМИЧЕСКОЕ КОМБИ + ИДЕАЛЬНЫЙ ФРЕНЧ»", 10000),
    6 => array("Курс «КЛАССИЧЕСКОЕ НАРАЩИВАНИЕ РЕСНИЦ, ОСНОВЫ И БАЗОВЫЕ ПРАВИЛА»", 8900),
    7 => array("Курс «ОБЪЕМНОЕ НАРАЩИВАНИЕ РЕСНИЦ, ОСНОВЫ И БАЗОВЫЕ ПРАВИЛА»", 8900),
    8 => array("Курс КОЛОРИСТИКИ. «СЛОЖНЫЕ ТЕХНИКИ ОКРАШИВАНИЯ»", 12500),
    9 => array("Курс «BROW ПЕРФЕКЦИОНИСТ»", 14999),
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
            $title = "Поздравляем с приобретением курса от Channail4!"; 
            $title2 = "У Вас купили новый курс"; 

            //Сообщение, которое приходит на почту со всеми нужными нам данными:

            $mes = "
            Поздравляю!
            Только что Вы приобрели доступ к урокам на учебной платформе Channail4.\n
            Свяжитесь с нашим администратором для записи на приобретенный Вами $link.\n
            -------------------------------\n
            
            Если Вас интересует более подробная информация по нашим курсам, пожалуйста, свяжитесь с нами!\n
            channail4school@yandex.ru
            ";
            $mes2 = "
            Поздравляю!
            Только что за $paid рублей у Вас приобрели доступ к урокам на учебной платформе Channail4.\n
            Свяжитесь с Вашим покупателем с помощью этой электронной почты $to_email для записи на приобретенный им $link.\n
            -------------------------------\n          
            
            ";
            // $to_email2 = 'channail4school@yandex.ru';
            $to_email2 = 'i.avraamy2@gmail.com';

            //Всё, теперь можно отправлять письмо на почту

            $send = mail ($to_email,$title,$mes,"Content-type:text/plain; charset = utf-8\r\nFrom:$sender_email");
            $send2 = mail ($to_email2,$title2,$mes2,"Content-type:text/plain; charset = utf-8\r\nFrom:$sender_email");
            // признак успешно проведенной операции
            echo "OK$inv_id\n";
            
        }
        else {
            header("Location:sorry.html");
        }
    }

?>