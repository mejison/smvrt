export function validation(value, rules) {
        rules = rules || [];

        let messages = []
        rules.forEach(rule => {
            if(['required'].includes(rule)) {
                if (value == "") {
                    messages = [
                        ...messages,
                        "Field is required."
                    ]
                }
            }

            if(['password'].includes(rule)) {
                if (value.length < 6) {
                    messages = [
                        ...messages,
                        "The password must be at least 6 characters."
                    ]
                }
            }
            
            if(['email'].includes(rule)) {
                const email_regexp = /^\S+@\S+\.\S+$/;
                const check = email_regexp.test(value);
                
                if ( ! check) {
                    messages = [
                        ...messages,
                        "Please enter a valid email address."
                    ]
                }
            }

            if(rule.includes('confirm')) {
               const targetPasswrod = rule.replace("confirm:", "")
               if (targetPasswrod != value) {
                    messages = [
                        ...messages,
                        "Passwords are not the same."
                    ]
               }
            }

            if (rule.includes('terms_and_conditions')) {
                if (value == "") {
                    messages = [
                        ...messages,
                        "Please confirm the terms and conditions to proceed."
                    ]
                }
            }
        })

        return messages
}
