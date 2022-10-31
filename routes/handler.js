function template(body) {
  return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
         ${body}
        </body>
      </html>
    `;
}

function registerFormTemplate(message = "") {
  return `
        <h1>Rejestracja uzytkownika</h1>
        <form method="POST">
          <label>
            Podaj email: <input type="text" name="email" />
          </label>
          </br></br>

          <label>
            Podaj hasło: <input type="password" name="password" /> 
          </label>
          </br></br>

          <label>
            Powtórz hasło: <input type="password" name="passwordRepeat" /> 
          </label>
          </br></br>

            Podaj płeć: 
            <label> <input type="radio" name="sex" value="female"> Female </label>
            <label> <input type="radio" name="sex" value="male"> Male </label>
          </br></br>

          <button type="submit">Zarejestruj</button>
        </form>
        </br></br>
        ${message}
      `;
}

function handleHome(request, response) {
  response.send(
    template(
      `<h1> Menu </h1>
    <ul>
      <li><a href="/login"> Logowanie </a></li> 
      <li><a href="/register"> Rejestracja </a></li>
    </ul>`
    )
  );
}

// endpoint do rejestracji: POST /register
// payload: {
//  email: "annanowak@wp.pl",
//  password: "lalal1",
//  passwordRepeat: "lalal1",
//  sex: "female"
// }

// reguly walidacji:
//  * wszystkie pola sa wymagane
//  * hasla musza byc identyczne
//  * pole sex musi byc rowne male albo female
//  * mail musi byc unikalny

function handleRegister(request, response) {
  if (request.method === "GET") {
    response.send(template(registerFormTemplate()));
  } else if (request.method === "POST") {
    // walidacja payload'
    if (request.body.email === undefined || request.body.email === "") {
      response
        .status(400)
        .send(template(registerFormTemplate("Pole email nie moze być puste")));
      return;
    }
    if (request.body.password === undefined || request.body.password === "") {
      response
        .status(400)
        .send(template(registerFormTemplate("Pole hasło nie moze być puste")));
      return;
    }
    if (
      request.body.passwordRepeat === undefined ||
      request.body.passwordRepeat === ""
    ) {
      response
        .status(400)
        .send(
          template(
            registerFormTemplate("Pole powtórz hasło nie moze byc puste")
          )
        );
      return;
    }
    if (request.body.passwordRepeat !== request.body.password) {
      response
        .status(400)
        .send(template(registerFormTemplate("Hasła muszą być takie same")));
      return;
    }
    if (request.body.sex !== "female" && request.body.sex !== "male") {
      response
        .status(400)
        .send(
          template(
            registerFormTemplate("Pole sex musi być równe female albo male")
          )
        );
      return;
    }
    response
      .status(201)
      .send(template("<h1>Rejestracja przebiegła pomyślnie</h1>"));
  } else {
    response.status(501).send(`Metoda ${request.method} nie jest obsługiwana`);
  }
}

// endpoint do logowania: POST /login
// payload: {
//  email: "annanowak@wp.pl",
//  password: "lalal1",
// }

function handleLogin(request, response) {
  if (request.method === "GET") {
    response.send(
      template(`
        <h1>Hello world!</h1>
        <form method="POST">
          <label>
            Login: <input type="text" name="login" />
          </label>

          <label>
            Password: <input type="password" name="password" /> 
          </label>

          <button type="submit">Login</button>
        </form>
    `)
    );
  } else if (request.method === "POST") {
    response.status(500).send("Coś poszło nie tak");
  } else {
    response.status(501).send(`Metoda ${request.method} nie jest obsługiwana`);
  }
}

function handleDefault(request, response) {
  response.send(template("<h1>Witaj na naszej stronie</h1>"));
}

function handleRequest(request, response) {
  console.log();

  console.log(`baseUrl:   '${request.baseUrl}'`); // sciezka
  console.log(`Method:    '${request.method}'`); // metoda requestu GET/POST/PUT itp.
  console.log("Params:   ", request.query); // query paramsy
  console.log("Payload:  ", request.body); // payload

  if (request.baseUrl === "" && request.method === "GET") {
    handleHome(request, response);
  } else if (request.baseUrl === "/register") {
    handleRegister(request, response);
  } else if (request.baseUrl === "/login") {
    handleLogin(request, response);
  } else {
    handleDefault(request, response);
  }
}

module.exports = handleRequest;
