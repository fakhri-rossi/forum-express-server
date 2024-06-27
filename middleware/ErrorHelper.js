export class ErrorHelper extends Error {
    constructor(message, status){
        super();
        this.message = message;
        this.statusCode = status;
    }
}