class Login {

    constructor(form, fields){

        const user = {
            username: "admin",
            password: "admin12345678"
        };

        this.form = form;
        this.fields = fields;
        this.user = user;
        this.validateOnSubmit();
    }

    validateOnSubmit(){
        let self = this;

        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            var error = 0;

            self.fields.forEach((field) => {
                const input = document.querySelector(`#${field}`);                
                const currentField = field;

                if(currentField == "username"){
                    if(this.checkUsernameField(input) == false){
                        error++;
                    }
                }

                if(currentField == "password"){
                    if(this.checkPasswordField(input) == false){
                        error++;
                    }

                }
                
                if(this.checkEmptyStringField(input) == false){
                    error++;
                }

            });

            if(error == 0) {
                localStorage.setItem("auth", 1);
                this.form.submit();
                }
        });
    }

    checkUsernameField(field){
        if(field.value != this.user.username){
            this.setStatus(
                field,
                `You entered an invalid username`,
                "error"
            );
            return false;
        }
        this.setStatus(field,null,"success");
        return true;
        
    }

    checkPasswordField(field){
            if(field.value != this.user.password){
                this.setStatus(
                    field,
                    `You entered a wrong password`,
                    "error"
                );
                return false;
            }
            this.setStatus(field, null, "success");
            return true;       
    }


    checkEmptyStringField(field){

        //check if values are an empty string
        if(field.value.trim() == ""){
            this.setStatus(
                field,
                `${field.previousElementSibling.innerText} cannot be blank`,
                "error" 
            );
            return false;
        }
    }                 

    setStatus(field, message, status){
        const errorMessage = field.parentElement.querySelector(".error-message");

        if(status == "success"){
            if(errorMessage){
                errorMessage.innerText = "";
            }
            field.classList.remove("input-error");
        }

        if(status == "error"){
            errorMessage.innerText = message;
            field.classList.add(".input-error");
        }

    }
}

const form = document.querySelector(".loginForm");
if(form) {
    const fields = ["username", "password"];
    const validator = new Login(form, fields);
}