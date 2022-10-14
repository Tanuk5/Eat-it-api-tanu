export const http_formatter = (data: any, message: string = 'ok', success: boolean = true) => {
    if (success === false && data.code == 11000) {
        message = ``;
        Object.keys(data.keyValue).forEach(key => {
            message += `${key} : ${data.keyValue[key]} already exist in our record. `
        })
    }
    if (success === false && data.name == "ValidationError") message = data.message;

    return { data, success, message }
}

export const isEmail = (email: string):boolean =>  {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
};