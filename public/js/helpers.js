//FORMS_

class ValidateForm {
    constructor(evaluatedInput) {
        if (
            !(
                evaluatedInput instanceof HTMLInputElement ||
                evaluatedInput instanceof HTMLTextAreaElement
            )
        ) {
            throw new Error("El elemento evaluado no es un input válido.");
        }

        this.evaluatedInput = evaluatedInput;
        this.errorMessages = [];
        this.isNumber();
        this.isDecimal();
        this.maxLenght();
        this.minLenght();
        this.max();
        this.min();
        this.displayError();
    }
    isNumber() {
        if (this.evaluatedInput.classList.contains("numeric")) {
            this.evaluatedInput.value = this.evaluatedInput.value.replace(
                /[^0-9]/g,
                ""
            );
        }
    }
    isDecimal() {
        const decimalClass = Array.from(this.evaluatedInput.classList).find(
            (className) => className.startsWith("decimal-")
        );

        if (decimalClass) {
            const [, maxIntegers, maxDecimals] = decimalClass
                .split("-")
                .map(Number);

            let value = this.evaluatedInput.value;
            value = value.replace(/[^0-9.]/g, "");
            const parts = value.split(".");
            if (parts.length > 2) {
                parts.pop();
            }
            value = parts.join(".");

            const [integerPart, decimalPart = ""] = value.split(".");

            if (
                integerPart.length > maxIntegers ||
                decimalPart.length > maxDecimals
            ) {
                value = integerPart.slice(0, maxIntegers);
                if (decimalPart.length > 0) {
                    value += "." + decimalPart.slice(0, maxDecimals);
                }
                this.evaluatedInput.value = value;
            } else {
                this.evaluatedInput.value = value;
            }

            if (value !== this.evaluatedInput.value) {
                this.errorMessages.push(
                    `El valor debe tener hasta ${maxIntegers} enteros y ${maxDecimals} decimales.`
                );
            }
        }
    }
    max() {
        const maxValueClass = Array.from(this.evaluatedInput.classList).find(
            (className) => className.startsWith("max-")
        );
        if (maxValueClass) {
            const maxValue = parseFloat(maxValueClass.split("-")[1]);
            const currentValue = parseFloat(this.evaluatedInput.value);
            console.log(currentValue);
            if (currentValue > maxValue) {
                this.errorMessages.push(
                    `El valor no puede ser mayor que ${maxValue}.`
                );
            }
        }
    }
    min() {
        const minValueClass = Array.from(this.evaluatedInput.classList).find(
            (className) => className.startsWith("min-")
        );
        if (minValueClass) {
            const minValue = parseFloat(minValueClass.split("-")[1]);
            const currentValue = parseFloat(this.evaluatedInput.value);
            if (currentValue < minValue) {
                this.errorMessages.push(
                    `El valor no puede ser menor que ${minValue}.`
                );
            }
        }
    }
    maxLenght() {
        const maxLengthClass = Array.from(this.evaluatedInput.classList).find(
            (className) => className.startsWith("maxLength-")
        );
        if (maxLengthClass) {
            const maxLength = parseInt(maxLengthClass.split("-")[1], 10);
            if (this.evaluatedInput.value.length > maxLength) {
                this.evaluatedInput.value = this.evaluatedInput.value.slice(
                    0,
                    maxLength
                );
            }
        }
    }
    minLenght() {
        const minLengthClass = Array.from(this.evaluatedInput.classList).find(
            (className) => className.startsWith("minLength-")
        );
        if (minLengthClass) {
            const minLength = parseInt(minLengthClass.split("-")[1], 10);
            if (this.evaluatedInput.value.length < minLength) {
                this.errorMessages.push(
                    "Debe ingresar almenos " + minLength + " caracteres"
                );
            }
        }
    }
    displayError() {
        this.evaluatedInput.addEventListener("blur", () => {
            let nextSibling = this.evaluatedInput.nextElementSibling;
            if (this.errorMessages[0] != null) {
                if (
                    !nextSibling ||
                    !nextSibling.classList.contains("error-message")
                ) {
                    nextSibling = document.createElement("span");
                    nextSibling.classList.add("error-message");
                    this.evaluatedInput.parentNode.insertBefore(
                        nextSibling,
                        this.evaluatedInput.nextSibling
                    );
                }

                nextSibling.textContent = this.errorMessages[0];
            } else {
                nextSibling.textContent = "";
            }
        });
    }
}
function evalInput(inputEval) {
    new ValidateForm(inputEval);
}

//ALERTS

document.addEventListener("livewire:init", () => {
    Livewire.on("confirmAlert", (event) => {
        Swal.fire({
            title: event?.title ?? "¿Estás seguro?",
            html: event?.message,
            showCancelButton: true,
            confirmButtonColor: "#17BFC1",
            cancelButtonColor: "#d33",
            confirmButtonText: event?.textButton ?? "Sí, elimínalo",
        }).then((result) => {
            if (result.isConfirmed) {
                Livewire.dispatch(event?.action, event?.params);
            }
        });
    });
});

document.addEventListener("livewire:init", () => {
    Livewire.on("customAlert", (event) => {
        if (event.icon == "error") {
            Swal.fire({
                icon: event.icon,
                title: event.title,
                html: event.message,
            });
        } else {
            Swal.fire({
                title: event.title,
                html: event.message,
            });
        }
    });
});
