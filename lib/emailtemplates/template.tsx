export const template = (url) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Password</title>
  <style>
    /* Reset CSS */
    body, h1, p, button {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #333;
    }
    
    /* Container Styles */
    .container {
      width: 100%;
      max-width: 500px;
      margin: 20px auto;
      text-align: center;
    }
  
    /* Button Styles */
    .reset-button {
      display: inline-block;
      padding: 15px 30px;
      background-color: #4CAF50;
      color: #fff;
      text-decoration: none;
      border-radius: 30px;
      border: none;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    .reset-button:hover {
      background-color: #45a049;
    }
  </style>
  </head>
  <body>
    <div class="container">
      <h1>Reset Your Password</h1>
      <p>You have requested to reset your password. Click the button below to reset it:</p>
      
      <a class="reset-button" href="${url}">Reset Password</a>
      <p>**Link expires in 2 hrs</p>
    </div>
  </body>
  </html>
  `;
};
