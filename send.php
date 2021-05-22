<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$name = $_POST['name'];
$phone = $_POST['phone'];
$message = $_POST['message'];
$email = $_POST['email'];

// Формирование самого письма
$title = "Новое обращение Best Tour Plan";

If (!empty($_POST['email'])) 
  {
    $body = "
    <h2>Новое обращение</h2>
    <b>Еmail:</b> $email<br>
    ";
  } 

  if (!empty($_POST['name']) && !empty($_POST['phone']) && !empty($_POST['message'])) {
    $body = "
    <h2>Новое обращение</h2>
    <b>Name:</b> $name<br>
    <b>Phone:</b> $phone<br>
    <b>Message:</b> $message<br>
    ";
  } 
  

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );

    // Настройки вашей почты
    $mail->Host       = 'smtp.gmail.com'; // SMTP сервера вашей почты
    $mail->Username   = '375445433672ab@gmail.com'; // Логин на почте
    $mail->Password   = '5433672Abcdf'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('375445433672ab@gmail.com', 'Yauheni Bychkou'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('375445433672@yandex.by');  
  

// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;    

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
header('Location: thankyou.html');