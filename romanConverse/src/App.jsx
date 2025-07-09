import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Swal from "sweetalert2";
import { RomanNumerals as RN, RomanNumerals } from "./utils/romanFuncs";
import Button from "react-bootstrap/Button";

function App() {
  const [valueConvert, setValueConvert] = useState("");
  const [conversionType, setConversionType] = useState("toRoman");
  const [valueConverted, setValueConverted] = useState("");
  const [romanValueForPlaceHolder, setromanValueForPlaceHolder] = useState("");
  const regex = /^[mdclxvi]+$/i;

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  const messageDisplay = (message) => {
    Toast.fire({
      icon: "warning",
      title: message,
      background: "linear-gradient(274deg,rgba(0, 0, 0, 0.29) 0%, rgba(240, 50, 50, 0.24) 100%)"
    });
    setValueConvert("");
  };

  return (
    <div>
      <Button
        variant="outline-danger"
        className="buttons"
        onClick={(e) => {
          setConversionType(
            e.target.innerHTML === "toRoman" ? "fromRoman" : "toRoman"
          );
          setValueConverted("");
          setValueConvert("");
          setromanValueForPlaceHolder("");
        }}
      >
        {conversionType}
      </Button>
      <p>
        {" "}
        en la antigua roma se utilizaban simbolos distintos a los que conocemos
        hoy en dia para representar a los numeros como los conocemos, y dichos
        numeros solo llegaban hasta el numero 3999, por tanto, este conversor,
        estara limitado a ese numero.
      </p>
      <input
        className="inputs"
        type={conversionType === "toRoman" ? "number" : "text"}
        placeholder={romanValueForPlaceHolder}
        name=""
        id=""
        max={3999}
        min={1}
        value={valueConvert}
        onChange={(e) => {
          setValueConvert(e.target.value.toLocaleUpperCase());
          // Toast.fire({
          //     icon: "warning",
          //     title: "El numero solo puede ser entre un rango de 1 a 3999",
          //   }),
        }}
      />

      <hr />
      <Button
        className="buttons"
        variant="outline-dark"
        onClick={() => {
          let romanValue = { value: "" };
          try {
            const value = RomanNumerals["toRoman"](
              RomanNumerals[conversionType](valueConvert.replaceAll(" ", ""))
            );

            !value &&
              (() => {
                throw new Error("valores no validos");
              })();

            romanValue.message = " Quizas hayas intentado escribir " + value;
            romanValue.value = value;
          } catch (e) {
            if (e.message !== "valores no validos") {
              romanValue.message = " Y posiblemente, mayor a 3999.";
            }
          }

          if (valueConvert === "") {
            messageDisplay("por favor, introduce algo para convertir.");
          } else if (
            conversionType === "toRoman" &&
            (valueConvert < 1 || valueConvert > 3999)
          ) {
            messageDisplay(
              "El numero solo puede ser entre un rango de 1 a 3999"
            );
          } else if (
            conversionType === "fromRoman" &&
            (!regex.test(valueConvert.replaceAll(" ", "")) ||
              romanValue.value !== valueConvert.replaceAll(" ", ""))
          ) {
            messageDisplay(
              "el numero romano que has puesto es invalido.".concat(
                romanValue.message || " Tiene caracteres no permitidos "
                // romanValue.value !== valueConvert && romanValue.value
                //   ? romanValue.message
                //   : " Tiene caracteres no permitidos"
              )
            );
            setValueConvert(romanValue.value)
          } else {
            setValueConverted(
              RomanNumerals[conversionType](valueConvert.replaceAll(" ", ""))
            );
          }
        }}
      >
        Convertir
      </Button>
      <hr />
      <input
        className="inputs"
        type="text"
        name=""
        id=""
        disabled={true}
        value={valueConverted}
      />
    </div>
  );
}

export default App;
