<?php
// хешМД5 для ссылки КУПИТЬ
// MerchantLogin:OutSum:InvId:Пароль#1:shp_item=
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
    1 => array("Курс «Основы слайсинга»", 5000),
    2 => array("Курс «Основы слайсинга» + педикюр «Мокасиновая стопа 1.0»", 5000),
    3 => array("Курс МАНИКЮР: «1 ФОРМА АНАТОМИЧЕСКОЙ ФРЕЗЫ»", 5000),
    4 => array("Курс ПЕДИКЮР «МОКАСИНОВАЯ СТОПА 2.0»", 5000),
    5 => array("Курс «АНАТОМИЧЕСКОЕ КОМБИ + ИДЕАЛЬНЫЙ ФРЕНЧ»", 5000),
    6 => array("Курс «КЛАССИЧЕСКОЕ НАРАЩИВАНИЕ РЕСНИЦ, ОСНОВЫ И БАЗОВЫЕ ПРАВИЛА»", 5000),
    7 => array("Курс «ОБЪЕМНОЕ НАРАЩИВАНИЕ РЕСНИЦ, ОСНОВЫ И БАЗОВЫЕ ПРАВИЛА»", 5000),
    8 => array("Курс КОЛОРИСТИКИ. «СЛОЖНЫЕ ТЕХНИКИ ОКРАШИВАНИЯ»", 5000),
    9 => array("Курс «BROW ПЕРФЕКЦИОНИСТ»", 5000),
    11 => array("Курс «Основы слайсинга»", 18000),
    12 => array("Курс «Основы слайсинга» + педикюр «Мокасиновая стопа 1.0»", 21000),
    13 => array("Курс МАНИКЮР: «1 ФОРМА АНАТОМИЧЕСКОЙ ФРЕЗЫ»", 17000),
    14 => array("Курс ПЕДИКЮР «МОКАСИНОВАЯ СТОПА 2.0»", 9000),
    15 => array("Курс «АНАТОМИЧЕСКОЕ КОМБИ + ИДЕАЛЬНЫЙ ФРЕНЧ»", 5000),
    16 => array("Курс «КЛАССИЧЕСКОЕ НАРАЩИВАНИЕ РЕСНИЦ, ОСНОВЫ И БАЗОВЫЕ ПРАВИЛА»", 3900),
    17 => array("Курс «ОБЪЕМНОЕ НАРАЩИВАНИЕ РЕСНИЦ, ОСНОВЫ И БАЗОВЫЕ ПРАВИЛА»", 3900),
    18 => array("Курс КОЛОРИСТИКИ. «СЛОЖНЫЕ ТЕХНИКИ ОКРАШИВАНИЯ»", 7500),
    19 => array("Курс «BROW ПЕРФЕКЦИОНИСТ»", 9999),
    22 => array("Курс МАНИКЮР: «1 ФОРМА АНАТОМИЧЕСКОЙ ФРЕЗЫ»", 10000),
    23 => array("Курс МАНИКЮР: «1 ФОРМА АНАТОМИЧЕСКОЙ ФРЕЗЫ»", 7000),
    24 => array("Курс ПЕДИКЮР «МОКАСИНОВАЯ СТОПА 2.0»", 5000),
    25 => array("Курс ПЕДИКЮР «МОКАСИНОВАЯ СТОПА 2.0»", 4000),
    26 => array("Курс ПЕДИКЮР «МОКАСИНОВАЯ СТОПА 2.0»", 6000),
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
            $title = "Поздравляем с бронированием курса от Channail4!"; 
            $title2 = "У Вас новая бронь на курс";
            $title3 = "Поздравляем с полной оплатой курса от Channail4!"; 
            $title4 = "У Вас полностью оплатили ранее забронированный курс";   

            //Сообщение, которое приходит на почту со всеми нужными нам данными:

            $mes = "
            Поздравляю!
            Только что Вы приобрели доступ к урокам на учебной платформе Channail4.\n
            Свяжитесь с нашим администратором с помощью этой электронной почты channail4school@yandex.ru для записи на забронированный Вами $link.\n
            -------------------------------\n
            
            Если Вас интересует более подробная информация по нашим курсам, пожалуйста, свяжитесь с нами!\n
            channail4school@yandex.ru
            ";
            $mes2 = "
            Поздравляю!
            Только что за $paid рублей у Вас забронировали доступ к урокам на учебной платформе Channail4.\n
            Свяжитесь с Вашим покупателем с помощью этой электронной почты $to_email для записи на приобретенную им бронь $link.\n
            -------------------------------\n          
            
            ";
            $mes3 = "
            Поздравляю!
            Только что Вы оплатили полный доступ к урокам на учебной платформе Channail4.\n
            Вами оплачен $link.\n
            -------------------------------\n
            
            Если Вас интересует более подробная информация по нашим курсам, пожалуйста, свяжитесь с нами!\n
            channail4school@yandex.ru
            ";
            $mes4 = "
            Поздравляю!
            Только что за $paid рублей у Вас полностью оплатили $link на учебной платформе Channail4.\n
            Свяжитесь с Вашим покупателем с помощью этой электронной почты $to_email для записи на приобретенный им $link.\n
            -------------------------------\n
            ";

            $to_email2 = 'channail4school@yandex.ru';
            // $to_email2 = 'i.avraamy2@gmail.com';

            
            // признак успешно проведенной операции
            echo "OK$inv_id\n";
            //Всё, теперь можно отправлять письмо на почту
            if ($order_number < 10) {
                $send = mail ($to_email,$title,$mes,"Content-type:text/plain; charset = utf-8\r\nFrom:$sender_email");
                $send2 = mail ($to_email2,$title2,$mes2,"Content-type:text/plain; charset = utf-8\r\nFrom:$sender_email");
            }
            else {
                $send3 = mail ($to_email,$title3,$mes3,"Content-type:text/plain; charset = utf-8\r\nFrom:$sender_email");
                $send4 = mail ($to_email2,$title4,$mes4,"Content-type:text/plain; charset = utf-8\r\nFrom:$sender_email");
            }

        }
        else {
            header("Location:sorry.html");
        }
    }

?>