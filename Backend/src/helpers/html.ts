export const HTML_ALERT = `<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alerta de Incendio</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f2f2f2;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
            background-color: #ff4c4c;
            color: #fff;
            padding: 10px 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content h1 {
            color: #ff4c4c;
        }
        .content p {
            font-size: 16px;
            line-height: 1.5;
        }
        .footer {
            text-align: center;
            padding: 10px 20px;
            background-color: #ff4c4c;
            color: #fff;
            border-radius: 0 0 8px 8px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #ff4c4c;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>¡ALERTA DE INCENDIO!</h2>
        </div>
        <div class="content">
            <h1>Posible Incendio Detectado</h1>
            <p>Se ha detectado humo en la ubicación monitoreada. Por favor, tome las precauciones necesarias de inmediato.</p>
            <p>Fecha y hora del evento: <strong>22 de mayo de 2024, 15:30</strong></p>
        </div>
        <div class="footer">
            <p>Este es un mensaje automático de su sistema de detección de incendios.</p>
        </div>
    </div>
</body>
</html>
`