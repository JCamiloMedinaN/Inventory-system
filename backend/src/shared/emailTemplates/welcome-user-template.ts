export function buildWelcomeUserEmail(tempPassword: string): { subject: string; body: string } {
  const subject = 'Bienvenido a EcoTech - Tus Credenciales';
  const body = `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Bienvenido a EcoTech</title>
    <style>
      body {
        background: #f4f6f8;
        font-family: 'Segoe UI', Arial, sans-serif;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 480px;
        margin: 40px auto;
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.07);
        padding: 32px 24px;
      }
      .header {
        text-align: center;
        color: #2e7d32;
        margin-bottom: 24px;
      }
      .logo {
        width: 60px;
        margin-bottom: 12px;
      }
      .temp-pass {
        background: #e8f5e9;
        color: #1b5e20;
        font-size: 1.2em;
        padding: 12px 0;
        border-radius: 6px;
        margin: 18px 0;
        text-align: center;
        letter-spacing: 1px;
        font-weight: bold;
      }
      .footer {
        margin-top: 32px;
        font-size: 0.95em;
        color: #888;
        text-align: center;
      }
      @media (max-width: 600px) {
        .container { padding: 16px 4px; }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img class="logo" src="https://img.icons8.com/color/96/000000/leaf.png" alt="EcoTech Logo"/>
        <h2>¡Bienvenido a EcoTech!</h2>
      </div>
      <p>Hola,</p>
      <p>Tu cuenta ha sido creada exitosamente. Aquí tienes tu contraseña temporal:</p>
      <div class="temp-pass">${tempPassword}</div>
      <p>
        Por seguridad, <b>cámbiala en tu primer inicio de sesión</b>.<br/>
        Si no solicitaste esta cuenta, ignora este correo.
      </p>
      <div class="footer">
        &copy; ${new Date().getFullYear()} EcoTech. Todos los derechos reservados.
      </div>
    </div>
  </body>
  </html>
  `;
  return { subject, body };
}
