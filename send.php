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
$mail = $_POST['mail'];

// Формирование самого письма

If (!empty($_POST['mail'])) 
  {
    $title = "Новая подписка на новости Best Tour Plan";
    $body = "
    <b>Пользователь с Еmail:</b> $mail<b> подписался на новостную рассылку Best Tour Plan</b>
    ";
  } 

  if (!empty($_POST['name']) && !empty($_POST['phone']) && !empty($_POST['message'])) {
    $title = "Новые обращение Best Tour Plan";
    $body = "
    <h2>Новое обращение</h2>
    <b>Name:</b> $name<br>
    <b>Phone:</b> $phone<br>
    <b>Message:</b> $message<br>
    ";
  } 

  if (!empty($_POST['name']) && !empty($_POST['phone']) && !empty($_POST['email']) && !empty($_POST['message'])) {
    $title = "Новый запрос на дополнительную информацию о отеле";
    $body = "
    <h2>Запрос на дополнительную информацию о отеле</h2>
    <b>Name:</b> $name<br>
    <b>Phone:</b> $phone<br>
    <b>Еmail:</b> $email<br>
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